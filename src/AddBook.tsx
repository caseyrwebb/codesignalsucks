import React, { useState } from "react";
import "./AddBook.css";

interface Book {
  title: string;
  author: { firstName: string; lastName: string };
  year: number;
  id: number;
}

interface AddBookProps {
  updateBooks: React.Dispatch<React.SetStateAction<Record<string, Book[]>>>;
}

const AddBook: React.FC<AddBookProps> = ({ updateBooks }) => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !firstName || !lastName || !year) {
      alert("fill out all fields.");
      return;
    }

    const newBook = {
      title: title,
      author: {
        firstName: firstName,
        lastName: lastName,
      },
      year: parseInt(year),
    };

    const category = newBook.author.lastName[0].toUpperCase();

    updateBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };
      if (!updatedBooks[category]) {
        updatedBooks[category] = [];
      }
      updatedBooks[category].push({
        ...newBook,
        id: Date.now(),
      });
      return updatedBooks;
    });

    setTitle("");
    setFirstName("");
    setLastName("");
    setYear("");
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Author First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Author Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
