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
function Screen({ children }) {
    return (
        <div className="tab-screen">
            <div className="tab-screen-bar" aria-hidden="true">
                <span className="tab-dot" style={{ background: '#ff5f56' }} />
                <span className="tab-dot" style={{ background: '#ffbd2e' }} />
                <span className="tab-dot" style={{ background: '#27c93f' }} />
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
                <Screen>
                    <div className="ts-query">
                        <span className="ts-query-text">Spring week at J.P. Morgan, Sales &amp; Trading, Oxford alumni if possible</span>
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
                <Screen>
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
                            Ask how she moved from Geography onto the desk, not whether there is a spot going.
                        </p>
                    </div>
                </Screen>
            </Section>

            {/* ─── DRAFT ─── */}
            <Section
                id="outreach"
                index="03"
                label="Outreach"
                title="The email you'd have written, with the time you don't have."
                body="Every draft is assembled on the same skeleton, and that skeleton comes from an evidence review of what actually gets replies: length, opening line, the shape of the ask, and when to follow up. Only the personal parts are written fresh, in the voice learned from your own writing sample."
                points={[
                    'Around 100 words, the length replies peak at',
                    'Opens on a real overlap, not on your CV',
                    'One time boxed ask, with the follow-up already queued',
                ]}
            >
                <Screen>
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
                                <span className="demo-email-field">Subject: <strong>Oxford student, quick S&amp;T question</strong></span>
                            </div>
                            {/* Mirrors convex/lib/draft.ts: fixed skeleton, only the
                                hook, interest line and three bullets personalised.
                                House rule, and the app enforces it too: no em dashes. */}
                            <p className="ts-draft-body">
                                Hi Priya,
                                <br /><br />
                                I&rsquo;m Alex, a first-year at Oxford reading Geography, and we overlapped at Christ Church. I&rsquo;ve just taken over the Geography Society speaker series you used to run.
                                <br /><br />
                                Having done a Spring Week at J.P. Morgan I&rsquo;m set on Sales &amp; Trading, and your move from Geography onto rates is the exact path I can&rsquo;t find anyone to explain. I&rsquo;d love to ask you:
                            </p>
                            <ul className="ts-draft-bullets">
                                <li>What the first hour on the desk actually looks like</li>
                                <li>Whether Geography helped or hurt you in interviews</li>
                                <li>What you&rsquo;d tell a first-year with a Spring Week and nothing else lined up</li>
                            </ul>
                            <p className="ts-draft-body ts-draft-close">
                                Would you be open to fifteen minutes in the next week or two?
                                <br /><br />
                                Best,<br />Alex
                            </p>
                            <div className="ts-checks">
                                <span className="demo-check"><span style={{ color: '#16a34a' }}>✓</span> 112 words, inside the range replies peak at</span>
                                <span className="demo-check"><span style={{ color: '#16a34a' }}>✓</span> Opens on the shared college, not the ask</span>
                                <span className="demo-check"><span style={{ color: '#16a34a' }}>✓</span> Interest-based ask, time boxed and near term</span>
                                <span className="demo-check"><span style={{ color: 'var(--amber)' }}>✦</span> Follow-up queued for day 5, then once more</span>
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
                <Screen>
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
                        { who: 'Priya Raghavan', i: 0, badge: 'Next move', sum: 'Offered Thursday, confirm and send two questions' },
                        { who: 'Tom Beckett', i: 3, badge: null, sum: 'Opened on day 6, nudge once then leave it' },
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
