import React, { useState, useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, isNew, onCancel }) {
  /**
   * Editor for creating/editing note.
   * @param note {object} - Note object.
   * @param onSave {function} - Save handler, receives updated note.
   * @param isNew {boolean} - Indicates if creating a new note.
   * @param onCancel {function} - Cancel handler, only for creating.
   */
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const contentRef = useRef(null);

  useEffect(() => {
    if (isNew && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isNew]);

  useEffect(() => {
    setTitle(note ? note.title : '');
    setContent(note ? note.content : '');
  }, [note]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title && !content) return;
    onSave({ ...note, title, content });
  };

  return (
    <form onSubmit={handleSave} style={{ padding: 0, display: 'flex', flexDirection: 'column', gap: 15 }}>
      <input
        data-testid="note-title-input"
        style={{
          fontSize: 22,
          fontWeight: 700,
          border: 'none',
          background: 'transparent',
          outline: 'none',
          color: '#1976d2',
          margin: '12px 0 2px 0'
        }}
        type="text"
        placeholder="Title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus={isNew}
      />
      <textarea
        data-testid="note-content-input"
        ref={contentRef}
        style={{
          minHeight: 180,
          borderRadius: 8,
          fontSize: 16,
          padding: 13,
          border: '1.1px solid #e0e0e0',
          background: '#fffaf5',
          color: '#282c34',
          outline: 'none',
          resize: 'vertical'
        }}
        placeholder="Write your note..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 3 }}>
        <button
          type="submit"
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '7px 20px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer'
          }}
          aria-label="Save"
        >
          {isNew ? 'Create' : 'Save'}
        </button>
        {isNew && (
          <button
            type="button"
            style={{
              background: '#fff',
              color: '#1976d2',
              border: '1px solid #1976d2',
              borderRadius: 6,
              padding: '7px 16px',
              fontSize: 15,
              cursor: 'pointer'
            }}
            aria-label="Cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteEditor;
