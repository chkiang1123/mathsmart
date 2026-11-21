# MathSmart Interactive — Book 4A

Interactive HKDSE Book 4A mathematics study platform for **S.K.H. Bishop Baker Secondary School** featuring LaTeX step-by-step analysis, animated coordinate graphs, and Similar Question Drill Mode.

## Chapters Included

- **Chapter 3 — Equations of Straight Lines** (183 questions across Ex 3.1, Ex 3.2, Ex 3.3, Check Yourself, Revision 3, MCQs, Exam Zone)
- **Chapter 4 — Functions and Graphs** (248 questions across Ex 4.1–4.4, Check Yourself, Revision 4, MCQs, Exam Zone)
- **Reserved Slots** for Chapters 1, 2, 5, and 6

## GitHub Pages Deployment

Either option works out of the box once pushed to GitHub:

1. **GitHub Actions (Automatic)**
   - Go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
   - Pushing to `main` or `master` runs `.github/workflows/deploy-pages.yml` and publishes the single-file site automatically.
2. **Branch `/docs` Folder (Zero-Build / Instant)**
   - Go to **Settings → Pages → Build and deployment → Source → Deploy from a branch**.
   - Select branch **`main`** and folder **`/docs`**, then click **Save**.
   - `docs/index.html` is a self-contained single-file build that works offline and under any repository subpath (for example, `https://<username>.github.io/mathsmart/`).

## Local Development

```bash
npm install
npm run dev
```

Build the production single-file bundle (updates `dist/index.html` and `docs/index.html`):

```bash
npm run build
```
