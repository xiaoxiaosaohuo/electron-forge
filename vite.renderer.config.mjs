import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config.mjs';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'renderer'>} */
  const forgeEnv = env;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';
  console.log("name",name)
  /** @type {import('vite').UserConfig} */
  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [react() ,pluginExposeRenderer(name),],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  };
});
