// ─────────────────────────────────────────────────────────────
//  MediBridge India — Centralized Mock Data Module
//  Used as fallback when no live database is connected.
// ─────────────────────────────────────────────────────────────

export interface MockHospital {
  id: string;
  name: string;
  city: string;
  accreditation: string;
  rating: number;
  description: string;
  image: string;
  gallery: string[];
  address: string;
  contactEmail: string;
  contactPhone: string;
  specialties: string[];
  bedsCount: number;
  foundedYear: number;
  doctorCount: number;
}

export interface MockDoctor {
  id: string;
  fullName: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  languages: string;
  consultationFee: number;
  education: string;
  biography: string;
  certifications: string;
  successRate: number;
  image: string;
  hospitalId: string;
  hospital: { id: string; name: string; city: string };
  availableDays: string[];
  patientsServed: number;
}

export interface MockTreatment {
  id: string;
  name: string;
  category: string;
  description: string;
  recoveryTime: string;
  risks: string;
  image: string;
  successRate: number;
  avgCostUSD: number;
  keyBenefits: string[];
}

export interface MockHospitalTreatment {
  hospitalId: string;
  treatmentId: string;
  averageCost: number; // USD
}

// ──────────────────────────────────────────────────────
//  HOSPITALS
// ──────────────────────────────────────────────────────
export const MOCK_HOSPITALS: MockHospital[] = [
  {
    id: "hosp-1",
    name: "Apollo Hospitals",
    city: "Chennai",
    accreditation: "JCI, NABH",
    rating: 4.9,
    description:
      "Apollo Hospitals Chennai is one of India's premier multi-specialty tertiary care hospitals. With over 40 years of excellence in healthcare, it has pioneered advanced cardiac care, organ transplants, and oncology treatments. JCI accredited with a dedicated international patient services desk handling over 10,000 international patients annually.",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
    ],
    address: "21, Greams Lane, Off Greams Road, Chennai, Tamil Nadu 600006",
    contactEmail: "international@apollohospitals.com",
    contactPhone: "+91-44-2829-3333",
    specialties: ["Cardiology", "Oncology", "Neurology", "Transplant", "Orthopedics"],
    bedsCount: 600,
    foundedYear: 1983,
    doctorCount: 350,
  },
  {
    id: "hosp-2",
    name: "Fortis Escorts Heart Institute",
    city: "New Delhi",
    accreditation: "JCI, NABL",
    rating: 4.8,
    description:
      "Fortis Escorts Heart Institute is Asia's leading cardiac care facility located in New Delhi. Renowned globally for complex cardiac surgeries, valve replacements, and minimally invasive cardiac interventions. The hospital boasts a 98.7% cardiac surgery success rate and houses state-of-the-art catheterization laboratories and hybrid operating rooms.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=800&auto=format&fit=crop",
    ],
    address: "Okhla Road, New Delhi, Delhi 110025",
    contactEmail: "international.delhi@fortishealthcare.com",
    contactPhone: "+91-11-4713-5000",
    specialties: ["Cardiology", "Orthopedics", "Neurology", "Urology"],
    bedsCount: 310,
    foundedYear: 1988,
    doctorCount: 200,
  },
  {
    id: "hosp-3",
    name: "Max Super Speciality Hospital",
    city: "Mumbai",
    accreditation: "JCI, NABH",
    rating: 4.9,
    description:
      "Max Super Speciality Hospital Saket is among India's most advanced hospitals, leading in robotic surgery and organ transplants. The hospital's robotic surgery programme has performed over 5,000 robot-assisted procedures with significantly reduced recovery times. It has a dedicated international wing offering seamless, luxury-class medical concierge services.",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
    ],
    address: "1, 2, Press Enclave Marg, Saket Institutional Area, Mumbai 400001",
    contactEmail: "international@maxhealthcare.in",
    contactPhone: "+91-11-2651-5050",
    specialties: ["Robotic Surgery", "Transplant", "Oncology", "Cardiac Sciences"],
    bedsCount: 500,
    foundedYear: 2000,
    doctorCount: 285,
  },
  {
    id: "hosp-4",
    name: "Manipal Hospital",
    city: "Bangalore",
    accreditation: "NABH, JCI",
    rating: 4.7,
    description:
      "Manipal Hospital Bangalore is a leading super-specialty hospital known for excellence in orthopedics, spine surgery, and neurology. The hospital has performed over 8,000 joint replacement surgeries and is one of India's most trusted centers for complex spine procedures. The international patient department offers dedicated coordinators for seamless care.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
    ],
    address: "98, HAL Airport Road, Bangalore, Karnataka 560017",
    contactEmail: "international@manipalhospitals.com",
    contactPhone: "+91-80-2502-4444",
    specialties: ["Orthopedics", "Spine Surgery", "Neurology", "Cardiology"],
    bedsCount: 600,
    foundedYear: 1991,
    doctorCount: 320,
  },
  {
    id: "hosp-5",
    name: "Narayana Health",
    city: "Bangalore",
    accreditation: "NABH, JCI",
    rating: 4.8,
    description:
      "Narayana Health is a globally celebrated hospital group renowned for delivering world-class cardiac care at dramatically reduced costs. Founded by Dr. Devi Shetty, the hospital has made complex cardiac surgeries accessible without compromising quality. It performs over 32 cardiac surgeries every day, making it one of the world's largest cardiac centers.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
    ],
    address: "258/A, Bommasandra Industrial Area, Bangalore, Karnataka 560099",
    contactEmail: "international@narayanahealth.org",
    contactPhone: "+91-80-7122-2222",
    specialties: ["Cardiology", "Oncology", "Pediatric Cardiac Surgery"],
    bedsCount: 5000,
    foundedYear: 2000,
    doctorCount: 450,
  },
  {
    id: "hosp-6",
    name: "Kokilaben Dhirubhai Ambani Hospital",
    city: "Mumbai",
    accreditation: "JCI",
    rating: 4.9,
    description:
      "Kokilaben Dhirubhai Ambani Hospital is one of India's most advanced quaternary care hospitals. Equipped with the Da Vinci Robotic Surgery System and state-of-the-art PET-CT and proton therapy infrastructure, it excels in oncology, neurology, and complex surgical procedures. The hospital's patient-centered philosophy ensures personalized, luxury-class international care.",
    image:
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    ],
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai 400053",
    contactEmail: "international@kokilabenhospital.com",
    contactPhone: "+91-22-4269-6969",
    specialties: ["Neurology", "Oncology", "Robotic Surgery", "Cardiology", "IVF"],
    bedsCount: 750,
    foundedYear: 2009,
    doctorCount: 400,
  },
];

