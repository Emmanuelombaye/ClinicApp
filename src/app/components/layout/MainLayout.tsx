import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  LayoutDashboard,
  ShoppingCart,
  Stethoscope,
  Package,
  ClipboardList,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Wifi,
  WifiOff,
  Bell,
  User as UserIcon,
} from 'lucide-react';
import type { User } from '../../App';
import { DashboardScreen } from '../dashboard/DashboardScreen';
import { PharmacyPOS } from '../pos/PharmacyPOS';
import { ClinicBilling } from '../pos/ClinicBilling';
import { InventoryManagement } from '../inventory/InventoryManagement';
import { PrescriptionManagement } from '../prescription/PrescriptionManagement';
import { PatientManagement } from '../patient/PatientManagement';
import { AppointmentsQueue } from '../appointments/AppointmentsQueue';
import { ReportsAnalytics } from '../reports/ReportsAnalytics';
import { SettingsScreen } from '../settings/SettingsScreen';
import { Badge } from '../ui/badge';

interface MainLayoutProps {
  user: User;
  branch: string;
  onLogout: () => void;
}

type Screen = 
  | 'dashboard'
  | 'pharmacy-pos'
  | 'clinic-billing'
  | 'inventory'
  | 'prescriptions'
  | 'patients'
  | 'appointments'
  | 'reports'
  | 'settings';

export function MainLayout({ user, branch, onLogout }: MainLayoutProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const navigation = [
    { id: 'dashboard' as Screen, name: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'owner', 'cashier', 'pharmacist', 'nurse', 'doctor'] },
    { id: 'pharmacy-pos' as Screen, name: 'Pharmacy POS', icon: ShoppingCart, roles: ['admin', 'cashier', 'pharmacist'], badge: 'Hot' },
    { id: 'clinic-billing' as Screen, name: 'Clinic Billing', icon: Stethoscope, roles: ['admin', 'cashier', 'nurse', 'doctor'] },
    { id: 'inventory' as Screen, name: 'Inventory', icon: Package, roles: ['admin', 'pharmacist', 'owner'], badge: '12' },
    { id: 'prescriptions' as Screen, name: 'Prescriptions', icon: ClipboardList, roles: ['admin', 'pharmacist', 'doctor'], badge: '5' },
    { id: 'patients' as Screen, name: 'Patients', icon: Users, roles: ['admin', 'nurse', 'doctor', 'pharmacist'] },
    { id: 'appointments' as Screen, name: 'Appointments', icon: Calendar, roles: ['admin', 'nurse', 'doctor'] },
    { id: 'reports' as Screen, name: 'Reports', icon: BarChart3, roles: ['admin', 'owner'] },
    { id: 'settings' as Screen, name: 'Settings', icon: Settings, roles: ['admin', 'owner'] },
  ];

  const filteredNav = navigation.filter((item) =>
    item.roles.includes(user.role)
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen user={user} />;
      case 'pharmacy-pos':
        return <PharmacyPOS user={user} />;
      case 'clinic-billing':
        return <ClinicBilling user={user} />;
      case 'inventory':
        return <InventoryManagement user={user} />;
      case 'prescriptions':
        return <PrescriptionManagement user={user} />;
      case 'patients':
        return <PatientManagement user={user} />;
      case 'appointments':
        return <AppointmentsQueue user={user} />;
      case 'reports':
        return <ReportsAnalytics user={user} />;
      case 'settings':
        return <SettingsScreen user={user} />;
      default:
        return <DashboardScreen user={user} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">MediPoint POS</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Main Branch - Downtown</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Online/Offline Status */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              isOnline
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                <span className="hidden sm:inline">Offline</span>
              </>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-2 pl-2 border-l">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <UserIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}
        >
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 ${
                    isActive ? 'bg-teal-600 text-white hover:bg-teal-700' : ''
                  }`}
                  onClick={() => {
                    setCurrentScreen(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badge === 'Hot' ? 'default' : 'secondary'}
                      className={item.badge === 'Hot' ? 'bg-red-500' : ''}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderScreen()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}