var TONGTIEN = 0;
async function init() {
    // get data từ localstorage
    list_products = await getListProducts() || list_products;
    getListAdmin();
    addEventChangeTab();
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user && user.role == 1) {
        addTableProducts();
        addTableDonHang();
        addTableKhachHang();
        addThongKe();
        openTab('Trang Chủ')
    } else {
        document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center; margin: 50px;"> Truy cập bị từ chối.. </h1>`;
    }
}
window.onload = init();

function logOutAdmin() {

}

function getListRandomColor(length) {
    let result = [];
    for (let i = length; i--;) {
        result.push(getRandomColor());
    }
    return result;
}

function addChart(id, chartOption) {
    var ctx = document.getElementById(id).getContext('2d');
    var chart = new Chart(ctx, chartOption);
}
function addChart1(id, chartOption) {
    var ctx = document.getElementById(id).getContext('2d');
    var chart = new Chart(ctx, chartOption);
}

function createChartConfig(
    title = 'Title',
    charType = 'bar',
    labels = ['nothing'],
    data = [2],
    colors = ['red'],
) {
    return {
        type: charType,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                // borderWidth: 2
            }]
        },
        options: {
            title: {
                fontColor: '#fff',
                fontSize: 25,
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
}

async function addThongKe() {
    var orders = await getListOrders();
    var thongKeHang = {}; // Thống kê hãng
    orders.forEach(order => {
        // Nếu đơn hàng bị huỷ thì không tính vào số lượng bán ra
        if (order.status === 3) return;
        var timsp = timKiemTheoMa(list_products, order.product_code);
        let namecompany = timsp.company;
        let quantity = order.quantity;
        let price = timsp.price;
        let thanhTien = quantity * price;
        if (!thongKeHang[namecompany]) {
            thongKeHang[namecompany] = {
                soLuongBanRa: 0,
                doanhThu: 0,
            }
        }

        thongKeHang[namecompany].soLuongBanRa += quantity;
        thongKeHang[namecompany].doanhThu += thanhTien;
    })
    addChart1('myChart2', createChartConfig(
        'Doanh thu',
        'doughnut',
        // Object.keys(thongKeHang), 
        Object.values(thongKeHang).map(_ => _.doanhThu),

        // colors,
    ));

}

// ======================= Các Tab =========================
function addEventChangeTab() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var list_a = sidebar.getElementsByTagName('a');
    for (var a of list_a) {
        if (!a.onclick) {
            a.addEventListener('click', function () {
                turnOff_Active();
                this.classList.add('active');
                var tab = this.childNodes[1].data.trim()
                openTab(tab);
            })
        }
    }
}

function turnOff_Active() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var list_a = sidebar.getElementsByTagName('a');
    for (var a of list_a) {
        a.classList.remove('active');
    }
}

function openTab(nameTab) {
    // ẩn hết
    var main = document.getElementsByClassName('main')[0].children;
    for (var e of main) {
        e.style.display = 'none';
    }

    // mở tab
    switch (nameTab) {
        case 'Trang Chủ': document.getElementsByClassName('home')[0].style.display = 'block'; break;
        case 'Sản Phẩm': document.getElementsByClassName('sanpham')[0].style.display = 'block'; break;
        case 'Đơn Hàng': document.getElementsByClassName('donhang')[0].style.display = 'block'; break;
        case 'Khách Hàng': document.getElementsByClassName('khachhang')[0].style.display = 'block'; break;
    }
}

