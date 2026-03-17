import { 
  FileText, Download, Filter, IndianRupee, ShieldAlert, ArrowDownRight, 
  ArrowUpRight, Copy, CheckCircle2, TrendingDown, Eye, FileDigit
} from 'lucide-react';
import { useState } from 'react';

const mockInvoices = [
  { id: 'INV-2026-042', date: 'Oct 24, 2026', type: 'B2B', client: 'Amazon Seller Services', amount: '₹12,450.00', taxScale: 'IGST @ 18%', status: 'Filed' },
  { id: 'INV-2026-041', date: 'Oct 22, 2026', type: 'B2C', client: 'Shopify End User', amount: '₹8,920.00', taxScale: 'CGST+SGST @ 18%', status: 'Generated' },
  { id: 'INV-2026-040', date: 'Oct 15, 2026', type: 'B2B', client: 'Zepto Wholesale', amount: '₹45,000.00', taxScale: 'IGST @ 18%', status: 'Pending Review' },
  { id: 'INV-2026-039', date: 'Oct 14, 2026', type: 'B2C', client: 'Flipkart Intermediary', amount: '₹1,200.00', taxScale: 'IGST @ 18%', status: 'Generated' },
];

export default function Invoice() {
  const [activeTab, setActiveTab] = useState('gst');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, subtitle }) => (
    <div className="glass-panel hover-glow" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: `4px solid rgb(${color})` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>{title}</p>
        <div style={{ background: `rgba(${color}, 0.1)`, padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
          <Icon size={18} color={`rgb(${color})`} />
        </div>
      </div>
      <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.25rem 0' }}>{value}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
        <span style={{ 
          display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600,
          color: trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--danger)' : 'var(--text-secondary)'
        }}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : trend === 'down' ? <ArrowDownRight size={16} /> : null}
          {trendValue}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>{subtitle}</span>
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
             <FileText color="#00E676" /> GST Engine & Reconciliation
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track tax liability, detect hidden marketplace fees, and export for filing.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Export Tally XML
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#00E676', color: 'black', border: 'none' }}>
            <IndianRupee size={18} /> Generate Tax Invoice
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <TabButton id="gst" label="Invoicing & GST Readiness" icon={FileDigit} color="0, 230, 118" />
        <TabButton id="recon" label="Payout Reconciliation Engine" icon={TrendingDown} color="255, 61, 113" />
      </div>

      <div style={{ flex: 1 }}>
        
        {/* PILLAR 1: GST & INVOICING */}
        {activeTab === 'gst' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             
             {/* GST Dashboard */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <StatCard title="Total Taxable Value (Oct)" value="₹12.4L" icon={IndianRupee} color="0, 210, 255" trend="up" trendValue="+8%" subtitle="B2B + B2C Combined" />
                <StatCard title="GSTR-1 Liability Liability" value="₹2.23L" icon={FileDigit} color="0, 230, 118" trend="" trendValue="" subtitle="Due: Nov 11th" />
                <StatCard title="GSTR-3B ITC Available" value="₹45,200" icon={CheckCircle2} color="145, 124, 255" trend="" trendValue="" subtitle="From Amazon/Zepto bills" />
                <StatCard title="Un-Invoiced Orders" value="14" icon={ShieldAlert} color="255, 167, 38" trend="down" trendValue="Action Needed" subtitle="Pending B2B Generation" />
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                
                {/* Transaction Ledgers */}
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                   <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Master Invoice Ledger</h3>
                      <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <Filter size={16} /> Filter Month
                      </button>
                   </div>
                   
                   <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                         <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                               <th style={{ padding: '1rem', fontWeight: 600 }}>Invoice Series</th>
                               <th style={{ padding: '1rem', fontWeight: 600 }}>Supply Type</th>
                               <th style={{ padding: '1rem', fontWeight: 600 }}>Billed Entity</th>
                               <th style={{ padding: '1rem', fontWeight: 600 }}>Gross Value</th>
                               <th style={{ padding: '1rem', fontWeight: 600 }}>Tax Structure</th>
                               <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                               <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Document</th>
                            </tr>
                         </thead>
                         <tbody>
                            {mockInvoices.map((inv, i) => (
                               <tr key={i} style={{ borderBottom: i < mockInvoices.length - 1 ? '1px solid var(--border-color)' : 'none', transition: 'background 0.2s' }} className="hover-bg-light">
                                  <td style={{ padding: '1rem' }}>
                                     <div style={{ fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {inv.type === 'B2B' ? <FileDigit size={14} color="var(--accent-purple)"/> : <FileText size={14} color="var(--accent-blue)"/>}
                                        {inv.id}
                                     </div>
                                     <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{inv.date}</div>
                                  </td>
                                  <td style={{ padding: '1rem' }}>
                                     <span style={{ padding: '0.25rem 0.5rem', background: inv.type === 'B2B' ? 'rgba(145,124,255,0.1)' : 'rgba(0,210,255,0.1)', color: inv.type === 'B2B' ? 'var(--accent-purple)' : 'var(--accent-blue)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                                        {inv.type}
                                     </span>
                                  </td>
                                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{inv.client}</td>
                                  <td style={{ padding: '1rem', fontWeight: 600, color: 'white' }}>{inv.amount}</td>
                                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{inv.taxScale}</td>
                                  <td style={{ padding: '1rem' }}>
                                     <span style={{ 
                                        padding: '0.25rem 0.75rem', 
                                        background: inv.status === 'Filed' ? 'rgba(0, 230, 118, 0.1)' : inv.status === 'Generated' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 167, 38, 0.1)', 
                                        color: inv.status === 'Filed' ? 'var(--success)' : inv.status === 'Generated' ? 'white' : 'var(--warning)',
                                        borderRadius: 'var(--radius-pill)', 
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                     }}>
                                        {inv.status}
                                     </span>
                                  </td>
                                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                                     <button onClick={() => { setSelectedInvoice(inv); setShowInvoiceModal(true); }} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: 'auto' }}>
                                        <Eye size={14} /> View PDF
                                     </button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Compliance Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   
                   <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(0,230,118,0.1), transparent)' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <CheckCircle2 size={18} color="#00E676" /> Filing Readiness
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your ledger data matches government HSN requirements for the current month.</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                         <button className="btn-primary" style={{ background: 'white', color: 'black', width: '100%', fontSize: '0.875rem', fontWeight: 600, border: 'none' }}>Download ClearTax Excel</button>
                         <button className="btn-secondary" style={{ width: '100%', fontSize: '0.875rem' }}>Push to Tally.ERP9</button>
                      </div>
                   </div>

                   <div className="glass-panel" style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <ShieldAlert size={18} color="#FFA726" /> HSN Missing Error
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                         3 Products in your master catalog are missing an 8-digit HSN code. B2B invoices cannot be generated for these SKUs.
                      </p>
                      <button className="btn-secondary" style={{ width: '100%', fontSize: '0.875rem', borderColor: '#FFA726', color: '#FFA726' }}>Fix Missing HSN</button>
                   </div>
                </div>

             </div>
          </div>
        )}

        {/* PILLAR 2: RECONCILIATION ENGINE */}
        {activeTab === 'recon' && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             
             <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, rgba(255, 61, 113, 0.1), transparent)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #FF3D71' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <TrendingDown color="#FF3D71" size={24} /> Payout Reconciliation
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Automatic detection of missing Amazon/Flipkart payouts, over-charged shipping weight, and hidden marketplace fees.</p>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                   <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Pending Marketplaces Payout</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>₹4.2L</div>
                   <div style={{ fontSize: '0.875rem', color: 'var(--success)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14}/> Accrued safely</div>
                </div>
                
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderTop: '4px solid #FF3D71' }}>
                   <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Detected Hidden Deductions</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--danger)' }}>₹12,450</div>
                   <div style={{ fontSize: '0.875rem', color: 'var(--danger)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldAlert size={14}/> 45 Orders Overcharged</div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                   <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Dispute Recovery Rate</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-blue)' }}>82%</div>
                   <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>₹45k recovered this year</div>
                </div>
             </div>

             <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Detected Anomalies & Overcharges</h3>
                   <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FF3D71', color: 'white', border: 'none' }}>
                      Auto-File Seller Support Disputes
                   </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                     <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        <th style={{ padding: '1rem', fontWeight: 600 }}>Order ID</th>
                        <th style={{ padding: '1rem', fontWeight: 600 }}>Platform</th>
                        <th style={{ padding: '1rem', fontWeight: 600 }}>Reason Built</th>
                        <th style={{ padding: '1rem', fontWeight: 600 }}>Expected Fee</th>
                        <th style={{ padding: '1rem', fontWeight: 600 }}>Charged Fee</th>
                        <th style={{ padding: '1rem', fontWeight: 600 }}>Variance</th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* Sample Data */}
                     {[
                       { id: '171-893041-000', platform: 'Amazon India', reason: 'Weight Discrepancy (Claimed 5kg, Actual 0.5kg)', expected: '₹85.00', charged: '₹450.00', variance: '-₹365.00' },
                       { id: 'OD45192844123', platform: 'Flipkart', reason: 'Commission Overcharge (Beauty category)', expected: '₹120.00', charged: '₹280.00', variance: '-₹160.00' },
                       { id: '171-112040-001', platform: 'Amazon India', reason: 'FBA Storage Penalty (Error)', expected: '₹0.00', charged: '₹1,500.00', variance: '-₹1,500.00' },
                     ].map((item, i) => (
                       <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-light">
                          <td style={{ padding: '1rem', fontWeight: 600 }}>{item.id}</td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.platform}</td>
                          <td style={{ padding: '1rem', color: 'var(--warning)', fontWeight: 500 }}>{item.reason}</td>
                          <td style={{ padding: '1rem' }}>{item.expected}</td>
                          <td style={{ padding: '1rem', color: 'var(--danger)', fontWeight: 600 }}>{item.charged}</td>
                          <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--danger)' }}>{item.variance}</td>
                       </tr>
                     ))}
                  </tbody>
                </table>
             </div>

          </div>
        )}

      </div>

      {/* Embedded Invoice PDF Modal Viewer */}
      {showInvoiceModal && selectedInvoice && (
        <>
          <div onClick={() => setShowInvoiceModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', zIndex: 300 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '800px', height: '80vh', zIndex: 301, padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--accent-blue)', boxShadow: '0 0 50px rgba(0,210,255,0.1)' }}>
            
            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="var(--accent-blue)" /> {selectedInvoice.id}
               </h3>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}><Copy size={14}/> Copy Link</button>
                  <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', background: '#00E676', color: 'black', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Download size={14}/> Download PDF</button>
               </div>
            </div>

            <div style={{ flex: 1, padding: '2rem', background: 'white', color: 'black', overflowY: 'auto' }}>
               {/* Extremely stylized fake PDF layout */}
               <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee', paddingBottom: '2rem', marginBottom: '2rem' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#111' }}>TAX INVOICE</h2>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Original for Recipient</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#333' }}>Flux-Ehub Technologies Pvt. Ltd.</h1>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>GSTIN: 27AABC1234D1Z5</p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>Maharashtra, India</p>
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Billed To</h4>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '1.125rem' }}>{selectedInvoice.client}</p>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#666', fontSize: '0.875rem' }}>GSTIN: 27XYZ9876C2Z1</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 0.2rem 0' }}><span style={{ color: '#666' }}>Invoice No:</span> <strong style={{ marginLeft: '1rem' }}>{selectedInvoice.id}</strong></p>
                    <p style={{ margin: '0 0 0.2rem 0' }}><span style={{ color: '#666' }}>Date:</span> <strong style={{ marginLeft: '1rem' }}>{selectedInvoice.date}</strong></p>
                    <p style={{ margin: 0 }}><span style={{ color: '#666' }}>Place of Supply:</span> <strong style={{ marginLeft: '1rem' }}>Maharashtra (27)</strong></p>
                  </div>
               </div>

               <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '2rem' }}>
                 <thead>
                   <tr style={{ borderBottom: '2px solid #333' }}>
                     <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: '#666' }}>Description of Goods</th>
                     <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: '#666' }}>HSN / SAC</th>
                     <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: '#666', textAlign: 'right' }}>Qty</th>
                     <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: '#666', textAlign: 'right' }}>Rate</th>
                     <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: '#666', textAlign: 'right' }}>Amount</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr style={{ borderBottom: '1px solid #eee' }}>
                     <td style={{ padding: '1rem 0', fontWeight: 600 }}>{selectedInvoice.client === 'Zepto Wholesale' ? 'Whey Protein 2KG Pack' : 'E-Commerce Platform Fees'}</td>
                     <td style={{ padding: '1rem 0', color: '#666' }}>21069099</td>
                     <td style={{ padding: '1rem 0', textAlign: 'right' }}>1</td>
                     <td style={{ padding: '1rem 0', textAlign: 'right' }}>{selectedInvoice.amount}</td>
                     <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }}>{selectedInvoice.amount}</td>
                   </tr>
                 </tbody>
               </table>

               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <div style={{ width: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: '#666' }}>
                      <span>Taxable Amount</span>
                      <span>{selectedInvoice.amount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #ccc', color: '#666' }}>
                      <span>{selectedInvoice.taxScale}</span>
                      <span>₹0.00 (Mocked)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 800 }}>
                      <span>Total</span>
                      <span>{selectedInvoice.amount}</span>
                    </div>
                 </div>
               </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowInvoiceModal(false)}>Close Viewer</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
