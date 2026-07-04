import React, { useState, useEffect } from 'react';
import { styles } from './Style';

export default function MemberView({ members, onAddMember }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Veuillez remplir tous les champs');
    onAddMember({ name, email });
    setName(''); setEmail('');
  };

  return (
    <div>
      <h2 style={styles.viewTitle}>Gestion des Membres</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Inscrire un Membre</h3>
        <input style={styles.input} type="text" placeholder="Nom complet" value={name} onChange={e => setName(e.target.value)} />
        <input style={styles.input} type="email" placeholder="Adresse Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button style={styles.button} type="submit">Inscrire</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr><th>Nom</th><th>Email</th></tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.memberId}><td>{m.name}</td><td>{m.email}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