// ──────────────────────────────────────────────────────
//  TREATMENTS
// ──────────────────────────────────────────────────────
export const MOCK_TREATMENTS: MockTreatment[] = [
  {
    id: "treat-1",
    name: "Coronary Artery Bypass Graft (CABG)",
    category: "Cardiology",
    description:
      "Coronary Artery Bypass Graft surgery (CABG) restores blood flow to the heart by creating new pathways around blocked coronary arteries using healthy vessels from other parts of the body. India's success rate for CABG exceeds 99%, with costs 70-80% lower than the US or UK, without any compromise on outcomes or technology.",
    recoveryTime: "4–6 weeks",
    risks:
      "Bleeding, infection, stroke, arrhythmia, kidney problems. Risk significantly mitigated in JCI-accredited centers.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop",
    successRate: 98.9,
    avgCostUSD: 5500,
    keyBenefits: [
      "70% cheaper than US & UK",
      "World-class cardiac surgeons",
      "99%+ success rate",
      "Minimally invasive options",
    ],
  },
  {
    id: "treat-2",
    name: "Total Knee Replacement",
    category: "Orthopedics",
    description:
      "Total Knee Replacement (TKR) involves replacing the damaged knee joint surfaces with high-quality implants to relieve pain and restore mobility. Indian hospitals use the latest cemented and cementless implants, with robotic-assisted surgery available for precision outcomes. Patients typically experience 60–70% cost savings compared to Western countries.",
    recoveryTime: "6–8 weeks",
    risks:
      "Blood clots, infection, implant failure, nerve damage. Proper physiotherapy and pre-operative screening minimise risk.",
    image:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop",
    successRate: 97.5,
    avgCostUSD: 6500,
    keyBenefits: [
      "Robotic-assisted precision",
      "Top-grade implants included",
      "Rapid recovery protocols",
      "65% cost savings",
    ],
  },
  {
    id: "treat-3",
    name: "Hip Replacement Surgery",
    category: "Orthopedics",
    description:
      "Hip Replacement Surgery replaces the damaged hip joint with an artificial implant, eliminating chronic pain and restoring mobility. Indian surgeons are trained at leading global institutions and perform thousands of hip replacements annually with excellent patient outcomes. Both total and partial hip replacement options are available.",
    recoveryTime: "6–8 weeks",
    risks:
      "Dislocation, blood clots, infection, leg length discrepancy. Addressed through careful surgical technique and post-operative care.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    successRate: 97.2,
    avgCostUSD: 7000,
    keyBenefits: [
      "Premium implants at low cost",
      "Minimally invasive technique",
      "Rapid rehabilitation",
      "Experienced surgeons",
    ],
  },
  {
    id: "treat-4",
    name: "Spinal Fusion Surgery",
    category: "Neurology",
    description:
      "Spinal Fusion Surgery permanently connects two or more vertebrae to eliminate pain caused by abnormal motion, deformity, or instability. India's top neurosurgeons perform complex spinal fusions using advanced cage and pedicle screw systems with exceptional outcomes. Minimally invasive posterior and anterior fusion approaches are widely available.",
    recoveryTime: "3–4 months",
    risks:
      "Adjacent segment disease, fusion failure, nerve injury, infection. Expert neurosurgical teams dramatically reduce complication rates.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    successRate: 95.8,
    avgCostUSD: 9500,
    keyBenefits: [
      "Top-ranked neurosurgeons",
      "Advanced spinal systems",
      "Neuromonitoring included",
      "60% cost savings",
    ],
  },
  {
    id: "treat-5",
    name: "LASIK Eye Surgery",
    category: "Ophthalmology",
    description:
      "LASIK (Laser-Assisted In Situ Keratomileusis) corrects refractive errors — nearsightedness, farsightedness, and astigmatism — by reshaping the cornea with precision laser technology. Indian ophthalmology centers use the latest Bladeless LASIK, SMILE, and Femtosecond technology for outstanding visual outcomes. Most patients achieve 20/20 vision or better.",
    recoveryTime: "1–2 days",
    risks:
      "Dry eyes, halos, night glare, under/over-correction. Rare complications in experienced centers with modern equipment.",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200&auto=format&fit=crop",
    successRate: 99.1,
    avgCostUSD: 1200,
    keyBenefits: [
      "Bladeless LASIK technology",
      "Same-day procedure",
      "99%+ success rate",
      "80% cost savings",
    ],
  },
  {
    id: "treat-6",
    name: "Cancer Chemotherapy",
    category: "Oncology",
    description:
      "Chemotherapy uses powerful drugs to target and destroy cancer cells throughout the body. India's leading oncology centers provide evidence-based chemotherapy protocols aligned with NCCN guidelines, with access to the full spectrum of approved chemotherapy agents, targeted therapies, and immunotherapy. Multidisciplinary oncology teams ensure personalized treatment plans.",
    recoveryTime: "Ongoing (cycle-based)",
    risks:
      "Nausea, hair loss, fatigue, immunosuppression, organ-specific toxicity. Managed with supportive care protocols.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    successRate: 92.0,
    avgCostUSD: 3000,
    keyBenefits: [
      "NCCN protocol compliance",
      "Targeted & immunotherapy",
      "Multidisciplinary teams",
      "75% cost savings per cycle",
    ],
  },
  {
    id: "treat-7",
    name: "Liver Transplant",
    category: "Organ Transplant",
    description:
      "Liver Transplant replaces a diseased or failing liver with a healthy donor liver. India is among the world's top five countries for liver transplant volumes, with several centers reporting outcomes comparable to leading US and European transplant programs. Both cadaveric and living-donor transplants are performed with exceptional results.",
    recoveryTime: "3–6 months",
    risks:
      "Rejection, infection, biliary complications, vascular thrombosis. Managed with advanced immunosuppression and post-transplant protocols.",
    image:
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1200&auto=format&fit=crop",
    successRate: 93.5,
    avgCostUSD: 25000,
    keyBenefits: [
      "World-class transplant teams",
      "1-year survival rate >90%",
      "50% cheaper than US",
      "Comprehensive post-op care",
    ],
  },
  {
    id: "treat-8",
    name: "IVF Treatment (In Vitro Fertilisation)",
    category: "Fertility & IVF",
    description:
      "IVF (In Vitro Fertilisation) is an advanced assisted reproductive technology where eggs are fertilised outside the body and resulting embryos are transferred to the uterus. India's world-class fertility centers offer the latest ICSI, PGT-A, blastocyst culture, and egg-freezing technologies at a fraction of Western costs, with excellent clinical pregnancy rates.",
    recoveryTime: "Varies (2–6 weeks per cycle)",
    risks:
      "Ovarian hyperstimulation syndrome (OHSS), multiple pregnancy, ectopic pregnancy. Managed with careful monitoring and individualised protocols.",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop",
    successRate: 58.0,
    avgCostUSD: 2800,
    keyBenefits: [
      "Latest ICSI & PGT-A technology",
      "65% cost savings vs US/UK",
      "Personalised protocols",
      "High clinical pregnancy rates",
    ],
  },
  {
    id: "treat-9",
    name: "Bariatric Surgery (Gastric Sleeve)",
    category: "Bariatric Surgery",
    description:
      "Bariatric Surgery, particularly Laparoscopic Sleeve Gastrectomy, permanently reduces stomach size to limit food intake and promote sustainable weight loss. Indian bariatric surgeons are fellowship-trained internationally and use laparoscopic and robotic techniques for minimal scarring and rapid recovery. Comprehensive pre- and post-operative nutritional support is included.",
    recoveryTime: "4–6 weeks",
    risks:
      "Leaks, stricture, nutritional deficiencies, GERD. Mitigated by experienced surgical teams and long-term follow-up programs.",
    image:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop",
    successRate: 96.0,
    avgCostUSD: 5500,
    keyBenefits: [
      "Laparoscopic & robotic options",
      "Nutritional counselling included",
      "60% cost savings",
      "Long-term follow-up care",
    ],
  },
  {
    id: "treat-10",
    name: "Dental Implants",
    category: "Dental",
    description:
      "Dental Implants are titanium posts surgically placed into the jawbone to serve as artificial tooth roots, supporting crowns, bridges, or dentures. Indian dental surgeons use Nobel Biocare, Straumann, and other premium implant systems at 70–80% lower cost than Western countries. Full-mouth rehabilitation, All-on-4, and All-on-6 systems are widely available.",
    recoveryTime: "3–6 months (osseointegration)",
    risks:
      "Implant failure, infection, nerve damage. Risk minimised with 3D CBCT planning and experienced implantologists.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop",
    successRate: 97.8,
    avgCostUSD: 900,
    keyBenefits: [
      "Premium Nobel/Straumann implants",
      "3D CBCT guided planning",
      "80% cost savings",
      "Same-day loading options",
    ],
  },
];

