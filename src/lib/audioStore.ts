
import { writable } from "svelte/store";

export const audio = writable<HTMLAudioElement | null>(null);
export const isPlaying = writable(false);
