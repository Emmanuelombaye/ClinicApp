import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, Clock, User as UserIcon, Plus, Search } from 'lucide-react';
import type { User } from '../../App';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface AppointmentsQueueProps {
  user: User;
}

const appointments = [
  { id: 'APT-001', patient: 'John Doe', patientId: 'PAT-001', time: '09:00 AM', doctor: 'Dr. Sarah Wilson', type: 'Consultation', status: 'completed' },
  { id: 'APT-002', patient: 'Jane Smith', patientId: 'PAT-002', time: '09:30 AM', doctor: 'Dr. Sarah Wilson', type: 'Follow-up', status: 'in-consultation' },
  { id: 'APT-003', patient: 'Mike Johnson', patientId: 'PAT-003', time: '10:00 AM', doctor: 'Dr. Michael Brown', type: 'Consultation', status: 'waiting' },
  { id: 'APT-004', patient: 'Sarah Williams', patientId: 'PAT-004', time: '10:30 AM', doctor: 'Dr. Sarah Wilson', type: 'Consultation', status: 'waiting' },
  { id: 'APT-005', patient: 'Robert Brown', patientId: 'PAT-005', time: '11:00 AM', doctor: 'Dr. Michael Brown', type: 'Check-up', status: 'waiting' },
];

export function AppointmentsQueue({ user }: AppointmentsQueueProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge className="bg-amber-100 text-amber-700">Waiting</Badge>;
      case 'in-consultation':
        return <Badge className="bg-blue-100 text-blue-700">In Consultation</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Appointments & Queue</h1>
          <p className="text-gray-600 mt-1">Manage patient appointments and waiting queue</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Today</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Waiting</p>
                <p className="text-3xl font-bold text-amber-600">8</p>
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
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">2</p>
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
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">14</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {appointments.map((apt) => (
              <Card key={apt.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-teal-100 p-3 rounded-full">
                        <UserIcon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{apt.patient}</h3>
                          {getStatusBadge(apt.status)}
                        </div>
                        <div className="grid sm:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{apt.time}</span>
                          </div>
                          <div>
                            <span>Dr: {apt.doctor.split(' ')[1]}</span>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">{apt.type}</Badge>
                          </div>
                          <div className="text-xs text-gray-500">{apt.patientId}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {apt.status === 'waiting' && (
                        <Button className="bg-teal-600 hover:bg-teal-700">Start</Button>
                      )}
                      {apt.status === 'in-consultation' && (
                        <Button variant="outline">View</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Upcoming Appointments</p>
              <p className="text-sm">View future scheduled appointments</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Appointment History</p>
              <p className="text-sm">View past appointments and records</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
