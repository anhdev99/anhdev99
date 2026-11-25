# Brief HOMA-37: biến anhdev99 thành blog (UI trước)

Điểm xuất phát: `develop` @ `f049fca` (HOMA-28 + fix HOMA-32). Hệ thiết kế: `docs/brief-homa-28.md` (token, font, cover, song ngữ, a11y). Brief này chỉ ghi **phần thay đổi**; mọi thứ không nhắc tới giữ nguyên HOMA-28.
Ký hiệu `[CẦN CHỦ SỞ HỮU XÁC NHẬN]` = chưa có dữ kiện, không bịa.
Đã kiểm chứng: (a) tương phản tính theo WCAG 2.x (node, màu alpha trộn với nền trước); (b) các lớp component mới ở mục 3 build được bằng Tailwind CLI 4.3.5 của repo (thư mục tạm, "Done in 42ms", output có `.chip[aria-current]`, `.dot{background-color:var(--cover-fg)}`).

---

## 1. Sơ đồ trang và URL

Mọi link nội bộ vẫn **tương đối** (project site `https://anhdev99.github.io/anhdev99/`).

```
index.html                         /                  Trang chủ blog (bài mới + lọc theo mảng)
about/index.html                   /about/            Giới thiệu (Profile cũ, viết lại)
blog/index.html                    /blog/             Tất cả bài (danh sách đầy đủ, nhóm theo năm)
topics/teaching/index.html         /topics/teaching/  Mảng Giảng dạy
topics/dev/index.html              /topics/dev/       Mảng Dev
topics/research/index.html         /topics/research/  Mảng Nghiên cứu
blog/<slug>/index.html             /blog/<slug>/      Một bài
blog/_template/index.html          (không xuất bản)   Mẫu bài, cập nhật theo mục 6
```

Quyết định:
- **Lọc = trang tĩnh theo mảng** (`/topics/<mảng>/`), không JS. Lý do: chạy khi tắt JS, URL chia sẻ được, back/forward đúng, không thêm script. Giá phải trả: thẻ bài lặp ở 2–3 tệp (trang chủ, `/blog/`, trang mảng) — chấp nhận được đến ~20 bài (cùng ngưỡng HOMA-28).
- **Thẻ con** (OOP, React Native, Computer vision...) chỉ hiển thị dạng chữ mono trong meta, **không** có trang riêng. Thêm trang thẻ khi một thẻ có ≥ 5 bài.
- Slug mảng tiếng Anh, cố định (`teaching`, `dev`, `research`); chữ hiển thị song ngữ bằng `data-l`.
- `/blog/` giữ URL cũ (đã có trong sitemap). `/` không còn Profile.
- Anchor cũ `/#about`, `/#stack`, `/#practice`, `/#contact`: bỏ, không làm redirect. Link ngoài trỏ vào sẽ rơi về đầu trang chủ (vô hại). Các `id` này chuyển sang `/about/`.
- `sitemap.xml`: `/`, `/about/`, `/blog/`, 3 trang `/topics/*/`. **Không** đưa bài mẫu vào sitemap.

Đường dẫn tương đối theo cấp:

| Trang | Về gốc | CSS/JS/font |
|---|---|---|
| `/` | `./` | `css/…` |
| `/about/`, `/blog/` | `../` | `../css/…` |
| `/topics/x/`, `/blog/<slug>/` | `../../` | `../../css/…` |

### 1.1 Header mới (mọi trang)
```
[anhdev99]  Bài viết · Giảng dạy · Dev · Nghiên cứu · Giới thiệu      [VI|EN] [Liên hệ]
```
| Mục | VI | EN | Đích (từ gốc) |
|---|---|---|---|
| logo | anhdev99 | anhdev99 | `./` |
| 1 | Bài viết | Posts | `blog/` |
| 2 | Giảng dạy | Teaching | `topics/teaching/` |
| 3 | Dev | Dev | `topics/dev/` |
| 4 | Nghiên cứu | Research | `topics/research/` |
| 5 | Giới thiệu | About | `about/` |
| nút | Liên hệ | Contact | `about/#contact` |

