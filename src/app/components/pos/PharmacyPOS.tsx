import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Receipt,
  X,
  AlertCircle,
} from 'lucide-react';
import type { User } from '../../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PharmacyPOSProps {
  user: User;
}

interface CartItem {
  id: string;
  name: string;
  genericName: string;
  price: number;
  quantity: number;
  batch: string;
  expiry: string;
  stock: number;
  requiresPrescription: boolean;
  taxRate: number;
}

const products = [
  {
    id: 'MED-001',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    price: 5.50,
    batch: 'BATCH-2024-001',
    expiry: '2025-12-31',
    stock: 450,
    requiresPrescription: false,
    category: 'Pain Relief',
  },
  {
    id: 'MED-002',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin',
    price: 12.75,
    batch: 'BATCH-2024-045',
    expiry: '2025-08-15',
    stock: 85,
    requiresPrescription: true,
    category: 'Antibiotics',
  },
  {
    id: 'MED-003',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    price: 7.25,
    batch: 'BATCH-2024-023',
    expiry: '2026-03-20',
    stock: 320,
    requiresPrescription: false,
    category: 'Pain Relief',
  },
  {
    id: 'MED-004',
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    price: 15.00,
    batch: 'BATCH-2024-067',
    expiry: '2025-11-30',
    stock: 125,
    requiresPrescription: true,
    category: 'Gastric',
  },
  {
    id: 'MED-005',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine Hydrochloride',
    price: 6.50,
    batch: 'BATCH-2024-089',
    expiry: '2026-05-18',
    stock: 280,
    requiresPrescription: false,
    category: 'Antihistamine',
  },
];

export function PharmacyPOS({ user }: PharmacyPOSProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'mobile' | 'insurance'>('cash');

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          taxRate: 0.1, // 10% tax
        },
      ]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.quantity + change, item.stock)) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = cart.reduce((sum, item) => sum + item.price * item.quantity * item.taxRate, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + tax - discountAmount;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handleCompletePayment = () => {
    // Reset cart and close payment dialog
    setCart([]);
    setDiscount(0);
    setShowPayment(false);
    alert('Payment successful! Receipt printed.');
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-gray-50">
      {/* Product Search & List - Left Side */}
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name, generic name, or product code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="relative">
                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Scan barcode or enter manually..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        {product.requiresPrescription && (
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{product.genericName}</p>
                      <p className="text-xs text-gray-400 mt-1">{product.id}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-teal-600">${product.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={product.stock < 100 ? 'destructive' : 'outline'} className="text-xs">
                            Stock: {product.stock}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.batch}
                          </Badge>
                        </div>
                      </div>
                      <Button size="icon" className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Exp: {product.expiry}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cart & Checkout - Right Side */}
      <div className="w-full lg:w-96 xl:w-[450px] bg-white border-l flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Current Sale</h2>
          <p className="text-sm text-gray-500">Cashier: {user.name}</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <Receipt className="w-16 h-16 mb-3" />
              <p>No items in cart</p>
              <p className="text-sm">Scan or search for products</p>
            </div>
          ) : (
            cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.genericName}</p>
                        {item.requiresPrescription && (
                          <Badge variant="outline" className="text-xs mt-1">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Rx Required
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
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
                        <p className="text-xs text-gray-500">${item.price} each</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Totals & Checkout */}
        <div className="border-t p-4 space-y-4 bg-gray-50">
          {/* Discount */}
          <div className="flex items-center gap-2">
            <Label className="text-sm">Discount %</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
              className="w-20 h-9"
            />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount ({discount}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-teal-600">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-lg"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Checkout (${total.toFixed(2)})
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCart([])}
              disabled={cart.length === 0}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 bg-teal-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-teal-600">${total.toFixed(2)}</p>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setPaymentMethod('cash')}
                >
                  <Banknote className="w-6 h-6" />
                  Cash
                </Button>
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard className="w-6 h-6" />
                  Card
                </Button>
                <Button
                  variant={paymentMethod === 'mobile' ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setPaymentMethod('mobile')}
                >
                  <Smartphone className="w-6 h-6" />
                  Mobile Money
                </Button>
                <Button
                  variant={paymentMethod === 'insurance' ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setPaymentMethod('insurance')}
                >
                  <ShieldCheck className="w-6 h-6" />
                  Insurance
                </Button>
              </div>
            </div>

            {cart.some((item) => item.requiresPrescription) && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1 text-sm text-blue-800">
                  <p className="font-medium">Prescription Required</p>
                  <p className="text-xs">
                    This sale contains prescription items. Ensure valid prescription is verified.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayment(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleCompletePayment}>
              Complete & Print Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
