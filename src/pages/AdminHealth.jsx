import { Activity, Server, Database, Globe, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const cpuData = [
    { time: '10:00', value: 45 }, { time: '10:05', value: 52 },
    { time: '10:10', value: 48 }, { time: '10:15', value: 61 },
    { time: '10:20', value: 59 }, { time: '10:25', value: 42 },
    { time: '10:30', value: 47 }, { time: '10:35', value: 55 },
];

const MOCK_SERVICES = [
    { id: 1, name: 'Core Application Engine', status: 'Operational', uptime: '99.99%', latency: '42ms' },
    { id: 2, name: 'PostgreSQL Database', status: 'Operational', uptime: '99.99%', latency: '12ms' },
    { id: 3, name: 'Redis Cache Layer', status: 'Operational', uptime: '100%', latency: '2ms' },
    { id: 4, name: 'AI Image Generator API', status: 'Degraded', uptime: '98.40%', latency: '3,450ms' },
    { id: 5, name: 'Amazon SP-API Sync', status: 'Operational', uptime: '99.95%', latency: '210ms' },
    { id: 6, name: 'Shopify Webhooks', status: 'Operational', uptime: '99.98%', latency: '85ms' },
];

export default function AdminHealth() {
    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Activity color="var(--success)" /> Live System Health
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Real-time monitoring of infrastructure, databases, and third-party API connections.</p>
                </div>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-color)' }}>
                    <RefreshCw size={18} /> Force Ping Test
                </button>
            </div>

            {/* Top Level Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Global Status</span>
                        <Globe size={16} color="var(--success)" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>All Systems Go</h3>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--info)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active WebSockets</span>
                        <Activity size={16} color="var(--info)" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>14,204</h3>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>API Error Rate (1hr)</span>
                        <AlertTriangle size={16} color="var(--warning)" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>0.42%</h3>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-purple)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Database Ops/Sec</span>
                        <Database size={16} color="var(--accent-purple)" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>3,840</h3>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* CPU Chart */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Server size={18} color="var(--accent-blue)" /> Cluster CPU Utilization
                    </h3>
                    <div style={{ height: '250px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cpuData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                    itemStyle={{ color: 'white', fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="value" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Database Chart */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Database size={18} color="var(--accent-purple)" /> Storage Write IOPS
                    </h3>
                    <div style={{ height: '250px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cpuData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorDb" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v * 100}`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                    itemStyle={{ color: 'white', fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="value" stroke="var(--accent-purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorDb)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Services Table */}
            <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>System Services & APIs</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Service Node</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Current Status</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>30-Day Uptime</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Current Latency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_SERVICES.map((s, i) => (
                                <tr key={s.id} style={{ borderBottom: i < MOCK_SERVICES.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'white' }}>{s.name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem',
                                            background: s.status === 'Operational' ? 'rgba(0,230,118,0.1)' : 'rgba(255,170,0,0.1)',
                                            padding: '0.2rem 0.6rem', borderRadius: '2rem', width: 'fit-content',
                                            color: s.status === 'Operational' ? 'var(--success)' : 'var(--warning)',
                                            border: `1px solid ${s.status === 'Operational' ? 'var(--success)' : 'var(--warning)'}`
                                        }}>
                                            {s.status === 'Operational' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                                            <span style={{ fontWeight: 600 }}>{s.status}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', color: s.uptime === '100%' ? 'var(--success)' : 'white' }}>{s.uptime}</td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', color: s.status === 'Operational' ? 'var(--text-secondary)' : 'var(--warning)' }}>{s.latency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
