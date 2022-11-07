import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import vue from '@vitejs/plugin-vue';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        // NodeGlobalsPolyfillPlugin(),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  plugins: [
    vue(),
    crx({ manifest }),
  ],
});
