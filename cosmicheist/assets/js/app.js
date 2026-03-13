const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function() {
    const filter = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll(".blog-post");
    posts.forEach(post => {
        const title = post.querySelector("h2").textContent.toLowerCase();
        if(title.includes(filter)) post.style.display = "";
        else post.style.display = "none";
    });
});

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 250; i++) {

    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.3,

        // colorful stars
        color: `hsl(${Math.random()*360}, 80%, 70%)`
    });

}

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

    requestAnimationFrame(animateStars);

}

animateStars();