// ========================== Sản Phẩm ========================
// Vẽ bảng danh sách sản phẩm
async function addTableProducts() {
    const products = await getListProducts();
    var tc = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    for (var i = 0; i < products.length; i++) {
        var p = products[i];
        const promo = JSON.parse(p.promo);
        s += `<tr>
            <td style="width: 5%">` + p.id + `</td>
            <td style="width: 10%">` + p.code + `</td>
            <td style="width: 40%">
                <a title="Xem chi tiết" target="_blank" href="/product/detail/` + p.id + `">` + p.name + `</a>
                <img src="` + p.img + `"></img>
            </td>
            <td style="width: 15%">` + p.price + `</td>
            <td style="width: 15%">` + promoToStringValue(promo) + `</td>
            <td style="width: 15%">
                <div class="tooltip">
                    <i class="fa fa-wrench" onclick="addKhungSuaSanPham('` + p.code + `')"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-trash" onclick="xoaSanPham('` + p.code + `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
    }

    s += `</table>`;

    tc.innerHTML = s;
}

// Tìm kiếm
function timKiemSanPham(inp) {
    var kieuTim = document.getElementsByName('kieuTimSanPham')[0].value;
    var text = inp.value;

    // Lọc
    var vitriKieuTim = { 'ma': 1, 'ten': 2 }; // mảng lưu vị trí cột

    var listTr_table = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

// Thêm
let previewSrc; // biến toàn cục lưu file ảnh đang thêm
function layThongTinSanPhamTuTable(id) {
    var khung = document.getElementById(id);
    var tr = khung.getElementsByTagName('tr');
    var code = tr[1].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value || autoMaSanPham();
    var name = tr[2].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var company = tr[3].getElementsByTagName('td')[1].getElementsByTagName('select')[0].value;
    var img = tr[4].getElementsByTagName('td')[1].getElementsByTagName('img')[0].src;
    var file = tr[4].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var price = tr[5].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var star = tr[6].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var rateCount = tr[7].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var promoName = tr[8].getElementsByTagName('td')[1].getElementsByTagName('select')[0].value;
    var promoValue = tr[9].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var size = tr[11].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var xuatxu = tr[11].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    console.log(file);

    if (isNaN(price)) {
        alert('Giá phải là số nguyên');
        return false;
    }

    if (isNaN(star)) {
        alert('Số sao phải là số nguyên');
        return false;
    }

    if (isNaN(rateCount)) {
        alert('Số đánh giá phải là số nguyên');
        return false;
    }

    try {
        return {
            "id": id,
            "name": name,
            "company": company,
            "img": img,
            "price": numToString(Number.parseInt(price, 10)),
            "star": Number.parseInt(star, 10),
            "rateCount": Number.parseInt(rateCount, 10),
            "promo": {
                "name": promoName,
                "value": promoValue
            },
            "detail": {
                "size": size,
                "xuatxu": xuatxu
            },
            "code": code
        }
    } catch (e) {
        alert('Lỗi: ' + e.toString());
        return false;
    }
}
async function themSanPham() {
    const form = $('#add_product');
    // var newSp = layThongTinSanPhamTuTable('khungThemSanPham');
    // if (!newSp) return;
    const data = {
        name: form.find('input[name="name"]').val(),
        code: form.find('input[name="code"]').val() || autoMaSanPham("aa"),
        company: form.find('select[name="company"]').val(),
        price: form.find('input[name="price"]').val(),
        star: form.find('input[name="star"]').val(),
        rateCount: form.find('input[name="rateCount"]').val(),
        promo: {
            name: form.find('select[name="promo_name"]').val(),
            value: form.find('input[name="promo_value"]').val(),
        },
        detail: {
            size: form.find('input[name="detail_author"]').val(),
            xuatxu: form.find('input[name="detail_origin"]').val(),
        }
    }
    var fileUpload = $('#img')[0].files[0];
    if (!data.name) {
        alert('Tên sản phẩm không được trống');
        return;
    }
    if (!fileUpload) {
        alert('Hình ảnh không được trống');
        return;
    }
    if (isNaN(data.price)) {
        alert('Giá phải là số nguyên');
        return false;
    }

    if (isNaN(data.star)) {
        alert('Số sao phải là số nguyên');
        return false;
    }

    if (isNaN(data.rateCount)) {
        alert('Số đánh giá phải là số nguyên');
        return false;
    }
    const url = `/api/v1/product/add`;
    const accessToken = window.localStorage.getItem('token');
    var formData = new FormData();
    formData.append('img', fileUpload);
    formData.append('name', data.name);
    formData.append('code', data.code);
    formData.append('company', data.company);
    formData.append('price', data.price);
    formData.append('star', data.star);
    formData.append('rateCount', data.rateCount);

    // Append promo data
    formData.append('promo[name]', data.promo.name);
    formData.append('promo[value]', data.promo.value);

    // Append detail data
    formData.append('detail[size]', data.detail.size);
    formData.append('detail[xuatxu]', data.detail.xuatxu);
    const Add = async () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                processData: false, // Prevent jQuery from processing the data
                contentType: false, // Prevent jQuery from setting a content type
                headers: {
                    x_authorization: accessToken,
                },

                success: function (data) {
                    resolve(data)
                },
                error: function (data) {
                    reject(data)
                },
            });
        });
    }
    const status = await Add();
    if (status.code === 200) {
        alert(status.message);
        addTableProducts();

    } else {
        alert(status.message);
    }
    document.getElementById('khungThemSanPham').style.transform = 'scale(0)';
}
function generateRandomString(length) {
    const characters = '0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    return randomString;
}
function autoMaSanPham(company) {
    // hàm tự tạo mã cho sản phẩm mới
    // if (!company) company = document.getElementsByName('chonCompany')[0].value;
    // var index = 0;
    // for (var i = 1; i < list_products.length; i++) {
    //     if (list_products[i].company == company) {
    //         index++;
    //     }
    //     index += i
    // }
    const index = generateRandomString(15)
    document.getElementById('codeThem') == true ? document.getElementById('codeThem').value = company.substring(0, 3) + index : null
    return index
}

// Xóa
async function xoaSanPham(product_code) {
    const product = list_products.find(product => product.code == product_code);

    if (window.confirm('Bạn có chắc muốn xóa ' + product.name)) {
        const url = `/api/v1/product/delete/${product.id}`;
        const accessToken = window.localStorage.getItem('token');
        const Update = async () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "GET",
                    url: url,
                    headers: {
                        x_authorization: accessToken,
                    },
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        reject(data)
                    },
                });
            });
        }
        const status = await Update();
        if (status.code === 200) {
            alert(status.message);
            addTableProducts();
        } else {
            alert(status.message);
        }
    }
}

// Sửa
async function suaSanPham(product_code) {
    const form = $('#edit_product');
    const productEdit = list_products.find(product => product.code == product_code);
    const url = `/api/v1/product/update/${productEdit.id}`;
    const accessToken = window.localStorage.getItem('token');
    const data = {
        name: form.find('input[name="name"]').val(),
        code: form.find('input[name="code"]').val() || autoMaSanPham("aa"),
        company: form.find('select[name="company"]').val(),
        price: form.find('input[name="price"]').val(),
        star: form.find('input[name="star"]').val(),
        rateCount: form.find('input[name="rateCount"]').val(),
        promo: {
            name: form.find('select[name="promo_name"]').val(),
            value: form.find('input[name="promo_value"]').val(),
        },
        detail: {
            size: form.find('input[name="detail_author"]').val(),
            xuatxu: form.find('input[name="detail_origin"]').val(),
        }
    }
    var fileUpload = form.find('#img')[0].files[0];
    if (!data.name) {
        alert('Tên sản phẩm không được trống');
        return;
    }
    if (!fileUpload) {
        alert('Hình ảnh không được trống');
        return;
    }
    if (isNaN(data.price)) {
        alert('Giá phải là số nguyên');
        return false;
    }

    if (isNaN(data.star)) {
        alert('Số sao phải là số nguyên');
        return false;
    }

    if (isNaN(data.rateCount)) {
        alert('Số đánh giá phải là số nguyên');
        return false;
    }
    var formData = new FormData();
    formData.append('img', fileUpload);
    formData.append('name', data.name);
    formData.append('code', data.code);
    formData.append('company', data.company);
    formData.append('price', data.price);
    formData.append('star', data.star);
    formData.append('rateCount', data.rateCount);

    // Append promo data
    formData.append('promo[name]', data.promo.name);
    formData.append('promo[value]', data.promo.value);

    // Append detail data
    formData.append('detail[size]', data.detail.size);
    formData.append('detail[xuatxu]', data.detail.xuatxu);
    const Add = async () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                processData: false, // Prevent jQuery from processing the data
                contentType: false, // Prevent jQuery from setting a content type
                headers: {
                    x_authorization: accessToken,
                },

                success: function (data) {
                    resolve(data)
                },
                error: function (data) {
                    reject(data)
                },
            });
        });
    }
    const status = await Add();
    if (status.code === 200) {
        alert(status.message);
        addTableProducts();

    } else {
        alert(status.message);
    }
    // const accessToken = window.localStorage.getItem('token');
    // const Update = async () => {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             type: "POST",
    //             url: url,
    //             headers: {
    //                 x_authorization: accessToken,
    //             },
    //             data: {
    //                 product
    //             },
    //             success: function (data) {
    //                 resolve(data)
    //             },
    //             error: function (data) {
    //                 reject(data)
    //             },
    //         });
    //     });
    // }
    // const status = await Update();
    // if (status.code === 200) {
    //     alert(status.message);
    //     addTableProducts();
    // } else {
    //     alert(status.message);
    // }
    document.getElementById('khungSuaSanPham').style.transform = 'scale(0)';
}

function addKhungSuaSanPham(code) {
    var product = list_products.find(product => product.code == code);
    var s = `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
    <table id="edit_product" class="overlayTable table-outline table-content table-header">
        <tr>
            <th colspan="2">`+ product.name + `</th>
        </tr>
        <tr>
            <td>Mã sản phẩm:</td>
            <td><input type="text" name="code" value="`+ product.code + `"></td>
        </tr>
        <tr>
            <td>Tên sẩn phẩm:</td>
            <td><input type="text" name="name" value="`+ product.name + `"></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <select name="company">`

                    var company = [""];
                    for (var c of company) {
                        if (product.company == c)
                            s += (`<option value="` + c + `" selected>` + c + `</option>`);
                        else s += (`<option value="` + c + `">` + c + `</option>`);
                    }
                    const promo = JSON.stringify(product.promo);
                    const detail = JSON.stringify(product.detail);
                    s += `
                </select>
            </td>
        </tr>
        <tr>
            <td>Hình:</td>
            <td>
                <img class="hinhDaiDien" id="anhDaiDienSanPhamSua" src="/`+ product.img + `">
                <input type="file" name="file" id="img" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamSua')">
            </td>
        </tr>
        <tr>
            <td>Giá tiền (số nguyên):</td>
            <td><input type="text"  name="price" value="`+ product.price + `"></td>
        </tr>
        <tr>
            <td>Số sao (số nguyên 0->5):</td>
            <td><input type="text" name="star" value="`+ product.star + `"></td>
        </tr>
        <tr>
            <td>Đánh giá (số nguyên):</td>
            <td><input type="text" name="rateCount" value="`+ product.rateCount + `"></td>
        </tr>
        <tr>
            <td>Khuyến mãi:</td>
            <td>
                <select name="promo_name">
                    <option value="">Không</option>
                    <option value="giamgia" `+ (promo.name == 'giamgia' ? 'selected' : '') + `>Giảm giá</option>
                    <option value="giareonline" `+ (promo.name == 'giareonline' ? 'selected' : '') + `>Giá rẻ online</option>
                    <option value="moiramat" `+ (promo.name == 'moiramat' ? 'selected' : '') + `>Mới ra mắt</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>Giá trị khuyến mãi:</td>
            <td><input type="text" name="promo_value" value="`+ promo.value + `"></td>
        </tr>
        <tr>
            <th colspan="2">Thông tin</th>
        </tr>
        <tr>
            <td>Tác giả:</td>
            <td><input type="text" name="detail_author" value="`+ detail.size + `"></td>
        </tr>
        <tr>
            <td>Xuất Xứ:</td>
            <td><input type="text" name="detail_origin" value="`+ detail.xuatxu + `"></td>
        </tr>
        
        <tr>
            <td colspan="2"  class="table-footer"> <button onclick="suaSanPham('`+ product.code + `')">SỬA</button> </td>
        </tr>
    </table>`
    var khung = document.getElementById('khungSuaSanPham');
    khung.innerHTML = s;
    khung.style.transform = 'scale(1)';
}

// Cập nhật ảnh sản phẩm
function capNhatAnhSanPham(files, id) {
    // var url = '';
    // if(files.length) url = window.URL.createObjectURL(files[0]);

    // document.getElementById(id).src = url;

    const reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        previewSrc = reader.result;
        document.getElementById(id).src = previewSrc;
    }, false);

    if (files[0]) {
        reader.readAsDataURL(files[0]);
    }
}

// Sắp Xếp sản phẩm
function sortProductsTable(loai) {
    var list = document.getElementsByClassName('sanpham')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_SanPham); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ... 
    decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_SanPham(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt': return Number(td[0].innerHTML);
        case 'code': return td[1].innerHTML.toLowerCase();
        case 'ten': return td[2].innerHTML.toLowerCase();
        case 'gia': return stringToNum(td[3].innerHTML);
        case 'khuyenmai': return td[4].innerHTML.toLowerCase();
    }
    return false;
}

// ========================= Đơn Hàng ===========================
// Vẽ bảng
async function addTableDonHang() {
    var tc = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    var listDH = await getListOrders();
    var orders = groupOrder(listDH);
    TONGTIEN = 0;
    PRODUCTs = '';

    for (var i = 0; i < orders.length; i++) {
        var d = orders[i];
        var products = d.products;
        products.forEach(product => {
            const productFind = timKiemTheoMa(list_products, product.product_code);
            console.log(product.detail);
            const detail = JSON.stringify(product.detail);
            PRODUCTs += `<p style="text-align: right"> ${productFind.name} [${product?.quantity}] [size: ${detail?.size}]  </p>`;
            TONGTIEN += product.quantity * productFind.price
        })
        let status = 'pending';
        if (d.status == 1) status = 'delivered';
        if (d.status == 2) status = 'canceled';
        s += `<tr>
            <td style="width: 5%">` + (i + 1) + `</td>
            <td style="width: 13%">` + d.order_id + `</td>
            <td style="width: 7%">` + d.user.username + `</td>
            <td style="width: 20%">` + PRODUCTs + `</td>
            <td style="width: 15%">` + TONGTIEN + `</td>
            <td style="width: 10%">` + d.createdAt + `</td>
            <td style="width: 10%">` + status + `</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <i class="fa fa-check" onclick="duyet('`+ d.order_id + `', 1)"></i>
                    <span class="tooltiptext">Duyệt</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="duyet('`+ d.order_id + `', 3)"></i>
                    <span class="tooltiptext">Hủy</span>
                </div>
                
            </td>
        </tr>`;
    }

    s += `</table>`;
    tc.innerHTML = s;
}
async function getListOrders() {
    return new Promise((resolve, reject) => {
        const url = '/api/v1/orders';
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("authorization="));

        $.ajax({
            type: 'GET',
            url: url,
            headers: {
                x_authorization: token
            },
            success: function (data) {
                // Resolve the Promise with the response data
                resolve(data);
            },
            error: function (error) {
                // Reject the Promise with the error message
                reject(error.responseJSON ? error.responseJSON.message : 'An error occurred');
            }
        });
    });
}
async function getListDonHang(traVeDanhSachSanPham = false) {
    var u = await getListUser();
    var d = await getListOrders();
    var result = [];
    for (var i = 0; i < u.length; i++) {
        for (var j = 0; j < d.length; j++) {
            // Tổng tiền
            var tongtien = 0;
            var timsp = timKiemTheoMa(list_products, d[j].product_code);
            var promo = JSON.stringify(timpromo);
            if (promo.name == 'giareonline') tongtien += stringToNum(promo.value);
            else tongtien += timsp.price;
            // Ngày giờ
            var x = new Date(d[j].createdAt).toLocaleString();

            // Các sản phẩm - dạng html
            var sps = '';
            for (var s of d) {
                sps += `<p style="text-align: right">` + (timKiemTheoMa(list_products, d[j].product_code).name + ' [' + d[j].product_code.quantity + ']') + `</p>`;
            }

            // Các sản phẩm - dạng mảng
            var danhSachSanPham = [];
            for (var s of d) {
                danhSachSanPham.push({
                    sanPham: timKiemTheoMa(list_products, d[j].product_code),
                    soLuong: s.quantity,
                });
            }

            // Lưu vào result
            result.push({
                "ma": d[j].createdAt.toString(),
                "khach": u[i].username,
                "sp": traVeDanhSachSanPham ? danhSachSanPham : sps,
                "tongtien": numToString(tongtien),
                "ngaygio": x,
                "tinhTrang": d[j].status
            });
        }
    }
    return result;
}

// Duyệt
function duyet(maDonHang, duyetDon) {
    const url = `/api/v1/order/update/${maDonHang}`;
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authorization="));

    $.ajax({
        type: 'POST',
        url: url,
        headers: {
            x_authorization: token
        },
        data: {
            status: duyetDon
        },
        success: function (data) {
            alert(data.message);
        },
        error: function (error) {
            alert(error.responseJSON.message);
        }
    });
    // // vẽ lại
    addTableDonHang();
}

function locDonHangTheoKhoangNgay() {
    var from = document.getElementById('fromDate').valueAsDate;
    var to = document.getElementById('toDate').valueAsDate;
    var listTr_table = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[5].innerHTML;
        var d = new Date(td);

        if (d >= from && d <= to) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    }
}

function timKiemDonHang(inp) {
    var kieuTim = document.getElementsByName('kieuTimDonHang')[0].value;
    var text = inp.value;
    // Lọc
    var vitriKieuTim = { 'ma': 1, 'khachhang': 2, 'trangThai': 6 };

    var listTr_table = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();
        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

// Sắp xếp
function sortDonHangTable(loai) {
    var list = document.getElementsByClassName('donhang')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_DonHang);
    decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_DonHang(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt': return Number(td[0].innerHTML);
        case 'ma': return new Date(td[1].innerHTML); // chuyển về dạng ngày để so sánh ngày
        case 'khach': return td[2].innerHTML.toLowerCase(); // lấy tên khách
        case 'sanpham': return td[3].children.length;    // lấy số lượng hàng trong đơn này, length ở đây là số lượng <p>
        case 'tongtien': return stringToNum(td[4].innerHTML); // trả về dạng giá tiền
        case 'ngaygio': return new Date(td[5].innerHTML); // chuyển về ngày
        case 'trangthai': return td[6].innerHTML.toLowerCase(); //
    }
    return false;
}

// ====================== Khách Hàng =============================
// Vẽ bảng
async function addTableKhachHang() {
    var tc = document.getElementsByClassName('khachhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    var listUser = await getListUser();
    for (var i = 0; i < listUser.length; i++) {
        var u = listUser[i];
        s += `<tr>
            <td style="width: 5%">` + u.id + `</td>
            <td style="width: 15%">` + u.fullname + `</td>
            <td style="width: 20%">` + u.email + `</td>
            <td style="width: 20%">` + u.username + `</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <label class="switch">
                        <input type="checkbox" `+ (u.status == 0 ? '' : 'checked') + ` onclick="voHieuHoaNguoiDung(this, '` + u.id + `')">
                        <span class="slider round"></span>
                    </label>
                    <span class="tooltiptext">`+ (u.status == 1 ? 'Mở' : 'Khóa') + `</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="xoaNguoiDung('`+ u.id + `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
    }

    s += `</table>`;
    tc.innerHTML = s;
}

