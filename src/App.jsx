import React, { useEffect, useState } from 'react';
import MemberView from './components/Members';
import BookView from './components/Books';
import BorrowView from './components/Borrow';
import { styles } from './components/Style';
import { bookService } from './services/BookService';
import { memberService } from './services/MemberService';
import { borrowService } from './services/BorrowService';

// ==========================================
// 1. COMPOSANT PRINCIPAL (CONTENEUR & ÉTAT)
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('books'); // Gestion de la navigation ('books', 'members', 'loans')
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loans, setLoans] = useState([]);

  const fetchData = async (serviceMethod,criteria, stateSetter, errorLabel) => {
    try {
      const response = await serviceMethod(criteria);
      stateSetter(response.result || []);
    } catch (err) {
      console.error(`Impossible de charger les ${errorLabel}`, err);
    }
  };

  const postData = async (serviceMethod,data,errorLabel) => {
    try{
        const response = await serviceMethod(data);

    }
    catch(err){
       console.error(`Impossible de charger les ${errorLabel}`, err);
    }
  }


  const loadBooks = () => 
    {
      const criteria = {};
      fetchData(bookService.getBookPaged,criteria, setBooks, "livres");
    }
  const loadMembers = () =>
    {
     const criteria = {};     
     fetchData(memberService.getMemberPaged,criteria, setMembers, "membres");
     }
  const loadBorrows = () =>
    {
      const criteria = {};
      fetchData(borrowService.getBorrowPaged,criteria, setLoans, "emprunts");
    } 

  

  useEffect(() => {
    loadMembers();
    loadBooks();
    loadBorrows();
  }, []);

  

  // Fonctions d'outils pour ajouter des données
  const addBook = (newBook) => 
    {
      postData(bookService.createBook,newBook,"livres");   
      loadBooks();
    }
  
  const addMember = (newMember) => {
      postData(memberService.createMember,newMember,"membres");   
      loadMembers();
  }
  
  const addLoan = (newLoan) => {
      postData(borrowService.createBorrow,newLoan,"emprunts");   
      loadBorrows();
  };

  const returnBook = (loanId, bookId) => {
    // Remettre le livre disponible
    setBooks(books.map(b => b.id === bookId ? { ...b, available: true } : b));
    // Clôturer l'emprunt
    setLoans(loans.map(l => l.id === loanId ? { ...l, active: false } : l));
  };

  return (
    <div style={styles.appContainer}>
      {/* Barre de navigation latérale */}
      <nav style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>📚 BiblioTech</h2>
        <ul style={styles.navList}>
          <li onClick={() => setCurrentView('books')} style={{...styles.navItem, backgroundColor: currentView === 'books' ? '#34495e' : 'transparent'}}>📖 Livres</li>
          <li onClick={() => setCurrentView('members')} style={{...styles.navItem, backgroundColor: currentView === 'members' ? '#34495e' : 'transparent'}}>👥 Membres</li>
          <li onClick={() => setCurrentView('loans')} style={{...styles.navItem, backgroundColor: currentView === 'loans' ? '#34495e' : 'transparent'}}>🔄 Emprunts</li>
        </ul>
      </nav>

      {/* Contenu de la vue actuelle */}
      <main style={styles.mainContent}>
        {currentView === 'books' && <BookView books={books} onAddBook={addBook} />}
        {currentView === 'members' && <MemberView members={members} onAddMember={addMember} />}
        {currentView === 'loans' && <BorrowView loans={loans} books={books} members={members} onAddLoan={addLoan} onReturnBook={returnBook} />}
      </main>
    </div>
  );
}


// ==========================================
// 3. COMPOSANT : GESTION DES MEMBRES
// ==========================================


// ==========================================
// 5. STYLES CSS-IN-JS (Pour un rendu propre sans fichier CSS externe)
// ==========================================


const styleSheet = document.createElement("style");
styleSheet.innerText = `
  table th, table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #e1e8ed; }
  table th { background-color: #f8f9fa; color: #34495e; }
`;
document.head.appendChild(styleSheet);