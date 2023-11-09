import { writable } from 'svelte/store';

// Initial state is false (user not logged in)
export const IsLoggedIn = writable(false);