// Tìm kiếm
function timKiemNguoiDung(inp) {
    var kieuTim = document.getElementsByName('kieuTimKhachHang')[0].value;
    var text = inp.value;

    // Lọc
    var vitriKieuTim = { 'ten': 1, 'email': 2, 'taikhoan': 3 };

    var listTr_table = document.getElementsByClassName('khachhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

function openThemNguoiDung() {
    window.alert('Not Available!');
}

// vô hiệu hóa người dùng (tạm dừng, không cho đăng nhập vào)
async function voHieuHoaNguoiDung(inp, user_id) {
    // u.off = value;
    const users = await getListUser();
    const user = users.find(user => user.id == user_id)
    const url = `/api/v1/user/update/${user.id}`;
    const accessToken = window.localStorage.getItem('token');
    const Update = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    status: inp.checked ? 1 : 0
                },
                headers: {
                    x_authorization: accessToken,
                },

                success: function (data) {
                    resolve(data)
                },
                error: function (data) {
                    reject(data)
                },
            });
        })
    }
    const status = await Update();
    if (status.code === 200) {
        alert(status.message);
        addTableProducts();
        addTableDonHang();
        var span = inp.parentElement.nextElementSibling;
        span.innerHTML = (inp.checked ? 'Khóa' : 'Mở');
    } else {
        alert(status.message);
    }

}

