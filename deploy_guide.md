# Hướng dẫn chạy và đăng trang

Trang tĩnh thuần (HTML/CSS/JS), không thư viện ngoài, không bước build.

## Cấu trúc
- `index.html`: nội dung song ngữ Việt/Anh (khối `data-l="vi"` / `data-l="en"`).
- `css/style.css`: giao diện theo bố cục blog dạng tạp chí (tham khảo devas.life, theme Ghost "Source"): thanh trên, header 3 cột có thẻ lớn ở giữa, hàng "Chuyên môn", danh sách "Cách làm việc", khối liên hệ, footer màu nhấn. Ảnh thẻ là "cover" vẽ bằng CSS, không tải ảnh ngoài. Chế độ sáng/tối theo hệ thống.
- `js/script.js`: đổi ngôn ngữ (lưu `localStorage`, mặc định theo trình duyệt), năm ở footer.
- `favicon.svg`, `robots.txt`, `sitemap.xml`.
- `docs/brief.md`: brief nội dung.

## Chạy thử cục bộ
Mở thẳng `index.html` bằng trình duyệt, không cần server.

## Sửa nội dung
Sửa cả hai khối `vi` và `en` trong `index.html`. Nếu đổi mô tả trang, sửa thêm `META` trong `js/script.js`.

## Đăng lên GitHub Pages
Đã bật tại https://anhdev99.github.io/anhdev99/ (branch `main`, thư mục `/`). Trang chỉ cập nhật sau khi chủ sở hữu duyệt và merge nhánh `redesign/profile-2026` vào `main`.
Nếu đổi URL, cập nhật `canonical`, `og:url` trong `index.html`, `robots.txt`, `sitemap.xml` và README.

## Chưa dùng
Ảnh đại diện (đang dùng chữ "NK"), liên kết mạng xã hội, CV: chờ chủ sở hữu xác nhận.