- Bỏ GitHub khỏi header (đã có ở footer + About) để menu 5 mục vừa 1 hàng ở ≥ 62rem.
- `aria-current="page"` trên mục đang đứng (giữ gạch chân `.nav-link[aria-current]`). Trang bài: đặt `aria-current="true"` trên **mảng của bài** (không phải `page`).
- Trang chủ: không mục nào có `aria-current` (logo là đường về).
- Dưới 62rem: giữ hành vi hiện có (menu thành hàng cuộn ngang dưới logo). Đã có 5 mục như cũ nên không đổi chiều rộng đáng kể.

### 1.2 Footer mới
Giữ `footer-bar`. `footer-menu`: Bài viết · Giảng dạy · Dev · Nghiên cứu · Giới thiệu · GitHub (ngoài, `rel="noopener noreferrer"`). Logo → trang chủ. Copyright giữ.

---

## 2. Ba mảng (hệ chủ đề)

| Mảng | slug | VI | EN | Cover | Glyph mảng | Thẻ con (VI / EN, viết thường mono) |
|---|---|---|---|---|---|---|
| Giảng dạy | `teaching` | Giảng dạy | Teaching | `cover-d` (xanh dương) | `</>` | `oop`, `react-native`, `frontend`, `backend` |
| Dev | `dev` | Dev | Dev | `cover-a` (tím) | `>_` | `ai-agent`, `llm`, `tooling` |
| Nghiên cứu | `research` | Nghiên cứu | Research | `cover-b` (xanh lá) | `[·]` | `computer-vision`, `chatbot` |

- `cover-c` (cam) để trống cho mảng thứ tư sau này / bài "khác". Không thêm màu mới.
- Thẻ con giữ tiếng Anh dạng slug cho cả hai ngôn ngữ (thuật ngữ ngành, tránh dịch hai lần).
- Glyph **bài** (trên cover từng bài) chọn riêng, ≤ 4 ký tự; glyph mảng dùng ở đầu trang mảng và ô mảng trên trang chủ.
- Mô tả một câu cho mỗi mảng (dùng ở trang chủ + đầu trang mảng):
  - Giảng dạy: VI "Bài giảng và ghi chú cho các môn OOP, React Native, Frontend, Backend." / EN "Lecture notes for OOP, React Native, Frontend and Backend courses."
  - Dev: VI "Ghi chép khi xây AI agent và công cụ phát triển." / EN "Notes from building AI agents and developer tools."
  - Nghiên cứu: VI "Ghi chép nghiên cứu về computer vision và chatbot." / EN "Research notes on computer vision and chatbots."

Tương phản (đã tính) cho chữ màu cover trên nền trang — dùng ở chấm mảng/nhãn mảng:

| fg cover | trên `bg` sáng / tối | trên `soft` sáng / tối |
|---|---|---|
| a (tím) | 8.93 / 8.50 | 8.11 / 7.27 |
| b (xanh lá) | 6.66 / 10.43 | 6.06 / 8.92 |
| d (xanh dương) | 8.14 / 9.79 | 7.40 / 8.38 |

Chữ `fg` trên nền cover a/b/c/d: sáng 14.97/15.58/15.77/15.22, tối 13.78/13.58/13.79/14.09; `muted` trên nền cover: sáng ≥ 5.06, tối ≥ 6.90. Tất cả đạt AA (≥ 4.5). **Không cần token màu mới.**

---

## 3. Lớp component mới (thêm vào `@layer components` của `src/tailwind.css`)

Chỉ 4 lớp. Đã build thử, sinh đúng.

