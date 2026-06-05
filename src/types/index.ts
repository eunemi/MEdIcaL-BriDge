export interface TreatmentView {
  id: string;
  name: string;
  category: string;
  description: string;
  recoveryTime: string;
  risks: string;
  image: string | null;
}

export interface HospitalView {
  id: string;
  name: string;
  city: string;
  accreditation: string;
  rating: number;
  description: string;
  image: string | null;
  address: string;
  specialties: string[];
  contactEmail: string;
  contactPhone: string;
}

export interface DoctorView {
  id: string;
  fullName: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  languages: string;
  consultationFee: number;
  education: string;
  biography: string;
  successRate: number;
  image: string | null;
  hospital: {
    id: string;
    name: string;
    city: string;
  };
}

export interface CostEstimate {
  hospitalId: string;
  hospitalName: string;
  city: string;
  averageCost: number;
  convertedCost: number;
  currency: string;
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  treatmentNeeded: string;
  preferredCity?: string;
  medicalHistory?: string;
}

export interface UserSession {
  userId: string;
  email: string;
  role: string;
}
