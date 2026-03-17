import { Building, ShieldCheck, CreditCard, MapPin, UploadCloud } from 'lucide-react';

export default function BrandSetup() {
  const SetupSection = ({ title, description, icon: Icon, isComplete }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div style={{ background: isComplete ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
        <Icon size={24} color={isComplete ? 'var(--success)' : 'var(--text-secondary)'} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', background: isComplete ? 'rgba(0,230,118,0.2)' : 'rgba(255,170,0,0.2)', color: isComplete ? 'var(--success)' : 'var(--warning)', fontWeight: 600 }}>
            {isComplete ? 'Verified' : 'Pending'}
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>{description}</p>
        {!isComplete && (
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Complete Setup</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Brand Profile & Setup</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Complete your business KYC and tax details to unlock full platform features.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <SetupSection 
          title="Basic Brand Details" 
          description="Your company name, logo, support email, and primary contact number."
          icon={Building}
          isComplete={true}
        />
        <SetupSection 
          title="KYC & Documents" 
          description="Upload PAN Card, Address Proof, and Owner ID for account verification."
          icon={ShieldCheck}
          isComplete={false}
        />
        <SetupSection 
          title="Bank Details" 
          description="Add a verified current account for marketplace payouts and automatic reconciliations."
          icon={CreditCard}
          isComplete={false}
        />
        <SetupSection 
          title="Warehouse & Pickup Addresses" 
          description="Add your primary dispatch locations for courier pickups."
          icon={MapPin}
          isComplete={true}
        />
        <SetupSection 
          title="GST Configuration" 
          description="Register your GSTIN and standard HSN codes for automatic invoice generation."
          icon={UploadCloud}
          isComplete={false}
        />
      </div>
    </div>
  );
}
