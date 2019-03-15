$(document).ready(function () {

    let searchUrl = new URLSearchParams(window.location.search);
    searchUrl.has('username');
    let param = searchUrl.get('username');

    if (param === null) {
        window.location.assign("index.html");
    }
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/users?username=${param}`,
        success: function (res) {
            for (i in res) {
                $('#firstname').val(res[i].firstname);
                $('#lastname').val(res[i].lastname);
                $('#username').val(res[i].username);
                $('#email').val(res[i].email);
                $('#password').val(res[i].password);
                $("#phonenumber").val(res[i].Phonenumber);
                $("#price").val(res[i].price);
                $("#briefdes").val(res[i].description);
                $("#id").val(res[i].id);

            }
        }
    });

    $("#editForm").submit(function (e) {
        e.preventDefault();

        let firstname = $("#ufirstname").val();
        let lastname = $("#ulastname").val();
        let username = $("#uusername").val();
        let email = $("#uemail").val();
        var coverimage = $("#ucoverimage").val();
        var profimage = $("#uprofimage").val();
        let password = $("#upassword").val();
        let price = $("#uprice").val();
        let phonenumber = $("#uphonenumber").val();
        let description = $("#ubriefdes").val();
        let id = $("#id").val();
        var fullDate = new Date();
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/users/${id}`,
            data: { firstname: firstname, price: price, Phonenumber: phonenumber, description: description, lastname: lastname, username: username, email: email, password: password },
            success: function (res) {
                alert('Submitted successfully');
            }
        });

    });

    $("#delete").click(function (e) {
        e.preventDefault();

        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let username = $("#username").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let price = $("#price").val();
        let phonenumber = $("#phonenumber").val();
        let description = $("#briefdes").val();
        let id = $("#id").val();
        var fullDate = new Date();
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        let status = 1;

        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/users/${id}`,
            data: { firstname: firstname, price: price, Phonenumber: phonenumber, description: description, lastname: lastname, username: username, email: email, password: password, status: status, date: currentDate },
            success: function (res) {
                alert('Deleted successfully');
                window.location.assign("index.html");
            }
        });

    });

});