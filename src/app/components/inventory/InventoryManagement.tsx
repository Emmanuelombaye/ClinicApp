import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  TrendingDown,
  Download,
  Upload,
  Filter,
  Edit,
  Trash2,
} from 'lucide-react';
import type { User } from '../../App';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface InventoryManagementProps {
  user: User;
}

const medicines = [
  {
    id: 'MED-001',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    batch: 'BATCH-2024-001',
    expiry: '2025-12-31',
    stock: 450,
    minStock: 200,
    price: 5.50,
    supplier: 'PharmaCorp Ltd',
    status: 'in-stock',
  },
  {
    id: 'MED-002',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin',
    category: 'Antibiotics',
    batch: 'BATCH-2024-045',
    expiry: '2025-08-15',
    stock: 45,
    minStock: 100,
    price: 12.75,
    supplier: 'MedSupply Inc',
    status: 'low-stock',
  },
  {
    id: 'MED-003',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    category: 'Pain Relief',
    batch: 'BATCH-2024-023',
    expiry: '2026-03-20',
    stock: 320,
    minStock: 150,
    price: 7.25,
    supplier: 'PharmaCorp Ltd',
    status: 'in-stock',
  },
  {
    id: 'MED-004',
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    category: 'Gastric',
    batch: 'BATCH-2024-067',
    expiry: '2025-11-30',
    stock: 25,
    minStock: 100,
    price: 15.00,
    supplier: 'HealthMeds Co',
    status: 'critical',
  },
  {
    id: 'MED-005',
    name: 'Insulin Glargine 100U/ml',
    genericName: 'Insulin Glargine',
    category: 'Diabetes',
    batch: 'BATCH-2024-089',
    expiry: '2025-04-30',
    stock: 65,
    minStock: 50,
    price: 45.00,
    supplier: 'DiabetesCare Inc',
    status: 'expiring-soon',
  },
];

const suppliers = [
  { id: 'SUP-001', name: 'PharmaCorp Ltd', contact: '+1234567890', email: 'contact@pharmacorp.com' },
  { id: 'SUP-002', name: 'MedSupply Inc', contact: '+0987654321', email: 'sales@medsupply.com' },
  { id: 'SUP-003', name: 'HealthMeds Co', contact: '+1122334455', email: 'info@healthmeds.com' },
  { id: 'SUP-004', name: 'DiabetesCare Inc', contact: '+5544332211', email: 'orders@diabetescare.com' },
];

export function InventoryManagement({ user }: InventoryManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showPurchaseOrder, setShowPurchaseOrder] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-green-100 text-green-700">In Stock</Badge>;
      case 'low-stock':
        return <Badge className="bg-amber-100 text-amber-700">Low Stock</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'expiring-soon':
        return <Badge className="bg-orange-100 text-orange-700">Expiring Soon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredMedicines = medicines.filter(
    (med) =>
      (med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'all' || med.category === selectedCategory)
  );

  const categories = ['all', ...new Set(medicines.map((m) => m.category))];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage medicines, stock levels, and suppliers</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowPurchaseOrder(true)} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Purchase Order
          </Button>
          <Button onClick={() => setShowAddMedicine(true)} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">248</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Low Stock Alerts</p>
                <p className="text-3xl font-bold text-amber-600">12</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
                <p className="text-3xl font-bold text-red-600">8</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inventory Value</p>
                <p className="text-3xl font-bold text-green-600">$45.2K</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="medicines" className="space-y-4">
        <TabsList>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="stock-movement">Stock Movement</TabsTrigger>
        </TabsList>

        {/* Medicines Tab */}
        <TabsContent value="medicines" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medicines Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicines.map((med) => (
                      <TableRow key={med.id}>
                        <TableCell>
                          <div>
                            <p className="font-semibold text-gray-900">{med.name}</p>
                            <p className="text-sm text-gray-500">{med.genericName}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {med.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{med.batch}</span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{med.stock}</p>
                            <p className="text-xs text-gray-500">Min: {med.minStock}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{med.expiry}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">${med.price}</span>
                        </TableCell>
                        <TableCell>{getStatusBadge(med.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader>
                  <CardTitle>{supplier.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium">{supplier.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{supplier.email}</p>
                  </div>
                  <div className="pt-3 border-t flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline">
                      View Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Purchase Orders Tab */}
        <TabsContent value="purchase-orders">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">No purchase orders yet</p>
              <Button className="mt-4" onClick={() => setShowPurchaseOrder(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Purchase Order
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stock Movement Tab */}
        <TabsContent value="stock-movement">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <TrendingDown className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Stock movement history</p>
              <p className="text-sm">Track all stock adjustments and transfers</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Medicine Dialog */}
      <Dialog open={showAddMedicine} onOpenChange={setShowAddMedicine}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Medicine Name</Label>
                <Input placeholder="Brand name" />
              </div>
              <div className="space-y-2">
                <Label>Generic Name</Label>
                <Input placeholder="Generic name" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pain-relief">Pain Relief</SelectItem>
                    <SelectItem value="antibiotics">Antibiotics</SelectItem>
                    <SelectItem value="gastric">Gastric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Batch Number</Label>
                <Input placeholder="BATCH-YYYY-XXX" />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMedicine(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Add Medicine</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Order Dialog */}
      <Dialog open={showPurchaseOrder} onOpenChange={setShowPurchaseOrder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Supplier</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((sup) => (
                    <SelectItem key={sup.id} value={sup.id}>
                      {sup.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Expected Delivery</Label>
              <Input type="date" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              Add items to the purchase order in the next screen
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPurchaseOrder(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
