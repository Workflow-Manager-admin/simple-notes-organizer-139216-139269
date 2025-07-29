import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

// PUBLIC_INTERFACE
export function useNotes(activeFolder, search) {
  /**
   * Custom hook to fetch, create, update, delete notes from Supabase.
   * Filters by folder and search term if provided.
   */
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState(['All']);
  const [loading, setLoading] = useState(false);

  // fetch notes from Supabase, optionally filter by folder/tag and search
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('notes').select('*').order('updated_at', { ascending: false });

    // folder is an optional field (category)
    if (activeFolder && activeFolder !== 'All') {
      query = query.eq('folder', activeFolder);
    }
    const { data, error } = await query;
    let noteList = [];
    if (error) {
      setNotes([]);
    } else {
      noteList = data;
      // Filter on search term (title or content contains)
      if (search && search.trim() !== '') {
        noteList = noteList.filter(
          n =>
            (n.title && n.title.toLowerCase().includes(search.toLowerCase())) ||
            (n.content && n.content.toLowerCase().includes(search.toLowerCase()))
        );
      }
      setNotes(noteList);
    }
    // Compute folder list
    const foldersSet = new Set(['All']);
    if (data) {
      data.forEach(note => {
        if (note.folder) foldersSet.add(note.folder);
      });
    }
    setFolders(Array.from(foldersSet));
    setLoading(false);
  // eslint-disable-next-line
  }, [activeFolder, search]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // PUBLIC_INTERFACE
  const createNote = async (note) => {
    const { data, error } = await supabase.from('notes').insert([
      {
        title: note.title,
        content: note.content,
        folder: note.folder || null,
        updated_at: new Date().toISOString(),
      },
    ]).select();
    if (!error) fetchNotes();
    return { data, error };
  };

  // PUBLIC_INTERFACE
  const updateNote = async (id, updatedFields) => {
    const { data, error } = await supabase.from('notes').update({
      ...updatedFields,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select();
    if (!error) fetchNotes();
    return { data, error };
  };

  // PUBLIC_INTERFACE
  const deleteNote = async (id) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (!error) fetchNotes();
    return { error };
  };

  return { notes, folders, loading, createNote, updateNote, deleteNote, fetchNotes };
}
