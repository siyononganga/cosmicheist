const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function(){

document.getElementById("blog-container").scrollIntoView({
behavior: "smooth"
});

const filter = searchInput.value.toLowerCase();

const postsOnPage = document.querySelectorAll(".blog-post");

postsOnPage.forEach(post => {

const title = post.querySelector("h2").textContent.toLowerCase();

const description = post.querySelector("p:nth-of-type(2)").textContent.toLowerCase();

const category = post.querySelector(".post-category").textContent.toLowerCase();

if(
title.includes(filter) ||
description.includes(filter) ||
category.includes(filter)
){

post.style.display = "block";

}else{

post.style.display = "none";

}

});

});

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 300; i++) {

    let depth = Math.random();

    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        radius: depth * 2,
        speed: depth * 0.8,

        color: `hsl(${Math.random()*360}, 80%, 70%)`
    });

}

let shootingStars = [];

function animateStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star => {

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
        ctx.fillStyle = star.color;
        ctx.fill();

        star.y += star.speed;

        if(star.y > canvas.height){
            star.y = 0;
            star.x = Math.random()*canvas.width;
        }

    });

    if(Math.random() < 0.0005){
        createShootingStar();
    }

    shootingStars.forEach((star, index) => {

    const tailX = star.x - star.vx * star.length/10;
    const tailY = star.y - star.vy * star.length/10;

    const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);

    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;

    ctx.shadowBlur = 15;
    ctx.shadowColor = "white";

    ctx.stroke();

        star.x += star.vx;
        star.y += star.vy;

        star.life--;

        if(star.life <= 0){
            shootingStars.splice(index,1);
        }

    });

    requestAnimationFrame(animateStars);

}

animateStars();

function createShootingStar(){

    const angle = Math.random() * Math.PI/3 + Math.PI/6; 
    const speed = Math.random() * 20 + 20;

    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 120 + 40,
        speed: speed,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 120
    });

}

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

const posts = [

{
title: "The Arrow of Time",
description: "Why entropy gives time a direction in the universe.",
link: "posts/arrow-of-time.html",
date: "2026-03-10",
category: "Physics"
},

{
title: "What Happened Before the Big Bang?",
description: "Exploring theories about the universe before time began.",
link: "posts/the-big-bang.html",
date: "2026-03-15",
category: "Cosmology",
featured: true
},

{
title: "Is Space-Time an Illusion?",
description: "New ideas suggesting space and time may emerge from quantum information.",
link: "posts/is-spacetime-an-illusion.html",
date: "2026-03-05",
category: "Astronomy"
}

];

posts.sort((a,b) => new Date(b.date) - new Date(a.date));

const featuredContainer = document.getElementById("featured-post");

posts.forEach(post => {

if(post.featured){

featuredContainer.innerHTML = `
<h2>${post.title}</h2>
<p>${post.description}</p>
<a href="${post.link}">Read full article →</a>
`;

}

});

const container = document.getElementById("blog-container");

posts.forEach(post => {

const card = document.createElement("article");

card.classList.add("blog-post");
card.setAttribute("data-category", post.category);

card.innerHTML = `
<h2>${post.title}</h2>
<p class="post-date">${post.date}</p>
<p class="post-category">${post.category}</p>
<p>${post.description}</p>
<a href="${post.link}">Read more →</a>
`;

container.appendChild(card);

});

const filterButtons = document.querySelectorAll(".category-filter button");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

const category = button.getAttribute("data-category");

const posts = document.querySelectorAll(".blog-post");

posts.forEach(post => {

if(category === "all" || post.getAttribute("data-category") === category){

post.style.display = "";

}else{

post.style.display = "none";

}

});

});

});

const observer = new IntersectionObserver((entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

const hiddenElements = document.querySelectorAll(".blog-post");

hiddenElements.forEach(el => observer.observe(el));