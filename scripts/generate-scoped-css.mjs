/**
 * Generates a scoped version of 98.css by prefixing all selectors with `.win98`.
 * This prevents the styles from leaking into the rest of the app.
 *
 * Run with: node scripts/generate-scoped-css.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCOPE = '.win98';

const cssPath = resolve(__dirname, '../node_modules/98.css/dist/98.css');
const outPath = resolve(__dirname, '../src/styles/win98-scoped.ts');
const cssOutPath = resolve(__dirname, '../src/styles/win98.css');
const extrasPath = resolve(__dirname, '../src/styles/extras.css');

const css = readFileSync(cssPath, 'utf-8');

/** PostCSS plugin that prefixes every rule selector with `.win98` */
const scopePlugin = () => ({
  postcssPlugin: 'scope-98css',
  Rule(rule) {
    // Skip rules inside @keyframes
    if (rule.parent?.type === 'atrule' && rule.parent.name === 'keyframes') return;

    rule.selectors = rule.selectors.map((selector) => {
      // `body` becomes the scope container itself
      if (selector === 'body') return SCOPE;
      // `:root` and `html` stay global — they set CSS variables
      if (selector === ':root' || selector === 'html') return selector;
      return `${SCOPE} ${selector}`;
    });
  },
});
scopePlugin.postcss = true;

const result = await postcss([scopePlugin]).process(css, { from: cssPath });
const extras = readFileSync(extrasPath, 'utf-8');
const combined = `${result.css}\n${extras}`;

mkdirSync(resolve(__dirname, '../src/styles'), { recursive: true });

writeFileSync(
  outPath,
  `// Auto-generated — do not edit manually.
// Re-run \`npm run build:css\` to regenerate after updating 98.css.
export const win98ScopedCSS: string = ${JSON.stringify(combined)};
`,
);

// Plain stylesheet for consumers who want zero-flash SSR: importing this in a
// root layout ships the styles with the document instead of injecting them
// during hydration, which is always a frame too late.
writeFileSync(cssOutPath, `/* Auto-generated \u2014 do not edit manually. Re-run \`npm run build:css\`. */\n${combined}\n`);

console.log(`Scoped CSS written to src/styles/win98-scoped.ts and src/styles/win98.css`);
