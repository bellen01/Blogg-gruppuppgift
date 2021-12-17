window.onload = function () {
    fetchAllPosts();
}

let postsHTML = '';
async function fetchAllPosts() {
    try {
        let response = await fetch('http://localhost:5000/posts');
        let posts = await response.json();

        for (let post of posts) {
            let formattedDate = dateAndTimeFunction(post.date);
            let tags = post.tags.join(', ');

            postsHTML += `
            <tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${formattedDate}</td>
            <td>${tags}</td>
            <td>
            <a href="update-post.html?id=${post._id}" class="update-post">Update</a> <br>
            <a href="#" class="delete-post" data-id="${post._id}">Delete</a>
            </td>
            </tr>
            `
        }
        document.getElementById('table-body').innerHTML = postsHTML;
    } catch (error) {
        console.log(error);
    }

    let allDeleteLinks = document.getElementsByClassName('delete-post');
    for (let deleteLink of allDeleteLinks) {
        deleteLink.addEventListener('click', async function (e) {
            e.preventDefault();
            let postID = e.target.dataset.id;
            try {
                await fetch('http://localhost:5000/posts/' + postID, {
                    method: 'DELETE',
                })
                e.target.parentNode.parentNode.remove();
            } catch (error) {
                console.log(error);
            }
        });
    }
}