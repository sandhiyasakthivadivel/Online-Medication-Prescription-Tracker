
import React, { useState, createContext, useContext } from 'react';
import { User, UserRole, Appointment, LabTest, MedicalRecord, Bill } from './types';
import { MOCK_PATIENTS, MOCK_DOCTORS, MOCK_ADMIN, MOCK_LAB } from './constants';
import PatientDashboard from './components/RoleViews/PatientDashboard';
import AdminDashboard from './components/RoleViews/AdminDashboard';
import DoctorDashboard from './components/RoleViews/DoctorDashboard';
import LabDashboard from './components/RoleViews/LabDashboard';
import AuthContainer from './components/Auth/AuthContainer';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  labTests: LabTest[];
  setLabTests: React.Dispatch<React.SetStateAction<LabTest[]>>;
  records: MedicalRecord[];
  setRecords: React.Dispatch<React.SetStateAction<MedicalRecord[]>>;
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    ...MOCK_PATIENTS,
    ...MOCK_DOCTORS,
    MOCK_ADMIN,
    MOCK_LAB
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);

  const renderDashboard = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case UserRole.PATIENT: return <PatientDashboard />;
      case UserRole.ADMIN: return <AdminDashboard />;
      case UserRole.DOCTOR: return <DoctorDashboard />;
      case UserRole.LAB: return <LabDashboard />;
      default: return <div>Unauthorized</div>;
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      users, setUsers,
      appointments, setAppointments,
      labTests, setLabTests,
      records, setRecords,
      bills, setBills
    }}>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {!currentUser ? (
          <AuthContainer />
        ) : (
          <>
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
                <h1 className="text-xl font-bold text-slate-800">MedTrack Pro</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-slate-700">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{currentUser.role}</p>
                </div>
                <button 
                  onClick={() => setCurrentUser(null)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                  title="Logout"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            </header>

            <main className="flex-1 overflow-auto">
              {renderDashboard()}
            </main>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
