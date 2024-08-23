/**
 * Script for Sample
 *
 * @author Takuto Yanagida
 * @version 2024-08-23
 */

import 'klales/klales.min.css';
import { DeterministicDice } from '../dice';
import { hash } from '../hash';
import * as Parioli from '../../parioli';

document.addEventListener('DOMContentLoaded', () => {
	const hashStr = document.querySelector('#hash') as HTMLInputElement;
	const run = document.querySelector('#run') as HTMLButtonElement;
	const can = document.querySelector('canvas') as HTMLCanvasElement;

	if (!hashStr || !run || !can) return;

	const ctx = can.getContext('2d') as CanvasRenderingContext2D;
	const w = can.width;
	const h = can.height;

	const cw = w / 3;
	const ch = h / 3;
	const cwo = cw / 2;
	const cho = ch / 2;

	run.addEventListener('click', () => {
		const d = new DeterministicDice(hash(hashStr.value));

		// Parioli.drawRotCells(d, ctx, cwo, cho, cw, ch, w, h);
		Parioli.drawRandomCells(d, ctx, cwo, cw, cho, ch);
	});
	run.click();
});
