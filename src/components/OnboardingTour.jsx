import { useState, useEffect } from 'react';
import { Sparkles, X, ChevronRight, BarChart3, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingTour() {
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const hasSeen = localStorage.getItem('flux-ehub_onboarding_seen');
        if (!hasSeen) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('flux-ehub_onboarding_seen', 'true');
    };

    const steps = [
        {
            title: "Welcome to Flux-Ehub",
            desc: "Your entire e-commerce empire, visualized and automated in one place. Let's take a quick look around.",
            icon: Sparkles,
            color: "var(--accent-purple)",
            action: () => setStep(1)
        },
        {
            title: "1. The Daily 5",
            desc: "Check your Home Dashboard every morning for your exact 5 daily tasks. No more guessing what to do next to grow your brand.",
            icon: Package,
            color: "var(--accent-blue)",
            action: () => { navigate('/'); setStep(2); }
        },
        {
            title: "2. The AI Marketing Engine",
            desc: "Go to the AI Growth tab to automatically generate social media posts, lifestyle images, and win-back emails.",
            icon: Sparkles,
            color: "var(--warning)",
            action: () => { navigate('/ai'); setStep(3); }
        },
        {
            title: "3. Omnichannel Analytics",
            desc: "Track GMV, SKU Velocity, and ROAS across Shopify, Amazon, and Quick Commerce from a single command center.",
            icon: BarChart3,
            color: "var(--success)",
            action: () => { navigate('/analytics'); handleClose(); }
        }
    ];

    if (!isVisible) return null;

    const currentStep = steps[step];
    const Icon = currentStep.icon;

    return (
        <>
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 9999 }} className="animate-fade-in"></div>
            <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '500px', zIndex: 10000, padding: 0, border: `1px solid ${currentStep.color}`, boxShadow: `0 10px 50px rgba(0,0,0,0.5)` }}>

                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {steps.map((_, idx) => (
                            <div key={idx} style={{ width: '30px', height: '4px', borderRadius: '2px', background: idx <= step ? currentStep.color : 'rgba(255,255,255,0.1)', transition: 'all 0.3s' }}></div>
                        ))}
                    </div>
                    <button onClick={handleClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                    <div style={{ background: `linear-gradient(135deg, ${currentStep.color}33, transparent)`, padding: '1.5rem', borderRadius: '50%', border: `1px solid ${currentStep.color}` }}>
                        <Icon size={48} color={currentStep.color} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>{currentStep.title}</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{currentStep.desc}</p>
                    </div>

                    <div style={{ width: '100%', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={handleClose} className="btn-secondary" style={{ flex: 1 }}>Skip</button>
                        <button onClick={currentStep.action} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: currentStep.color, color: step === 0 ? 'white' : 'black', border: 'none' }}>
                            <span style={{ color: step === 0 ? 'white' : 'black' }}>{step === steps.length - 1 ? 'Get Started' : 'Next'}</span> <ChevronRight size={18} color={step === 0 ? 'white' : 'black'} />
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}
