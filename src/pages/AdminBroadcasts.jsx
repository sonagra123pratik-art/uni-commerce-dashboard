import { useState } from 'react';
import { Radio, Send, Bell, CalendarClock, Globe, Users, CheckCircle2, AlertCircle, Edit3, Trash2 } from 'lucide-react';

const MOCK_BROADCASTS = [
    { id: 1, title: 'AI Video Editor Launched 🚀', type: 'Feature Update', status: 'Active', target: 'All Tenants', date: 'Just now', impact: '1,200 viewers' },
    { id: 2, title: 'Scheduled Amazon API Maintenance', type: 'System Alert', status: 'Scheduled', target: 'Enterprise Only', date: 'Tomorrow, 02:00 AM', impact: '--' },
    { id: 3, title: 'Flash Deal: 50% Off AI Coins', type: 'Marketing', status: 'Completed', target: 'Starter & Growth', date: '01 Mar 2026', impact: '450 conversions' }
];

export default function AdminBroadcasts() {
    const [showCompose, setShowCompose] = useState(false);
    const [broadcastTitle, setBroadcastTitle] = useState('');
    const [broadcastMessage, setBroadcastMessage] = useState('');
    const [targetAudience, setTargetAudience] = useState('All');
    const [broadcastType, setBroadcastType] = useState('Announcement');

    const handleSend = () => {
        alert(`Broadcast "${broadcastTitle}" sent to ${targetAudience} tenants!`);
        setShowCompose(false);
        setBroadcastTitle('');
        setBroadcastMessage('');
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Radio color="var(--accent-purple)" /> Global Broadcast System
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Push live announcements, system alerts, and marketing messages to all platform end-users instantly.</p>
                </div>
                <button onClick={() => setShowCompose(true)} className="btn-primary hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-purple)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <Send size={18} /> Compose Broadcast
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Active Users Reachable</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={24} color="var(--success)" /> 14,802</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-blue)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Click-Through Rate (Avg)</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={24} color="var(--accent-blue)" /> 42.8%</div>
                </div>
            </div>

            {/* History Table */}
            <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Broadcast History</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Message Details</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Category</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Target Segment</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Timing</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Status & Impact</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_BROADCASTS.map((b, i) => (
                                <tr key={b.id} style={{ borderBottom: i < MOCK_BROADCASTS.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{b.title}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{b.type}</span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{b.target}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{b.date}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: b.status === 'Active' ? 'var(--success)' : b.status === 'Scheduled' ? 'var(--warning)' : 'var(--text-secondary)',
                                                display: 'flex', alignItems: 'center', gap: '0.2rem'
                                            }}>
                                                {b.status === 'Active' ? <Radio size={12} /> : b.status === 'Scheduled' ? <CalendarClock size={12} /> : <CheckCircle2 size={12} />}
                                                {b.status}
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{b.impact}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button className="btn-secondary" style={{ padding: '0.4rem', border: 'none', background: 'transparent' }}><Edit3 size={16} /></button>
                                        <button className="btn-secondary" style={{ padding: '0.4rem', border: 'none', background: 'transparent', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Compose Drawer / Modal */}
            {showCompose && (
                <>
                    <div onClick={() => setShowCompose(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', zIndex: 201, padding: '0', overflow: 'hidden', borderTop: '4px solid var(--accent-purple)' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Bell color="var(--accent-purple)" size={24} />
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>New System Broadcast</h2>
                        </div>

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Message Heading</label>
                                <input
                                    type="text"
                                    value={broadcastTitle}
                                    onChange={(e) => setBroadcastTitle(e.target.value)}
                                    placeholder="e.g. Server Maintenance at 2AM"
                                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Message Body (Markdown Supported)</label>
                                <textarea
                                    rows="4"
                                    value={broadcastMessage}
                                    onChange={(e) => setBroadcastMessage(e.target.value)}
                                    placeholder="We will be performing mandatory upgrades on..."
                                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', resize: 'vertical' }}
                                ></textarea>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Target Audience</label>
                                    <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                                        <option value="All">All Tenants (Global)</option>
                                        <option value="Enterprise">Enterprise Plans Only</option>
                                        <option value="Starter">Starter/Growth Plans</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Broadcast Type / Priority</label>
                                    <select value={broadcastType} onChange={(e) => setBroadcastType(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                                        <option value="Announcement">Info / Feature Update (Blue)</option>
                                        <option value="Marketing">Marketing / Upsell (Purple)</option>
                                        <option value="Alert">Critical System Alert (Red)</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,170,0,0.1)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,170,0,0.3)' }}>
                                <AlertCircle size={18} color="var(--warning)" />
                                <span style={{ fontSize: '0.875rem', color: 'var(--warning)' }}>This message will forcefully pop up over the end-user's screen upon their next login.</span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => setShowCompose(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSend} disabled={!broadcastTitle} style={{ background: 'var(--accent-purple)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Send size={16} /> Push Live Immediately
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
