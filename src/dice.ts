/**
 * Dice
 * @author Takuto Yanagida
 * @version 2024-08-23
 */

export class Dice {

	protected r: () => number;

	/**
	 * Make a dice
	 * @constructor
	 */
	constructor() {
		this.r = Math.random;
	}

	/**
	 * Return a random number from min to max
	 * @param {number} min Minimum number
	 * @param {number} max Maximum number
	 * @param {function(number):number=} opt_fn Easing function (optional)
	 * @return {number} A random number
	 */
	random(min: number, max: number, opt_fn: ((arg0: any) => number) | undefined): number {
		if (opt_fn === undefined) {
			return this.r() * (max - min) + min;
		}
		return opt_fn(this.r()) * (max - min) + min;
	}

	/**
	 * Returns a random number from 0 to n_min or from min to max
	 * @param {number} n_min An integer or a minimum integer
	 * @param {number=} opt_max Maximum integer
	 * @return {number} A random integer
	 */
	rand(n_min: number, opt_max: number | null = null): number {
		if (null === opt_max) {
			return Math.floor(this.r() * (n_min + 1));
		}
		return Math.floor(this.r() * (opt_max + 1 - n_min) + n_min);
	}

	/**
	 * Occur with probability specified in percent
	 * @param {number} percent Percent
	 * @return {boolean} Whether it occurs
	 */
	likely(percent: number): boolean {
		return Math.floor(this.r() * (100 + 1)) <= percent;
	}

}

/**
 * Deterministic Dice
 * @author Takuto Yanagida
 * @version 2024-08-23
 */
export class DeterministicDice extends Dice {

	private seed: number;
	private stack: number[] = [];
	private generator: Xorshift32;

	/**
	 * Make a dice
	 */
	constructor(seed = Math.random()) {
		super();
		this.seed = 0 | (seed * (seed < 1 ? 1000 : 1));
		this.generator = new Xorshift32(this.seed);
		this.r = () => this.generator.random();
	}

	/**
	 * Reset
	 */
	reset() {
		this.generator = new Xorshift32(this.seed);
		this.r = () => this.generator.random();
	}

	/**
	 * Save the current state
	 */
	save() {
		this.stack.push(this.generator.seed());
	}

	/**
	 * Restore the previous state
	 */
	restore() {
		const seed = this.stack.pop() as number;
		this.generator = new Xorshift32(seed);
		this.r = () => this.generator.random();
	}

}

class Xorshift32 {

	private y: number;

	constructor(seed: number) {
		this.y = seed;
	}

	seed(): number {
		return this.y;
	}

	random(): number {
		let y = this.y;
		y = y ^ (y << 13);
		y = y ^ (y >> 17);
		y = y ^ (y << 15);
		this.y = y;
		return (y + 2147483648) / 4294967295;
	}

}
