import pandacss from '@pandacss/vite';
import { realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
// `@acme/ds/recipes` → <ds>/styled-system/recipes/index.js, so its parent is the package's outdir.
const dsOutdir = realpathSync(path.resolve(path.dirname(require.resolve('@acme/ds/recipes')), '..'));
const appOutdir = realpathSync(fileURLToPath(new URL('./styled-system', import.meta.url)));

// The package imports its runtime by relative path (`../styled-system/recipes`), which no
// alias can match. Redirect any import that lands in the package's outdir to the app's.
function redirectDesignSystemRuntime() {
  return {
    name: 'redirect-design-system-runtime',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer || !source.startsWith('.')) return null;
      if (importer.startsWith(dsOutdir + path.sep)) return null;
      const target = path.resolve(path.dirname(importer), source);
      if (target !== dsOutdir && !target.startsWith(dsOutdir + path.sep)) return null;
      const redirected = path.join(appOutdir, path.relative(dsOutdir, target));
      return this.resolve(redirected, importer, { ...options, skipSelf: true });
    }
  };
}

export default defineConfig({
  plugins: [redirectDesignSystemRuntime(), pandacss()],
  // Pre-bundling skips plugin resolveId hooks, so keep the package out of it.
  optimizeDeps: { exclude: ['@acme/ds'] }
});
