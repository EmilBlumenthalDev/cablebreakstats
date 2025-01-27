import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cable, Anchor, TrendingUp } from 'lucide-react';
import { CableIncident, CableStats } from '../types/index';
import { LatestIncident } from './LatestIncident';

interface DashboardProps {
  incidents: CableIncident[];
  stats: CableStats;
  currentStreak: number;
  longestStreak: number;
}

export const Dashboard = ({ incidents, stats, currentStreak, longestStreak }: DashboardProps) => (
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">CableBreakStats.com</h1>
        <p className="text-slate-600 text-lg">Tracking Baltic Sea cable chaos, one break at a time</p>
      </div>

      {stats.lastIncident && <LatestIncident incident={stats.lastIncident} />}

      <Card className="bg-white border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Days Without Cable Incident</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <span className="text-6xl font-bold text-blue-600">{currentStreak}</span>
            <p className="text-slate-500 mt-2">Longest streak: {longestStreak} days</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className='bg-white border-none'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cable className="mr-2" />
              Total Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalIncidents}</div>
            <p className="text-slate-500">Average {stats.monthlyAverage} per month</p>
          </CardContent>
        </Card>

        <Card className='bg-white border-none'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Anchor className="mr-2" />
              Cable Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.impactedConnections.size}</div>
            <p className="text-slate-500">Different cables affected</p>
          </CardContent>
        </Card>
      </div>

      <Card className='bg-white border-none'>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" />
            Recent Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.slice(0, 3).map((incident, index) => (
              <div key={index} className="border-b pb-2 last:border-b-0">
                <div className="font-medium">{incident.cable_name}</div>
                <div className="text-sm text-slate-500">
                  {incident.date.toLocaleDateString()}
                </div>
                <div className="text-sm">{incident.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-slate-500 text-sm mt-8">
        <p>* All incidents reported in the Baltic Sea region</p>
        <p>Made with 🧊 in the Baltic Sea</p>
      </div>
    </div>
  </div>
);