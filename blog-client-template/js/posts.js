window.onload = function () {
    getBlogPosts();
};

async function getBlogPosts() {
    try {
        let response = await fetch(`http://localhost:5000/posts`);
        let data = await response.json();

        for (let blogPost of data) {
            let dateAndTime = dateAndTimeFunction(blogPost.date);
            document.querySelector("#blogPostContainer").innerHTML += `
            
            <h2>${blogPost.title}</h2>
            <p>${blogPost.author} <br> ${dateAndTime}</p>
            <p>Tags: ${blogPost.tags.join(", ")}</p>
            <p data-id="${blogPost._id}"> ${blogPost.content.substring(0, 100)}... <a href="post.html?id=${blogPost._id}">read more</a></p>
            <hr> 
            `;
        };

    } catch (error) {
        console.log(error);
    };
};