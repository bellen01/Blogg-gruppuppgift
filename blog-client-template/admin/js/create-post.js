window.onload = function () {
    createTagsSelect(tags, null);
    createPostEvent();
}

function createPostEvent() {
    let displayErrorMessage = document.getElementById('error-messages');
    let form = document.getElementById('create-post-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        displayErrorMessage.innerHTML = '';

        let errorMessage = generateErrorMessages();

        if (errorMessage != '') {
            displayErrorMessage.innerHTML = errorMessage;
            return;
        }

        let formDataObject = createFormObject(form);

        postBlogPostFetchFunction(formDataObject);
    });
}

function createFormObject(form) {
    let formData = new FormData(form);
    let formDataObject = {
        "title": formData.get('title'),
        "content": formData.get('content'),
        "author": formData.get('author'),
        "tags": formData.getAll('tags')
    }
    return formDataObject;
}

async function postBlogPostFetchFunction(object) {
    try {
        await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        })
        location.replace('index.html');
    } catch (error) {
        console.log(error);
    }
}