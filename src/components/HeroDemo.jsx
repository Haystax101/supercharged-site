import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FitRing, GmailLogo, MockAvatar, OutlookLogo, OverlapChip, TierPill } from './AppMock';
import { COMPAT_DIMS, STAGE_META } from '../lib/appMockData';

/**
 * The hero walkthrough: one macOS window that plays the whole product loop —
 * Search, Simulate, Draft, Track — the four steps of the pitch narrative.
 *
 * Built on Framer Motion rather than a rendered video so the UI text stays
 * crisp at any DPI, the window reflows on mobile, and copy edits are code
 * edits. Scenes cross-fade inside a fixed-height body so nothing jumps.
 *
 * Pauses when scrolled out of view; renders a single static frame when the
 * visitor prefers reduced motion.
 */

const SCENES = [
    { key: 'search', label: 'Search', ms: 5400 },
    { key: 'simulate', label: 'Simulate', ms: 5000 },
    { key: 'draft', label: 'Draft', ms: 5600 },
    { key: 'track', label: 'Track', ms: 4800 },
];

const QUERY = 'Spring week at J.P. Morgan, Sales & Trading';

// The labels convex/discovery.ts writes to search_runs as the action works.
const STEPS = [
    'Reading your goal and profile',
    'Searching the web for people at J.P. Morgan',
    'Checking Oxford + Geography overlaps',
    'Scoring fit across 14 matches',
];

const EMAIL_BODY = `Hi Priya — I'm a first-year geographer at Oxford and I saw you made the same jump onto a rates desk. If you had fifteen minutes some time, I'd love to hear how you did it.`;

const DIM_SCORES = [88, 94, 90, 61, 74];
const STAGE_COUNTS = [14, 11, 5, 3, 1];

/**
 * Reveals `text` one character at a time; instant when `skip`.
 * Scenes remount on every replay, so `count` starts at 0 on its own — the
 * skip case is derived rather than written back to state, which would mean
 * calling setState synchronously inside an effect.
 */
function useTypewriter(text, { speed = 24, delay = 250, skip = false } = {}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (skip) return;

        let i = 0;
        let tick;
        const start = setTimeout(() => {
            tick = setInterval(() => {
                i += 1;
                setCount(i);
                if (i >= text.length) clearInterval(tick);
            }, speed);
        }, delay);

        return () => {
            clearTimeout(start);
            clearInterval(tick);
        };
    }, [text, speed, delay, skip]);

    return {
        shown: skip ? text : text.slice(0, count),
        done: skip || count >= text.length,
    };
}

/** Steps tick off one by one once the query has finished typing. */
function useStepProgress(start, { skip = false, every = 620 } = {}) {
    const [done, setDone] = useState(0);

    useEffect(() => {
        if (skip || !start) return;
        const timers = STEPS.map((_, i) => setTimeout(() => setDone(i + 1), every * (i + 1)));
        return () => timers.forEach(clearTimeout);
    }, [start, skip, every]);

    return skip ? STEPS.length : done;
}

