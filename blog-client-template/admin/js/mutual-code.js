//File for code and functions that we need to use on multiple pages

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


let dateAndTimeFunction = (date) => {
    let dateAndTime = new Date(date);
    let year = dateAndTime.getFullYear();
    let month = dateAndTime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = dateAndTime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let formattedDateAndTime = `${year}-${month}-${day} ${dateAndTime.getHours()}:${dateAndTime.getMinutes()}`;
    return formattedDateAndTime;
};