// ──────────────────────────────────────────────────────
//  DOCTORS
// ──────────────────────────────────────────────────────
export const MOCK_DOCTORS: MockDoctor[] = [
  {
    id: "doc-1",
    fullName: "Dr. Arjun Sharma",
    specialty: "Cardiology",
    experienceYears: 22,
    rating: 4.9,
    languages: "English, Hindi, Tamil",
    consultationFee: 120,
    education:
      "MBBS — AIIMS New Delhi\nMD Cardiology — PGIMER Chandigarh\nFellowship in Interventional Cardiology — Cleveland Clinic, USA",
    biography:
      "Dr. Arjun Sharma is a distinguished interventional cardiologist with over 22 years of experience performing complex coronary interventions, structural heart procedures, and electrophysiology studies. He has performed over 6,000 cardiac catheterisation procedures and 1,200 CABG surgeries with outstanding outcomes. A sought-after speaker at international cardiology conferences, Dr. Sharma brings Cleveland Clinic training directly to Chennai.",
    certifications:
      "Fellow of the American College of Cardiology (FACC)\nFellow of the European Society of Cardiology (FESC)\nBoard Certified Interventional Cardiologist",
    successRate: 99.1,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    hospitalId: "hosp-1",
    hospital: { id: "hosp-1", name: "Apollo Hospitals", city: "Chennai" },
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    patientsServed: 8500,
  },
  {
    id: "doc-2",
    fullName: "Dr. Sunita Patel",
    specialty: "Orthopedics",
    experienceYears: 16,
    rating: 4.8,
    languages: "English, Hindi, Gujarati",
    consultationFee: 95,
    education:
      "MBBS — King George's Medical University\nMS Orthopedics — AIIMS New Delhi\nFellowship in Joint Reconstruction — Hospital for Special Surgery, New York",
    biography:
      "Dr. Sunita Patel is a leading orthopedic surgeon specialising in joint reconstruction and sports medicine. With fellowship training from Hospital for Special Surgery in New York, she brings world-class expertise in knee and hip replacement surgeries, including robotic-assisted procedures. She has helped over 5,000 international patients regain mobility through precision orthopedic care.",
    certifications:
      "Fellow of the Royal College of Surgeons (FRCS)\nCertified Robotic Surgery Specialist (MAKO System)\nMember, Indian Orthopedic Association",
    successRate: 97.8,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    hospitalId: "hosp-2",
    hospital: { id: "hosp-2", name: "Fortis Escorts Heart Institute", city: "New Delhi" },
    availableDays: ["Mon", "Wed", "Fri", "Sat"],
    patientsServed: 5200,
  },
  {
    id: "doc-3",
    fullName: "Dr. Rahul Mehta",
    specialty: "Neurology",
    experienceYears: 19,
    rating: 4.9,
    languages: "English, Hindi, Marathi",
    consultationFee: 110,
    education:
      "MBBS — Grant Medical College, Mumbai\nDM Neurology — NIMHANS Bangalore\nFellowship in Neuro-Oncology — Johns Hopkins University, USA",
    biography:
      "Dr. Rahul Mehta is an internationally trained neurosurgeon and neurologist with 19 years of experience in brain tumor surgery, complex spine procedures, and neurorehabilitation. His fellowship at Johns Hopkins has shaped his expertise in minimally invasive neurosurgical techniques. He has successfully performed over 3,000 complex intracranial surgeries and is a pioneer of awake brain surgery techniques in India.",
    certifications:
      "Fellow of the World Federation of Neurosurgical Societies\nMember, Society of Neuro-Oncology\nAmerican Academy of Neurology member",
    successRate: 96.5,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    hospitalId: "hosp-3",
    hospital: { id: "hosp-3", name: "Max Super Speciality Hospital", city: "Mumbai" },
    availableDays: ["Tue", "Thu", "Fri", "Sat"],
    patientsServed: 4800,
  },
  {
    id: "doc-4",
    fullName: "Dr. Priya Krishnamurthy",
    specialty: "Oncology",
    experienceYears: 24,
    rating: 5.0,
    languages: "English, Hindi, Tamil, Kannada",
    consultationFee: 130,
    education:
      "MBBS — Madras Medical College\nMD Oncology — Tata Memorial Hospital, Mumbai\nFellowship in Haematological Oncology — MD Anderson Cancer Center, USA",
    biography:
      "Dr. Priya Krishnamurthy is one of India's most celebrated oncologists with 24 years of dedicated cancer care. Her fellowship at MD Anderson Cancer Center, Houston, gives her access to the very latest NCCN protocols and clinical trial methodologies. She specialises in haematological malignancies, breast cancer, and lung cancer treatment, combining precision medicine with compassionate patient care. Patients from over 45 countries have sought her expertise.",
    certifications:
      "Fellow of the American Society of Clinical Oncology (FASCO)\nEuropean Society for Medical Oncology member\nBoard Certified Medical Oncologist",
    successRate: 94.2,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop",
    hospitalId: "hosp-1",
    hospital: { id: "hosp-1", name: "Apollo Hospitals", city: "Chennai" },
    availableDays: ["Mon", "Tue", "Thu", "Fri"],
    patientsServed: 9800,
  },
  {
    id: "doc-5",
    fullName: "Dr. Vikram Singh",
    specialty: "Robotic Surgery",
    experienceYears: 14,
    rating: 4.8,
    languages: "English, Hindi, Punjabi",
    consultationFee: 140,
    education:
      "MBBS — PGIMER Chandigarh\nMS General Surgery — AIIMS Delhi\nFellowship in Robotic Surgery — Intuitive Surgical Training Institute, USA",
    biography:
      "Dr. Vikram Singh is India's leading robotic and laparoscopic surgeon with over 14 years of experience. He is an Intuitive Surgical-certified da Vinci robot surgeon and has performed over 2,500 robotic procedures spanning urological, colorectal, and bariatric surgeries. His minimally invasive approach means significantly reduced hospital stays and faster recovery for international patients.",
    certifications:
      "da Vinci Xi Certified Robotic Surgeon\nFellow of the International Society for Robotic Surgery\nAMS Master Surgeon",
    successRate: 98.3,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop&crop=faces&faceindex=1",
    hospitalId: "hosp-3",
    hospital: { id: "hosp-3", name: "Max Super Speciality Hospital", city: "Mumbai" },
    availableDays: ["Mon", "Wed", "Thu", "Fri"],
    patientsServed: 3200,
  },
  {
    id: "doc-6",
    fullName: "Dr. Anita Desai",
    specialty: "Ophthalmology",
    experienceYears: 17,
    rating: 4.7,
    languages: "English, Hindi, Kannada",
    consultationFee: 80,
    education:
      "MBBS — Bangalore Medical College\nMS Ophthalmology — AIIMS New Delhi\nFellowship in Vitreoretinal Surgery — University of Michigan, USA",
    biography:
      "Dr. Anita Desai is a pioneer in corneal surgery and advanced refractive procedures. With 17 years of practice and fellowship training from the University of Michigan, she has performed over 15,000 LASIK procedures and 3,000 complex cataract and retinal surgeries. Her expertise includes SMILE, Femtosecond LASIK, trifocal IOL implantation, and complex vitreoretinal surgeries.",
    certifications:
      "Fellow of All India Ophthalmological Society\nAmerican Academy of Ophthalmology International Member\nCertified LASIK & Refractive Surgery Specialist",
    successRate: 99.2,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop&crop=faces&faceindex=1",
    hospitalId: "hosp-4",
    hospital: { id: "hosp-4", name: "Manipal Hospital", city: "Bangalore" },
    availableDays: ["Mon", "Tue", "Wed", "Sat"],
    patientsServed: 18500,
  },
  {
    id: "doc-7",
    fullName: "Dr. Rajesh Kumar",
    specialty: "Cardiology",
    experienceYears: 26,
    rating: 4.9,
    languages: "English, Hindi, Malayalam",
    consultationFee: 100,
    education:
      "MBBS — Government Medical College Thiruvananthapuram\nDM Cardiology — SCTIMST\nFellowship in Paediatric Cardiac Surgery — Great Ormond Street Hospital, UK",
    biography:
      "Dr. Rajesh Kumar is one of India's most experienced cardiac surgeons with 26 years of service at Narayana Health. He has performed over 12,000 open-heart surgeries, including complex congenital heart defect repairs, valve replacements, and coronary artery bypass procedures. Trained at Great Ormond Street in London, he is the chief of paediatric cardiac surgery and leads adult cardiac programmes with unparalleled outcomes.",
    certifications:
      "Fellow of the Royal College of Surgeons of England (FRCS)\nFellow of the European Association for Cardio-Thoracic Surgery\nNational Medical Excellence Award 2019",
    successRate: 99.3,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop&crop=faces&faceindex=1",
    hospitalId: "hosp-5",
    hospital: { id: "hosp-5", name: "Narayana Health", city: "Bangalore" },
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    patientsServed: 14000,
  },
  {
    id: "doc-8",
    fullName: "Dr. Meera Iyer",
    specialty: "Fertility & IVF",
    experienceYears: 15,
    rating: 4.8,
    languages: "English, Hindi, Tamil, Kannada",
    consultationFee: 90,
    education:
      "MBBS — Kasturba Medical College\nMS Obstetrics & Gynaecology — JIPMER Puducherry\nFellowship in Reproductive Medicine — Karolinska Institutet, Sweden",
    biography:
      "Dr. Meera Iyer is a celebrated fertility specialist and reproductive endocrinologist with 15 years of dedicated IVF practice. With fellowship training from Karolinska Institutet in Sweden, she has helped over 4,500 couples achieve parenthood. Her clinic at Kokilaben Hospital is equipped with the latest time-lapse embryo monitoring, PGT-A genetic testing, and egg vitrification technologies, achieving some of India's highest IVF success rates.",
    certifications:
      "Fellow of the Royal College of Obstetricians & Gynaecologists (FRCOG)\nEuropean Society of Human Reproduction and Embryology member\nBoard Certified Reproductive Endocrinologist",
    successRate: 62.5,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop&crop=faces&faceindex=1",
    hospitalId: "hosp-6",
    hospital: { id: "hosp-6", name: "Kokilaben Dhirubhai Ambani Hospital", city: "Mumbai" },
    availableDays: ["Mon", "Wed", "Thu", "Sat"],
    patientsServed: 4500,
  },
  {
    id: "doc-9",
    fullName: "Dr. Suresh Reddy",
    specialty: "Bariatric Surgery",
    experienceYears: 12,
    rating: 4.7,
    languages: "English, Hindi, Telugu",
    consultationFee: 110,
    education:
      "MBBS — Osmania Medical College, Hyderabad\nMS Surgery — PGIMER Chandigarh\nFellowship in Bariatric & Metabolic Surgery — Cleveland Clinic, USA",
    biography:
      "Dr. Suresh Reddy is one of India's most sought-after bariatric and metabolic surgeons. With fellowship training from Cleveland Clinic and 12 years of specialised practice, he has performed over 3,000 bariatric procedures including gastric sleeve, gastric bypass, and mini-bypass operations. His holistic approach integrates pre-operative psychological evaluation, nutritional counselling, and comprehensive long-term follow-up, delivering sustainable weight loss results.",
    certifications:
      "Fellow of the International Federation for the Surgery of Obesity (IFSO)\nCertified da Vinci Robotic Bariatric Surgeon\nAmerican Society for Metabolic & Bariatric Surgery member",
    successRate: 96.8,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    hospitalId: "hosp-2",
    hospital: { id: "hosp-2", name: "Fortis Escorts Heart Institute", city: "New Delhi" },
    availableDays: ["Tue", "Wed", "Thu", "Sat"],
    patientsServed: 3100,
  },
  {
    id: "doc-10",
    fullName: "Dr. Kavitha Nair",
    specialty: "Spine Surgery",
    experienceYears: 21,
    rating: 4.8,
    languages: "English, Hindi, Kannada, Malayalam",
    consultationFee: 105,
    education:
      "MBBS — Mysore Medical College\nMCh Neurosurgery — NIMHANS Bangalore\nFellowship in Spine Surgery — Spine Institute, Austria",
    biography:
      "Dr. Kavitha Nair is one of Asia's leading spine surgeons with 21 years of dedicated spinal surgery experience. Trained at Austria's renowned Spine Institute, she specialises in complex deformity corrections, minimally invasive lumbar fusions, cervical disc replacements, and advanced neuromonitoring-guided procedures. She has successfully operated on over 4,000 patients, with a particular focus on cases previously deemed inoperable in their home countries.",
    certifications:
      "Fellow of the AOSpine — Spine Specialists\nMember, Scoliosis Research Society\nAOSpine Master Faculty",
    successRate: 97.4,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop",
    hospitalId: "hosp-4",
    hospital: { id: "hosp-4", name: "Manipal Hospital", city: "Bangalore" },
    availableDays: ["Mon", "Tue", "Thu", "Fri"],
    patientsServed: 4100,
  },
];

