import { BookOpen, Megaphone, Share2, Target, BarChart, Zap, ShoppingCart, Info, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function HelpCenter() {
    const [activeTab, setActiveTab] = useState('meta-ads');

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem', borderRadius: 'var(--radius-md)',
                background: activeTab === id ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: `1px solid ${activeTab === id ? 'var(--accent-blue)' : 'transparent'}`,
                color: activeTab === id ? 'white' : 'var(--text-secondary)',
                fontWeight: activeTab === id ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s', cursor: 'pointer'
            }}
        >
            <Icon size={18} color={activeTab === id ? 'var(--accent-blue)' : 'currentColor'} />
            {label}
        </button>
    );

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>

            {/* Header */}
            <div style={{ padding: '2rem', background: 'linear-gradient(to right, rgba(0,210,255,0.1), transparent)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,210,255,0.2)' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BookOpen color="var(--accent-blue)" size={32} /> Help Center & User Guides
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
                    Learn how Flux-Ehub integrates your ad networks, marketplaces, and operations into a single AI-driven command center.
                </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                {/* Sidebar Navigation */}
                <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '0 1rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>User Guides</div>
                    <TabButton id="meta-ads" label="How Meta Ads Integration Works" icon={Megaphone} />
                    <TabButton id="omnichannel" label="Marketplace & 10-Min Sync" icon={Share2} />
                    <TabButton id="ai-coins" label="Understanding AI Coins" icon={Zap} />
                    <TabButton id="security" label="Data & Security Privacy" icon={ShieldCheck} />
                </div>

                {/* Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* META ADS GUIDE */}
                    {activeTab === 'meta-ads' && (
                        <div className="glass-panel animate-scale-in" style={{ padding: '2.5rem', borderTop: '3px solid #1877F2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(24,119,242,0.1)', borderRadius: '12px' }}>
                                    <Target size={32} color="#1877F2" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Meta & Facebook Ads Engine</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>How your dashboard connects to your Ad Accounts to optimize ROAS.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {/* Concept 1 */}
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>1</div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>The Conversions API (CAPI) Ping</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Instead of relying just on the browser Pixel (which iOS 14+ blocks), Flux-Ehub sends successful order data *directly* from your Shopify/WooCommerce server to Meta's servers. This gives Meta 100% accurate data on who actually bought your product, allowing their algorithm to find similar buyers much faster.</p>
                                    </div>
                                </div>

                                {/* Concept 2 */}
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>2</div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Automated Audience Syncing</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>When a customer ignores your WhatsApp messages or abandons a cart, the system automatically tags their phone number and hashes it. It then pushes this list to your Meta Business Manager to create a "Win-Back Custom Audience" so you can target them with specific discount ads.</p>
                                    </div>
                                </div>

                                {/* Concept 3 */}
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,210,255,0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>3</div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>AI Copilot Budget Optimization</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>The Brand Copilot AI constantly reads your Meta Ad spend versus your actual Shopify revenue. If an ad campaign is spending money but not generating confirmed orders (Low ROAS), the AI will proactively alert you and offer to pause the campaign with a single click, saving your budget.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> Meta Ad Account Connected</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Pixel ID: 1928374650012 • Status: Active and hashing data.</div>
                                </div>
                                <button className="btn-secondary">View Ad Campaigns</button>
                            </div>
                        </div>
                    )}

                    {/* OMNICHANNEL GUIDE */}
                    {activeTab === 'omnichannel' && (
                        <div className="glass-panel animate-scale-in" style={{ padding: '2.5rem', borderTop: '3px solid #FFA726' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(255,167,38,0.1)', borderRadius: '12px' }}>
                                    <ShoppingCart size={32} color="#FFA726" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Marketplace & Inventory Sync</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>Understand the Master Inventory Hub structure.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>Your Flux-Ehub dashboard acts as the single source of truth for your stock. You should never update inventory directly on Amazon or Zepto; you update it here, and the system handles the rest.</p>

                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-blue)' }}>
                                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Traditional Marketplaces (Amazon, D2C)</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>The system uses API polling. If an order drops on Amazon, your total available stock in Flux-Ehub decreases by 1. The dashboard immediately pings Shopify and Flipkart to reduce their stock by 1 as well, preventing overselling.</p>
                                </div>

                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #FFA726' }}>
                                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quick-Commerce (Zepto, Blinkit, Instamart)</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Unlike Amazon, 10-minute delivery relies on "Dark Stores". Therefore, Quick Commerce inventory is highly localized. Flux-Ehub tracks inventory *per dark store pincode*. When you generate B2B invoices to send stock to a Zepto warehouse, the system automatically maps that inventory to the respective dark stores once received by Zepto.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI COINS GUIDE */}
                    {activeTab === 'ai-coins' && (
                        <div className="glass-panel animate-scale-in" style={{ padding: '2.5rem', borderTop: '3px solid var(--accent-purple)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(123,97,255,0.1)', borderRadius: '12px' }}>
                                    <Zap size={32} color="var(--accent-purple)" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Understanding AI Coins</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>The micro-transaction engine that powers your growth.</p>
                                </div>
                            </div>

                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Flux-Ehub utilizes heavy generative AI models to create ad creatives, analyze gigabytes of omnichannel data, and generate voice calls. These features cost AI Coins to prevent abuse and keep your subscription price low.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Generative Features</div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <li>• Viral Reel Script Generation: <strong>5 Coins</strong></li>
                                        <li>• AI Product Photography: <strong>10 Coins / Image</strong></li>
                                        <li>• B2B Quick Commerce Pitch: <strong>30 Coins</strong></li>
                                    </ul>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Action Features</div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <li>• Automated Refund IVR Call: <strong>3 Coins / Minute</strong></li>
                                        <li>• Deep Data Chat Query: <strong>2 Coins</strong></li>
                                        <li>• Win-back WhatsApp Sequence: <strong>1 Coin / Msg</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECURITY */}
                    {activeTab === 'security' && (
                        <div className="glass-panel animate-scale-in" style={{ padding: '2.5rem', borderTop: '3px solid var(--success)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(0,230,118,0.1)', borderRadius: '12px' }}>
                                    <ShieldCheck size={32} color="var(--success)" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Data & Security Privacy</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>How we protect your customer and financial data.</p>
                                </div>
                            </div>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>Your data is encrypted at rest and in transit. Flux-Ehub only maintains read-access to your Ad Accounts and Marketplaces, preventing unauthorized destructive actions. Your customer PII (Personally Identifiable Information) like phone numbers and addresses are masked in the dashboard to prevent staff data theft, only readable by the system for shipping label generation.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
