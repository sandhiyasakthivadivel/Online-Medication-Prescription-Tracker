
import { User, UserRole, DoctorCategory } from './types';

export const MOCK_DOCTORS: User[] = [
  { id: 'd1', name: 'Dr. Sarah Wilson', role: UserRole.DOCTOR, email: 'sarah@medtrack.com', specialty: DoctorCategory.GENERAL },
  { id: 'd2', name: 'Dr. James Heart', role: UserRole.DOCTOR, email: 'james@medtrack.com', specialty: DoctorCategory.CARDIOLOGY },
  { id: 'd3', name: 'Dr. Emily Bone', role: UserRole.DOCTOR, email: 'emily@medtrack.com', specialty: DoctorCategory.ORTHOPEDICS },
  { id: 'd4', name: 'Dr. Alan Skin', role: UserRole.DOCTOR, email: 'alan@medtrack.com', specialty: DoctorCategory.DERMATOLOGY },
];

export const MOCK_PATIENTS: User[] = [
  { id: 'p1', name: 'John Doe', role: UserRole.PATIENT, email: 'john@example.com' },
];

export const MOCK_ADMIN: User = { id: 'a1', name: 'Head Admin', role: UserRole.ADMIN, email: 'admin@medtrack.com' };
export const MOCK_LAB: User = { id: 'l1', name: 'Central Lab', role: UserRole.LAB, email: 'lab@medtrack.com' };
