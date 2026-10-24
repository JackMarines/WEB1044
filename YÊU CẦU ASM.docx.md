**YÊU CẦU ASM JAVASCRIPT CƠ BẢN**

**(CÁ NHÂN)**

**I. QUY ĐỊNH CHUNG**

Sinh viên xây dựng một website có giao diện dựa trên **layout/template đã thiết kế bằng Stick AI**.

**1\. Đề tài lựa chọn**

Sinh viên có thể lựa chọn một trong các đề tài:

1. Website bán hàng thời trang  
2. Website đặt phòng khách sạn  
3. Website đặt vé xem phim  
4. Website đặt xe  
5. Website bán đồ ăn  
6. Website đặt tour du lịch  
7. Website bán laptop/điện thoại  
8. Website bán mỹ phẩm  
9. Website khác do sinh viên đề xuất

**\=\> Lưu ý:** Sinh viên có thể lựa chọn đề tài khác nhau nhưng **chức năng JavaScript phải tương đương với yêu cầu của ASM**.

**2\. Quy định về giao diện**

* Giao diện được thiết kế dựa trên layout/template bằng **Stick AI**.  
* Website phải có bố cục rõ ràng, thống nhất giữa các trang.  
* Có khả năng hiển thị tốt trên máy tính và điện thoại.  
* Các nút, liên kết, menu phải hoạt động.  
* Không được chỉ sử dụng HTML/CSS để mô phỏng chức năng JavaScript.

**ASM GĐ1(8/10): ĐẦY ĐỦ GIAO DIỆN TẤT CẢ CÁC TRANG \+ JS TRANG CHỦ ; DANH MỤC; CHI TIẾT; ĐĂNG KÝ; ĐĂNG NHẬP**

**ASM GĐ2(20/10): HOÀN THIỆN** 

**II. CÁC TRANG BẮT BUỘC**

Website tối thiểu phải có các trang sau:

| STT | Trang | Yêu cầu |
| ----- | ----- | ----- |
| 1 | **Trang chủ** | Có nội dung chính \+ ít nhất **4 hiệu ứng/chức năng JS** |
| 2 | **Trang danh mục** | Hiển thị dữ liệu động từ **mảng JavaScript** |
| 3 | **Trang chi tiết** | Hiển thị thông tin đối tượng \+ ít nhất **3 chức năng JS** |
| 4 | **Trang giỏ hàng/đặt chỗ** | Thêm, xóa, cập nhật dữ liệu bằng JS |
| 5 | **Trang thanh toán** | Form \+ kiểm tra dữ liệu bằng JS |
| 6 | **Trang đăng ký** | Form \+ validate bằng JS |
| 7 | **Trang đăng nhập** | Validate \+ xử lý đăng nhập bằng JS |
| 8 | **Trang liên hệ** | Form \+ validate bằng JS |
| 9 | **Trang về chúng tôi** | Nội dung giới thiệu website/doanh nghiệp |
| 10 | **Trang tìm kiếm** | Tìm kiếm dữ liệu bằng JS |
| 11 | **Trang yêu thích** | Thêm/xóa sản phẩm hoặc đối tượng yêu thích bằng JS |
| 12 | **Trang lịch sử đơn hàng/đặt chỗ** | Hiển thị lịch sử dữ liệu bằng JS |
| 13 | **Trang đặt hàng/booking thành công** | Hiển thị thông tin giao dịch sau khi thanh toán |

**II. YÊU CẦU CHI TIẾT TỪNG TRANG**

**1\. Trang chủ**

Trang chủ phải có ít nhất **4 chức năng/hiệu ứng JavaScript**.

Sinh viên có thể lựa chọn:

* Slider/Carousel banner.   
* Nút chuyển ảnh.   
* Countdown.   
* Hiển thị/ẩn nội dung.   
* Tabs.   
* Modal.   
* Quick View.   
* Popup thông báo.   
* Toast notification.   
* Nút yêu thích.   
* Nút Back to Top.   
* Menu mobile.   
* Dark Mode.   
* Hiển thị sản phẩm nổi bật bằng JavaScript. 

**Yêu cầu:** Các hiệu ứng phải thực sự hoạt động bằng JavaScript.

**2\. Trang danh mục**

Dữ liệu không được viết cố định toàn bộ trong HTML.

Sinh viên phải tạo dữ liệu bằng **Array \+ Object**.

JavaScript phải thực hiện:

* Hiển thị danh sách.   
* Hiển thị hình ảnh.   
* Hiển thị tên.   
* Hiển thị giá.   
* Hiển thị thông tin phân loại.   
* Nút xem chi tiết.   
* Nút thêm vào giỏ hàng/đặt chỗ.   
* Tìm kiếm.   
* Lọc dữ liệu.   
* Sắp xếp dữ liệu. 

**3\. Trang chi tiết**

