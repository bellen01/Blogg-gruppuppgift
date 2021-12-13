window.onload = function () {
    getBlogPost();
};

let urlParams = new URLSearchParams(window.location.search);

let dateAndTimeFunction = (date) => {
    let dateAndTime = new Date(date);
    let year = dateAndTime.getFullYear();
    let month = dateAndTime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = dateAndTime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let formattedDateAndTime = `${year}-${month}-${day} ${dateAndTime.getHours()}:${dateAndTime.getMinutes()}`;
    return formattedDateAndTime;
};

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