// ──────────────────────────────────────────────────────
//  HOSPITAL-TREATMENT PRICING
// ──────────────────────────────────────────────────────
export const MOCK_HOSPITAL_TREATMENTS: MockHospitalTreatment[] = [
  // CABG
  { hospitalId: "hosp-1", treatmentId: "treat-1", averageCost: 5200 },
  { hospitalId: "hosp-2", treatmentId: "treat-1", averageCost: 5500 },
  { hospitalId: "hosp-3", treatmentId: "treat-1", averageCost: 6000 },
  { hospitalId: "hosp-5", treatmentId: "treat-1", averageCost: 4800 },
  // Knee Replacement
  { hospitalId: "hosp-1", treatmentId: "treat-2", averageCost: 6500 },
  { hospitalId: "hosp-2", treatmentId: "treat-2", averageCost: 6200 },
  { hospitalId: "hosp-4", treatmentId: "treat-2", averageCost: 5900 },
  { hospitalId: "hosp-5", treatmentId: "treat-2", averageCost: 5500 },
  // Hip Replacement
  { hospitalId: "hosp-2", treatmentId: "treat-3", averageCost: 7000 },
  { hospitalId: "hosp-4", treatmentId: "treat-3", averageCost: 6500 },
  { hospitalId: "hosp-5", treatmentId: "treat-3", averageCost: 6000 },
  // Spinal Fusion
  { hospitalId: "hosp-3", treatmentId: "treat-4", averageCost: 9800 },
  { hospitalId: "hosp-4", treatmentId: "treat-4", averageCost: 9200 },
  { hospitalId: "hosp-6", treatmentId: "treat-4", averageCost: 10500 },
  // LASIK
  { hospitalId: "hosp-1", treatmentId: "treat-5", averageCost: 1100 },
  { hospitalId: "hosp-4", treatmentId: "treat-5", averageCost: 1050 },
  { hospitalId: "hosp-6", treatmentId: "treat-5", averageCost: 1300 },
  // Chemotherapy
  { hospitalId: "hosp-1", treatmentId: "treat-6", averageCost: 2800 },
  { hospitalId: "hosp-3", treatmentId: "treat-6", averageCost: 3100 },
  { hospitalId: "hosp-5", treatmentId: "treat-6", averageCost: 2500 },
  { hospitalId: "hosp-6", treatmentId: "treat-6", averageCost: 3300 },
  // Liver Transplant
  { hospitalId: "hosp-1", treatmentId: "treat-7", averageCost: 24000 },
  { hospitalId: "hosp-3", treatmentId: "treat-7", averageCost: 26000 },
  { hospitalId: "hosp-6", treatmentId: "treat-7", averageCost: 28000 },
  // IVF
  { hospitalId: "hosp-6", treatmentId: "treat-8", averageCost: 2600 },
  { hospitalId: "hosp-3", treatmentId: "treat-8", averageCost: 2900 },
  // Bariatric
  { hospitalId: "hosp-2", treatmentId: "treat-9", averageCost: 5200 },
  { hospitalId: "hosp-3", treatmentId: "treat-9", averageCost: 5800 },
  { hospitalId: "hosp-6", treatmentId: "treat-9", averageCost: 5500 },
  // Dental Implants
  { hospitalId: "hosp-1", treatmentId: "treat-10", averageCost: 850 },
  { hospitalId: "hosp-4", treatmentId: "treat-10", averageCost: 800 },
  { hospitalId: "hosp-6", treatmentId: "treat-10", averageCost: 950 },
];

