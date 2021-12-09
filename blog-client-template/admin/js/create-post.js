window.onload = function () {
    createPostEvent();
    // let title = document.getElementById('title');
    // let author = document.getElementById('author');
    // let content = document.getElementById('content');
    let displayErrorMessage = document.getElementById('error-messages');



    //flytta till egen js som både jag och Linn kan använda?
    function isStringEmpty(text) {
        return text.trim() === '';
    }

    let errorMessageParameters = [
        "Title",
        "Author",
        "Content",
    ]

    let errorMessage = '';
    function getErrorMessages(parameter) {
        let input = document.getElementById(parameter);
        if (isStringEmpty(input.value)) {
            errorMessage += parameter + ' is required!<br>';
        }
    }


    //skriva om till class och objekt??
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


    //flytta till egen js som både jag och Linn kan använda?
    let tags = ["Politics", "Satire", "Autobiography", "Lorem Gang"];
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

    createTagsSelect(tags, null);

    function createPostEvent() {
        let form = document.getElementById('create-post-form');
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            displayErrorMessage.innerHTML = '';
            errorMessage = '';

            for (let parameter of errorMessageParameters) {
                getErrorMessages(parameter);
            }
            // errorMessage = errorMessages(title.value, author.value, content.value);
            // let errorMessage = errorMessages(title.value, author.value, content.value);
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
}