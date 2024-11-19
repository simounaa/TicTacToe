import { websocketServer } from './server.js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), {
		name: 'websocketServer',
		configureServer(server) {
			websocketServer(server.httpServer);
		}
	}]
});
