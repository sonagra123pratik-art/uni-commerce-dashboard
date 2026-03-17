import {
   Building, CreditCard, Zap, ShieldCheck, Mail, Globe,
   MapPin, Phone, Lock, Upload, Plus, Crown, FileText, CheckCircle2, Bell, Users,
   XCircle, Package, MessageSquare, AlertCircle, Key, Server, Laptop, Copy, Trash2, Palette
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const MOCK_USERS = [
   { id: 1, name: 'Alex Morgan', email: 'alex@techstore.in', role: 'Store Manager', status: 'Active' },
];

export default function Settings() {
   const [activeSegment, setActiveSegment] = useState('users');
   const [currentPlan, setCurrentPlan] = useState('Pro'); // Mock plan state
   const [users, setUsers] = useState(MOCK_USERS);
   const [isAnnual, setIsAnnual] = useState(false);
   const { theme, setTheme, availableThemes } = useTheme();

   // Invite User Modal State
   const [showInviteModal, setShowInviteModal] = useState(false);
   const [inviteEmail, setInviteEmail] = useState('');
   const [inviteRole, setInviteRole] = useState('Support Agent');
   const [limitError, setLimitError] = useState('');

   const handleInviteUser = () => {
      // Plan Enforcement Logic
      // Basic/Pro plans only allow 1 user per predefined role.
      if (currentPlan !== 'Enterprise') {
         const existingUsersInRole = users.filter(u => u.role === inviteRole).length;
         if (existingUsersInRole >= 1) {
            setLimitError(`Your current ${currentPlan} plan restricts you to 1 active user per role. Please upgrade to Enterprise for unlimited logins per role.`);
            return;
         }
      }

      if (inviteEmail) {
         const newUser = {
            id: Date.now(),
            name: 'New Invite', // Placeholder name until accepted
            email: inviteEmail,
            role: inviteRole,
            status: 'Pending'
         };
         setUsers([...users, newUser]);
         setShowInviteModal(false);
         setInviteEmail('');
         setLimitError('');
      }
   };

   const SegmentButton = ({ id, label, icon: Icon }) => (
      <button
         onClick={() => setActiveSegment(id)}
         style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '1rem', width: '100%', textAlign: 'left',
            background: activeSegment === id ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
            borderLeft: `4px solid ${activeSegment === id ? 'var(--accent-blue)' : 'transparent'}`,
            color: activeSegment === id ? 'white' : 'var(--text-secondary)',
            fontWeight: activeSegment === id ? 600 : 500,
            transition: 'all 0.2s', cursor: 'pointer'
         }}
      >
         <Icon size={18} color={activeSegment === id ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
         {label}
      </button>
   );

   return (
      <div className="animate-enter" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', paddingBottom: '2rem' }}>

         {/* Settings Navigation Sidebar */}
         <div className="glass-panel" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
               <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Workspace Settings</h2>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Manage your enterprise instance.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 0' }}>
               <SegmentButton id="brand" label="Global Brand Identity" icon={Building} />
               <SegmentButton id="appearance" label="Appearance & Themes" icon={Palette} />
               <SegmentButton id="users" label="Users & Staff Roles" icon={Users} />
               <SegmentButton id="tax" label="Tax & Legal Info" icon={FileText} />
               <SegmentButton id="billing" label="Plans & AI Coin Billing" icon={CreditCard} />
               <SegmentButton id="security" label="Security & API Keys" icon={Lock} />
               <SegmentButton id="notifications" label="Notification Alerts" icon={Bell} />
            </div>
         </div>

         {/* Main Settings Content */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* APPEARANCE & THEMES */}
            {activeSegment === 'appearance' && (
               <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                     <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Appearance & Themes</h2>
                     <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Customize your workspace with beautifully crafted color palettes.</p>
                  </div>

                  <div className="glass-panel" style={{ padding: '2rem' }}>
                     <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Select Theme</h3>

                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {availableThemes.map(t => (
                           <div
                              key={t.id}
                              onClick={() => setTheme(t.id)}
                              className="hover-glow"
                              style={{
                                 padding: '1.5rem',
                                 borderRadius: 'var(--radius-md)',
                                 border: `2px solid ${theme === t.id ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                                 background: 'rgba(0,0,0,0.2)',
                                 cursor: 'pointer',
                                 position: 'relative',
                                 overflow: 'hidden',
                                 transition: 'all 0.2s'
                              }}
                           >
                              {/* Abstract Theme Preview Background */}
                              <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '150px', height: '150px', background: `radial-gradient(circle, ${t.colors.accent1}40 0%, transparent 70%)`, filter: 'blur(30px)', zIndex: 0 }}></div>
                              <div style={{ position: 'absolute', bottom: '-20%', left: '-20%', width: '150px', height: '150px', background: `radial-gradient(circle, ${t.colors.accent2}40 0%, transparent 70%)`, filter: 'blur(30px)', zIndex: 0 }}></div>

                              <div style={{ position: 'relative', zIndex: 1 }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h4 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{t.name}</h4>
                                    {theme === t.id && <CheckCircle2 size={20} color="var(--accent-blue)" />}
                                 </div>
                                 <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '40px' }}>
                                    {t.description}
                                 </p>
                                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: t.colors.primary, border: '1px solid rgba(255,255,255,0.2)' }} title="Background Primary"></div>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: t.colors.accent1, border: '1px solid rgba(255,255,255,0.2)' }} title="Accent 1"></div>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: t.colors.accent2, border: '1px solid rgba(255,255,255,0.2)' }} title="Accent 2"></div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* BRAND IDENTITY */}
            {activeSegment === 'brand' && (
               <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Global Brand Identity</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>This information is used across all your marketplace listings, customer emails, and B2B invoices.</p>

                  <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                           <Upload size={24} />
                        </div>
                        <button className="btn-secondary" style={{ fontSize: '0.75rem' }}>Upload Brand Logo</button>
                     </div>

                     <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                               <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Public Brand Name</label>
                               <input type="text" defaultValue="Tech Store India" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                            </div>
                            <div>
                               <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Legal Entity Name</label>
                               <input type="text" defaultValue="Tech Solutions Pvt. Ltd." style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                            </div>
                         </div>

                         <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Corporate GST Number</label>
                            <input type="text" defaultValue="27AABC1234D1Z5" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', letterSpacing: '1px', fontWeight: 600 }} />
                         </div>

                        <div>
                           <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Registered Master Address (Used in E-Way Bills)</label>
                           <textarea defaultValue="Unit 402, Quantum Tower, Malad West, Mumbai, Maharashtra - 400064" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', minHeight: '80px', resize: 'vertical' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                           <div>
                              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Support Email</label>
                              <div style={{ position: 'relative' }}>
                                 <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                 <input type="email" defaultValue="support@techstore.in" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                              </div>
                           </div>
                           <div>
                              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Customer Care IVR</label>
                              <div style={{ position: 'relative' }}>
                                 <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                 <input type="text" defaultValue="1800-123-4567" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                              </div>
                           </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                           <button className="btn-primary">Save Brand Identity</button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* USERS & STAFF ROLES */}
            {activeSegment === 'users' && (
               <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                     <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Users & Staff Roles</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Manage team access based on predefined authority limitations.</p>
                     </div>
                     <button onClick={() => setShowInviteModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={16} /> Invite User
                     </button>
                  </div>

                  {/* Predefined Roles Guide */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                     <div style={{ background: 'rgba(0, 210, 255, 0.05)', border: '1px solid rgba(0, 210, 255, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                           <ShieldCheck size={16} color="var(--accent-blue)" />
                           <span style={{ fontWeight: 600, color: 'var(--accent-blue)', fontSize: '0.875rem' }}>Store Manager</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Full access to orders, products, and analytics. Cannot change billing.</p>
                     </div>
                     <div style={{ background: 'rgba(145, 124, 255, 0.05)', border: '1px solid rgba(145, 124, 255, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                           <Package size={16} color="var(--accent-purple)" />
                           <span style={{ fontWeight: 600, color: 'var(--accent-purple)', fontSize: '0.875rem' }}>Catalog Editor</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Can create and edit products and inventory. No access to financials.</p>
                     </div>
                     <div style={{ background: 'rgba(255, 167, 38, 0.05)', border: '1px solid rgba(255, 167, 38, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                           <MessageSquare size={16} color="var(--warning)" />
                           <span style={{ fontWeight: 600, color: 'var(--warning)', fontSize: '0.875rem' }}>Support Agent</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Read-only access to orders for handling customer queries.</p>
                     </div>
                  </div>

                  {/* User List Table */}
                  <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                     <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                           <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Staff Member</th>
                              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Assigned Role</th>
                              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {users.map(u => (
                              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-light transition-all">
                                 <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ fontWeight: 600, color: 'white' }}>{u.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{u.email}</div>
                                 </td>
                                 <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--accent-blue)', borderRadius: '4px', border: '1px solid rgba(0, 210, 255, 0.2)' }}>{u.role}</span>
                                 </td>
                                 <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: u.status === 'Active' ? 'var(--success)' : 'var(--warning)' }}>
                                       {u.status === 'Active' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {u.status}
                                    </div>
                                 </td>
                                 <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                    <button onClick={() => setUsers(users.filter(x => x.id !== u.id))} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.875rem' }}>Revoke Access</button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>

                  {/* Dev: Mock Plan Switcher */}
                  <div style={{ marginTop: '1rem', padding: '1rem', borderTop: '1px dashed var(--border-color)' }}>
                     <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Developer Plan Toggle (Controls User Invite Limits)</p>
                     <select value={currentPlan} onChange={(e) => setCurrentPlan(e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                        <option value="Pro">Pro Plan (1 user per role)</option>
                        <option value="Enterprise">Enterprise Plan (Unlimited users per role)</option>
                     </select>
                  </div>

                  {/* Invite Modal */}
                  {showInviteModal && (
                     <>
                        <div onClick={() => setShowInviteModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                        <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '500px', zIndex: 201, padding: 0, overflow: 'hidden' }}>
                           <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                 <Users color="var(--accent-blue)" size={24} />
                                 <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Invite Staff Member</h2>
                              </div>
                              <button onClick={() => setShowInviteModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><XCircle size={20} /></button>
                           </div>

                           <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                              <div>
                                 <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email Address</label>
                                 <input type="email" value={inviteEmail} onChange={(e) => { setInviteEmail(e.target.value); setLimitError(''); }} placeholder="colleague@company.com" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                              </div>
                              <div>
                                 <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Assign Predefined Role</label>
                                 <select value={inviteRole} onChange={(e) => { setInviteRole(e.target.value); setLimitError(''); }} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                                    <option value="Store Manager">Store Manager</option>
                                    <option value="Catalog Editor">Catalog Editor</option>
                                    <option value="Support Agent">Support Agent</option>
                                 </select>
                              </div>

                              {limitError && (
                                 <div style={{ padding: '1rem', background: 'rgba(255, 167, 38, 0.1)', border: '1px solid rgba(255, 167, 38, 0.3)', borderRadius: '4px', color: 'var(--warning)', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                    <Crown size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <span>{limitError}</span>
                                 </div>
                              )}
                           </div>
                           <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                              <button className="btn-secondary" onClick={() => setShowInviteModal(false)}>Cancel</button>
                              <button className="btn-primary" onClick={handleInviteUser} style={{ display: 'flex', alignItems: 'center', background: 'var(--accent-blue)', color: 'black', border: 'none', gap: '0.5rem' }}>
                                 Send Invite
                              </button>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            )}

            {/* TAX & LEGAL */}
            {activeSegment === 'tax' && (
               <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Tax & Legal Information</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Master tax IDs required for generating GST invoices and passing compliance checks.</p>

                  <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                           <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Primary GSTIN</label>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <input type="text" defaultValue="27AABC1234D1Z5" style={{ flex: 1, padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontWeight: 600, letterSpacing: '1px' }} />
                              <span style={{ padding: '0.75rem', background: 'rgba(0, 230, 118, 0.1)', color: 'var(--success)', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={16} /> Verified</span>
                           </div>
                        </div>
                        <div>
                           <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Corporate PAN</label>
                           <input type="text" defaultValue="AABC1234D" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontWeight: 600, letterSpacing: '1px' }} />
                        </div>
                     </div>

                     <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Additional State GSTINs (For FBA & Fullfillment)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                              <div>
                                 <div style={{ fontWeight: 600 }}>Haryana (06) - Amazon DEL2</div>
                                 <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>06AABC1234D1Z5</div>
                              </div>
                              <button className="btn-secondary" style={{ fontSize: '0.75rem' }}>Remove</button>
                           </div>
                           <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', borderStyle: 'dashed' }}>
                              <Plus size={16} /> Add State GSTIN
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* BILLING & COINS */}
            {activeSegment === 'billing' && (
               <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Plans & AI Coin Billing</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Start your <strong>30-Day Free Trial</strong> today. No credit card required.</p>
                     </div>
                     {/* Billing Toggle */}
                     <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', padding: '0.25rem' }}>
                        <button
                           onClick={() => setIsAnnual(false)}
                           style={{ padding: '0.5rem 1rem', borderRadius: '30px', border: 'none', background: !isAnnual ? 'var(--accent-blue)' : 'transparent', color: !isAnnual ? 'black' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                           Monthly
                        </button>
                        <button
                           onClick={() => setIsAnnual(true)}
                           style={{ padding: '0.5rem 1rem', borderRadius: '30px', border: 'none', background: isAnnual ? 'var(--accent-blue)' : 'transparent', color: isAnnual ? 'black' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                           Annually <span style={{ background: isAnnual ? 'black' : 'var(--success)', color: isAnnual ? 'var(--accent-blue)' : 'black', padding: '0.1rem 0.4rem', borderRadius: '10px', fontSize: '0.6rem', fontWeight: 800 }}>1 MO FREE</span>
                        </button>
                     </div>
                  </div>

                  {/* Formatting helper */}
                  {(() => {
                     const plans = [
                        {
                           name: 'Starter', price: 999,
                           icon: Package, color: 'var(--text-primary)',
                           features: ['1 Store Manager Role', 'Up to 100 Orders/mo', 'Basic Analytics Dashboard', 'Standard Email Support']
                        },
                        {
                           name: 'Growth', price: 2499,
                           icon: Zap, color: 'var(--accent-blue)', isPopular: true,
                           features: ['Up to 3 Staff Roles', '1,000 Orders/mo', 'Advanced B2B Invoicing', 'Priority Chat Support']
                        },
                        {
                           name: 'Enterprise Pro', price: 9999,
                           icon: Crown, color: 'var(--accent-purple)',
                           features: ['Unlimited Staff Roles', 'All Platform Features', 'Dedicated Server Instance', 'Priority 24/7 Support']
                        }
                     ];

                     return (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                           {plans.map(plan => {
                              const Icon = plan.icon;
                              const monthlyPrice = plan.price;
                              const annualPrice = plan.price * 11;
                              const displayPrice = isAnnual ? Math.round(annualPrice / 12) : monthlyPrice;

                              return (
                                 <div key={plan.name} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden', border: plan.isPopular ? `1px solid ${plan.color}` : '1px solid var(--border-color)', boxShadow: plan.isPopular ? `0 0 20px rgba(0, 210, 255, 0.1)` : 'none' }}>
                                    {plan.isPopular && <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.25rem 1rem', background: plan.color, color: 'black', fontSize: '0.75rem', fontWeight: 700, borderBottomLeftRadius: 'var(--radius-md)' }}>MOST POPULAR</div>}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                       <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `color-mix(in srgb, ${plan.color} 10%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <Icon size={20} color={plan.color} />
                                       </div>
                                       <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{plan.name}</h3>
                                    </div>

                                    <div>
                                       <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                          <span style={{ fontSize: '2rem', fontWeight: 800 }}>₹{displayPrice.toLocaleString('en-IN')}</span>
                                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>/ mo</span>
                                       </div>
                                       <p style={{ color: 'var(--success)', fontSize: '0.75rem', height: '1rem', marginBottom: '0.25rem' }}>
                                          {isAnnual ? `Billed ₹${annualPrice.toLocaleString('en-IN')} yearly (after 30 days)` : 'Billed monthly (after 30 days)'}
                                       </p>
                                       <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                                          + ₹1 per successful order
                                       </div>
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', flex: 1 }}>
                                       {plan.features.map(f => (
                                          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                             <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} /> {f}
                                          </li>
                                       ))}
                                    </ul>

                                    <button className={plan.isPopular ? "btn-primary" : "btn-secondary"} style={{ marginTop: '1rem', width: '100%', background: plan.isPopular ? plan.color : undefined, color: plan.isPopular ? 'black' : undefined, border: plan.isPopular ? 'none' : undefined }}>
                                       {currentPlan === plan.name ? 'Current Plan' : 'Start 30-Day Free Trial'}
                                    </button>
                                 </div>
                              )
                           })}
                        </div>
                     );
                  })()}

                  {/* AI Coins */}
                  <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(145, 124, 255, 0.3)', background: 'linear-gradient(to right, rgba(145, 124, 255, 0.05), transparent)' }}>
                     <div>
                        <h3 style={{ fontSize: '1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}><Zap size={20} color="var(--accent-purple)" /> AI Growth Coins</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem', maxWidth: '400px' }}>Current Balance: <strong>450 Coins</strong>. Used for generative AI, auto-IVR calls, and advanced sentiment analysis. Will automatically recharge when low.</p>
                     </div>
                     <button className="btn-primary" style={{ background: 'var(--accent-purple)', color: 'white', border: 'none' }}>Top Up Coins</button>
                  </div>
               </div>
            )}

            {/* SECURITY & API KEYS */}
            {activeSegment === 'security' && (
               <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                     <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Security & API Keys</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Manage developer integrations, webhooks, and device sessions.</p>
                     </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                     {/* API Keys */}
                     <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                           <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Key size={18} color="var(--warning)" /> Active API Keys</h3>
                           <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}><Plus size={14} /> Generate New Key</button>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                              <div>
                                 <div style={{ fontWeight: 600 }}>Zapier Master Integration</div>
                                 <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Created: Oct 12, 2025 • Last Used: 2 mins ago</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                    <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>pk_live_*******************8f9a</span>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Copy size={14} /></button>
                                 </div>
                                 <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                              </div>
                           </div>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                              <div>
                                 <div style={{ fontWeight: 600 }}>Custom ERP Sync (Read Only)</div>
                                 <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Created: Nov 01, 2025 • Last Used: 1 hour ago</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                    <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>pk_live_*******************2b4c</span>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Copy size={14} /></button>
                                 </div>
                                 <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Webhooks */}
                     <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                           <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Server size={18} color="var(--accent-blue)" /> Webhook Endpoints</h3>
                           <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}><Plus size={14} /> Add Endpoint</button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                           <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                 https://api.mycustomerp.com/webhooks/orders
                                 <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', background: 'rgba(0, 230, 118, 0.1)', color: 'var(--success)', borderRadius: '4px', border: '1px solid rgba(0, 230, 118, 0.2)' }}>Active</span>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Listening to: <span style={{ color: 'white' }}>order.created, order.fulfilled</span></div>
                           </div>
                           <button className="btn-secondary" style={{ fontSize: '0.75rem' }}>Edit</button>
                        </div>
                     </div>

                     {/* Sessions */}
                     <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                           <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Laptop size={18} color="var(--accent-purple)" /> Active Sessions</h3>
                           <button className="btn-secondary" style={{ color: 'var(--danger)', borderColor: 'rgba(255, 61, 113, 0.3)' }}>Revoke All Other Sessions</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(123,97,255,0.05)', border: '1px solid rgba(123,97,255,0.2)', borderRadius: 'var(--radius-md)' }}>
                              <Laptop size={20} color="var(--accent-purple)" />
                              <div style={{ flex: 1 }}>
                                 <div style={{ fontWeight: 600 }}>MacBook Pro - Chrome (Current Session)</div>
                                 <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mumbai, IN • IP: 103.45.xx.xx</div>
                              </div>
                           </div>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                              <Phone size={20} color="var(--text-secondary)" />
                              <div style={{ flex: 1 }}>
                                 <div style={{ fontWeight: 600 }}>iPhone 14 Pro - Safari</div>
                                 <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Delhi, IN • IP: 49.36.xx.xx • Last active: 2 hours ago</div>
                              </div>
                              <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.875rem' }}>Revoke</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* NOTIFICATIONS */}
            {activeSegment === 'notifications' && (
               <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Notification & Alerts</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Configure how you want to be notified about important events across the Omnichannel network.</p>

                  <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                     <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} color="var(--accent-blue)" /> Email Digest Alerts</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
                              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', marginTop: '0.2rem', accentColor: 'var(--accent-blue)' }} />
                              <div>
                                 <div style={{ fontWeight: 600 }}>Daily GMV & Orders Digest</div>
                                 <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive a summary of yesterday's sales every morning at 8:00 AM.</div>
                              </div>
                           </label>
                           <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
                              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', marginTop: '0.2rem', accentColor: 'var(--accent-blue)' }} />
                              <div>
                                 <div style={{ fontWeight: 600 }}>Urgent Low Inventory Warnings</div>
                                 <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Instant email if any top 10 SKU drops below 15 days of stock cover.</div>
                              </div>
                           </label>
                        </div>
                     </div>

                     <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bell size={18} color="var(--warning)" /> Platform & Push Notifications</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
                              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', marginTop: '0.2rem', accentColor: 'var(--warning)' }} />
                              <div>
                                 <div style={{ fontWeight: 600 }}>NDR Escalations (Delivery Failures)</div>
                                 <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Show a push notification so the AI Voice agent can respond instantly.</div>
                              </div>
                           </label>
                           <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
                              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', marginTop: '0.2rem', accentColor: 'var(--warning)' }} />
                              <div>
                                 <div style={{ fontWeight: 600 }}>Reconciliation Disputes & Findings</div>
                                 <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Alert when hidden Marketplace overcharges are detected.</div>
                              </div>
                           </label>
                        </div>
                     </div>

                  </div>
               </div>
            )}

         </div>

      </div>
   );
}
