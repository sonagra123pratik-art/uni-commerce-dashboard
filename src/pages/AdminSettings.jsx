import { useState } from 'react';
import { Settings, Save, Server, Globe, DollarSign, Shield, Zap } from 'lucide-react';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('server');

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Settings color="var(--warning)" /> System Configurations
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Global platform settings acting as the default for all new tenants.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--warning)', color: 'black', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <Save size={18} /> Save Global Changes
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '2rem', alignItems: 'start' }}>

                {/* Navigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'sticky', top: '2rem' }}>
                    {[
                        { id: 'server', label: 'Server & Infra', icon: Server, color: 'var(--accent-purple)' },
                        { id: 'security', label: 'Platform Security', icon: Shield, color: 'var(--danger)' },
                        { id: 'billing', label: 'Payment Gateways', icon: DollarSign, color: 'var(--success)' },
                        { id: 'localization', label: 'Localization Defaults', icon: Globe, color: 'var(--info)' },
                        { id: 'ai', label: 'AI Engine Limits', icon: Zap, color: 'var(--warning)' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="hover-bg-light transition-all"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                                background: activeTab === tab.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                                borderRadius: 'var(--radius-md)', border: 'none',
                                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                                textAlign: 'left', fontWeight: activeTab === tab.id ? 600 : 400,
                                cursor: 'pointer'
                            }}
                        >
                            <tab.icon size={18} color={activeTab === tab.id ? tab.color : 'inherit'} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {activeTab === 'server' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--accent-purple)' }}>Server & Infrastructure</h2>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Main Database Connection URL</label>
                                <input type="password" value="postgres://admin:********@aws.remote.host/db" readOnly style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'gray' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Redis Cache Cluster</label>
                                <input type="text" value="redis-cluster-01.internal" readOnly style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'gray' }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', padding: '1.5rem', background: 'rgba(255,51,102,0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,51,102,0.2)' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ color: 'var(--danger)', fontWeight: 600, marginBottom: '0.25rem' }}>Maintenance Mode</h4>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Blocks all non-super-admin logins and shows maintenance page to users.</p>
                                </div>
                                <button className="btn-secondary" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Enable Mode</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--danger)' }}>Platform Security Policies</h2>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Enforce MFA platform-wide</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Force all tenant admins and managers to use 2FA</div>
                                </div>
                                <div className="toggle-switch active">
                                    <div className="toggle-thumb" style={{ transform: 'translateX(24px)' }}></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Session Timeout (Minutes)</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Auto-logout after inactivity</div>
                                </div>
                                <input type="number" defaultValue={60} style={{ width: '80px', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', textAlign: 'center' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Allowed IP CIDR Blocks (Super Admins)</label>
                                <textarea rows="3" defaultValue="192.168.1.0/24&#10;10.0.0.0/8" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }}></textarea>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--success)' }}>Payment Gateways (Default)</h2>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Stripe Secret Key (Default Node)</label>
                                <input type="password" defaultValue="sk_live_1234567890abcdef" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Razorpay Key ID (India Region)</label>
                                <input type="text" defaultValue="rzp_live_1234abcd" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }} />
                            </div>

                            <p style={{ fontSize: '0.875rem', color: 'var(--warning)', marginTop: '0.5rem' }}>Note: Individual tenants can override these with their own gateway keys in their brand setup.</p>
                        </div>
                    )}

                    {activeTab === 'ai' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--warning)' }}>AI Engine Rate Limits</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>OpenAI API Key</label>
                                    <input type="password" defaultValue="sk-*********************************" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Anthropic API Key</label>
                                    <input type="password" defaultValue="sk-ant-***************************" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Generation Limits per Tenant (Tokens/Month)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Basic Plan</div>
                                        <input type="number" defaultValue={50000} style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontSize: '1.25rem', fontWeight: 600, outline: 'none' }} />
                                    </div>
                                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Pro Plan</div>
                                        <input type="number" defaultValue={250000} style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontSize: '1.25rem', fontWeight: 600, outline: 'none' }} />
                                    </div>
                                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Enterprise Plan</div>
                                        <input type="text" defaultValue="Unlimited" readOnly style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--warning)', fontSize: '1.25rem', fontWeight: 600, outline: 'none' }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {activeTab === 'localization' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--info)' }}>Localization Defaults</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Default Currency</label>
                                    <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                                        <option value="INR">INR (₹)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Default Timezone</label>
                                    <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                        <option value="UTC">UTC</option>
                                        <option value="America/New_York">America/New_York (EST)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}
