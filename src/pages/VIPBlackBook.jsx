import { useState } from 'react';
import { Crown, Gift, Star, Clock, ArrowRight, ShieldCheck, Mail, CheckCircle2, Heart, Send, AlertTriangle } from 'lucide-react';

const MOCK_VIPS = [
    { id: 'V-1029', name: 'Eleanor Vance', email: 'eleanor.v@example.com', ltv: '$4,250', orders: 24, lastPurchase: '2 days ago', risk: 'Low', location: 'New York, NY', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: 'V-1030', name: 'Marcus Sterling', email: 'm.sterling@capital.com', ltv: '$3,890', orders: 18, lastPurchase: '14 days ago', risk: 'Medium', location: 'London, UK', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
    { id: 'V-1031', name: 'Sarah Chen', email: 'schen.design@web.co', ltv: '$3,400', orders: 31, lastPurchase: '45 days ago', risk: 'High', location: 'San Francisco, CA', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: 'V-1032', name: 'David Miller', email: 'davidkm@example.com', ltv: '$2,950', orders: 12, lastPurchase: '4 days ago', risk: 'Low', location: 'Austin, TX', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
];

const GIFT_CATALOG = [
    { id: 'g1', name: 'Premium Coffee Blend', price: '$45.00', icon: '☕', target: 'Low Risk Refresher' },
    { id: 'g2', name: 'Handwritten Thank You Note', price: '$8.50', icon: '✍️', target: 'Post-Purchase Delight' },
    { id: 'g3', name: 'Exclusive Swag Box (Hoodie/Mug)', price: '$85.00', icon: '🎁', target: 'Top 1% Milestone' },
    { id: 'g4', name: 'Artisan Chocolate Box', price: '$65.00', icon: '🍫', target: 'Re-engagement (High Risk)' },
];

export default function VIPBlackBook() {
    const [selectedVIP, setSelectedVIP] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    const handleSendGift = () => {
        alert(`Success! Physical gift "${selectedGift.name}" will be packaged and shipped to ${selectedVIP.name} at their default shipping address.`);
        setSelectedGift(null);
        setSelectedVIP(null);
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Crown color="var(--accent-blue)" /> The VIP Black Book
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Automated retention & physical gifting API for your Top 1% LTV customers.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gifts Sent (MTD)</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-blue)' }}>124</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg VIP LTV</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>$3,622</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* VIP List */}
                <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Top 1% Customer Roster</h3>
                        <button className="btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>Export to CSV</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>VIP Customer</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Location</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Lifetime Value (LTV)</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Churn Risk</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Last Purchase</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>White-Glove Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_VIPS.map((vip, i) => (
                                    <tr key={vip.id} style={{ borderBottom: i < MOCK_VIPS.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light transition-all">
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={vip.avatar} alt={vip.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-blue)' }} />
                                                <div>
                                                    <div style={{ fontWeight: 600, color: 'white' }}>{vip.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{vip.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{vip.location}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 700, color: 'white', fontSize: '1.125rem' }}>{vip.ltv}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{vip.orders} Total Orders</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem',
                                                background: vip.risk === 'Low' ? 'rgba(0,230,118,0.1)' : vip.risk === 'Medium' ? 'rgba(255,170,0,0.1)' : 'rgba(255,61,113,0.1)',
                                                padding: '0.3rem 0.6rem', borderRadius: '2rem',
                                                color: vip.risk === 'Low' ? 'var(--success)' : vip.risk === 'Medium' ? 'var(--warning)' : 'var(--danger)'
                                            }}>
                                                {vip.risk === 'Low' ? <ShieldCheck size={12} /> : vip.risk === 'Medium' ? <Clock size={12} /> : <AlertTriangle size={12} />}
                                                <span style={{ fontWeight: 600 }}>{vip.risk}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{vip.lastPurchase}</td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button className="btn-secondary" style={{ padding: '0.5rem', background: 'transparent' }} title="Send Email">
                                                    <Mail size={16} color="var(--text-secondary)" />
                                                </button>
                                                <button
                                                    onClick={() => setSelectedVIP(vip)}
                                                    className="btn-primary"
                                                    style={{ padding: '0.4rem 1rem', background: 'var(--accent-blue)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', borderRadius: '4px' }}
                                                >
                                                    <Gift size={14} /> Send Physical Gift
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Gifting Modal */}
            {selectedVIP && (
                <>
                    <div onClick={() => { setSelectedVIP(null); setSelectedGift(null) }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', zIndex: 201, padding: '0', overflow: 'hidden', borderTop: '4px solid var(--accent-blue)' }}>

                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-elevated)' }}>
                            <img src={selectedVIP.avatar} alt={selectedVIP.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-blue)' }} />
                            <div>
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Surprise & Delight: {selectedVIP.name}</h2>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Star size={14} color="var(--warning)" /> Top 1% Spender ({selectedVIP.ltv} LTV)
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Select a physical item from our integrated fulfillment network. We will automatically custom-package and dispatch it to their default shipping address in {selectedVIP.location}.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {GIFT_CATALOG.map(gift => (
                                    <div
                                        key={gift.id}
                                        onClick={() => setSelectedGift(gift)}
                                        style={{
                                            padding: '1rem', border: selectedGift?.id === gift.id ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)', cursor: 'pointer', background: selectedGift?.id === gift.id ? 'rgba(56,189,248,0.1)' : 'rgba(0,0,0,0.2)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        className="hover-scale"
                                    >
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{gift.icon}</div>
                                        <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem', color: 'white' }}>{gift.name}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{gift.target}</span>
                                            <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{gift.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedGift && (
                                <div className="animate-fade-in" style={{ padding: '1rem', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem' }}>
                                    <Heart color="var(--success)" size={20} style={{ flexShrink: 0 }} />
                                    <div style={{ fontSize: '0.875rem' }}>
                                        <strong>Ready to dispatch!</strong> A custom branded {selectedGift.name.toLowerCase()} will be sent to {selectedVIP.name}. The {selectedGift.price} cost will be billed to your account.
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => { setSelectedVIP(null); setSelectedGift(null) }}>Cancel</button>
                            <button
                                className="btn-primary"
                                onClick={handleSendGift}
                                disabled={!selectedGift}
                                style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, opacity: selectedGift ? 1 : 0.5, cursor: selectedGift ? 'pointer' : 'not-allowed' }}
                            >
                                <Send size={16} /> Dispatch Physical Gift
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
