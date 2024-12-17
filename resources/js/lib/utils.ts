import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const ODD_FORMATS = ['decimal', 'fractional', 'moneyline'] as const;
export type OddFormat = (typeof ODD_FORMATS)[number];

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function reduceFraction(
    numerator: number,
    denominator: number,
): [number, number] {
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
}

export function formatOdds(odds: number, format: OddFormat = 'decimal') {
    if (format === 'decimal') {
        return odds.toFixed(2);
    }
    if (format == 'fractional') {
        const fractionalValue = odds - 1;
        const numerator = Math.round(fractionalValue * 1000);
        const denominator = 1000;
        const [reducedNumerator, reducedDenominator] = reduceFraction(
            numerator,
            denominator,
        );
        return `${reducedNumerator}/${reducedDenominator}`;
    }
    if (format === 'moneyline') {
        if (odds >= 2) return `+${((odds - 1) * 100).toFixed(0)}`;
        return `-${(100 / (odds - 1)).toFixed(0)}`;
    }
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
