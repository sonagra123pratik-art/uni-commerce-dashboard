import {
    DollarSign, Activity, Users, Building2, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockRevenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 59000 },
    { name: 'Jun', revenue: 75000 },
];

const mockHealthData = [
    { name: '10:00', load: 45 },
    { name: '11:00', load: 55 },
    { name: '12:00', load: 80 },
    { name: '13:00', load: 65 },
    { name: '14:00', load: 40 },
    { name: '15:00', load: 50 },
];

const StatCard = ({ title, value, change, trend, icon: Icon, color, isNegative }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: `3px solid ${color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</div>
                <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>{value}</div>
            </div>
            <div style={{ padding: '0.75rem', background: `rgba(${color === 'var(--success)' ? '0,230,118' : color === 'var(--danger)' ? '255,51,102' : color === 'var(--warning)' ? '255,167,38' : '145,124,255'}, 0.1)`, borderRadius: 'var(--radius-md)' }}>
                <Icon size={24} color={color} />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', color: isNegative ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                {isNegative ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                {change}
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>{trend}</span>
        </div>
    </div>
);

export default function AdminOverview() {
    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>

            {/* Header */}
            <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Activity color="var(--accent-purple)" /> Platform Overview
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Global metrics and system health across all tenants.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <StatCard
                    title="Total Monthly Recurring Revenue (MRR)"
                    value="₹61,25,000"
                    change="+12.5%"
                    trend="vs last month"
                    icon={DollarSign}
                    color="var(--success)"
                    isNegative={false}
                />
                <StatCard
                    title="Active Tenants/Brands"
                    value="142"
                    change="+8"
                    trend="new this month"
                    icon={Building2}
                    color="var(--accent-purple)"
                    isNegative={false}
                />
                <StatCard
                    title="Total Registered Users"
                    value="4,892"
                    change="+345"
                    trend="vs last month"
                    icon={Users}
                    color="var(--warning)"
                    isNegative={false}
                />
                <StatCard
                    title="System API Anomalies"
                    value="3"
                    change="-2"
                    trend="vs last 24h"
                    icon={AlertTriangle}
                    color="var(--danger)"
                    isNegative={true}
                />
            </div>

            {/* Charts Box */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Revenue Chart */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Revenue Growth (Platform Wide)</h3>
                        <select style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontSize: '0.875rem' }}>
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#888" axisLine={false} tickLine={false} />
                                <YAxis stroke="#888" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--success)' }}
                                />
                                <Bar dataKey="revenue" fill="var(--success)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* System Health */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Server Load (Last 6 Hours)</h3>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Current capacity: 62%</div>
                    </div>
                    <div style={{ height: '200px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockHealthData}>
                                <defs>
                                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#888" axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--accent-purple)' }}
                                />
                                <Area type="monotone" dataKey="load" stroke="var(--accent-purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Database Uptime</span>
                            <span style={{ color: 'var(--success)', fontWeight: 600 }}>99.99%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Avg Response Time</span>
                            <span style={{ color: 'white', fontWeight: 600 }}>124ms</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
