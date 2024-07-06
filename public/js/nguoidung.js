var User;
var tongTienTatCaDonHang = 0; // lưu tổng tiền từ tất cả các đơn hàng đã mua
var tongSanPhamTatCaDonHang = 0;

window.onload = async function () {
    const list_products = await khoiTao();

    // autocomplete cho khung tim kiem
    autocomplete(document.getElementById('search-box'), list_products);

    User = getUser();
    if (User) {
        // cập nhật từ list user, do trong admin chỉ tác động tới listuser
        // var listUser = getListUser();
        // for (var u of listUser) {
        //     if (equalUser(User, u)) {
        //         User = u;
        //         setUser(u);
        //     }
        // }
        setUser(User);
        addTatCaDonHang(User); // hàm này cần chạy trước để tính được tổng tiền tất cả đơn hàng 
        addInfoUser(User);

    } else {
        var warning = `<h2 style="color: red; font-weight:bold; text-align:center; font-size: 2em; padding: 50px;">
                            Bạn chưa đăng nhập !!
                        </h2>`;
        document.getElementsByClassName('infoUser')[0].innerHTML = warning;
    }
}

// Phần Thông tin người dùng
function addInfoUser(user) {
    if (!user) return;
    document.getElementsByClassName('infoUser')[0].innerHTML = `
    <hr>
    <table>
        <tr>
            <th colspan="3">THÔNG TIN KHÁCH HÀNG</th>
        </tr>
        <tr>
            <td>Tài khoản: </td>
            <td> <input type="text" value="` + user.username + `" readonly> </td>
        </tr>
        <tr>
            <td>Mật khẩu: </td>
            <td style="text-align: center;"> 
                <i class="fa fa-pencil" id="butDoiMatKhau" onclick="openChangePass()"> Đổi mật khẩu</i> 
            </td>
            <td></td>
        </tr>
        <tr>
            <td colspan="3" id="khungDoiMatKhau">
                <table>
                    <tr>
                        <td> <div>Mật khẩu cũ:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td> <div>Mật khẩu mới:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td> <div>Xác nhận mật khẩu:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> 
                            <div><button onclick="changePass()">Đồng ý</button></div> 
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>Email: </td>
            <td> <input type="text" value="` + user.email + `" readonly> </td>
        </tr>
        
        <tr>
            <td colspan="3" style="padding:5px; border-top: 2px solid #ccc;"></td>
        </tr>
       
    </table>`;
}

function openChangePass() {
    var khungChangePass = document.getElementById('khungDoiMatKhau');
    var actived = khungChangePass.classList.contains('active');
    if (actived) khungChangePass.classList.remove('active');
    else khungChangePass.classList.add('active');
}

function changePass() {
    var khungChangePass = document.getElementById('khungDoiMatKhau');
    var inps = khungChangePass.getElementsByTagName('input');
    if (inps[1].value != inps[2].value) {
        alert('Mật khẩu không khớp');
        inps[2].focus();
        return;
    }
    const url = "/api/v1/changepass"; // Replace with the actual API URL
    const accessToken = window.localStorage.getItem('token');
    $.ajax({
        type: "POST",
        url: url,
        headers: {
            x_authorization: accessToken,
        },
        data: {
            oldPass: inps[0].value,
            password: inps[1].value
        },
        success: function (data) {
            alert(data.message);
            window.setTimeout(function () {
                location.reload();
            }, 500);
        },
        error: function (data) {
            alert(data.message);
            window.setTimeout(function () {
                location.reload();
            }, 500);
        },
    });
    // if (inps[0].value != User.pass) {
    //     alert('Sai mật khẩu !!');
    //     inps[0].focus();
    //     return;
    // }
    // if (inps[1] == '') {
    //     inps[1].focus();
    //     alert('Chưa nhập mật khẩu mới !');
    // }
    // if (inps[1].value != inps[2].value) {
    //     alert('Mật khẩu không khớp');
    //     inps[2].focus();
    //     return;
    // }

    // var temp = copyObject(User);
    // User.pass = inps[1].value;

    // // cập nhật danh sách sản phẩm trong localstorage
    // setUser(User);
    // updateListUser(temp, User);

    // // Cập nhật trên header
    // capNhat_ThongTin_User();

    // // thông báo
    // addAlertBox('Thay đổi mật khẩu thành công.', '#5f5', '#000', 4000);
    openChangePass();
}

