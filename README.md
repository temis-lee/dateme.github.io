# Love Letter

A playful romantic single-page web app with a yes/no interaction, date-picking flow, animated hearts, confetti, sound, and a final celebration screen.

## Features

- Heart rain background animation
- Flirty yes/no interaction with escalating reactions
- Date selection modal with custom plans
- Intro screen with a heart zoom transition
- Celebration screen after confirming the date
- Romantic melody and confetti effects
- Email draft generator for sending a response
- Responsive mobile-friendly layout

## Hosting model

this is a static website, 

This project does not use a backend, database, or build step. It is made of plain HTML, CSS, and JavaScript, which GitHub Pages can serve directly from a repository.

## Project structure

- `index.html` — page structure
- `src/style.css` — visual styling and animations
- `src/index.js` — app logic, interactivity, and audio
- `deploy-surge.bat` — Windows helper for Surge deployment
- `README.md` — project documentation

## Run locally

Because this is a static HTML app, you can open it directly in a browser or serve it locally.

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Local server

```bash
cd "C:\Users\ADMIRAL\Desktop\loveLetter"
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deploy to GitHub Pages

This project can be hosted on GitHub Pages without modification.

### Recommended setup

1. Push the project to a GitHub repository.
2. In the repository, open Settings.
3. Go to Pages.
4. Set the source to:
   - Branch: main
   - Folder: /root
5. Save.
6. GitHub Pages will provide a live URL for the site.

### Notes

- There is no build step required.
- The page works as-is from the repository root.
- This is ideal for static front-end projects like this one.

## Customize the page

The main personalization points are in `src/index.js`:

- `crushName` — name shown in the experience
- `myEmail` — email address used for the mail draft
- `messages` — text shown when the "No" button is clicked
- `dateCard` entries — update the date labels and plans in `index.html`

## Deploy to Surge

You can also deploy it with Surge if you want a quick preview.

### Option 1: Use the bundled script

On Windows, double-click `deploy-surge.bat`.

### Option 2: Run manually

```bash
cd "C:\Users\ADMIRAL\Desktop\loveLetter"
npx surge .
```

If Surge is not installed yet, run:

```bash
npm install -g surge
```

## Important technical note

- The email button opens the default mail app with a pre-filled draft using `mailto:`.
- Real email sending requires a backend email service or a hosted form/email API.
- The app is intentionally lightweight and does not require a build system.

## License

This project is for personal or demo use and is not currently distributed under a formal package license.
