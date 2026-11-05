# Lules Multiservices — redesign v2

Independent Astro website created from scratch. The original project in the parent directory is not required at runtime.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

All business content is sourced from `src/data/content.json`, copied from the original project's data source. `src/data/site.ts` only adapts that JSON to the V2 presentation and route structure.

The current information architecture treats professional cleaning as the first service category. Add future multiservice categories to `src/data/content.json` only after their names, scope and real business details are confirmed.
