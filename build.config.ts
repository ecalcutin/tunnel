import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  outDir: 'build',
  outExtension: () => {
    return { js: '.js' };
  },
  onSuccess: 'echo Build completed successfully!',
});
