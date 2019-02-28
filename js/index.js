$(document).ready(function () {
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

    $('#submitSignForm').submit(function (e) {
        e.preventDefault();

        var firstname = $('input[name="firstname"]').val();
        var lastname = $('input[name="lastname"]').val();
        var email = $('input[name="email"]').val();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var category = $('#category').val();
        var briefdes = $("#briefdes").val();
        var date = $.datepicker.formatDate('yy/mm/dd', new Date());
        // var coverimage = $('#coverImage').on('change', function () {
        //     return $(this).val();
        // });

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users",
            data: {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "username": username,
                "password": password,
                "category": category,
                "description": briefdes,
                "date": date
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
                else {
                    window.location.assign(`dashboard.html?username=${username}`);
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