$(document).ready(function () {
    let searchUrl = new URLSearchParams(window.location.search);
    searchUrl.has('view');
    let param = searchUrl.get('view');
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/users?username=${param}`,
        success: function (res) {
            for (i in res) {
                

                userprofile = "";
                userprofile += `<div class="card mb-3" style="max-width: 100%; margin-top: 20px;">`;
                userprofile += `<div class="row no-gutters">`;
                userprofile += `<div class="col-md-4">`;
                userprofile += `<img src="img/photography.jpg" class="card-img" alt="...">`;
                userprofile += `</div>`;
                userprofile += `<div class="col-md-8">`;
                userprofile += `<div class="card-body">`;
                userprofile += `<h5 class="card-title">${res[i].username}</h5>`;
                userprofile += `<p class="card-text">${res[i].description}</p>`;
                userprofile += `<p class="card-text"><small class="text-muted">${res[i].date}</small></p>`;
                userprofile += `</div>`;
                userprofile += `</div>`;
                userprofile += `</div>`;

                $("#userprofile").append(userprofile);

            }
        }
    });
});