import { motion } from 'framer-motion';

/**
 * The problem, as framed in the pitch deck: manual outreach is capped on
 * volume, blind on priority, and silent on feedback — followed by the four
 * disconnected habits students currently patch together.
 */

const PROBLEMS = [
    {
        n: '01',
        title: 'Capped on volume',
        body: 'Every message written by hand puts a hard ceiling on how many people you can ever reach. You manage maybe a hundred a month — and the one contact who would actually change things could be number ten thousand.',
    },
    {
        n: '02',
        title: 'Blind on priority',
        body: 'There is no signal for who is worth the time until you have already spent it. A long shot gets exactly the same effort as the person who would have replied within the hour.',
    },
    {
        n: '03',
        title: 'Silent on feedback',
        body: 'You find out whether it worked only once it has gone. Framing, timing and angle are all guessed blind, so a failed approach gets repeated on the very next attempt.',
    },
];

const HABITS = [
    { label: 'LinkedIn cold messages', fails: ['High volume', 'Low response rate', 'No idea what worked'] },
    { label: 'Society events and panels', fails: ['Barely any one-to-one', 'Capped by the calendar', 'Hard to follow up'] },
    { label: 'Alumni lists and coffee chats', fails: ['One profile at a time', 'No sense of fit first', 'Slow to scale'] },
    { label: 'Spreadsheets and memory', fails: ['Tracked entirely by hand', 'Follow-ups slip', 'No view of the pipeline'] },
];

export default function ProblemSection() {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <div className="section-bg">
            <div className="section" style={{ paddingTop: '100px', paddingBottom: '100px' }}>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-100px' }}
                    style={{ textAlign: 'center' }}
                >
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--label-color)', textTransform: 'uppercase', marginBottom: '24px' }}>
                        The problem with breaking in
                    </p>
                    <h2 className="problem-headline" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '52px', color: '#0f0e0d', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: '860px', margin: '0 auto' }}>
                        Doing it by hand is <span className="gradient-num">capped</span>,{' '}
                        <span className="gradient-num">blind</span> and{' '}
                        <span className="gradient-num">silent</span>.
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#4a4744', maxWidth: '520px', margin: '20px auto 0', lineHeight: 1.7 }}>
                        Applications rank you against thousands of near-identical CVs. Fifteen minutes with someone already on the desk changes which pile you land in &mdash; and almost nobody knows how to get that call.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="problem-triple"
                >
                    {PROBLEMS.map((p) => (
                        <motion.div key={p.n} variants={item} className="glass-card problem-card">
                            <span className="problem-num">{p.n}</span>
                            <h3 className="problem-card-title">{p.title}</h3>
                            <p className="problem-card-body">{p.body}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="habits-block"
                >
                    <p className="habits-lead">
                        Instead you patch together four disconnected habits, none of which talk to each other.
                    </p>
                    <div className="habits-grid">
                        {HABITS.map((h) => (
                            <div key={h.label} className="habit">
                                <p className="habit-label">{h.label}</p>
                                {h.fails.map((f) => (
                                    <p key={f} className="habit-fail">
                                        <span className="habit-x">&#10005;</span> {f}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                    <p className="habits-foot">
                        Hours a week, on activity that rarely turns into a real conversation.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
