let library = document.getElementsByClassName("library");


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
        bookCard.style.borderRadius = "2rem";
        bookCard.style.height = "40rem"
        bookCard.style.width = "20rem"
        bookCard.style.margin = "1rem"
        bookCard.style.textAlign = "start"
        bookCard.style.paddingLeft = "1rem"
        bookCard.style.paddingTop = "2rem"
        bookCard.style.background = "lightblue";

    const cardTitle = document.createElement("h2");
        cardTitle.textContent = `Title: ${title}`;
        cardTitle.style.textDecoration = "underline"
        cardTitle.style.textAlign = "start";
        cardTitle.style.marginBottom = "7.8rem"
    bookCard.appendChild(cardTitle);

    const cardAuthor = document.createElement("h3");
        cardAuthor.textContent = `Author: ${author}`;
        cardAuthor.style.textDecoration = "underline";
        cardAuthor.style.textAlign = "start"
        cardAuthor.style.marginBottom = "7.8rem"
    bookCard.appendChild(cardAuthor);

    const cardPages = document.createElement("h3");
        cardPages.textContent = `Pages: ${pages}`;
        cardPages.style.textDecoration = "underline"
        cardPages.style.textAlign = "start";
        cardPages.style.marginBottom = "7.8rem"
    bookCard.appendChild(cardPages);

    const cardBtn = document.createElement("button");
        cardBtn.classList.add("readBtn")
        cardBtn.textContent = "Read";
        cardBtn.style.marginTop = "7rem"
        cardBtn.style.height = "3rem"
        cardBtn.style.width = "7rem"
        cardBtn.style.borderRadius = "1rem"
        cardBtn.style.backgroundColor = "rgb(255, 38, 0)"
        cardBtn.style.border = "0"
    bookCard.appendChild(cardBtn);


    document.body.appendChild(bookCard);
}



addBookToLibrary("The Bible", "God", "1200");