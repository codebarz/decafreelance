$(document).ready(function () {
    setInterval(function () {
        $(".logoArea").fadeOut().fadeIn();
    }, 1000);
    $(".signupButton").click(function () {
        $(".formsArea").fadeIn();
        $(".signUp").show();
        $(".login").hide();
    });
    $(".loginButton").click(function (e) {
        e.preventDefault();
        $(".formsArea").fadeIn();
        $(".login").show();
        $(".signUp").hide();
    });
    $(".formsAreaClose").click(function () {
        $(".formsArea").fadeOut();
    });
    $(".formsAreaClose").click(function () {
        $(".resultArea").fadeOut();
        $('.searchBar').animate({ width: "50%" }, 500).animate({ left: "25%" }, 500).animate({ top: "50%" });
    });
    $(".edit").click(function () {
        $(".editProfileArea").show();
        $("#allusers").hide();
        $(".viewProfileArea").hide();
        $(".logoArea").css("display", "none");
    });
    $(".feed").click(function () {
        $(".editProfileArea").hide();
        $("#allusers").show();
        $(".viewProfileArea").show();
        $(".logoArea").css("display", "block");
    });

    var timer;
    var doneTypingInterval = 5000;
    $('#searchBar').keyup(function () {
        $('.searchBar').animate({ top: "0" }, 500).animate({ left: "0" }, 500).animate({ width: "100%" }, 500);
        $('.resultArea').fadeIn();
        clearTimeout(timer);
        if ($('#searchBar').val()) {
            timer = setTimeout(query, doneTypingInterval);
        }
    });


    function query() {
        var searchQuery = $("#searchBar").val();

        $.ajax({
            method: "GET",
            dataType: "json",
            url: `http://localhost:3000/users?category=${searchQuery}`,
            success: function (res) {
                $.each(res, function (index, value) {
                    allusers = "";
                    allusers += `<div class="card-columns">`;
                    allusers += `<div class="card">`;
                    allusers += `<div class="card-body">`;
                    allusers += `<h5 class="card-title">${value.username}</h5>`;
                    allusers += `<p class="card-text">${value.description}</p>`;
                    allusers += `<p class="card-text"><small class="text-muted">Active since ${value.date}</small></p>`;
                    allusers += `<a class="cardLink" href="profile.html?username=${value.username}">View user</a>`;
                    allusers += `</div>`;
                    allusers += `</div>`;
                    allusers += `</div>`;

                    $(".resultArea").append(allusers);
                });
            }
        });

    }

    $('#submitSignForm').submit(function (e) {
        e.preventDefault();

        var firstname = $('input[name="firstname"]').val();
        var lastname = $('input[name="lastname"]').val();
        var email = $('input[name="email"]').val();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var price = $("#price").val();
        var phonenumber = $("#number").val();
        var category = $('#category').val();
        var briefdes = $("#briefdes").val();
        var fullDate = new Date();
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users",
            data: {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "price": price,
                "Phonenumber": phonenumber,
                "username": username,
                "password": password,
                "category": category,
                "description": briefdes,
                "date": currentDate
            },
            success: function (res) {
                alert('Submitted');
            },
            beforeSend: function () {
                $('.logoForm').fadeOut().fadeIn();
            }
        });
    });

    $("#submitLogForm").submit(function (e) {
        e.preventDefault();
        var username = $("#logusername").val();
        var password = $("#logpassword").val();

        $.ajax({
            type: "GET",
            dataType: "json",
            url: `http://localhost:3000/users?username=${username}&password=${password}`,
            data: { "username": username, "password": password },
            success: function (res) {
                if (res.length == 0) {
                    $(".result").append('<p class="resultDanger">Incorrect username or password</p>')
                }

                for (i in res) {
                    if (res[i].status == 1) {
                        $(".result").append('<p class="resultDanger">This account has been deleted.</p>')
                    }

                    else {
                        window.location.assign(`dashboard.html?username=${username}`);
                    }
                }
            },
            beforeSend: function () {
                setInterval(function () {
                    $(".logoFrame").fadeOut().fadeIn();
                }, 1000);
            }
        });
    });
});