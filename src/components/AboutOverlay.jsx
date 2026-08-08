import { useState, useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { motion, AnimatePresence } from 'framer-motion';
import alexImage from '../assets/alex.JPG';
import bowenImage from '../assets/bowen.png';
import georgeImage from '../assets/george.png';
import groupImage from '../assets/group.jpg';

export default function AboutOverlay({ isOpen, onClose, onOpenManifesto, onOpenWaitlist }) {
    const posthog = usePostHog();

    useEffect(() => {
        posthog?.capture('about_opened');
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div id="about-overlay" className="active" style={{ overflowX: 'hidden', minHeight: '100vh', position: 'relative', visibility: 'visible', opacity: 1, pointerEvents: 'auto', height: 'auto', overscrollBehavior: 'auto' }}>
            <div className="noise-overlay"></div>
            <nav className="ab-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); onClose(); setIsMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0px', lineHeight: 1, textDecoration: 'none' }}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ display: 'block', marginTop: '-1px' }}>
                        <path d="M7 0L0 9h5l-1.5 7L12 7H7L7 0z" fill="#f5c842" />
                    </svg>
                    <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: '15px', color: '#0f0e0d', letterSpacing: '-0.01em', lineHeight: 1 }}>upercharged</span>
                </a>
                <div className="nav-center">
                    <span className="nav-link" style={{ color: '#0f0e0d', fontWeight: 500 }}>About</span>
                    <a href="#features" className="nav-link" onClick={() => onClose()}>Features</a>
                    <a href="#manifesto" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenManifesto(); }}>Manifesto</a>
                </div>
                <div className="nav-right">
                    <button className="nav-cta waitlist-trigger" onClick={(e) => { e.preventDefault(); posthog?.capture('waitlist_cta_clicked', { source: 'about_nav' }); onOpenWaitlist(); }}>Join Waitlist</button>
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
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }} style={{ fontWeight: 600, color: '#0f0e0d' }}>About</a>
                            <a href="#features" onClick={() => { setIsMenuOpen(false); onClose(); }}>Features</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onOpenManifesto(); }}>Manifesto</a>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-cta-bar">
                            <button
                                className="dropdown-waitlist-btn waitlist-trigger"
                                onClick={() => { setIsMenuOpen(false); posthog?.capture('waitlist_cta_clicked', { source: 'about_mobile_nav' }); onOpenWaitlist(); }}
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="ab-hero">
                <h1>The people building Supercharged</h1>
                <div className="ab-hero-btns">
                    <button className="btn-outline" onClick={onOpenManifesto} style={{ fontSize: '13px', padding: '9px 18px' }}>Read our manifesto</button>
                    <button className="btn-dark waitlist-trigger" onClick={() => { posthog?.capture('waitlist_cta_clicked', { source: 'about_hero' }); onOpenWaitlist(); }} style={{ fontSize: '13px', padding: '9px 18px' }}>Join the Waitlist &rsaquo;</button>
                </div>
            </div>

            <div className="ab-founders">
                <div className="ab-founder-text">
                    <h2>Meet the co-founders, Bowen and George.</h2>
                    <p>Two builders on a mission to revolutionise how people connect. They're building the platform that makes finding the right people effortless.</p>
                </div>
                <div className="ab-founder-photo" style={{ padding: 0 }}><img src={groupImage} alt="Founders" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            </div>

            <div className="ab-tagline">
                <h2>Technology is only as powerful as the <em>people.</em></h2>
            </div>

            <div className="ab-profiles">
                <div className="ab-profile">
                    <div className="ab-profile-photo" style={{ overflow: 'hidden' }}><img src={bowenImage} alt="Bowen Cheung" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /></div>
                    <h3>Bowen Cheung</h3>
                    <div className="ab-role">Co-Founder &amp; CEO</div>
                    <p>Leading product vision and strategy. Obsessed with building technology that brings people together at the moments that matter most.</p>
                </div>
                <div className="ab-profile">
                    <div className="ab-profile-photo" style={{ overflow: 'hidden' }}><img src={georgeImage} alt="George Hastings" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /></div>
                    <h3>George Hastings</h3>
                    <div className="ab-role">Co-Founder &amp; CTO</div>
                    <p>Architecting the AI infrastructure behind Supercharged. Turning the vision of intelligent, intent-driven connection into reality.</p>
                </div>
                <div className="ab-profile">
                    <div className="ab-profile-photo" style={{ overflow: 'hidden' }}><img src={alexImage} alt="Alex" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /></div>
                    <h3>Alex Cheung</h3>
                    <div className="ab-role">Growth Officer</div>
                    <p>Undergraduate at Oxford University. Handling outreach and expanding Supercharged's presence across university campuses and beyond.</p>
                </div>
            </div>

            <div className="overlay-black-cta" style={{ background: '#000000', padding: '100px 48px', textAlign: 'center' }}>
                <h2 className="overlay-cta-headline" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '42px', color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                    <em>Want to be part of this?</em>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.44)', maxWidth: '440px', margin: '16px auto 36px' }}>
                    Join the waitlist and be among the first to experience Supercharged.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
                    <button className="final-btn-primary waitlist-trigger" onClick={() => { posthog?.capture('waitlist_cta_clicked', { source: 'about_footer' }); onOpenWaitlist(); }}>Join the Waitlist</button>
                </div>
            </div>
        </div>
    );
}
