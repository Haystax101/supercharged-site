import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Support({ onOpenWaitlist, onOpenAbout, onOpenManifesto }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="active" style={{ overflowX: 'hidden', minHeight: '100vh', position: 'relative', visibility: 'visible', opacity: 1, pointerEvents: 'auto', height: 'auto', backgroundColor: '#f6f3eb' }}>
            <div className="noise-overlay"></div>

            <nav className="anim-nav" style={{ zIndex: 10000 }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '0px', lineHeight: 1, textDecoration: 'none' }}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ display: 'block', marginTop: '-1px' }}>
                        <path d="M7 0L0 9h5l-1.5 7L12 7H7L7 0z" fill="#f5c842" />
                    </svg>
                    <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: '15px', color: '#0f0e0d', letterSpacing: '-0.01em', lineHeight: 1 }}>upercharged</span>
                </a>
                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenAbout(); }}>About</a>
                    <a href="/#features" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/#features'); }}>Features</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenManifesto(); }}>Manifesto</a>
                </div>
                <div className="nav-right">
                    <button className="nav-cta waitlist-trigger" onClick={(e) => { e.preventDefault(); onOpenWaitlist(); }}>Join Waitlist</button>
                    <button
                        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mobile-dropdown"
                    >
                        <div className="dropdown-links">
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onOpenAbout(); }}>About</a>
                            <a href="/#features" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); navigate('/#features'); }}>Features</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onOpenManifesto(); }}>Manifesto</a>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-cta-bar">
                            <button
                                className="dropdown-waitlist-btn waitlist-trigger"
                                onClick={() => { setIsMenuOpen(false); onOpenWaitlist(); }}
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mo-manifesto-content" style={{ maxWidth: '680px', margin: '0 auto', padding: '140px 48px 80px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--label-color)', textTransform: 'uppercase', marginBottom: '24px' }}>
                    Help Center
                </p>
                <h1 className="mo-page-title" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '44px', color: 'var(--text)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '48px' }}>
                    Need support?
                </h1>

                <div style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.85, color: '#3a3734' }}>
                    <p style={{ marginBottom: '24px' }}>We're here to help! Whether you have a question about your account, need assistance with the app, or just want to report a bug, our team is ready to assist you.</p>

                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', color: 'var(--text)', letterSpacing: '-0.02em' }}>Contact Us</h2>
                    <p style={{ marginBottom: '24px' }}>Reach out to us via email and we'll get back to you as soon as possible.</p>

                    <a href="mailto:hello@learningsupercharged.com" className="btn-dark" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', fontSize: '15px', textDecoration: 'none' }}>Email Support</a>
                </div>
            </div>

            <div className="mo-divider-full"></div>

            <div className="overlay-black-cta" style={{ background: '#000000', padding: '100px 48px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="final-btn-secondary" onClick={() => navigate('/')} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Return to Home</button>
                    <button className="final-btn-primary waitlist-trigger" onClick={onOpenWaitlist}>Join the Waitlist</button>
                </div>
            </div>
        </div>
    );
}
