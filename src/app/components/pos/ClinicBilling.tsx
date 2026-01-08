import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  ShieldCheck,
  User as UserIcon,
  Stethoscope,
  FlaskConical,
  Pill,
  CreditCard,
} from 'lucide-react';
import type { User } from '../../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ClinicBillingProps {
  user: User;
}

interface BillItem {
  id: string;
  name: string;
  type: 'consultation' | 'lab' | 'procedure' | 'medicine';
  price: number;
  quantity: number;
  insuranceCovered: boolean;
  coveragePercent: number;
}

const services = [
  { id: 'CONS-001', name: 'General Consultation', type: 'consultation' as const, price: 50.00, duration: '30 min' },
  { id: 'CONS-002', name: 'Specialist Consultation', type: 'consultation' as const, price: 100.00, duration: '45 min' },
  { id: 'LAB-001', name: 'Complete Blood Count (CBC)', type: 'lab' as const, price: 35.00, duration: '2-4 hours' },
  { id: 'LAB-002', name: 'Lipid Profile', type: 'lab' as const, price: 45.00, duration: '4-6 hours' },
  { id: 'LAB-003', name: 'HbA1c Test', type: 'lab' as const, price: 40.00, duration: '24 hours' },
  { id: 'LAB-004', name: 'Thyroid Function Test', type: 'lab' as const, price: 55.00, duration: '24 hours' },
  { id: 'PROC-001', name: 'Minor Surgery', type: 'procedure' as const, price: 250.00, duration: '1 hour' },
  { id: 'PROC-002', name: 'Wound Dressing', type: 'procedure' as const, price: 30.00, duration: '20 min' },
  { id: 'PROC-003', name: 'IV Therapy', type: 'procedure' as const, price: 75.00, duration: '45 min' },
  { id: 'PROC-004', name: 'Nebulization', type: 'procedure' as const, price: 25.00, duration: '15 min' },
];

const patients = [
  { id: 'PAT-001', name: 'John Doe', age: 45, insurance: 'HealthCare Plus', coverage: 80 },
  { id: 'PAT-002', name: 'Jane Smith', age: 32, insurance: 'MediCare Pro', coverage: 70 },
  { id: 'PAT-003', name: 'Mike Johnson', age: 58, insurance: 'None', coverage: 0 },
];

