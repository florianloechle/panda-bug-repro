# Panda: design system components lose their styles with an app `prefix` or `hash`

Reproduction for a Panda CSS bug report. Tested with Panda 2.3.0 and 2.4.0.

Run it locally. It doesn't work on StackBlitz: there Panda uses its WASM compiler, which finds no source files
(`panda lib` reports `lib: 0 files`). The bug depends on Panda re-reading the design system's files, so the build
stops with `No fallback source files were available` before it gets that far.

`ds/` is a minimal design system built with `panda lib`. `app/` consumes it through `designSystem` and sets
`prefix: 'app'`.

```sh
npm install
npm run build   # builds ds, then the app with vite build
npm run dev     # the button is unstyled and prints class="button button--size_lg"
```

The app's CSS only has `.app-button` rules. Remove `prefix: 'app'` from `app/panda.config.mjs` and the button is
styled again.

`npm run dev:redirect -w app` keeps the prefix but points the package's `../styled-system` imports at the app's own
`styled-system` (see `app/vite.config.redirect.mjs`). The button is styled again, with `app-button` classes.
