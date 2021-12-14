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


//================================= Flytta till gemensam js-fil om vi får göra så ===========================
//Kod för validering av fält och felmeddelanden. Kan användas för både create och update
// function isStringEmpty(text) {
//     return text.trim() === '';
// }

// let errorMessageParameters = [
//     "Title",
//     "Author",
//     "Content",
// ]

// function checkRequiredFields(parameter) {
//     let input = document.getElementById(parameter);
//     if (isStringEmpty(input.value)) {
//         return parameter + ' is required!<br>';
//     }
//     return '';
// }

// function generateErrorMessages() {
//     let errorMessage = '';
//     for (let parameter of errorMessageParameters) {
//         errorMessage += checkRequiredFields(parameter);
//     }
//     return errorMessage;
// }

// //Kod för tags, kan användas för både create och update
// let tags = [
//     "Politics",
//     "Satire",
//     "Autobiography",
//     "Lorem Gang"
// ]

// function createTagsSelect(tags, tagsSelected) {
//     let tagsHTML = '';
//     for (let tag of tags) {
//         let selected = '';
//         if (tagsSelected != null && tagsSelected.includes(tag)) {
//             selected = ' selected';
//         }
//         tagsHTML += `<option value="${tag}"${selected}>${tag}</option>`;
//     }
//     document.getElementById('tags').innerHTML = tagsHTML;
// }