// ──────────────────────────────────────────────────────
//  MOCK REVIEWS
// ──────────────────────────────────────────────────────
export interface MockReview {
  id: string;
  patientName: string;
  country: string;
  rating: number;
  comment: string;
  treatment: string;
  date: string;
}

export const MOCK_REVIEWS: MockReview[] = [
  {
    id: "rev-1",
    patientName: "James Mitchell",
    country: "United Kingdom",
    rating: 5,
    comment:
      "I travelled from London for my knee replacement at Apollo Chennai. The surgery was flawless — Dr. Sharma's team treated me like royalty. Cost was a fraction of what the NHS quoted me, and the recovery care was exceptional.",
    treatment: "Total Knee Replacement",
    date: "2025-11-15",
  },
  {
    id: "rev-2",
    patientName: "Sarah Al-Rashidi",
    country: "UAE",
    rating: 5,
    comment:
      "My IVF journey with Dr. Meera Iyer was life-changing. After three failed cycles in Dubai, she adjusted my protocol and I conceived on the first attempt in India. Forever grateful.",
    treatment: "IVF Treatment",
    date: "2025-10-03",
  },
  {
    id: "rev-3",
    patientName: "David Okafor",
    country: "Nigeria",
    rating: 5,
    comment:
      "Dr. Rajesh Kumar at Narayana performed my CABG. The surgical outcome was outstanding and the hospital staff went above and beyond. The total cost including flights was still 60% less than US quotes.",
    treatment: "CABG",
    date: "2025-09-22",
  },
  {
    id: "rev-4",
    patientName: "Karen Thompson",
    country: "Canada",
    rating: 5,
    comment:
      "Kokilaben is truly world-class. My cancer treatment under Dr. Krishnamurthy was handled with incredible skill and warmth. The hospital's international department arranged everything seamlessly — visa letter, accommodation, airport transfers.",
    treatment: "Chemotherapy",
    date: "2025-12-01",
  },
];

