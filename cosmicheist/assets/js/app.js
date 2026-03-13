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

    shootingStars.forEach((star, index) => {

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y + star.length);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();

        star.x += star.speed;
        star.y += star.speed;

        star.life--;

        if(star.life <= 0){
            shootingStars.splice(index, 1);
        }

    });

    requestAnimationFrame(animateStars);

}

animateStars();

function createShootingStar(){

    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 8 + 6,
        life: 100
    });

}

if(Math.random() < 0.01){
    createShootingStar();
}

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});