Khi người dùng chọn một đối tượng từ trang danh mục, trang chi tiết phải hiển thị thông tin tương ứng.

Ví dụ website bán hàng:

* Hình ảnh.   
* Tên sản phẩm.   
* Giá.   
* Mô tả.   
* Danh mục.   
* Số lượng.   
* Màu sắc/kích thước.   
* Thêm vào giỏ hàng.   
* Thêm vào yêu thích. 

**4\. Trang giỏ hàng / đặt chỗ**

Trang phải cho phép người dùng quản lý các đối tượng đã lựa chọn.

**Đối với website bán hàng**

* Thêm sản phẩm.   
* Tăng số lượng.   
* Giảm số lượng.   
* Xóa sản phẩm.   
* Xóa toàn bộ giỏ hàng.   
* Tính thành tiền.   
* Tính tổng tiền.   
* Hiển thị số lượng sản phẩm. 

**Đối với website đặt phòng**

* Phòng đã chọn.   
* Ngày nhận phòng.   
* Ngày trả phòng.   
* Số người.   
* Số đêm.   
* Tổng tiền. 

**Đối với website đặt vé phim**

* Phim.   
* Suất chiếu.   
* Ghế.   
* Số lượng vé.   
* Tổng tiền. 

**Đối với website đặt xe**

* Xe.   
* Điểm đón.   
* Điểm trả.   
* Thời gian.   
* Số lượng người.   
* Chi phí. 

**5\. Trang thanh toán**

Sinh viên phải xây dựng form thanh toán và kiểm tra dữ liệu bằng JavaScript.

Các thông tin có thể gồm:

* Họ tên.   
* Email.   
* Số điện thoại.   
* Địa chỉ.   
* Phương thức thanh toán.   
* Ghi chú. 

JavaScript phải kiểm tra:

* Không được để trống.   
* Email đúng định dạng.   
* Số điện thoại hợp lệ.   
* Kiểm tra thông tin bắt buộc.   
* Hiển thị thông báo lỗi.   
* Không cho thanh toán nếu dữ liệu không hợp lệ. 

**6\. Trang đăng ký**

Form tối thiểu:

* Họ tên.   
* Email.   
* Số điện thoại.   
* Mật khẩu.   
* Nhập lại mật khẩu. 

JavaScript phải:

* Kiểm tra dữ liệu.   
* Kiểm tra email.   
* Kiểm tra số điện thoại.   
* Kiểm tra độ dài mật khẩu.   
* Kiểm tra mật khẩu nhập lại.   
* Hiển thị thông báo lỗi/thành công. 

**7\. Trang đăng nhập**

Form:

* Email/Tài khoản.   
* Mật khẩu. 

JavaScript phải:

* Kiểm tra không để trống.   
* Kiểm tra tài khoản.   
* Kiểm tra mật khẩu.   
* Thông báo đăng nhập thành công/thất bại.   
* Lưu trạng thái đăng nhập. 

**8\. Trang liên hệ**

Form tối thiểu:

* Họ tên.   
* Email.   
* Số điện thoại.   
* Nội dung. 

JavaScript phải:

* Validate dữ liệu.   
* Kiểm tra email.   
* Kiểm tra số điện thoại.   
* Kiểm tra nội dung.  
* Hiển thị thông báo gửi thành công.   
* Đếm số ký tự.   
* Giới hạn số ký tự.   
* Xóa form.   
* Popup thông báo.  

**9\. Trang Về chúng tôi**

Trang giới thiệu:

* Giới thiệu doanh nghiệp/website.   
* Sứ mệnh.   
* Dịch vụ/sản phẩm.   
* Đội ngũ.   
* Thông tin liên hệ. 

Có thể bổ sung JavaScript:

* Tabs.   
* Accordion.   
* Slider.   
* Hiển thị thêm nội dung. 

**10\. Trang tìm kiếm**

Người dùng nhập từ khóa.

JavaScript sử dụng dữ liệu trong Array để tìm kiếm.

Yêu cầu:

* Tìm theo tên.   
* Hiển thị kết quả.   
* Thông báo khi không có kết quả. 

Kết hợp: **Tìm kiếm \+ lọc \+ sắp xếp.**

**11\. Trang yêu thích**

Sinh viên phải xây dựng chức năng:

* Thêm vào yêu thích.   
* Xóa khỏi yêu thích.   
* Hiển thị danh sách yêu thích.   
* Hiển thị số lượng yêu thích. 

**12\. Trang lịch sử đơn hàng / đặt chỗ**

Sau khi thanh toán thành công, thông tin giao dịch được lưu lại.

Trang lịch sử phải hiển thị:

* Mã đơn hàng/booking.   
* Ngày đặt.   
* Sản phẩm/phòng/vé/xe.   
* Số lượng.   
* Tổng tiền.   
* Trạng thái. 

