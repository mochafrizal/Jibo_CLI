/*~~~~~~~~~~~~~~~ TOGGLE BUTTON ~~~~~~~~~~~~~~~*/
const navMenu = document.getElementById("nav-menu");
const navMenu2 = document.getElementById("nav-menu-2");
const navLink = document.querySelectorAll(".nav-link");
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("left-[0]");
    navMenu2.classList.toggle("top-[0]");
    hamburger.classList.toggle("ri-close-large-line");
})

navLink.forEach(linl => {
    linl.addEventListener("click", () => {
        navMenu.classList.toggle("left-[0]");
        navMenu2.classList.toggle("top-[0]");
        hamburger.classList.toggle("ri-close-large-line");
    })
})
/*~~~~~~~~~~~~~~~ CAUROSEL ~~~~~~~~~~~~~~~*/
let onSlide = false;

window.addEventListener("load", () => {
    autoSlide();

    const buttonPrev = document.querySelector(".carousel__button__prev");
    const buttonNext = document.querySelector(".carousel__button__next");

    buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
    buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
})

function autoSlide() {
    setInterval(() => {
        slide(getItemActiveIndex() + 1);
     }, 3000) //duration = 3s
}
// Membatasi saat slide sedang aktif
function slide(toIndex) {
    if(onSlide) return; 

    onSlide = true;

    const itemsArray  = Array.from(document.querySelectorAll(".carousel__item"));
    const itemActive = document.querySelector(".carousel__item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    let newItemActive = null;
    
    if(toIndex > itemActiveIndex)  { // Transisi ke slide berikutnya
        if(toIndex >= itemsArray.length) {
            toIndex = 0;
        }

            newItemActive = itemsArray[toIndex]

        newItemActive.classList.add("carousel__item__pos_next");
        setTimeout(() => {
            newItemActive.classList.add("carousel__item__next");
            itemActive.classList.add("carousel__item__next");
        }, 20);

    } else { // Transisi ke slide sebelumnya
        if(toIndex < 0) {
            toIndex = itemsArray.length - 1;
        }
            
            newItemActive = itemsArray[toIndex];
    
            newItemActive.classList.add("carousel__item__pos_prev");
            setTimeout(() => {
                newItemActive.classList.add("carousel__item__prev");
                itemActive.classList.add("carousel__item__prev");
            }, 20);
    } 

    newItemActive.addEventListener("transitionend", () => {
        itemActive.className = "carousel__item";
        newItemActive.className = "carousel__item carousel__item__active";
        onSlide = false; // Reset status slide
    }, { 
        once: true
    });
}

function getItemActiveIndex() {
    const itemsArray  = Array.from(document.querySelectorAll(".carousel__item"));
    const itemActive = document.querySelector(".carousel__item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
}


/*~~~~~~~~~~~~~~~ Effect MOUSEMOVE EFFECT ~~~~~~~~~~~~~~~*/
const section = [
    { id: "#about", imageClass: ".background-image-about"},
    { id: "#company", imageClass: ".background-image-company"},
    { id: "#contact", imageClass: ".background-image-contact"}
]

function handleMouseMove(e, image) {
    const x= e.clientX /window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const moveX = (x - 0.5) * 50;
    const moveY = (y - 0.5) * 50;

    image.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
}

section.forEach(section => {
    document.querySelector(section.id).addEventListener('mousemove', (e) => {
        const image = document.querySelector(section.imageClass);
        handleMouseMove(e, image) // modelmouseabout
    })
})
// document.querySelector("#about").addEventListener('mousemove', (e) => {
//     const image = document.querySelector(".background-image-about");
//     handleMouseMove(e, image) // modelmouseabout
// })

// document.querySelector("#company").addEventListener('mousemove', (e) => {
//     const image = document.querySelector(".background-image-company");
//     handleMouseMove(e, image) // modelmousecompany
// })

/*~~~~~~~~~~~~~~~ TABS ~~~~~~~~~~~~~~~*/
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".process__tab");
    const tabContent = document.getElementById("tab-content");
    const tabImage = document.getElementById("tab-image");

    const contentData = {
        1: {
            title: "Acquaintance with the customer",
            paragraph: [
                    "The first thing we do is meeting with our clients and talk through their goals on a future project. During this meeting, feel free to communicate your ideas and ask lots of questions.",
                    "This stage is highly decisive as you can evaluate the work of your potential architect by browsing their portfolio. As a client, you may also assess whether the architect listens to your needs and confirms that he or she understands them."
                    ],
            image: "assets/images/process-1.jpg"
        },

        2: {
            title: "Project Concept Development",
            paragraph: [
                    "In this stage, we develop a project concept based on the client’s preferences and ideas. We present the concept in a visual format to ensure that the client’s vision is accurately represented.",
                    "This phase involves a lot of back-and-forth communication, allowing us to refine the project concept until it meets the client’s expectations."
                    ],
            image: "assets/images/process-2.jpg"
        },

        3: {
            title: "Working on Interior and Exterior",
            paragraph: [
                    "Once the concept is approved, we start working on the interior and exterior designs. We make sure that all design elements are in harmony, creating a cohesive and aesthetically pleasing result.",
                    "We present detailed plans and 3D visualizations to help the client understand how the final project will look and feel."
                    ],
            image: "assets/images/process-3.jpg"
        },

        4: {
            title: "Finishing Touches for your future home",
            paragraph: [
                    "The final stage involves adding the finishing touches to the project. We ensure that every detail is perfect and meets the client’s standards.",
                    "This is where we add the final flourishes that turn a house into a home, making sure it is ready for the client to move in."
                    ],
            image: "assets/images/process-4.jpg"
        },

    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove("process__tab-active"));

            tab.classList.add("process__tab-active");
            
            const tabIndex = tab.getAttribute('data-tab');

            const data = contentData[tabIndex];
            tabContent.innerHTML =`
                <h2 class="text-firstcolor">${data.title}</h2>          
                <p class="text-graycolor">${data.paragraph[0]}</p>
                <p class="text-graycolor">${data.paragraph[1]}</p>
            `
            tabImage.src = data.image;
        })
    })
})

