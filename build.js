import { build } from 'esbuild';

await build({
	entryPoints : ['parioli.ts'],
	outdir      : 'dist',
	outExtension: { '.js': '.min.js', '.css': '.min.css' },
	minify      : true,
	sourcemap   : true,
	bundle      : true,
	format      : "esm",
});
