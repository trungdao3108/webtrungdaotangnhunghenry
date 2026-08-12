# Birthday Landing Page

Project Vite + React + TypeScript + Tailwind CSS.

## Cai dat

```bash
npm install
npm run dev
```

## Kiem tra TypeScript

```bash
npm run typecheck
```

## Deploy GitHub Pages

Push project len branch `main`. Workflow `.github/workflows/deploy.yml` se tu
dong kiem tra TypeScript, build thu muc `dist` va deploy len GitHub Pages.

Trong repository GitHub, vao **Settings > Pages** va chon **Source: GitHub
Actions** neu chua bat.

Luu y: project da bo sung `typescript`, `@types/react`, `@types/react-dom` va `tsconfig.json` de VS Code nhan dung JSX `key` va cac type cua React.
