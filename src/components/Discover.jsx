import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FitRing, MockAvatar, OverlapChip, TierPill } from './AppMock';

// Step labels are the real ones convex/discovery.ts writes to search_runs.
const STEPS = [
    'Reading your goal and profile',
    'Searching the web for people at J.P. Morgan',
    'Checking Oxford + Geography overlaps',
    'Scoring fit and ranking 14 matches',
];

/**
 * Mirrors app/app/discover: a plain-English brief, the live research steps the
 * action writes to search_runs, then results tiered and ranked by fit.
 */
export default function Discover() {
    const [typedText, setTypedText] = useState('');
    const fullText = "Spring week at J.P. Morgan, Sales & Trading, Oxford alumni...";
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [stepCount, setStepCount] = useState(0);

    const mockRef = useRef(null);
    const isInView = useInView(mockRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let idx = 0;
        const interval = setInterval(() => {
            idx++;
            setTypedText(fullText.slice(0, idx));
            if (idx === fullText.length) {
                clearInterval(interval);
                setTimeout(() => setIsTypingDone(true), 250);
            }
        }, 32);
        return () => clearInterval(interval);
    }, [isInView]);

    useEffect(() => {
        if (!isTypingDone) return;
        const timers = STEPS.map((_, i) =>
            setTimeout(() => setStepCount(i + 1), 500 * (i + 1))
        );
        return () => timers.forEach(clearTimeout);
    }, [isTypingDone]);

    const searchDone = stepCount >= STEPS.length;

    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
    const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
    const listContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
    const listItem = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } };

    return (
        <>
            <div className="section-divider"></div>

            <div className="section-bg">
                <div className="section" id="how">

                    <div className="deepdive-header">
                        <div className="deepdive-left">
                            <p className="sec-label">Supercharged Discover</p>
                            <h2 className="sec-headline-lg">Find the people already there.</h2>
                        </div>
                        <div className="deepdive-right">
                            <p className="sec-body">Say what you want in one sentence. Supercharged researches the open web for real people at those firms, works out what you genuinely have in common, and ranks them by how likely they are to write back.</p>
                        </div>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="bento"
                    >
                        {/* Search + live steps + results */}
                        <motion.div variants={item} className="bento-full">
                            <p className="bento-label">Natural-language people discovery</p>
                            <h3 className="bento-title bento-title-lg">One sentence in. Real people out.</h3>
                            <p className="bento-body">No filters, no boolean search. Describe the season, the desk and the firms the way you&rsquo;d say it to a friend.</p>
                            <div className="bento-search-mock" ref={mockRef}>
                                <div className="mini-search">
                                    <span style={{ color: '#d97706', fontSize: '12px' }}>&#10022;</span>
                                    {/* Rendered only while typing — the old
                                        `.cursor-blink.hidden` pair was never
                                        defined in CSS, so the caret stuck. */}
                                    <span className="mini-search-text">{typedText}{!isTypingDone && <span className="cursor-blink">|</span>}</span>
                                    <span className="mini-search-btn">Find</span>
                                </div>

                                {isTypingDone && (
                                    <div style={{ marginTop: '16px' }}>
                                        {STEPS.slice(0, Math.max(stepCount, 1)).map((label, i) => {
                                            const running = i === stepCount - 1 && !searchDone;
                                            return (
                                                <motion.div
                                                    key={label}
                                                    initial={{ opacity: 0, x: -6 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="step-row"
                                                >
                                                    {running || stepCount === 0
                                                        ? <span className="step-spinner" />
                                                        : <span className="step-tick">&#10003;</span>}
                                                    {label}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {searchDone && (
                                    <motion.div variants={listContainer} initial="hidden" animate="show" style={{ marginTop: '16px' }}>
                                        <motion.div variants={listItem} className="bento-result-row">
                                            <MockAvatar name="Priya Raghavan" i={0} size={30} />
                                            <div style={{ minWidth: 0 }}>
                                                <div className="mini-name">Priya Raghavan<span className="alumni-badge">ALUMNI</span></div>
                                                <div className="mini-role">Analyst, Rates Trading &middot; J.P. Morgan &middot; London</div>
                                            </div>
                                            <span style={{ marginLeft: 'auto' }}><TierPill tier="top" /></span>
                                        </motion.div>
                                        <motion.div variants={listItem} className="bento-result-row">
                                            <MockAvatar name="Tom Beckett" i={3} size={30} />
                                            <div style={{ minWidth: 0 }}>
                                                <div className="mini-name">Tom Beckett</div>
                                                <div className="mini-role">VP, Commodities &middot; J.P. Morgan &middot; London</div>
                                            </div>
                                            <span style={{ marginLeft: 'auto' }}><TierPill tier="strong" /></span>
                                        </motion.div>
                                        <motion.div variants={listItem} className="bento-result-row">
                                            <MockAvatar name="Hannah Okafor" i={1} size={30} />
                                            <div style={{ minWidth: 0 }}>
                                                <div className="mini-name">Hannah Okafor</div>
                                                <div className="mini-role">Associate, Equity Research &middot; J.P. Morgan</div>
                                            </div>
                                            <span style={{ marginLeft: 'auto' }}><TierPill tier="relevant" /></span>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Overlaps */}
                        <motion.div variants={item} className="bento-half glass-card">
                            <p className="bento-label">Real overlaps only</p>
                            <h3 className="bento-title bento-title-sm">It tells you what you actually share</h3>
                            <p className="bento-body">Same college, same course, same society, same city, same first employer. The things that make a stranger reply &mdash; surfaced before you write a word.</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px' }}>
                                <OverlapChip i={0}>Same university &middot; Oxford</OverlapChip>
                                <OverlapChip i={1}>Same course &middot; Geography</OverlapChip>
                                <OverlapChip i={2}>Same society &middot; Geography Soc</OverlapChip>
                                <OverlapChip i={3}>Same city &middot; London</OverlapChip>
                            </div>
                        </motion.div>

                        {/* Fit score */}
                        <motion.div variants={item} className="bento-half glass-card">
                            <p className="bento-label">Compatibility score</p>
                            <h3 className="bento-title bento-title-sm">A fit number you can argue with</h3>
                            <p className="bento-body">Five dimensions, each with its reason attached &mdash; so you can see <em>why</em> someone scores well, not just that they do.</p>
                            <motion.div variants={listContainer} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginTop: '20px' }}>
                                <motion.div variants={listItem} className="bento-result-row">
                                    <MockAvatar name="Priya Raghavan" i={0} size={30} />
                                    <div style={{ minWidth: 0 }}>
                                        <div className="mini-name">Priya Raghavan</div>
                                        <div className="mini-role">Openness &middot; Education &middot; Path overlap</div>
                                    </div>
                                    <span style={{ marginLeft: 'auto' }}><FitRing value={91} size={42} /></span>
                                </motion.div>
                                <motion.div variants={listItem} className="bento-result-row">
                                    <MockAvatar name="Tom Beckett" i={3} size={30} />
                                    <div style={{ minWidth: 0 }}>
                                        <div className="mini-name">Tom Beckett</div>
                                        <div className="mini-role">Leverage &middot; Personal</div>
                                    </div>
                                    <span style={{ marginLeft: 'auto' }}><FitRing value={78} size={42} /></span>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </>
    );
}