export function ClinicBilling({ user }: ClinicBillingProps) {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);

  const addToBill = (service: typeof services[0]) => {
    const existingItem = billItems.find((item) => item.id === service.id);
    if (existingItem) {
      setBillItems(
        billItems.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setBillItems([
        ...billItems,
        {
          ...service,
          quantity: 1,
          insuranceCovered: selectedPatient?.coverage ? selectedPatient.coverage > 0 : false,
          coveragePercent: selectedPatient?.coverage || 0,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setBillItems(
      billItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeFromBill = (id: string) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const insuranceCoverage = billItems.reduce(
    (sum, item) =>
      sum +
      (item.insuranceCovered ? (item.price * item.quantity * item.coveragePercent) / 100 : 0),
    0
  );
  const total = subtotal - insuranceCoverage;

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="w-5 h-5" />;
      case 'lab':
        return <FlaskConical className="w-5 h-5" />;
      case 'procedure':
        return <Receipt className="w-5 h-5" />;
      case 'medicine':
        return <Pill className="w-5 h-5" />;
      default:
        return <Receipt className="w-5 h-5" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-700';
      case 'lab':
        return 'bg-purple-100 text-purple-700';
      case 'procedure':
        return 'bg-teal-100 text-teal-700';
      case 'medicine':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-gray-50">
      {/* Services & Patient Selection - Left Side */}
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Select Patient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {patients.map((patient) => (
                <Card
                  key={patient.id}
                  className={`cursor-pointer transition-all ${
                    selectedPatient?.id === patient.id
                      ? 'ring-2 ring-teal-600 bg-teal-50'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.id}</p>
                      <div className="pt-2 border-t space-y-1">
                        <p className="text-xs text-gray-600">Age: {patient.age}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-600">
                            {patient.insurance !== 'None' ? patient.insurance : 'No Insurance'}
                          </p>
                          {patient.coverage > 0 && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              {patient.coverage}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Services */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search services and procedures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
                disabled={!selectedPatient}
              />
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="flex-1 overflow-auto">
          {!selectedPatient ? (
            <div className="flex items-center justify-center h-full text-center text-gray-400">
              <div>
                <UserIcon className="w-16 h-16 mx-auto mb-3" />
                <p>Please select a patient to continue</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => addToBill(service)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                          <p className="text-xs text-gray-500">{service.id}</p>
                        </div>
                        <div className={`p-2 rounded-lg ${getTypeBadgeColor(service.type)}`}>
                          {getTypeIcon(service.type)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <p className="text-2xl font-bold text-teal-600">${service.price}</p>
                          <p className="text-xs text-gray-500">{service.duration}</p>
                        </div>
                        <Button size="icon" className="bg-teal-600 hover:bg-teal-700">
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bill Summary - Right Side */}
      <div className="w-full lg:w-96 xl:w-[450px] bg-white border-l flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Invoice</h2>
          {selectedPatient ? (
            <div className="mt-2">
              <p className="text-sm font-medium">{selectedPatient.name}</p>
              <p className="text-xs text-gray-500">{selectedPatient.id}</p>
              {selectedPatient.insurance !== 'None' && (
                <Badge className="mt-1 bg-green-100 text-green-700 text-xs">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {selectedPatient.insurance} - {selectedPatient.coverage}% coverage
                </Badge>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No patient selected</p>
          )}
        </div>

        {/* Bill Items */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {billItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <Receipt className="w-16 h-16 mb-3" />
              <p>No services added</p>
              <p className="text-sm">Select services to add to bill</p>
            </div>
          ) : (
            billItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <Badge className={`text-xs mt-1 ${getTypeBadgeColor(item.type)}`}>
                          {item.type}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromBill(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.insuranceCovered && (
                          <p className="text-xs text-green-600">
                            Coverage: -${((item.price * item.quantity * item.coveragePercent) / 100).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Totals & Actions */}
        <div className="border-t p-4 space-y-4 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            {insuranceCoverage > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Insurance Coverage</span>
                <span>-${insuranceCoverage.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Patient Pays</span>
              <span className="text-teal-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-lg"
              disabled={billItems.length === 0 || !selectedPatient}
              onClick={() => setShowInvoice(true)}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Generate Invoice
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setBillItems([])}
              disabled={billItems.length === 0}
            >
              Clear Bill
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Preview Dialog */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Invoice Header */}
            <div className="text-center pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-900">MediPoint Clinic</h2>
              <p className="text-sm text-gray-600">Main Branch - Downtown</p>
              <p className="text-sm text-gray-600">Invoice #{Date.now().toString().slice(-6)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date().toLocaleString()}
              </p>
            </div>

            {/* Patient Info */}
            {selectedPatient && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Patient Name</p>
                  <p className="font-semibold">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Patient ID</p>
                  <p className="font-semibold">{selectedPatient.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Insurance</p>
                  <p className="font-semibold">{selectedPatient.insurance}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Coverage</p>
                  <p className="font-semibold">{selectedPatient.coverage}%</p>
                </div>
              </div>
            )}

            {/* Items Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3 text-sm">Service</th>
                    <th className="text-right p-3 text-sm">Qty</th>
                    <th className="text-right p-3 text-sm">Price</th>
                    <th className="text-right p-3 text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </td>
                      <td className="text-right p-3">{item.quantity}</td>
                      <td className="text-right p-3">${item.price.toFixed(2)}</td>
                      <td className="text-right p-3 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {insuranceCoverage > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Insurance Coverage</span>
                  <span className="font-semibold">-${insuranceCoverage.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total Payable</span>
                <span className="text-teal-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoice(false)}>
              Close
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                alert('Invoice saved and printed!');
                setBillItems([]);
                setShowInvoice(false);
              }}
            >
              Print & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
