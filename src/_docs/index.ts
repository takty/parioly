/**
 * Script for Sample
 *
 * @author Takuto Yanagida
 * @version 2024-08-24
 */

import 'klales/klales.min.css';
import * as Parioly from '../../parioly';

document.addEventListener('DOMContentLoaded', () => {
	const hash = document.querySelector('#hash') as HTMLInputElement;
	const run = document.querySelector('#run') as HTMLButtonElement;
	const can = document.querySelector('canvas') as HTMLCanvasElement;

	if (can && run && hash) {
		const ctx = can.getContext('2d') as CanvasRenderingContext2D;

		run.addEventListener('click', () => {
			Parioly.drawRandomly(ctx, hash.value);
			// Parioly.drawRegularly(ctx, hashStr.value);
		});
		run.click();
	}
});
