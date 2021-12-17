window.onload = function () {
    let queryString = location.search;
    let urlParams = new URLSearchParams(queryString);
    getPost(urlParams.get('id'));
    updatePostEvent(urlParams.get('id'))
}

let displayErrorMessage = document.getElementById('error-messages');

async function getPost(id) {
    try {
        let response = await fetch('http://localhost:5000/posts/' + id);
        let post = await response.json();

        document.getElementById('Title').value = post.title;
        document.getElementById('Author').value = post.author;
        document.getElementById('Content').value = post.content;
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
            await fetch('http://localhost:5000/posts/' + id, {
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