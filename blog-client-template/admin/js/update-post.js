window.onload = function () {
    let queryString = location.search;
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get('id'));

    getPost(urlParams.get('id'));

    updatePostEvent(urlParams.get('id'))


}

// let title = document.getElementById('title');
// let author = document.getElementById('author');
// let content = document.getElementById('content');
// let tags = document.getElementById('tags');

let displayErrorMessage = document.getElementById('error-messages');

// function isStringEmpty(text) {
//     return text.trim() === '';
// }
// let errorMessage = '';
// function errorMessages(titleValue, authorValue, contentValue) {
//     if (isStringEmpty(titleValue)) {
//         errorMessage += 'Title is required<br>';
//     }
//     if (isStringEmpty(authorValue)) {
//         errorMessage += 'Author is required<br>';
//     }
//     if (isStringEmpty(contentValue)) {
//         errorMessage += 'Content is required<br>';
//     }
// }


async function getPost(id) {
    try {
        let response = await fetch('http://localhost:5000/posts/61ae3e3a73fc4745a8661836');
        let post = await response.json();

        document.getElementById('Title').value = post.title;
        document.getElementById('Author').value = post.author;
        document.getElementById('Content').value = post.content;
        // document.getElementById('tags').value = post.tags;
        let tagselceted = post.tags;
        createTagsSelect(tags, tagselceted);
    } catch (error) {
        console.log(error);
    }
}



function updatePostEvent(id) {
    let form = document.getElementById('update-post-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        // displayErrorMessage.innerHTML = '';
        // errorMessage = '';
        // errorMessages(title.value, author.value, content.value);
        // if (errorMessage != '') {
        //     displayErrorMessage.innerHTML = errorMessage;
        //     return;
        // }
        displayErrorMessage.innerHTML = '';

        let errorMessage = generateErrorMessages();

        if (errorMessage != '') {
            displayErrorMessage.innerHTML = errorMessage;
            return;
        }

        let formData = new FormData(form);
        formDataObject = {
            "content": formData.get('content'),
            "title": formData.get('title'),
            "author": formData.get('author'),
            "tags": formData.getAll('tags')
        }

        try {
            await fetch('http://localhost:5000/posts/61ae3e3a73fc4745a8661836', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject)
            })

            location.replace('index.html');
        } catch (error) {
            console.log(error);
        }
    })
}