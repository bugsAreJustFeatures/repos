let library = document.getElementsByClassName("library")[0];


const myLibrary = []

function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
}

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    displayBook(title, author, pages);
}

// book cards are made from this DOM function

function displayBook(title, author, pages) {

    const bookCard = document.createElement("div");
        bookCard.classList.add("book")

    const cardTitle = document.createElement("h2");
        cardTitle.classList.add("bookInfo")
        cardTitle.textContent = `Title: ${title}`;
    bookCard.appendChild(cardTitle);

    const cardAuthor = document.createElement("h3");
        cardAuthor.classList.add("bookInfo")
        cardAuthor.textContent = `Author: ${author}`;
    bookCard.appendChild(cardAuthor);

    const cardPages = document.createElement("h3");
        cardPages.classList.add("bookInfo")
        cardPages.textContent = `Pages: ${pages}`;
    bookCard.appendChild(cardPages);

    const cardBtn = document.createElement("button");
        cardBtn.classList.add("readBtn")
        cardBtn.textContent = "Read";
    bookCard.appendChild(cardBtn);


    library.appendChild(bookCard);
}



addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
addBookToLibrary("The Bible", "God", "1200");
