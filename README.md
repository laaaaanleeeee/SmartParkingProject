# Smart Parking 🚗  
Ứng dụng web mô phỏng hệ thống quản lý bãi đỗ xe và đặt chỗ online.  

## 📋 Giới thiệu (Introduction)  
- **Quy mô:** Project cá nhân (solo).  
- **Mục tiêu:** Xây dựng nguyên mẫu (prototype) quản lý bãi đỗ xe với chức năng đặt chỗ cơ bản, quản lý người dùng theo vai trò (Admin, Owner, Customer).  
- **Điểm nổi bật:**  
  - Quy trình booking đơn giản cho khách hàng.  
  - Quản lý bãi xe cho chủ bãi.  
  - Mô phỏng thanh toán (có đếm ngược thời gian, trạng thái pending → confirmed/cancelled).  

---

## ⚙️ Công nghệ sử dụng (Tech Stack)  
- **Frontend:** ReactJS, TailwindCSS, Ant Design  
- **Backend:** Spring Boot  
- **Database:** MySQL  

---

## 🎯 Tính năng chính (Features)  
### 👤 Customer  
- Đặt chỗ bãi đỗ cơ bản (chọn vị trí, thời gian).  
- Xem trạng thái booking (`Pending → Confirmed / Cancelled`).  

### 🏢 Owner  
- Quản lý bãi đỗ xe (thêm/sửa/xóa).  
- Quản lý booking từ khách hàng.  

### ⚙️ Admin  
- CRUD cơ bản: quản lý user, bãi đỗ, booking.  

### 💳 Payment Simulation  
- Người dùng chọn phương thức thanh toán.  
- Màn hình thanh toán hiển thị **QR code cố định** trong 60 giây.  
- Sau khi hết thời gian → booking tự động hủy.  
- Nếu nhấn xác nhận trong thời gian hợp lệ → booking chuyển sang **confirmed**.  

---

## 🚀 Cài đặt & chạy ứng dụng (Setup & Run)  
### Backend (Spring Boot)  
```bash
# Clone repository
git clone https://github.com/laaaaanleeeee/SmartParkingProject.git
cd SmartParkingProject/backend

# Cấu hình MySQL trong application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_parking
spring.datasource.username=root
spring.datasource.password=your_password

# Chạy ứng dụng
mvn spring-boot:run
```

### Frontend (ReactJS)
```bash
# Di chuyển đến thư mục frontend
cd ../frontend

# Cài đặt dependencies
npm install

# Chạy server development với nodemon
npm run dev 
```

---

### 📊 Outcome
- Hoàn thiện prototype với flow booking + quản lý vai trò cơ bản.
- Tích hợp mô phỏng thanh toán để xác nhận/hủy đơn đặt.
- Củng cố kỹ năng fullstack (ReactJS + Spring Boot + MySQL).
