import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';
import { MockAvatar, OverlapChip, TierPill } from './AppMock';

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

    const mockupAnim = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.8, ease: "backOut" }
        }
    };

    return (
        <section className="hero">

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

            <div className="hero-grid-split">

                {/* LEFT COMPONENT: TEXT */}
                <div className="hero-text">
                    <motion.p custom={0} variants={animIn} initial="hidden" animate="show" className="badge">
                        Now in pilot &middot; Cold outreach, warmed up
                    </motion.p>

                    <motion.h1 custom={1} variants={animIn} initial="hidden" animate="show" className="headline" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', whiteSpace: 'normal' }}>
                        <span className="headline-find">
                            Find
                            {/* Job types mirror the goal picker in the app
                                (lib/onboardingData.ts). The 5th item repeats the
                                1st so the loop has no visible seam. */}
                            <span className="rotator" aria-label="internships, placements, springs or grad roles">
                                <span className="rotator-track chromatic-text" aria-hidden="true">
                                    <span>internships</span>
                                    <span>placements</span>
                                    <span>springs</span>
                                    <span>grad roles</span>
                                    <span>internships</span>
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

                {/* RIGHT COMPONENT: MOCKUP */}
                <motion.div variants={mockupAnim} initial="hidden" animate="show" className="hero-mockup">
                    <div className="mockup" style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: '16px', boxShadow: '0 24px 48px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                        <div className="mockup-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)' }}>
                            <div className="dots" style={{ display: 'flex', gap: '6px' }}>
                                <div className="dot-r" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                                <div className="dot-y" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                                <div className="dot-g" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
                            </div>
                            <span className="mockup-topbar-title" style={{ fontFamily: 'Geist, sans-serif', fontSize: '11px', fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}>Supercharged</span>
                            <div className="topbar-avatar" style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}></div>
                        </div>

                        {/* The app's Discover screen: top nav, plain-English
                            search, results ranked by fit. */}
                        {/* Its own class, not .mockup-body — that one is capped at
                            max-height:380px for the old sidebar layout. */}
                        <div className="mockup-discover" style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.6)' }}>

                            <div className="mockup-nav" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#fffefd', background: '#0f0e0d', padding: '5px 12px', borderRadius: '999px' }}>Discover</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(0,0,0,0.45)', padding: '5px 12px' }}>Outreach</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(0,0,0,0.45)', padding: '5px 12px' }}>Tracking</span>
                                <span style={{ marginLeft: 'auto', width: '24px', height: '24px', borderRadius: '50%', background: '#0f0e0d', color: '#fffefd', fontSize: '9px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>You</span>
                            </div>

                            <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                <div style={{ background: '#fffefd', border: '1.5px solid #0f0e0d', borderRadius: '14px', padding: '11px 13px 10px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                    <span style={{ flex: 1, fontSize: '11.5px', lineHeight: 1.45, color: 'rgba(0,0,0,0.72)' }}>
                                        Spring week at J.P. Morgan &mdash; Sales &amp; Trading, Oxford alumni if possible
                                    </span>
                                    <span style={{ background: '#0f0e0d', color: '#fff', fontSize: '10px', fontWeight: 600, padding: '5px 12px', borderRadius: '999px', flexShrink: 0 }}>Find</span>
                                </div>

                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.36)', textAlign: 'center' }}>
                                    14 people found &middot; ranked by fit
                                </div>

                                <div style={{ background: '#fffefd', border: '1.5px solid #0f0e0d', borderRadius: '14px', padding: '13px 14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <MockAvatar name="Priya Raghavan" i={0} size={34} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f0e0d' }}>
                                                Priya Raghavan<span className="alumni-badge">ALUMNI</span>
                                            </div>
                                            <div style={{ fontSize: '10.5px', color: 'rgba(0,0,0,0.5)', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                Analyst, Rates Trading &middot; J.P. Morgan &middot; London
                                            </div>
                                        </div>
                                        <TierPill tier="top" />
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                                        <OverlapChip i={0}>Same university &middot; Oxford</OverlapChip>
                                        <OverlapChip i={1}>Same course &middot; Geography</OverlapChip>
                                    </div>
                                </div>

                                <div style={{ background: '#fffefd', border: '1.5px solid #0f0e0d', borderRadius: '14px', padding: '13px 14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <MockAvatar name="Tom Beckett" i={3} size={34} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f0e0d' }}>Tom Beckett</div>
                                            <div style={{ fontSize: '10.5px', color: 'rgba(0,0,0,0.5)', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                VP, Commodities &middot; J.P. Morgan &middot; London
                                            </div>
                                        </div>
                                        <TierPill tier="strong" />
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                                        <OverlapChip i={2}>Same society &middot; Geography Soc</OverlapChip>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', padding: '0 20px 18px', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '999px', padding: '5px 5px 5px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                                    <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.6)' }}><strong style={{ color: '#0f0e0d' }}>14</strong> selected</span>
                                    <span style={{ background: '#0f0e0d', color: '#fff', fontSize: '10.5px', fontWeight: 600, padding: '6px 13px', borderRadius: '999px' }}>Draft outreach &rarr;</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>

        </section>
    );
}
