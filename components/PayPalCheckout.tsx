'use client';

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js';

interface PayPalCheckoutProps {
  amount?: string;
  productName?: string;
  productId?: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

export default function PayPalCheckout({
  amount = '24.99',
  productName = 'Heritage Muscle Oil',
  productId = 'heritage-oil',
  onSuccess,
  onError,
  onCancel,
}: PayPalCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5DFD7] shadow-sm text-[#2D2622]">
      {/* Header & Product Summary */}
      <div className="mb-5 pb-4 border-b border-[#E5DFD7]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#7D8A74] uppercase">FortyWell Apothecary</span>
            <h3 className="text-lg font-semibold text-[#1A1614]">{productName}</h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#7A726B] block">Total</span>
            <span className="text-xl font-bold text-[#1A1614]">${Number(amount).toFixed(2)}</span>
          </div>
        </div>
        <p className="text-xs text-[#7A726B] mt-1">
          ✦ Direct Guest Checkout: Pay with Debit/Credit Card or PayPal without creating an account.
        </p>
      </div>

      {/* Success State */}
      {paymentSuccess && orderDetails ? (
        <div className="bg-[#EEF4EC] border border-[#7D8A74]/30 rounded-xl p-5 text-center">
          <div className="w-10 h-10 bg-[#7D8A74] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
            ✓
          </div>
          <h4 className="text-base font-semibold text-[#2D2622]">Payment Successful!</h4>
          <p className="text-xs text-[#5D5751] mt-1">
            Thank you for your order! Your handcrafted {productName} is being prepared for dispatch.
          </p>
          {orderDetails.id && (
            <p className="text-[11px] font-mono text-[#7A726B] mt-2">
              Order ID: {orderDetails.id}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Loading Indicator */}
          {isProcessing && (
            <div className="mb-4 p-3 bg-[#EAE5DF] text-[#5D5751] text-xs rounded-lg text-center animate-pulse">
              Connecting securely to payment gateway…
            </div>
          )}

          {/* PayPal Buttons Provider */}
          <PayPalScriptProvider
            options={{
              clientId: clientId,
              currency: 'USD',
              intent: 'capture',
              components: 'buttons',
            }}
          >
            <div className="space-y-3">
              {/* DIRECT CARD PAYMENT (GUEST CHECKOUT - NO ACCOUNT NEEDED) */}
              <div className="rounded-xl overflow-hidden">
                <PayPalButtons
                  fundingSource={FUNDING.CARD}
                  style={{
                    layout: 'vertical',
                    shape: 'rect',
                    label: 'pay',
                    height: 46,
                  }}
                  createOrder={async () => {
                    setErrorMessage(null);
                    setIsProcessing(true);
                    try {
                      const res = await fetch('/api/paypal/create-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ amount, productName, productId }),
                      });

                      const order = await res.json();
                      if (!res.ok || !order.id) {
                        throw new Error(order.error || order.message || 'Failed to initialize order');
                      }
                      return order.id;
                    } catch (err: any) {
                      setErrorMessage(err.message || 'Payment initialization failed');
                      if (onError) onError(err);
                      throw err;
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  onApprove={async (data) => {
                    setIsProcessing(true);
                    try {
                      const res = await fetch('/api/paypal/capture-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderID: data.orderID, productName, productId, amount }),
                      });

                      const details = await res.json();
                      if (details.status === 'COMPLETED' || res.ok) {
                        setPaymentSuccess(true);
                        setOrderDetails(details);
                        if (onSuccess) onSuccess(details);
                      } else {
                        throw new Error(details.error || 'Payment capture could not be completed.');
                      }
                    } catch (err: any) {
                      setErrorMessage(err.message || 'Payment processing error');
                      if (onError) onError(err);
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  onCancel={() => {
                    if (onCancel) onCancel();
                  }}
                  onError={(err) => {
                    console.error('PayPal button error:', err);
                    setErrorMessage('An error occurred during payment processing.');
                    if (onError) onError(err);
                  }}
                />
              </div>

              {/* STANDARD PAYPAL BUTTON FALLBACK */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#E5DFD7]"></div>
                <span className="flex-shrink mx-3 text-[10px] uppercase font-semibold text-[#9C948B]">Or pay with PayPal</span>
                <div className="flex-grow border-t border-[#E5DFD7]"></div>
              </div>

              <div className="rounded-xl overflow-hidden">
                <PayPalButtons
                  fundingSource={FUNDING.PAYPAL}
                  style={{
                    layout: 'vertical',
                    shape: 'rect',
                    label: 'paypal',
                    color: 'gold',
                    height: 46,
                  }}
                  createOrder={async () => {
                    setErrorMessage(null);
                    setIsProcessing(true);
                    try {
                      const res = await fetch('/api/paypal/create-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ amount, productName, productId }),
                      });

                      const order = await res.json();
                      if (!res.ok || !order.id) {
                        throw new Error(order.error || order.message || 'Failed to initialize order');
                      }
                      return order.id;
                    } catch (err: any) {
                      setErrorMessage(err.message || 'Payment initialization failed');
                      if (onError) onError(err);
                      throw err;
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  onApprove={async (data) => {
                    setIsProcessing(true);
                    try {
                      const res = await fetch('/api/paypal/capture-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderID: data.orderID, productName, productId, amount }),
                      });

                      const details = await res.json();
                      if (details.status === 'COMPLETED' || res.ok) {
                        setPaymentSuccess(true);
                        setOrderDetails(details);
                        if (onSuccess) onSuccess(details);
                      } else {
                        throw new Error(details.error || 'Payment capture could not be completed.');
                      }
                    } catch (err: any) {
                      setErrorMessage(err.message || 'Payment processing error');
                      if (onError) onError(err);
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  onCancel={() => {
                    if (onCancel) onCancel();
                  }}
                  onError={(err) => {
                    console.error('PayPal button error:', err);
                    setErrorMessage('An error occurred during payment processing.');
                    if (onError) onError(err);
                  }}
                />
              </div>
            </div>
          </PayPalScriptProvider>

          {/* Security Assurance Footer */}
          <div className="mt-4 pt-3 border-t border-[#E5DFD7] flex items-center justify-between text-[11px] text-[#7A726B]">
            <span className="flex items-center gap-1">🔒 256-Bit SSL Encrypted</span>
            <span>Free Standard US Shipping</span>
          </div>
        </>
      )}
    </div>
  );
}
