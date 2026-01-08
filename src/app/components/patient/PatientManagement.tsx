import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Plus, User as UserIcon, Calendar, FileText, AlertCircle } from 'lucide-react';
import type { User } from '../../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface PatientManagementProps {
  user: User;
}

const patients = [
  {
    id: 'PAT-001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    contact: '+1234567890',
    email: 'john.doe@email.com',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: '2026-01-05',
    visits: 12,
  },
  {
    id: 'PAT-002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    contact: '+0987654321',
    email: 'jane.smith@email.com',
    bloodGroup: 'A+',
    allergies: ['None'],
    conditions: ['Asthma'],
    lastVisit: '2026-01-07',
    visits: 8,
  },
  {
    id: 'PAT-003',
    name: 'Mike Johnson',
    age: 58,
    gender: 'Male',
    contact: '+1122334455',
    email: 'mike.j@email.com',
    bloodGroup: 'B+',
    allergies: ['Sulfa drugs'],
    conditions: ['Arthritis', 'High Cholesterol'],
    lastVisit: '2026-01-08',
    visits: 24,
  },
];

export function PatientManagement({ user }: PatientManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">View and manage patient records</p>
        </div>
        <Button onClick={() => setShowRegister(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Register Patient
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New This Month</p>
                <p className="text-3xl font-bold text-green-600">48</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Visited Today</p>
                <p className="text-3xl font-bold text-teal-600">23</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search patients by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patient Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPatient(patient)}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <UserIcon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.id}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-medium">{patient.age} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="font-medium">{patient.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Blood Group</p>
                    <p className="font-medium">{patient.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Visits</p>
                    <p className="font-medium">{patient.visits}</p>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div>
                    <p className="text-xs text-gray-600">Last Visit</p>
                    <p className="text-sm font-medium">{patient.lastVisit}</p>
                  </div>
                  {patient.allergies.length > 0 && patient.allergies[0] !== 'None' && (
                    <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-red-900">Allergies</p>
                        <p className="text-xs text-red-700">{patient.allergies.join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Register Patient Dialog */}
      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Register New Patient</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <select className="w-full h-10 rounded-md border px-3">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <select className="w-full h-10 rounded-md border px-3">
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input type="tel" placeholder="+1234567890" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea placeholder="Enter full address" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Known Allergies</Label>
              <Textarea placeholder="List any known allergies (comma separated)" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Medical Conditions</Label>
              <Textarea placeholder="List existing medical conditions" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegister(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Register Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Details Dialog */}
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Patient Profile - {selectedPatient.name}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Patient ID</p>
                    <p className="font-semibold">{selectedPatient.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age / Gender</p>
                    <p className="font-semibold">{selectedPatient.age} years / {selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p className="font-semibold">{selectedPatient.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Visits</p>
                    <p className="font-semibold">{selectedPatient.visits}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold">{selectedPatient.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selectedPatient.email}</p>
                  </div>
                </div>

                {selectedPatient.allergies[0] !== 'None' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">⚠️ Allergies</h4>
                    <div className="flex gap-2">
                      {selectedPatient.allergies.map((allergy, idx) => (
                        <Badge key={idx} variant="destructive">{allergy}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Medical Conditions</h4>
                  <div className="flex gap-2">
                    {selectedPatient.conditions.map((condition, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-700">{condition}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>Medical history timeline</p>
                  <p className="text-sm">View all patient visits and treatments</p>
                </div>
              </TabsContent>

              <TabsContent value="prescriptions">
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>Patient prescription history</p>
                </div>
              </TabsContent>

              <TabsContent value="invoices">
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>Billing and payment history</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