function SceneSearch({ skip }) {
    const { shown, done } = useTypewriter(QUERY, { speed: 22, skip });
    const steps = useStepProgress(done, { skip });
    const ready = steps >= STEPS.length;

    return (
        <div className="demo-stack">
            <div className="demo-searchbar">
                <span className="demo-searchbar-text">
                    {shown}
                    {!done && <span className="cursor-blink">|</span>}
                </span>
                <span className="demo-find-btn">Find</span>
            </div>

            {done && !ready && (
                <div style={{ marginTop: '4px' }}>
                    {STEPS.slice(0, Math.max(steps, 1)).map((label, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="step-row"
                        >
                            {i === steps - 1
                                ? <span className="step-spinner" />
                                : <span className="step-tick">&#10003;</span>}
                            {label}
                        </motion.div>
                    ))}
                </div>
            )}

            {ready && (
                <>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="demo-meta"
                    >
                        14 people found &middot; ranked by fit
                    </motion.p>

                    {[
                        {
                            name: 'Priya Raghavan', i: 0, alumni: true, tier: 'top',
                            role: 'Analyst, Rates Trading · J.P. Morgan · London',
                            chips: ['Same university · Oxford', 'Same course · Geography'],
                        },
                        {
                            name: 'Tom Beckett', i: 3, alumni: false, tier: 'strong',
                            role: 'VP, Commodities · J.P. Morgan · London',
                            chips: ['Same society · Geography Soc'],
                        },
                    ].map((p, idx) => (
                        <motion.div
                            key={p.name}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.14, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="demo-card"
                        >
                            <div className="demo-card-head">
                                <MockAvatar name={p.name} i={p.i} size={32} />
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <div className="demo-name">
                                        {p.name}
                                        {p.alumni && <span className="alumni-badge">ALUMNI</span>}
                                    </div>
                                    <div className="demo-role">{p.role}</div>
                                </div>
                                <TierPill tier={p.tier} />
                            </div>
                            <div className="demo-chips">
                                {p.chips.map((c, ci) => <OverlapChip key={c} i={ci}>{c}</OverlapChip>)}
                            </div>
                        </motion.div>
                    ))}

                    {/* Sits on the baseline and hands off to the Draft scene. */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.42, duration: 0.4 }}
                        className="demo-selectbar"
                    >
                        <span className="demo-selectbar-count"><strong>14</strong> selected</span>
                        <span className="demo-selectbar-btn">Draft outreach &rarr;</span>
                    </motion.div>
                </>
            )}
        </div>
    );
}

