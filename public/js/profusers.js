$(document).ready(function () {
    let searchUrl = new URLSearchParams(window.location.search);
    searchUrl.has('view');
    let param = searchUrl.get('view');
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/users?username=${param}`,
        success: function (res) {
            for (j in res) {


                userprofile = "";
                userprofile += `<div class="card" style="max-width: 100%; margin-top: 20px;">`;

                userprofile += `<div class="card-body">`;
                userprofile += `<h5 class="card-title">${res[j].username}</h5>`;
                userprofile += `<p class="card-text">${res[j].description}</p>`;
                userprofile += `<div class="row">`;
                userprofile += `<div class="col-sm-4 alignCenter"><i class="profIcons mdi mdi-phone"></i><br>${res[i].Phonenumber}</div>`;
                userprofile += `<div class="col-sm-4 alignCenter"><i class="profIcons mdi mdi-cash-multiple"></i><br>&#x20a6;${res[i].price}</div>`;
                userprofile += `<div class="col-sm-4 alignCenter"><i class="profIcons mdi mdi-email"></i><br>${res[i].email}</div>`;
                userprofile += `</div><br>`;
                userprofile += `<div class="row">`;
                userprofile += `<div class="activesince col-sm-4 aligncenter">Active since ${res[i].date}</div>`;
                userprofile += `<div class="activecat col-sm-8 aligncenter"><i class="mdi mdi-certificate"></i> This user is certified in ${res[i].category}</div>`;
                userprofile += `</div>`;
                userprofile += `</div>`;
                userprofile += `</div>`;

                $("#allusers").append(userprofile);

            }
        }
    });
});