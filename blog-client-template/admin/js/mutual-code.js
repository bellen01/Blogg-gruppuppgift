//File for code and functions that we need to use on multiple pages

// Function for formatting the date of the blog to make it beautiful, courtesy of Isabelle.
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