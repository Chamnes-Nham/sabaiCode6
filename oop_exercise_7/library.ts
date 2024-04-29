class Book {
    constructor(
        public title: string,
        public author: string,
        public genre: string,
        public isbn: string,
        public available: boolean = true
    ) {}
}

class Library {
    private books: Book[] = [];

    constructor(public name: string) {}

    addBook(book: Book): void {
        this.books.push(book);
        console.log(`${book.title} by ${book.author} has been added to ${this.name}.`);
    }

    removeBook(identifier: string): void {
        const index = this.books.findIndex(book => book.title === identifier || book.isbn === identifier);
        if (index !== -1) {
            console.log(`${this.books[index].title} has been removed from ${this.name}.`);
            this.books.splice(index, 1);
        } else {
            console.log(`Book with title or ISBN ${identifier} not found in ${this.name}.`);
        }
    }

    searchBooks(searchTerm: string, searchBy: 'title' | 'author' | 'genre'): Book[] {
        return this.books.filter(book => book[searchBy].toLowerCase().includes(searchTerm.toLowerCase()));
    }

    displayAvailableBooks(): void {
        console.log(`Available books in ${this.name}:`);
        this.books.filter(book => book.available)
            .forEach((book, index) => {
                console.log(`${index + 1}. ${book.title} by ${book.author} (${book.genre}) - ISBN: ${book.isbn}`);
            });
    }

    borrowBook(bookTitle: string, user: User): void {
        const book = this.books.find(book => book.title === bookTitle && book.available);
        if (book) {
            book.available = false;
            user.borrowed_books.push(book);
            console.log(`${user.name} has borrowed ${book.title}.`);
        } else {
            console.log(`Sorry, ${bookTitle} is not available.`);
        }
    }

    returnBook(bookTitle: string, user: User): void {
        const index = user.borrowed_books.findIndex(book => book.title === bookTitle);
        if (index !== -1) {
            user.borrowed_books.splice(index, 1);
            const book = this.books.find(book => book.title === bookTitle);
            if (book) {
                book.available = true;
                console.log(`${user.name} has returned ${book.title}.`);
            }
        } else {
            console.log(`${user.name} does not have ${bookTitle} on loan.`);
        }
    }
}

class User {
    borrowed_books: Book[] = [];

    constructor(public name: string) {}

    borrowBook(book: Book, library: Library): void {
        library.borrowBook(book.title, this);
    }

    returnBook(book: Book, library: Library): void {
        library.returnBook(book.title, this);
    }

    viewBorrowedBooks(): void {
        console.log(`${this.name}'s borrowed books:`);
        this.borrowed_books.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} by ${book.author} (${book.genre}) - ISBN: ${book.isbn}`);
        });
    }
}


// const library = new Library("Main Library");
// const book1 = new Book("To Kill a Mockingbird", "Harper Lee", "Classic", "978-0-06-112008-4");
// const book2 = new Book("1984", "George Orwell", "Dystopian", "978-0-452-28423-4");
// const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", "978-0-7432-7356-5");

// library.addBook(book1);
// library.addBook(book2);
// library.addBook(book3);

// const user1 = new User("Alice");
// const user2 = new User("Bob");

// user1.borrowBook(book1, library);
// user1.borrowBook(book2, library);
// user2.borrowBook(book3, library);

// library.displayAvailableBooks();

// user1.viewBorrowedBooks();
// user2.viewBorrowedBooks();

// user1.returnBook(book1, library);
// user2.returnBook(book3, library);

// library.displayAvailableBooks();
