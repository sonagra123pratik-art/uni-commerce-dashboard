import { useState } from 'react';
import { Building2, Search, MoreVertical, CheckCircle2, XCircle, Plus, Filter, HardDrive, Users, CreditCard } from 'lucide-react';

const MOCK_TENANTS = [
    { id: 't-1', name: 'Acme Corp', domain: 'acme.flux-ehub.com', plan: 'Enterprise', status: 'Active', members: 12, storage: '45 GB', mrr: '₹9,999 + ₹2500' },
    { id: 't-2', name: 'Global Tech', domain: 'global.flux-ehub.com', plan: 'Growth', status: 'Active', members: 5, storage: '12 GB', mrr: '₹2,499 + ₹900' },
    { id: 't-3', name: 'StartUp Inc', domain: 'startup.flux-ehub.com', plan: 'Starter', status: 'Suspended', members: 2, storage: '1 GB', mrr: '₹999 + ₹120' },
];

export default function AdminTenants() {
    const [showOnboardModal, setShowOnboardModal] = useState(false);
    const [showAdjustPlanModal, setShowAdjustPlanModal] = useState(false);
    const [showCoinsModal, setShowCoinsModal] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [tenants, setTenants] = useState(MOCK_TENANTS);
    const [newPlan, setNewPlan] = useState('Starter'); // Default to Starter
    const [coinAmount, setCoinAmount] = useState('');

    const handleAdjustPlanClick = (tenant) => {
        setSelectedTenant(tenant);
        setNewPlan(tenant.plan);
        setShowAdjustPlanModal(true);
    };

    const handleAssignCoinsClick = (tenant) => {
        setSelectedTenant(tenant);
        setCoinAmount('');
        setShowCoinsModal(true);
    };

    const handleAssignCoins = () => {
        if (selectedTenant && coinAmount) {
            alert(`Successfully assigned ${coinAmount} AI Coins to ${selectedTenant.name}. (This is an Admin Override bypass)`);
        }
        setShowCoinsModal(false);
    };

    const handleSavePlan = () => {
        if (selectedTenant) {
            setTenants(prev => prev.map(t => {
                if (t.id === selectedTenant.id) {
                    let newMrr = '₹999 + ₹120'; // Starter
                    if (newPlan === 'Growth') newMrr = '₹2,499 + ₹900';
                    if (newPlan === 'Enterprise') newMrr = '₹9,999 + ₹2500';
                    return { ...t, plan: newPlan, mrr: newMrr };
                }
                return t;
            }));
        }
        setShowAdjustPlanModal(false);
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header Widget */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Building2 color="var(--accent-purple)" /> Tenant & Brand Management
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage all client instances, subscriptions, and access statuses.</p>
                </div>
                <button onClick={() => setShowOnboardModal(true)} className="btn-primary hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-purple)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <Plus size={18} /> Onboard New Tenant
                </button>
            </div>

            {/* Main Table Container */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>

                {/* Table Toolbar */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input type="text" placeholder="Search by brand name or domain..." style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
                        </div>
                        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Showing {tenants.length} tenants
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Tenant Brand</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Plan & MRR</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Utilization</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.map((t, i) => (
                                <tr key={t.id} style={{ borderBottom: i < tenants.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light transition-all">
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {t.name}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                            <a href={`https://${t.domain}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>{t.domain}</a>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <CreditCard size={14} color="var(--text-secondary)" />
                                            <span style={{
                                                padding: '0.15rem 0.4rem',
                                                background: t.plan === 'Enterprise' ? 'rgba(145,124,255,0.1)' : 'rgba(255,255,255,0.05)',
                                                color: t.plan === 'Enterprise' ? '#b3a3ff' : 'white',
                                                border: `1px solid ${t.plan === 'Enterprise' ? 'rgba(145,124,255,0.2)' : 'var(--border-color)'}`,
                                                borderRadius: '4px',
                                                fontSize: '0.7rem',
                                                fontWeight: 600
                                            }}>
                                                {t.plan}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500, marginTop: '0.35rem' }}>{t.mrr} /mo</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                <Users size={14} /> {t.members} active users
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                <HardDrive size={14} /> {t.storage} used
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', background: t.status === 'Active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,51,102,0.1)', padding: '0.3rem 0.6rem', borderRadius: '2rem', width: 'fit-content' }}>
                                            {t.status === 'Active' ? <CheckCircle2 size={14} color="var(--success)" /> : <XCircle size={14} color="var(--danger)" />}
                                            <span style={{ color: t.status === 'Active' ? 'var(--success)' : 'var(--danger)', fontWeight: 500 }}>{t.status}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right', position: 'relative' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleAssignCoinsClick(t)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.75rem' }}>+ Coins</button>
                                            <button onClick={() => handleAdjustPlanClick(t)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.75rem' }}>Adjust Plan</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Adjust Plan Modal */}
            {showAdjustPlanModal && selectedTenant && (
                <>
                    <div onClick={() => setShowAdjustPlanModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 300 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '450px', zIndex: 301, padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <CreditCard color="var(--info)" size={20} />
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Manual Plan Adjustment</h2>
                            </div>
                            <button onClick={() => setShowAdjustPlanModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><XCircle size={18} /></button>
                        </div>
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Adjust subscription level for <strong style={{ color: 'white' }}>{selectedTenant.name}</strong>.</p>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>New Subscription Plan</label>
                                <select value={newPlan} onChange={(e) => setNewPlan(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                                    <option value="Starter">Starter (₹999/mo + ₹1/order)</option>
                                    <option value="Growth">Growth (₹2,499/mo + ₹1/order)</option>
                                    <option value="Enterprise">Enterprise (₹9,999/mo + ₹1/order)</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => setShowAdjustPlanModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSavePlan} style={{ background: 'var(--info)', color: 'black', border: 'none' }}>Confirm Override</button>
                        </div>
                    </div>
                </>
            )}

            {/* Admin Override Coins Modal */}
            {showCoinsModal && selectedTenant && (
                <>
                    <div onClick={() => setShowCoinsModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 300 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '400px', zIndex: 301, padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-elevated)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <CreditCard color="var(--accent-purple)" size={20} />
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Assign AI Coins</h2>
                            </div>
                            <button onClick={() => setShowCoinsModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><XCircle size={18} /></button>
                        </div>
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Manually override the AI Coin balance for <strong style={{ color: 'white' }}>{selectedTenant.name}</strong> without charging their payment method.</p>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Number of Coins</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 500"
                                    value={coinAmount}
                                    onChange={(e) => setCoinAmount(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => setShowCoinsModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleAssignCoins} disabled={!coinAmount} style={{ background: 'var(--accent-purple)', color: 'white', border: 'none' }}>Mint Coins</button>
                        </div>
                    </div>
                </>
            )}

            {/* Onboard Modal */}
            {showOnboardModal && (
                <>
                    <div onClick={() => setShowOnboardModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', zIndex: 201, padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Building2 color="var(--accent-purple)" size={24} />
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Provision New Tenant</h2>
                            </div>
                            <button onClick={() => setShowOnboardModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><XCircle size={20} /></button>
                        </div>

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Brand / Company Name</label>
                                    <input type="text" placeholder="e.g. Acme Corp" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Primary Admin Email</label>
                                    <input type="email" placeholder="admin@acme.com" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Subdomain Routing</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="text" placeholder="acme" style={{ flex: 1, padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRight: 'none', borderRadius: '4px 0 0 4px', color: 'white' }} />
                                    <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '0 4px 4px 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                        .flux-ehub.com
                                    </div>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Select Subscription Plan</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                    {['Starter', 'Growth', 'Enterprise'].map(plan => (
                                        <div key={plan} style={{ padding: '1rem', border: `1px solid ${plan === 'Enterprise' ? 'var(--accent-purple)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer', background: plan === 'Enterprise' ? 'rgba(145,124,255,0.05)' : 'transparent' }}>
                                            <div style={{ fontWeight: 600, color: plan === 'Enterprise' ? 'var(--accent-purple)' : 'white' }}>{plan}</div>
                                            <span style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-elevated)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {plan === 'Starter' ? '₹999/mo' : plan === 'Growth' ? '₹2,499/mo' : '₹9,999/mo'}
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>+ ₹1/order</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => setShowOnboardModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => setShowOnboardModal(false)} style={{ display: 'flex', alignItems: 'center', background: 'var(--accent-purple)', color: 'white', border: 'none', gap: '0.5rem' }}>
                                <CheckCircle2 size={16} /> Deploy Tenant Instance
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
