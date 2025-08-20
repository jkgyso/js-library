
const dialog = document.querySelector('#bookDialog');
const addBook = document.querySelector('#addBookBtn');
const submitButton = document.querySelector('button[type="submit"]');
const closeButton = document.querySelector('#closeBtn');
const bookForm = document.querySelector('#bookForm');
const bookLibrary = document.querySelector('.book-library');
const removeBtn = document.querySelectorAll('.remove');



const myLibrary = [ 
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        pages: 281,
        status: 'read'
    },
    {
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        pages: 372,
        status: 'unread'
    },
    {
        title: 'Percy Jackson: The Lightning Thief',
        author: 'Rick Riordan',
        pages: 377,
        status: 'read'
    }
]

// Book constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.status = status;
    this.id = crypto.randomUUID();
}

// Add Book 
function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status)

    myLibrary.push(book);
}

// Display Cards
const showCards = () => {
 
    const books = document.querySelectorAll('.book-item')

    books.forEach((book, i) => {

        const title = book.querySelector('.title');
        const author = book.querySelector('.author');
        const pages = book.querySelector('.pages');
        const status = book.querySelector('.status');
        
        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages;
        status.textContent = myLibrary[i].status;
    })
}

// Create cards
const createCard = (title, author, pages, status) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-item');
    bookLibrary.appendChild(bookContainer);

    const titleCard = document.createElement('p');
    titleCard.classList.add('title')
    titleCard.textContent = title;
    bookContainer.appendChild(titleCard);

    const authorLabel = document.createElement('p');
    authorLabel.classList.add('label');
    authorLabel.textContent = 'Author: ';
    bookContainer.appendChild(authorLabel);
    
    const authorSpan = document.createElement('span');
    authorSpan.classList.add('author');
    authorSpan.textContent = author;
    authorLabel.appendChild(authorSpan);
    
    const pagesLabel = document.createElement('p');
    pagesLabel.classList.add('label');
    pagesLabel.textContent = 'Pages: ';
    bookContainer.appendChild(pagesLabel);

    const pagesSpan = document.createElement('span');
    pagesSpan.classList.add('pages');
    pagesSpan.textContent = pages;
    pagesLabel.appendChild(pagesSpan);

    const statusControls = document.createElement('div');
    statusControls.classList.add('status-controls');
    bookContainer.appendChild(statusControls);
    
    const statusLabel = document.createElement('p');
    statusLabel.classList.add('status-label')
    statusControls.appendChild(statusLabel);

    const buttonStatus = document.createElement('button');
    buttonStatus.textContent = status;
    buttonStatus.classList.add('status');

    if(status.toLowerCase() == 'read') {
        buttonStatus.classList.add('read');
    } else {
        buttonStatus.classList.add('unread');
    }

    statusControls.appendChild(buttonStatus);


    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    bookContainer.appendChild(removeButton);

    statusLabel.textContent = 'Status: ';
    removeButton.textContent = ' Remove Book';

    console.log(bookContainer);
}


// Create a book via form 
const createBook = (event) => {
    event.preventDefault();
    const titleValue = bookForm.querySelector('#title').value; 
    const authorValue = bookForm.querySelector('#author').value;
    const pagesValue = bookForm.querySelector('#pages').value;
    const statusValue = bookForm.querySelector('#status').value;

    addBookToLibrary(titleValue, authorValue, pagesValue, statusValue);
    createCard(titleValue, authorValue, pagesValue, statusValue);

    bookForm.reset();
    
    dialog.close();

    console.log(myLibrary)
}

// Remove Book
const removeBook = card => {
    const selectedCard = card.closest('div');
    if(selectedCard) selectedCard.remove();
}

// Handle Click events
const handleClick = event => {
    const targetButton = event.target;

    if(targetButton.classList.contains('remove')) {
        removeBook(targetButton);
        return;
    }

    if(targetButton.classList.contains('read')) {

        targetButton.classList.remove('read');
        targetButton.classList.add('unread');
        targetButton.textContent = 'Unread';
    } else if(targetButton.classList.contains('unread')) {
        targetButton.classList.remove('unread');
        targetButton.classList.add('read');
        targetButton.textContent = 'Read';
    }

}


// Open dialog
addBook.addEventListener('click', () => dialog.showModal());

// Close dialog
closeButton.addEventListener('click', () => dialog.close());

// Show Card Content
window.addEventListener('DOMContentLoaded', showCards);

// Submit Form 
submitButton.addEventListener('click', createBook);

// Remove Book 
bookLibrary.addEventListener('click', handleClick);