export const DEPOSIT_PERCENT = 50;

export function depositCents(priceUsd: number) {
  return Math.round(Number(priceUsd) * 100 * (DEPOSIT_PERCENT / 100));
}

export function centsToUsd(cents: number) {
  return cents / 100;
}
