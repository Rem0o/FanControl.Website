/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
	interface Window {
		gtag?: (command: string, ...args: unknown[]) => void;
	}
}

export {};