// ──────────────────────────────────────────────────────
//  HELPER FUNCTIONS
// ──────────────────────────────────────────────────────
export function getTreatments(opts?: {
  category?: string;
  search?: string;
}): MockTreatment[] {
  let data = MOCK_TREATMENTS;
  if (opts?.category && opts.category !== "all") {
    data = data.filter((t) => t.category === opts.category);
  }
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    data = data.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }
  return data;
}

export function getTreatmentById(id: string): MockTreatment | undefined {
  return MOCK_TREATMENTS.find((t) => t.id === id);
}

export function getTreatmentHospitals(treatmentId: string) {
  return MOCK_HOSPITAL_TREATMENTS.filter(
    (ht) => ht.treatmentId === treatmentId
  ).map((ht) => {
    const hospital = MOCK_HOSPITALS.find((h) => h.id === ht.hospitalId)!;
    return {
      hospitalId: ht.hospitalId,
      hospitalName: hospital.name,
      city: hospital.city,
      accreditation: hospital.accreditation,
      rating: hospital.rating,
      averageCost: ht.averageCost,
    };
  });
}

export function getHospitals(opts?: {
  city?: string;
  accreditation?: string;
  search?: string;
}): MockHospital[] {
  let data = MOCK_HOSPITALS;
  if (opts?.city && opts.city !== "all") {
    data = data.filter((h) => h.city === opts.city);
  }
  if (opts?.accreditation && opts.accreditation !== "all") {
    data = data.filter((h) =>
      h.accreditation.includes(opts.accreditation!)
    );
  }
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    data = data.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.specialties.some((s) => s.toLowerCase().includes(q))
    );
  }
  return data;
}

