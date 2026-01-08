import React, { useState } from 'react';
import { LoginScreen } from './components/auth/LoginScreen';
import { BranchSelection } from './components/auth/BranchSelection';
import { MainLayout } from './components/layout/MainLayout';

export type UserRole = 'admin' | 'owner' | 'cashier' | 'pharmacist' | 'nurse' | 'doctor';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  branch?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedBranch(null);
  };

  // Show login screen if not authenticated
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Show branch selection if authenticated but no branch selected
  if (!selectedBranch) {
    return <BranchSelection onSelect={handleBranchSelect} user={user} />;
  }

  // Show main application
  return <MainLayout user={user} branch={selectedBranch} onLogout={handleLogout} />;
}
