"use strict";

// elements

const borrow_btn = document.querySelectorAll("button");
const books_container = document.querySelector(".books_container");
const your_booksNav = document.querySelector(".book_navBtn");

let userId = JSON.parse(localStorage.getItem("LoggedInuser"));
let books = JSON.parse(localStorage.getItem(`books_${userId}`)) || [];

borrow_btn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let bookCard = e.target.closest(".books_container");
    let ImgCover_Src = bookCard.querySelector(".cover_Img").src;
    let imgName = ImgCover_Src.substring(ImgCover_Src.lastIndexOf("/") + 1);
    console.log(imgName);
    let title = bookCard.querySelector(".book-title").textContent;
    let subTitle = bookCard.querySelector(".Sub_title").textContent;
    let userId = JSON.parse(localStorage.getItem("LoggedInuser"));
    let BorrowedBook = {
      BookId: Date.now(),
      userId,
      img: imgName,
      name: title,
      ath: subTitle,
    };

    let names = books.map((book) => book.name);
    let CopyNames = names.find((name) => name === BorrowedBook.name) || "";

    books.push(BorrowedBook);

    if (CopyNames === BorrowedBook.name) {
      return alert("Books Already in your List , Check your books Section");
    }

    if (books.length > 3) {
      return alert("You Reached The Limit Of Borrowing Books");
    }

    localStorage.setItem(`books_${userId}`, JSON.stringify(books));
    alert(`Borrowed 📚 ${title} , Successfully`);
    // window.location.href = "dashboard.html";
  });
});

your_booksNav.addEventListener("click", function () {
  window.location.href = "dashboard.html";
});

