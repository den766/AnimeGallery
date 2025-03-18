"use strict";

// Elements

const Sub_Button = document.querySelector(".btnR");
const BookName = document.getElementById("book");
const AuthorName = document.getElementById("auth");
const BookId = document.getElementById("Book_id");
const Book_container = document.querySelector(".Rbooks_container");
const Dashboard_nav = document.getElementById("Dashboard_nav");
const BookNav = document.getElementById("Side_bookNav");
const Fav_nav = document.getElementById("Favrouties_nav");
const LogoutNav = document.getElementById("logout_nav");

let users = JSON.parse(localStorage.getItem("users"));
let userId = JSON.parse(localStorage.getItem("LoggedInuser"));
let books = JSON.parse(localStorage.getItem(`books_${userId}`)) || [];

let Book, Author, Id;
const CapitalizeWords = function (str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

let images = [
  "img1.jpeg",
  "img2.jpeg",
  "img3.jpeg",
  "img4.jpeg",
  "img5.jpeg",
  "img6.jpeg",
  "img7.jpeg",
  "img8.jpeg",
  "img9.jpeg",
  "img10.jpeg",
];

let index = 0;
let getNextImage = function () {
  const selectedImage = images[index];
  index = (index + 1) % images.length;
  return selectedImage;
};

const removeBookFromLocalStorage = function (bookName) {
  let books = JSON.parse(localStorage.getItem(`books_${userId}`)) || [];

  books = books.filter((book) => book.name.trim() !== bookName);

  localStorage.setItem(`books_${userId}`, JSON.stringify(books));
};

// book Class

class Books {
  constructor(bookName, authorName, bookId) {
    this.bookName = bookName;
    this.authorName = authorName;
    this.bookId = bookId;
  }

  reg() {
    Sub_Button.addEventListener("click", function (e) {
      e.preventDefault();
      Book = CapitalizeWords(BookName.value);
      Author = CapitalizeWords(AuthorName.value);
      Id = BookId.value.trim();
      if (Book === "" || Author === "" || Id === "") {
        return alert("Please fill out the fields");
      }

      if (books.some((b) => b.name === Book)) {
        return alert("Book name Already exist");
      }

      const book = new Books(Book, Author, Id);
      book.addBook();
    });
  }

  addBook() {
    let userId = JSON.parse(localStorage.getItem("LoggedInuser"));

    let newBook = {
      bookId: Date.now(),
      userId,
      name: this.bookName,
      ath: this.authorName,
    };

    console.log(books.length);
    if (books.length > 4) {
      location.reload();
      return alert("Limit Reached , Remove Some books From your Books Section");
    }
    books.push(newBook);

    localStorage.setItem(`books_${userId}`, JSON.stringify(books));

    this.displayBook(newBook);

    BookName.value = "";
    AuthorName.value = "";
    BookId.value = "";
  }

  displayBook(book) {
    let PathSrc = book.img ? "images" : "BookImages";
    let imgToShow = book.img ? book.img : getNextImage();
    let html = `<div class="books_container" id="child">
              <div class="card">
                <div>
                  <img src="../assets/${PathSrc}/${imgToShow}" alt="" />
                </div>
                <h3>${book.name}</h3>
                <h4>${book.ath}</h4>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                  dolores dolore aliquid repudiandae, delectus voluptas amet
                  possimus architecto eum tempora earum officiis, deserunt eveniet
                  laudantium cum ea, cumque eligendi maiores!
                </p>
                <button class ="Read-btn">Read more.</button>
                <button class="D-btn">Remove.</button>
              </div>
            </div>`;

    Book_container.insertAdjacentHTML("afterbegin", html);
  }

  loadUsersBooks() {
    let userBooks = books.filter((book) => book.userId === userId);

    userBooks.forEach((book) => {
      this.displayBook(book);
    });
  }

  PageNavigation() {
    BookNav.addEventListener("click", function () {
      window.location.href = "libraries.html";
    });
  }

  DashboardPgNav() {
    Dashboard_nav.addEventListener("click", function () {
      window.location.href = "dashboard.html";
    });
  }

  FavouritesNav() {
    Fav_nav.addEventListener("click", function () {
      alert("The page is Under Work , Coming Soon");
    });
  }

  Remove_books() {
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("D-btn")) {
        const bookCard = event.target.closest(".books_container");

        const bookElement = bookCard.querySelector("h3");
        const bookName = bookElement
          ? bookElement.textContent.trim()
          : "Unknown Book";

        bookCard.remove();

        removeBookFromLocalStorage(bookName);
      }
    });
  }

  Readmore_nav() {
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("Read-btn")) {
        window.location.href =
          "https://www.anime-planet.com/manga/read-online/";
      }
    });
  }

  logout() {
    LogoutNav.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }

  loadingSpinner() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "block";
  }
}

// Demo object Creating on Load.
document.addEventListener("DOMContentLoaded", function () {
  const DemoBook = new Books();
  DemoBook.reg();
  DemoBook.loadUsersBooks();
  DemoBook.DashboardPgNav();
  DemoBook.PageNavigation();
  DemoBook.FavouritesNav();
  DemoBook.Remove_books();
  DemoBook.Readmore_nav();
  DemoBook.logout();
  setTimeout(() => {
    DemoBook.loadingSpinner();
  }, 1000);
});
