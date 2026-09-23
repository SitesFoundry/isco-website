/**
 * Utility functions
 */

type ClassValue = string | number | boolean | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(" ");
}
