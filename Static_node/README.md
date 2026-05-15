# Node Website (Express)

Small Express app that serves static files from the `public` folder.

## Requirements

- [Node.js](https://nodejs.org/) (LTS recommended; includes `npm`)

## Setup

1. Clone or copy this repository into a folder on your machine.

2. Install dependencies:

   ```bash
   npm install
   ```

## Run the server

From the project root (the folder that contains `server.js` and `package.json`):

```bash
node server.js
```

You should see: `Server Running on Port 3000`.

## View the site

Open a browser and go to:

[http://localhost:3000](http://localhost:3000)

The home page is served from `public/index.html`.

## Project layout

| Path | Purpose |
|------|---------|
| `server.js` | Express app; static files from `public` |
| `public/` | HTML, CSS, images, and other static assets |

## Stop the server

In the terminal where it is running, press `Ctrl+C`.
