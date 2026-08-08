/**
 * Data lifted verbatim from the Supercharged app, kept out of AppMock.jsx so
 * that file only exports components (react-refresh/only-export-components).
 */

/** The five compatibility dimensions scored in convex/compat.ts, with the bar
 *  colours app/app/discover/[id] uses for them. */
export const COMPAT_DIMS = [
    { label: 'Openness', color: '#E8A020' },
    { label: 'Education', color: '#5B8CF5' },
    { label: 'Path overlap', color: '#3DAA82' },
    { label: 'Leverage', color: '#4DA4B4' },
    { label: 'Personal', color: '#9B7CF6' },
];

/** Pipeline stages + dot colours from components/ui/StageBadge.tsx. */
export const STAGE_META = [
    { key: 'sent', label: 'Sent', dot: '#E8A94A' },
    { key: 'opened', label: 'Opened', dot: '#5B8CF5' },
    { key: 'replied', label: 'Replied', dot: '#9B7CF6' },
    { key: 'coffee', label: 'Coffee chat', dot: '#C96B44' },
    { key: 'offer', label: 'Offer', dot: '#E8A020' },
];
