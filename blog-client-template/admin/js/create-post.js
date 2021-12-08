window.onload = function () {
    createPostEvent();
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let content = document.getElementById('content');
    let displayErrorMessage = document.getElementById('error-messages');
    let tagsSelect = document.getElementById('tags');
}


//flytta till egen js som både jag och Linn kan använda?
function isStringEmpty(text) {
    return text.trim() === '';
}
function errorMessages(titleValue, authorValue, contentValue) {
    let errorMessage = '';
    if (isStringEmpty(titleValue)) {
        errorMessage += 'Title is required<br>';
    }
    if (isStringEmpty(authorValue)) {
        errorMessage += 'Author is required<br>';
    }
    if (isStringEmpty(contentValue)) {
        errorMessage += 'Content is required<br>';
    }
    return errorMessage;
}


//flytta till egen js som både jag och Linn kan använda?
let tags = ["Politics", "Satire", "Autobiography", "Lorem Gang"];
function createTagsSelect(tags, tagsSelected) {
    let tagsHTML = '';
    for (let tag of tags) {
        //option 1
        tagsHTML += `
            <option value="${tag}`;
        if (tagsSelected != null && tagsSelected.includes(tag)) {
            tagsHTML += ` selected`
        }
        tagsHTML += `>${tag}</option>`
        //option 2
        let selected = '';
        if (tagsSelected != null && tagsSelected.includes(tag)) {
            selected = ' selected';
        }
        tagsHTML += `<option value="${tag}"${selected}>${tag}</option>`;
        //option 3
        if (tagsSelected != null && tagsSelected.includes(tag)) {
            tagsHTML += `
            <option value="${tag}" selected>${tag}</option>`
        } else {
            tagsHTML += `
            <option value="${tag}">${tag}</option>`
        }
    }
    document.getElementById('tags').innerHTML = tagsHTML;
}

createTagsSelect(tags, null);

function createPostEvent() {
    let form = document.getElementById('create-post-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        displayErrorMessage.innerHTML = '';
        let errorMessage = errorMessages(title.value, author.value, content.value);
        if (errorMessage != '') {
            displayErrorMessage.innerHTML = errorMessage;
            return;
        }

        //bryt ut?
        let formData = new FormData(form);
        formDataObject = {
            "title": formData.get('title'),
            "content": formData.get('content'),
            "author": formData.get('author'),
            "tags": formData.getAll('tags')
        }

        //Bryt ut till fetchfunktion?
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