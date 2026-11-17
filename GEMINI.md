# QUY TRÌNH TỰ ĐỘNG CẬP NHẬT GITHUB VÀ WEBSITE (CI/CD)

Tài liệu này quy định quy trình chuẩn dành cho các AI Agent (Gemini, Antigravity,...) và lập trình viên khi làm việc trên dự án này.

---

## 📌 NGUYÊN TẮC AN TOÀN BẮT BUỘC
1. **KHÔNG xóa dữ liệu**: Tuyệt đối không xóa file mã nguồn, thư mục ảnh hoặc tài nguyên dự án.
2. **KHÔNG force push**: Cấm sử dụng `git push --force` hoặc `git push -f` trong mọi trường hợp.
3. **KHÔNG ghi đè thay đổi chưa kiểm tra**: Mọi thay đổi phải được kiểm tra cú pháp và tính toàn vẹn trước khi commit.
4. **XÁC NHẬN TRƯỚC KHI PUSH**: Luôn hỏi và chờ người dùng xác nhận trước khi thực hiện `git push`.

---

## 🔄 QUY TRÌNH LÀM VIỆC 5 BƯỚC

```
[1. Kiểm tra Git & Remote]
         │
         ▼
[2. Sửa code & Kiểm tra lỗi (Syntax/Lint)]
         │
         ▼
[3. Tự động tạo Git Commit (Semantic Message)]
         │
         ▼
[4. Chuẩn bị Push & Hỏi Xác Nhận Người Dùng]
         │
         ▼
[5. Push lên branch 'main' ──► GitHub Actions tự động Deploy lên GitHub Pages]
```

### Bước 1: Kiểm tra kết nối Git & GitHub
- Kiểm tra trạng thái Git:
  ```bash
  git status
  git remote -v
  ```
- Nếu chưa khởi tạo repository:
  ```bash
  git init -b main
  ```
- Nếu chưa có remote URL, yêu cầu/kiểm tra remote:
  ```bash
  git remote add origin https://github.com/<username>/<repo-name>.git
  ```

### Bước 2: Kiểm tra lỗi sau khi sửa code
Sau mỗi lần chỉnh sửa mã nguồn, bắt buộc phải kiểm tra lỗi:
- Kiểm tra cú pháp JavaScript:
  ```bash
  node -c script.js
  ```
- Kiểm tra tính hợp lệ và đường dẫn các file (`index.html`, `style.css`, `script.js`, `img/*`).
- Đảm bảo không có lỗi tham chiếu file bị mất hoặc xung đột.

### Bước 3: Tự động tạo Git Commit
Nếu code hợp lệ và không phát hiện lỗi, tiến hành stage và commit với nội dung mô tả rõ ràng (Semantic Commit):
```bash
git add .
git commit -m "<type>(scope): <mô tả ngắn gọn thay đổi>"
```
*Các type thông dụng:*
- `feat`: Thêm tính năng, giao diện mới.
- `fix`: Sửa lỗi hiển thị, lỗi logic script.
- `style`: Cải tiến giao diện CSS, màu sắc, font chữ.
- `refactor`: Tái cấu trúc code gọn đẹp hơn.
- `docs`: Cập nhật tài liệu (`AGENTS.md`, `README.md`).

### Bước 4: Chuẩn bị & Xin xác nhận trước khi Push
- Đảm bảo branch hiện tại là `main`:
  ```bash
  git branch -M main
  ```
- **DỪNG LẠI và hỏi người dùng**:
  > *"Code đã được kiểm tra và commit thành công với nội dung: `[Nội dung commit]`. Bạn có muốn tôi thực hiện push lên branch `main` của GitHub ngay bây giờ không?"*

### Bước 5: Push và Tự động triển khai GitHub Pages
- Sau khi người dùng đồng ý:
  ```bash
  git push -u origin main
  ```
- Khi code được đẩy lên nhánh `main`, file workflow `.github/workflows/deploy.yml` sẽ tự động kích hoạt **GitHub Actions**:
  - Build và nén toàn bộ mã nguồn website (`index.html`, `style.css`, `script.js`, `img/`).
  - Tự động deploy lên **GitHub Pages** chỉ sau 1-2 phút.
  - Người dùng truy cập website qua đường link: `https://<username>.github.io/<repo-name>/`.

---

## ⚙️ CẤU HÌNH GITHUB PAGES
Để GitHub Actions có quyền triển khai trang web tự động:
1. Vào repository trên GitHub > Chọn tab **Settings**.
2. Chọn mục **Pages** ở menu bên trái.
3. Tại **Build and deployment > Source**, chọn: **GitHub Actions**.
4. Website sẽ tự động cập nhật sau mỗi commit được push lên nhánh `main`.
