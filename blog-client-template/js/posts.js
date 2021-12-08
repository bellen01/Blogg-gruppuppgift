window.onload = function () {
    getBlogPosts();
};

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
}

async function getBlogPosts() {
    try {
        let response = await fetch(`http://localhost:5000/posts`);
        let data = await response.json();

        for (let blogPost of data) {
            let dateAndTime = dateAndTimeFunction(blogPost.date);
            document.querySelector("#blogPostContainer").innerHTML += `
            
            <h2>${blogPost.title}</h2>
            <p>${blogPost.author} <br> ${dateAndTime}</p>
            <p data-id="${blogPost._id}"> ${blogPost.content.substring(0, 100)}... <a href="post.html?id=${blogPost._id}">read more</a></p>
            <hr> 
            `;
        };

    } catch (error) {
        console.log(error);
    };
};