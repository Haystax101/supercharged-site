import { motion } from 'framer-motion';
import { FitRing, MockAvatar, OverlapChip, TierPill } from './AppMock';
import { STAGE_META } from '../lib/appMockData';

/**
 * The three pillars, straight from the deck: Search, Simulate, Automate —
 * answering the three problems above in the same order (capped, blind,
 * silent).
 */
export default function Features() {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <>
            <div className="section-divider"></div>

            <div className="section-bg" id="features">
                <div className="section">

                    <div className="deepdive-header">
                        <div className="deepdive-left">
                            <p className="sec-label">How it works</p>
                            <h2 className="sec-headline-lg">Search.<br />Simulate.<br />Automate.</h2>
                        </div>
                        <div className="deepdive-right" style={{ paddingTop: '8px' }}>
                            <p className="sec-body">
                                Upload your CV once. From then on Supercharged searches the open web for the people worth reaching, projects how each conversation is likely to land before you send anything, and keeps the follow-up moving on its own. You approve and hit send.
                            </p>
                            <p className="sec-stat">
                                <span className="sec-stat-num chromatic-text chromatic-tight">5.5</span>
                                <span className="sec-stat-label">
                                    hours back a week at peak recruiting,<br />on the admin you were never paid for
                                </span>
                            </p>
                        </div>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-100px' }}
                        className="pillars"
                    >
                        {/* SEARCH — answers "capped on volume" */}
                        <motion.div variants={item} className="platform-card pillar">
                            <p className="bento-label">01 &mdash; Search</p>
                            <h3 className="platform-headline">Describe who you need. It goes and finds them.</h3>
                            <p className="platform-body">
                                Not a database lookup. It searches the open web in plain English to surface the specific alumni, interviewers and analysts worth reaching at the firms you named &mdash; then ranks them by how likely they are to reply to <em>you</em>.
                            </p>

                            <div className="mini-search">
                                <span style={{ color: '#d97706', fontSize: '12px' }}>&#10022;</span>
                                <span className="mini-search-text">Summer internship, M&amp;A, Rothschild or Lazard...</span>
                                <span className="mini-search-btn">Find</span>
                            </div>
                            <div className="mini-result">
                                <MockAvatar name="Priya Raghavan" i={0} size={28} />
                                <div style={{ minWidth: 0 }}>
                                    <div className="mini-name">Priya Raghavan</div>
                                    <div className="mini-role">Analyst, Rates Trading &middot; J.P. Morgan</div>
                                </div>
                                <span style={{ marginLeft: 'auto' }}><TierPill tier="top" /></span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                                <OverlapChip i={0}>Same university &middot; Oxford</OverlapChip>
                                <OverlapChip i={1}>Same course &middot; Geography</OverlapChip>
                            </div>
                        </motion.div>

                        {/* SIMULATE — answers "blind on priority" */}
                        <motion.div variants={item} className="platform-card pillar">
                            <p className="bento-label">02 &mdash; Simulate</p>
                            <h3 className="platform-headline">It has the conversation before you do.</h3>
                            <p className="platform-body">
                                Every match is scored for compatibility, and the likely outcome is projected before a message is ever sent. You get the angle that survived, the objection that kept coming up, and an honest confidence band.
                            </p>

                            <div className="pillar-fit">
                                <FitRing value={91} size={44} />
                                <div>
                                    <div className="mini-name">Priya Raghavan</div>
                                    <div className="mini-role">Openness &middot; Education &middot; Path overlap</div>
                                </div>
                            </div>

                            <div className="dark-spotlight">
                                <p className="spotlight-label">Best course of action</p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                                    Lead with the <span style={{ color: 'var(--accent)', fontWeight: 600 }}>shared course</span> angle.
                                </p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.5, color: 'rgba(255,255,255,0.65)' }}>
                                    Ask how she moved from Geography onto the desk &mdash; not whether there&rsquo;s a spot going.
                                </p>
                                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Confidence</p>
                                    <p className="serif-num" style={{ fontSize: '17px', color: '#fff', marginTop: '2px' }}>Moderate &middot; 31&ndash;44%</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* AUTOMATE — answers "silent on feedback" */}
                        <motion.div variants={item} className="platform-card pillar">
                            <p className="bento-label">03 &mdash; Automate</p>
                            <h3 className="platform-headline">Outreach and follow-up that keep moving.</h3>
                            <p className="platform-body">
                                Drafts are written in your voice, sent from your own inbox, and tracked through every reply. Nothing goes cold because you forgot, and nothing sends without your approval.
                            </p>

                            <div className="stage-pipe">
                                {STAGE_META.map((s, i) => (
                                    <div key={s.key} className="stage-col">
                                        <div className="stage-count">{[14, 11, 5, 3, 1][i]}</div>
                                        <div className="stage-name">
                                            <span className="stage-dot" style={{ background: s.dot }} />
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mini-inbox-card" style={{ marginTop: '14px' }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="mini-inbox-name">
                                        Priya replied<span className="inbox-badge">Next move</span>
                                    </div>
                                    <div className="mini-inbox-sum">She offered Thursday &mdash; confirm and send two questions</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
