$(document).ready(function () {
    $(".signupButton").click(function () {
        $(".formsArea").fadeIn();
    });

    $('#submitForm').click(function (e) {
        e.preventDefault();

        var firstname = $('input[name="firstname"]').val();
        var lastname = $('input[name="lastname"]').val();
        var email = $('input[name="email"]').val();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var category = $('#category').val();

        alert('Hello');
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
            }
        });
    });
});