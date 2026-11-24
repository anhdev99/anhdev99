# Brief HOMA-28: chuyển anhdev99 sang Tailwind, bố cục Profile + Blog

Điểm xuất phát: `main` @ `bfd803d` (bản PR #3, HOMA-27). Nguồn token: `css/style.css`, `css/fonts.css`.
Ký hiệu `[CẦN CHỦ SỞ HỮU XÁC NHẬN]` = chưa có dữ kiện, để trống trên trang.
Đã kiểm chứng trong thư mục tạm: Tailwind CLI v4.3.5 build được cấu hình mẫu dưới đây (mục 4), tỉ lệ tương phản tính bằng công thức WCAG 2.x (mục 2.1).

---

## 1. Hướng thẩm mỹ

Giữ tinh thần devas.life/PR #3: blog dạng tạp chí, nền trắng/than, hairline 1px chia cột, một màu nhấn tím .NET, footer khối màu nhấn. Không thêm ảnh, không thêm hiệu ứng.

Lựa chọn có chủ đích (để không giống theme Ghost "Source" gốc):

| Yếu tố | Lựa chọn | Lý do |
|---|---|---|
| Chữ hiển thị | **Bricolage Grotesque** 600–700 cho: logo, tên `h1` ở Profile, tiêu đề bài viết (`h1` trang bài + tiêu đề thẻ ở danh sách Blog). Mọi chữ còn lại giữ **Inter**. | Font đã tự lưu nhưng PR #3 chưa dùng. Bricolage có nét co hẹp, hơi "lệch" — tạo nhận diện riêng mà không đổi bố cục. Chỉ dùng cho tiêu đề lớn để không tải thêm khi không cần (`@font-face` chỉ tải khi có chữ dùng font). |
| Chữ mono | **JetBrains Mono** cho: glyph trên cover, khối code, ngày tháng và thẻ (tag) ở Blog. | Ngày/thẻ dạng mono nhắc tới "dev log", phân biệt metadata với nội dung. |
| Cover | Giữ cover CSS: lưới chấm 16px + glyph mono, 4 bảng màu a–d. Mỗi bài Blog chọn 1 bảng màu + 1 glyph ngắn (≤ 4 ký tự, vd `C#`, `SQL`, `>_`). | Chi tiết nhận diện mạnh nhất của PR #3; thay ảnh, không tải gì thêm. |
| Hero Profile | Giữ khối code tím (`const kiet = {...}`). | Nhận diện. Sửa màu comment (xem 2.1). |
| Nhịp khoảng cách | Hai bậc chính: `gutter` (24→42px) giữa thẻ, `section` (56→100px) giữa khu. Trang bài viết dùng nhịp dọc 1.75em giữa đoạn/khối. | Lấy đúng từ style.css, chỉ đặt tên. |
| Bo góc | 4px cho cover/khối; pill (100px) cho nút, công tắc ngôn ngữ, mailbar. Không có mức thứ ba. | Hai mức = gọn. |
| Màu | Một màu nhấn `#512bd4` (sáng) / `#a891ff` cho chữ nhấn ở tối. Không gradient mới. | |
| Chuyển động | Không có animation. Chỉ `scroll-behavior: smooth` (tắt khi `prefers-reduced-motion: reduce`) và `transition` nền mailbar. | |

Không làm: ảnh đại diện (chưa có), dark-mode toggle thủ công (chỉ theo hệ thống), plugin `@tailwindcss/typography`.

---

## 2. Token cho Tailwind

Tailwind **v4** không dùng `tailwind.config.js`; token khai báo trong `@theme` ở tệp CSS nguồn. Tên token dưới đây = tên biến trong `@theme` → tên utility.

### 2.1 Màu (sáng/tối)

Cách làm: khai báo màu sáng trong `@theme`, ghi đè biến cùng tên trong `@media (prefers-color-scheme: dark) { :root { ... } }`. Utility (`bg-bg`, `text-muted`...) đọc `var(--color-*)` nên tự đổi theo hệ thống. Đã kiểm chứng: output chứa `.bg-bg{background-color:var(--color-bg)}` và khối dark ghi đè.

| Token `@theme` | Sáng | Tối | Dùng cho |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `#15171a` | nền trang |
| `--color-fg` | `#15171a` | `#eceef0` | chữ chính |
| `--color-muted` | `rgb(0 0 0 / .58)` | `rgb(255 255 255 / .62)` | meta, mô tả phụ |
| `--color-line` | `rgb(0 0 0 / .09)` | `rgb(255 255 255 / .12)` | hairline |
| `--color-soft` | `rgb(0 0 0 / .045)` | `rgb(255 255 255 / .06)` | nền khối CTA, công tắc, code |
| `--color-soft-hover` | `rgb(0 0 0 / .07)` | `rgb(255 255 255 / .1)` | hover mailbar |
| `--color-accent` | `#512bd4` | `#512bd4` | nền nút, footer, hero, selection |
| `--color-accent-text` | `#512bd4` | `#a891ff` | tag, link trong bài, outline focus |
| `--color-on-accent` | `#ffffff` | `#ffffff` | chữ trên nền nhấn |
| `--color-cover-a-bg` / `-fg` | `#ece8fb` / `#4a25c4` | `#231d3b` / `#b8a6ff` | cover tím |
| `--color-cover-b-bg` / `-fg` | `#e5f2ea` / `#1c6943` | `#16261d` / `#8fd4ae` | cover xanh lá |
| `--color-cover-c-bg` / `-fg` | `#fbeee3` / `#94450f` | `#2b1f15` / `#f0b084` | cover cam |
| `--color-cover-d-bg` / `-fg` | `#e5edf8` / `#1d4f91` | `#152030` / `#9cc2f5` | cover xanh dương |

Tương phản (đã tính, màu alpha được trộn với nền trước khi tính):

| Cặp | Sáng | Tối | AA chữ thường (≥ 4.5) |
|---|---|---|---|
| fg / bg | 17.96 | 15.44 | đạt |
| muted / bg | 5.33 (`#6b6b6b`) | 7.45 (`#a6a7a8`) | đạt |
| muted / soft (chữ phụ trong CTA) | 4.85 | 6.38 | đạt |
| accent-text / bg | 7.94 | 6.98 | đạt |
| accent-text / soft | 7.22 | 5.97 | đạt |
| on-accent / accent (nút, footer) | 7.94 | 7.94 | đạt |
| copyright `rgb(255 255 255/.78)` / accent | 5.41 | 5.41 | đạt |
| cover a / b / c / d (fg trên bg) | 7.44 / 5.78 / 5.92 / 6.90 | 7.58 / 9.18 / 8.59 / 8.94 | đạt |
| outline focus (accent-text) / bg | 7.94 | 6.98 | đạt (≥ 3, phi văn bản) |
| **comment trong hero code** `rgb(255 255 255/.6)` / accent | **3.80** | 3.80 | **KHÔNG đạt** → đổi alpha thành `.75` (5.12) |
| code `.k #ffd479` / `.s #b6f0c8` trên accent | 5.65 / 6.16 | như sáng | đạt |
| line / bg (hairline) | 1.23 | 1.42 | trang trí, không thuộc yêu cầu |

Màu khối code trong bài viết: chữ `fg` trên `soft` (light `#f4f4f4`: 16.33; dark `#232528`: 13.21) — đạt.

### 2.2 Font

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-display: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Mono', Consolas, Menlo, monospace;
```
`@font-face` giữ nguyên trong `css/fonts.css` (link riêng, như hiện tại) — không đưa vào tệp Tailwind để khỏi lo đường dẫn `url()` bị đổi. Trọng lượng có sẵn: Inter 400–600, Bricolage 500–800, JetBrains Mono 400–600. Không dùng `font-bold` (700) với Inter.
Trang Blog có `<link rel="preload">` cho `inter-latin.woff2` với đường dẫn tương đối đúng cấp thư mục.

### 2.3 Cỡ chữ / line-height / tracking

| Token | Giá trị | line-height | tracking | Dùng |
|---|---|---|---|---|
| `--text-hero` | `clamp(2.25rem, 1.4rem + 2.6vw, 3.5rem)` | 1.05 | -.03em | tên Profile, tiêu đề bài |
| `--text-cta` | `clamp(1.75rem, 1.4rem + 1.36vw, 2.5rem)` | 1.1 | -.025em | tiêu đề CTA, tiêu đề trang Blog |
| `--text-lead` | `clamp(1.0625rem, 1rem + .3vw, 1.25rem)` | 1.45 | -.015em | đoạn mở đầu |
| `--text-post` | `clamp(1.0625rem, 1rem + .2vw, 1.125rem)` | 1.7 | 0 | thân bài viết |
| `--text-title-lg` | `1.25rem` | 1.3 | -.014em | tiêu đề thẻ dạng hàng |
| `--text-title` | `1.1875rem` | 1.3 | -.014em | tiêu đề thẻ |
| (mặc định `text-base`) | `1rem` | 1.6 | | thân Profile |
| `--text-small` | `.9375rem` | 1.45 | | menu, excerpt |
| `--text-meta` | `.8125rem` | 1.45 | | meta, ngày |
| `--text-label` | `.75rem` | 1 | .05em, uppercase | tag, tiêu đề khu |

Cú pháp v4: `--text-hero: ...; --text-hero--line-height: 1.05; --text-hero--letter-spacing: -.03em;` (đã kiểm chứng utility `text-hero` sinh đúng cả 3 thuộc tính).

### 2.4 Khoảng cách, khung, bo góc, breakpoint

```css
--spacing-gutter: clamp(1.5rem, 1rem + 1.5vw, 2.625rem);  /* gap-gutter, px-gutter */
--spacing-section: clamp(3.5rem, 6vw, 6.25rem);           /* mt-section */
--spacing-page: max(4vmin, 1.25rem);                      /* px-page (lề ngoài) */
--container-site: 82.5rem;                                /* max-w-site (1320px) */
--container-measure: 68ch;                                /* max-w-measure: cột chữ bài viết */
--radius-card: 4px;                                       /* rounded-card */
--radius-pill: 100px;                                     /* rounded-pill */
--breakpoint-xs: 30rem;  --breakpoint-sm: 40rem;  --breakpoint-md: 48rem;
--breakpoint-lg: 62rem;  --breakpoint-xl: 75rem;
```
Lưu ý đã kiểm chứng: **không** đặt tên `--container-prose` — utility `max-w-prose` có sẵn của Tailwind (65ch) thắng. Dùng `max-w-measure`.
Lưới tạp chí 16 cột: `grid-cols-16` có sẵn trong v4 (đã kiểm chứng sinh `repeat(16,minmax(0,1fr))`), không cần token.

---

## 3. Cấu trúc trang và điều hướng

GitHub Pages là project site tại `https://anhdev99.github.io/anhdev99/` → **mọi liên kết nội bộ dùng đường dẫn tương đối** (không bắt đầu bằng `/`).

```
index.html                 Profile  (/)
blog/index.html            Danh sách Blog (/blog/)
blog/<slug>/index.html     Một bài (/blog/<slug>/)
blog/_template/index.html  Mẫu bài (không xuất bản, xem mục 5)
```
`<slug>`: chữ thường không dấu, gạch nối, ví dụ `blog/ghi-chu-dotnet-8/`.

### 3.1 Header (dùng chung, chép nguyên khối vào mọi trang)
- Logo `anhdev99` (Bricolage) → trang chủ (`./`, `../`, `../../` tuỳ cấp).
- Menu: **Giới thiệu** (`#about`), **Chuyên môn** (`#stack`), **Cách làm việc** (`#practice`), **Blog** (`blog/`), **GitHub** (ngoài, `rel="noopener noreferrer"`).
  Trên trang Blog, các mục Profile trỏ `../#about`... Mục hiện tại có `aria-current="page"` + gạch chân 2px màu `accent-text`.
- Phải: công tắc VI/EN + nút "Liên hệ" (trên trang Blog trỏ `../#contact`).
- Footer giữ như PR #3, thêm mục Blog.

### 3.2 Profile `/`
Giữ nguyên nội dung và thứ tự PR #3: tạp chí 3 cột (Giới thiệu) → Chuyên môn (4 thẻ) → Cách làm việc (3 hàng) → Liên hệ (mailbar). Thêm **một** khu "Bài viết mới" giữa Cách làm việc và Liên hệ:
- Có bài: tối đa 3 thẻ dạng hàng (`card--row`), link "Xem tất cả / All posts" → `blog/`.
- Chưa có bài: **ẩn cả khu** (không hiện trạng thái trống ở trang chủ).

### 3.3 Danh sách Blog `/blog/`
- Tiêu đề khu: "Blog" + một câu mô tả `[CẦN CHỦ SỞ HỮU XÁC NHẬN]` — tạm dùng: VI "Ghi chép kỹ thuật." / EN "Technical notes."
- Danh sách: thẻ dạng hàng, mới nhất trên cùng, trong lưới 16 cột cột 3–14 (giống `#practice`). Mỗi thẻ: cover (bảng màu + glyph), tiêu đề (Bricolage), excerpt 1–2 câu, meta mono: `<time datetime="YYYY-MM-DD">` · thẻ · nhãn ngôn ngữ nếu bài chỉ có một ngôn ngữ.
- Không phân trang, không trang theo thẻ, không tìm kiếm (thêm khi > ~20 bài).
- **Trạng thái trống** (mặc định khi phát hành, vì chưa có bài thật): một khối `soft`, bo 4px, căn giữa:
  VI "Chưa có bài viết." / EN "No posts yet." + dòng phụ muted VI "Bài đầu tiên sẽ sớm có." / EN "First post coming soon."
  Khuyến nghị dùng trạng thái trống, **không** xuất bản bài mẫu (tránh nội dung bịa).

### 3.4 Một bài `/blog/<slug>/`
Thứ tự dọc, tất cả trong cột `max-w-measure` (68ch) căn giữa, trừ cover:
1. Breadcrumb nhỏ: `Blog` → `../` (link).
2. Thẻ (label, `accent-text`, mono) — văn bản thường, không link.
3. `h1` `text-hero` Bricolage, `text-wrap: balance`.
4. Lead (`text-lead`, muted) — tuỳ chọn.
5. Meta mono: ngày đăng (`<time>`), ngày cập nhật nếu có, thời gian đọc **không** ghi (tránh số liệu ước đoán).
6. Cover rộng `max-w-site` tỉ lệ 1.618 — tuỳ chọn.
7. **Mục lục**: chỉ khi bài có ≥ 3 `h2`. `<nav aria-labelledby>` danh sách link `#id`, đặt sau meta, không sticky, không JS.
8. Thân bài, lớp `.post` (xem dưới).
9. Cuối bài: hairline, "← Tất cả bài viết / All posts", rồi khối CTA liên hệ như Profile (thu gọn).

Kiểu chữ thân bài (`.post`, viết trong `@layer components`, ~25 dòng; không dùng plugin typography):
- `p, ul, ol, pre, blockquote, figure` cách nhau `1.75em` dọc trên; `h2` `1.5rem` Inter 600, trên `2.5em`; `h3` `1.1875rem`.
- Link: `accent-text`, gạch chân `text-underline-offset: .2em`, độ dày 1px; hover dày 2px.
- `code` inline: mono `.9em`, nền `soft`, bo 4px, padding `.1em .3em`. `pre`: nền `soft`, bo 4px, padding 1rem, `overflow-x: auto`, `tabindex="0"` để cuộn bằng bàn phím, không tô màu cú pháp (thêm khi cần).
- `blockquote`: viền trái 2px `accent`, chữ muted.
- `img`: `max-w-full h-auto`, bo 4px, luôn có `alt`; ảnh lưu trong chính thư mục bài.
- `h2/h3` có `id` và `scroll-margin-top: 1.5rem`.

### 3.5 Song ngữ trên Blog
- Khung trang (header, footer, tiêu đề khu, nhãn, trạng thái trống, ngày): dùng **cơ chế hiện có** `data-l="vi"`/`data-l="en"` + `js/script.js`. Ngày ghi sẵn cả hai: VI `24/11/2026`, EN `24 Nov 2026`.
- Thân bài: hai trường hợp, tác giả chọn khi viết:
  - **Có cả hai bản**: `<div class="post" data-l="vi" lang="vi">…</div><div class="post" data-l="en" lang="en">…</div>`. Tiêu đề, lead, excerpt cũng có cặp `data-l`.
  - **Chỉ một ngôn ngữ**: một `<div class="post" lang="vi">` không có `data-l` (luôn hiện). Ở ngôn ngữ còn lại hiện một dòng muted trên thân bài: EN "This post is only available in Vietnamese." (và ngược lại). Thẻ trong danh sách có nhãn mono `VI` hoặc `EN`.
- `js/script.js` cần sửa nhỏ: bỏ hằng `META`, đọc mô tả từ thuộc tính của chính trang: `<meta name="description" content="…VI…" data-vi="…" data-en="…">`. Lý do: mỗi trang có mô tả riêng. Script được nạp bằng đường dẫn tương đối đúng cấp.
- `localStorage['lang']` dùng chung mọi trang (cùng origin) → chọn EN ở Profile thì Blog cũng EN.
- Mỗi trang có `<link rel="canonical">` URL đầy đủ của chính nó; không tạo URL riêng cho EN (một URL, hai ngôn ngữ — giữ như hiện tại).

---

## 4. Build Tailwind (không có bước build trên GitHub)

Phiên bản: **`tailwindcss@4.3.5` + `@tailwindcss/cli@4.3.5`** (mới nhất trên npm ngày 24/11/2026), ghim chính xác (`-E`), devDependency trong repo. Không cài toàn máy, không Play CDN. Node 26 / npm 11 trên máy đã chạy được.

Lệnh cài (một lần, trong repo):
```
npm install -D -E tailwindcss@4.3.5 @tailwindcss/cli@4.3.5
```
(npm sẽ cảnh báo `@parcel/watcher` có install script bị chặn — vô hại; chỉ ảnh hưởng `--watch`, build thường vẫn chạy. Không cần `npm install-scripts approve`.)

`package.json` (tối thiểu):
```json
{
  "private": true,
  "scripts": {
    "build": "tailwindcss -i src/tailwind.css -o css/site.css --minify",
    "watch": "tailwindcss -i src/tailwind.css -o css/site.css --watch"
  },
  "devDependencies": { "@tailwindcss/cli": "4.3.5", "tailwindcss": "4.3.5" }
}
```

`src/tailwind.css` (khung):
```css
@import "tailwindcss" source(none);
@source "../index.html";
@source "../blog/**/*.html";
@source "../js/*.js";

@theme { /* token mục 2 */ }

@media (prefers-color-scheme: dark) {
  :root { /* ghi đè --color-* mục 2.1 */ color-scheme: dark; }
}

html[lang="vi"] [data-l="en"], html[lang="en"] [data-l="vi"] { display: none; }

@layer components { /* .cover, .post, .lang ... những gì utility làm dài dòng */ }
```
`source(none)` + `@source` tường minh: không quét `docs/`, `node_modules/`, `README.md` (tránh sinh lớp thừa từ chữ trong tài liệu).

Tệp được **commit**: `package.json`, `package-lock.json`, `src/tailwind.css`, `css/site.css` (đã minify). Thêm `.gitignore` với `node_modules/`.
Xoá `css/style.css` sau khi chuyển xong (không để hai nguồn CSS). Giữ `css/fonts.css`.
Thứ tự link trong `<head>`: `css/fonts.css` rồi `css/site.css`.

Quy tắc: **sửa HTML có thêm lớp mới → chạy `npm run build` → commit cả `css/site.css`**. Kiểm tra trước khi merge: chạy `npm run build` rồi `git status` không được báo `css/site.css` thay đổi.

Kết quả kiểm chứng (thư mục tạm): `npx tailwindcss -i src/tailwind.css -o out.css --minify` → "Done in 29ms"; output có `.bg-bg{background-color:var(--color-bg)}`, `@media (min-width:62rem){.lg\:grid{display:grid}}`, khối `prefers-color-scheme:dark` và luật `data-l` giữ nguyên.

Không cần `.nojekyll`: `node_modules/` không được commit; thư mục `_template` bị Jekyll bỏ qua là **có chủ đích** (mục 5).

---

## 5. Quy trình thêm bài mới

**Chọn: copy tệp HTML mẫu.** Không dùng Markdown + script.

Lý do: không thêm dependency (bộ chuyển Markdown), không thêm script phải bảo trì; song ngữ bằng `data-l` viết trực tiếp trong HTML dễ hơn tách hai tệp Markdown; số bài dự kiến ít. Nhược điểm chấp nhận: header/footer lặp ở mỗi bài — sửa menu phải sửa mọi tệp (chấp nhận được đến ~20 bài; quá mức đó mới cân nhắc generator).

Mẫu: `blog/_template/index.html` — đủ khung bài (header, meta, mục lục mẫu, thân có cả đoạn/`h2`/code/trích dẫn, CTA, footer), mọi chỗ cần thay đánh dấu `TODO`, có `<meta name="robots" content="noindex">` và nhãn "MẪU / TEMPLATE" ở đầu thân. Thư mục bắt đầu bằng `_` nên GitHub Pages (Jekyll) không xuất bản.

Các bước:
1. Chép `blog/_template/` thành `blog/<slug>/`.
2. Trong `blog/<slug>/index.html`: thay mọi `TODO` — `<title>`, `description` (`content`, `data-vi`, `data-en`), `canonical`, `og:url`, tiêu đề, thẻ, `<time datetime>` + hai cách ghi ngày, bảng màu cover (`a`–`d`) + glyph, thân bài; xoá nhãn MẪU, xoá `noindex`, xoá mục lục nếu < 3 `h2`.
3. Trong `blog/index.html`: chép một thẻ bài lên **đầu** danh sách; nếu đây là bài đầu tiên thì xoá khối trạng thái trống.
4. Trong `index.html` (Profile): cập nhật khu "Bài viết mới" (tối đa 3 thẻ; bỏ thuộc tính `hidden` của khu khi có bài đầu tiên).
5. `sitemap.xml`: thêm `<url><loc>https://anhdev99.github.io/anhdev99/blog/<slug>/</loc></url>` (và `/blog/` ở lần đầu).
6. `npm run build`, mở `blog/<slug>/index.html` kiểm tra VI/EN, sáng/tối, 360px.
7. Commit (gồm `css/site.css`), mở PR.

`grep -rn TODO blog/<slug>/` phải rỗng trước khi commit.

---

## 6. Nội dung giữ / ẩn

Giữ (nguyên văn PR #3): tên, chức danh "anhdev99 - Nguyễn Tuấn Kiệt (Fullstack Developer)" trong `<title>`/OG, câu giới thiệu, "anhdev99 (Steven)", 4 nhóm chuyên môn, 3 mục cách làm việc, "Ngoài giờ: Âm nhạc và game", "Đang học: C#/.NET, Vue.js và AI", ghi chú "Dự án tôi làm phần lớn là nội bộ…", liên hệ `anhdev99@gmail.com` + `github.com/anhdev99`.

Ẩn / không thêm: tên dự án, repo private, khách hàng; Chủ tịch/Founder; mạng xã hội khác; ảnh đại diện; số năm kinh nghiệm; mức thành thạo; bất kỳ liên kết/trích dẫn nào tới `KIET-NGUYEN-TUAN-TopCV.vn-101225.94204.pdf`; dịch vụ ngoài (CDN, analytics, font Google, embed); bài viết hay số liệu bịa.

[CẦN CHỦ SỞ HỮU XÁC NHẬN]
1. Ảnh đại diện: có dùng không, tệp nào.
2. Vai trò cụ thể tại Altek Đồng Tháp / DThU; DThU có phải Trường Đại học Đồng Tháp. Trang hiện chỉ ghi "Làm việc tại Altek Đồng Tháp và DThU" — giữ nguyên, không thêm chức vụ.
3. Số năm kinh nghiệm, mức thành thạo: để trống.
4. Câu mô tả Blog (tạm "Ghi chép kỹ thuật." / "Technical notes.").
5. Chủ đề/ngôn ngữ mặc định cho bài viết (VI, EN hay cả hai) — ảnh hưởng mẫu ở mục 5.
6. Tệp CV PDF đang nằm công khai trong repo public: có muốn gỡ không. Việc gỡ/viết lại lịch sử git do chủ sở hữu tự làm; agent không xoá.

---

## Ghi chú cho Engineer
- Không thêm `@tailwindcss/typography`, không thêm framework JS, không generator. Mọi thứ trên là HTML tĩnh + một CSS build sẵn.
- Kiểm tra chất lượng như PR #3: 360px không cuộn ngang, sáng/tối, Tab đi hết menu/công tắc/link với focus thấy rõ, `prefers-reduced-motion`.
- Sửa `README.md`/`deploy_guide.md` phần cấu trúc + lệnh build.