```css
/* Chip lọc mảng (link tĩnh). Mục đang chọn: aria-current="page". */
.chip { @apply inline-flex min-h-touch items-center gap-2 rounded-pill bg-soft px-4 text-small font-medium hover:bg-soft-hover; }
.chip[aria-current] { @apply bg-fg text-bg; }
/* Chấm màu mảng: đặt trong phần tử có lớp cover-a|b|d (chỉ để lấy biến --cover-fg). */
.dot { @apply size-2 shrink-0 rounded-full bg-(--cover-fg); }
/* Nhãn "Bản mẫu / Sample" trên thẻ và trang bài mẫu. */
.badge { @apply inline-flex items-center rounded-pill border border-line px-2 py-1 font-mono text-label font-semibold uppercase text-muted; }
```

Thêm vào `.post` (trang bài, mục 6):
```css
.post .callout { @apply rounded-card bg-soft p-5; border-left: 2px solid var(--cover-fg, var(--color-accent)); }
.post .callout > * + * { margin-top: .75em; }
.post .callout-title { @apply font-mono text-label font-semibold uppercase; }
```
`.dot` đọc `--cover-fg` của chính nó: viết `<span class="dot cover-d">` (lớp `cover-x` chỉ đặt biến, không kèm `.cover` nên không có nền chấm).
Tương phản: `.chip` thường = `fg` trên `soft` 16.33 / 13.21; `.chip[aria-current]` = `bg` trên `fg` 17.96 / 15.44; `.badge` chữ `muted` trên `bg` 5.33 / 7.45 (đã có ở HOMA-28). Viền callout = màu cover fg (phi văn bản, ≥ 3: tối thiểu 6.06). Đạt.

`src/tailwind.css` thêm nguồn quét:
```css
@source "../about/*.html";
@source "../topics/**/*.html";
```
(giữ `../index.html`, `../blog/**/*.html`, `../js/*.js`).

Thẻ bài trên mọi danh sách dùng lại `.card .card-row .card-link .cover .glyph .card-title .card-excerpt .card-meta .tag` — **không lớp mới**.

---

## 4. Bố cục từng trang

Ký hiệu: `│` = hairline `line`, `[c]` = cover, `•` = `.dot`. Lưới 16 cột + `col-feed` (cột 3–14) như HOMA-28.

### 4.1 Trang chủ `/`
Thứ tự:
1. **Intro ngắn** (không hero lớn): `h1` font-display `text-cta` "anhdev99" + `text-lead muted` một câu:
   VI "Ghi chép về giảng dạy khoa học máy tính, xây AI agent và nghiên cứu computer vision, chatbot." / EN "Notes on teaching computer science, building AI agents and researching computer vision and chatbots." + link `accent-text` "Về tôi →" / "About me →" tới `about/`.
2. **Ba ô mảng** (`aria-labelledby` "Chủ đề"/"Topics", `section-title`): mỗi ô là `.card` có `.card-link` tới trang mảng: cover mảng (glyph mảng) + `card-title` tên mảng + `card-excerpt` mô tả (mục 2) + `card-meta` "N bài" / "N posts" (N = số bài, kể cả mẫu; đếm tay).
3. **Bài mới** (`section-title` "Bài mới" / "Latest"): hàng `.chip` lọc: **Tất cả** (`aria-current="page"`, href `./`) · Giảng dạy · Dev · Nghiên cứu (href tới `topics/*/`). Dưới đó **6 bài mới nhất** dạng `card-row`. Cuối: link "Xem tất cả bài →" / "All posts →" tới `blog/`.
4. Không có CTA liên hệ lớn ở trang chủ (chuyển về About). Footer.

