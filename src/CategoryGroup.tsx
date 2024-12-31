import React from "react";
import { BookContainer } from "./BookContainer";
import "./CategoryGroup.css";

interface Book {
  id: number;
  title: string;
  author: { firstName: string; lastName: string };
  year: number;
}

interface CategoryGroupProps {
  category: string;
  books: Book[];
  deleteBook: (id: number, category: string) => void;
}

export const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  books,
  deleteBook,
}) => {
  return (
    <div className="category-group">
      <h2 className="category-title">{category}</h2>
      <div className="books-container">
        {books.map((book) => (
          <BookContainer
            key={book.id}
            book={book}
            deleteBook={(id) => deleteBook(id, category)}
          />
        ))}
      </div>
    </div>
  );
};
