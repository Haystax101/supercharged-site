import { useState, useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManifestoOverlay({ isOpen, onClose, onOpenAbout, onOpenWaitlist }) {
    const posthog = usePostHog();

    useEffect(() => {
        posthog?.capture('manifesto_opened');
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div id="manifesto-overlay" className="active" style={{ overflowX: 'hidden', minHeight: '100vh', position: 'relative', visibility: 'visible', opacity: 1, pointerEvents: 'auto', height: 'auto', overscrollBehavior: 'auto' }}>
            <div className="noise-overlay"></div>

            <nav className="anim-nav" style={{ zIndex: 10000 }}>
                <a href="#" onClick={(e) => { e.preventDefault(); onClose(); setIsMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0px', lineHeight: 1, textDecoration: 'none' }}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ display: 'block', marginTop: '-1px' }}>
                        <path d="M7 0L0 9h5l-1.5 7L12 7H7L7 0z" fill="#f5c842" />
                    </svg>
                    <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: '15px', color: '#0f0e0d', letterSpacing: '-0.01em', lineHeight: 1 }}>upercharged</span>
                </a>
                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenAbout(); }}>About</a>
                    <a href="#features" className="nav-link" onClick={() => onClose()}>Features</a>
                    <span className="nav-link" style={{ color: '#0f0e0d', fontWeight: 500 }}>Manifesto</span>
                </div>
                <div className="nav-right">
                    <button className="nav-cta waitlist-trigger" onClick={(e) => { e.preventDefault(); posthog?.capture('waitlist_cta_clicked', { source: 'manifesto_nav' }); onOpenWaitlist(); }}>Join Waitlist</button>
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
                            <a href="#features" onClick={() => { setIsMenuOpen(false); onClose(); }}>Features</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }} style={{ fontWeight: 600, color: '#0f0e0d' }}>Manifesto</a>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-cta-bar">
                            <button
                                className="dropdown-waitlist-btn waitlist-trigger"
                                onClick={() => { setIsMenuOpen(false); posthog?.capture('waitlist_cta_clicked', { source: 'manifesto_mobile_nav' }); onOpenWaitlist(); }}
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mo-manifesto-content" style={{ maxWidth: '680px', margin: '0 auto', padding: '140px 48px 80px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--label-color)', textTransform: 'uppercase', marginBottom: '24px' }}>
                    Our Manifesto
                </p>
                <h1 className="mo-page-title" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '44px', color: 'var(--text)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '48px' }}>
                    The Supercharged Manifesto
                </h1>

                <div style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.85, color: '#3a3734' }}>
                    <p style={{ marginBottom: '24px' }}><strong style={{ color: 'var(--text)' }}>Social hasn't changed in 22 years.</strong></p>
                    <p style={{ marginBottom: '24px' }}>Since Facebook launched in 2004, the formula has stayed the same. A feed to scroll. Messages to send. Ads to ignore. And now, a black hole of short-form video engineered to keep you there as long as possible.</p>
                    <p style={{ marginBottom: '24px' }}>The time you put in versus the value you get out? Frankly, terrible.</p>
                    <p style={{ marginBottom: '24px' }}><strong style={{ color: 'var(--text)' }}>We think being social should mean something more.</strong></p>
                    <p style={{ marginBottom: '24px' }}>In real life, you connect with intent. You find people who think like you, challenge you, build with you. You seek out the right co-founder, the right investor, the right collaborator. You know exactly who you need. You just spend an enormous amount of time looking for them.</p>
                    <p style={{ marginBottom: '24px' }}>That time is wasted. It doesn't have to be.</p>
                    <p style={{ marginBottom: '24px' }}><strong style={{ color: 'var(--text)' }}>Our vision is simple: a world where no opportunity is missed because two people never met. Where every meaningful connection happens at exactly the right moment.</strong></p>
                    <p style={{ marginBottom: '24px' }}>Supercharged reduces the time it takes to find your people by 1000x. Whether you're looking for a business partner, a mentor, a collaborator, or simply someone worth knowing, we find them, screen them, and surface only the ones worth your time. Every connection is one that matters.</p>
                    <p style={{ marginBottom: '24px' }}>Your network will be quicker to build, stronger in quality, and broader than anything you've had before.</p>
                    <p style={{ marginBottom: '24px' }}><strong style={{ color: 'var(--text)' }}>22 years later, another social revolution is coming.</strong></p>
                    <p style={{ marginBottom: '24px' }}>This one isn't about scrolling more. It's about connecting better. And you're among the very first people to see it.</p>
                    <p style={{ marginBottom: '24px' }}>Thank you for leading the charge.</p>
                    <p style={{ marginTop: '56px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '24px', color: 'var(--text)', letterSpacing: '-0.02em', fontStyle: 'italic' }}>— The Supercharged Team</p>
                </div>
            </div>

            <div className="mo-divider-full"></div>

            <div className="overlay-black-cta" style={{ background: '#000000', padding: '100px 48px', textAlign: 'center' }}>
                <h2 className="overlay-cta-headline" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '42px', color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                    <em>Join the revolution.</em>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.44)', maxWidth: '440px', margin: '16px auto 36px' }}>
                    Be among the first to experience a new way of connecting.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
                    <button className="final-btn-primary waitlist-trigger" onClick={() => { posthog?.capture('waitlist_cta_clicked', { source: 'manifesto_footer' }); onOpenWaitlist(); }}>Join the Waitlist</button>
                </div>
            </div>
        </div>
    );
}