```
360px                          768px                                1280px
anhdev99 (h1)                  anhdev99                             anhdev99           (col-feed)
lead…                          lead… About me →                     lead… About me →
About me →
── CHỦ ĐỀ ─────                ── CHỦ ĐỀ ───────────────            ── CHỦ ĐỀ ────────────────────────────
[c </> ]  (banner 3:1)         [c </>]  │ [c >_ ]  │ [c [·]]         [c </>]   │   [c >_ ]   │   [c [·]]
Giảng dạy                      Giảng dạy│ Dev      │ Nghiên cứu      Giảng dạy │   Dev       │   Nghiên cứu
mô tả · 3 bài                  mô tả    │ mô tả    │ mô tả           mô tả     │   mô tả     │   mô tả
──                             (grid-cols-3, gap-gutter)            (grid-cols-3, toàn max-w-site)
[c >_ ] Dev …
── BÀI MỚI ────                ── BÀI MỚI ──────────────            ── BÀI MỚI ──── (col-feed) ───────────
(Tất cả)(Giảng dạy)→ cuộn      (Tất cả)(Giảng dạy)(Dev)(Nghiên cứu)  chips 1 hàng
[cover full width]             [c] │ tag · Bản mẫu                   [c] │ tag · Bản mẫu
tag · BẢN MẪU                      │ Tiêu đề                             │ Tiêu đề
Tiêu đề / excerpt / meta           │ excerpt / meta                      │ excerpt / meta
```
- Ô mảng: `grid grid-cols-1 gap-gutter md:grid-cols-3` trong lớp `featured-feed` (có sẵn hairline dọc giữa thẻ ≥ md). Cover ô mảng: `max-md:aspect-banner` (như `.mag-side`), ≥ md `aspect-golden`.
- Hàng chip: `flex gap-2 overflow-x-auto` + `scrollbar-width:none` (giống `.menu`) ở < sm; `flex-wrap` từ sm. Bọc trong `<nav aria-label="Lọc theo chủ đề / Filter by topic">`.
- Thẻ bài: như `card-row` hiện có; < xs (480px) xếp dọc (đã có `max-xs:flex-col`).

### 4.2 Trang mảng `/topics/<mảng>/`
1. Breadcrumb `text-meta muted`: "Bài viết" → `../../blog/`.
2. Header mảng trong `col-feed`: dòng `• Chủ đề / Topic` (label, `<span class="dot cover-x">`), `h1` font-display `text-cta` tên mảng, `text-lead muted` mô tả, `card-meta` danh sách thẻ con (mono, ngăn bằng ` · `).
3. Hàng `.chip` như trang chủ, mục mảng hiện tại `aria-current="page"`, "Tất cả" trỏ `../../blog/`.
4. Danh sách `card-row` mọi bài của mảng, mới nhất trên.
5. Riêng **Giảng dạy**: nếu có bài thuộc loạt (series), thêm trước danh sách một khu "Loạt bài" / "Series": mỗi loạt 1 `.card` không cover: `tag` "Loạt" / "Series", `card-title` tên loạt, `card-meta` "N bài", link tới bài 1 của loạt. Ẩn khu khi chưa có loạt.
6. Trạng thái trống (mảng chưa có bài): khối `soft` như `/blog/` HOMA-28: VI "Chưa có bài trong mục này." / EN "No posts in this topic yet."

360/768/1280: cùng khung `col-feed` như `/blog/` hiện tại; chỉ khác phần header mảng.

### 4.3 Tất cả bài `/blog/`
- `h1` "Bài viết" / "Posts" + lead VI "Tất cả bài, mới nhất trước." / EN "All posts, newest first."
- Hàng `.chip` ("Tất cả" `aria-current="page"`).
- Nhóm theo năm: `h2.section-title` "2026" rồi các `card-row`. Không phân trang.
- Giữ khối trạng thái trống HOMA-28 (dùng khi đã gỡ hết bài mẫu mà chưa có bài thật).

### 4.4 Giới thiệu `/about/`
Chuyển nguyên bố cục Profile hiện tại (tạp chí 3 cột → Chuyên môn → Cách làm việc → Liên hệ) sang `about/index.html`, giữ các `id` (`about`, `stack`, `practice`, `contact`). Đổi nội dung theo mục 7. Thêm khu **"Ba mảng"** / **"What I write about"** giữa Cách làm việc và Liên hệ: 3 `card-row` (cover + glyph mảng) trỏ tới trang mảng. Xoá khu `#latest` (đã có ở trang chủ). Header: mục "Giới thiệu" `aria-current="page"`; nút "Liên hệ" trỏ `#contact`.
360/768/1280: như Profile hiện tại (đã đạt HOMA-28/32).

