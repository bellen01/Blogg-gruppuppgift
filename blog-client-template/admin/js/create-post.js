window.onload = function () {
    createPostEvent();
}

let title = document.getElementById('title');
let author = document.getElementById('author');
let content = document.getElementById('content');
let displayErrorMessage = document.getElementById('error-messages');
let tagsSelect = document.getElementById('tags');

function isStringEmpty(text) {
    return text.trim() === '';
}
let errorMessage = '';
function errorMessages(titleValue, authorValue, contentValue) {
    if (isStringEmpty(titleValue)) {
        errorMessage += 'Title is required<br>';
    }
    if (isStringEmpty(authorValue)) {
        errorMessage += 'Author is required<br>';
    }
    if (isStringEmpty(contentValue)) {
        errorMessage += 'Content is required<br>';
    }
}

let tags = ["Politics", "Satire", "Autobiography", "Lorem Gang"];
let tagsHTML = '';
//bryt ut till funktion
for (let tag of tags) {

    tagsHTML += `
    <option value="${tag}">${tag}</option>`
}
document.getElementById('tags').innerHTML = tagsHTML;


function createPostEvent() {
    let form = document.getElementById('create-post-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        //bryt ut
        displayErrorMessage.innerHTML = '';
        errorMessage = '';
        errorMessages(title.value, author.value, content.value);
        if (errorMessage != '') {
            displayErrorMessage.innerHTML = errorMessage;
            return;
        }

        // let errorMessage = '';
        // if (isStringEmpty(title.value)) {
        //     errorMessage += 'Title is required<br>';
        // }
        // if (isStringEmpty(author.value)) {
        //     errorMessage += 'Author is required<br>';
        // }
        // if (isStringEmpty(content.value)) {
        //     errorMessage += 'Content is required<br>';
        // }

        // if (errorMessage != '') {
        //     displayErrorMessage.innerHTML = errorMessage;
        //     return;
        // }

        //bryt ut
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
            location.replace('index.html');
        } catch (error) {
            console.log(error);
        }
    });
}