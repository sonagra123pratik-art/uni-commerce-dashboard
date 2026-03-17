import { DollarSign, TrendingUp, CreditCard, Activity, ArrowUpRight, ArrowDownRight, Users, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const revenueData = [
    { month: 'Oct', mrr: 125000, expansion: 15000 },
    { month: 'Nov', mrr: 142000, expansion: 22000 },
    { month: 'Dec', mrr: 158000, expansion: 18000 },
    { month: 'Jan', mrr: 175000, expansion: 35000 },
    { month: 'Feb', mrr: 198000, expansion: 42000 },
    { month: 'Mar', mrr: 215000, expansion: 28000 },
];

const MOCK_TRANSACTIONS = [
    { id: 'tx-1', date: 'Today, 10:42 AM', entity: 'Acme Corp', type: 'Subscription Renewed', amount: '₹9,999', status: 'Succeeded' },
    { id: 'tx-2', date: 'Today, 09:15 AM', entity: 'Global Tech', type: 'AI Coin Purchase (10k)', amount: '₹2,500', status: 'Succeeded' },
    { id: 'tx-3', date: 'Yesterday', entity: 'StartUp Inc', type: 'Subscription Renewed', amount: '₹999', status: 'Failed' },
    { id: 'tx-4', date: 'Yesterday', entity: 'NewBrand LLC', type: 'Initial Signup (Growth)', amount: '₹2,499', status: 'Succeeded' },
];

export default function AdminRevenue() {
    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <DollarSign color="var(--success)" /> Financial Control Center
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Track Monthly Recurring Revenue (MRR), AI Coin velocity, and subscription metrics.</p>
                </div>
                <button className="btn-primary hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--success)', color: 'black', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <TrendingUp size={18} /> View Investor Report
                </button>
            </div>

            {/* Primary KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '3px solid var(--success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(0,230,118,0.1)', borderRadius: 'var(--radius-md)' }}><DollarSign size={20} color="var(--success)" /></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontSize: '0.875rem', fontWeight: 600 }}>
                            <ArrowUpRight size={16} /> 18.2%
                        </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Current Platform MRR</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>₹2,15,400</div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '3px solid var(--accent-purple)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(145,124,255,0.1)', borderRadius: 'var(--radius-md)' }}><Activity size={20} color="var(--accent-purple)" /></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontSize: '0.875rem', fontWeight: 600 }}>
                            <ArrowUpRight size={16} /> 45.1%
                        </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>AI Coin & Add-on Revenue</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>₹42,850</div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '3px solid var(--danger)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(255,61,113,0.1)', borderRadius: 'var(--radius-md)' }}><Users size={20} color="var(--danger)" /></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--danger)', fontSize: '0.875rem', fontWeight: 600 }}>
                            <ArrowDownRight size={16} /> 1.2%
                        </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Monthly Churn Rate</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>3.4%</div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '3px solid var(--info)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(56,189,248,0.1)', borderRadius: 'var(--radius-md)' }}><Briefcase size={20} color="var(--info)" /></div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Avg across all tiers</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>ARPU (Per User)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>₹3,450</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

                {/* MRR Chart */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>MRR Growth Trajectory</h3>
                        <select style={{ padding: '0.4rem 0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontSize: '0.75rem' }}>
                            <option>Last 6 Months</option>
                            <option>Year to Date</option>
                        </select>
                    </div>

                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                                <RechartsTooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Bar dataKey="mrr" name="Base MRR" stackId="a" fill="var(--success)" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="expansion" name="Expansion Revenue" stackId="a" fill="var(--info)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={18} color="var(--accent-purple)" /> Recent Clearing
                        </h3>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {MOCK_TRANSACTIONS.map((tx, i) => (
                            <div key={tx.id} style={{ padding: '1.25rem 1.5rem', borderBottom: i < MOCK_TRANSACTIONS.length - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem' }}>{tx.entity}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{tx.type} • {tx.date}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 700 }}>{tx.amount}</div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: tx.status === 'Succeeded' ? 'var(--success)' : 'var(--danger)',
                                        marginTop: '0.2rem'
                                    }}>
                                        {tx.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--info)', fontSize: '0.875rem', cursor: 'pointer' }} className="hover-scale">View All Transactions →</button>
                    </div>
                </div>

            </div>

        </div>
    );
}
