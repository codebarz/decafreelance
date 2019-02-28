$(document).ready(function () {
    let searchUrl = new URLSearchParams(window.location.search);
    searchUrl.has('username');
    let param = searchUrl.get('username');

    if (param === null) {
        window.location.assign("index.html");
    }
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/users?username!=${param}`,
        success: function (res) {
            for (i in res) {
                allusers = "";
                allusers += `<div class="card">`;
                allusers += `<div class="card-body">`;
                allusers += `<h5 class="card-title">${res[i].username}</h5>`;
                allusers += `<p class="card-text">${res[i].email}</p>`;
                allusers += `<p class="card-text"><small class="text-muted">${res[i].firstname}</small></p>`;
                allusers += `</div>`;
                allusers += `</div>`;

                $("#allusers").append(allusers);

            }
        }
    });
});