const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const blogContainer = document.getElementById("blog-container");
    if (blogContainer) {
      blogContainer.scrollIntoView({ behavior: "smooth" });
    }

    const filter = searchInput.value.toLowerCase();
    const postsOnPage = document.querySelectorAll(".blog-post");

    postsOnPage.forEach((post) => {
      const title = post.querySelector("h2")?.textContent.toLowerCase() || "";
      const description =
        post.querySelector("p:nth-of-type(2)")?.textContent.toLowerCase() || "";
      const category =
        post.querySelector(".post-category")?.textContent.toLowerCase() || "";

      if (
        title.includes(filter) ||
        description.includes(filter) ||
        category.includes(filter)
      ) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
}
const canvas = document.getElementById("starfield");

if (canvas) {
  const ctx = canvas.getContext("2d");

  // 🖥️ Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];
  let shootingStars = [];

  // ⭐ Create stars
  function initStars() {
    stars = [];
    for (let i = 0; i < 300; i++) {
      let depth = Math.random();
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: depth * 2,
        speed: depth * 0.8,
        color: `hsl(${Math.random() * 360}, 80%, 70%)`,
      });
    }
  }

  // 🌠 Create shooting star
  function createShootingStar() {
    const angle = (Math.random() * Math.PI) / 3 + Math.PI / 6;
    const speed = Math.random() * 20 + 20;

    shootingStars.push({
      x: Math.random() * canvas.width,
      y: 0,
      length: Math.random() * 120 + 40,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 120,
    });
  }

  // 🎬 Animation loop
  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ⭐ Draw stars
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();

      // Move star
      star.y += star.speed;

      // Reset when off screen
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    // 🌠 Random shooting star
    if (Math.random() < 0.0005) {
      createShootingStar();
    }

    // 🌠 Draw shooting stars
    shootingStars.forEach((star, index) => {
      const tailX = star.x - (star.vx * star.length) / 10;
      const tailY = star.y - (star.vy * star.length) / 10;

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

      // Move shooting star
      star.x += star.vx;
      star.y += star.vy;
      star.life--;

      // Remove when dead
      if (star.life <= 0) {
        shootingStars.splice(index, 1);
      }
    });

    requestAnimationFrame(animateStars);
  }

  // 🔄 Resize handling
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars(); // re-generate stars
  });

  // 🚀 Initialize + start animation
  initStars();
  animateStars();
}

const posts = [
  {
    title: "What Happened Before the Big Bang?",
    description: "Exploring theories about the universe before time began.",
    link: "posts/the-big-bang.html",
    date: "2026-03-15",
    category: "Cosmology",
    featured: true,
  },

  {
    title: "What If Dark Matter Isn't a What, But a Who?",
    description: "Could we be asking the wrong questions about Dark Matter?",
    link: "posts/dark-matter.html",
    date: "2026-03-22",
    category: "Cosmology",
  },

  {
    title: "What if Reality is Just Reflections?",
    description:
      "What if the Big Bang wasn't an explosion...but a break in an infinite system of reflections",
    link: "posts/space-time.html",
    date: "2026-04-01",
    category: "Cosmology",
  },

  {
    title: "The Fifth Dimension: A World Where Time Dominates Space",
    description: "Could there be a world where the roles of time and space are reversed",
    link: "posts/fifth-dimension.html",
    date: "2026-04-11",
    category: "Cosmology",
  },
];

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const featuredContainer = document.getElementById("featured-post");

if (featuredContainer) {
  posts.forEach((post) => {
    if (post.featured) {
      featuredContainer.innerHTML = `
<h2>${post.title}</h2>
<p>${post.description}</p>
<a href="${post.link}">Read full article →</a>
`;
    }
  });
}

const container = document.getElementById("blog-container");

if (container) {
  posts.forEach((post) => {
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
}

const article = document.getElementById("article-content");

if (article) {
  const text = article.innerText;

  const words = text.trim().split(/\s+/).length;

  const readingTime = Math.ceil(words / 200);

  const el = document.getElementById("reading-time");
  if (el) {
    el.innerText = readingTime + " min read";
  }
}

const navposts = [
  {
    title: "What Happened Before the Big Bang?",
    link: "the-big-bang.html",
  },

  {
    title: "What If Dark Matter Isn't a What, Buy a Who?",
    link: "dark-matter.html",
  },

  {
    title: "Reality as Reflection: Rethinking the Singularity",
    link: "space-time.html",
  },

  {
    title: "The Fifth Dimension: Space and Time Reversed",
    link: "fifth-dimension.html",
  },
];

const prev = document.getElementById("prev-article");
const next = document.getElementById("next-article");

if (prev && next) {
  const currentPage = window.location.pathname.split("/").pop();

  let index = navposts.findIndex((p) => p.link.includes(currentPage));

  if (index > 0) {
    prev.href = navposts[index - 1].link;
    prev.innerText = "← " + navposts[index - 1].title;
  }

  if (index < navposts.length - 1) {
    next.href = navposts[index + 1].link;
    next.innerText = navposts[index + 1].title + " →";
  }
}

const filterButtons = document.querySelectorAll(".category-filter button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    const posts = document.querySelectorAll(".blog-post");

    posts.forEach((post) => {
      if (
        category === "all" ||
        post.getAttribute("data-category") === category
      ) {
        post.style.display = "";
      } else {
        post.style.display = "none";
      }
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".blog-post");

hiddenElements.forEach((el) => observer.observe(el));

const heroText = document.querySelector(".hero-text");

if (heroText) {
  const navbar = document.querySelector(".navbar"); // sticky navbar

  window.addEventListener("scroll", () => {
    // Distance from top of page
    const scrollY = window.scrollY;

    // Get navbar height
    const navHeight = navbar.offsetHeight;

    // Fade starts when text reaches navbar, ends when it's fully under
    const fadeStart = navHeight; // start fading when scrolling past navbar
    const fadeEnd = navHeight + 150; // fully faded after 150px

    let opacity = 1;

    if (scrollY > fadeStart) {
      opacity = Math.max(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart), 0);
    }

    heroText.style.opacity = opacity;
  });
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / scrollHeight) * 100;

  document.getElementById("progress-bar").style.width = scrollPercent + "%";
});

// 🍔 Get elements
const menuToggle = document.getElementById("menu-toggle");
const navContainer = document.getElementById("nav-links");

// 🍔 Toggle menu
menuToggle.addEventListener("click", () => {
  navContainer.classList.toggle("active");

  if (navContainer.classList.contains("active")) {
    menuToggle.textContent = "❌";
  } else {
    menuToggle.textContent = "🍔";
  }
});

// 🔗 Close when link clicked
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navContainer.classList.remove("active");
    menuToggle.textContent = "🍔";
  });
});

// 🧠 Close when clicking outside
document.addEventListener("click", (e) => {
  const isClickInside =
    navContainer.contains(e.target) || menuToggle.contains(e.target);

  if (!isClickInside) {
    navContainer.classList.remove("active");
    menuToggle.textContent = "🍔";
  }
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const offset = scrollY * 0.6;

  // Adjust speed here (0.3 = slow, 0.6 = faster)

  document.body.style.backgroundPositionY = `center ${offset}px`;
});