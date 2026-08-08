/**
 * Small pieces of the real Supercharged product UI, reproduced for the
 * marketing mockups so the site shows the app rather than an idea of it.
 *
 * Ported from supercharged-app:
 *   components/ui/ScoreRing.tsx   -> FitRing
 *   app/app/discover/page.tsx     -> TierPill, OverlapChip, GRADIENTS
 *
 * The plain data (compat dimensions, pipeline stages) lives in
 * ../lib/appMockData so this file only exports components.
 */

import { motion } from 'framer-motion';

/** compatColor from components/ui/ScoreRing.tsx. */
function compatColor(value) {
    if (value >= 85) return '#22A85A';
    if (value >= 70) return '#E8A94A';
    return '#6B6B6B';
}

/** The compatibility ring the app draws next to every result.
 *  Pass `animate` to sweep the arc in, as the app does on mount. */
export function FitRing({ value, size = 46, animate = false }) {
    const stroke = 4;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const Arc = animate ? motion.circle : 'circle';
    const sweep = animate
        ? { initial: { strokeDashoffset: c }, animate: { strokeDashoffset: c * (1 - value / 100) }, transition: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
        : { strokeDashoffset: c * (1 - value / 100) };
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(15,14,13,0.07)" strokeWidth={stroke} />
                <Arc
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={compatColor(value)}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={c}
                    {...sweep}
                />
            </svg>
            <span
                className="serif-num"
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: size * 0.3,
                    color: '#0f0e0d',
                }}
            >
                {value}
            </span>
        </div>
    );
}

/** Tiering from lib/pipeline/tiering.ts, labelled as TIER_STYLE does. */
const TIERS = {
    top: { label: 'Top match', cls: 'tier-top' },
    strong: { label: 'Strong match', cls: 'tier-strong' },
    relevant: { label: 'Relevant', cls: 'tier-relevant' },
};

export function TierPill({ tier }) {
    const t = TIERS[tier] ?? TIERS.relevant;
    return <span className={`tier-pill ${t.cls}`}>{t.label}</span>;
}

/** Dot colours from components/ui/Pill.tsx (DOT_COLORS). */
const DOT_COLORS = ['#5B8CF5', '#3DAA82', '#9B7CF6', '#E8A94A'];

export function OverlapChip({ children, i = 0 }) {
    return (
        <span className="overlap-chip">
            <span className="overlap-dot" style={{ background: DOT_COLORS[i % DOT_COLORS.length] }} />
            {children}
        </span>
    );
}

/** Avatar gradients from components/ui/Avatar.tsx. */
const AVATAR_GRADIENTS = [
    'linear-gradient(160deg, #8B7FE8 0%, #5B4FCF 100%)',
    'linear-gradient(160deg, #5FBCA7 0%, #1F7A6A 100%)',
    'linear-gradient(160deg, #E89B85 0%, #B35A3D 100%)',
    'linear-gradient(160deg, #7BA0D4 0%, #3A609E 100%)',
];

/** Initials on a gradient — the app has no photos for most people. */
export function MockAvatar({ name, i = 0, size = 34 }) {
    const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: size * 0.36,
                flexShrink: 0,
            }}
        >
            {initials}
        </div>
    );
}

/** Outlook / Gmail marks, copied from components/ui/BrandLogos.tsx. */
export function OutlookLogo({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32">
            <rect x="14" y="5" width="15" height="22" rx="1.5" fill="#1066b5" />
            <rect x="14" y="5" width="15" height="11" rx="1.5" fill="#32a9e7" />
            <path d="M14 14h15v3.5l-7.5 4.5L14 17.5Z" fill="#135298" opacity=".6" />
            <rect x="3" y="8" width="15" height="16" rx="2" fill="#0f78d4" />
            <ellipse cx="10.5" cy="16" rx="4" ry="4.6" fill="none" stroke="#fff" strokeWidth="2.4" />
        </svg>
    );
}

export function GmailLogo({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32">
            <rect x="3" y="7" width="26" height="19" rx="2.5" fill="#fff" />
            <path d="M5.5 26H8V13.5L3 9.9v13.6A2.5 2.5 0 0 0 5.5 26Z" fill="#4285f4" />
            <path d="M24 26h2.5a2.5 2.5 0 0 0 2.5-2.5V9.9l-5 3.6Z" fill="#34a853" />
            <path d="M8 13.5 3 9.9V9a2 2 0 0 1 3.2-1.6L8 8.9Z" fill="#c5221f" />
            <path d="M24 13.5l5-3.6V9a2 2 0 0 0-3.2-1.6L24 8.9Z" fill="#fbbc04" />
            <path d="M8 8.9l8 5.8 8-5.8V13.5l-8 5.8-8-5.8Z" fill="#ea4335" />
        </svg>
    );
}
