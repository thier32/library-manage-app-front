import React, { useState, useEffect } from 'react';
import { styles } from './Style';

// ==========================================
// 4. COMPOSANT : GESTION DES EMPRUNTS
// ==========================================
export default function BorrowView({ loans, books, members, onAddLoan, onReturnBook }) {
  const [memberId, setMemberId] = useState('');
  const [bookId, setBookId] = useState('');
  const [returnDate, setReturnDate] = useState('');

  console.log(loans);
  // Filtrer uniquement les livres disponibles pour le formulaire de prêt
  //const availableBooks = books.filter(b => b.available);
  const availableBooks = books;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberId || !bookId || !returnDate) return alert('Veuillez remplir tous les champs');
    
    const loanDate = new Date().toISOString().split('T')[0]; // Date du jour YYYY-MM-DD
    onAddLoan({ memberId, bookId, loanDate, returnDate });
    
    setMemberId(''); setBookId(''); setReturnDate('');
  };

  // Fonctions d'affichage pour lier les ID aux noms réels
  const getBookTitle = (id) => books.find(b => b.bookId === id)?.title || id;
  const getMemberName = (id) => members.find(m => m.memberId === id)?.name || id;

  return (
    <div>
      <h2 style={styles.viewTitle}>Gestion des Emprunts (Prêts & Retours)</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Enregistrer un nouvel Emprunt</h3>
        
        <select style={styles.select} value={memberId} onChange={e => setMemberId(e.target.value)}>
          <option value="">-- Sélectionner le Membre --</option>
          {members.map(m => <option key={m.memberId} value={m.memberId}>{m.name} ({m.memberId})</option>)}
        </select>

        <select style={styles.select} value={bookId} onChange={e => setBookId(e.target.value)}>
          <option value="">-- Sélectionner le Livre à emprunter --</option>
          {availableBooks.map(b => <option key={b.bookId} value={b.bookId}>{b.title}</option>)}
        </select>

        <div style={{marginBottom: '10px'}}>
          <label style={{display: 'block', fontSize: '12px', color: '#7f8c8d'}}>Date de retour prévue :</label>
          <input style={styles.input} type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
        </div>

        <button style={styles.button} type="submit">Valider l'Emprunt</button>
      </form>

      <h3>Historique et En-cours des Prêts</h3>
      <table style={styles.table}>
        <thead>
          <tr><th>ID Prêt</th><th>Membre</th><th>Livre</th><th>Date Emprunt</th><th>Échéance</th><th>Action</th></tr>
        </thead>
        <tbody>
          {loans.map(l => (
            <tr key={l.borrowId}>
              <td>{l.borrowId}</td>
              <td>{getMemberName(l.memberId)}</td>
              <td>{getBookTitle(l.bookId)}</td>
              <td>{l.loanDate}</td>
              <td>{l.returnDueDate}</td>
              <td>
                {l.active ? (
                  <button style={styles.returnBtn} onClick={() => onReturnBook(l.bookId, l.bookId)}>Rendre le livre</button>
                ) : (
                  <span style={{color: '#95a5a6', fontStyle: 'italic'}}>Traité / Rendu</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}