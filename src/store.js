import {writable, derived} from 'svelte/store';

export const name1 = writable('world');

export const greeting = derived(name1, ($name1) => `Hello ${$name1}!`);

export const countStore = writable(0);