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
    $(".editAcc").click(function () {
        $(".editProfiles").fadeIn();
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
        $("#resultArea").html("");

        $.ajax({
            method: "GET",
            dataType: "json",
            url: `http://localhost:3000/users?category=${searchQuery}`,
            success: function (res) {
                $.each(res, function (index, value) {
                    allusers = "";
                    allusers += `<div class="card" style="width: 100% !important">`;
                    allusers += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                    allusers += `<div class="card-body">`;
                    allusers += `<h5 class="card-title">${value.username}</h5>`;
                    allusers += `<p class="card-text">${value.description}</p>`;
                    allusers += `<p class="card-text"><small class="text-muted" style="font-size: 12px"><i class="mdi mdi-certificate"></i> ${value.category}</small></p>`;
                    allusers += `<p class="card-text"><small class="text-muted">Active since ${value.date}</small></p>`;
                    allusers += `<a class="cardLink" href="profile.html?username=${value.username}&view=${value.username}">View user</a>`;
                    allusers += `</div>`;
                    allusers += `</div>`;

                    $("#resultArea").append(allusers);
                });
            }
        });

    }

    $('#mainSearchBar').submit(function (e) {
        var userquery = $('#mainSearcher').val();
        userquery = userquery.toLowerCase();
        $(".resultSearch").html("");
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${userquery}`,
            dataType: 'JSON',
            success: function (res) {
                console.log(res);
                if (res.length == 0) {
                    $(".resultSearch").html("");
                    $(".resultSearch").append("Currently no user registered under this category");
                    $(".searchResult").fadeIn();
                }
                $.each(res, function (index, value) {
                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {

                        allusers = "";
                        allusers += `<a href="feeds.html?view=${value.username}"><div class="card" style="width: 100%">`;
                        allusers += `<div class="card-body">`;
                        allusers += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        allusers += `<h5 class="card-title">${value.username}</h5>`;
                        allusers += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            allusers += `<p class="card-text pricing">$${value.startprice} - $${value.lastprice}</p>`;
                        }
                        else {
                            allusers += `<p class="card-text pricing">$${value.startprice}</p>`;
                        }
                        allusers += `<p class="card-text"><small class="text-muted" style="font-size: 12px"><i class="mdi mdi-certificate"></i> ${value.category}</small></p>`;
                        allusers += `</div>`;
                        allusers += `</div></a>`;

                        // usercat = "";
                        // usercat += `<div id="make-3D-space">`;
                        // usercat += `<div id="product-card">`;
                        // usercat += `<div id="product-front">`;
                        // usercat += `<div class="shadow"></div>`;
                        // usercat += `<img class="slateImg" src="${value.coverimage}" alt="" />`;
                        // usercat += `<div class="image_overlay">`;
                        // usercat += `<div class="product-options">`;
                        // usercat += `<span><strong><i class="mdi mdi-phone"></i> </strong>${value.phonenumber}</span>`;
                        // usercat += `<span><strong><i class="mdi mdi-email"></i></strong>${value.email}</span>`;
                        // usercat += `<span><strong><i class="mdi mdi-newspaper"></i></strong>${value.description}</span>`;
                        // usercat += `</div>`;
                        // usercat += `</div>`;
                        // usercat += `<div class="stats">`;
                        // usercat += `<div class="stats-container">`;
                        // usercat += `<span class="product_price">$${value.price}</span>`;
                        // usercat += `<a href="feeds.html?view=${value.username}"><span class="product_name">${value.username}</span></a>`;
                        // usercat += `<p>${value.category}</p>`;
                        // usercat += `</div>`;
                        // usercat += `</div>`;
                        // usercat += `</div>`;
                        // usercat += `</div>`;
                        // usercat += `</div>`;


                        $(".resultSearch").append(allusers);
                        $(".searchResult").fadeIn();
                        $(".loadings").fadeOut();
                    }
                });

            },
            beforeSend: function () {
                $(".resultSearch").html("<img class='loadings' src='img/load.gif'>");
            }
        });
    });

    var confirmUser = localStorage.getItem('username');
    var firstnameLog = localStorage.getItem('firstname');
    var lastnameLog = localStorage.getItem('lastname');
    var descriptionLog = localStorage.getItem('description');
    var startpriceLog = localStorage.getItem('startprice');
    var lastpriceLog = localStorage.getItem('lastprice');
    if (firstnameLog == "" || lastnameLog == "" || descriptionLog == "" || startpriceLog == "" || lastpriceLog == "") {
        $(".updateProfileWarn").fadeIn().append("<p>Update your profile to be listed on Orculance. <span>Click here to update</span></p>");
        $(".updateProfileWarn").click(function () {
            $(".editProfiles").fadeIn();
        });
    }
    if (!confirmUser) {
        mainHeader = "";
        mainHeader += '<ul class="menuOptions">';
        mainHeader += '<a href="index.html"><li class="active">Home</li></a>';
        // mainHeader += '<li>About Us</li>';
        mainHeader += '<a href="javascript:void(Tawk_API.toggle())"><li><i class="mdi mdi-headphones"></i>Customer Support</li></a>';
        mainHeader += '<li class="logIns">Login</li>';
        mainHeader += '<li class="signUps">Sign Up</li>';
        mainHeader += '</ul>';

        $(".account-menu-header").append(mainHeader);

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
    }
    else {
        mainHeader = "";
        mainHeader += `<ul class="togOptions" style = "margin-right: 10px" >`;
        mainHeader += `<li><i class="mdi mdi-chevron-down togger"></i></li>`;
        mainHeader += `</ul>`;
        mainHeader += `<ul class="togOptions">`;

        var userimage = localStorage.getItem('image');

        mainHeader += `<li><img src="${userimage}" /></li>`;


        mainHeader += `</ul>`;
        mainHeader += '<ul class="menuOptions">';
        mainHeader += '<a href="index.html"><li class="active">Home</li></a>';
        mainHeader += '<a href="javascript:void(Tawk_API.toggle())"><li><i class="mdi mdi-headphones"></i>Customer Support</li></a>';
        mainHeader += '<li class="signUps"><form id="logout"><input type="submit" name="flogout" id="flogout" value="Logout"></form></li>';
        mainHeader += '</ul>';
        mainHeader += `<script>$(".togger").click(function () {
            $(".editAcc").toggle();
        });</script>`;

        $(".account-menu-header").append(mainHeader);
    }

    $('#submitSignForm').submit(function (e) {
        e.preventDefault();

        var email = $('input[name="email"]').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var startprice = $("#startprice").val();
        var lastprice = $("#lastprice").val();
        var phonenumber = $("#number").val();
        var category = $('#category').val();
        var profimage = '';
        var coverimage = '';
        var startprice = '';
        var lastprice = '';
        var description = '';
        var firstname = '';
        var lastname = '';
        var fullDate = new Date();
        var cpassword = $("#cpassword").val();
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

        if (password != cpassword) {
            $(".result").html('<p class="resultDanger">Passwords do not match</p>');
        }
        else if (startprice < lastprice) {
            $(".result").html('<p class="resultDanger">Your highest price must be greater</p>');
        }
        else {
            $.ajax({
                method: "GET",
                dataType: "json",
                url: `http://localhost:3000/users?username=${username}`,
                success: function (res) {
                    if (res.length == 1) {
                        $(".result").html('<p class="resultDanger">Username already exist</p>');
                    }
                    else {
                        var transForm = category.toLowerCase();
                        $.ajax({
                            method: "POST",
                            url: "http://localhost:3000/users",
                            data: {
                                "email": email,
                                "phonenumber": phonenumber,
                                "username": username,
                                "password": password,
                                "firstname": firstname,
                                "lastname": lastname,
                                "startprice": startprice,
                                "lastprice": lastprice,
                                "category": category,
                                "description": description,
                                "profimage": profimage,
                                "coverimage": coverimage,
                                "date": currentDate
                            },
                            success: function (res) {
                                $(".result").html('<p class="resultSuccess">Successful. Kindly Login</p>');
                                location.reload();
                            },
                            beforeSend: function () {
                                $(".result").html("<img class='loadings' src='img/load.gif'>");
                            }
                        });
                    }
                }
            });
        }
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
                    $(".result").append('<p class="resultDanger">Incorrect username or password</p>');
                    setInterval(function () {
                        $(".result").fadeOut();
                    }, 5000);
                }
                else {
                    localStorage.setItem('username', username);
                    localStorage.setItem('image', res[0].profimage);
                    localStorage.setItem('firstname', res[0].firstname);
                    localStorage.setItem('lastname', res[0].lastname);
                    localStorage.setItem('description', res[0].description);
                    localStorage.setItem('startprice', res[0].startprice);
                    localStorage.setItem('lastprice', res[0].lastprice);

                    for (i in res) {
                        if (res[i].status == 1) {
                            $(".result").append('<p class="resultDanger">This account has been deleted.</p>')
                        }

                        else {
                            location.reload();
                        }
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
    $("#logout").click(function (e) {
        e.preventDefault();
        localStorage.clear();
        window.location.assign('index.html');
    });

    var soft = 'Software Engineering';
    soft = soft.toLowerCase();
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users?category=${soft}`,
        dataType: 'JSON',
        success: function (res) {
            console.log(res, $("#featuredView").html(''));
            if (res.length == 0) {
                $("#featuredView").append("Currently no user registered under this category");
            }
            $.each(res, function (index, value) {

                if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                }
                else {
                    usercat = "";
                    usercat += `<div class="card">`;
                    usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                    usercat += `<div class="card-body">`;
                    usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                    usercat += `<p class="card-text">${value.description}</p>`;
                    if (value.startprice != value.lastprice) {
                        usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                    }
                    else {
                        usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                    }
                    usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                    usercat += `</div>`;
                    usercat += `</div>`;

                    $("#featuredView").append(usercat);
                }
            });
        }
    });

    $(".software").click(function () {
        $(this).addClass('active');
        $('.music').removeClass('active');
        $('.fashion').removeClass('active');
        $('.business').removeClass('active');
        $('.life').removeClass('active');
        $('.digital').removeClass('active');
        $('.write').removeClass('active');
        var soft = 'Software Engineering';
        soft = soft.toLowerCase();

        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${soft}`,
            dataType: 'JSON',
            success: function (res) {
                console.log(res, $("#featuredView").html(''));
                if (res.length == 0) {
                    $("#featuredView").append("Currently no user registered under this category");
                }
                $.each(res, function (idex, value) {

                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {
                        usercat = "";
                        usercat += `<div class="card">`;
                        usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        usercat += `<div class="card-body">`;
                        usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                        usercat += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                        }
                        else {
                            usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                        }
                        usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                        usercat += `</div>`;
                        usercat += `</div>`;

                        $("#featuredView").append(usercat);
                    }
                });
            }
        });
    });

    $('.fashion').click(function () {
        $(".featuredView").html();
        $(this).addClass('active');
        $('.music').removeClass('active');
        $('.software').removeClass('active');
        $('.business').removeClass('active');
        $('.life').removeClass('active');
        $('.digital').removeClass('active');
        $('.write').removeClass('active');
        var fashion = 'Fashion';
        fashion = fashion.toLowerCase();

        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${fashion}`,
            dataType: 'JSON',
            success: function (res) {
                console.log(res, $("#featuredView").html(''));
                if (res.length == 0) {
                    $("#featuredView").append("Currently no user registered under this category");
                }
                $.each(res, function (idex, value) {

                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {
                        usercat = "";
                        usercat += `<div class="card">`;
                        usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        usercat += `<div class="card-body">`;
                        usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                        usercat += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                        }
                        else {
                            usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                        }
                        usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                        usercat += `</div>`;
                        usercat += `</div>`;

                        $("#featuredView").append(usercat);
                    }
                });
            }
        });

    });

    $('.business').click(function () {

        $(this).addClass('active');
        $('.music').removeClass('active');
        $('.fashion').removeClass('active');
        $('.software').removeClass('active');
        $('.life').removeClass('active');
        $('.digital').removeClass('active');
        $('.write').removeClass('active');
        var bus = 'Business';
        bus = bus.toLowerCase();

        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${bus}`,
            dataType: 'JSON',
            success: function (res) {
                console.log(res, $("#featuredView").html(''));
                if (res.length == 0) {
                    $("#featuredView").append("Currently no user registered under this category");
                }
                $.each(res, function (index, value) {

                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {
                        usercat = "";
                        usercat += `<div class="card">`;
                        usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        usercat += `<div class="card-body">`;
                        usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                        usercat += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                        }
                        else {
                            usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                        }
                        usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                        usercat += `</div>`;
                        usercat += `</div>`;

                        $("#featuredView").append(usercat);
                    }
                });
            }
        });

    });

    $('.life').click(function () {
        $(this).addClass('active');
        $('.music').removeClass('active');
        $('.fashion').removeClass('active');
        $('.business').removeClass('active');
        $('.software').removeClass('active');
        $('.digital').removeClass('active');
        $('.write').removeClass('active');
        var life = 'Life Style';
        life = life.toLowerCase();

        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${life}`,
            dataType: 'JSON',
            success: function (res) {
                console.log(res, $("#featuredView").html(''));
                if (res.length == 0) {
                    $("#featuredView").append("Currently no user registered under this category");
                }
                $.each(res, function (index, value) {

                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {
                        usercat = "";
                        usercat += `<div class="card">`;
                        usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        usercat += `<div class="card-body">`;
                        usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                        usercat += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                        }
                        else {
                            usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                        }
                        usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                        usercat += `</div>`;
                        usercat += `</div>`;

                        $("#featuredView").append(usercat);
                    }
                });
            }
        });

    });

    $('.music').click(function () {
        $(this).addClass('active');
        $('.software').removeClass('active');
        $('.fashion').removeClass('active');
        $('.business').removeClass('active');
        $('.life').removeClass('active');
        $('.digital').removeClass('active');
        $('.write').removeClass('active');
        var music = 'Music';
        music = music.toLowerCase();
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${music}`,
            dataType: 'JSON',
            success: function (res) {
                if (res.length == 0) {
                    $("#featuredView").append("Currently no user registered under this category");
                }
                console.log(res, $("#featuredView").html(''));
                $.each(res, function (index, value) {

                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {
                        usercat = "";
                        usercat += `<div class="card">`;
                        usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        usercat += `<div class="card-body">`;
                        usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                        usercat += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                        }
                        else {
                            usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                        }
                        usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                        usercat += `</div>`;
                        usercat += `</div>`;

                        $("#featuredView").append(usercat);
                    }
                });
            }
        });

    });

    $('.digital').click(function () {
        $(this).addClass('active');
        $('.music').removeClass('active');
        $('.fashion').removeClass('active');
        $('.business').removeClass('active');
        $('.life').removeClass('active');
        $('.software').removeClass('active');
        $('.write').removeClass('active');
        var digital = 'Digital Marketing';
        digital = digital.toLowerCase();
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${digital}`,
            dataType: 'JSON',
            success: function (res) {
                console.log(res, $("#featuredView").html(''));
                if (res.length == 0) {
                    $("#featuredView").append("Currently no user registered under this category");
                }
                $.each(res, function (index, value) {

                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {
                        usercat = "";
                        usercat += `<div class="card">`;
                        usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        usercat += `<div class="card-body">`;
                        usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                        usercat += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                        }
                        else {
                            usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                        }
                        usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                        usercat += `</div>`;
                        usercat += `</div>`;

                        $("#featuredView").append(usercat);
                    }
                });
            }
        });

    });

    $('.write').click(function () {
        $(this).addClass('active');
        $('.music').removeClass('active');
        $('.software').removeClass('active');
        $('.business').removeClass('active');
        $('.life').removeClass('active');
        $('.digital').removeClass('active');
        var write = 'Writing & Translation';
        write = write.toLowerCase();
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?category=${write}`,
            dataType: 'JSON',
            success: function (res) {
                console.log(res, $("#featuredView").html(''));
                if (res.length == 0) {
                    $("#featuredView").append("Currently no user registered under this category");
                }
                $.each(res, function (index, value) {

                    if (value.firstname == "" || value.description == "" || value.startprice == "" || value.lastprice == "" || value.firstname == "") {

                    }
                    else {
                        usercat = "";
                        usercat += `<div class="card">`;
                        usercat += `<img class="card-img-top" src="${value.coverimage}" alt="Card image cap">`;
                        usercat += `<div class="card-body">`;
                        usercat += `<a href="feeds.html?view=${value.username}"><h5 class="card-title">${value.username}</h5></a>`;
                        usercat += `<p class="card-text">${value.description}</p>`;
                        if (value.startprice != value.lastprice) {
                            usercat += `<span class="product_price">$${value.startprice} - $${value.lastprice}/hour</span>`;
                        }
                        else {
                            usercat += `<span class="product_price">$${value.startprice}/hour</span>`;
                        }
                        usercat += `<p class="card-text"><small class="text-muted">${value.category}</small></p>`;
                        usercat += `</div>`;
                        usercat += `</div>`;

                        $("#featuredView").append(usercat);
                    }
                });
            }
        });

    });

});

$(function () {

    setInterval("slideImages()", 5000);

});

function slideImages() {
    var oCurImage = $("#mainCarousel div.current");
    var oNxtImage = oCurImage.next();

    if (oNxtImage.length == 0) {
        oNxtImage = $("#mainCarousel div:first-child");
    }

    oCurImage.fadeOut().removeClass('current');
    oNxtImage.fadeIn().addClass('current').animate({ opacity: 1.0 }, 1000);
}