import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Building2,
  Pill,
  DollarSign,
  ShieldCheck,
  Users,
  Wifi,
  Database,
  Bell,
} from 'lucide-react';
import type { User } from '../../App';
import { Switch } from '../ui/switch';

interface SettingsScreenProps {
  user: User;
}

export function SettingsScreen({ user }: SettingsScreenProps) {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage system configuration and preferences</p>
      </div>

      <Tabs defaultValue="clinic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="clinic">Clinic Profile</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
          <TabsTrigger value="tax">Tax & Pricing</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Clinic Profile */}
        <TabsContent value="clinic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Clinic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Clinic Name</Label>
                  <Input defaultValue="MediPoint Clinic" />
                </div>
                <div className="space-y-2">
                  <Label>License Number</Label>
                  <Input defaultValue="CL-2024-001234" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 Medical Plaza, City Center" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <Input defaultValue="+1234567890" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue="contact@medipoint.com" />
                </div>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">Get notified when stock is running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Expiry Warnings</p>
                  <p className="text-sm text-gray-600">Alert for medicines nearing expiry</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Appointment Reminders</p>
                  <p className="text-sm text-gray-600">Send appointment reminders to patients</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pharmacy Settings */}
        <TabsContent value="pharmacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5" />
                Pharmacy Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pharmacy Name</Label>
                  <Input defaultValue="MediPoint Pharmacy" />
                </div>
                <div className="space-y-2">
                  <Label>License Number</Label>
                  <Input defaultValue="PH-2024-001234" />
                </div>
                <div className="space-y-2">
                  <Label>Min Stock Alert Level</Label>
                  <Input type="number" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Alert (Days)</Label>
                  <Input type="number" defaultValue="90" />
                </div>
              </div>
              <div className="pt-4 border-t space-y-3">
                <h4 className="font-semibold">Prescription Controls</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require Prescription Validation</p>
                    <p className="text-sm text-gray-600">Enforce prescription checks for controlled drugs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Digital Signature Required</p>
                    <p className="text-sm text-gray-600">Require pharmacist signature on controlled substances</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax & Pricing */}
        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Tax Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Standard Tax Rate (%)</Label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label>Tax ID Number</Label>
                  <Input defaultValue="TAX-123456789" />
                </div>
              </div>
              <div className="pt-4 border-t space-y-3">
                <h4 className="font-semibold">Insurance Providers</h4>
                <div className="space-y-2">
                  {['HealthCare Plus', 'MediCare Pro', 'WellCare Insurance'].map((provider) => (
                    <div key={provider} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{provider}</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Add Insurance Provider
                </Button>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
                <Button className="bg-teal-600 hover:bg-teal-700">Add User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Sarah Wilson', role: 'Doctor', email: 'sarah@medipoint.com', status: 'Active' },
                  { name: 'Dr. Michael Brown', role: 'Doctor', email: 'michael@medipoint.com', status: 'Active' },
                  { name: 'John Smith', role: 'Pharmacist', email: 'john@medipoint.com', status: 'Active' },
                  { name: 'Jane Doe', role: 'Nurse', email: 'jane@medipoint.com', status: 'Active' },
                  { name: 'Admin User', role: 'Admin', email: 'admin@medipoint.com', status: 'Active' },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{user.role}</p>
                        <p className="text-xs text-green-600">{user.status}</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Connection</p>
                <p className="font-semibold text-green-700">Online</p>
              </div>
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Last Backup</p>
                <p className="font-semibold text-blue-700">2 hours ago</p>
              </div>
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Sync Status</p>
                <p className="font-semibold text-purple-700">Up to date</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
