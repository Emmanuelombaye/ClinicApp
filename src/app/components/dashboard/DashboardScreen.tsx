import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Package,
  ClipboardList,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { User } from '../../App';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface DashboardScreenProps {
  user: User;
}

const salesData = [
  { name: 'Mon', sales: 4200, prescriptions: 24 },
  { name: 'Tue', sales: 3800, prescriptions: 18 },
  { name: 'Wed', sales: 5100, prescriptions: 32 },
  { name: 'Thu', sales: 4600, prescriptions: 28 },
  { name: 'Fri', sales: 6200, prescriptions: 35 },
  { name: 'Sat', sales: 5800, prescriptions: 29 },
  { name: 'Sun', sales: 3200, prescriptions: 15 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

export function DashboardScreen({ user }: DashboardScreenProps) {
  const stats = [
    {
      title: "Today's Sales",
      value: '$6,234',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Prescriptions Pending',
      value: '17',
      change: '5 urgent',
      icon: ClipboardList,
      color: 'bg-blue-500',
    },
    {
      title: 'Patients Waiting',
      value: '8',
      change: 'Avg wait: 12min',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Low Stock Alerts',
      value: '12',
      change: '3 critical',
      icon: AlertTriangle,
      color: 'bg-amber-500',
    },
    {
      title: 'Appointments Today',
      value: '24',
      change: '6 remaining',
      icon: Calendar,
      color: 'bg-teal-500',
    },
    {
      title: 'Revenue (MTD)',
      value: '$45.2K',
      change: '+18.2%',
      icon: TrendingUp,
      color: 'bg-indigo-500',
    },
  ];

  const lowStockItems = [
    { name: 'Amoxicillin 500mg', stock: 45, min: 100, critical: true },
    { name: 'Paracetamol 500mg', stock: 120, min: 200, critical: false },
    { name: 'Ibuprofen 400mg', stock: 35, min: 100, critical: true },
    { name: 'Omeprazole 20mg', stock: 78, min: 150, critical: false },
    { name: 'Metformin 850mg', stock: 25, min: 100, critical: true },
  ];

  const recentTransactions = [
    { id: 'TXN-1234', patient: 'John Doe', amount: 125.50, type: 'Pharmacy', time: '10:45 AM' },
    { id: 'TXN-1235', patient: 'Jane Smith', amount: 85.00, type: 'Consultation', time: '10:32 AM' },
    { id: 'TXN-1236', patient: 'Mike Johnson', amount: 245.75, type: 'Pharmacy', time: '10:18 AM' },
    { id: 'TXN-1237', patient: 'Sarah Williams', amount: 150.00, type: 'Lab Tests', time: '10:05 AM' },
    { id: 'TXN-1238', patient: 'Robert Brown', amount: 95.25, type: 'Pharmacy', time: '09:52 AM' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Good morning, {user.name}! 👋
        </h1>
        <p className="text-gray-600">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales & Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#0d9488" strokeWidth={2} />
                <Line type="monotone" dataKey="prescriptions" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0d9488" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Low Stock Alerts
            </CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Stock: {item.stock} • Min: {item.min}
                    </p>
                  </div>
                  <Badge variant={item.critical ? 'destructive' : 'default'} className={!item.critical ? 'bg-amber-500' : ''}>
                    {item.critical ? 'Critical' : 'Low'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Recent Transactions
            </CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{txn.patient}</p>
                    <p className="text-sm text-gray-500">{txn.id} • {txn.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${txn.amount.toFixed(2)}</p>
                    <Badge variant="outline" className="text-xs">{txn.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
