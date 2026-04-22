import React from "react";
import "./BooksSection.css";
import Header from "../Header/header";

const books = [
  {
    title: "Unlocking LinkedIn’s Best Kept Secret",
    image: "https://m.media-amazon.com/images/I/71MrkdeYW8L._SY522_.jpg",
    link: "https://www.amazon.com/Unlocking-LinkedIns-Best-Kept-Secret-ebook/dp/B0G4QTHR55"
  },
  {
    title: "How to Get a Job Through LinkedIn",
    image: "https://m.media-amazon.com/images/I/719--6ltzaL._SL1500_.jpg",
    link: "https://www.amazon.com/How-get-job-through-LinkedIn-ebook/dp/B0DXTVN6YS"
  },
  {
    title: "Become a LinkedIn Influencer",
    image: "https://m.media-amazon.com/images/I/713Opu5pX3L._SY522_.jpg",
    link: "https://www.amazon.com/Become-LinkedIn-Influencer-Step-Step-ebook/dp/B0DHYHRKPT"
  }
];

export default function BooksSection() {
  return (
    <>
    <Header/>
    <section className="books-wrapper">

      <div className="books-container">

        <p className="books-label">RESOURCES</p>

        <h2 className="books-title">
          Built on thinking. Proven through writing.
        </h2>

        <p className="books-subtext">
          These books reflect the philosophy behind Famelyn — clarity,
          positioning, and strategic presence on LinkedIn.  
          Not trends. Not hacks. Just what actually works.
        </p>

        <div className="books-grid">
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              
              <img
                src={book.image}
                alt={book.title}
                className="book-image"
                onClick={() => window.open(book.link, "_blank")}
              />

              <p className="book-title">{book.title}</p>

            </div>
          ))}
        </div>

        <p className="books-footer">
          These books are written by the Famelyn Founder <span>Yashwanth Vepachadu</span>.
        </p>

      </div>

    </section>
    </>
  );
}