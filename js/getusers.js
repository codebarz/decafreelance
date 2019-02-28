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
                allusers += `<p class="card-text">${res[i].description}</p>`;
                allusers += `<p class="card-text"><small class="text-muted">Active since ${res[i].date}</small></p>`;
                allusers += `<a class="cardLink" href="profile.html?username=${param}&view=${res[i].username}">View user</a>`;
                allusers += `</div>`;
                allusers += `</div>`;
                $("#allusers").append(allusers);

                // userprofile = "";
                // userprofile += `<div class="card mb-3" style="max-width: 100%; margin-top: 20px;">`;
                // userprofile += `<div class="row no-gutters">`;
                // userprofile += `<div class="col-md-4">`;
                // userprofile += `<img src="img/photography.jpg" class="card-img" alt="...">`;
                // userprofile += `</div>`;
                // userprofile += `<div class="col-md-8">`;
                // userprofile += `<div class="card-body">`;
                // userprofile += `<h5 class="card-title">${res[i].username}</h5>`;
                // userprofile += `<p class="card-text">${res[i].descriptiom}</p>`;
                // userprofile += `<p class="card-text"><small class="text-muted">${res[i].date}</small></p>`;
                // userprofile += `</div>`;
                // userprofile += `</div>`;
                // userprofile += `</div>`;

                // $("#userprofile").append(userprofile);

            }
        }
    });
});