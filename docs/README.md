# Love Letter

A playful romantic single-page web app with a yes/no interaction, date-picking flow, animated hearts, confetti, sound, and a final celebration screen.

## Features

- Heart rain background animation
- Flirty yes/no interaction with escalating reactions
- Date selection modal with custom plans
- Celebration screen after confirming the date
- Romantic melody and confetti effects
- Email draft generator for sending a response
- Responsive mobile-friendly layout

## Project structure

- `index.html` — page structure
- `src/style.css` — visual styling and animations
- `src/index.js` — app logic, interactivity, and audio
- `deploy-surge.bat` — Windows helper for Surge deployment

## Run locally

Because this is a static HTML app, you can open the project in a browser directly:

1. Open `index.html` in your browser, or
2. Serve the folder locally with a simple static server:

```bash
cd "C:\Users\ADMIRAL\Desktop\loveLetter"
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Customize the page

The main personalization points are in `src/index.js`:

- `crushName` — name shown in the experience
- `myEmail` — email address used for the mail draft
- `messages` — text shown when the "No" button is clicked
- `selected date` options — update the date card labels and plans

## Deploy to Surge

You can deploy the app using the included helper script or by running Surge directly.

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

## Notes

- The email button opens the default mail app with a pre-filled draft using `mailto:`.
- Real email sending requires a backend email service or a hosted form/email API.
- The app is intentionally lightweight and does not require a build system.

## License

This project is for personal or demo use and is not currently distributed under a formal package license.
