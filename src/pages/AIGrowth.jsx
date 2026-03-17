import {
  Sparkles, Image, Type, Activity, TrendingUp, Zap,
  MessageCircle, BarChart3, Target, Play, Send, CheckCircle2,
  DollarSign, RefreshCw, Layers, Video, Bot, X, Loader2, Mail, Share2
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Mock Data for the 4 Pillars
const adviserFeed = [
  { id: 1, type: 'critical', platform: 'Amazon', title: 'High ACOS Alert: Wireless Earbuds', desc: 'Keyword "bluetooth earphones" has ₹1,200 spend with 0 conversions today. ACOS is 145%.', action: 'Pause Keyword', cost: 0, icon: Target, color: 'var(--danger)' },
  { id: 2, type: 'opportunity', platform: 'Shopify', title: 'Traffic Spike: 0 Sales', desc: '140 visitors on SKU-003 today but 0 checkouts. Competitor dropped price by 10%.', action: 'Launch 10% Flash Sale', cost: 0, icon: TrendingUp, color: 'var(--success)' },
  { id: 3, type: 'creative', platform: 'Meta Ads', title: 'Ad Fatigue Detected', desc: 'Your main Instagram Reel for SKU-001 has dropped to a 0.8% CTR. Time to refresh the hook.', action: 'Generate New Script', cost: 3, icon: Type, color: 'var(--accent-purple)' },
];

const campaignData = [
  { platform: 'Meta Ads', campaign: 'Retargeting_Earbuds_Q3', spend: '₹14,500', roas: '3.4x', status: 'Active', trend: 'up' },
  { platform: 'Google Ads', campaign: 'Search_Brand_Protect', spend: '₹8,200', roas: '4.1x', status: 'Active', trend: 'up' },
  { platform: 'Amazon Ads', campaign: 'Auto_CatchAll_SKU1', spend: '₹22,000', roas: '1.2x', status: 'Warning', trend: 'down' },
];

export default function AIGrowth() {
  const [activeTab, setActiveTab] = useState('advisor');
  const [coins, setCoins] = useState(450);

  // Modals for the Creative Studio
  const [showCreativeModal, setShowCreativeModal] = useState(false);
  const [creativeType, setCreativeType] = useState(null); // 'image', 'copy', 'script', 'video'

  // Modal for Top Up
  const [showTopUpModal, setShowTopUpModal] = useState(false);

  // Copilot Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hey there! I am your Brand Copilot. Ask me anything about your analytics, inventory, or ad campaigns.' }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleAction = (cost, successMsg) => {
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      alert(successMsg);
    } else {
      setShowTopUpModal(true);
    }
  };

  const handleTopUp = (amount) => {
    setCoins(prev => prev + amount);
    setShowTopUpModal(false);
    alert(`Successfully purchased ${amount} AI Coins!`);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: chatMessage };
    setMessages(prev => [...prev, userMsg]);
    setChatMessage('');
    setIsTyping(true);

    // Provide mocked AI responses based on keywords
    setTimeout(() => {
      let aiText = "I'm analyzing that across your omnichannel data right now...";
      const query = userMsg.text.toLowerCase();

      if (query.includes('sales') && query.includes('mumbai')) {
        aiText = "Based on your analytics, your 'Summer Blue T-Shirt' is trending hard in Mumbai with a 4% conversion rate. I recommend shifting ₹5,000 in ad spend from Delhi to Maharashtra today. Want me to apply this? (Costs 5 Coins)";
      } else if (query.includes('retention') || query.includes('customers')) {
        aiText = "You have 50 high-value customers who haven't purchased in 60 days. Sending them a custom 15% discount via WhatsApp has a 12% probability of winning them back. Shall I draft the campaign?";
      } else if (query.includes('inventory') || query.includes('stock')) {
        aiText = "Your 'Wireless Earbuds Pro' on Amazon (2 units) is depleting 4x faster than Flipkart. I recommend transferring 20 units to Amazon FBA.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: aiText }]);
      setIsTyping(false);
    }, 1500);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-pill)',
        background: activeTab === id ? 'rgba(123,97,255,0.1)' : 'transparent',
        border: `1px solid ${activeTab === id ? 'var(--accent-purple)' : 'transparent'}`,
        color: activeTab === id ? 'var(--accent-purple)' : 'var(--text-secondary)',
        fontWeight: activeTab === id ? 600 : 500,
        transition: 'all 0.2s', cursor: 'pointer'
      }}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>

      {/* Header & Coin Balance */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles color="var(--accent-purple)" /> AI Marketing Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your autonomous chief marketing officer.</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,170,0,0.15), rgba(255,170,0,0.05))', border: '1px solid rgba(255,170,0,0.3)', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 0 20px rgba(255,170,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(255,170,0,0.5)' }}>
              <span style={{ color: 'black', fontSize: '0.7rem', fontWeight: 900 }}>₵</span>
            </div>
            <span style={{ fontWeight: 700, color: 'white', fontSize: '1.25rem' }}>{coins.toLocaleString()}</span>
          </div>
          <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--warning)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Up</button>
        </div>
      </div>

      {/* Primary Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <TabButton id="advisor" label="Growth Advisor" icon={Zap} />
        <TabButton id="creative" label="AI Creative Studio" icon={Image} />
        <TabButton id="campaign" label="Ad Campaign Manager" icon={BarChart3} />
        <TabButton id="crm" label="Retention CRM" icon={MessageCircle} />
      </div>

      {/* Main Content Area based on Tab */}
      <div style={{ flex: 1 }}>

        {/* PILLAR 1: GROWTH ADVISOR (Action Feed) */}
        {activeTab === 'advisor' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Actionable Insights</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>AI algorithms are monitoring your traffic and ad spend in real-time.</p>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer' }}><RefreshCw size={14} /> Refresh Deep Scan</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {adviserFeed.map(feed => (
                <div key={feed.id} className="glass-panel hover-glow" style={{ padding: '1.5rem', borderLeft: `4px solid ${feed.color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minWidth: '300px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
                      <feed.icon size={24} color={feed.color} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{feed.platform}</span>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{feed.title}</h3>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{feed.desc}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    {feed.cost > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Sparkles size={12} /> {feed.cost} Coins</span>}
                    {feed.cost === 0 && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>Free Action</span>}
                    <button className="btn-primary" onClick={() => handleAction(feed.cost, `Executed: ${feed.action}`)} style={{ background: feed.color, color: feed.type === 'opportunity' ? 'black' : 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {feed.action} <CheckCircle2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(123,97,255,0.05)', border: '1px dashed var(--accent-purple)', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ background: 'rgba(123,97,255,0.2)', padding: '1rem', borderRadius: '50%' }}><Sparkles size={24} color="var(--accent-purple)" /></div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Need a Custom Strategy?</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem', maxWidth: '400px' }}>Spend 20 Coins to have the AI analyze your entire store history and build a 30-day growth roadmap.</p>
              </div>
              <button className="btn-secondary" style={{ color: 'var(--accent-purple)', borderColor: 'var(--accent-purple)' }}>Generate 30-Day Growth Plan</button>
            </div>
          </div>
        )}

        {/* PILLAR 2: CREATIVE STUDIO */}
        {activeTab === 'creative' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI Asset Generator</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Stop paying agencies. Generate high-converting photos, scripts, and ad copy instantly.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div onClick={() => { setCreativeType('image'); setShowCreativeModal(true); }} className="glass-panel hover-glow" style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(0,210,255,0.2), transparent)', padding: '1.5rem', borderRadius: '50%', border: '1px solid var(--accent-blue)' }}><Image size={32} color="var(--accent-blue)" /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Lifestyle Photos</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Upload a transparent product. AI places it in realistic, cinematic environments.</p>
                </div>
                <div style={{ marginTop: 'auto', background: 'rgba(255,170,0,0.1)', color: 'var(--warning)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600 }}>15 Coins / Image</div>
              </div>

              <div onClick={() => { setCreativeType('copy'); setShowCreativeModal(true); }} className="glass-panel hover-glow" style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(123,97,255,0.2), transparent)', padding: '1.5rem', borderRadius: '50%', border: '1px solid var(--accent-purple)' }}><Type size={32} color="var(--accent-purple)" /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Ad Copywriter</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Generate psychological hooks and converting ad text for Facebook & Google.</p>
                </div>
                <div style={{ marginTop: 'auto', background: 'rgba(255,170,0,0.1)', color: 'var(--warning)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600 }}>3 Coins / Generation</div>
              </div>

              <div onClick={() => { setCreativeType('video'); setShowCreativeModal(true); }} className="glass-panel hover-glow" style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', border: '1px solid rgba(255,61,113,0.3)', background: 'linear-gradient(180deg, rgba(255,61,113,0.05) 0%, transparent 100%)' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(255,61,113,0.2), transparent)', padding: '1.5rem', borderRadius: '50%', border: '1px solid var(--danger)' }}><Video size={32} color="var(--danger)" /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Video Reels</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Generate full 15-second viral marketing videos with AI voiceovers and B-roll.</p>
                </div>
                <div style={{ marginTop: 'auto', background: 'rgba(255,170,0,0.1)', color: 'var(--warning)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600 }}>50 Coins / Video</div>
              </div>

              <div onClick={() => { setCreativeType('script'); setShowCreativeModal(true); }} className="glass-panel hover-glow" style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.2), transparent)', padding: '1.5rem', borderRadius: '50%', border: '1px solid var(--success)' }}><Play size={32} color="var(--success)" /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Reels / TikTok Scripts</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Viral 15-30s video scripts detailing hooks, visual scenes, and call-to-actions.</p>
                </div>
                <div style={{ marginTop: 'auto', background: 'rgba(255,170,0,0.1)', color: 'var(--warning)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600 }}>5 Coins / Script</div>
              </div>

              <div onClick={() => { setCreativeType('social'); setShowCreativeModal(true); }} className="glass-panel hover-glow" style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(0,210,255,0.2), transparent)', padding: '1.5rem', borderRadius: '50%', border: '1px solid var(--accent-blue)' }}><Share2 size={32} color="var(--accent-blue)" /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Social Media Posts</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Generate engaging captions and hashtags for Instagram, LinkedIn, and X.</p>
                </div>
                <div style={{ marginTop: 'auto', background: 'rgba(255,170,0,0.1)', color: 'var(--warning)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600 }}>2 Coins / Post</div>
              </div>

              <div onClick={() => { setCreativeType('email'); setShowCreativeModal(true); }} className="glass-panel hover-glow" style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(255,170,0,0.2), transparent)', padding: '1.5rem', borderRadius: '50%', border: '1px solid var(--warning)' }}><Mail size={32} color="var(--warning)" /></div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Campaigns</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Draft high-converting promotional newsletters and product announcement emails.</p>
                </div>
                <div style={{ marginTop: 'auto', background: 'rgba(255,170,0,0.1)', color: 'var(--warning)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600 }}>4 Coins / Email</div>
              </div>
            </div>

            {/* Creative Generator Modal */}
            {showCreativeModal && (
              <>
                <div onClick={() => setShowCreativeModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
                <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', zIndex: 201, padding: '2rem', border: '1px solid var(--accent-purple)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                      {creativeType === 'image' ? 'Generate Lifestyle Image' : creativeType === 'video' ? 'Generate Full Video Reel' : creativeType === 'copy' ? 'Generate Ad Text' : creativeType === 'social' ? 'Generate Social Post' : creativeType === 'email' ? 'Generate Email Campaign' : 'Generate Viral Script'}
                    </h2>
                    <div style={{ background: 'rgba(255,170,0,0.2)', color: 'var(--warning)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      Cost: {creativeType === 'image' ? 15 : creativeType === 'video' ? 50 : creativeType === 'copy' ? 3 : creativeType === 'social' ? 2 : creativeType === 'email' ? 4 : 5} Coins
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Target Product</label>
                      <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                        <option>SKU-001: Wireless Noise-Cancelling Earbuds Pro</option>
                        <option>SKU-002: Smart Fitness Watch</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Describe the desired output or mood (Optional)</label>
                      <textarea rows="3" placeholder={creativeType === 'image' ? "e.g. On a wooden desk with morning sunlight" : "e.g. Focus on the 24 hour battery life and use scarcity"} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', resize: 'none' }}></textarea>
                    </div>

                    {creativeType === 'video' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>AI Voiceover (Language & Tone)</label>
                          <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                            <option>English (Indian, High Energy)</option>
                            <option>Hindi (Casual, Storytelling)</option>
                            <option>English (US, Premium Gen-Z)</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Video Pace</label>
                          <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                            <option>Fast & Trendy (0.5s cuts)</option>
                            <option>Cinematic & Slow (2s cuts)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {(creativeType === 'image' || creativeType === 'video') && (
                      <div style={{ border: '1px dashed var(--border-color)', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        Click to Select Transparent PNGs / Master Image Assets
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <button className="btn-secondary" onClick={() => setShowCreativeModal(false)}>Cancel</button>
                    <button className="btn-primary" onClick={() => { handleAction(creativeType === 'image' ? 15 : creativeType === 'video' ? 50 : creativeType === 'copy' ? 3 : creativeType === 'social' ? 2 : creativeType === 'email' ? 4 : 5, 'Asset Generated!'); setShowCreativeModal(false); }} style={{ background: 'var(--accent-purple)', border: 'none' }}>✨ Generate Asset</button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TOP UP MODAL */}
        {showTopUpModal && (
          <>
            <div onClick={() => setShowTopUpModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 100 }} className="animate-fade-in"></div>
            <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '500px', zIndex: 101, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-elevated)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Zap color="var(--accent-purple)" size={24} />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Recharge AI Coins</h2>
                </div>
                <button onClick={() => setShowTopUpModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Instantly top up your account balance to continue using AI Copilot, Asset Generation, and Advanced Analytics.</p>

                <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }} className="hover-border-glow">
                  <div>
                    <h4 style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={16} color="var(--accent-purple)" /> 500 Coins</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Perfect for light generative tasks.</span>
                  </div>
                  <button onClick={() => handleTopUp(500)} className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>Buy ₹499</button>
                </div>

                <div style={{ border: '1px solid var(--accent-purple)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: 'rgba(123,97,255,0.1)', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-10px', right: '10px', background: 'var(--accent-purple)', color: 'white', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: 600 }}>POPULAR</span>
                  <div>
                    <h4 style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={16} color="var(--accent-purple)" /> 2,000 Coins</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Save 20% on AI compute.</span>
                  </div>
                  <button onClick={() => handleTopUp(2000)} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Buy ₹1,499</button>
                </div>

                <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }} className="hover-border-glow">
                  <div>
                    <h4 style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={16} color="var(--accent-purple)" /> 5,000 Coins</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>For heavy omnichannel enterprises.</span>
                  </div>
                  <button onClick={() => handleTopUp(5000)} className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>Buy ₹3,499</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '1rem' }}>
                  <CheckCircle2 size={12} color="var(--success)" /> Secure checkout via Razorpay (UPI, Cards, Netbanking)
                </div>
              </div>
            </div>
          </>
        )}

        {/* PILLAR 3: CAMPAIGN MANAGER */}
        {activeTab === 'campaign' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Multi-Channel ROAS Tracker</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Monitor and shift budgets across Meta, Google, and Amazon from one place.</p>
              </div>
              <button className="btn-primary" onClick={() => handleAction(20, 'Budgets auto-optimized!')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-blue)', color: 'black', border: 'none' }}><Sparkles size={16} /> Auto-Optimize Budgets (20 Coins)</button>
            </div>

            {/* Unified Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Daily Ad Spend</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹44,700</h3>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Ad Revenue</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--success)' }}>₹1,02,400</h3>
              </div>
              <div style={{ background: 'linear-gradient(135deg, rgba(123,97,255,0.1), transparent)', border: '1px solid rgba(123,97,255,0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Blended ROAS</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>2.29x</h3>
              </div>
            </div>

            {/* Active Campaigns Table */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Platform</th>
                    <th style={{ padding: '1rem' }}>Campaign Name</th>
                    <th style={{ padding: '1rem' }}>Today's Spend</th>
                    <th style={{ padding: '1rem' }}>ROAS</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map((camp, i) => (
                    <tr key={i} style={{ borderTop: i !== 0 ? '1px solid var(--border-color)' : 'none' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{camp.platform}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{camp.campaign}</td>
                      <td style={{ padding: '1rem' }}>{camp.spend}</td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: camp.trend === 'up' ? 'var(--success)' : 'var(--danger)' }}>{camp.roas}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', background: camp.status === 'Active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,61,113,0.1)', color: camp.status === 'Active' ? 'var(--success)' : 'var(--danger)', border: `1px solid ${camp.status === 'Active' ? 'rgba(0,230,118,0.3)' : 'rgba(255,61,113,0.3)'}` }}>
                          {camp.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PILLAR 4: RETENTION CRM */}
        {activeTab === 'crm' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Win-Back & Retention CRM</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>AI automatically finds dormant customers and abandoned carts to recover revenue.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Segment 1 */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid rgba(123,97,255,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>AI Coins Balance</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-purple)' }}>
                    <Zap size={20} fill="currentColor" /> {coins}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min((coins / 1000) * 100, 100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))' }}></div>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setShowTopUpModal(true)}
                  style={{ width: '100%', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <DollarSign size={16} /> Top Up Coins
                </button>
              </div>

              {/* Segment 2 */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(255,170,0,0.1)', padding: '0.5rem', borderRadius: '8px' }}><DollarSign color="var(--warning)" size={20} /></div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Abandoned Carts (High Value)</h3>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>42</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                  Customers who abandoned carts worth over ₹5,000 in the last 24 hours. Estimated recoverable: <span style={{ color: 'white' }}>₹2,10,000</span>
                </p>
                <button onClick={() => handleAction(20, 'WhatsApp sequence initiated to 42 customers!')} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#25D366', color: 'black', border: 'none' }}>
                  <Send size={16} /> AI Draft & Send WhatsApp (20 Coins)
                </button>
              </div>

              {/* Segment 2 */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(123,97,255,0.1)', padding: '0.5rem', borderRadius: '8px' }}><Layers color="var(--accent-purple)" size={20} /></div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Dormant Buyers (&gt;6 months)</h3>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>1,208</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                  Customers who bought once over 6 months ago but never returned. High probability of churn.
                </p>
                <button onClick={() => handleAction(50, 'Win-back email sequence generated and queued!')} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-purple)', color: 'white', border: 'none' }}>
                  <Send size={16} /> Generate Win-Back Emails (50 Coins)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating Brand Copilot Chat */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
        {/* Chat Window */}
        {isChatOpen && (
          <div className="glass-panel animate-scale-in" style={{ position: 'absolute', bottom: '120%', right: 0, width: '350px', height: '450px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--accent-purple)', boxShadow: '0 10px 40px rgba(123,97,255,0.2)' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 600 }}>
                <Bot size={20} /> Brand Copilot
              </div>
              <button onClick={() => setIsChatOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {/* Message List */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.5)' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ background: msg.sender === 'user' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: msg.sender === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0', color: 'white', fontSize: '0.875rem', lineHeight: '1.4' }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                    {msg.sender === 'user' ? 'You' : 'AI'}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '1rem 1rem 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Loader2 size={16} className="animate-spin" color="var(--accent-purple)" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Analyzing data...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleChatSubmit} style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', background: 'var(--bg-elevated)' }}>
              <input
                type="text"
                placeholder="Ask about your brand..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-pill)', padding: '0.5rem 1rem', color: 'white', fontSize: '0.875rem' }}
              />
              <button type="submit" disabled={!chatMessage.trim() || isTyping} style={{ background: 'var(--accent-purple)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: chatMessage.trim() && !isTyping ? 'pointer' : 'not-allowed', opacity: chatMessage.trim() && !isTyping ? 1 : 0.5 }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="hover-glow"
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(123,97,255,0.4)', transition: 'transform 0.2s' }}
        >
          {isChatOpen ? <X size={28} color="white" /> : <Bot size={28} color="white" />}
        </button>
      </div>

    </div>
  );
}
