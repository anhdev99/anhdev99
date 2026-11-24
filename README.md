# Nguyễn Tuấn Kiệt (anhdev99)

**Fullstack Developer** · Vietnam

**VI** · Lập trình viên fullstack, làm việc chủ yếu với C#/.NET và Vue.js. Hiện làm tại Altek Đồng Tháp và DThU, đang đào sâu C#/.NET, Vue.js và AI.

**EN** · Fullstack developer working mainly with C#/.NET and Vue.js. Currently at Altek Dong Thap and DThU, deepening my skills in C#/.NET, Vue.js and AI.

**Stack:** C# / .NET · Node.js · Python · Vue.js · Nuxt.js · React · Next.js · SQL Server · PostgreSQL · MongoDB · Redis · Docker · Linux

- Website: https://anhdev99.github.io/anhdev99/
- Email: anhdev99@gmail.com

## Phát triển

Giao diện dùng Tailwind CSS v4 (CLI, devDependency; không dùng CDN). GitHub Pages chỉ phục vụ tệp tĩnh nên `css/site.css` được build sẵn và commit.

```
npm install        # một lần
npm run build      # src/tailwind.css -> css/site.css (minify)
npm run watch      # build lại khi sửa
```

Sửa HTML có thêm lớp Tailwind mới -> `npm run build` -> commit cả `css/site.css`. Token (màu, cỡ chữ, khoảng cách) nằm trong `@theme` của `src/tailwind.css`.

## Thêm bài blog

1. Chép `blog/_template/` thành `blog/<slug>/` (slug: chữ thường, không dấu, gạch nối).
2. Trong `blog/<slug>/index.html`: thay mọi `TODO` (title, description, canonical, og, ngày, thẻ, nội dung), xoá nhãn MẪU và `<meta name="robots" content="noindex">`; xoá mục lục nếu dưới 3 mục `h2`. Chỉ một ngôn ngữ: dùng một `<div class="post" lang="vi">` không có `data-l`.
3. `blog/index.html`: dán thẻ bài (mẫu trong comment) lên đầu danh sách, xoá khối "Chưa có bài viết".
4. `index.html`: dán thẻ vào khu `#latest` (tối đa 3), bỏ thuộc tính `hidden`.
5. `sitemap.xml`: thêm `<url><loc>https://anhdev99.github.io/anhdev99/blog/<slug>/</loc></url>`.
6. `npm run build`, kiểm VI/EN, sáng/tối, 360px; `grep -rn TODO blog/<slug>/` phải rỗng. Commit (gồm `css/site.css`), mở PR.