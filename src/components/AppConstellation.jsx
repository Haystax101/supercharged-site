/**
 * The whole product as one picture: a bolt at the centre with four spokes —
 * Search, Simulate, Draft, Track. Each card carries only the essence of its
 * tab, abstracted from the real screens so the shape reads at a glance.
 *
 * Entrances are CSS animations with `animation-fill-mode: both`, not
 * JS-driven ones. The earlier version used Framer Motion's whileInView, and
 * the two upper cards would intermittently stay invisible until you scrolled.
 * A CSS animation has no observer to miss and no rAF to stall, and its end
 * state is guaranteed by the fill mode — so the picture cannot get stuck
 * half-drawn.
 *
 * Delays are inline because they vary per element; nothing else here sets
 * `transform`, so the entrance and the slow drift can each own one.
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

/**
 * Simulate: a swarm of agents talking to each other. Radius and opacity vary
 * to fake depth; the dashed edges flow so signal appears to travel between
 * points.
 */
const SWARM_NODES = [
    { x: 22, y: 72, r: 3, o: 0.4 },
    { x: 44, y: 34, r: 4.5, o: 0.85 },
    { x: 54, y: 88, r: 2.6, o: 0.35 },
    { x: 82, y: 20, r: 3.2, o: 0.6 },
    { x: 92, y: 56, r: 5.4, o: 1 },
    { x: 100, y: 94, r: 3.6, o: 0.7 },
    { x: 130, y: 30, r: 4.2, o: 0.8 },
    { x: 138, y: 76, r: 4.8, o: 0.95 },
    { x: 168, y: 24, r: 2.8, o: 0.45 },
    { x: 174, y: 62, r: 3.4, o: 0.65 },
    { x: 190, y: 92, r: 2.6, o: 0.35 },
];

const SWARM_EDGES = [
    [0, 1], [1, 4], [0, 2], [2, 4], [1, 3], [3, 4], [4, 5], [4, 6],
    [4, 7], [6, 7], [5, 7], [6, 8], [7, 9], [8, 9], [9, 10], [7, 10],
];

function SimulateNode() {
    return (
        <>
            <div className="cn-swarm">
                <svg viewBox="0 0 212 112" className="cn-swarm-svg" aria-hidden="true">
                    {SWARM_EDGES.map(([a, b], i) => (
                        <line
                            key={i}
                            x1={SWARM_NODES[a].x} y1={SWARM_NODES[a].y}
                            x2={SWARM_NODES[b].x} y2={SWARM_NODES[b].y}
                            className="cn-edge"
                            style={{ animationDelay: `${(i % 6) * -0.55}s` }}
                        />
                    ))}
                    {SWARM_NODES.map((n, i) => (
                        <circle
                            key={i}
                            cx={n.x} cy={n.y} r={n.r}
                            className="cn-node"
                            style={{ opacity: n.o, animationDelay: `${(i % 5) * -0.9}s` }}
                        />
                    ))}
                </svg>
            </div>
            <div className="cn-foot">
                <span className="cn-foot-label">Confidence</span>
                <span className="serif-num cn-foot-val">31&ndash;44%</span>
            </div>
        </>
    );
}

/**
 * Draft: several messages written at once. The stack builds one layer at a
 * time; only the front card shows text, so the layers behind read as depth
 * rather than three overlapping blocks of copy.
 */
function DraftNode({ baseDelay }) {
    return (
        <div className="cn-drafts">
            {[2, 1, 0].map((layer, order) => (
                <div
                    key={layer}
                    className={`cn-draft cn-draft-${layer}`}
                    style={{ animationDelay: `${baseDelay + 0.2 + order * 0.22}s` }}
                >
                    {layer === 0 && (
                        <>
                            <span className="cn-draft-to" />
                            <span className="cn-bar" style={{ width: '86%' }} />
                            <span className="cn-bar" style={{ width: '72%' }} />
                            <span className="cn-bar" style={{ width: '44%' }} />
                        </>
                    )}
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
    return (
        <div className="constellation">
            {/* Connector lines sit behind everything. pathLength normalises each
                line to 1 so one dash animation works for all of them. */}
            <svg className="cn-web" aria-hidden="true">
                {NODES.map((n, i) => (
                    <line
                        key={n.key}
                        x1="50%" y1="50%" x2={n.aim[0]} y2={n.aim[1]}
                        pathLength="1"
                        style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                    />
                ))}
                {NODES.map((n) => (
                    <circle key={`${n.key}-cap`} cx={n.aim[0]} cy={n.aim[1]} r="3" className="cn-cap" />
                ))}
            </svg>

            {/* The bolt at the middle. */}
            <div className="cn-core">
                <svg width="34" height="45" viewBox="0 0 12 16" fill="none" aria-hidden="true">
                    <path d="M7 0L0 9h5l-1.5 7L12 7H7L7 0z" fill="#f5c842" />
                </svg>
            </div>

            {NODES.map((n, i) => {
                const View = VIEWS[n.key];
                const delay = 0.6 + i * 0.11;
                return (
                    <div
                        key={n.key}
                        className="cn-slot"
                        style={{ ...n.at, animationDelay: `${delay}s` }}
                    >
                        {/* Inner element owns the drift, so the entrance and the
                            drift never fight over `transform`. */}
                        <div className={`cn-card cn-card-${n.key}`}>
                            <p className="cn-label">{n.label}</p>
                            <View baseDelay={delay} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