/*~~~~~~~~~~~~~~~ SWIPER ~~~~~~~~~~~~~~~*/
const swiper = new Swiper('.swiper', {
    loop: true,
    speed:1000,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    grabCursor: true,
  });
  
/*~~~~~~~~~~~~~~~ SHOW SCROLL UP ~~~~~~~~~~~~~~~*/
const scrollUp = () => {
    const scrollUpBtn = document.getElementById("scroll-up")

    if(this.scrollY >= 250) {
        scrollUpBtn.classList.remove("-bottom-1/2")
        scrollUpBtn.classList.add("bottom-4")
    }
    else {
        scrollUpBtn.classList.add("-bottom-1/2")
        scrollUpBtn.classList.remove("bottom-4")
    }
}


window.addEventListener('scroll', scrollUp)

/*~~~~~~~~~~~~~~~ SCROLL SECTIONS ACTIVE LINK ~~~~~~~~~~~~~~~*/
const activeLink = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav-link");

    let current = "home"

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if(this.scrollY >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    })

    navLinks.forEach(item => {
        item.classList.remove("active");

        if(item.href.includes(current)) {
            item.classList.add("active");
        }
    })
}

window.addEventListener("scroll", activeLink)


/*~~~~~~~~~~~~~~~ SCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
const sr = ScrollReveal({
    origin: "left",
    distance: "60px",
    duration: 3000,
    delay: 400,
    reset: true
})

sr.reveal(`.home__title, .about__item, .process__title, .process__subtitle, .process__tabtitle, .process__tabcontent, .company__content h4, .company__content h2`, { interval: 100 })
sr.reveal(`.about__form h2, .about__form h4, .company__item, .contact__form h2, .contact__form h4`, { origin: "right", interval: 100 })
sr.reveal(`.about__form form, .process__image, .process__tab, .company__content img, .contact__form form, .button__control`, { origin:"top", scale:0.5, delay: 700 })

sr.reveal(`.blog__top, footer` ,{ origin: "top" })
sr.reveal(`.blog__item, .review__brand img,` ,{ origin: "top", interval: 100 })