export function getHospitalById(id: string): MockHospital | undefined {
  return MOCK_HOSPITALS.find((h) => h.id === id);
}

export function getHospitalDoctors(hospitalId: string): MockDoctor[] {
  return MOCK_DOCTORS.filter((d) => d.hospitalId === hospitalId);
}

export function getHospitalTreatments(hospitalId: string) {
  return MOCK_HOSPITAL_TREATMENTS.filter(
    (ht) => ht.hospitalId === hospitalId
  ).map((ht) => {
    const treatment = MOCK_TREATMENTS.find((t) => t.id === ht.treatmentId)!;
    return {
      ...treatment,
      averageCost: ht.averageCost,
    };
  });
}

export function getDoctors(opts?: {
  specialty?: string;
  hospitalId?: string;
  search?: string;
}): MockDoctor[] {
  let data = MOCK_DOCTORS;
  if (opts?.specialty && opts.specialty !== "all") {
    data = data.filter((d) => d.specialty === opts.specialty);
  }
  if (opts?.hospitalId && opts.hospitalId !== "all") {
    data = data.filter((d) => d.hospitalId === opts.hospitalId);
  }
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    data = data.filter(
      (d) =>
        d.fullName.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.hospital.name.toLowerCase().includes(q) ||
        d.hospital.city.toLowerCase().includes(q)
    );
  }
  return data;
}

