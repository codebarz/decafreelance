$(document).ready(function () {
    $(".signupButton").click(function () {
        $(".formsArea").fadeIn();
    });
    $(".formsAreaClose").click(function () {
        $(".formsArea").fadeOut();
    });

    $('#submitSignForm').submit(function (e) {
        e.preventDefault();

        var firstname = $('input[name="firstname"]').val();
        var lastname = $('input[name="lastname"]').val();
        var email = $('input[name="email"]').val();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var category = $('#category').val();

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users",
            data: {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "username": username,
                "password": password,
                "category": category
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
        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost:3000/users",
            data: { "username": username, "password": password },
            success: function (res) {
                if (res.length == 0) {
                    $(".result").append('<p class="resultDanger">Incorrect username or password</p>')
                }
                else {
                    window.location.assign(`dashboard.html?username=${username}`);
                }
            }
        });
    });

    let searchUrl = new URLSearchParams(window.location.search);
    searchUrl.has('username');
    let param = searchUrl.get('username');

});