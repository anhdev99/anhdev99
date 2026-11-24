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

## Cấu trúc

```
index.html                trang chủ blog (3 ô mảng + 6 bài mới)
about/                    giới thiệu (Profile)
blog/                     tất cả bài; blog/<slug>/ một bài; blog/_template/ mẫu (không xuất bản)
topics/{teaching,dev,research}/   trang từng mảng (lọc bằng link tĩnh, không JS)
```

## Thêm bài blog

1. Chép `blog/_template/` thành `blog/<slug>/` (slug: chữ thường, không dấu, gạch nối).
2. Trong `blog/<slug>/index.html`: thay mọi `TODO` (title, description, canonical, og, ngày, mảng, thẻ, nội dung), xoá nhãn MẪU và `<meta name="robots" content="noindex">`; xoá mục lục nếu dưới 3 mục `h2`. Chỉ một ngôn ngữ: dùng một `<div class="post" lang="vi">` không có `data-l`.
3. Chép thẻ bài (xem thẻ mẫu trong `blog/index.html`) vào: trang chủ (giữ 6 bài mới nhất), `blog/index.html`, trang mảng `topics/<mảng>/index.html`. Cập nhật số bài ở ô mảng trên trang chủ. Bài thuộc loạt: cập nhật hộp loạt ở mọi bài cùng loạt.
4. `sitemap.xml`: thêm `<url><loc>https://anhdev99.github.io/anhdev99/blog/<slug>/</loc></url>`.
5. `npm run build`, kiểm VI/EN, sáng/tối, 360px; `grep -rn TODO blog/<slug>/` phải rỗng. Commit (gồm `css/site.css`), mở PR vào `develop`.

## Gỡ bài mẫu

1. Xoá `blog/sample-*`.
2. `grep -rn data-sample .` rồi xoá các thẻ bài mẫu ở trang chủ, `blog/index.html`, `topics/*/index.html` (khối trạng thái trống có sẵn trong comment).
3. Sửa số bài ở ô mảng trên trang chủ; `npm run build`.