### 4.5 Thẻ bài (mọi danh sách)
```html
<article class="card card-row">
  <a class="card-link card-row" href="…/blog/<slug>/">
    <div class="cover cover-d" aria-hidden="true"><span class="glyph">OOP</span></div>
    <div class="card-body">
      <p class="tag flex items-center gap-2"><span class="dot cover-d" aria-hidden="true"></span>
        <span data-l="vi">Giảng dạy</span><span data-l="en">Teaching</span>
        <span class="badge" data-sample><span data-l="vi">Bản mẫu</span><span data-l="en">Sample</span></span></p>
      <h3 class="card-title text-title-lg font-display"><span data-l="vi">…</span><span data-l="en">…</span></h3>
      <p class="card-excerpt"><span data-l="vi">…</span><span data-l="en">…</span></p>
      <p class="card-meta font-mono"><time datetime="2026-11-20"><span data-l="vi">20/11/2026</span><span data-l="en">20 Nov 2026</span></time> · oop</p>
    </div>
  </a>
</article>
```
- Mảng hiển thị bằng `tag` + `.dot`; thẻ con nằm trong meta. Bài thuộc loạt: thêm ` · Phần 2/4` / ` · Part 2/4` vào meta.
- Thuộc tính `data-sample` chỉ để dễ tìm (`grep -rn data-sample`) khi gỡ bài mẫu; không có CSS/JS.

---

## 5. Bài mẫu (8 bài)

Quy tắc chung cho **mọi** bài mẫu:
- Thư mục `blog/sample-<n>-<slug>/index.html` (tiền tố `sample-` để gỡ bằng một lệnh: xoá `blog/sample-*`, rồi `grep -rn data-sample` xoá thẻ ở các danh sách).
- `<meta name="robots" content="noindex">`; `<title>` bắt đầu bằng `[Bản mẫu]`; không vào `sitemap.xml`.
- `.badge` "Bản mẫu / Sample" trên thẻ ở mọi danh sách **và** khối thông báo đầu thân bài (mục 6, bước 2).
- Thân bài: văn bản giữ chỗ trung tính mô tả **cấu trúc** ("Đoạn này minh hoạ đoạn văn thường trong bài giảng.") — không viết như kinh nghiệm, kết quả, số liệu, công bố hay lớp học có thật. Code mẫu: đoạn tổng quát, ngắn (vd khai báo class rỗng, hàm `hello`), không kèm tuyên bố "đã dùng trong dự án".
- Song ngữ cả hai bản (`data-l`), trừ bài 8 (chỉ VI) để minh hoạ trường hợp một ngôn ngữ.
- Ngày: giả định, chỉ để sắp thứ tự.

| # | slug | Mảng | Thẻ | Ngày | Cover/glyph | Tiêu đề VI | Tiêu đề EN | Minh hoạ thành phần |
|---|---|---|---|---|---|---|---|---|
| 1 | `sample-1-oop-lop-va-doi-tuong` | Giảng dạy | `oop` | 2026-11-20 | d / `OOP` | Bài mẫu: Lớp và đối tượng (OOP, phần 1) | Sample: Classes and objects (OOP, part 1) | series 1/3, mục lục, code, callout |
| 2 | `sample-2-oop-ke-thua` | Giảng dạy | `oop` | 2026-11-18 | d / `OOP` | Bài mẫu: Kế thừa (OOP, phần 2) | Sample: Inheritance (OOP, part 2) | series 2/3, code |
| 3 | `sample-3-react-native-man-hinh-dau-tien` | Giảng dạy | `react-native` | 2026-11-12 | d / `RN` | Bài mẫu: Màn hình đầu tiên với React Native | Sample: A first screen in React Native | code có tên tệp (figure), danh sách |
| 4 | `sample-4-frontend-backend-tong-quan` | Giảng dạy | `frontend`, `backend` | 2026-11-05 | d / `API` | Bài mẫu: Frontend gọi Backend qua API | Sample: Frontend calling a Backend API | 2 khối code, callout cảnh báo |
| 5 | `sample-5-ai-agent-vong-lap` | Dev | `ai-agent` | 2026-11-16 | a / `>_` | Bài mẫu: Vòng lặp cơ bản của một AI agent | Sample: The basic loop of an AI agent | mục lục, code, callout |
| 6 | `sample-6-ai-agent-cong-cu` | Dev | `ai-agent`, `tooling` | 2026-10-28 | a / `{ }` | Bài mẫu: Cho agent gọi công cụ | Sample: Letting an agent call tools | code |
| 7 | `sample-7-cv-ghi-chu-doc-bai-bao` | Nghiên cứu | `computer-vision` | 2026-11-09 | b / `[·]` | Bài mẫu: Khung ghi chú đọc bài báo computer vision | Sample: A note template for reading CV papers | blockquote, danh sách |
| 8 | `sample-8-chatbot-khung-danh-gia` | Nghiên cứu | `chatbot` | 2026-10-21 | b / `Q&A` | Bài mẫu: Khung ghi chép thử nghiệm chatbot | (chỉ VI) | bài một ngôn ngữ, nhãn `VI` |

