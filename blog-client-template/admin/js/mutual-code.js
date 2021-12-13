//File for code and functions that we need to use on multiple pages

//Kod för validering av fält och felmeddelanden. Kan användas för både create och update
function isStringEmpty(text) {
    return text.trim() === '';
}

let errorMessageParameters = [
    "Title",
    "Author",
    "Content",
]

function checkRequiredFields(parameter) {
    let input = document.getElementById(parameter);
    if (isStringEmpty(input.value)) {
        return parameter + ' is required!<br>';
    }
    return '';
}

function generateErrorMessages() {
    let errorMessage = '';
    for (let parameter of errorMessageParameters) {
        errorMessage += checkRequiredFields(parameter);
    }
    return errorMessage;
}

//Kod för tags, kan användas för både create och update
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