window.onload = function () {
    createPostEvent();
}

let title = document.getElementById('title');
let author = document.getElementById('author');
let content = document.getElementById('content');
let displayErrorMessage = document.getElementById('error-messages');

function isStringEmpty(text) {
    return text.trim() === '';
}

function createPostEvent() {
    let form = document.getElementById('create-post-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        displayErrorMessage.innerHTML = '';
        let errorMessage = '';
        if (isStringEmpty(title.value)) {
            errorMessage += 'Title is required<br>';
        }
        if (isStringEmpty(author.value)) {
            errorMessage += 'Author is required<br>';
        }
        if (isStringEmpty(content.value)) {
            errorMessage += 'Content is required<br>';
        }
        if (errorMessage != '') {
            displayErrorMessage.innerHTML = errorMessage;
            return;
        }

        let formData = new FormData(form);
        formDataObject = {
            "title": formData.get('title'),
            "content": formData.get('content'),
            "author": formData.get('author')
        }

        try {
            await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
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