import { motion } from 'framer-motion';

export default function Privacy() {
    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
    const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

    return (
        <>
            <div className="section-divider"></div>

            <div className="section-bg">
                <div className="section" style={{ paddingTop: '110px', paddingBottom: '110px' }}>

                    <div className="privacy-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <h2 className="privacy-main-headline" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '40px', color: '#0f0e0d', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                            Your data, your rules.
                        </h2>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}
                        className="privacy-cards-grid"
                    >

                        {/* Encrypted */}
                        <motion.div variants={item}>
                            <div className="data-card" style={{ background: 'linear-gradient(145deg, #e878b8 0%, #d050c8 15%, #a040e0 30%, #7838f0 48%, #9060e8 62%, #c888f0 78%, #e0a8f8 92%, #f0c0e0 100%)' }}>
                                <div className="data-card-mesh" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(255,160,200,0.5) 0%, transparent 45%), radial-gradient(ellipse at 80% 60%, rgba(100,40,240,0.4) 0%, transparent 45%), radial-gradient(ellipse at 50% 80%, rgba(200,120,255,0.3) 0%, transparent 40%)' }}></div>
                                <div className="data-card-noise"></div>
                                <div className="data-card-text">
                                    <p className="data-card-label">Your mailbox</p>
                                    <p className="data-card-desc">Emails send from your own Outlook or Gmail account, over OAuth. We never hold your password.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* No Selling */}
                        <motion.div variants={item}>
                            <div className="data-card" style={{ background: 'linear-gradient(155deg, #48d8b0 0%, #28b898 12%, #189878 28%, #307858 45%, #586848 58%, #888850 72%, #b0a848 85%, #90c870 100%)' }}>
                                <div className="data-card-mesh" style={{ background: 'radial-gradient(ellipse at 40% 25%, rgba(80,240,200,0.35) 0%, transparent 45%), radial-gradient(ellipse at 70% 65%, rgba(60,120,40,0.35) 0%, transparent 45%), radial-gradient(ellipse at 20% 75%, rgba(0,180,140,0.25) 0%, transparent 40%)' }}></div>
                                <div className="data-card-noise"></div>
                                <div className="data-card-text">
                                    <p className="data-card-label">No data selling</p>
                                    <p className="data-card-desc">We earn from subscriptions, never surveillance. Your CV and your drafts stay yours.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Control */}
                        <motion.div variants={item}>
                            <div className="data-card" style={{ background: 'linear-gradient(140deg, #2848c8 0%, #3860e0 14%, #5878e8 28%, #8888d0 42%, #c89858 56%, #f0a840 68%, #e88830 80%, #d07840 92%, #f0b868 100%)' }}>
                                <div className="data-card-mesh" style={{ background: 'radial-gradient(ellipse at 75% 30%, rgba(255,180,60,0.4) 0%, transparent 42%), radial-gradient(ellipse at 25% 55%, rgba(40,70,220,0.4) 0%, transparent 45%), radial-gradient(ellipse at 55% 80%, rgba(200,140,60,0.25) 0%, transparent 40%)' }}></div>
                                <div className="data-card-noise"></div>
                                <div className="data-card-text">
                                    <p className="data-card-label">Nothing sends itself</p>
                                    <p className="data-card-desc">Every draft waits for your approval, and anyone we surface can ask never to be contacted again.</p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </>
    );
}
