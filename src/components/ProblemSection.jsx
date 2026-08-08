import { motion } from 'framer-motion';

export default function ProblemSection() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const cross = { width: '20px', height: '20px', background: 'rgba(220,38,38,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontSize: '11px', flexShrink: 0 };
    const tick = { width: '20px', height: '20px', background: 'rgba(74,222,128,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: '11px', flexShrink: 0 };
    const row = { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' };
    const lastRow = { display: 'flex', alignItems: 'flex-start', gap: '12px' };
    const text = { fontFamily: 'var(--font-body)', fontSize: '15px', color: '#4a4744', lineHeight: 1.4 };

    return (
        <div className="section-bg">
            <div className="section" style={{ paddingTop: '100px', paddingBottom: '100px' }}>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="scroll-hidden"
                    style={{ textAlign: 'center' }}
                >
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--label-color)', textTransform: 'uppercase', marginBottom: '24px' }}>
                        The problem with breaking in
                    </p>
                    <h2 className="problem-headline" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '52px', color: '#0f0e0d', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: '900px', margin: '0 auto' }}>
                        Applications get you <span className="gradient-num">ranked</span>.<br />
                        Conversations get you <span className="gradient-num">remembered</span>.
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#4a4744', maxWidth: '520px', margin: '20px auto 0', lineHeight: 1.7 }}>
                        Portals rank you against thousands of near-identical CVs. Fifteen minutes with someone already on the desk changes which pile you land in &mdash; and almost nobody knows how to get that call.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '64px' }}
                    className="problem-grid-new"
                >

                    <motion.div variants={item} className="glass-card" style={{ padding: '36px' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--label-color)', textTransform: 'uppercase', marginBottom: '20px' }}>
                            The Old Way
                        </p>
                        <div style={row}>
                            <span style={cross}>&#10005;</span>
                            <span style={text}>Same portal, same CV, same eight thousand applicants</span>
                        </div>
                        <div style={row}>
                            <span style={cross}>&#10005;</span>
                            <span style={text}>Cold LinkedIn DMs to people who never open them</span>
                        </div>
                        <div style={row}>
                            <span style={cross}>&#10005;</span>
                            <span style={text}>&ldquo;Happy to chat!&rdquo; &mdash; and then the thread dies</span>
                        </div>
                        <div style={lastRow}>
                            <span style={cross}>&#10005;</span>
                            <span style={text}>No idea whether your email landed well or badly</span>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="glass-card" style={{ padding: '36px' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--label-color)', textTransform: 'uppercase', marginBottom: '20px' }}>
                            With Supercharged
                        </p>
                        <div style={row}>
                            <span style={tick}>&#10003;</span>
                            <span style={text}>Say the season, role and firms in plain English</span>
                        </div>
                        <div style={row}>
                            <span style={tick}>&#10003;</span>
                            <span style={text}>It finds the alumni and analysts actually inside them</span>
                        </div>
                        <div style={row}>
                            <span style={tick}>&#10003;</span>
                            <span style={text}>Each email calibrated to their read and your voice</span>
                        </div>
                        <div style={lastRow}>
                            <span style={tick}>&#10003;</span>
                            <span style={text}>Sent from your inbox, tracked through to the offer</span>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '12px 16px', marginTop: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#d97706', fontSize: '12px' }}>&#10022;</span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontStyle: 'italic', color: 'rgba(0,0,0,0.35)', flex: 1 }}>
                                Spring week at J.P. Morgan, Sales &amp; Trading...
                            </span>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
