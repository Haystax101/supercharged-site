import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import Features from '../components/Features';
import Discover from '../components/Discover';
import Inbox from '../components/Inbox';
import Privacy from '../components/Privacy';
import { useNavigate } from 'react-router-dom';
import { usePostHog } from 'posthog-js/react';

export default function Home({ waitlistCount, onOpenWaitlist, onOpenAbout, onOpenManifesto }) {
    const navigate = useNavigate();
    const posthog = usePostHog();
    return (
        <>
            <div className="noise-overlay"></div>

            <Hero
                waitlistCount={waitlistCount}
                onOpenWaitlist={onOpenWaitlist}
                onOpenAbout={onOpenAbout}
                onOpenManifesto={onOpenManifesto}
            />

            <div className="hero-spacer" style={{ height: '48px' }}></div>
            <ProblemSection />

            <Features />

            <Discover />

            <Inbox />

            <div className="section-divider"></div>

            <div className="section-bg">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="section"
                    id="manifesto"
                >
                    <div className="manifesto-grid">
                        <div className="manifesto-left">
                            <p className="sec-label">Our Philosophy</p>
                            <h2 className="manifesto-sec-headline" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '40px', color: 'var(--text)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                                Who you know shouldn't come down to luck.
                            </h2>
                            <button className="btn-outline" onClick={onOpenManifesto} style={{ marginTop: '32px' }}>Read our manifesto &rsaquo;</button>
                        </div>
                        <div className="manifesto-right">
                            <p>Some students walk into their first spring week because a family friend made an introduction. Everyone else submits the same form into the same portal and waits.</p>
                            <p>The gap isn't talent and it isn't effort. It's access to a handful of people who would happily have given fifteen minutes, if you'd known they existed and what to say to them.</p>
                            <p>Supercharged does that part. It finds them, works out what you honestly have in common, and helps you write something worth replying to. The conversation is still yours to have.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Privacy />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="final-cta"
                style={{ isolation: 'isolate' }}
            >
                <h2 className="final-headline"><em>The people who can get you in are already there.</em></h2>
                <p className="final-sub">Join {waitlistCount} students using Supercharged to reach them before applications open.</p>
                <div className="final-btns">
                    <button className="final-btn-primary waitlist-trigger" onClick={() => { posthog?.capture('waitlist_cta_clicked', { source: 'home_footer' }); onOpenWaitlist(); }}>Join the Waitlist</button>
                </div>
            </motion.div>

            <footer className="footer" style={{ isolation: 'isolate' }}>
                <div className="footer-grid">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0, lineHeight: 1 }}>
                            <svg width="10" height="13" viewBox="0 0 12 16" fill="none"><path d="M7 0L0 9h5l-1.5 7L12 7H7L7 0z" fill="#f5c842" /></svg>
                            <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: '14px', color: 'white', letterSpacing: '-0.01em', lineHeight: 1 }}>upercharged</span>
                        </div>
                        <p className="footer-tagline">Cold outreach, warmed up.</p>
                    </div>
                    <div>
                        <p className="footer-col-title">Product</p>
                        <a href="#how" className="footer-link">Discover</a>
                        <a href="#outreach" className="footer-link">Outreach</a>
                        <a href="#outreach" className="footer-link">Tracking</a>
                    </div>
                    <div>
                        <p className="footer-col-title">Company</p>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onOpenAbout(); }}>About</a>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onOpenManifesto(); }}>Manifesto</a>
                    </div>
                    <div>
                        <p className="footer-col-title">Socials</p>
                        <a href="#" className="footer-link">LinkedIn</a>
                        <a href="#" className="footer-link">Instagram</a>
                        <a href="#" className="footer-link">TikTok</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span className="footer-copy">&copy; 2026 Supercharged. All rights reserved.</span>
                    <span className="footer-legal">
                        <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>Privacy</a> &middot;
                        <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>Terms</a> &middot;
                        <a href="/support" onClick={(e) => { e.preventDefault(); navigate('/support'); }}>Support</a>
                    </span>
                </div>
            </footer>
        </>
    );
}
