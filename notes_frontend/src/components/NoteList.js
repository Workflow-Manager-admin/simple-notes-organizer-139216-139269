import React from 'react';

// PUBLIC_INTERFACE
function NoteList({ notes, onSelect, onDelete, selectedId }) {
  /** 
   * Renders the list of notes.
   * @param {Array} notes - List of note objects.
   * @param {Function} onSelect - Callback when note is selected.
   * @param {Function} onDelete - Callback when note is to be deleted.
   * @param {string|number} selectedId - ID of currently selected note.
   */
  if (notes.length === 0) {
    return (
      <div style={{ color: '#888', padding: 32, fontStyle: 'italic' }} data-testid="no-notes-msg">
        No notes found.
      </div>
    );
  }
  return (
    <div>
      {notes.map(note => (
        <div
          data-testid={`note-list-item-${note.id}`}
          key={note.id}
          style={{
            background: note.id === selectedId ? '#e3edfa' : '#fafbfd',
            padding: '12px 14px',
            marginBottom: 8,
            borderRadius: 8,
            boxShadow: note.id === selectedId ? '0 1px 5px #1976d249' : '0 0.5px 2px #aaa1',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: note.id === selectedId ? '2px solid #1976d2' : '1px solid #ececec',
            fontWeight: note.id === selectedId ? 600 : 500,
            transition: 'all 0.18s',
            outline: 'none'
          }}
          onClick={() => onSelect(note)}
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter') onSelect(note); }}
        >
          <span style={{flex:1, color:'#222'}}>📝 {note.title || 'Untitled'}</span>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#ff9800',
              fontSize: 19,
              cursor: 'pointer',
              fontWeight: 700,
              marginLeft: 12
            }}
            aria-label="Delete note"
            title="Delete"
            onClick={e => { e.stopPropagation(); onDelete(note.id); }}
          >
            &#x2715;
          </button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
