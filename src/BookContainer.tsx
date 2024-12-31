import React from "react";
import "./BookContainer.css";

interface Book {
  id: number;
  title: string;
  author: { firstName: string; lastName: string };
  year: number;
}

interface BookContainerProps {
  book: Book;
  deleteBook: (id: number) => void;
}

export const BookContainer: React.FC<BookContainerProps> = ({
  book,
  deleteBook,
}) => {
  return (
    <div className="book-container">
      <h3>{book.title}</h3>
      <p>
        {book.author.firstName} {book.author.lastName} ({book.year})
      </p>
      <button onClick={() => deleteBook(book.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};
