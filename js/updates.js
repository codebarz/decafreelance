$(document).ready(function () {
    var confirmUser = localStorage.getItem('username');
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users?username=${confirmUser}`,
        dataType: 'JSON',
        success: function (res) {
            console.log(res);
            if (res.length == 0) {
                $(".editProfiles").html("You need to have an account to use this feature");
            }

            userEdit = "";
            userEdit += `<script>$(".closer").click(function () {
            $(".editProfiles").fadeOut();
        });</script>`;
            userEdit += `<div class="result"></div>`;
            userEdit += `<h2><i class="mdi mdi-window-close closer"></i></h2>`;
            userEdit += `<form id="updateForm">`;
            userEdit += `<input type="text" class="halfs" name="uid" id="uid" placeholder="First Name" value="${res[0].id}" style="display: none">`;
            userEdit += `<input type="text" class="halfs" name="ufirstname" id="ufirstname" placeholder="First Name" value="${res[0].firstname}" required>`;
            userEdit += `<input type="text" class="halfs" name="ulastname" id="ulastname" placeholder="Last Name" value="${res[0].lastname}" required>`;
            userEdit += `<input type="text" class="halfs" name="uemail" id="uemail" placeholder="Email Address" value="${res[0].email}" required>`;
            userEdit += `<input type="text" class="halfs" name="uusername" id="uusername" placeholder="Username" value="${res[0].username}" required>`;
            userEdit += `<input type="number" class="halfs" name="unumber" id="unumber" placeholder="Phone Number" value="${res[0].phonenumber}" required>`;
            userEdit += `<input type="number" class="halfs" name="uprice" id="uprice" placeholder="Price per Hour" value="${res[0].price}" required>`;
            userEdit += `<input type="text" name="uprofimage" id="uprofimage" placeholder="Profile Image URL" value="${res[0].profimage}" required>`;
            userEdit += `<input type="text" name="ucoverimage" id="ucoverimage" placeholder="Cover Image URL" value="${res[0].coverimage}" required>`;
            userEdit += `<input type="password" name="upassword" id="upassword" placeholder="Password" value="${res[0].password}" required>`;
            userEdit += `<input type="text" name="ucpassword" id="ucpassword" placeholder="Confrim Password" value="${res[0].password}" required>`;
            userEdit += `<select name="ucategory" id="ucategory" required>
                                                                <option value="${res[0].category}">${res[0].category}</option>
                                                                <option value="Programming & Tech">Software Engineering</option>
                                                                <option value="Fashion">Fashion</option>
                                                                <option value="Business">Business</option>
                                                                <option value="Life Style">Life Style</option>
                                                                <option value="Music & Audio">Music</option>
                                                                <option value="Writing & Translation">Writing</option>
                                                                <option value="Digital Marketing">Digital Marketing</option>
                                                                <option value="Video & Animation">Video</option>
                                                            </select>`
            userEdit += `<textarea name="ubriefdes" id="ubriefdes" rows="5" placeholder="Brief description about yourself" required>${res[0].description}</textarea>`;
            userEdit += `<input type="submit" value="Update Profile">`;
            userEdit += `</form>`;
            $(".editProfiles").append(userEdit);

            $("#updateForm").submit(function (e) {
                e.preventDefault();
                // return alert("hello");
                var confirmUser = localStorage.getItem('username');
                let firstname = $("#ufirstname").val();
                let lastname = $("#ulastname").val();
                let username = $("#uusername").val();
                let email = $("#uemail").val();
                var coverimage = $("#ucoverimage").val();
                var profimage = $("#uprofimage").val();
                let password = $("#upassword").val();
                let cpassword = $("#ucpassword").val();
                let price = $("#uprice").val();
                let phonenumber = $("#unumber").val();
                let description = $("#ubriefdes").val();
                let category = $("#ucategory").val();
                let id = $("#uid").val();
                id = Number(id);
                var fullDate = new Date();
                var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
                var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

                $.ajax({
                    type: "PUT",
                    url: `http://localhost:3000/users/${id}`,
                    data: {
                        firstname: firstname,
                        price: price,
                        phonenumber: phonenumber,
                        description: description,
                        lastname: lastname,
                        username: username,
                        email: email,
                        password: password,
                        cpassword: cpassword,
                        coverimage: coverimage,
                        profimage: profimage,
                        category: category,
                        date: currentDate
                    },
                    success: function (res) {
                        alert('Submitted successfully');
                    }
                });

            });
        }
    });

    $("#delete").click(function (e) {
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
        let status = 1;

        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/users?username=${username}`,
            data: {
                firstname: firstname,
                price: price,
                Phonenumber: phonenumber,
                description: description,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
                cpassword: cpassword,
                coverimage: coverimage,
                profimage: profimage,
                category: category,
                date: currentDate
            },
            success: function (res) {
                alert('Deleted successfully');
                window.location.assign("index.html");
            }
        });

    });
});