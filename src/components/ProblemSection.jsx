import { motion } from 'framer-motion';

/**
 * The problem, told as the thing students actually feel: not "outreach is
 * inefficient" but "I cannot get near the people who decide".
 *
 * The four stages are the manual workflow, and they map one to one onto the
 * four spokes in the hero. Naming the replacement under each stage sets up the
 * sections below without explaining them yet.
 */

const STAGES = [
    {
        n: '01',
        doing: 'Find someone worth emailing',
        pain: 'You work through LinkedIn, the alumni list and whoever your society has contacts for, one profile at a time. An evening goes, and you still are not sure any of them are the right person.',
        swap: 'Search',
    },
    {
        n: '02',
        doing: 'Guess whether they will care',
        pain: 'Nothing tells you who is actually likely to write back. The long shot gets the same careful hour as the person who would have replied that afternoon.',
        swap: 'Simulate',
    },
    {
        n: '03',
        doing: 'Write it cold, and hope',
        pain: 'An hour on a message that still lands like the other four hundred in their inbox, because you had nothing specific to open on and no idea what usually works.',
        swap: 'Draft',
    },
    {
        n: '04',
        doing: 'Wait, then lose the thread',
        pain: 'No reply and no reason why. The follow-up that would have roughly doubled your odds slips, because it lives in your head and nowhere else.',
        swap: 'Track',
    },
];

export default function ProblemSection() {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };

    const item = {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div className="section-bg">
            <div className="section" style={{ paddingTop: '104px', paddingBottom: '104px' }}>

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="pain-head"
                >
                    <p className="sec-label" style={{ textAlign: 'center' }}>The real problem</p>
                    <h2 className="pain-headline">
                        You cannot out-apply <span className="gradient-num">a name in the room</span>.
                    </h2>
                    <p className="pain-sub">
                        The people who could actually change this for you are not hypothetical. The analyst who sat exactly where you are sitting two years ago. The alum who would happily give you fifteen minutes and tell you what the interview is really testing. They exist, they are reachable, and almost nobody finds them.
                    </p>
                    <p className="pain-sub pain-sub-tight">
                        So you go back to the portal, send the same CV into a pile of eight thousand, and wait to be told no by an automated email in February.
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="flow-lead"
                >
                    And if you do try to reach them, this is the week that follows.
                </motion.p>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-90px' }}
                    className="flow"
                >
                    {STAGES.map((st) => (
                        <motion.div key={st.n} variants={item} className="glass-card flow-step">
                            <span className="flow-num">{st.n}</span>
                            <h3 className="flow-doing">{st.doing}</h3>
                            <p className="flow-pain">{st.pain}</p>
                            <div className="flow-swap">
                                <span className="flow-swap-label">Supercharged does this</span>
                                <span className="flow-swap-name">{st.swap}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: '-60px' }}
                    className="flow-foot"
                >
                    Four jobs, none of which is the conversation you actually wanted. Supercharged takes all four, and hands you back the last one.
                </motion.p>
            </div>
        </div>
    );
}
