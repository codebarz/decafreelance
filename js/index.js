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
    $(".formsAreaClose").click(function () {
        $(".resultArea").fadeOut();
        $('.searchBar').animate({ width: "50%" }, 500).animate({ left: "25%" }, 500).animate({ top: "50%" });
    });
    $(".edit").click(function () {
        $(".editProfileArea").show();
        $("#allusers").hide();
        $("#viewProfileAre").hide();
    });
    $(".feed").click(function () {
        $(".editProfileArea").hide();
        $("#allusers").show();
        $(".viewProfileArea").hide();
    });

    var timer;
    $('#searchBar').on('keyup', function () {
        $('.searchBar').animate({ top: "0" }, 500).animate({ left: "0" }, 500).animate({ width: "100%" }, 500);
        $('.resultArea').fadeIn();

        clearTimeout(timer);
        timer = setTimeout(search, 2000);
    });
    $('#searchBar').on('keydown', function () {
        // $('.searchBar').animate({top: "50%"}, 500)
        clearTimeout(timer);
    });

    function search() {
        var text = $("#searchBar").val();

        $.ajax({
            method: "GET",
            dataType: "json",
            url: `http://localhost:3000/users?category=${text}`,
            success: function (res) {
                $.each(res.category, function (i, v) {
                    if (v.category == text) {
                        alert(v.username);
                        return;
                    }
                });
            }
        })
    }
$("#searchBar").on("keyup", function () {
    
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