import { motion, useReducedMotion } from 'framer-motion';

/**
 * The whole product as one picture: a bolt at the centre with four spokes —
 * Search, Simulate, Draft, Track. Each card carries only the essence of its
 * tab, abstracted down from the real screens so the shape reads at a glance.
 *
 * Deliberately quiet: cards settle in once on scroll and then drift a couple
 * of pixels. Nothing types, nothing loops.
 */

/** Card centres as % of the container, used to aim the connector lines. */
const NODES = [
    { key: 'search', label: 'Search', at: { left: '0%', top: '3%' }, aim: ['14%', '24%'] },
    { key: 'simulate', label: 'Simulate', at: { left: '6%', bottom: '0%' }, aim: ['19%', '77%'] },
    { key: 'draft', label: 'Draft', at: { right: '0%', top: '1%' }, aim: ['86%', '23%'] },
    { key: 'track', label: 'Track', at: { right: '5%', bottom: '2%' }, aim: ['82%', '76%'] },
];

/** Search: a plain-English brief, and people ranked by fit. */
function SearchNode() {
    return (
        <>
            <div className="cn-query">
                <span className="cn-spark">&#10022;</span>
                <span>Spring week at J.P. Morgan&hellip;</span>
            </div>
            <div className="cn-rows">
                {[
                    { g: 0, w: '68%', tier: 'top' },
                    { g: 3, w: '54%', tier: 'strong' },
                    { g: 1, w: '61%', tier: null },
                ].map((r, i) => (
                    <div key={i} className="cn-row">
                        <span className={`cn-dot cn-dot-${r.g}`} />
                        <span className="cn-bar" style={{ width: r.w }} />
                        {r.tier && <span className={`cn-tier cn-tier-${r.tier}`} />}
                    </div>
                ))}
            </div>
        </>
    );
}

/** Simulate: the same conversation played out many times over. */
function SimulateNode() {
    return (
        <>
            <div className="cn-sim">
                {/* Two offset copies behind the thread: the same exchange, run
                    again and again, rather than a single conversation. */}
                <span className="cn-sim-ghost cn-sim-ghost-2" aria-hidden="true" />
                <span className="cn-sim-ghost cn-sim-ghost-1" aria-hidden="true" />
                <div className="cn-thread">
                    <span className="cn-bubble cn-bubble-in" style={{ width: '78%' }} />
                    <span className="cn-bubble cn-bubble-out" style={{ width: '46%' }} />
                    <span className="cn-bubble cn-bubble-in" style={{ width: '64%' }} />
                </div>
            </div>
            <div className="cn-foot">
                <span className="cn-foot-label">Confidence</span>
                <span className="serif-num cn-foot-val">31&ndash;44%</span>
            </div>
        </>
    );
}

/** Draft: several messages written at once, each in your voice. */
function DraftNode() {
    return (
        <div className="cn-drafts">
            {[0, 1, 2].map((i) => (
                <div key={i} className={`cn-draft cn-draft-${i}`}>
                    <span className="cn-draft-to" />
                    <span className="cn-bar" style={{ width: '86%' }} />
                    <span className="cn-bar" style={{ width: '72%' }} />
                    <span className="cn-bar" style={{ width: i === 0 ? '38%' : '54%' }} />
                    {i === 0 && <span className="cn-caret" />}
                </div>
            ))}
        </div>
    );
}

/** Track: every thread moving along the pipeline without being chased. */
function TrackNode() {
    const STAGES = ['#E8A94A', '#5B8CF5', '#9B7CF6', '#C96B44', '#E8A020'];
    return (
        <div className="cn-tracks">
            {[3, 2, 4].map((reached, r) => (
                <div key={r} className="cn-track">
                    <span className={`cn-dot cn-dot-${r}`} />
                    <span className="cn-pips">
                        {STAGES.map((c, i) => (
                            <span
                                key={i}
                                className="cn-pip"
                                style={{ background: i <= reached ? c : 'rgba(0,0,0,0.09)' }}
                            />
                        ))}
                    </span>
                </div>
            ))}
        </div>
    );
}

const VIEWS = { search: SearchNode, simulate: SimulateNode, draft: DraftNode, track: TrackNode };

export default function AppConstellation() {
    const reduced = useReducedMotion();

    return (
        <div className="constellation">
            {/* Connector lines sit behind everything. pathLength normalises each
                line to 1 so one dash animation works for all of them. */}
            <svg className="cn-web" aria-hidden="true">
                {NODES.map((n, i) => (
                    <motion.line
                        key={n.key}
                        x1="50%" y1="50%" x2={n.aim[0]} y2={n.aim[1]}
                        pathLength="1"
                        strokeDasharray="1"
                        initial={reduced ? false : { strokeDashoffset: 1 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: 'easeOut' }}
                    />
                ))}
                {NODES.map((n) => (
                    <circle key={`${n.key}-cap`} cx={n.aim[0]} cy={n.aim[1]} r="3" className="cn-cap" />
                ))}
            </svg>

            {/* The bolt at the middle. */}
            <motion.div
                className="cn-core"
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <svg width="34" height="45" viewBox="0 0 12 16" fill="none" aria-hidden="true">
                    <path d="M7 0L0 9h5l-1.5 7L12 7H7L7 0z" fill="#f5c842" />
                </svg>
            </motion.div>

            {NODES.map((n, i) => {
                const View = VIEWS[n.key];
                return (
                    <motion.div
                        key={n.key}
                        className={`cn-card cn-card-${n.key}`}
                        style={n.at}
                        initial={reduced ? false : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.65, delay: 0.35 + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="cn-label">{n.label}</p>
                        <View />
                    </motion.div>
                );
            })}
        </div>
    );
}
