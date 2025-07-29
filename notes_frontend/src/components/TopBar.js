import React from 'react';

// PUBLIC_INTERFACE
function TopBar({ onSearch, searchValue }) {
  /**
   * Top navigation bar with app title and search box.
   * @param {function} onSearch - Handler for search input changes.
   * @param {string} searchValue - Current search value.
   */
  return (
    <header
      style={{
        width: '100%',
        height: 60,
        background: '#1976d2',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 200,
      }}
      data-testid="notes-topbar"
    >
      <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: 1 }}>
        Notes App
      </span>
      <input
        type="text"
        value={searchValue}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search notes..."
        style={{
          borderRadius: 6,
          padding: '7px 14px',
          border: 'none',
          width: 220,
          background: '#f5f5f5',
          color: '#333',
          outline: 'none',
          fontSize: 15,
        }}
        aria-label="Search notes"
      />
    </header>
  );
}

export default TopBar;
