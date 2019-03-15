$(document).ready(function () {
    let searchUrl = new URLSearchParams(window.location.search);
    searchUrl.has('view');
    let param = searchUrl.get('view');
    $.ajax({
        type: "GET",
        url: `${baseurl}users?username=${param}`,
        success: function (res) {
            for (i in res) {
                

                userprofile = "";
                userprofile += `<img src="${res[i].profimage}">`;
        
                userprofile += `<h6>${res[i].firstname} ${res[i].lastname}</h6>`;
                userprofile += `<p><i class="mdi mdi-newspaper"></i> ${res[i].description}</p>`;
                if (res[i].startprice != res[i].lastprice) {
                    userprofile += `<p class="profPrice">$${res[i].startprice} - $${res[i].lastprice}</p>`;
                }
                else {
                    userprofile += `<p class="profPrice">$${res[i].startprice}</span>`;
                }
                userprofile += `<p><i class="mdi mdi-phone"></i> ${res[i].phonenumber}</p>`;
                userprofile += `<p><i class="mdi mdi-email"></i> ${res[i].email}</p>`;
                userprofile += `<p><i class="mdi mdi-calender"></i> Active since ${res[i].date}</p>`;

                $(".profileSlate").append(userprofile);

            }
        }
    });
});