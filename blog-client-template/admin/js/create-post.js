//Till datumformateringen:
//let dateAndTimeFunction = (blogPostDate) => {
// let dateAndTime = new Date(blogPostDate);
//             let year = dateAndTime.getFullYear();
//             let month = dateAndTime.getMonth() + 1;
//             if (month < 10) {
//                 month = `0${month}`;
//             }
//             let day = dateAndTime.getDate();
//             if (day < 10) {
//                 day = `0${day}`;
//             }
//             let formattedDateAndTime = `${year}-${month}-${day} kl ${dateAndTime.getHours()}`;
//return formattedDateAndTime;
// }
//let dateAndTime = dateAndTimeFunction(blogPost.date);
window.onload = function () {
    createPostEvent();
}


function createPostEvent() {
    let form = document.getElementById('create-post-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        let formData = new FormData(form);
        formDataObject = {
            "title": formData.get('title'),
            "content": formData.get('content'),
            "author": formData.get('author')
        }

        try {
            await fetch('http://localhost:5000/posts', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            })
            // location.replace('index.html');
        } catch (error) {
            console.log(error);
        }
    });
}