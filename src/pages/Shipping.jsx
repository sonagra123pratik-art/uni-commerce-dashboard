import { 
  Truck, MapPin, Search, Package, CheckCircle2, Clock, AlertTriangle, Activity, 
  PhoneCall, RotateCcw, Box, ArrowRightLeft, ShieldAlert, Zap, FileText, Share2, Info
} from 'lucide-react';
import { useState } from 'react';

// Mock Data for the B2C NDR Table
const ndrShipments = [
  { id: 'AWB-89472', orderId: '#100452', courier: 'Delhivery', status: 'Customer Refused', attempts: 2, value: '₹4,500', daysInTransit: 4, risk: 'High' },
  { id: 'AWB-55612', orderId: '#100489', courier: 'BlueDart', status: 'Address Incomplete', attempts: 1, value: '₹1,200', daysInTransit: 2, risk: 'Medium' },
  { id: 'AWB-11204', orderId: '#100511', courier: 'XpressBees', status: 'Premises Closed', attempts: 3, value: '₹8,900', daysInTransit: 6, risk: 'Critical' },
];

export default function Shipping() {
  const [activeTab, setActiveTab] = useState('b2c');
  const [showIVRModal, setShowIVRModal] = useState(false);
  const [selectedNDR, setSelectedNDR] = useState(null);

  const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="glass-panel hover-glow" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', borderTop: `3px solid rgb(${color})` }}>
      <div style={{ background: `rgba(${color}, 0.1)`, padding: '1rem', borderRadius: 'var(--radius-md)' }}>
        <Icon size={24} color={`rgb(${color})`} />
      </div>
      <div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1 }}>{value}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 500 }}>{title}</p>
        {subtext && <p style={{ color: `rgb(${color})`, fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 600 }}>{subtext}</p>}
      </div>
    </div>
  );

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
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <Truck color="var(--accent-blue)" /> Logistics & Forwarding Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Command center for B2C consumer parcels and B2B freight manifests.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} /> Courier Performance
          </button>
        </div>
      </div>

      {/* Primary Navigation */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <TabButton id="b2c" label="B2C Parcels & NDR Management" icon={Package} color="0, 210, 255" />
        <TabButton id="b2b" label="B2B Freight & E-Way Bills" icon={Truck} color="145, 124, 255" />
      </div>

      {/* Main Content Area based on Tab */}
      <div style={{ flex: 1 }}>
        
        {/* PILLAR 1: B2C & NDR */}
        {activeTab === 'b2c' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* KPI Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <StatCard title="Ready to Dispatch" value="245" icon={Package} color="0, 210, 255" subtext="Pending Manifest Setup" />
              <StatCard title="In Transit" value="1,842" icon={Truck} color="145, 124, 255" subtext="98.2% On Time" />
              <StatCard title="Active NDRs" value="42" icon={ShieldAlert} color="255, 167, 38" subtext="Requires Immediate Action" />
              <StatCard title="RTO Rate (30 Days)" value="4.8%" icon={AlertTriangle} color="255, 61, 113" subtext="Down 1.2% this week" />
            </div>

            {/* Smart Courier Allocation Rule Box */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid var(--success)' }}>
               <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={18} color="var(--success)"/> AI Courier Allocation is Active</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Currently forcing high-value COD orders to BlueDart, and downgrading XpressBees in UP due to 15% high RTO rate.</p>
               </div>
               <button className="btn-secondary">Configure Rules</button>
            </div>

            {/* Live NDR Command Center Table */}
            <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={20}/> Actionable NDRs</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Parcels that failed delivery. Action them quickly to prevent costly RTO returns.</p>
                  </div>
                  <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input type="text" placeholder="Search AWB..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
                  </div>
               </div>
               
               <div className="glass-panel" style={{ overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>AWB / Order ID</th>
                        <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Courier</th>
                        <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Failure Reason</th>
                        <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Metrics</th>
                        <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ndrShipments.map((ndr, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="hover-bg-light">
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 600, color: 'white' }}>{ndr.id}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>{ndr.orderId}</div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{ndr.courier}</span>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', fontWeight: 500 }}>
                              <AlertTriangle size={14} /> {ndr.status}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Attempt #{ndr.attempts}</div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontSize: '0.875rem' }}>Value: <span style={{ color: 'white', fontWeight: 500 }}>{ndr.value}</span></div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Transit: {ndr.daysInTransit} Days</div>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button onClick={() => { setSelectedNDR(ndr); setShowIVRModal(true); }} className="btn-secondary" style={{ padding: '0.5rem', background: 'rgba(0, 210, 255, 0.1)', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                                <PhoneCall size={14}/> Auto-IVR Call
                              </button>
                              <button className="btn-secondary" style={{ padding: '0.5rem', background: 'rgba(255, 61, 113, 0.1)', borderColor: 'var(--danger)', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                                <RotateCcw size={14} color="var(--danger)" /> Force RTO
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
        )}

        {/* PILLAR 2: B2B FREIGHT */}
        {activeTab === 'b2b' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             
             {/* B2B Header Banner */}
             <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, rgba(145, 124, 255, 0.15), transparent)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #917cff' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <Truck color="#917cff" size={24} /> B2B Freight Forwarding
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Send bulk LTL/FTL inventory to Amazon FBA, Quick Commerce Dark Stores, or Offline Distributors.</p>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
                
                {/* Freight Consignment Builder */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <h3 style={{ fontSize: '1.125rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Box size={18} color="var(--accent-blue)"/> Create New Consignment
                   </h3>
                   
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <div>
                       <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Destination Hub</label>
                       <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                          <option>Amazon FBA - BOM4 (Bhiwandi, MH)</option>
                          <option>Amazon FBA - DEL2 (Gurugram, HR)</option>
                          <option>Blinkit Master Hub - Mumbai South</option>
                          <option>Offline Distributor - Chennai</option>
                       </select>
                     </div>
                     <div>
                       <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Freight Carrier</label>
                       <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                          <option>Rivigo (LTL Express)</option>
                          <option>Safexpress (Surface)</option>
                          <option>Delhivery B2B</option>
                       </select>
                     </div>
                   </div>

                   <div>
                      <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Master Carton Packing List</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
                         
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                               <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%' }}></div>
                               <div>
                                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>SKU: PRO-WHEY-2KG-CHOC</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>10 Cartons (12 units/carton)</div>
                               </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                               <div style={{ fontWeight: 600 }}>120 Units</div>
                               <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>240 kg</div>
                            </div>
                         </div>

                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                               <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%' }}></div>
                               <div>
                                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>SKU: CREATINE-MONO-300G</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>5 Cartons (50 units/carton)</div>
                               </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                               <div style={{ fontWeight: 600 }}>250 Units</div>
                               <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>75 kg</div>
                            </div>
                         </div>

                         <button className="btn-secondary" style={{ marginTop: '0.5rem', width: '100%', borderStyle: 'dashed' }}>+ Add SKU to Consignment</button>
                      </div>
                   </div>

                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                      <div>
                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Gross Weight</div>
                         <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>315.00 kg</div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                         <button className="btn-secondary">Save Draft</button>
                         <button className="btn-primary" style={{ background: '#917cff', color: 'white', border: 'none' }}>Generate Gate Pass</button>
                      </div>
                   </div>
                </div>

                {/* E-Way Bill Generator Side Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   
                   <div className="glass-panel hover-glow" style={{ padding: '1.5rem', borderLeft: '4px solid #00E676' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <FileText size={18} color="#00E676"/> Gov. E-Way Bill Engine
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Required for inter-state goods transfer value exceeding ₹50,000.</p>
                      
                      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Invoice Value:</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>₹4,50,000</span>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>HSN Tax Check:</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--success)' }}>Validated</span>
                         </div>
                      </div>

                      <button className="btn-primary" style={{ width: '100%', background: '#00E676', color: 'black', border: 'none', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <Zap size={16} fill="black" /> Auto-Generate via NIC API
                      </button>
                   </div>

                   <div className="glass-panel" style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Recent B2B Dispatches</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <Truck size={16} color="var(--accent-blue)" style={{ marginTop: '0.2rem' }} />
                            <div>
                               <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Amazon BOM4 - 8 Pallets</div>
                               <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>In Transit (ETA: Tomorrow)</div>
                            </div>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: '0.2rem' }} />
                            <div>
                               <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Zepto Mumbai - 1/2 LTL</div>
                               <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Delivered Today</div>
                            </div>
                         </div>
                      </div>
                   </div>

                </div>

             </div>
          </div>
        )}

      </div>

      {/* AI Auto-IVR Action Modal */}
      {showIVRModal && selectedNDR && (
        <>
          <div onClick={() => setShowIVRModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '500px', zIndex: 201, padding: '0', overflow: 'hidden' }}>
            
            <div style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(0,210,255,0.1), transparent)', borderBottom: '1px solid rgba(0,210,255,0.2)' }}>
               <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <PhoneCall color="var(--accent-blue)" size={20}/> Dispatch AI Voice Agent
               </h2>
               <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Automatically call the customer for AWB {selectedNDR.id} to confirm delivery status.</p>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Courier Reason</div>
                  <div style={{ fontWeight: 600, color: 'var(--danger)' }}>{selectedNDR.status}</div>
               </div>

               <div>
                 <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Verification Script</label>
                 <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                    <option>Standard: "Did delivery boy contact you?"</option>
                    <option>Address Issue: "Please press 1 to provide alternate landmark."</option>
                    <option>Fake Update: "Press 1 to flag courier for false update."</option>
                 </select>
               </div>

               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: 'rgba(0,210,255,0.05)', borderRadius: 'var(--radius-md)' }}>
                  <Info size={18} color="var(--accent-blue)" style={{ marginTop: '0.1rem' }} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>The AI will place a call. If the customer inputs '1' (Re-attempt requested), Flux-Ehub will automatically fire an API request to {selectedNDR.courier} to re-schedule for tomorrow.</p>
               </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowIVRModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { alert('AI IVR call initiated to customer. Listening for feedback...'); setShowIVRModal(false); }}>Initiate AI Call (1 Coin)</button>
            </div>
            
          </div>
        </>
      )}

    </div>
  );
}
