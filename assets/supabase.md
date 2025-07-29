# Supabase Integration for notes_frontend

This frontend connects directly to Supabase for all CRUD operations (create, edit, delete, view, search notes).

## Configuration

Set the following environment variables in `.env`:

- `REACT_APP_SUPABASE_URL`: The URL of your Supabase project
- `REACT_APP_SUPABASE_KEY`: The public (anon) key for your Supabase project

Used in `src/supabaseClient.js` to initialize the client.

## Notes Table Requirements

The backend must provide a `notes` table with at least these fields:

- `id` (integer, PK, autoincrement)
- `title` (string)
- `content` (string or text)
- `folder` (string, nullable)
- `updated_at` (timestamp, updated when note is edited)

## Usage

All note CRUD/search operations use Supabase; no separate backend API required.

If deploying a new instance, make sure Supabase project and table match this schema.