function SceneSimulate({ skip }) {
    return (
        <div className="demo-stack">
            <div className="demo-person-row">
                <MockAvatar name="Priya Raghavan" i={0} size={38} />
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="demo-name">Priya Raghavan</div>
                    <div className="demo-role">Analyst, Rates Trading &middot; J.P. Morgan</div>
                </div>
                <FitRing value={91} size={46} animate={!skip} />
            </div>

            <div className="demo-dims">
                {COMPAT_DIMS.map((d, i) => (
                    <div key={d.label} className="dim-row" style={{ marginBottom: 0 }}>
                        <div className="dim-head">
                            <span>{d.label}</span>
                            <span className="serif-num demo-dim-score">{DIM_SCORES[i]}</span>
                        </div>
                        <div className="dim-track">
                            <motion.div
                                className="dim-fill"
                                style={{ background: d.color }}
                                initial={{ width: skip ? `${DIM_SCORES[i]}%` : 0 }}
                                animate={{ width: `${DIM_SCORES[i]}%` }}
                                transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="dark-spotlight"
                style={{ marginTop: 0 }}
            >
                <p className="spotlight-label">Best course of action</p>
                <p className="demo-spot-lead">
                    Lead with the <span style={{ color: 'var(--accent)', fontWeight: 600 }}>shared course</span> angle.
                </p>
                <p className="demo-spot-sub">
                    Ask how she moved from Geography onto the desk &mdash; not whether there&rsquo;s a spot going.
                </p>
                <div className="demo-spot-foot">
                    <span className="demo-spot-label">Confidence</span>
                    <span className="serif-num demo-spot-band">Moderate &middot; 31&ndash;44%</span>
                </div>
            </motion.div>
        </div>
    );
}

function SceneDraft({ skip }) {
    const { shown, done } = useTypewriter(EMAIL_BODY, { speed: 17, delay: 500, skip });

    const CHECKS = [
        { ok: true, label: 'Reads like you, not like AI' },
        { ok: true, label: 'Asks for time, not a job' },
        { ok: false, label: 'Trim one sentence — it runs slightly long' },
    ];

    return (
        <div className="demo-stack">
            <div className="demo-email">
                <div className="demo-email-head">
                    <span className="demo-email-field">
                        To: <strong>priya.raghavan@jpmorgan.com</strong>
                    </span>
                    <span className="demo-email-field">
                        Subject: <strong>Geography &rarr; rates desk, and how you did it</strong>
                    </span>
                </div>
                <div className="demo-email-body">
                    {shown}
                    {!done && <span className="cursor-blink">|</span>}
                </div>
            </div>

            {done && (
                <div>
                    {CHECKS.map((c, i) => (
                        <motion.div
                            key={c.label}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.16 }}
                            className="demo-check"
                        >
                            <span style={{ color: c.ok ? '#16a34a' : 'var(--amber)' }}>
                                {c.ok ? '✓' : '✦'}
                            </span>
                            {c.label}
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="demo-send-row"
                    >
                        <span className="demo-send-label">Send from</span>
                        <span className="provider-btn"><OutlookLogo size={14} /> Outlook</span>
                        <span className="provider-btn"><GmailLogo size={14} /> Gmail</span>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function SceneTrack({ skip }) {
    return (
        <div className="demo-stack">
            <div className="stage-pipe" style={{ marginTop: 0 }}>
                {STAGE_META.map((s, i) => (
                    <motion.div
                        key={s.key}
                        initial={{ opacity: skip ? 1 : 0, y: skip ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

            {[
                { title: 'Priya replied', badge: 'Next move', sub: 'She offered Thursday — confirm and send two questions' },
                { title: 'Tom opened, no reply', badge: null, sub: 'Day 6 — nudge once, then leave it' },
            ].map((r, i) => (
                <motion.div
                    key={r.title}
                    initial={{ opacity: skip ? 1 : 0, x: skip ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.16, duration: 0.45 }}
                    className="mini-inbox-card"
                >
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="mini-inbox-name">
                            {r.title}
                            {r.badge && <span className="inbox-badge">{r.badge}</span>}
                        </div>
                        <div className="mini-inbox-sum">{r.sub}</div>
                    </div>
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: skip ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95 }}
                className="demo-auto"
            >
                <span className="demo-auto-dot" />
                Auto mode on &middot; follow-ups sending without you
            </motion.div>
        </div>
    );
}

const SCENE_VIEWS = {
    search: SceneSearch,
    simulate: SceneSimulate,
    draft: SceneDraft,
    track: SceneTrack,
};

export default function HeroDemo() {
    const ref = useRef(null);
    // `once: false` so the loop actually stops once the hero scrolls away.
    const inView = useInView(ref, { amount: 0.25 });
    const reduced = useReducedMotion();
    const [index, setIndex] = useState(0);
    // Background tabs get their timers throttled to ~1s, which would let a
    // scene advance before its typewriter finished and leave a half-drawn
    // frame waiting for you. Stop the loop instead while the tab is hidden.
    const [visible, setVisible] = useState(() => !document.hidden);

    useEffect(() => {
        const onChange = () => setVisible(!document.hidden);
        document.addEventListener('visibilitychange', onChange);
        return () => document.removeEventListener('visibilitychange', onChange);
    }, []);

    const playing = inView && visible && !reduced;

    useEffect(() => {
        if (!playing) return;
        const t = setTimeout(
            () => setIndex((i) => (i + 1) % SCENES.length),
            SCENES[index].ms,
        );
        return () => clearTimeout(t);
    }, [index, playing]);

    const active = SCENES[index];
    const Scene = SCENE_VIEWS[active.key];

    return (
        <div ref={ref} className="hero-demo">
            <div className="mockup hero-demo-window">
                <div className="mockup-topbar">
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <span className="demo-dot" style={{ background: '#ff5f56' }} />
                        <span className="demo-dot" style={{ background: '#ffbd2e' }} />
                        <span className="demo-dot" style={{ background: '#27c93f' }} />
                    </div>
                    <span className="mockup-topbar-title">Supercharged</span>
                    <span className="demo-user">You</span>
                </div>

                <div className="demo-nav">
                    {['Discover', 'Outreach', 'Tracking'].map((tab) => {
                        // Search and Simulate both live under Discover in the app.
                        const owner = index <= 1 ? 'Discover' : index === 2 ? 'Outreach' : 'Tracking';
                        return (
                            <span key={tab} className={`demo-tab ${tab === owner ? 'active' : ''}`}>
                                {tab}
                            </span>
                        );
                    })}
                </div>

                <div className="hero-demo-body">
                    <motion.div
                        key={`${active.key}-${playing}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35 }}
                        className="hero-demo-scene"
                    >
                        <Scene skip={reduced} />
                    </motion.div>
                </div>
            </div>

            <div className="demo-captions" aria-hidden="true">
                {SCENES.map((s, i) => (
                    <div key={s.key} className={`demo-caption ${i === index ? 'active' : ''}`}>
                        <span className="demo-caption-bar">
                            {i === index && playing && (
                                <motion.span
                                    className="demo-caption-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: s.ms / 1000, ease: 'linear' }}
                                />
                            )}
                        </span>
                        {s.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
