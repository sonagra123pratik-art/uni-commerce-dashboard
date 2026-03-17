import {
  Users, Shield, MoreVertical, Search, Plus, UserPlus, FileEdit, Database, Box, ShieldCheck, Mail, ShieldAlert
} from 'lucide-react';
import { useState } from 'react';

const mockTeam = [
  { id: 'usr-1', name: 'Alok Nath', email: 'alok@techstore.in', role: 'Super Admin', access: 'Global / All Tenants', status: 'Active', mfa: true },
  { id: 'usr-2', name: 'Neha Sharma', email: 'fin@techstore.in', role: 'Finance Manager', access: 'Global Invoices', status: 'Active', mfa: true },
  { id: 'usr-3', name: 'System Cron', email: 'bot@flux-ehub.com', role: 'Automation API', access: 'Restricted (System Nodes)', status: 'Active', mfa: false },
  { id: 'usr-4', name: 'Amit Singh', email: 'marketing@techstore.in', role: 'Support Agent', access: 'Read-Only (Tenants)', status: 'Invited', mfa: false },
];

export default function AdminUserManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users color="var(--info)" /> Global User & Access Management
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage internal staff access and platform-wide permissions.</p>
        </div>
        <button onClick={() => setShowInviteModal(true)} className="btn-primary hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--info)', color: 'black', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
          <UserPlus size={18} /> Provision Staff Account
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', borderTop: '3px solid var(--info)' }}>
          <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)' }}><Users size={24} color="var(--info)" /></div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Active Internal Staff</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>12 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ 50 limit</span></div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', borderTop: '3px solid var(--success)' }}>
          <div style={{ padding: '1rem', background: 'rgba(0, 230, 118, 0.1)', borderRadius: 'var(--radius-md)' }}><ShieldCheck size={24} color="var(--success)" /></div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>MFA Compliance Rate</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>92%</div>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Provisioned Staff Registry</h3>
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search by name, email, or role..." style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Staff Profile</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Assigned Role</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Platform Clearance</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Security</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTeam.map((u, i) => (
                <tr key={u.id} style={{ borderBottom: i < mockTeam.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light transition-all">
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ fontWeight: 600, color: 'white' }}>{u.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: u.role === 'Super Admin' ? 'rgba(255, 167, 38, 0.1)' : 'rgba(255,255,255,0.05)',
                      color: u.role === 'Super Admin' ? 'var(--warning)' : 'white',
                      border: `1px solid ${u.role === 'Super Admin' ? 'rgba(255,167,38,0.2)' : 'var(--border-color)'}`,
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {u.access}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    {u.mfa ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--success)' }}><Shield size={14} /> MFA Enforced</span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--danger)' }}><ShieldAlert size={14} /> Action Required</span>
                    )}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', background: u.status === 'Active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '2rem', width: 'fit-content' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: u.status === 'Active' ? 'var(--success)' : 'var(--text-secondary)' }}></span>
                      <span style={{ color: u.status === 'Active' ? 'var(--success)' : 'var(--text-secondary)', fontWeight: 500 }}>{u.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <button className="btn-secondary" style={{ padding: '0.4rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provisioning Modal */}
      {showInviteModal && (
        <>
          <div onClick={() => setShowInviteModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '500px', zIndex: 201, padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <UserPlus color="var(--info)" size={24} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Provision Staff Account</h2>
              </div>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Staff Work Email</label>
                <input type="email" placeholder="name@flux-ehub.com" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Global Access Level</label>
                <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                  <option value="support">Support Agent (Read-Only Tenants)</option>
                  <option value="finance">Finance Manager (Global Invoices/Billing)</option>
                  <option value="super">Super Admin (Full Root Access)</option>
                </select>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Mail size={16} color="var(--info)" style={{ marginTop: '0.1rem' }} />
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  An invitation link will be sent. <br />
                  <span style={{ color: 'white' }}>Mandatory MFA setup</span> will be required upon first login.
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowInviteModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowInviteModal(false)} style={{ background: 'var(--info)', color: 'black', border: 'none', padding: '0.75rem 1.5rem' }}>Send Invitation</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
