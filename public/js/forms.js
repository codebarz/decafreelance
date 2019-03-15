$(document).ready(function () {
    $(".logIns").click(function () {
        $(".loginAndSignup").fadeIn();
        $(".userLoginArea").fadeIn();
        $(".userSignUpArea").fadeOut();
    });
    $(".signUps").click(function () {
        $(".loginAndSignup").fadeIn();
        $(".userLoginArea").fadeOut();
        $(".userSignUpArea").fadeIn();
    });
    $(".userReg").click(function (e) {
        e.preventDefault();
        $(".userLoginArea").fadeOut();
        $(".userSignUpArea").fadeIn();
    });
    $(".userLog").click(function (e) {
        e.preventDefault();
        $(".userLoginArea").fadeIn();
        $(".userSignUpArea").fadeOut();
    });
    $(".closer").click(function () {
        $(".loginAndSignup").fadeOut();
    });
    $('#submitSignForm').submit(function (e) {
        e.preventDefault();

        var firstname = $('input[name="firstname"]').val();
        var lastname = $('input[name="lastname"]').val();
        var email = $('input[name="email"]').val();
        var username = $('input[name="username"]').val();
        var coverimage = $("#coverimage").val();
        var profimage = $("#profimage").val();
        var password = $('input[name="password"]').val();
        var price = $("#price").val();
        var phonenumber = $("#number").val();
        var category = $('#category').val();
        var briefdes = $("#briefdes").val();
        var fullDate = new Date();
        var cpassword = $("#cpassword").val();
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

        if (password != cpassword) {
            $(".result").append('<p class="resultDanger">Passwords do not match</p>');
        }
        else {
            $.ajax({
                method: "GET",
                dataType: "json",
                url: `http://localhost:3000/users?username=${username}`,
                success: function (res) {
                    if (res.length == 1) {
                        $(".result").append('<p class="resultDanger">Username already exist</p>');
                    }
                    else {

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
                                "profimage": profimage,
                                "coverimage": coverimage,
                                "password": password,
                                "category": category,
                                "description": briefdes,
                                "date": currentDate
                            },
                            success: function (res) {
                                $(".result").append('<p class="resultSuccess">Successful. Kindly Login</p>')
                            },
                            beforeSend: function () {
                                $('.logoForm').fadeOut().fadeIn();
                            }
                        });
                    }
                }
            })

        }

    });
});