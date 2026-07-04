import React, { useState, useEffect } from 'react';
import { styles } from './Style';


// ==========================================
// 2. COMPOSANT : GESTION DES LIVRES
// ==========================================
export default function BookView({ books, onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !isbn) return alert('Veuillez remplir tous les champs');
    onAddBook({ title, author, isbn });
    setTitle(''); setAuthor(''); setIsbn(''); // Reset du formulaire
  };

  return (
    <div>
      <h2 style={styles.viewTitle}>Gestion des Livres</h2>
      
      {/* Formulaire */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Ajouter un Livre</h3>
        <input style={styles.input} type="text" placeholder="Titre du livre" value={title} onChange={e => setTitle(e.target.value)} />
        <input style={styles.input} type="text" placeholder="Auteur" value={author} onChange={e => setAuthor(e.target.value)} />
        <input style={styles.input} type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
        <button style={styles.button} type="submit">Ajouter</button>
      </form>

      {/* Liste */}
      <table style={styles.table}>
        <thead>
          <tr><th>Titre</th><th>Auteur</th><th>ISBN</th><th>Statut</th></tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.bookId}>
              <td>{b.title}</td><td>{b.author}</td><td>{b.isbn}</td>
              <td style={{color: b.available ? '#2ecc71' : '#e74c3c', fontWeight: 'bold'}}>{b.available ? 'Disponible' : 'Emprunté'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}