export function getDoctorById(id: string): MockDoctor | undefined {
  return MOCK_DOCTORS.find((d) => d.id === id);
}

export function getCostEstimates(
  treatmentId: string,
  currency: string
): {
  hospitalId: string;
  hospitalName: string;
  city: string;
  accreditation: string;
  rating: number;
  averageCost: number;
  convertedCost: number;
  currency: string;
}[] {
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    AED: 3.67,
    INR: 83.5,
  };
  const rate = rates[currency] ?? 1;

  return MOCK_HOSPITAL_TREATMENTS.filter(
    (ht) => ht.treatmentId === treatmentId
  ).map((ht) => {
    const hospital = MOCK_HOSPITALS.find((h) => h.id === ht.hospitalId)!;
    return {
      hospitalId: ht.hospitalId,
      hospitalName: hospital.name,
      city: hospital.city,
      accreditation: hospital.accreditation,
      rating: hospital.rating,
      averageCost: ht.averageCost,
      convertedCost: Math.round(ht.averageCost * rate),
      currency,
    };
  });
}

// Mock dashboard data
export const MOCK_APPOINTMENTS = [
  {
    id: "appt-1",
    doctorName: "Dr. Arjun Sharma",
    specialty: "Cardiology",
    hospital: "Apollo Hospitals",
    city: "Chennai",
    date: "2026-07-15",
    time: "10:00 AM",
    status: "CONFIRMED",
    consultationFee: 120,
    notes: "Pre-op consultation for CABG",
    treatmentName: "Coronary Artery Bypass Graft",
  },
  {
    id: "appt-2",
    doctorName: "Dr. Sunita Patel",
    specialty: "Orthopedics",
    hospital: "Fortis Escorts",
    city: "New Delhi",
    date: "2026-06-20",
    time: "2:30 PM",
    status: "PENDING",
    consultationFee: 95,
    notes: "Initial consultation for knee replacement",
    treatmentName: "Total Knee Replacement",
  },
  {
    id: "appt-3",
    doctorName: "Dr. Priya Krishnamurthy",
    specialty: "Oncology",
    hospital: "Apollo Hospitals",
    city: "Chennai",
    date: "2026-05-10",
    time: "11:00 AM",
    status: "COMPLETED",
    consultationFee: 130,
    notes: "Follow-up after chemotherapy cycle 2",
    treatmentName: "Cancer Chemotherapy",
  },
];

export const MOCK_REPORTS = [
  {
    id: "rep-1",
    fileName: "blood_test_results.pdf",
    fileType: "PDF",
    fileSize: 1240000,
    description: "Complete blood count and lipid panel",
    uploadedAt: "2026-05-20T10:30:00Z",
    fileUrl: "#",
  },
  {
    id: "rep-2",
    fileName: "cardiac_ct_scan.pdf",
    fileType: "PDF",
    fileSize: 8500000,
    description: "Coronary CT angiography report",
    uploadedAt: "2026-05-18T14:15:00Z",
    fileUrl: "#",
  },
  {
    id: "rep-3",
    fileName: "ecg_report.pdf",
    fileType: "PDF",
    fileSize: 540000,
    description: "12-lead ECG interpretation",
    uploadedAt: "2026-05-15T09:00:00Z",
    fileUrl: "#",
  },
];

// ──────────────────────────────────────────────────────
//  CURRENCIES
// ──────────────────────────────────────────────────────
export const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "AED", name: "UAE Dirham" },
  { code: "INR", name: "Indian Rupee" },
];