function changeInfo(iTag, info) {
    var inp = iTag.parentElement.previousElementSibling.getElementsByTagName('input')[0];
    // Đang hiện
    if (!inp.readOnly && inp.value != '') {
        //     if (info == 'username') {
        //         var users = getListUser();
        //         for (var u of users) {
        //             if (u.username == inp.value && u.username != User.username) {
        //                 alert('Tên đã có người sử dụng !!');
        //                 inp.value = User.username;
        //                 return;
        //             }
        //         }
        //         // Đổi tên trong list đơn hàng
        //         if (!User.donhang.length) {
        //             document.getElementsByClassName('listDonHang')[0].innerHTML = `
        //                 <h3 style="width=100%; padding: 50px; color: green; font-size: 2em; text-align: center"> 
        //                     Xin chào ` + inp.value + `. Bạn chưa có đơn hàng nào.
        //                 </h3>`;
        //         }


        //     } else if (info == 'email') {
        //         var users = getListUser();
        //         for (var u of users) {
        //             if (u.email == inp.value && u.username != User.username) {
        //                 alert('Email đã có người sử dụng !!');
        //                 inp.value = User.email;
        //                 return;
        //             }
        //         }
        //     }

        //     var temp = copyObject(User);
        //     User[info] = inp.value;

        //     // cập nhật danh sách sản phẩm trong localstorage
        //     setUser(User);
        //     updateListUser(temp, User);

        //     // Cập nhật trên header
        //     capNhat_ThongTin_User();

        //     iTag.innerHTML = '';

        // } else {
        //     iTag.innerHTML = 'Đồng ý';
        //     inp.focus();
        //     var v = inp.value;
        //     inp.value = '';
        //     inp.value = v;
        // }

        // inp.readOnly = !inp.readOnly;
    }
}
function groupOrder(data) {
    const groupedOrders = {};
    for (const order of data) {
        const { order_id, product_code, quantity, status, createdAt } = order;
        if (!groupedOrders[order_id]) {
            groupedOrders[order_id] = {
                order_id,
                createdAt,
                status,
                products: []
            };
        }
        groupedOrders[order_id].products.push({ product_code, quantity, status, createdAt });
    }

    // Convert groupedOrders object to an array of objects
    const result = Object.values(groupedOrders);
    return result;

}
// Phần thông tin đơn hàng
function addTatCaDonHang(user) {
    const url = `/api/v1/order`; // Replace with the actual API URL
    const token = window.localStorage.getItem('token')
    $.ajax({
        type: "GET",
        url: url, headers: {
            x_authorization: token,
        },
        success: function (data) {
            if (!data) {
                document.getElementsByClassName('listDonHang')[0].innerHTML = `
            <h3 style="width=100%; padding: 50px; color: red; font-size: 2em; text-align: center"> 
                Bạn chưa đăng nhập !!
            </h3>`;
                return;
            }
            if (!data.length) {
                document.getElementsByClassName('listDonHang')[0].innerHTML = `
            <h3 style="width=100%; padding: 50px; color: green; font-size: 2em; text-align: center"> 
                Xin chào ` + User.username + `. Bạn chưa có đơn hàng nào.
            </h3>`;
                return;
            }
            const dataOrder = groupOrder(data)
            for (var dh of dataOrder) {
                addDonHang(dh);
            }
        },
        error: function (data) {
            alert(data.message);
            window.setTimeout(function () {
                location.reload();
            }, 500);
        },
    });
    // user.donhang = user.donhang | []
    // console.log(user);
    // if (!user) {
    //     document.getElementsByClassName('listDonHang')[0].innerHTML = `
    //         <h3 style="width=100%; padding: 50px; color: red; font-size: 2em; text-align: center"> 
    //             Bạn chưa đăng nhập !!
    //         </h3>`;
    //     return;
    // }
    // if (!user.donhang.length) {
    //     document.getElementsByClassName('listDonHang')[0].innerHTML = `
    //         <h3 style="width=100%; padding: 50px; color: green; font-size: 2em; text-align: center"> 
    //             Xin chào ` + User.username + `. Bạn chưa có đơn hàng nào.
    //         </h3>`;
    //     return;
    // }


}

function addDonHang(dh) {
    var div = document.getElementsByClassName('listDonHang')[0];

    var s = `
            <table class="listSanPham">
                <tr> 
                    <th colspan="6">
                        <h3 style="text-align:center;"> Đơn hàng ngày: ` + new Date(dh.ngaymua).toLocaleString() + `</h3> 
                    </th>
                </tr>
                <tr>
                    <th>Order ID</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Thời gian thêm vào giỏ</th> 
                </tr>`;

    var totalPrice = 0;
    for (var i = 0; i < dh.products.length; i++) {
        var code = dh.products[i].product_code;
        var soluongSp = dh.products[i].quantity;
        var p = timKiemTheoMa(list_products, code);
        const promo = JSON.stringify(p.promo)
        var price = (promo.name == 'giareonline' ? promo.value : p.price);
        var thoigian = new Date(dh.products[i].createdAt).toLocaleString();
        var thanhtien = price * soluongSp;

        s += `
                <tr>
                    <td>` + (dh.order_id) + `</td>
                    <td class="noPadding imgHide">
                        <a target="_blank" href="chitietsanpham.html?` + p.name.split(' ').join('-') + `" title="Xem chi tiết">
                            ` + p.name + `
                            <img src="` + p.img + `">
                        </a>
                    </td>
                    <td class="alignRight">` + price + ` ₫</td>
                    <td class="soluong" >
                         ` + soluongSp + `
                    </td>
                    <td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
                    <td style="text-align: center" >` + thoigian + `</td>
                </tr>
            `;
        totalPrice += thanhtien;
        tongSanPhamTatCaDonHang += soluongSp;
    }
    tongTienTatCaDonHang += totalPrice;
    let StatusOrder = 'Pending';
    if (dh.status != 0) {
        StatusOrder = "Success"
    }
    s += `
                <tr style="font-weight:bold; text-align:center; height: 4em;">
                    <td colspan="4">TỔNG TIỀN: </td>
                    <td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
                    <td > ` + StatusOrder + ` </td>
                </tr>
            </table>
            <hr>
        `;
    div.innerHTML += s;
}