let bookShelf = document.getElementsByClassName("library");


const myLibrary = []

function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
}

function displayBook() {
    let bookCard = document.createElement("div");
        bookCard.classList.add("book")
        bookCard.style.borderRadius = "2rem";
        bookCard.style.height = "40rem"
        bookCard.style.width = "20rem"
        bookCard.style.margin = "1rem"
        bookCard.style.textAlign = "start"
        bookCard.style.paddingLeft = "1rem"
        bookCard.style.paddingTop = "2rem"
        bookCard.style.background = "lightblue";
        document.appendChild(bookCard)
}

function addBookToLibrary() {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    displayBook();
}

displayBook();