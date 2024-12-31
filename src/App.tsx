import React, { useState } from "react";
import booksData from "./booksData.json";
import "./App.css";
import { CategoryGroup } from "./CategoryGroup";
import AddBook from "./AddBook";

interface Book {
  id: number;
  title: string;
  author: { firstName: string; lastName: string };
  year: number;
}

interface BooksState {
  [category: string]: Book[];
}

const App: React.FC = () => {
  const [books, setBooks] = useState<BooksState>(booksData);
  const [searchQuery, setSearchQuery] = useState("");

  const deleteBook = (id: number, category: string) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };
      updatedBooks[category] = updatedBooks[category].filter(
        (book) => book.id !== id
      );

      if (updatedBooks[category].length === 0) {
        delete updatedBooks[category];
      }

      return updatedBooks;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredBooks = Object.entries(books).reduce(
    (acc, [category, books]) => {
      const matchingBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery) ||
          `${book.author.firstName} ${book.author.lastName}`
            .toLowerCase()
            .includes(searchQuery)
      );

      if (matchingBooks.length > 0) {
        acc[category] = matchingBooks;
      }

      return acc;
    },
    {} as BooksState
  );

  return (
    <div className="app-container">
      <AddBook updateBooks={setBooks} />
      <input
        type="text"
        placeholder="Search by title or author..."
        className="search-input"
        value={searchQuery}
        onChange={handleSearch}
      />
      <h1>Book Categories</h1>
      <div className="categories-container">
        {Object.entries(filteredBooks).map(([category, books]) => (
          <CategoryGroup
            key={category}
            category={category}
            books={books}
            deleteBook={deleteBook}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