Excerpt mọi bài mẫu (một mẫu chung, đổi tên chủ đề): VI "Bài mẫu minh hoạ giao diện bài viết về {chủ đề}. Nội dung thật sẽ thay sau." / EN "Sample post showing the layout for a post about {topic}. Real content will replace it."

Loạt mẫu: **"Lập trình hướng đối tượng" / "Object-oriented programming"**, 3 phần; phần 3 chưa có → hiển thị trong danh sách loạt là văn bản muted "Sắp có" / "Coming soon", không link. Không tạo bài phần 3.

Trang chủ hiển thị 6 bài mới nhất: 1, 2, 5, 3, 7, 4. Số đếm ô mảng: Giảng dạy 4, Dev 2, Nghiên cứu 2.

---

## 6. Trang bài `/blog/<slug>/`

Giữ trang bài HOMA-28 (cột `max-w-measure`), đổi/thêm:
1. Breadcrumb: `Bài viết` → `../` · `{Mảng}` → `../../topics/<mảng>/`.
2. **Bài mẫu**: ngay dưới breadcrumb, khối `rounded-card bg-soft px-4 py-3 text-small` có `.badge` + câu: VI "Đây là bài mẫu để xem giao diện, không phải nội dung thật." / EN "This is a sample post for previewing the layout, not real content." (thay nhãn "MẪU - TEMPLATE" hiện tại; template thật vẫn giữ nhãn TEMPLATE riêng).
3. Dòng tag: `.dot` + tên mảng (link tới trang mảng, `accent-text`, gạch chân khi hover) · thẻ con (mono, không link).
4. `h1`, lead, meta ngày như cũ. Meta thêm nhãn `VI`/`EN` khi bài một ngôn ngữ.
5. **Hộp loạt bài** (chỉ khi bài thuộc loạt), đặt sau meta, trước mục lục:
   ```html
   <nav class="mt-8 rounded-card border border-line p-5" aria-labelledby="h-series">
     <p class="tag">Loạt / Series</p>
     <h2 class="text-title font-semibold" id="h-series">Lập trình hướng đối tượng</h2>
     <ol class="mt-3 list-decimal space-y-1 pl-5 text-small">
       <li><a class="text-accent-text underline underline-offset-4" href="../sample-1-…/" aria-current="page">Lớp và đối tượng</a></li>
       <li><a …>Kế thừa</a></li>
       <li class="text-muted">… <span>(Sắp có / Coming soon)</span></li>
     </ol>
   </nav>
   ```
   Mục hiện tại: `aria-current="page"` + `font-semibold`, không gạch chân (đặt `no-underline`).
6. **Mục lục**: giữ quy tắc HOMA-28 (≥ 3 `h2`, không sticky, không JS). Ở ≥ xl (1200px) **không** đưa sang cột phụ — giữ một cột để bài giảng đọc liền mạch trên mọi cỡ.
7. **Khối code**: giữ `.post pre` (không tô màu cú pháp). Thêm tên tệp tuỳ chọn bằng `figure`:
   ```html
   <figure><pre tabindex="0" aria-label="Main.java"><code>…</code></pre><figcaption>Main.java</figcaption></figure>
   ```
   Không nút copy (cần JS; thêm khi chủ site yêu cầu).