// Xóa người dùng
async function xoaNguoiDung(user_id) {
    const users = await getListUser();
    const user = users.find(user => user.id == user_id)
    const url = `/api/v1/user/delete/${user.id}`;
    const accessToken = window.localStorage.getItem('token');
    const Delete = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: url,
                headers: {
                    x_authorization: accessToken,
                },

                success: function (data) {
                    resolve(data)
                },
                error: function (data) {
                    reject(data)
                },
            });
        })
    }
    if (window.confirm('Xác nhận xóa ' + user.username + '? \nMọi dữ liệu về ' + user.username + ' sẽ mất! Bao gồm cả những đơn hàng của ' + user.username)) {
        const status = await Delete();
        if (status.code === 200) {
            addTableKhachHang(); // vẽ lại bảng khách hàng
            addTableDonHang(); // vẽ lại bảng đơn hàng
        } else {
            alert(status.message);
        }
    }

}

// Sắp xếp
function sortKhachHangTable(loai) {
    var list = document.getElementsByClassName('khachhang')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_KhachHang);
    decrease = !decrease;
}

function getValueOfTypeInTable_KhachHang(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt': return Number(td[0].innerHTML);
        case 'hoten': return td[1].innerHTML.toLowerCase();
        case 'email': return td[2].innerHTML.toLowerCase();
        case 'taikhoan': return td[3].innerHTML.toLowerCase();
        case 'matkhau': return td[4].innerHTML.toLowerCase();
    }
    return false;
}

