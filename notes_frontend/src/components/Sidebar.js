import React from 'react';

// PUBLIC_INTERFACE
function Sidebar({ folders, activeFolder, onSelectFolder }) {
  /**
   * Sidebar with (optional) folder/tags navigation.
   * @param {array} folders - List of folder/tag names.
   * @param {string} activeFolder - Currently active folder/tag.
   * @param {function} onSelectFolder - Handler for folder change.
   */
  return (
    <aside
      style={{
        minWidth: 160,
        width: 180,
        background: '#f5f7fa',
        borderRight: '1px solid #e0e0e0',
        paddingTop: 80,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99,
        transition: 'background 0.3s',
        fontSize: 16,
      }}
      data-testid="notes-sidebar"
    >
      <div style={{ margin: '0 1rem' }}>
        <div style={{ marginBottom: 12, fontWeight: 600, color: '#424242', letterSpacing: 1 }}>
          Folders
        </div>
        <div>
          {folders.map(fld => (
            <div
              data-testid={`sidebar-folder-${fld}`}
              key={fld}
              tabIndex={0}
              style={{
                padding: '9px 8px',
                background: fld === activeFolder ? '#e3edfa' : 'none',
                color: fld === activeFolder ? '#1976d2' : '#424242',
                fontWeight: fld === activeFolder ? 700 : 500,
                borderRadius: 6,
                marginBottom: 2,
                cursor: 'pointer',
                outline: 'none',
                border: fld === activeFolder ? `1.5px solid #1976d2` : '1.5px solid transparent',
                transition: 'all 0.15s',
              }}
              onClick={() => onSelectFolder(fld)}
              onKeyDown={e => { if (e.key === 'Enter') onSelectFolder(fld); }}
            >
              {fld}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