8. **Callout** (lớp ở mục 3), 3 loại, phân biệt bằng **chữ tiêu đề** + màu viền (không chỉ dựa vào màu):
   | Loại | Tiêu đề VI / EN | Lớp màu viền |
   |---|---|---|
   | Ghi chú | Ghi chú / Note | `cover-d` |
   | Mẹo | Mẹo / Tip | `cover-b` |
   | Lưu ý | Lưu ý / Caution | `cover-c` |
   ```html
   <aside class="callout cover-d"><p class="callout-title">Ghi chú</p><p>…</p></aside>
   ```
   Dùng `<aside>` (không `role="note"` thêm). Chữ trong callout = `fg` trên `soft` (16.33 / 13.21).
9. **Điều hướng cuối bài** (thay "← Tất cả bài viết"): hairline, rồi lưới 2 cột ≥ sm (1 cột < sm): "← Bài trước" / "Bài sau →" **trong cùng loạt** nếu bài thuộc loạt; không có loạt thì một link "← Tất cả bài {Mảng}" tới trang mảng. Mỗi link là khối `min-h-touch`, nhãn `text-meta muted` + tiêu đề `font-semibold`.
10. Bỏ CTA liên hệ lớn ở cuối bài (chỉ còn footer). Lý do: blog đọc nhiều bài, CTA lặp gây ồn; liên hệ đã ở About.

Không làm: thời gian đọc, bình luận, chia sẻ mạng xã hội, bài liên quan tự động, toán (KaTeX), sơ đồ (Mermaid).

---

## 7. Nội dung About mới (VI/EN)

Nguồn: `index.html` hiện tại trên `develop` + mô tả HOMA-37. Không lấy từ `KIET-NGUYEN-TUAN-TopCV.vn-101225.94204.pdf` (giữ quy định HOMA-28).

**`<title>`/OG**: "Giới thiệu - Nguyễn Tuấn Kiệt (anhdev99)" / description VI "Nguyễn Tuấn Kiệt (anhdev99): giảng viên Khoa học máy tính, lập trình viên AI agent, nghiên cứu computer vision và chatbot." EN "Nguyễn Tuấn Kiệt (anhdev99): computer science lecturer, AI agent developer, researching computer vision and chatbots."

**Hero** (giữ khối code tím, đổi giá trị):
```
// anhdev99
const kiet = {
  roles: ["Lecturer", "Developer", "Researcher"],
  focus: ["AI agents", "Computer vision", "Chatbots"],
  based: "Việt Nam" / "Vietnam",
};
```
- Tag: Giới thiệu / About. `h1`: Nguyễn Tuấn Kiệt.
- Lead VI: "Tôi dạy Khoa học máy tính, xây dựng AI agent và nghiên cứu computer vision, chatbot." EN: "I teach computer science, build AI agents and research computer vision and chatbots."
- Meta: "anhdev99 (Steven) — Giảng viên · Developer, Việt Nam" / "Lecturer · Developer, Vietnam".

**Cột trái/phải (tạp chí)**: giữ 4 thẻ hiện có, sửa:
- "Hiện tại": giữ nguyên "Làm việc tại Altek Đồng Tháp và DThU" (không thêm chức vụ) `[CẦN CHỦ SỞ HỮU XÁC NHẬN: nơi giảng dạy là DThU? chức danh chính xác?]`.
- "Đang học" → đổi thành "Đang tập trung" / "Current focus": VI "AI agent, computer vision và chatbot" / EN "AI agents, computer vision and chatbots".
- "Ngoài giờ: Âm nhạc và game", "Mã nguồn công khai trên GitHub": giữ.

