# Hướng dẫn chạy và đăng trang

Trang tĩnh (HTML/JS) + một CSS build sẵn từ Tailwind. Không thư viện ngoài khi chạy, không có bước build trên GitHub Pages: phải build ở máy và commit `css/site.css`.

## Cấu trúc
- `index.html`: trang chủ blog. `about/`: giới thiệu. `topics/<mảng>/`: trang từng mảng. `blog/index.html`: tất cả bài; `blog/<slug>/`: bài (bài mẫu `blog/sample-*`, `noindex`, không vào sitemap). Song ngữ bằng `data-l="vi"` / `data-l="en"`.
- `blog/_template/index.html`: mẫu bài, `noindex`, thư mục bắt đầu bằng `_` nên GitHub Pages không xuất bản.
- `src/tailwind.css`: nguồn Tailwind v4, token trong `@theme`. `css/site.css`: bản build đã minify (commit). `css/fonts.css`: `@font-face` cho phông tự lưu trong `fonts/`.
- `js/script.js`: đổi ngôn ngữ (lưu `localStorage`, dùng chung mọi trang), mô tả trang lấy từ `data-vi`/`data-en` của `<meta name="description">`, năm ở footer.
- `package.json`, `package-lock.json`: Tailwind CLI 4.3.5 (devDependency). `node_modules/` không commit.
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `docs/` (brief, bằng chứng kiểm).

## Build
```
npm install
npm run build
```
Kiểm trước khi merge: chạy `npm run build` rồi `git status` không được báo `css/site.css` thay đổi.

## Chạy thử cục bộ
Liên kết nội bộ là đường dẫn tương đối, nhưng nên dùng server tĩnh: `python -m http.server 8765` rồi mở `http://127.0.0.1:8765/`. Tắt server khi xong.

## Thêm bài mới
Xem mục "Thêm bài blog" trong `README.md`.

## Đăng lên GitHub Pages
Bật tại https://anhdev99.github.io/anhdev99/ (branch `main`, thư mục `/`). Trang cập nhật sau khi merge vào `main`.
Nếu đổi URL, cập nhật `canonical`, `og:url` ở mọi trang, `robots.txt`, `sitemap.xml` và README.

## Chưa dùng
Ảnh đại diện, liên kết mạng xã hội, CV: chờ chủ sở hữu xác nhận.