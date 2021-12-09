window.onload = function () {
    let displayErrorMessage = document.getElementById('error-messages');
    let form = document.getElementById('create-post-form');
    createPostEvent();
    // let title = document.getElementById('title');
    // let author = document.getElementById('author');
    // let content = document.getElementById('content');



    //flytta till egen js som både jag och Linn kan använda? Flyttat till mutual-code men kommenterat ut
    function isStringEmpty(text) {
        return text.trim() === '';
    }

    let errorMessageParameters = [
        "Title",
        "Author",
        "Content",
    ]

    // let errorMessage = '';
    function getErrorMessages(parameter) {
        let input = document.getElementById(parameter);
        if (isStringEmpty(input.value)) {
            return parameter + ' is required!<br>';
        }
        return '';
    }


    //skriva om till class och objekt?? Skrivit om enligt ovan fast inte till objekt och class. Får se om jag gör det.
    // function errorMessages(titleValue, authorValue, contentValue) {
    //     let errorMessage = '';
    //     if (isStringEmpty(titleValue)) {
    //         errorMessage += 'Title is required<br>';
    //     }
    //     if (isStringEmpty(authorValue)) {
    //         errorMessage += 'Author is required<br>';
    //     }
    //     if (isStringEmpty(contentValue)) {
    //         errorMessage += 'Content is required<br>';
    //     }
    //     return errorMessage;
    // }


    //flytta till egen js som både jag och Linn kan använda? Flyttat till mutual-code men kommenterat ut tills vi vet
    let tags = [
        "Politics",
        "Satire",
        "Autobiography",
        "Lorem Gang"
    ]

    function createTagsSelect(tags, tagsSelected) {
        let tagsHTML = '';
        for (let tag of tags) {
            let selected = '';
            if (tagsSelected != null && tagsSelected.includes(tag)) {
                selected = ' selected';
            }
            tagsHTML += `<option value="${tag}"${selected}>${tag}</option>`;
        }
        document.getElementById('tags').innerHTML = tagsHTML;
    }

    function checkErrorMessages() {
        let errorMessage = '';
        for (let parameter of errorMessageParameters) {
            errorMessage += getErrorMessages(parameter);
        }
        return errorMessage;
    }

    createTagsSelect(tags, null);

    function createPostEvent() {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            displayErrorMessage.innerHTML = '';

            // errorMessage = '';
            // for (let parameter of errorMessageParameters) {
            //     getErrorMessages(parameter);
            // }

            let errorMessage = checkErrorMessages();

            if (errorMessage != '') {
                displayErrorMessage.innerHTML = errorMessage;
                return;
            }

            let formDataObject = createFormObject(form);

            postBlogPostFetchFunction(formDataObject);
        });
    }
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






