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
                $("#id").val(res[i].id);

            }
        }
    });

    $("#editForm").submit(function (e) {
        e.preventDefault();

        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let username = $("#username").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let id = $("#id").val();

        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/users/${id}`,
            data: { firstname: firstname, lastname: lastname, username: username, email: email, password: password },
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
        let id = $("#id").val();
        let status = 1;

        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/users/${id}`,
            data: { firstname: firstname, lastname: lastname, username: username, email: email, password: password, status: status },
            success: function (res) {
                alert('Deleted successfully');
                window.location.assign("index.html");
            }
        });

    });

});