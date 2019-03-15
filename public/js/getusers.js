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
            $.each(res, function (index, value) {

                if (value.username == param || value.status == 1) {

                }
                else {

                    allusers = "";

                    allusers += `<div class="card">`;
                    allusers += `<div class="card-body">`;
                    allusers += `<h5 class="card-title">${value.username}</h5>`;
                    allusers += `<p class="card-text">${value.description}</p>`;
                    allusers += `<ul class="list-group list-group-flush">`;
                    allusers += `<li class="list-group-item"><i class="mdi mdi-certificate"></i> ${value.category}</li>`;
                    allusers += `<li class="list-group-item"><i class="mdi mdi-phone"></i> ${value.Phonenumber}</li>`;
                    allusers += `<li class="list-group-item price"><i class="mdi mdi-cash-multiple"></i>&#x20a6;${value.price}/Day</li>`;
                    allusers += `</ul>`;
                    allusers += `<p class="card-text"><small class="text-muted">Active since ${value.date}</small></p>`;
                    allusers += `<a class="cardLink" href="profile.html?username=${param}&view=${value.username}">View user</a>`;
                    allusers += `</div>`;
                    allusers += `</div>`;
                    $("#allusers").append(allusers);
                }
            });


        }
    });
});