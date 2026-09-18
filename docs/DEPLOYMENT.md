# Deployment Guide

This project is a static front-end app and can be deployed with any basic static hosting service.

## Local preview

```bash
cd "C:\Users\ADMIRAL\Desktop\loveLetter"
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Surge deployment

### Prerequisites

Install Surge globally:

```bash
npm install -g surge
```

### Deploy

From the project folder:

```bash
cd "C:\Users\ADMIRAL\Desktop\loveLetter"
surge .
```

You will be prompted for a subdomain, then Surge will give you a live preview URL.

### Windows helper script

A helper script is included at:

- `deploy-surge.bat`

Double-click it to deploy from Windows without typing the command manually.

## Alternative hosts

This project can also be uploaded to:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

Because it is plain HTML, CSS, and JavaScript, there is no build step required.