// ================== Sort ====================

var decrease = true; // Sắp xếp giảm dần

// loại là tên cột, func là hàm giúp lấy giá trị từ cột loai
function quickSort(arr, left, right, loai, func) {
    var pivot,
        partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right, loai, func);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1, loai, func);
        quickSort(arr, partitionIndex + 1, right, loai, func);
    }
    return arr;
}

function partition(arr, pivot, left, right, loai, func) {
    var pivotValue = func(arr[pivot], loai),
        partitionIndex = left;

    for (var i = left; i < right; i++) {
        if (decrease && func(arr[i], loai) > pivotValue
            || !decrease && func(arr[i], loai) < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    var tempi = arr[i].cloneNode(true);
    var tempj = arr[j].cloneNode(true);
    arr[i].parentNode.replaceChild(tempj, arr[i]);
    arr[j].parentNode.replaceChild(tempi, arr[j]);
}

// ================= các hàm thêm ====================
// Chuyển khuyến mãi vễ dạng chuỗi tiếng việt
function promoToStringValue(pr) {
    switch (pr?.name) {
        // case 'tragop':
        //     return 'Góp ' + pr.value + '%';
        case 'giamgia':
            return 'Giảm ' + pr.value;
        case 'giareonline':
            return 'Online (' + pr.value + ')';
        case 'moiramat':
            return 'Mới';
        default:
            return ''
    }
}

function progress(percent, bg, width, height) {

    return `<div class="progress" style="width: ` + width + `; height:` + height + `">
                <div class="progress-bar bg-info" style="width: ` + percent + `%; background-color:` + bg + `"></div>
            </div>`
}

// for(var i = 0; i < list_products.length; i++) {
//     list_products[i].code = list_products[i].company.substring(0, 3) + vitriCompany(list_products[i], i);
// }

// console.log(JSON.stringify(list_products));