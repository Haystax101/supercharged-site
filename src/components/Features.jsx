import { motion } from 'framer-motion';
import { MockAvatar, OverlapChip, TierPill } from './AppMock';

export default function Features() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <>
            <div className="section-divider"></div>

            <div className="section-bg" id="features">
                <div className="section">

                    <div className="deepdive-header">
                        <div className="deepdive-left">
                            <h2 className="sec-headline-lg">Four steps.<br />You do one of them.</h2>
                        </div>
                        <div className="deepdive-right" style={{ paddingTop: '8px' }}>
                            <p className="sec-body">Upload your CV once. From then on Supercharged finds the right people, works out how your message will land, writes it in your voice and tracks every reply. You approve and hit send.</p>
                        </div>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="bento"
                    >
                        {/* Discover */}
                        <motion.div variants={item} className="platform-card" style={{ flex: '1.2' }}>
                            <p className="bento-label">Supercharged Discover</p>
                            <h3 className="platform-headline">Describe who you need. It goes and finds them.</h3>
                            <p className="platform-body">Not a database lookup &mdash; it researches the open web for real people at the firms you named, then ranks them by how likely they are to reply to <em>you</em>.</p>
                            <a href="#how" className="btn-dark" style={{ marginTop: '32px', display: 'inline-block' }}>Learn more &rsaquo;</a>

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
                            <div className="mini-result">
                                <MockAvatar name="Tom Beckett" i={3} size={28} />
                                <div style={{ minWidth: 0 }}>
                                    <div className="mini-name">Tom Beckett</div>
                                    <div className="mini-role">VP, Commodities &middot; J.P. Morgan</div>
                                </div>
                                <span style={{ marginLeft: 'auto' }}><TierPill tier="strong" /></span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                                <OverlapChip i={0}>Same university &middot; Oxford</OverlapChip>
                                <OverlapChip i={1}>Same course &middot; Geography</OverlapChip>
                                <OverlapChip i={2}>Same society</OverlapChip>
                            </div>
                        </motion.div>

                        {/* Outreach */}
                        <motion.div variants={item} className="platform-card">
                            <p className="bento-label">Supercharged Outreach</p>
                            <h3 className="platform-headline">It writes the email. In your words, not ChatGPT&rsquo;s.</h3>
                            <p className="platform-body">Before writing a line, it plays the conversation out to find the angle that actually lands. Then it drafts in the voice it learned from your own writing sample.</p>
                            <a href="#outreach" className="btn-dark" style={{ marginTop: '32px', display: 'inline-block' }}>Learn more &rsaquo;</a>

                            <div className="dark-spotlight">
                                <p className="spotlight-label">Best course of action</p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                                    Lead with the <span style={{ color: 'var(--accent)', fontWeight: 600 }}>shared course</span> angle.
                                </p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.65)' }}>
                                    She read Geography too and moved into markets &mdash; open on that, not on the internship.
                                </p>
                                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Confidence</p>
                                    <p className="serif-num" style={{ fontSize: '18px', color: '#fff', marginTop: '2px' }}>Moderate &middot; 31&ndash;44%</p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </>
    );
}
