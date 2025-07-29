import React, { useState } from 'react';
import './App.css';

import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { useNotes } from './hooks/useNotes';

/**
 * PUBLIC_INTERFACE
 * Main App component for the Notes app.
 * Implements the UI layout (navbar, sidebar, main content),
 * connects to Supabase, and provides all core features.
 */
function App() {
  const [theme, setTheme] = useState('light');
  // Search state and folder/tag selection
  const [search, setSearch] = useState('');
  const [activeFolder, setActiveFolder] = useState('All');
  // UI state
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Custom note operations hook
  const { notes, folders, loading, createNote, updateNote, deleteNote } = useNotes(activeFolder, search);

  // Set document theme for light/dark
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSelectNote = note => {
    setIsCreating(false);
    setSelectedNote(note);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedNote(null);
  };

  const handleSaveNote = async note => {
    if (isCreating) {
      await createNote({ ...note, folder: activeFolder === 'All' ? null : activeFolder });
      setIsCreating(false);
    } else if (selectedNote) {
      await updateNote(selectedNote.id, {
        title: note.title,
        content: note.content
      });
    }
    setSelectedNote(null);
  };

  const handleDeleteNote = async id => {
    await deleteNote(id);
    if (selectedNote && selectedNote.id === id) setSelectedNote(null);
  };

  const handleSearch = val => {
    setSearch(val);
    setSelectedNote(null);
    setIsCreating(false);
  };

  const handleSelectFolder = folder => {
    setActiveFolder(folder);
    setSelectedNote(null);
    setIsCreating(false);
  };

  // Responsive padding for sidebar
  const sidebarWidth = 180;
  const topbarHeight = 60;

  return (
    <div className="App" style={{ minHeight: '100vh', background: '#fafbfd' }}>
      <TopBar onSearch={handleSearch} searchValue={search} />
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        onSelectFolder={handleSelectFolder}
      />
      <button
        style={{
          position: 'fixed',
          right: 30,
          top: topbarHeight + 14,
          background: '#ff9800',
          color: '#fff',
          padding: '11px 22px',
          border: 'none',
          borderRadius: 7,
          fontWeight: 600,
          fontSize: 16,
          zIndex: 98,
          boxShadow: '0 4px 16px #ff980027',
          cursor: 'pointer',
        }}
        onClick={handleCreateNew}
        aria-label="Create new note"
      >
        + New Note
      </button>
      <button
        className="theme-toggle"
        onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{
          top: 18,
          right: 28,
          zIndex: 300,
          position: 'fixed'
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      {/* Layout: Sidebar, Main Area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          marginTop: topbarHeight,
          minHeight: `calc(100vh - ${topbarHeight}px)`,
        }}
      >
        <div style={{ width: sidebarWidth, minWidth: sidebarWidth }} />
        {/* Main content area */}
        <main
          style={{
            flex: 1,
            padding: '36px 2vw 24px 2vw',
            marginLeft: sidebarWidth,
            background: '#fff',
            minHeight: `calc(100vh - ${topbarHeight}px)`,
            boxSizing: 'border-box',
            transition: 'background 0.23s',
          }}
          data-testid="notes-main"
        >
          {loading ? (
            <div style={{ color: '#1976d2', fontWeight: 600, margin: '64px 0', textAlign: 'center', fontSize: 20 }}>
              Loading notes...
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 36, alignItems: 'stretch', flexWrap: 'wrap' }}>
              <section style={{ flex: '0 0 280px', maxWidth: 440, minWidth: 200 }}>
                <NoteList
                  notes={notes}
                  onSelect={handleSelectNote}
                  onDelete={handleDeleteNote}
                  selectedId={selectedNote && !isCreating ? selectedNote.id : null}
                />
              </section>
              <section style={{ flex: 1, minWidth: 200, maxWidth: 850 }}>
                {isCreating ? (
                  <NoteEditor
                    note={{ title: '', content: '' }}
                    onSave={handleSaveNote}
                    isNew
                    onCancel={() => setIsCreating(false)}
                  />
                ) : selectedNote ? (
                  <NoteEditor
                    note={selectedNote}
                    onSave={handleSaveNote}
                    isNew={false}
                  />
                ) : (
                  <div
                    style={{
                      marginTop: 48,
                      color: '#aaa',
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}
                  >
                    Select or create a note to edit
                  </div>
                )}
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
