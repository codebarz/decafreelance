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

            if (res[i].username == param) {
                allusers = "";

                allusers += `<div class="card" style="display: none>`;
                allusers += `<div class="card-body">`;
                allusers += `<h5 class="card-title">${res[i].username}</h5>`;
                allusers += `<p class="card-text">${res[i].description}</p>`;
                allusers += `<p class="card-text"><small class="text-muted">${res[i].category}</small></p>`;
                allusers += `<p class="card-text"><small class="text-muted">Active since ${res[i].date}</small></p>`;
                allusers += `<a class="cardLink" href="profile.html?username=${param}&view=${res[i].username}">View user</a>`;
                allusers += `</div>`;
                allusers += `</div>`;
            }
            else {
                allusers = "";

                allusers += `<div class="card">`;
                allusers += `<div class="card-body">`;
                allusers += `<h5 class="card-title">${res[i].username}</h5>`;
                allusers += `<p class="card-text">${res[i].description}</p>`;
                allusers += `<p class="card-text"><small class="text-muted">${res[i].category}</small></p>`;
                allusers += `<p class="card-text"><small class="text-muted">Active since ${res[i].date}</small></p>`;
                allusers += `<a class="cardLink" href="profile.html?username=${param}&view=${res[i].username}">View user</a>`;
                allusers += `</div>`;
                allusers += `</div>`;
            }
            $("#allusers").append(allusers);
        }
    });
});