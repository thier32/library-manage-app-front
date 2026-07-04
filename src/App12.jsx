import React, { useState } from 'react';

// 1. MAIN APP COMPONENT
export default function LibraryApp() {
  const [currentView, setCurrentView] = useState('books');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <nav style={{ width: '250px', background: '#2c3e50', color: '#fff', padding: '20px' }}>
        <h2>Library Admin</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li onClick={() => setCurrentView('books')} style={navItemStyle}>📚 Books Management</li>
          <li onClick={() => setCurrentView('members')} style={navItemStyle}>👥 Members Management</li>
          <li onClick={() => setCurrentView('loans')} style={navItemStyle}>🔄 Loans & Borrowing</li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', background: '#f8f9fa' }}>
        {currentView === 'books' && <BookManager />}
        {currentView === 'members' && <MemberManager />}
        {currentView === 'loans' && <LoanManager />}
      </main>
    </div>
  );
}

// 2. BOOKS MANAGEMENT VIEW
function BookManager() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780261102217', available: true }
  ]);

  return (
    <div>
      <h2>Books Management</h2>
      <button style={btnStyle}>+ Add New Book</button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.available ? '🟢 Available' : '🔴 Borrowed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 3. MEMBERS MANAGEMENT VIEW
function MemberManager() {
  return (
    <div>
      <h2>Members Management</h2>
      <button style={btnStyle}>+ Register New Member</button>
      <p>Manage library cardholders, contact info, and membership status here.</p>
    </div>
  );
}

// 4. LOANS (EMPRUNTS) MANAGEMENT VIEW
function LoanManager() {
  return (
    <div>
      <h2>Loans & Borrowing</h2>
      <button style={btnStyle}>🔄 New Loan (Check Out)</button>
      <p>Track which member borrowed what book, due dates, and handle returns.</p>
    </div>
  );
}

// Basic Inline Styles for clarity
const navItemStyle = { padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #34495e' };
const btnStyle = { padding: '10px 15px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '10px', textAlign: 'left' };