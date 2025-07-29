# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design, minimalistic
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify
- **Full Supabase Integration**: Create, edit, delete, view, and search notes with Supabase backend

## Getting Started

### Supabase Configuration

You must create the following environment variables in your `.env` file (see `.env.example` template):

```
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_KEY=your-supabase-anon-key
```
You can find these in the Supabase project settings.

### Running the App

In the project directory, you can run:

#### `npm install`
Installs dependencies including Supabase JS client.

#### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the app for production to the `build` folder.

---

## App Structure & Main Features

- Top navigation bar (search, branding, theme toggle)
- Sidebar for folders/tags (auto-generated from notes' folder field)
- Central area: grid layout—list of notes and editor.
- Create, delete, edit, and search notes (saved to Supabase 'notes' table).
- Responsive design for desktop and mobile.

### Supabase Table Schema
The app expects a `notes` table with at least:
- **id** (int, PK)
- **title** (string)
- **content** (string)
- **folder** (string, nullable)
- **updated_at** (datetime)

---

## Customization

### Colors

Primary: #1976d2 • Accent: #ff9800 • Secondary: #424242

You can adjust the palette in `src/App.css` or themes.

### Adding New Components

All source code is in `src/`:
- `/components/` (UI building blocks)
- `/hooks/useNotes.js` (Supabase CRUD/data logic)
- `/supabaseClient.js` (sets up Supabase JS client)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
