function logIn() {
    const form = $('#login');
    const url = '/api/v1/login'
    // Lấy dữ liệu từ form
    const username = form.find('input[name="username"]').val();
    const password = form.find('input[name="password"]').val();
    // var username = form.username.value;
    // var password = form.pass.value;
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            username,
            password
        },
        success: function (data) {
            if (data.code == 200) {
                const user = data.user;
                const accessToken = data.accessToken
                setUser(user);
                window.localStorage.setItem('token', accessToken);
                window.setTimeout(function () {
                    location.reload()
                }, 500)
            } else {
                alert(data.message)
                window.setTimeout(function () {
                    location.reload()
                }, 500)
            }
        },
        error: function (data) {
            alert(data.message)
            window.setTimeout(function () {
                location.reload()
            }, 500)
        }
    });
}