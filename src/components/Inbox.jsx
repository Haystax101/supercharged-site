import { motion } from 'framer-motion';
import { GmailLogo, OutlookLogo } from './AppMock';
import { COMPAT_DIMS, STAGE_META } from '../lib/appMockData';

/**
 * Mirrors app/app/outreach and app/app/tracking: simulate, draft in the
 * student's voice, send from their own mailbox, then follow every thread
 * through to the offer.
 *
 * Named Inbox for continuity with the existing Home layout.
 */
export default function Inbox() {
    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
    const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
    const listContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
    const listItem = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } };

    // Cumulative funnel, the way the tracking dashboard counts it.
    const STAGE_COUNTS = [14, 11, 5, 3, 1];
    const DIM_SCORES = [88, 94, 90, 61, 74];

    return (
        <>
            <div className="section-divider"></div>

            <div className="section-bg">
                <div className="section" id="outreach">

                    <div className="deepdive-header">
                        <div className="deepdive-left">
                            <p className="sec-label">Supercharged Outreach</p>
                            <h2 className="sec-headline-lg">The email you&rsquo;d have written, if you had the time.</h2>
                        </div>
                        <div className="deepdive-right">
                            <p className="sec-body">Every draft is calibrated twice: once against how the recipient is likely to read it, and once against how you actually write. Then it goes out from your own inbox &mdash; Outlook or Gmail &mdash; and every reply is tracked back here.</p>
                        </div>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="bento"
                    >
                        {/* Simulation */}
                        <motion.div variants={item} className="bento-full">
                            <p className="bento-label">Simulation swarm</p>
                            <h3 className="bento-title bento-title-lg">It has the conversation before you do</h3>
                            <p className="bento-body">Supercharged builds a grounded persona of the person you&rsquo;re writing to and runs the exchange repeatedly across two models. You get the angle that survived, the objection that kept coming up, and an honest confidence band instead of a made-up percentage.</p>

                            <div className="dark-spotlight">
                                <p className="spotlight-label">Best course of action</p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                                    Lead with the <span style={{ color: 'var(--accent)', fontWeight: 600 }}>shared course</span> angle.
                                </p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.55, color: 'rgba(255,255,255,0.68)' }}>
                                    She read Geography before moving onto the rates desk. Open there, and ask how she made the jump &mdash; not whether there&rsquo;s a spot going.
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '24px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                                    <div>
                                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Confidence</p>
                                        <p className="serif-num" style={{ fontSize: '19px', color: '#fff', marginTop: '3px' }}>Moderate &middot; 31&ndash;44%</p>
                                    </div>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.45)', maxWidth: '280px' }}>
                                        A calibrated band, not a false-precise number. It sharpens as real replies come back.
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '18px', marginTop: '22px' }}>
                                {COMPAT_DIMS.map((d, i) => (
                                    <div key={d.label} className="dim-row">
                                        <div className="dim-head">
                                            <span>{d.label}</span>
                                            <span className="serif-num" style={{ fontSize: '14px', color: '#0f0e0d', textTransform: 'none', letterSpacing: 0 }}>{DIM_SCORES[i]}</span>
                                        </div>
                                        <div className="dim-track">
                                            <motion.div
                                                className="dim-fill"
                                                style={{ background: d.color }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${DIM_SCORES[i]}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Draft in your voice */}
                        <motion.div variants={item} className="bento-half glass-card">
                            <p className="bento-label">Written in your voice</p>
                            <h3 className="bento-title bento-title-sm">Sounds like you, because it learned from you</h3>
                            <p className="bento-body">You write one short message during setup. Every draft after that borrows your rhythm, your hedges and your sign-off &mdash; and you can edit any of it before it goes.</p>
                            <div className="chat-mock" style={{ marginTop: '20px', height: 'auto' }}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                    viewport={{ once: true }}
                                    className="chat-ai"
                                    style={{ maxWidth: '100%' }}
                                >
                                    Hi Priya &mdash; I&rsquo;m a first-year geographer at Oxford and I saw you made the same jump onto a rates desk. That path is a bit of a mystery from where I&rsquo;m sitting. If you had fifteen minutes some time I&rsquo;d love to hear how you did it &mdash; totally understand if not. Alex
                                </motion.div>
                            </div>
                            <div className="check-list" style={{ marginTop: '14px' }}>
                                <div className="check-row"><span style={{ color: '#16a34a' }}>&#10003;</span> Reads like you, not like AI</div>
                                <div className="check-row"><span style={{ color: '#16a34a' }}>&#10003;</span> Asks for time, not a job</div>
                                <div className="check-row"><span style={{ color: '#d97706' }}>&#10022;</span> Trim one sentence &mdash; it runs slightly long</div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginTop: '18px' }}>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(0,0,0,0.5)', marginRight: '2px' }}>Send from</span>
                                <span className="provider-btn"><OutlookLogo size={15} /> Outlook</span>
                                <span className="provider-btn"><GmailLogo size={15} /> Gmail</span>
                            </div>
                        </motion.div>

                        {/* Tracking */}
                        <motion.div variants={item} className="bento-half glass-card">
                            <p className="bento-label">Supercharged Tracking</p>
                            <h3 className="bento-title bento-title-sm">Every thread, followed to the offer</h3>
                            <p className="bento-body">Sent, opened, replied, coffee chat, offer. Your outreach analyst reads each reply and tells you the next move &mdash; or, in auto mode, makes it for you.</p>

                            <div className="stage-pipe">
                                {STAGE_META.map((s, i) => (
                                    <motion.div
                                        key={s.key}
                                        variants={listItem}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="stage-col"
                                    >
                                        <div className="stage-count">{STAGE_COUNTS[i]}</div>
                                        <div className="stage-name">
                                            <span className="stage-dot" style={{ background: s.dot }} />
                                            {s.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div variants={listContainer} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginTop: '18px' }}>
                                <motion.div variants={listItem} className="mini-inbox-card">
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div className="mini-inbox-name">Priya replied<span className="inbox-badge">Next move</span></div>
                                        <div className="mini-inbox-sum">She offered Thursday &mdash; confirm and send two questions</div>
                                    </div>
                                </motion.div>
                                <motion.div variants={listItem} className="mini-inbox-card">
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div className="mini-inbox-name">Tom opened, no reply</div>
                                        <div className="mini-inbox-sum">Day 6 &mdash; nudge once, then leave it</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </>
    );
}
