let menu=document.querySelector('#menu-bars');
let navbar=document.querySelector('.navbar');

menu.onclick=()=>{                     //menu button function
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll=()=>{                     
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

document.querySelector('#search-icon').onclick=()=>{     //search button function
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick=()=>{     //close button function
    document.querySelector('#search-form').classList.remove('active');
}

// autometic slideshow function for food

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "flex";
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

//autometic slideshow function for review

let slide_Index = 0;
show_Slides();

function show_Slides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slide_Index++;
  if (slide_Index > slides.length) {slide_Index = 1}
  slides[slide_Index-1].style.display = "flex";
  setTimeout(show_Slides, 3000); // Change image every 3 seconds
}
