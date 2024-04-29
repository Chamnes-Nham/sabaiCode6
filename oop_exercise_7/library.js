"use strict";
class Book {
    constructor(title, author, genre, isbn, available = true) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isbn = isbn;
        this.available = available;
    }
}
class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`${book.title} by ${book.author} has been added to ${this.name}.`);
    }
    removeBook(identifier) {
        const index = this.books.findIndex(book => book.title === identifier || book.isbn === identifier);
        if (index !== -1) {
            console.log(`${this.books[index].title} has been removed from ${this.name}.`);
            this.books.splice(index, 1);
        }
        else {
            console.log(`Book with title or ISBN ${identifier} not found in ${this.name}.`);
        }
    }
    searchBooks(searchTerm, searchBy) {
        return this.books.filter(book => book[searchBy].toLowerCase().includes(searchTerm.toLowerCase()));
    }
    displayAvailableBooks() {
        console.log(`Available books in ${this.name}:`);
        this.books.filter(book => book.available)
            .forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} by ${book.author} (${book.genre}) - ISBN: ${book.isbn}`);
        });
    }
    borrowBook(bookTitle, user) {
        const book = this.books.find(book => book.title === bookTitle && book.available);
        if (book) {
            book.available = false;
            user.borrowed_books.push(book);
            console.log(`${user.name} has borrowed ${book.title}.`);
        }
        else {
            console.log(`Sorry, ${bookTitle} is not available.`);
        }
    }
    returnBook(bookTitle, user) {
        const index = user.borrowed_books.findIndex(book => book.title === bookTitle);
        if (index !== -1) {
            user.borrowed_books.splice(index, 1);
            const book = this.books.find(book => book.title === bookTitle);
            if (book) {
                book.available = true;
                console.log(`${user.name} has returned ${book.title}.`);
            }
        }
        else {
            console.log(`${user.name} does not have ${bookTitle} on loan.`);
        }
    }
}
class User {
    constructor(name) {
        this.name = name;
        this.borrowed_books = [];
    }
    borrowBook(book, library) {
        library.borrowBook(book.title, this);
    }
    returnBook(book, library) {
        library.returnBook(book.title, this);
    }
    viewBorrowedBooks() {
        if (this.borrowed_books.length === 0) {
            console.log("You haven't borrowed any books yet.");
        } else {
            console.log("Books borrowed by", this.name + ":");
            this.borrowed_books.forEach(book => {
                console.log("Title:", book.title);
                console.log("Author:", book.author);
                console.log("---");
            });
        }
    }
}

const library = new Library("Main Library");
const book1 = new Book("To Kill a Mockingbird", "Harper Lee", "Classic", "978-0-06-112008-4");
const book2 = new Book("1984", "George Orwell", "Dystopian", "978-0-452-28423-4");
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", "978-0-7432-7356-5");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// const searchTerm = "978-0-06-112008-4"; // Search term
// const searchBy = "isbn"; // Search by author
// const searchResults = library.searchBooks(searchTerm, searchBy);
// console.log(searchResults);

//library.removeBook("978-0-06-112008-4");

const user1 = new User("Al)ice");
const user2 = new User("Bob");

// user1.borrowBook(book1, library);
// user1.borrowBook(book2, library);
// user2.borrowBook(book3, library);


const user = new User("John");

user.borrowBook(book1, library);
user.borrowBook(book2, library);

user.viewBorrowedBooks(); // View borrowed books

user.returnBook(book1, library);
user.viewBorrowedBooks();


// user.returnBook(""); 
// user.returnBook("");

//library.displayAvailableBooks();

// user1.viewBorrowedBooks();
// user2.viewBorrowedBooks();

// user1.returnBook(book1, library);
// user2.returnBook(book3, library);

// library.displayAvailableBooks();
