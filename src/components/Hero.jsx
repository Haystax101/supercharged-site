import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';
import AppConstellation from './AppConstellation';

export default function Hero({ waitlistCount, onOpenWaitlist, onOpenAbout, onOpenManifesto }) {
    const posthog = usePostHog();
    // Cascading delays based on original CSS classes (d-0, d-120, etc.)
    const animIn = {
        hidden: { opacity: 0, y: 30 },
        show: (custom) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.12, duration: 0.6, ease: "easeOut" }
        })
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="hero is-centred">

            {/* NAV */}
            <nav className="anim-nav">
                <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0px', lineHeight: 1, textDecoration: 'none' }}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ display: 'block', marginTop: '-1px' }}>
                        <path d="M7 0L0 9h5l-1.5 7L12 7H7L7 0z" fill="#f5c842" />
                    </svg>
                    <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: '15px', color: '#0f0e0d', letterSpacing: '-0.01em', lineHeight: 1 }}>upercharged</span>
                </a>
                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenAbout(); }}>About</a>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenManifesto(); }}>Manifesto</a>
                </div>
                <div className="nav-right">
                    <button className="nav-cta waitlist-trigger" onClick={(e) => { e.preventDefault(); posthog?.capture('waitlist_cta_clicked', { source: 'hero_nav' }); onOpenWaitlist(); }}>Join Waitlist</button>
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
                            <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onOpenManifesto(); }}>Manifesto</a>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-cta-bar">
                            <button
                                className="dropdown-waitlist-btn waitlist-trigger"
                                onClick={() => { setIsMenuOpen(false); posthog?.capture('waitlist_cta_clicked', { source: 'hero_mobile_nav' }); onOpenWaitlist(); }}
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hero-centre">
                <motion.p custom={0} variants={animIn} initial="hidden" animate="show" className="badge">
                    Now in pilot &middot; Cold outreach, warmed up
                </motion.p>

                <motion.h1 custom={1} variants={animIn} initial="hidden" animate="show" className="headline">
                    <span className="headline-find">
                        Find
                        {/* Job types mirror the goal picker in the app
                            (lib/onboardingData.ts). The 5th item repeats the
                            1st so the loop has no visible seam. */}
                        <span className="rotator" aria-label="internships, placements, springs or grad roles">
                            {/* The gradient goes on each word, not the track:
                                a background-clip:text layer spanning all five
                                escapes the parent's overflow clip, and each
                                word gets the full colour ramp this way. */}
                            <span className="rotator-track" aria-hidden="true">
                                <span className="chromatic-text">internships</span>
                                <span className="chromatic-text">placements</span>
                                <span className="chromatic-text">springs</span>
                                <span className="chromatic-text">grad roles</span>
                                <span className="chromatic-text">internships</span>
                            </span>
                        </span>
                    </span>
                    through the people already there.
                </motion.h1>

                <motion.p custom={2} variants={animIn} initial="hidden" animate="show" className="subheadline">
                    Tell Supercharged the role, the firms and the season. It finds the alumni and analysts already there, works out who will actually reply, and writes the email in your voice.
                </motion.p>

                <motion.div custom={3} variants={animIn} initial="hidden" animate="show" className="cta-row">
                    <button className="cta-primary waitlist-trigger" onClick={() => { posthog?.capture('waitlist_cta_clicked', { source: 'hero_primary' }); onOpenWaitlist(); }}>
                        Secure my Spot
                    </button>
                    <a href="#how" className="cta-secondary">
                        See how it works &darr;
                    </a>
                </motion.div>

                <motion.div custom={4} variants={animIn} initial="hidden" animate="show" className="social-proof">
                    <div className="avatar-stack">
                        <div className="avatar-sm av-1" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #f6f3eb', background: 'linear-gradient(135deg, #7c3aed, #db2777)', marginLeft: 0 }}></div>
                        <div className="avatar-sm av-2" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #f6f3eb', background: 'linear-gradient(135deg, #db2777, #f97316)', marginLeft: '-8px' }}></div>
                        <div className="avatar-sm av-3" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #f6f3eb', background: 'linear-gradient(135deg, #0891b2, #059669)', marginLeft: '-8px' }}></div>
                        <div className="avatar-sm av-4" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #f6f3eb', background: 'linear-gradient(135deg, #0284c7, #4f46e5)', marginLeft: '-8px' }}></div>
                        <div className="avatar-sm av-5" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #f6f3eb', background: 'linear-gradient(135deg, #10b981, #f59e0b)', marginLeft: '-8px' }}></div>
                    </div>
                    <span><span className="hero-waitlist-count chromatic-text">{waitlistCount}</span> people already supercharged</span>
                </motion.div>
            </div>

            {/* The whole product in one picture, below the fold-line. */}
            <AppConstellation />

        </section>
    );
}
