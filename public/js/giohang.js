var User; // user hiện tại, biến toàn cục
window.onload = async function () {
	const list_products = await khoiTao();

	// autocomplete cho khung tim kiem
	autocomplete(document.getElementById('search-box'), list_products);

	User = getUser();
	addProductToTable(User);
}

function addProductToTable(user) {
	user.products = user.products || []
	var table = document.getElementsByClassName('listSanPham')[0];
	var s = `
		<tbody>
			<tr>
				<th>STT</th>
				<th>Sản phẩm</th>
				<th>Giá</th>
				<th>Số lượng</th>
				<th>Thành tiền</th>
				<th>Thời gian</th>
				<th>Xóa</th>
			</tr>`;

	if (!user) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:red; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	} else if (user.products.length == 0) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:green; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Giỏ hàng trống !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	}

	var totalPrice = 0;
	for (var i = 0; i < user.products.length; i++) {
		var code = user.products[i].ma;
		var soluongSp = user.products[i].soluong;
		var p = timKiemTheoMa(list_products, code);
		const promo = JSON.stringify(p.promo)
		var price = (promo.name == 'giareonline' ? promo.value : p.price);
		var thoigian = new Date(user.products[i].date).toLocaleString();
		var thanhtien = price * soluongSp;

		s += `
			<tr>
				<td>` + (i + 1) + `</td>
				<td class="noPadding imgHide">
					<a target="_blank" href="/product/detail/` + p.id + `" title="Xem chi tiết">
						` + p.name + `
						<img src="` + p.img + `">
					</a>
				</td>
				<td class="alignRight" >` + price + ` ₫</td>
				<td class="soluong" >
					<button onclick="giamSoLuong('` + code + `')"><i class="fa fa-minus"></i></button>
					<input size="1" onchange="capNhatSoLuongFromInput(this, '` + code + `')" value=` + soluongSp + `>
					<button onclick="tangSoLuong('` + code + `')"><i class="fa fa-plus"></i></button>
				</td>
				<td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
				<td style="text-align: center" >` + thoigian + `</td>
				<td class="noPadding"> <i class="fa fa-trash" onclick="xoaSanPhamTrongGioHang(` + i + `)"></i> </td>
			</tr>
		`;
		// Chú ý nháy cho đúng ở giamsoluong, tangsoluong
		totalPrice += thanhtien;
	}

	s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="4">TỔNG TIỀN: </td>
				<td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
				<input id="amountTotal" hidden value=` + totalPrice + ` />
				<td class="thanhtoan" onclick="showModal(true)"> Thanh Toán </td>
				<td class="xoaHet" onclick="xoaHet()"> Xóa hết </td>
			</tr>
		</tbody>
	`;

	table.innerHTML = s;
}

function xoaSanPhamTrongGioHang(i) {
	if (window.confirm('Xác nhận hủy mua')) {
		User.products.splice(i, 1);
		capNhatMoiThu();
	}
}
const random = (type, length) => {
	let result = "";
	switch (type) {
		case "text":
			var characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			break;
		case "num":
			var characters = "0123456789";
			break;
		default:
			var characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	}
	let charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
};
function showModal(show) {
	var value = (show ? "scale(1)" : "scale(0)");
	var div = document.getElementsByClassName('modal')[0];
	div.style.transform = value;
	writeAmount();
}
async function writeAmount() {
	const amount = $('#amountTotal').val();
	const order_id = random('num', 15);
	const GetQR = async () => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "POST",
				headers: {
					"x-client-id": "fd6bf9de-121a-498b-b5be-4a08a4bc7700",
					"x-api-key": "5413699f-39ec-426c-9beb-dd1cda4a76f3"
				},
				url: 'https://api.vietqr.io/v2/generate',
				data: {
					"accountNo": 113366668888,
					"accountName": "Shop shoes",
					"acqId": 970415,
					"amount": amount,
					"addInfo": `Order: ${order_id}`,
					"format": "text",
					"template": "compact2"
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

	const QR = await GetQR();
	if (QR.code == '00') {
		const form = $('#payment');
		const img = form.find('#QR');
		const button = form.find('#confirm');
		const order = form.find('#order_id');
		order.val(order_id);
		img.attr('src', QR.data.qrDataURL)
		button.attr('disabled', false);
	}

}
function thanhToan() {
	var c_user = getUser();
	User.donhang = User.donhang || []
	if (c_user.off) {
		alert('Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!');
		addAlertBox('Tài khoản của bạn đã bị khóa bởi Admin.', '#aa0000', '#fff', 10000);
		return;
	}

	if (!User.products.length) {
		addAlertBox('Không có mặt hàng nào cần thanh toán !!', '#ffb400', '#fff', 2000);
		return;
	}
	if (window.confirm('Thanh toán giỏ hàng ?')) {
		const products = User.products;
		// const order_id = random('num', 15);
		// console.log(order_id);
		const form = $('#payment');
		const order_id = form.find('#order_id').val();
		products.forEach(async (product) => {
			const dataOrder = {
				order_id: order_id,
				product_code: product.ma,
				quantity: product.soluong,
				status: 0,
			}
			await StoreOrder(dataOrder)
		})
		User.donhang.push({
			"sp": User.products,
			"ngaymua": new Date(),
			"tinhTrang": 'Đang chờ xử lý'
		});
		User.products = [];
		capNhatMoiThu();
		addAlertBox('Các sản phẩm đã được gửi vào đơn hàng và chờ xử lý.', '#17c671', '#fff', 4000);
		showModal(false);
	}
}
async function StoreOrder(order) {
	const url = `/api/v1/order/create`; // Replace with the actual API URL
	const token = window.localStorage.getItem('token');
	$.ajax({
		type: "POST",
		url: url,
		data: order,
		headers: {
			x_authorization: token,
		},
		success: function (data) {

		},
		error: function (data) {
			alert(data.message);
			window.setTimeout(function () {
				location.reload();
			}, 500);
		},
	});
}
function xoaHet() {
	if (User.products.length) {
		if (window.confirm('Bạn có chắc chắn muốn xóa hết sản phẩm trong giỏ !!')) {
			User.products = [];
			capNhatMoiThu();
		}
	}
}

// Cập nhật số lượng lúc nhập số lượng vào input
function capNhatSoLuongFromInput(inp, code) {
	var soLuongMoi = Number(inp.value);
	if (!soLuongMoi || soLuongMoi <= 0) soLuongMoi = 1;

	for (var p of User.products) {
		if (p.ma == code) {
			p.soluong = soLuongMoi;
		}
	}

	capNhatMoiThu();
}

function tangSoLuong(code) {
	for (var p of User.products) {
		if (p.ma == code) {
			p.soluong++;
		}
	}

	capNhatMoiThu();
}

function giamSoLuong(code) {
	for (var p of User.products) {
		if (p.ma == code) {
			if (p.soluong > 1) {
				p.soluong--;
			} else {
				return;
			}
		}
	}

	capNhatMoiThu();
}

function capNhatMoiThu() { // Mọi thứ
	animateCartNumber();

	// cập nhật danh sách sản phẩm trong localstorage
	setUser(User);

	// cập nhật danh sách sản phẩm ở table
	addProductToTable(User);

	// Cập nhật trên header
	capNhat_ThongTin_User();
}
