export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: 'Cortisol & Hormones' | 'Fluid Kinetics' | 'Somatic Movement' | 'Joint & Bone Health' | 'Sleep & Recovery';
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  medicalReviewer: string;
  summary: string;
  keyTakeaways: string[];
  leadMagnetId: 'signs-40' | 'clinical-qa' | 'daily-rhythm';
  leadMagnetTitle: string;
  leadMagnetUrl: string;
  sections: {
    title: string;
    content: string[];
    callout?: string;
    list?: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-you-wake-up-at-3am-cortisol-after-40',
    title: 'The 3:00 AM Awakening: Why Your Cortisol Spikes in the Middle of the Night After 40',
    subtitle: 'Understanding the nocturnal adrenal surge, blood glucose drops, and how to sleep through the night.',
    category: 'Cortisol & Hormones',
    publishedAt: 'September 5, 2026',
    readTime: '5 min read',
    author: {
      name: 'Dr. Elena Vance, ND',
      role: 'Integrative Women’s Health Specialist & Advisory Member',
    },
    medicalReviewer: 'FortyWell Clinical Advisory Board',
    summary:
      'You fall asleep without an issue, but around 3:00 AM your eyes fly open. Your heart is beating slightly fast, your mind starts racing with to-do lists, and sleep feels miles away. This is not insomnia—it is an acute nocturnal cortisol surge triggered by fluctuating progesterone and liver glycogen depletion.',
    keyTakeaways: [
      'Progesterone is your brain’s natural GABA enhancer and calming buffer; as it declines after 40, your threshold for nighttime adrenaline drops.',
      'A drop in blood sugar around 3:00 AM forces the adrenal glands to dump cortisol to stimulate hepatic glucose release.',
      'Somatic vagal resets before bed and stabilizing evening blood sugar can prevent premature midnight cortisol spikes.',
    ],
    leadMagnetId: 'signs-40',
    leadMagnetTitle: "5 Signs Your Body's Changing After 40 (Free PDF)",
    leadMagnetUrl: '/guides/5-signs-body-changing-after-40.pdf',
    sections: [
      {
        title: 'The Biochemistry of the 3:00 AM Wake-Up',
        content: [
          'In healthy circadian biology, cortisol should be at its lowest point around midnight and gradually climb between 6:00 AM and 8:00 AM to help you wake up refreshed. However, during perimenopause and menopause, ovarian progesterone synthesis drops faster than estrogen.',
          'Progesterone metabolizes into allopregnanolone, a neurosteroid that binds to GABA-A receptors in the brain—the exact same receptors targeted by anti-anxiety medications. Without this neurochemical buffer, the nervous system becomes hyper-reactive to minor biological shifts during sleep.',
        ],
        callout:
          'When progesterone levels dip, your nervous system loses its natural nocturnal shock absorber. Normal circadian fluctuations that once went unnoticed now trigger full wakefulness.',
      },
      {
        title: 'The Liver & Blood Glucose Connection',
        content: [
          'Between 2:00 AM and 4:00 AM, the liver works hard to detoxify metabolic waste and manage glycogen reserves. If your evening meal was either too light or heavily skewed toward refined carbohydrates, liver glycogen depletes in the early morning hours.',
          'When blood sugar drops dangerously low, your body treats it as an emergency: your adrenal glands release a surge of cortisol and epinephrine (adrenaline) to stimulate gluconeogenesis. The result? You wake up instantly alert with a racing pulse and mild anxiety.',
        ],
        list: [
          'Avoid high-sugar snacks after 8:00 PM that cause late-night insulin crashes.',
          'Incorporate a small amount of healthy fat and protein at dinner (such as walnuts or pumpkin seeds) to sustain nocturnal blood sugar.',
          'Practice 5 minutes of diaphragmatic parasympathetic breathing before bed.',
        ],
      },
      {
        title: 'The FortyWell Evening Solution',
        content: [
          'To prevent nocturnal adrenal spikes, the body requires physical nervous system downregulation. Somatic inversions (such as placing legs up at 90 degrees against the wall) stimulate baroreceptors in the carotid sinus, signaling the brain stem to downregulate sympathetic tone.',
          'Pairing this with a 4-second inhale and 6-second exhale trains the vagus nerve to maintain slow, steady heart rate variability throughout the night.',
        ],
      },
    ],
  },
  {
    slug: 'heavy-legs-evening-fluid-retention-perimenopause',
    title: 'Why Your Lower Legs Feel Heavy by 5 PM: Estrogen, Aldosterone, and Lymphatic Stagnation',
    subtitle: 'The mechanical science behind evening ankle tightness and how somatic muscle pumps clear trapped fluid.',
    category: 'Fluid Kinetics',
    publishedAt: 'September 3, 2026',
    readTime: '6 min read',
    author: {
      name: 'Claire Moreau, PT, MPT',
      role: 'Lymphatic Specialist & Somatic Movement Lead',
    },
    medicalReviewer: 'FortyWell Clinical Advisory Board',
    summary:
      'By late afternoon, socks leave deep red rings around your ankles, boots feel tight, and your calves feel like dense concrete weights. Learn why estrogen fluctuations disrupt sodium-water balance and why standard cardio fails to drain lower-body interstitial fluid.',
    keyTakeaways: [
      'Fluctuating estrogen alters the renin-angiotensin-aldosterone axis, signaling kidneys to retain water and sodium under baseline stress.',
      'Unlike the heart-pumped arterial system, the lymphatic system has no central pump and depends on skeletal muscle pumps and breath mechanics.',
      'Zero-impact somatic inversions combined with ankle pumps can mobilize up to 300ml of trapped fluid in under 15 minutes.',
    ],
    leadMagnetId: 'clinical-qa',
    leadMagnetTitle: 'Questions & Clinical Guidance for Women After 40 (Free PDF)',
    leadMagnetUrl: '/guides/questions-and-clinical-guidance-after-40.pdf',
    sections: [
      {
        title: 'The Aldosterone-Estrogen Imbalance',
        content: [
          'Many women over 40 assume swollen legs are due to eating too much salt or drinking too little water. While hydration matters, the primary culprit is hormonal fluid kinetics.',
          'Estrogen directly modulates vascular permeability and interacts with aldosterone—the hormone produced by the adrenal cortex that regulates sodium retention. When estrogen fluctuates wildly in your 40s, aldosterone levels can spike erratically, causing water to escape capillary walls and pool in interstitial leg tissues.',
        ],
        callout:
          'Lower-body fluid retention is not fat. It is stagnant interstitial fluid trapped by gravitational hydrostatic pressure and sluggish lymphatic clearance.',
      },
      {
        title: 'The Flaw in Traditional Walking & Cardio',
        content: [
          'Many trainers recommend walking more to flush leg swelling. However, if you are on your feet all day, gravitational force continues to pool fluid downward.',
          'Without rhythmic contraction and relaxation of the deep soleus and gastrocnemius muscles while in a non-weight-bearing position, upright exercise can actually increase hydrostatic congestion and capillary pressure in already inflamed lower legs.',
        ],
        list: [
          'Elevate your legs at 90 degrees above heart level for 10 minutes daily.',
          'Perform slow, rhythmic plantarflexion and dorsiflexion (ankle pumps) to manually activate venous valves.',
          'Engage diaphragmatic breathwork to create negative intrathoracic pressure that pulls fluid upward.',
        ],
      },
    ],
  },
  {
    slug: 'why-hiit-and-cardio-cause-cortisol-belly',
    title: 'Why Traditional HIIT & Cardio Cause "Cortisol Belly" in Women Over 40',
    subtitle: 'Why the workouts that kept you lean in your 20s are triggering visceral fat storage in midlife.',
    category: 'Cortisol & Hormones',
    publishedAt: 'September 1, 2026',
    readTime: '5 min read',
    author: {
      name: 'Dr. Elena Vance, ND',
      role: 'Integrative Women’s Health Specialist & Advisory Member',
    },
    medicalReviewer: 'FortyWell Clinical Advisory Board',
    summary:
      'If you have responded to midsection weight gain by running longer, taking high-intensity bootcamps, and cutting calories—only to watch your waistline expand further—you are experiencing cortisol-mediated visceral fat protection.',
    keyTakeaways: [
      'Visceral fat cells around the abdomen possess up to four times more cortisol receptors than subcutaneous fat cells in hips or thighs.',
      'High-intensity interval training (HIIT) combined with a caloric deficit triggers systemic distress signals, causing the body to prioritize abdominal fat buffering.',
      'Low-impact isometric strength and restorative zone 2 pacing burn fatty acids without triggering adrenal cortisol overshoots.',
    ],
    leadMagnetId: 'signs-40',
    leadMagnetTitle: "5 Signs Your Body's Changing After 40 (Free PDF)",
    leadMagnetUrl: '/guides/5-signs-body-changing-after-40.pdf',
    sections: [
      {
        title: 'The Density of Cortisol Receptors in Belly Fat',
        content: [
          'Visceral fat—the fat surrounding your liver, pancreas, and intestines—is not inert tissue. It is an active endocrine organ that responds directly to glucocorticoid hormones.',
          'Medical research shows that deep abdominal fat has a significantly higher density of glucocorticoid (cortisol) receptors than subcutaneous fat elsewhere in the body. When baseline cortisol is chronically elevated, an enzyme called 11β-HSD1 in visceral fat cells amplifies local cortisol levels, actively pulling triglycerides into midsection storage.',
        ],
        callout:
          'Your body is not storing belly fat out of metabolic incompetence. It is storing visceral fat as an emergency survival buffer against perceived physiological threat.',
      },
      {
        title: 'The Overtraining Trap',
        content: [
          'When you push through intense 45-minute HIIT sessions with already elevated baseline cortisol and fluctuating estrogen, your post-workout cortisol levels remain elevated for hours instead of returning to baseline.',
          'This persistent elevation halts muscle protein synthesis, stimulates cravings for fast-acting glucose, and breaks down lean muscle tissue while protecting abdominal fat.',
        ],
        list: [
          'Switch from frantic cardio to joint-safe isometric resistance protocols.',
          'Keep movement tempo controlled to maximize time under tension without cardiovascular panic.',
          'Incorporate dedicated somatic parasympathetic cooldowns after every strength stimulus.',
        ],
      },
    ],
  },
  {
    slug: 'somatic-movement-vs-pilates-yoga-difference',
    title: 'Somatic Movement vs. Yoga & Pilates: The Mechanical Difference for Hormonal Pacing',
    subtitle: 'How somatic micro-movements release stored neuromuscular guarding and regulate the midlife nervous system.',
    category: 'Somatic Movement',
    publishedAt: 'August 28, 2026',
    readTime: '4 min read',
    author: {
      name: 'Claire Moreau, PT, MPT',
      role: 'Lymphatic Specialist & Somatic Movement Lead',
    },
    medicalReviewer: 'FortyWell Clinical Advisory Board',
    summary:
      'While yoga focuses on static flexibility and Pilates emphasizes core resistance, somatic movement focuses on the sensory-motor feedback loop—re-educating the nervous system to let go of involuntary muscular tension patterns.',
    keyTakeaways: [
      'Sensory-motor amnesia occurs when muscles remain chronically contracted due to prolonged stress, leading to postural fatigue.',
      'Somatic movement uses "pandiculation"—a gentle, voluntary contraction followed by a slow, conscious release.',
      'Unlike intense yoga or Pilates reformer classes, somatic pacing keeps the heart rate low, protecting joint capsules and adrenal reserves.',
    ],
    leadMagnetId: 'daily-rhythm',
    leadMagnetTitle: 'The Over-40 Daily Rhythm: 3 Simple Micro-Habits (Free PDF)',
    leadMagnetUrl: '/guides/over-40-daily-rhythm-cortisol-reset.pdf',
    sections: [
      {
        title: 'What Is Somatic Movement?',
        content: [
          'Originating from neurophysiology, somatic movement is movement performed slowly and with internal sensory awareness (interoception). Rather than imposing a shape onto your body from the outside, somatics works from the inside out.',
          'When chronic emotional stress or hormonal changes cause your pelvic floor, lower back, or neck to clench involuntarily, your brain loses conscious motor control over those muscle fibers. This state is known as sensory-motor amnesia.',
        ],
        callout:
          'Stretching a chronically tight muscle triggers the stretch reflex, causing it to rebound tighter. Pandiculation teaches the brain to consciously release the tension at the neurological level.',
      },
      {
        title: 'Why It Matters After 40',
        content: [
          'Women over 40 often find that traditional yoga classes cause joint strain in wrists and knees, while aggressive Pilates classes can trigger pelvic floor hypertonicity.',
          'FortyWell somatic sequences are calibrated to restore neuromuscular ease, mobilize interstitial fluids, and calm the autonomic nervous system in just 15 minutes a day.',
        ],
      },
    ],
  },
  {
    slug: 'morning-joint-stiffness-synovial-fluid-reset',
    title: 'Morning Joint Stiffness: Restoring Synovial Fluid & Connective Tissue Naturally',
    subtitle: 'Why your knees, hips, and lower back feel stiff upon waking and how zero-impact mobility restores morning glide.',
    category: 'Joint & Bone Health',
    publishedAt: 'August 24, 2026',
    readTime: '5 min read',
    author: {
      name: 'Dr. Marcus Webb, MD',
      role: 'Orthopedic & Musculoskeletal Rehabilitation Lead',
    },
    medicalReviewer: 'FortyWell Clinical Advisory Board',
    summary:
      'Getting out of bed shouldn’t feel like stepping on broken glass or creaky floorboards. Understand how estrogen decline thins synovial lubrication in cartilage and how gentle morning waves restore joint glide.',
    keyTakeaways: [
      'Estrogen receptors are located throughout articular cartilage, subchondral bone, and synovial membranes.',
      'Declining estrogen reduces collagen type II synthesis and impairs hyaluronic acid viscosity in synovial fluid.',
      'Low-impact non-weight-bearing rotational movements circulate synovial fluid through the cartilage matrix without compression.',
    ],
    leadMagnetId: 'signs-40',
    leadMagnetTitle: "5 Signs Your Body's Changing After 40 (Free PDF)",
    leadMagnetUrl: '/guides/5-signs-body-changing-after-40.pdf',
    sections: [
      {
        title: 'The Role of Estrogen in Joint Lubrication',
        content: [
          'Cartilage contains no blood vessels of its own. It relies entirely on synovial fluid to deliver oxygen, nutrients, and shock absorption.',
          'Estrogen acts as a protective shield for chondrocytes (the cells that synthesize cartilage). When estrogen levels fall during perimenopause, chondrocyte proliferation declines, and the synovial fluid loses its gel-like viscoelasticity, resulting in morning stiffness and joint crepitus.',
        ],
        callout:
          'Synovial fluid is thixotropic: it becomes more viscous when still and more fluid when mobilized through gentle, unloaded range of motion.',
      },
      {
        title: 'The 3-Minute Bedside Reset',
        content: [
          'Before placing your full body weight on cold morning joints, spend 3 minutes moving through unloaded articulations:',
          'Perform slow ankle alphabets, gentle pelvic tilts, and supine knee-to-chest hugs while still in bed. This circulates warming synovial fluid into the joint capsule before gravity exerts mechanical pressure.',
        ],
      },
    ],
  },
  {
    slug: 'the-evening-parasympathetic-winddown-protocol',
    title: 'The 10-Minute Evening Protocol to Switch Off Chronic Adrenaline Before Sleep',
    subtitle: 'The restorative ritual to clear mental buzzing, reduce evening leg puffiness, and prepare for uninterrupted sleep.',
    category: 'Sleep & Recovery',
    publishedAt: 'August 20, 2026',
    readTime: '4 min read',
    author: {
      name: 'Claire Moreau, PT, MPT',
      role: 'Lymphatic Specialist & Somatic Movement Lead',
    },
    medicalReviewer: 'FortyWell Clinical Advisory Board',
    summary:
      'Evening fatigue coupled with mental restlessness ("tired but wired") is the signature symptom of an overburdened sympathetic nervous system. Here is the step-by-step 10-minute protocol to decelerate adrenaline and trigger restorative sleep.',
    keyTakeaways: [
      'The transition from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) requires intentional sensory signaling.',
      'Combining passive leg elevation with prolonged exhalation directly stimulates the vagus nerve.',
      'Ten minutes of restorative somatic pacing reduces resting evening heart rate and improves deep non-REM sleep duration.',
    ],
    leadMagnetId: 'daily-rhythm',
    leadMagnetTitle: 'The Over-40 Daily Rhythm: 3 Simple Micro-Habits (Free PDF)',
    leadMagnetUrl: '/guides/over-40-daily-rhythm-cortisol-reset.pdf',
    sections: [
      {
        title: 'Breaking the "Tired But Wired" Loop',
        content: [
          'After a demanding day of juggling work, family, and hormonal fluctuations, your body is physically exhausted, but your central nervous system remains on high alert.',
          'Scrolling on phones or watching television keeps blue light striking your retinal photoreceptors, delaying melatonin secretion and keeping evening cortisol unnaturally high.',
        ],
        callout:
          'Your nervous system cannot be argued into resting; it must be physically guided into safety through somatic sensation and respiration.',
      },
      {
        title: 'The 10-Minute Protocol',
        content: [
          'Minutes 1–5: Legs-Up Elevation against a wall or couch edge to drain accumulated venous fluid and drop arterial blood pressure.',
          'Minutes 6–8: 4-7-8 diaphragmatic breathing with hands resting on the lower abdomen.',
          'Minutes 9–10: Gentle supine spinal twists to release neuromuscular tension in the thoracic spine and diaphragm.',
        ],
      },
    ],
  },
];
