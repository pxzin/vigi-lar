// uno.config.ts
import { defineConfig } from 'unocss';
import presetWind4 from '@unocss/preset-wind4';
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';

// suas cores semânticas
const colors = ['primary', 'success', 'error', 'warning', 'info'] as const;
export type ColorKey = (typeof colors)[number];

export default defineConfig({
	presets: [
		presetWind4(),
		presetIcons({
			collections: {
				mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default)
			},
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetWebFonts({
			provider: 'google',
			fonts: { sans: 'Roboto', mono: 'Fira Code' },
			processors: createLocalFontProcessor({
				cacheDir: 'node_modules/.cache/unocss/fonts',
				fontAssetsDir: 'public/assets/fonts',
				fontServeBaseUrl: '/assets/fonts'
			})
		})
	],
	theme: {
		colors: {
			primary: { DEFAULT: '#3b82f6', dark: '#1e40af', light: '#93c5fd' },
			success: { DEFAULT: '#10b981', dark: '#047857', light: '#6ee7b7' },
			error: { DEFAULT: '#ef4444', dark: '#b91c1c', light: '#fca5a5' },
			warning: { DEFAULT: '#f59e0b', dark: '#d97706', light: '#fde68a' },
			info: { DEFAULT: '#06b6d4', dark: '#0e7490', light: '#67e8f9' }
		},
		fontFamily: {
			sans: 'Roboto, sans-serif',
			mono: 'Fira Code, monospace'
		}
	},
	shortcuts: {
		btn: 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
		'btn-solid': 'btn bg-primary hover:bg-primary-dark text-white',
		'btn-outline': 'btn border border-primary text-primary hover:bg-primary-light',
		'btn-ghost': 'btn text-primary hover:bg-primary-light',
		'alert-success': 'bg-success-light text-success-dark border border-success px-4 py-2 rounded',
		'alert-error': 'bg-error-light   text-error-dark   border border-error   px-4 py-2 rounded',
		'alert-warning': 'bg-warning-light text-warning-dark border border-warning px-4 py-2 rounded',
		'alert-info': 'bg-info-light    text-info-dark    border border-info    px-4 py-2 rounded'
	},
	safelist: [
		...colors.map((c) => `bg-${c}`),
		...colors.map((c) => `hover:bg-${c}-dark`),
		...colors.map((c) => `bg-${c}-light`),
		...colors.map((c) => `border-${c}`),
		...colors.map((c) => `text-${c}`)
	],
	rules: [
		[
			/^text-(.+)$/,
			([, c], { theme }) => {
				const v = theme.colors?.[c as ColorKey];
				if (!v) return;
				return { color: v.DEFAULT };
			}
		],
		[
			/^bg-(.+)-dark$/,
			([, c], { theme }) => {
				const v = theme.colors?.[c as ColorKey]?.dark;
				if (!v) return;
				return { 'background-color': v };
			}
		],
		[
			/^bg-(.+)-light$/,
			([, c], { theme }) => {
				const v = theme.colors?.[c as ColorKey]?.light;
				if (!v) return;
				return { 'background-color': v };
			}
		],
		[
			/^bg-(.+)$/,
			([, c], { theme }) => {
				const v = theme.colors?.[c as ColorKey];
				if (!v) return;
				return { 'background-color': v.DEFAULT };
			}
		],
		[
			/^border-(.+)$/,
			([, c], { theme }) => {
				const v = theme.colors?.[c as ColorKey];
				if (!v) return;
				return { 'border-color': v.DEFAULT };
			}
		]
	]
});
