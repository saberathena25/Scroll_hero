# Scroll-Driven Hero Section

A hero section where a hand-drawn car drives down the page as you scroll. Built with Next.js, Tailwind CSS and GSAP ScrollTrigger.

- **Live page:** _add your GitHub Pages link here_
- **Repository:** _add your GitHub repo link here_

## What it does

1. **Load animation (time-based, plays once).** The letter-spaced headline rises in letter by letter, the road fades up, the car slides in and switches its headlights on, then the four stats arrive one after another and count up from zero.
2. **Scroll animation (progress-based).** The hero pins to the screen. Scroll progress drives the car down the road (`translateY`) with a slight steering sway. `scrub: 1` adds a second of smoothing so motion catches up to your scroll instead of snapping. The headline letters drift apart, the progress bar fills, and each stat lights up the moment the car passes it.
3. **Small human touches.** The car leans toward your cursor. Click it and it honks (with a speech bubble and a quiet two-note beep). A handwritten hint rides along with it. A short personal note follows the hero.

## Performance notes

- Only `transform` and `opacity` are animated. No layout properties change during scroll.
- Distances are measured once (and again on real resize), never inside the scroll handler.
- The intro, scroll drive and cursor tilt each animate their own wrapper element, so they never fight over the same transform.
- `prefers-reduced-motion` skips the intro and the pinned scroll animation and shows the final state.
- No images and no web fonts: the car is inline SVG and the fonts are system stacks.

## Make it yours

Everything written on the page lives in [`content.js`](./content.js): your name, the headline, the tagline, the hint, the honk messages, the stats and the closing note.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds a static export and publishes it. Your site appears at `https://<your-username>.github.io/<repo-name>/`.

The workflow sets `BASE_PATH` to the repository name so assets load correctly from the sub-path.

To test the exported site locally with the same base path:

```bash
BASE_PATH=/your-repo-name npm run build
npx serve out
```

## Stack

HTML, CSS and JavaScript via Next.js (React), Tailwind CSS and GSAP (ScrollTrigger).
