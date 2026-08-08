import { motion } from 'framer-motion';
import { FitRing, GmailLogo, MockAvatar, OutlookLogo, OverlapChip, TierPill } from './AppMock';
import { COMPAT_DIMS, STAGE_META } from '../lib/appMockData';

/**
 * One section per part of the product — Search, Simulate, Draft, Track — in
 * the same order as the hero constellation's spokes. Each pairs the reasoning
 * with a reasonably faithful rendering of the real screen.
 *
 * Sections alternate sides so the page doesn't march down in one column.
 */

const fadeUp = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-90px' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function Section({ id, index, label, title, body, points, flip, children }) {
    return (
        <>
            <div className="section-divider"></div>
            <div className="section-bg" id={id}>
                <div className={`section tab-section ${flip ? 'is-flipped' : ''}`}>
                    <motion.div {...fadeUp} className="tab-copy">
                        <p className="tab-index">{index}</p>
                        <p className="sec-label">{label}</p>
                        <h2 className="tab-title">{title}</h2>
                        <p className="sec-body">{body}</p>
                        <ul className="tab-points">
                            {points.map((p) => (
                                <li key={p}>
                                    <span className="tab-tick">&#10003;</span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="tab-visual">
                        {children}
                    </motion.div>
                </div>
            </div>
        </>
    );
}

/** A faithful-enough frame of the app, in the site's glass skin. */
function Screen({ tab, children }) {
    return (
        <div className="tab-screen">
            <div className="tab-screen-nav">
                {['Discover', 'Outreach', 'Tracking'].map((t) => (
                    <span key={t} className={`demo-tab ${t === tab ? 'active' : ''}`}>{t}</span>
                ))}
                <span className="demo-user">You</span>
            </div>
            <div className="tab-screen-body">{children}</div>
        </div>
    );
}

const PEOPLE = [
    {
        name: 'Priya Raghavan', i: 0, alumni: true, tier: 'top', fit: 91,
        role: 'Analyst, Rates Trading · J.P. Morgan · London',
        chips: ['Same university · Oxford', 'Same course · Geography'],
    },
    {
        name: 'Tom Beckett', i: 3, alumni: false, tier: 'strong', fit: 78,
        role: 'VP, Commodities · J.P. Morgan · London',
        chips: ['Same society · Geography Soc'],
    },
    {
        name: 'Hannah Okafor', i: 1, alumni: true, tier: 'relevant', fit: 66,
        role: 'Associate, Equity Research · J.P. Morgan',
        chips: ['Same city · London'],
    },
];

export default function TabSections() {
    return (
        <>
            {/* ─── SEARCH ─── */}
            <Section
                id="how"
                index="01"
                label="Discover"
                title="Say who you need. In one sentence."
                body="No filters and no boolean search. Supercharged reads your goal and your CV, then researches the open web for real people at the firms you named — building its own picture of each one rather than looking them up in a list someone else compiled."
                points={[
                    'Searches the live web, not a stale directory',
                    'Surfaces alumni, same-course and same-society overlaps',
                    'Ranks by likelihood of replying to you specifically',
                ]}
            >
                <Screen tab="Discover">
                    <div className="ts-query">
                        <span className="ts-query-text">Spring week at J.P. Morgan &mdash; Sales &amp; Trading, Oxford alumni if possible</span>
                        <span className="demo-find-btn">Find</span>
                    </div>
                    <p className="demo-meta" style={{ margin: '12px 0 10px' }}>14 people found &middot; ranked by fit</p>
                    {PEOPLE.map((p) => (
                        <div key={p.name} className="ts-person">
                            <MockAvatar name={p.name} i={p.i} size={34} />
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div className="demo-name">
                                    {p.name}
                                    {p.alumni && <span className="alumni-badge">ALUMNI</span>}
                                </div>
                                <div className="demo-role">{p.role}</div>
                                <div className="demo-chips">
                                    {p.chips.map((c, ci) => <OverlapChip key={c} i={ci}>{c}</OverlapChip>)}
                                </div>
                            </div>
                            <TierPill tier={p.tier} />
                        </div>
                    ))}
                </Screen>
            </Section>

            {/* ─── SIMULATE ─── */}
            <Section
                id="simulate"
                index="02"
                label="Compatibility & simulation"
                title="Find out how it lands, before you send it."
                body="Every match is scored across five dimensions, each with its reason attached. Then Supercharged grounds a persona of the person you're writing to and plays the exchange out repeatedly across two models — so you get the angle that survived rather than the one that sounded good."
                points={[
                    'Five scored dimensions, each with the evidence behind it',
                    'The objection that kept coming up, and how to answer it',
                    'A calibrated confidence band, not a false-precise number',
                ]}
                flip
            >
                <Screen tab="Discover">
                    <div className="ts-person-head">
                        <MockAvatar name="Priya Raghavan" i={0} size={44} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <div className="demo-name" style={{ fontSize: '15px' }}>Priya Raghavan</div>
                            <div className="demo-role">Analyst, Rates Trading &middot; J.P. Morgan</div>
                        </div>
                        <FitRing value={91} size={52} />
                    </div>

                    <div className="ts-dims">
                        {COMPAT_DIMS.map((d, i) => (
                            <div key={d.label} className="dim-row" style={{ marginBottom: 0 }}>
                                <div className="dim-head">
                                    <span>{d.label}</span>
                                    <span className="serif-num demo-dim-score">{[88, 94, 90, 61, 74][i]}</span>
                                </div>
                                <div className="dim-track">
                                    <motion.div
                                        className="dim-fill"
                                        style={{ background: d.color }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${[88, 94, 90, 61, 74][i]}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="dark-spotlight" style={{ marginTop: '16px' }}>
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
                    </div>
                </Screen>
            </Section>

            {/* ─── DRAFT ─── */}
            <Section
                id="outreach"
                index="03"
                label="Outreach"
                title="The email you'd have written, with the time you don't have."
                body="You write one short message during setup. Every draft afterwards borrows your rhythm, your hedges and your sign-off, then gets checked against what actually earns replies. Nothing sends until you approve it, and it goes from your own mailbox."
                points={[
                    'Drafted in your voice, from your own writing sample',
                    'Edit freely — it re-checks what you changed',
                    'Sends via your Outlook or Gmail, never a shared relay',
                ]}
            >
                <Screen tab="Outreach">
                    <div className="ts-mail">
                        <div className="ts-rail">
                            {PEOPLE.concat([{ name: 'Daniel Okonjo', i: 2 }]).map((p, i) => (
                                <div key={p.name} className={`ts-rail-row ${i === 0 ? 'active' : ''}`}>
                                    <MockAvatar name={p.name} i={p.i} size={24} />
                                    <span className="ts-rail-name">{p.name.split(' ')[0]}</span>
                                    {i > 0 && <span className="ts-rail-ok">&#10003;</span>}
                                </div>
                            ))}
                        </div>
                        <div className="ts-draft">
                            <div className="ts-draft-head">
                                <span className="demo-email-field">To: <strong>priya.raghavan@jpmorgan.com</strong></span>
                                <span className="demo-email-field">Subject: <strong>Geography &rarr; rates desk, and how you did it</strong></span>
                            </div>
                            <p className="ts-draft-body">
                                Hi Priya &mdash; I&rsquo;m a first-year geographer at Oxford and I saw you made the same jump onto a rates desk. That path is a bit of a mystery from where I&rsquo;m sitting. If you had fifteen minutes some time I&rsquo;d love to hear how you did it &mdash; totally understand if not.
                                <br /><br />Alex
                            </p>
                            <div className="ts-checks">
                                <span className="demo-check"><span style={{ color: '#16a34a' }}>✓</span> Reads like you, not like AI</span>
                                <span className="demo-check"><span style={{ color: '#16a34a' }}>✓</span> Asks for time, not a job</span>
                                <span className="demo-check"><span style={{ color: 'var(--amber)' }}>✦</span> Runs slightly long &mdash; trim one line</span>
                            </div>
                            <div className="demo-send-row">
                                <span className="demo-send-label">Send from</span>
                                <span className="provider-btn"><OutlookLogo size={14} /> Outlook</span>
                                <span className="provider-btn"><GmailLogo size={14} /> Gmail</span>
                            </div>
                        </div>
                    </div>
                </Screen>
            </Section>

            {/* ─── TRACK ─── */}
            <Section
                id="tracking"
                index="04"
                label="Tracking"
                title="Nothing goes cold because you forgot."
                body="Every thread is followed from sent through to offer. Replies are read and summarised into a next move, follow-ups go out on their own schedule, and the compatibility model gets more honest as real outcomes come back."
                points={[
                    'Sent, opened, replied, coffee chat, offer — all in one view',
                    'Each reply summarised into the next thing to do',
                    'Auto mode runs the follow-ups without you',
                ]}
                flip
            >
                <Screen tab="Tracking">
                    <div className="ts-track-head">
                        <span className="demo-meta" style={{ textAlign: 'left' }}>Network pulse</span>
                        <span className="ts-auto"><span className="demo-auto-dot" /> Auto mode on</span>
                    </div>
                    <div className="stage-pipe" style={{ marginTop: '12px' }}>
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
                    {[
                        { who: 'Priya Raghavan', i: 0, badge: 'Next move', sum: 'Offered Thursday — confirm and send two questions' },
                        { who: 'Tom Beckett', i: 3, badge: null, sum: 'Opened, day 6 — nudge once, then leave it' },
                        { who: 'Hannah Okafor', i: 1, badge: null, sum: 'Follow-up sent automatically this morning' },
                    ].map((r) => (
                        <div key={r.who} className="mini-inbox-card">
                            <MockAvatar name={r.who} i={r.i} size={26} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="mini-inbox-name">
                                    {r.who}
                                    {r.badge && <span className="inbox-badge">{r.badge}</span>}
                                </div>
                                <div className="mini-inbox-sum">{r.sum}</div>
                            </div>
                        </div>
                    ))}
                </Screen>
            </Section>
        </>
    );
}
