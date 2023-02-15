"use strict";
// elements selection

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav__links");
const message = document.createElement("div");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (btn, currI) {
  btnsOpenModal[currI].addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//TABBED COMPONENT
//adding event handler to buttons using event delegation so attaching event handler to common parent element of what we are interested in
tabsContainer.addEventListener("click", function (e) {
  //guard clause
  if (!e.target.closest(".operations__tab")) {
    return;
  }
  //matching strategy going upwards from the span element inside the button that interests us, we remove the active class to every button than apply it only to the correct tab
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  e.target.closest(".operations__tab").classList.add("operations__tab--active");

  //activate content area
  tabsContent.forEach((tab) =>
    tab.classList.remove("operations__content--active")
  );
  //seleziono il contenuto che mi interessa utilizzando l'attributo nell'html dei bottoni e gli applico la classe active
  document
    .querySelector(
      `.operations__content--${e.target
        .closest(".operations__tab")
        .getAttribute("data-tab")}`
    )
    .classList.add("operations__content--active");
});

// STICKY NAVIGATION version 1 to be updated later because scroll event is not efficent
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });
// sticky navigation version 2 intersection observer api
// changes from the course, navbar sticks to the top and not the bottom
const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 1,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

// FADING LINK ANIMATION
//parent container event delegation
function handleHover(e, opacityVal) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((sib) => {
      if (sib !== link) {
        sib.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
}

// magheggio per fare in modo di passare un 'argomento' alla funzione handler che non potrebbe ricevere argomenti, spostando dove punta this utilizzando bind
// The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// Smooth scrolling links in the navigation bar
// event delegation in practice
//1. add event listener to common parent element
navLinks.addEventListener("click", function (e) {
  //2. determine what child element originated the event
  // console.log(e.target.getAttribute("href"));

  //always prevent default behavior
  e.preventDefault();

  // 3 match only the child elements to prevent action starting by clicking on the parent container, matching strategy different from the course, he uses classes, i've used attributes

  // matching alternative e.target.classList.contains('nav__link')
  if (e.target.getAttribute("href")) {
    //also different from the course i skipped saving the result from e.target.getAttribute("href") to a variable
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

// Creating and inserting DOM elements
//creating a cookie message element
// adding a class with some prefixed style
message.classList.add("cookie-message");
// adding some html
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie" type="button">Got it!</button>';
// inserting the newly created element somewhere in the document

document.body.appendChild(message);

//remove element
const closeCookieButton = document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

//Styling elements

message.style.backgroundColor = "#37383d";
message.style.width = "100vw"; //fix scrollx/overflow?
// aggiunta di alessio per avere il finto banner per i cookie sticky in fondo
message.style.position = "sticky";
message.style.bottom = "0px";
message.style.zIndex = "999999999999";

//leggo css applicato e modifico
// essendo lo stile una stringa con unita' di misura devo parsare
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// Smooth scrolling button

btnScroll.addEventListener("click", function (e) {
  //get coordinates
  // const s1coords = section1.getBoundingClientRect();

  // scrolling the window
  // old way using coordinates + current scroll to make it work anywhere
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   // behavior: "smooth",
  // });

  // new way
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

// event propagation in practice random color to navbar links
// random int function
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// // random color function using randomint
// const randColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// // attaching events to various elements to show propagation

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randColor();
//   console.log(e.target);

//   // posso stoppare la propagation
//   e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randColor();
//   console.log(e.target);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randColor();
//   console.log(e.target);
// });

// DOM TRAVERSING

// const h1 = document.querySelector("h1");

// // selecting child =  going downwards
// // this works no matter the depth but always only children of h1
// console.log(h1.querySelectorAll("*"));
// //only direct children (children gives an HTML collection as opposed to nodelist)
// console.log(h1.children);
// //first and last
// console.log(h1.firstElementChild);

// // selecting parent = going upwards
// // parentnode o parentelement direct parent

// // getting an element which is not the direct parent + using css variable
// // opposite of queryselector
// h1.closest(".header").style.background = "var(--gradient-secondary";

// // siblings = going sideways
// // previouselementsibling nextelementsibling
