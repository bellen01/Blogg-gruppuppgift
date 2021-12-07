window.onload = function () {
    getBlogPosts();
};

async function getBlogPosts() {
    try {
        let response = await fetch(`http://localhost:5000/posts`);
        let data = await response.json();

        for (let blogPost of data) {
            document.querySelector("#blogPostContainer").innerHTML += `
            
            <h2>${blogPost.title}</h2>
            <p>${blogPost.author} <br> ${blogPost.date}</p>
            <p>${blogPost.content.substring(0, 100)}... <a href="#">read more</a></p>
            <hr> 
            `;
        };

    } catch (error) {
        console.log(error);
    };
};