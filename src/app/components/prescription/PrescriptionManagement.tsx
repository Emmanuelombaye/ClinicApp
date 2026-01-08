import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Search,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  User as UserIcon,
  ShieldCheck,
  Edit,
  Eye,
} from 'lucide-react';
import type { User } from '../../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PrescriptionManagementProps {
  user: User;
}

const prescriptions = [
  {
    id: 'RX-001',
    patient: 'John Doe',
    patientId: 'PAT-001',
    doctor: 'Dr. Sarah Wilson',
    date: '2026-01-08',
    status: 'pending',
    medicines: [
      { name: 'Amoxicillin 500mg', dosage: '1 tablet', frequency: '3 times daily', duration: '7 days' },
      { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'As needed', duration: '5 days' },
    ],
    notes: 'Take with food. Complete the full course.',
    controlled: false,
  },
  {
    id: 'RX-002',
    patient: 'Jane Smith',
    patientId: 'PAT-002',
    doctor: 'Dr. Michael Brown',
    date: '2026-01-08',
    status: 'approved',
    medicines: [
      { name: 'Metformin 850mg', dosage: '1 tablet', frequency: '2 times daily', duration: '30 days' },
    ],
    notes: 'Monitor blood sugar levels.',
    controlled: false,
  },
  {
    id: 'RX-003',
    patient: 'Mike Johnson',
    patientId: 'PAT-003',
    doctor: 'Dr. Sarah Wilson',
    date: '2026-01-07',
    status: 'dispensed',
    medicines: [
      { name: 'Codeine 30mg', dosage: '1 tablet', frequency: 'Every 6 hours', duration: '3 days' },
    ],
    notes: 'Controlled substance. Patient ID verified.',
    controlled: true,
  },
];

export function PrescriptionManagement({ user }: PrescriptionManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<typeof prescriptions[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'dispensed':
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Dispensed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPrescriptions = prescriptions.filter(
    (rx) =>
      rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Prescription Management</h1>
          <p className="text-gray-600 mt-1">Create, approve, and dispense prescriptions</p>
        </div>
        {user.role === 'doctor' && (
          <Button onClick={() => setShowCreate(true)} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            New Prescription
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
                <p className="text-3xl font-bold text-amber-600">5</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Dispensed Today</p>
                <p className="text-3xl font-bold text-green-600">18</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Controlled Drugs</p>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-red-600" />
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
              placeholder="Search by patient name or prescription ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <div className="space-y-3">
        {filteredPrescriptions.map((rx) => (
          <Card key={rx.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{rx.id}</h3>
                      {getStatusBadge(rx.status)}
                      {rx.controlled && (
                        <Badge variant="destructive" className="text-xs">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          Controlled
                        </Badge>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Patient</p>
                        <p className="font-medium">{rx.patient}</p>
                        <p className="text-xs text-gray-500">{rx.patientId}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Doctor</p>
                        <p className="font-medium">{rx.doctor}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium">{rx.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedPrescription(rx)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {user.role === 'pharmacist' && rx.status === 'approved' && (
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        Dispense
                      </Button>
                    )}
                  </div>
                </div>

                {/* Medicines */}
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Medications</p>
                  <div className="space-y-2">
                    {rx.medicines.map((med, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3">
                        <div className="grid sm:grid-cols-4 gap-2 text-sm">
                          <div>
                            <p className="font-medium text-gray-900">{med.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Dosage: {med.dosage}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Frequency: {med.frequency}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration: {med.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {rx.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Notes:</strong> {rx.notes}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Prescription Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Create New Prescription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PAT-001">John Doe (PAT-001)</SelectItem>
                    <SelectItem value="PAT-002">Jane Smith (PAT-002)</SelectItem>
                    <SelectItem value="PAT-003">Mike Johnson (PAT-003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" defaultValue="2026-01-08" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Diagnosis</Label>
              <Textarea placeholder="Enter diagnosis..." rows={2} />
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Medications</h4>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medicine
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500 text-center">
                No medications added yet
              </div>
            </div>

            <div className="space-y-2">
              <Label>Instructions / Notes</Label>
              <Textarea placeholder="Special instructions for patient..." rows={3} />
            </div>

            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-amber-800">
                This prescription will require pharmacist approval before dispensing
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Create Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Prescription Dialog */}
      {selectedPrescription && (
        <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Prescription Details - {selectedPrescription.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="font-semibold">{selectedPrescription.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-semibold">{selectedPrescription.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{selectedPrescription.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedPrescription.status)}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Medications</h4>
                <div className="space-y-2">
                  {selectedPrescription.medicines.map((med, idx) => (
                    <div key={idx} className="border rounded-lg p-3">
                      <p className="font-medium">{med.name}</p>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-gray-600">
                        <p>Dosage: {med.dosage}</p>
                        <p>Frequency: {med.frequency}</p>
                        <p>Duration: {med.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPrescription.notes && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm"><strong>Notes:</strong> {selectedPrescription.notes}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPrescription(null)}>
                Close
              </Button>
              {user.role === 'pharmacist' && selectedPrescription.status === 'approved' && (
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Dispense Now
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
