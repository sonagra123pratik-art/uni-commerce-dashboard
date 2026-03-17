import { 
  ShoppingCart, RefreshCcw, CheckCircle2, AlertCircle, PlaySquare, PauseCircle, Power,
  MoreHorizontal, Zap, Store, Truck, BarChart2, ShieldAlert, FileText, Plus,
  Database, Loader2, ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

const traditionalPlatforms = [
  { name: 'Amazon India', type: 'Marketplace', status: 'Connected', lastSync: 'Live Ping: 12ms', orders: 142, revenue: '₹1,24,500', iconColor: '#FF9900', rules: 'Fenced: 5 Units minimum' },
  { name: 'Flipkart', type: 'Marketplace', status: 'Connected', lastSync: 'Live Ping: 18ms', orders: 89, revenue: '₹88,200', iconColor: '#2874F0', rules: 'Auto-Pause if OOS' },
  { name: 'Shopify', type: 'D2C Storefront', status: 'Connected', lastSync: 'Live Ping: 45ms', orders: 42, revenue: '₹1,15,000', iconColor: '#95BF47', rules: 'Fenced: 20 Units reserved' },
  { name: 'Meesho', type: 'Reseller Network', status: 'Sync Error', lastSync: 'Failed 2 hrs ago', orders: 0, revenue: '₹0', iconColor: '#F43397', rules: 'No Fencing' },
];

const quickCommercePlatforms = [
  { name: 'Zepto', type: '10-Min Delivery', status: 'Connected', darkStores: 14, activeSKUs: 45, sla: '99.8%', alerts: 2, iconColor: '#FF0000' },
  { name: 'Blinkit', type: '10-Min Delivery', status: 'Connected', darkStores: 22, activeSKUs: 120, sla: '98.5%', alerts: 5, iconColor: '#F8CB46' },
  { name: 'Swiggy Instamart', type: '15-Min Delivery', status: 'Pending Approval', darkStores: 0, activeSKUs: 0, sla: '-', alerts: 0, iconColor: '#FC8019' },
];

export default function Marketplaces() {
  const [activeTab, setActiveTab] = useState('traditional');
  const [showB2BModal, setShowB2BModal] = useState(false);
  
  // Onboarding Wizard State
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [syncPhase, setSyncPhase] = useState(0); // For the loading animation
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Reset auth state when wizard closes or goes back to step 1
  useEffect(() => {
    if (!showOnboardModal || wizardStep === 1) {
      setIsAuthenticating(false);
      setAuthSuccess(false);
    }
  }, [showOnboardModal, wizardStep]);

  const handleOAuthConnect = () => {
    setIsAuthenticating(true);
    // Simulate OAuth popup delay
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
    }, 2000);
  };

  // Simulate complex backend integration handshake
  useEffect(() => {
    if (wizardStep === 4) {
      const timers = [
        setTimeout(() => setSyncPhase(1), 1000),
        setTimeout(() => setSyncPhase(2), 2500),
        setTimeout(() => setSyncPhase(3), 4000),
        setTimeout(() => {
          setSyncPhase(4);
          setTimeout(() => {
            setShowOnboardModal(false);
            setWizardStep(1);
            setSyncPhase(0);
            alert("Integration Successful! Channel added to your Master Hub.");
          }, 1000);
        }, 5500)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [wizardStep]);

  const TabButton = ({ id, label, icon: Icon, color }) => (
    <button 
      onClick={() => setActiveTab(id)}
      style={{ 
        display: 'flex', alignItems: 'center', gap: '0.5rem', 
        padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-pill)', 
        background: activeTab === id ? `rgba(${color}, 0.1)` : 'transparent',
        border: `1px solid ${activeTab === id ? `rgb(${color})` : 'transparent'}`,
        color: activeTab === id ? `rgb(${color})` : 'var(--text-secondary)',
        fontWeight: activeTab === id ? 600 : 500,
        transition: 'all 0.2s', cursor: 'pointer'
      }}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
      
      {/* Global Command Center Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <Store color="var(--accent-blue)" /> Omnichannel Operations
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>The master switchboard. Route inventory logic across India.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}>
            <RefreshCcw size={16} /> Force Global Sync
          </button>
          <button onClick={() => setShowOnboardModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'black', border: 'none' }}>
            <Plus size={16} /> Combine New Channel
          </button>
          <div style={{ height: '30px', width: '1px', background: 'var(--border-color)' }}></div>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,61,113,0.1)', borderColor: 'var(--danger)', color: 'var(--danger)', fontWeight: 600 }}>
            <PauseCircle size={18} fill="var(--danger)" color="black" /> KILL SWITCH (Pause All)
          </button>
        </div>
      </div>

      {/* Primary Navigation */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <TabButton id="traditional" label="Traditional E-Comm & D2C" icon={ShoppingCart} color="0, 210, 255" />
        <TabButton id="quick" label="Quick Commerce (10-Min)" icon={Zap} color="255, 167, 38" />
      </div>

      {/* Main Content Area based on Tab */}
      <div style={{ flex: 1 }}>
        
        {/* PILLAR 1: TRADITIONAL E-COMMERCE */}
        {activeTab === 'traditional' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <div>
                 <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>E-Commerce Integrations</h2>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Live API connections to Amazon, Flipkart, and your Shopify store.</p>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {traditionalPlatforms.map((platform, i) => (
                <div key={i} className="glass-panel hover-glow" style={{ padding: '1.5rem', borderTop: `3px solid ${platform.iconColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={28} color={platform.iconColor} />
                      </div>
                      <div>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{platform.name}</h3>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{platform.type}</p>
                      </div>
                    </div>
                    <button style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}><Power size={20} color={platform.status === 'Connected' ? 'var(--success)' : 'var(--text-secondary)'} /></button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                     <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Today's Orders</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{platform.orders}</div>
                     </div>
                     <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Today's Revenue</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>{platform.revenue}</div>
                     </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Inventory Rule:</span>
                      <span style={{ color: 'white' }}>{platform.rules}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>API Status:</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: platform.status === 'Connected' ? 'var(--success)' : 'var(--danger)' }}>
                         {platform.status === 'Connected' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {platform.lastSync}
                      </span>
                    </div>
                  </div>

                  {platform.status !== 'Connected' ? (
                    <button className="btn-secondary" style={{ width: '100%', borderColor: 'var(--danger)', color: 'var(--danger)' }}>Fix API Connection</button>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <button className="btn-secondary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.875rem' }}>Inventory Rules</button>
                       <button className="btn-secondary" style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.05)' }}><MoreHorizontal size={18} /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILLAR 2: QUICK COMMERCE PULSE */}
        {activeTab === 'quick' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(255, 167, 38, 0.1), transparent)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #FFA726' }}>
                <div>
                   <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <Truck color="#FFA726" size={24} /> The Dark Store Network
                   </h2>
                   <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Monitor highly localized inventory across 10-minute delivery hubs.</p>
                </div>
                <button onClick={() => setShowB2BModal(true)} className="btn-primary" style={{ background: '#FFA726', color: 'black', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Zap size={16} fill="black" /> AI Auto-Onboard to New Platform
                </button>
             </div>

             <div style={{ padding: '1rem', background: 'rgba(255,61,113,0.05)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <ShieldAlert color="var(--danger)" size={24} style={{ marginTop: '0.2rem' }} />
                <div>
                   <h4 style={{ fontWeight: 600, color: 'var(--danger)' }}>SLA Warning: Blinkit (Mumbai South Region)</h4>
                   <p style={{ fontSize: '0.875rem', color: 'white', marginTop: '0.25rem' }}>3 top-selling SKUs are out of stock in 5 dark stores. Your search ranking is dropping. Dispatch local PO immediately.</p>
                   <button className="btn-secondary" style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}>View Affected Stores</button>
                </div>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
               {quickCommercePlatforms.map((platform, i) => (
                 <div key={i} className="glass-panel hover-glow" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ padding: '0.75rem', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '60px' }}>
                        <span style={{ color: platform.iconColor, fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-1px' }}>{platform.name[0]}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{platform.name}</h3>
                          <p style={{ fontSize: '0.75rem', color: platform.status === 'Connected' ? 'var(--success)' : 'var(--warning)', fontWeight: 600 }}>{platform.status}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                       <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{platform.darkStores}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Live Dark Stores</div>
                       </div>
                       <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{platform.activeSKUs}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Active SKUs Mapped</div>
                       </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                       <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fulfillment SLA</div>
                          <div style={{ fontWeight: 600, color: platform.sla === '-' ? 'var(--text-secondary)' : 'var(--success)' }}>{platform.sla}</div>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Stock Alerts</div>
                          <div style={{ fontWeight: 600, color: platform.alerts > 0 ? 'var(--danger)' : 'var(--text-secondary)' }}>{platform.alerts} Critical</div>
                       </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                       {platform.status === 'Connected' ? (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                             <button className="btn-secondary" style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'center', gap: '0.4rem' }}><BarChart2 size={16}/> Regional Map</button>
                             <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>Sync Stocks</button>
                          </div>
                       ) : (
                          <button onClick={() => setShowB2BModal(true)} className="btn-secondary" style={{ width: '100%', borderColor: '#FFA726', color: '#FFA726' }}>Complete Onboarding</button>
                       )}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>

      {/* MULTI-STEP CHANNEL ONBOARDING WIZARD */}
      {showOnboardModal && (
        <>
          <div onClick={() => setShowOnboardModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 300 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '800px', height: '80vh', zIndex: 301, padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--accent-blue)', boxShadow: '0 0 50px rgba(0,210,255,0.1)' }}>
            
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Database color="var(--accent-blue)" /> Integration Wizard</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.2rem' }}>Connect a new sales channel to your Master Inventory Hub.</p>
               </div>
               
               {/* Progress Indicators */}
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4].map(step => (
                    <div key={step} style={{ width: '30px', height: '4px', borderRadius: '2px', background: wizardStep >= step ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)' }}></div>
                  ))}
               </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
               
               {/* STEP 1: Select Platform */}
               {wizardStep === 1 && (
                 <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>Step 1: Select Platform</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                       {['Shopify', 'Amazon India', 'Flipkart', 'Meesho', 'Zepto (10-Min)', 'Blinkit (10-Min)', 'Swiggy Instamart', 'WooCommerce'].map(p => (
                         <div 
                           key={p} 
                           onClick={() => setSelectedPlatform(p)}
                           style={{ padding: '1.5rem', border: `2px solid ${selectedPlatform === p ? 'var(--accent-blue)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center', background: selectedPlatform === p ? 'rgba(0,210,255,0.05)' : 'transparent', transition: 'all 0.2s' }}
                         >
                            <h4 style={{ fontWeight: 600 }}>{p}</h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                               {p === 'Shopify' || p === 'WooCommerce' ? 'Real-Time Webhooks' : p.includes('10-Min') || p === 'Swiggy Instamart' ? 'Dark Store B2B API' : 'Marketplace API Polling'}
                            </span>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {/* STEP 2: Authentication */}
               {wizardStep === 2 && (
                 <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                       {authSuccess ? <CheckCircle2 size={40} color="var(--success)" /> : <Zap size={40} color="var(--accent-blue)" />}
                    </div>
                    
                    <h3 style={{ fontSize: '1.75rem', margin: 0 }}>Connect to {selectedPlatform}</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: '1.6' }}>
                       Flux-Ehub uses secure OAuth 2.0 to connect to your {selectedPlatform} account. 
                       You will be redirected to grant read/write access to your inventory. We never store your raw credentials.
                    </p>
                    
                    <div style={{ marginTop: '2rem', width: '100%', maxWidth: '300px' }}>
                       {!authSuccess ? (
                         <button 
                           onClick={handleOAuthConnect}
                           disabled={isAuthenticating}
                           className="btn-primary hover-scale" 
                           style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', background: 'white', color: 'black', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                         >
                           {isAuthenticating ? (
                             <><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> Connecting...</>
                           ) : (
                             <>Sign in to {selectedPlatform}</>
                           )}
                         </button>
                       ) : (
                         <div style={{ padding: '1rem', background: 'rgba(0,230,118,0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <CheckCircle2 size={20} /> Connection Verified
                         </div>
                       )}
                    </div>
                    
                    {!authSuccess && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                         By connecting, you agree to the Flux-Ehub integration terms of service.
                      </p>
                    )}
                 </div>
               )}

               {/* STEP 3: Sync & Fencing Rules */}
               {wizardStep === 3 && (
                 <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>Step 3: Protocol Configuration</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                       <div>
                         <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Directional Flow</h4>
                         <select style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                            <option>Bidirectional (Master controls stock, Hub pulls orders)</option>
                            <option>Read-Only (Hub pulls orders but does NOT push stock)</option>
                            <option>Push-Only (Hub overwrites stock, ignores orders)</option>
                         </select>
                       </div>

                       <div>
                         <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Historical Sync</h4>
                         <select style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                            <option>Do not pull history (Start from today)</option>
                            <option>Pull last 30 Days of Orders</option>
                            <option>Pull All Time History (Warning: May take 12+ hours)</option>
                         </select>
                       </div>

                       <div>
                         <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Master Fencing Rule</h4>
                         <select style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                            <option>No fences (Publish full master inventory)</option>
                            <option>Always reserve 10% buffering</option>
                            <option>Fixed Reserve: Hold 5 units back</option>
                         </select>
                       </div>
                    </div>
                 </div>
               )}

               {/* STEP 4: Terminal Loading Handshake */}
               {wizardStep === 4 && (
                 <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem' }}>
                    <div style={{ animation: 'spin 2s linear infinite' }}>
                       <Loader2 size={48} color="var(--accent-blue)" />
                    </div>
                    
                    {/* Simulated Terminal Log */}
                    <div style={{ background: 'black', padding: '1.5rem', borderRadius: 'var(--radius-md)', width: '100%', fontFamily: 'monospace', fontSize: '0.875rem', color: '#0f0', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid rgba(0,255,0,0.3)' }}>
                       {syncPhase >= 0 && <div>&gt; Initiating secure handshake with {selectedPlatform} API endpoints...</div>}
                       {syncPhase >= 1 && <div>&gt; Validating OAuth tokens... [OK]</div>}
                       {syncPhase >= 2 && <div>&gt; Downloading channel schema... 14,204 nodes found.</div>}
                       {syncPhase >= 3 && <div>&gt; Cross-referencing {selectedPlatform} SKUs with Master Inventory Hub... [Mapping Complete]</div>}
                       {syncPhase >= 4 && <div style={{ color: 'white', fontWeight: 700, marginTop: '1rem' }}>&gt; INTEGRATION SUCCESSFUL. Redirecting...</div>}
                    </div>
                 </div>
               )}

            </div>

            {/* Footer Controls */}
            {wizardStep < 4 && (
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg-elevated)', display: 'flex', justifyContent: 'space-between' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => wizardStep === 1 ? setShowOnboardModal(false) : setWizardStep(prev => prev - 1)}
                >
                  {wizardStep === 1 ? 'Cancel' : 'Back'}
                </button>
                <button 
                  className="btn-primary" 
                  onClick={() => setWizardStep(prev => prev + 1)}
                  disabled={(wizardStep === 1 && !selectedPlatform) || (wizardStep === 2 && !authSuccess)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: ((wizardStep === 1 && !selectedPlatform) || (wizardStep === 2 && !authSuccess)) ? 'rgba(255,255,255,0.1)' : 'var(--accent-blue)', color: ((wizardStep === 1 && !selectedPlatform) || (wizardStep === 2 && !authSuccess)) ? 'var(--text-secondary)' : 'black', border: 'none' }}
                >
                  {wizardStep === 3 ? 'Initialize Integration' : 'Continue'} <ArrowRight size={16} />
                </button>
              </div>
            )}

          </div>
        </>
      )}

      {/* AI B2B Onboarding Modal from Marketplaces (Pre-existing) */}
      {showB2BModal && (
        <>
          <div onClick={() => setShowB2BModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', zIndex: 201, padding: '0', overflow: 'hidden', border: '1px solid #FFA726', boxShadow: '0 0 50px rgba(255,167,38,0.2)' }}>
            
            <div style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(255,167,38,0.2), transparent)', borderBottom: '1px solid rgba(255,167,38,0.2)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <FileText size={28} color="#FFA726" />
               <div>
                 <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>AI Vendor Pitch Generator</h2>
                 <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Automatically generate B2B sheets required by Zepto/Blinkit Category Managers.</p>
               </div>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                     Getting listed on Quick Commerce requires detailed margin structures, gross tonnage projections, and localized velocity pitches. Flux-Ehub AI will read your master inventory and generate this instantly.
                  </p>
               </div>

               <div>
                 <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Platform to Pitch</label>
                 <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                    <option>Swiggy Instamart</option>
                    <option>Zepto</option>
                    <option>Blinkit</option>
                 </select>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(123,97,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(123,97,255,0.2)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Generate B2B Pitch Deck & Excel</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Automated Margin sheets & Brand Intro PDF</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Zap size={14} fill="var(--warning)"/> 30 Coins</span>
               </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowB2BModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { alert('Generated 3 Excel sheets and 1 PDF Pitch Deck. Deducted 30 Coins.'); setShowB2BModal(false); }} style={{ background: '#FFA726', color: 'black', border: 'none', fontWeight: 600 }}>Generate Pitch Documents</button>
            </div>
            
          </div>
        </>
      )}

    </div>
  );
}
