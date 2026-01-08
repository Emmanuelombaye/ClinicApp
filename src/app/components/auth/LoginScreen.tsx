import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Shield, User as UserIcon, Fingerprint, Activity } from 'lucide-react';
import type { User, UserRole } from '../../App';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [pin, setPin] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const roles: { value: UserRole; label: string; color: string }[] = [
    { value: 'admin', label: 'Admin', color: 'bg-purple-500' },
    { value: 'owner', label: 'Owner', color: 'bg-blue-500' },
    { value: 'cashier', label: 'Cashier', color: 'bg-teal-500' },
    { value: 'pharmacist', label: 'Pharmacist', color: 'bg-green-500' },
    { value: 'nurse', label: 'Nurse', color: 'bg-pink-500' },
    { value: 'doctor', label: 'Doctor', color: 'bg-indigo-500' },
  ];

  const handlePinLogin = (role: UserRole) => {
    if (pin.length >= 4) {
      onLogin({
        id: '1',
        name: role.charAt(0).toUpperCase() + role.slice(1),
        role,
      });
    }
  };

  const handlePasswordLogin = (role: UserRole) => {
    if (username && password) {
      onLogin({
        id: '1',
        name: username,
        role,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-teal-600 p-3 rounded-2xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">MediPoint POS</h1>
          </div>
          <p className="text-gray-600">Pharmacy & Clinic Management System</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-500">System Online</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Staff Login</CardTitle>
            <CardDescription className="text-teal-50">
              Select your role and enter credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="pin" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="pin" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Quick PIN
                </TabsTrigger>
                <TabsTrigger value="password" className="gap-2">
                  <UserIcon className="w-4 h-4" />
                  Password
                </TabsTrigger>
                <TabsTrigger value="biometric" className="gap-2">
                  <Fingerprint className="w-4 h-4" />
                  Biometric
                </TabsTrigger>
              </TabsList>

              {/* PIN Login */}
              <TabsContent value="pin" className="space-y-6">
                <div className="space-y-2">
                  <Label>Enter 4-Digit PIN</Label>
                  <Input
                    type="password"
                    placeholder="••••"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl tracking-widest h-14"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Select Role</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {roles.map((role) => (
                      <Button
                        key={role.value}
                        onClick={() => handlePinLogin(role.value)}
                        variant="outline"
                        disabled={pin.length < 4}
                        className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                      >
                        <div className={`w-10 h-10 rounded-full ${role.color} flex items-center justify-center`}>
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <span>{role.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Password Login */}
              <TabsContent value="password" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Select Role</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {roles.map((role) => (
                      <Button
                        key={role.value}
                        onClick={() => handlePasswordLogin(role.value)}
                        variant="outline"
                        disabled={!username || !password}
                        className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                      >
                        <div className={`w-10 h-10 rounded-full ${role.color} flex items-center justify-center`}>
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <span>{role.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Biometric Login */}
              <TabsContent value="biometric" className="space-y-6">
                <div className="text-center py-12 space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-teal-100 p-8 rounded-full animate-pulse">
                      <Fingerprint className="w-16 h-16 text-teal-600" />
                    </div>
                  </div>
                  <h3 className="text-xl">Place finger on scanner</h3>
                  <p className="text-sm text-gray-500">
                    Biometric authentication will be available in production
                  </p>
                  
                  <div className="pt-6">
                    <Label className="mb-3 block">Or select role to continue (Demo)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {roles.map((role) => (
                        <Button
                          key={role.value}
                          onClick={() => onLogin({ id: '1', name: role.label, role: role.value })}
                          variant="outline"
                          className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                        >
                          <div className={`w-10 h-10 rounded-full ${role.color} flex items-center justify-center`}>
                            <UserIcon className="w-5 h-5 text-white" />
                          </div>
                          <span>{role.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2026 MediPoint POS • v1.0.0 • Secure Healthcare System</p>
        </div>
      </div>
    </div>
  );
}