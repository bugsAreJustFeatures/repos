let library = document.getElementsByClassName("library")[0];
let addBtn = document.getElementById("addBtn");
let bookDialog = document.getElementById("bookDialog")
let formAddBook = document.getElementById("formAddBook")
let bookForm = document.getElementById("bookForm")

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
    

    const cardAuthor = document.createElement("h3");
        cardAuthor.classList.add("bookInfo")
        cardAuthor.textContent = `Author: ${author}`;
    

    const cardPages = document.createElement("h3");
        cardPages.classList.add("bookInfo")
        cardPages.textContent = `Pages: ${pages}`;
    

    const cardBtn = document.createElement("button");
        cardBtn.classList.add("readBtn")
        cardBtn.textContent = "Read";
    cardBtn.addEventListener("click", () => {
        if (cardBtn.style.backgroundColor === "red" || cardBtn.style.backgroundColor === "") {
            cardBtn.style.backgroundColor = "green";
        } else {
            cardBtn.style.backgroundColor = "red";
        }
    });

    const removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn")
        removeBtn.textContent = "Remove"
    removeBtn.addEventListener("click", () => {
        bookCard.remove();
    })
    


    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardAuthor);
    bookCard.appendChild(cardPages);
    bookCard.appendChild(cardBtn);
    bookCard.appendChild(removeBtn);
        library.appendChild(bookCard);
}



// events //

addBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    bookDialog.close()
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("formTitle").value;
    const author = document.getElementById("formAuthor").value;
    const pages = document.getElementById("formPages").value;
        addBookToLibrary(title, author, pages);
        bookDialog.close();
        bookForm.reset();
})

