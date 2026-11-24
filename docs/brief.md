# Brief: trang giới thiệu anhdev99 (redesign 2026)

Nguồn sự thật: `index.html`, `README.md` hiện tại và mô tả ticket HOMA-20. Không dùng nội dung file CV `.pdf`.
Ký hiệu `[CẦN CHỦ SỞ HỮU XÁC NHẬN]` = chưa có dữ kiện, để trống trên trang cho tới khi chủ sở hữu trả lời.

---

## 1. Điểm yếu của trang hiện tại

**Nội dung**
- README: đoạn "Ask me about" là một câu trả lời kiểu chatbot bằng tiếng Anh dài, dán nhầm, không nói gì về chủ sở hữu.
- Chỉ có tiếng Anh, không có tiếng Việt; tên thật (Nguyễn Tuấn Kiệt) không xuất hiện.
- Câu giới thiệu chung chung ("passionate", "robust and scalable", "solving complex problems") không có thông tin cụ thể.
- Hiệu ứng gõ chữ đặt "Gamer" ngang hàng chức danh nghề nghiệp, làm loãng thông điệp.
- Thẻ "Experience / Building Solutions" và nút "Read More" (`href="#"`) không dẫn tới đâu.
- Danh sách kỹ năng dài, không phân biệt thế mạnh chính và công cụ từng dùng (Unity, Flutter, Kafka... nằm chung với C#/.NET).
- Liên kết mạng xã hội (LinkedIn, Twitter, Facebook, Dev.to, StackOverflow, CodeSandbox) chưa xác minh. Link CodeSandbox dùng `codesandbox.com` (domain sai, đúng là `codesandbox.io`), dấu hiệu là sinh tự động từ generator.
- Footer "© 2025" cứng.

**Cấu trúc / kỹ thuật**
- Tải 6 tài nguyên ngoài: Google Fonts, Font Awesome (cdnjs), AOS, ScrollReveal, Typed.js (unpkg). Trái yêu cầu tự chứa tài nguyên; `unpkg.com/scrollreveal` không ghim phiên bản.
- Nhiều thư viện animation chồng nhau (AOS + ScrollReveal) và con trỏ chuột tuỳ biến: nặng, rối, không tôn trọng `prefers-reduced-motion`.
- Form liên hệ dùng `action="mailto:"` + `method="post"`: không hoạt động ổn định trên đa số trình duyệt. Một nút `mailto:` là đủ.
- `lang="en"` cố định, không có cơ chế song ngữ; thiếu thẻ Open Graph.
- Icon menu và nút đổi theme chỉ là `div`/`i`, không có nhãn truy cập (accessibility).

**README hồ sơ GitHub**
- Dùng nhiều emoji và hàng chục ảnh icon tải từ repo bên ngoài (devicons, vectorlogo.zone, raw.githubusercontent của generator).
- Thẻ thống kê `github-readme-stats.vercel.app` phụ thuộc dịch vụ bên thứ ba, hay lỗi/giới hạn.
- Không có liên kết tới trang web giới thiệu.

---

## 2. Cấu trúc đề xuất

Một trang duy nhất, nút chuyển VI / EN ở header (mặc định VI, giữ lựa chọn bằng `localStorage`; nội dung cả hai ngôn ngữ nằm sẵn trong HTML).

1. **Header**: `anhdev99` · menu (Giới thiệu, Chuyên môn, Cách làm việc, Liên hệ) · nút VI/EN.
2. **Hero**: tên, chức danh, 1 câu giá trị, 2 nút: "Liên hệ" (mailto) và "GitHub".
3. **Giới thiệu**: 2 đoạn ngắn.
4. **Chuyên môn**: 4 nhóm kỹ năng (thay cho phần dự án).
5. **Cách làm việc**: 3 ý, chỉ suy ra từ sự thật đã biết.
6. **Liên hệ**: email + GitHub.
7. **Footer**: tên, năm hiện tại (JS), không có link CV.

Ảnh đại diện: [CẦN CHỦ SỞ HỮU XÁC NHẬN]. Chưa có thì dùng chữ viết tắt "NK" bằng CSS, không dùng ảnh/icon ngoài.

---

## 3. Nội dung song ngữ

### 3.1 Hero

| | Tiếng Việt | English |
|---|---|---|
| Lời chào | Xin chào, tôi là | Hi, I'm |
| Tên | Nguyễn Tuấn Kiệt | Nguyễn Tuấn Kiệt |
| Bí danh | anhdev99 | anhdev99 |
| Chức danh | Fullstack Developer | Fullstack Developer |
| Câu giá trị | Tôi xây dựng ứng dụng web từ giao diện tới máy chủ, với nền tảng chính là C#/.NET và Vue.js. | I build web applications end to end, from the interface to the server, working mainly with C#/.NET and Vue.js. |
| Nút 1 | Liên hệ | Get in touch |
| Nút 2 | GitHub | GitHub |

Thẻ `<title>`: `anhdev99 - Nguyễn Tuấn Kiệt (Fullstack Developer)`

Meta description:
- VI: Trang giới thiệu của Nguyễn Tuấn Kiệt (anhdev99), Fullstack Developer tại Việt Nam, làm việc với C#/.NET, Vue.js và các công nghệ web.
- EN: Personal page of Nguyễn Tuấn Kiệt (anhdev99), a Fullstack Developer based in Vietnam working with C#/.NET, Vue.js and web technologies.

### 3.2 Giới thiệu / About

**VI**
> Tôi là Nguyễn Tuấn Kiệt, còn được biết đến với tên anhdev99 (Steven), lập trình viên fullstack tại Việt Nam. Hiện tôi làm việc tại Altek Đồng Tháp và Trường Đại học Đồng Tháp (DThU).
>
> Tôi đang tiếp tục đào sâu C#/.NET, Vue.js và AI. Ngoài công việc, tôi dành thời gian cho âm nhạc và game.

**EN**
> I'm Nguyễn Tuấn Kiệt, also known as anhdev99 (Steven), a fullstack developer based in Vietnam. I currently work at Altek Dong Thap and Dong Thap University (DThU).
>
> I'm deepening my skills in C#/.NET, Vue.js and AI. Outside of work, I enjoy music and gaming.

Lưu ý:
- Vai trò cụ thể tại Altek Đồng Tháp / DThU: [CẦN CHỦ SỞ HỮU XÁC NHẬN] (chưa ghi lên trang).
- "DThU = Trường Đại học Đồng Tháp" là suy luận từ tên viết tắt: [CẦN CHỦ SỞ HỮU XÁC NHẬN]. Nếu không đúng, chỉ ghi "DThU".
- Số năm kinh nghiệm: [CẦN CHỦ SỞ HỮU XÁC NHẬN], để trống.

### 3.3 Chuyên môn / Expertise

Chỉ dùng kỹ năng đã có trong `index.html`. Nhóm lại theo vai trò, thế mạnh chính đặt đầu. Hiển thị dạng chữ (tag), không icon ngoài.

| Nhóm (VI) | Group (EN) | Kỹ năng |
|---|---|---|
| Backend | Backend | C# / .NET, Node.js, Python |
| Frontend | Frontend | Vue.js, Nuxt.js, React, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap |
| Dữ liệu & hạ tầng | Data & infrastructure | SQL Server, PostgreSQL, MongoDB, Redis, Elasticsearch, RabbitMQ, Kafka, Nginx |
| DevOps & công cụ | DevOps & tools | Docker, Git, Jenkins, Linux, Firebase |
| Khác | Other | Flutter, Unity |
| Đang học | Currently learning | C#/.NET (nâng cao / advanced), Vue.js, AI |

Mức độ thành thạo từng kỹ năng: [CẦN CHỦ SỞ HỮU XÁC NHẬN]. Không hiển thị thanh %, không gắn nhãn "expert".

Câu dẫn:
- VI: Các công nghệ tôi sử dụng trong công việc và tự học.
- EN: Technologies I use at work and in self-directed learning.

Thay cho phần dự án:
- VI: Dự án tôi làm phần lớn là nội bộ nên không công bố chi tiết. Mã nguồn công khai có trên GitHub.
- EN: Most of my work is internal and not published here. Public code is available on GitHub.
- Nút: "Xem GitHub" / "View GitHub" → `https://github.com/anhdev99`

### 3.4 Cách làm việc / How I work

Chỉ 3 ý, mỗi ý suy ra trực tiếp từ sự thật đã biết.

| # | VI | EN | Căn cứ |
|---|---|---|---|
| 1 | **Làm trọn vòng.** Tôi làm cả giao diện, API lẫn cơ sở dữ liệu, nên chú ý tới cách các phần ghép với nhau. | **End to end.** I work across the interface, APIs and databases, so I pay attention to how the pieces fit together. | Fullstack; kỹ năng trải đều frontend/backend/DB |
| 2 | **Học liên tục.** Hiện tôi đang đào sâu C#/.NET, Vue.js và AI. | **Always learning.** I'm currently deepening C#/.NET, Vue.js and AI. | "Đang học C#/.NET, Vue.js, AI" |
| 3 | **Chú trọng vận hành.** Tôi quen làm với Docker, Linux, Nginx và CI để ứng dụng chạy ổn định ngoài môi trường phát triển. | **Built to run.** I'm used to working with Docker, Linux, Nginx and CI so applications run reliably beyond development. | Docker, Linux, Nginx, Jenkins trong danh sách kỹ năng |

### 3.5 Liên hệ / Contact

- VI: Bạn muốn trao đổi về công việc hoặc hợp tác? Gửi email cho tôi.
- EN: Want to talk about work or a collaboration? Send me an email.
- Email: `anhdev99@gmail.com` (nút `mailto:`), GitHub: `github.com/anhdev99`.
- Bỏ form liên hệ. Không đưa LinkedIn/Twitter/Facebook/Dev.to/StackOverflow/CodeSandbox: [CẦN CHỦ SỞ HỮU XÁC NHẬN].

### 3.6 Footer

- VI: © {năm} Nguyễn Tuấn Kiệt (anhdev99).
- EN: © {year} Nguyễn Tuấn Kiệt (anhdev99).

### 3.7 Yêu cầu kỹ thuật cho bước dựng trang

- Không CDN: bỏ Font Awesome, AOS, ScrollReveal, Typed.js, con trỏ tuỳ biến. Font: font hệ thống (hoặc Google Fonts tối đa 1 họ chữ).
- Icon (nếu cần) dùng SVG nội tuyến tự chứa.
- Tôn trọng `prefers-reduced-motion`, `prefers-color-scheme`; nút có nhãn truy cập.
- `<html lang>` đổi theo ngôn ngữ đang chọn; thêm thẻ Open Graph cơ bản.
- Không liên kết tới file CV `.pdf`.

---

## 4. Đề xuất README hồ sơ GitHub

```markdown
# Nguyễn Tuấn Kiệt (anhdev99)

**Fullstack Developer** · Vietnam

**VI** · Lập trình viên fullstack, làm việc chủ yếu với C#/.NET và Vue.js. Hiện làm tại Altek Đồng Tháp và DThU, đang đào sâu C#/.NET, Vue.js và AI.

**EN** · Fullstack developer working mainly with C#/.NET and Vue.js. Currently at Altek Dong Thap and DThU, deepening my skills in C#/.NET, Vue.js and AI.

**Stack:** C# / .NET · Node.js · Python · Vue.js · Nuxt.js · React · Next.js · SQL Server · PostgreSQL · MongoDB · Redis · Docker · Linux

- Website: https://anhdev99.github.io/anhdev99/
- Email: anhdev99@gmail.com
```

Ghi chú: không emoji, không ảnh ngoài. Bỏ toàn bộ ảnh icon ngoài và thẻ `github-readme-stats`. URL website đổi theo nơi chủ sở hữu quyết định đăng trang.

---

## 5. Câu hỏi cho chủ sở hữu (tối đa 5)

1. **Ảnh đại diện**: có muốn dùng ảnh thật không? Nếu có, gửi ảnh (vuông, tối thiểu 400×400). Nếu không, dùng chữ viết tắt "NK".
2. **Mạng xã hội**: tài khoản nào thật và muốn công khai (LinkedIn, Facebook, Twitter/X, Dev.to, StackOverflow, CodeSandbox)? Đường dẫn chính xác?
3. **CV**: có đưa CV lên trang không? Lưu ý: file `KIET-NGUYEN-TUAN-TopCV.vn-101225.94204.pdf` hiện đang nằm công khai trong repo public; cân nhắc gỡ khỏi repo nếu không muốn công khai.
4. **Vai trò và kinh nghiệm**: chức vụ cụ thể tại Altek Đồng Tháp và DThU là gì; DThU có phải Trường Đại học Đồng Tháp; có muốn ghi số năm kinh nghiệm không?
5. **Trọng tâm**: muốn nhấn mạnh mảng nào (ví dụ backend .NET, fullstack .NET + Vue, hạ tầng/DevOps, AI) và đối tượng chính là nhà tuyển dụng, khách hàng hay cộng đồng? Có kỹ năng nào trong danh sách nên bỏ (Unity, Flutter, Kafka...)?
