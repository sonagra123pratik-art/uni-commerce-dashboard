import { useState } from 'react';
import { Gift, Copy, CheckCircle2, Users, TrendingUp, Zap, Coins } from 'lucide-react';

export default function Referrals() {
    const [copied, setCopied] = useState(false);
    const referralLink = "https://flux-ehub.com/ref/store-2910";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const referralHistory = [
        { name: 'FitLife Organics', date: '10 Mar 2026', status: 'Converted', reward: '+ 500 Coins' },
        { name: 'Zenith Apparel', date: '05 Mar 2026', status: 'Pending', reward: '0' },
        { name: 'Aura Home Goods', date: '28 Feb 2026', status: 'Converted', reward: '+ 500 Coins' },
    ];

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Gift color="var(--accent-purple)" /> Partner & Earn
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Invite fellow brand owners to Flux-Ehub and earn AI Coins together.</p>
                </div>
            </div>

            {/* Main Stats and Link */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Your Referral Link</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Share this unique link. When a new brand signs up and completes their first billing cycle, both of you receive 500 AI Coins.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', padding: '0 1rem', fontSize: '1rem', outline: 'none' }}
                        />
                        <button
                            onClick={handleCopy}
                            className="btn-primary"
                            style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: copied ? 'var(--success)' : 'var(--accent-purple)' }}
                        >
                            {copied ? <CheckCircle2 size={18} color="black" /> : <Copy size={18} />}
                            <span style={{ color: copied ? 'black' : 'white', fontWeight: 600 }}>{copied ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Clicks</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>124</h3>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Signups</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>12</h3>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Conversion Rate</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>9.6%</h3>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem', borderTop: '4px solid var(--warning)' }}>
                    <div style={{ background: 'rgba(255,170,0,0.1)', padding: '1.5rem', borderRadius: '50%' }}>
                        <Coins size={48} color="var(--warning)" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--warning)', margin: 0 }}>1,000</h2>
                        <p style={{ color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Coins Earned</p>
                    </div>
                    <button className="btn-secondary" style={{ marginTop: '0.5rem' }}>Redeem to Balance</button>
                </div>
            </div>

            {/* History */}
            <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={20} color="var(--accent-blue)" />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Referrals</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <th style={{ padding: '1rem 1.5rem' }}>Brand Name</th>
                            <th style={{ padding: '1rem' }}>Date Joined</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        {referralHistory.map((ref, idx) => (
                            <tr key={idx} style={{ borderTop: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{ref.name}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{ref.date}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem',
                                        background: ref.status === 'Converted' ? 'rgba(0,230,118,0.1)' : 'rgba(255,170,0,0.1)',
                                        color: ref.status === 'Converted' ? 'var(--success)' : 'var(--warning)',
                                        border: `1px solid ${ref.status === 'Converted' ? 'var(--success)' : 'var(--warning)'}`
                                    }}>
                                        {ref.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right', fontWeight: 700, color: ref.reward !== '0' ? 'var(--warning)' : 'var(--text-secondary)' }}>
                                    {ref.reward}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