**Ba vai trò** (thay khu "Cách làm việc", giữ `id="practice"`, tiêu đề "Tôi làm gì" / "What I do"), 3 `card-row`, glyph 01–03:
1. Giảng dạy / Teaching — VI "Tôi dạy các môn Phát triển phần mềm hướng đối tượng, Lập trình mobile (React Native), Frontend và Backend." EN "I teach object-oriented software development, mobile programming (React Native), frontend and backend."
2. Phát triển / Development — VI "Tôi làm ứng dụng từ giao diện tới máy chủ, hiện tập trung vào AI agent." EN "I build applications end to end, currently focused on AI agents."
3. Nghiên cứu / Research — VI "Tôi nghiên cứu về computer vision và chatbot." EN "I do research on computer vision and chatbots." `[CẦN CHỦ SỞ HỮU XÁC NHẬN: đề tài, nhóm, công bố — để trống đến khi có]`

**Chuyên môn** (`#stack`): giữ nguyên 4 thẻ + ghi chú "Ngoài ra: Flutter, Unity…". Thêm vào thẻ "Ứng dụng" không gì; **không** thêm thư viện AI/CV nào chưa có trong repo `[CẦN CHỦ SỞ HỮU XÁC NHẬN: framework AI/CV dùng thật, nếu muốn liệt kê]`.

**Ba mảng** (mục 4.4) rồi **Liên hệ** (`#contact`): giữ CTA + mailbar `anhdev99@gmail.com`. Đổi câu phụ VI "Trao đổi về giảng dạy, dự án hay hợp tác nghiên cứu? Gửi email cho tôi." EN "Want to talk about teaching, a project or a research collaboration? Send me an email."

---

## 8. `js/script.js`, sitemap, README

- `js/script.js`: **không đổi**. Không cần JS lọc (mục 1).
- `sitemap.xml`: thêm `/about/`, `/topics/teaching/`, `/topics/dev/`, `/topics/research/`. Không thêm bài mẫu.
- `README.md`/`deploy_guide.md`: cập nhật cây thư mục; quy trình thêm bài (HOMA-28 mục 5) thêm bước: chép thẻ vào **trang chủ (giữ 6 bài), `/blog/`, trang mảng**, cập nhật số đếm ô mảng; nếu bài thuộc loạt, cập nhật hộp loạt ở mọi bài cùng loạt.
- Gỡ bài mẫu: `blog/sample-*` + `grep -rn data-sample` + chỉnh số đếm. Ghi 3 bước này vào README.

## 9. Kiểm tra trước PR (Engineer)
- `npm run build` rồi `git status` không báo `css/site.css` đổi.
- 360/768/1280, sáng/tối, VI/EN cho: `/`, `/about/`, `/blog/`, 1 trang mảng, bài 1 (series + callout + mục lục), bài 8 (một ngôn ngữ).
- Không cuộn ngang ở 360px (kể cả hàng chip và `pre`).
- Tab: chip, link mảng, hộp loạt, prev/next có focus thấy rõ; vùng chạm ≥ 44px (chip, prev/next, footer).
- Tắt JS: mọi trang đọc được (hiện song ngữ theo `lang="vi"` mặc định), lọc vẫn chạy (link tĩnh).
- `grep -rln 'noindex' blog/sample-*` đủ 8 tệp; `sitemap.xml` không chứa `sample-`.

## 10. [CẦN CHỦ SỞ HỮU XÁC NHẬN]
1. Nơi giảng dạy và chức danh (DThU? Giảng viên?) — trang chỉ ghi "giảng viên Khoa học máy tính" theo HOMA-37.
2. Đề tài/nhóm/công bố nghiên cứu (CV, chatbot) — hiện để trống.
3. Framework/công cụ AI agent, CV thật sự dùng (để thêm vào Chuyên môn).
4. Câu intro trang chủ (mục 4.1) và mô tả ba mảng (mục 2) — đang là bản đề xuất.
5. Bài thật đầu tiên viết bằng VI, EN hay cả hai.
6. (Tồn từ HOMA-28) tệp CV PDF công khai trong repo.

