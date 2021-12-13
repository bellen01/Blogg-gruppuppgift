window.onload = function () {
    getBlogPost();
};

let urlParams = new URLSearchParams(window.location.search);

async function getBlogPost() {
    try {
        let response = await fetch(`http://localhost:5000/posts/${urlParams.get("id")}`);
        let data = await response.json();
        let blogPost = data;

        let dateAndTime = dateAndTimeFunction(blogPost.date);
        document.querySelector("#blogPostContainer").innerHTML += `
            
            <h2>${blogPost.title}</h2>
            <p>${blogPost.author} <br> ${dateAndTime}</p>
            <p>Tags: ${blogPost.tags.join(", ")}</p>
            <p data-id="${blogPost._id}"> ${blogPost.content}</p>
            <hr> 
            `;

    } catch (error) {
        console.log(error);
    };
};