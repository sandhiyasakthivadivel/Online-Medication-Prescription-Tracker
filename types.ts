
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  LAB = 'LAB'
}

export enum DoctorCategory {
  GENERAL = 'General Doctor',
  CARDIOLOGY = 'Heart Doctor',
  ORTHOPEDICS = 'Bone Doctor',
  DERMATOLOGY = 'Skin Doctor'
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  specialty?: DoctorCategory;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorCategory: DoctorCategory;
  preferredDate: string;
  timeSlot?: string;
  status: AppointmentStatus;
  adminNotes?: string;
  doctorId?: string; // Assigned by Admin
}

export interface LabTest {
  id: string;
  appointmentId: string;
  patientId: string;
  testName: string;
  status: 'REQUESTED' | 'COMPLETED';
  results?: string;
  requestedAt: string;
  cost: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  diagnosis: string;
  notes: string;
  prescriptions: Prescription[];
  updatedAt: string;
}

export interface Prescription {
  medicine: string;
  dosage: string;
  frequency: string;
}

export interface Bill {
  id: string;
  patientId: string;
  appointmentId: string;
  consultationFee: number;
  labFees: number;
  total: number;
  isPaid: boolean;
  date: string;
}
