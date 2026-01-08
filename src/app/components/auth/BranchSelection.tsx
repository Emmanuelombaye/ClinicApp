import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Users, Activity, CheckCircle2 } from 'lucide-react';
import type { User } from '../../App';

interface BranchSelectionProps {
  onSelect: (branchId: string) => void;
  user: User;
}

const branches = [
  {
    id: 'branch-1',
    name: 'Main Branch - Downtown',
    address: '123 Medical Plaza, City Center',
    staff: 24,
    status: 'online',
    type: 'Pharmacy & Clinic',
  },
  {
    id: 'branch-2',
    name: 'North Branch',
    address: '456 Healthcare Ave, North District',
    staff: 18,
    status: 'online',
    type: 'Pharmacy Only',
  },
  {
    id: 'branch-3',
    name: 'West Clinic',
    address: '789 Wellness Road, West Side',
    staff: 15,
    status: 'online',
    type: 'Clinic Only',
  },
  {
    id: 'branch-4',
    name: 'East Branch',
    address: '321 Care Street, East End',
    staff: 12,
    status: 'offline',
    type: 'Pharmacy & Clinic',
  },
];

export function BranchSelection({ onSelect, user }: BranchSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white">
            <CardTitle className="text-2xl">Welcome, {user.name}!</CardTitle>
            <CardDescription className="text-teal-50">
              Select your branch to continue • Role: {user.role.toUpperCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {branches.map((branch) => (
                <Card
                  key={branch.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    branch.status === 'offline' ? 'opacity-50' : 'hover:scale-[1.02]'
                  }`}
                  onClick={() => branch.status === 'online' && onSelect(branch.id)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{branch.name}</h3>
                          <p className="text-sm text-gray-500">{branch.type}</p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            branch.status === 'online'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {branch.status === 'online' ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Online
                            </span>
                          ) : (
                            'Offline'
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{branch.address}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{branch.staff} Staff</span>
                        </div>
                        {branch.status === 'online' && (
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            Select
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Multi-Branch Support</h4>
                  <p className="text-sm text-blue-700">
                    Your account has access to multiple branches. Data syncs automatically when
                    online. Offline mode available for uninterrupted service.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
