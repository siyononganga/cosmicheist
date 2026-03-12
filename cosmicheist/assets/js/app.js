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