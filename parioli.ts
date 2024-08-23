/**
 * Pattern Generator
 *
 * @author Takuto Yanagida
 * @version 2024-08-23
 */

import { Dice } from 'src/dice';

const colorPairs = [
	['RoyalBlue', 'Pink'],
	['DarkSalmon', 'MidnightBlue'],
	['RoyalBlue', 'MidnightBlue'],
	['DarkSalmon', 'Pink'],
];

export const colorPairSize = colorPairs.length;

const shapeTypes = [
	(ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.arc(-5, -5, 10, 0, Math.PI / 2);
		ctx.lineTo(-5, -5);
		ctx.closePath();
	},
	(ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.arc(-5, -5, 5, 0, Math.PI / 2);
		ctx.lineTo(-5, -5);
		ctx.closePath();
	},
	(ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.arc(-5, 0, 5, -Math.PI / 2, Math.PI / 2);
		ctx.closePath();
	},
	(ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.rect(-5, -5, 5, 10);
	},
	(ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.moveTo(-5, -5);
		ctx.lineTo(-2.5, -5);
		ctx.arc(-2.5, -2.5, 2.5, -Math.PI / 2, Math.PI / 2);
		ctx.lineTo(-5, 0);
		ctx.closePath();
	},
	(ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.moveTo(-5, -5);
		ctx.lineTo(5, -5);
		ctx.lineTo(-5, 5);
		ctx.closePath();
	},
];

export const shapeTypeSize = shapeTypes.length;

export function drawRotCells(d: Dice, ctx: CanvasRenderingContext2D, cwo: number, cho: number, cw: number, ch: number, w: number, h: number) {
	const rs = [d.rand(3), d.rand(3)];
	const sts = [d.rand(shapeTypeSize - 1), d.rand(shapeTypeSize - 1), d.rand(shapeTypeSize - 1)];
	const cps = [d.rand(colorPairSize - 1), d.rand(colorPairSize - 1), d.rand(colorPairSize - 1)];

	ctx.save();
	for (let n = 0; n < 4; n += 1) {
		ctx.save();
		ctx.translate(cwo, cho);
		ctx.scale(cw / 10, ch / 10);
		drawCell(ctx, rs[0], sts[0], cps[0]);
		ctx.restore();

		ctx.save();
		ctx.translate(cwo, cho + ch);
		ctx.scale(cw / 10, ch / 10);
		drawCell(ctx, rs[1], sts[1], cps[1]);
		ctx.restore();

		ctx.translate(w, h);
		ctx.rotate(Math.PI);

		ctx.rotate(Math.PI / 2);
		ctx.translate(0, -h);
	}
	ctx.restore();
	ctx.translate(w / 2, h / 2);
	ctx.scale(cw / 10, ch / 10);
	drawCell(ctx, rs[2], sts[2], cps[2]);
}

export function drawRandomCells(d: Dice, ctx: CanvasRenderingContext2D, cwo: number, cw: number, cho: number, ch: number) {
	for (let t = 0; t < 3; t += 1) {
		for (let s = 0; s < 3; s += 1) {
			ctx.save();
			ctx.translate(cwo + cw * s, cho + ch * t);
			ctx.scale(cw / 10, ch / 10);

			const r = d.rand(3);
			const st = d.rand(shapeTypeSize - 1);
			const cp = d.rand(colorPairSize - 1);

			drawCell(ctx, r, st, cp);
			ctx.restore();
		}
	}
}

function drawCell(ctx:CanvasRenderingContext2D, rot: number, type: number, color: number) {
	ctx.save();

	ctx.fillStyle = colorPairs[color][0];
	ctx.fillRect(-5, -5, 10, 10);

	ctx.fillStyle = colorPairs[color][1];
	ctx.rotate(rot * Math.PI / 2);
	shapeTypes[type](ctx);
	ctx.fill();

	ctx.restore();
}
