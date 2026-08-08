import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrivacyPolicy({ onOpenWaitlist, onOpenAbout, onOpenManifesto }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div id="privacy-page" className="active" style={{ overflowX: 'hidden', minHeight: '100vh', position: 'relative', visibility: 'visible', opacity: 1, pointerEvents: 'auto', height: 'auto', backgroundColor: '#f6f3eb' }}>
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
                    Legal
                </p>
                <h1 className="mo-page-title" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '44px', color: 'var(--text)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '48px' }}>
                    Supercharged Privacy Policy
                </h1>

                <div style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.85, color: '#3a3734' }}>
                    <p style={{ marginBottom: '24px' }}><strong>Effective:</strong> September 18, 2025<br />
                        <strong>Last Updated:</strong> September 18, 2025</p>

                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', color: 'var(--text)', letterSpacing: '-0.02em' }}>Your Privacy Matters</h2>
                    <p style={{ marginBottom: '24px' }}>Supercharged's mission is to transform how professionals learn and connect by making industry knowledge accessible and actionable. Central to this mission is our commitment to be transparent about the data we collect about you, how it is used, and with whom it is shared.</p>
                    <p style={{ marginBottom: '24px' }}>This Privacy Policy applies when you use our Services (described below). We offer our users choices about the data we collect, use, and share as described in this Privacy Policy, Settings, and our Help Center.</p>

                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', color: 'var(--text)', letterSpacing: '-0.02em' }}>Introduction</h2>
                    <p style={{ marginBottom: '24px' }}>We are a social learning network and platform for professionals. People use our Services to discover industry insights, share knowledge, connect with like-minded professionals, and advance their careers. Our Privacy Policy applies to any Member or Visitor to our Services.</p>
                    <p style={{ marginBottom: '24px' }}>Our registered users ("Members") share their professional identities, publish insights, engage with their network, exchange knowledge, track their learning progress, and find collaboration opportunities. Content and data on our Services is viewable to other Members and, depending on settings, to non-Members ("Visitors").</p>

                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', color: 'var(--text)', letterSpacing: '-0.02em' }}>Services</h2>
                    <p style={{ marginBottom: '24px' }}>This Privacy Policy applies to Supercharged mobile applications, websites, communications, and other related services offered by BCGH Limited ("Services"), including off-site Services such as our plugins and widgets, but excluding services that state they are offered under a different privacy policy.</p>

                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', color: 'var(--text)', letterSpacing: '-0.02em' }}>Data Controller and Contracting Party</h2>
                    <p style={{ marginBottom: '24px' }}>BCGH Limited will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services.</p>
                    <p style={{ marginBottom: '24px' }}>As a Visitor or Member of our Services, the collection, use, and sharing of your personal data is subject to this Privacy Policy and other documents referenced in this Privacy Policy, as well as updates.</p>

                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', color: 'var(--text)', letterSpacing: '-0.02em' }}>1. Data We Collect</h2>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '24px', marginBottom: '12px', color: 'var(--text)' }}>1.1 Data You Provide To Us</h3>

                    <p style={{ marginBottom: '12px' }}><strong>Registration</strong></p>
                    <p style={{ marginBottom: '24px' }}>To create an account you need to provide data including your name, email address, and a password. If you register for premium Services, you will need to provide payment and billing information.</p>

                    <p style={{ marginBottom: '12px' }}><strong>Profile</strong></p>
                    <p style={{ marginBottom: '24px' }}>You have choices about the information on your profile, such as your current position, education, work experience, skills, projects, published insights, professional interests, industry focus, and career goals. You also provide links to your projects, portfolios, social media profiles, and other professional work. It's your choice whether to include sensitive information on your profile and to make that information public. Please do not post or add personal data to your profile that you would not want to be publicly available.</p>

                    <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '48px 0' }} />
                    <p style={{ marginBottom: '24px', fontStyle: 'italic' }}>This is a condensed version of our privacy policy. For the complete policy with all sections, please contact us for the full documentation at <a href="mailto:hello@learningsupercharged.com" style={{ color: '#0f0e0d', textDecoration: 'underline' }}>hello@learningsupercharged.com</a>.</p>
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
