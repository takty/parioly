/**
 * Simple Hash
 *
 * @author Takuto Yanagida
 * @version 2024-08-23
 */

/**
 * Computes a hash value for a string using the DJB2 hash function.
 * @param str The string for which the hash value is to be calculated.
 * @returns The computed hash value as an integer.
 */
export function hash(str: string): number {
	let hash = 5381; // Initial value, commonly used prime number in DJB2

	for (let i = 0; i < str.length; i++) {
		hash = (hash * 33) ^ str.charCodeAt(i);
	}

	// Mask to fit the hash value into a 32-bit unsigned integer
	return hash >>> 0; // Return as a 32-bit unsigned integer
}
