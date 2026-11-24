# QA Report: Trang giới thiệu anhdev99 (redesign/profile-2026)

**Ngày:** 2026-11-24  
**Branch:** `redesign/profile-2026`  
**Phạm vi:** Kiểm tra chất lượng, truy cập và an toàn thông tin (7 tiêu chí)

---

## 1. Nội dung & An toàn thông tin

**Tiêu chí:** Không nêu tên dự án/repo private/khách hàng; không liên kết CV hoặc mạng xã hội chưa xác minh.

| Kiểm tra | Kết quả | Ghi chú |
|---------|--------|--------|
| Tên dự án / repo private | ✅ PASS | Không tìm thấy |
| Tên khách hàng | ✅ PASS | Không tìm thấy |
| Liên kết tới CV `.pdf` | ✅ PASS | Không có link `KIET-NGUYEN-TUAN-TopCV.vn-101225.94204.pdf` trên trang |
| Mạng xã hội chưa xác minh | ✅ PASS | Chỉ có GitHub (`github.com/anhdev99`) và email (`anhdev99@gmail.com`); không có LinkedIn, Facebook, Twitter, StackOverflow, CodeSandbox |
| Chức danh | ✅ PASS | "anhdev99 - Nguyễn Tuấn Kiệt (Fullstack Developer)" – không có "Chủ tịch", "Founder", "CEO" |

**Kết luận:** ✅ **PASS** – Nội dung an toàn, không lộ thông tin riêng tư.

---

## 2. Các liên kết (Links)

**Tiêu chí:** Mọi liên kết hoạt động đúng; sử dụng `/` trong đường dẫn.

| Liên kết | Loại | Trạng thái | Ghi chú |
|---------|------|-----------|--------|
| `favicon.svg` | Nội bộ | ✅ | Đường dẫn tương đối, có file |
| `css/style.css` | Nội bộ | ✅ | Dùng `/` |
| `js/script.js` | Nội bộ | ✅ | Dùng `/` |
| `#main`, `#about`, `#expertise`, `#how`, `#contact` | Anchor | ✅ | ID tương ứng có trên trang |
| `mailto:anhdev99@gmail.com` | Email | ✅ | Địa chỉ hợp lệ |
| `https://github.com/anhdev99` | External | ✅ | Repo công khai, có target/rel |
| `https://anhdev99.github.io/anhdev99/` (canonical) | External | ✅ | URL trang chính xác |

**Kết luận:** ✅ **PASS** – Tất cả liên kết hoạt động, sử dụng quy ước đường dẫn đúng.

---

## 3. HTML & Khả năng truy cập (Accessibility)

**Tiêu chí:** HTML hợp lệ, có alt text cho ảnh, thứ tự tiêu đề đúng, hỗ trợ điều hướng bàn phím.

| Kiểm tra | Kết quả | Chi tiết |
|---------|--------|---------|
| Doctype & lang | ✅ PASS | `<!DOCTYPE html>`, `<html lang="vi">` với script thay đổi lang động |
| Tiêu đề (Headings) | ✅ PASS | h1 (tên) → h2 (phần) → h3 (thẻ) theo thứ tự; không bỏ cấp |
| Alt text | ✅ PASS | Không có `<img>` nào; avatar dùng `<div>` với `aria-hidden="true"` (đúng vì là trang trí CSS "NK") |
| Skip link | ✅ PASS | `<a class="skip" href="#main">` với focus visible (line 24) |
| Nút (Buttons) | ✅ PASS | Language buttons: `<button>` với `aria-label` và `aria-pressed` (không phải `<div>`) |
| Form | ✅ PASS | Không có form; thay thế bằng mailto link (phù hợp use case) |
| Keyboard nav | ✅ PASS | Tab qua: skip → logo → nav → lang buttons → hero buttons → sections → footer; focus outline 3px |
| Color contrast | ✅ PASS | Xem tiêu chí 5 |

**Kết luận:** ✅ **PASS** – HTML hợp lệ, hỗ trợ truy cập đầy đủ.

---

## 4. Responsive Design

**Tiêu chí:** Hoạt động tốt ở 360px, 768px, 1280px.

| Breakpoint | Kiểm tra | Kết quả |
|-----------|---------|--------|
| **360px** (mobile) | Flex wrap, single-col hero, card grid 1 col, font size readable | ✅ PASS |
| **768px** (tablet) | Media query `@media (min-width: 48rem)` kích hoạt; hero 2-col grid, nav flow normal, card grid 2-3 col | ✅ PASS |
| **1280px** (desktop) | Wrapper max-width 68rem (`min(100% - 2rem, 68rem)`); grid `auto-fit` 2-3 col; clamp() font scaling | ✅ PASS |
| **Typography** | h1 `clamp(2rem, 7vw, 3.25rem)`, h2 `clamp(1.5rem, 4vw, 2rem)` → thích ứng mọi kích thước | ✅ PASS |
| **Scroll behavior** | Smooth scroll trên desktop, `auto` với `prefers-reduced-motion: reduce` | ✅ PASS |

**Kết luận:** ✅ **PASS** – Responsive đủ cho 3 breakpoint yêu cầu.

---

## 5. Tương phản màu (WCAG AA)

**Tiêu chí:** Đạt WCAG AA ở chế độ sáng lẫn tối.

### Chế độ sáng (light)
```css
--text: #1a1f2b        (tối)       vs --bg: #ffffff         → ~WCAG AAA
--accent: #0b5cad      (xanh)      vs --bg: #ffffff         → ~WCAG AA
--muted: #4b5563       (xám)       vs --bg: #ffffff         → ~WCAG AA
--on-accent: #ffffff   (trắng)     vs --accent: #0b5cad     → ~WCAG AAA
```

### Chế độ tối (dark)
```css
--text: #e6eaf0        (sáng)      vs --bg: #0f141b         → ~WCAG AAA
--accent: #6cb2ff      (xanh sáng) vs --bg: #0f141b         → ~WCAG AA
--muted: #aab3c0       (xám sáng)  vs --bg: #0f141b         → ~WCAG AA
--on-accent: #0f141b   (tối)       vs --accent: #6cb2ff     → ~WCAG AAA
```

### Focus
- Outline: `3px solid` với `--focus` (`.5rem` offset), dễ nhìn rõ ✅

**Kết luận:** ✅ **PASS** – Tương phản đạt WCAG AA cả hai chế độ.

---

## 6. Nội dung song ngữ (Bilingual)

**Tiêu chí:** Nội dung Việt & Anh chính xác, không có chữ thừa hay sai chính tả.

| Phần | Tiếng Việt | English | Trạng thái |
|-----|-----------|---------|-----------|
| **Hero** | "Xin chào, tôi là" | "Hi, I'm" | ✅ Chính xác |
| **Tên** | Nguyễn Tuấn Kiệt | Nguyễn Tuấn Kiệt | ✅ Giữ nguyên |
| **Giới thiệu** | "...lập trình viên fullstack tại Việt Nam. Hiện tôi làm việc tại Altek Đồng Tháp và DThU." | "...fullstack developer based in Vietnam. I currently work at Altek Dong Thap and DThU." | ✅ Nhất quán |
| **Chuyên môn** | "Các công nghệ tôi sử dụng..." | "Technologies I use at work and in self-directed learning." | ✅ Rõ ràng |
| **Cách làm việc** | "Làm trọn vòng", "Học liên tục", "Chú trọng vận hành" | "End to end", "Always learning", "Built to run" | ✅ Tự nhiên |
| **Liên hệ** | "Bạn muốn trao đổi..." | "Want to talk about work..." | ✅ Phù hợp ngữ cảnh |
| **Footer** | "© {năm} Nguyễn Tuấn Kiệt (anhdev99)." | © {year} Nguyễn Tuấn Kiệt (anhdev99). | ✅ Hiển thị năm động (JS) |

**Kiểm tra chi tiết:**
- Không có chữ thừa ✅
- Không có lỗi chính tả ✅
- Không có "Chủ tịch", "CEO", "Founder" ✅
- Không có số năm kinh nghiệm bịa ✅
- Dấu "&amp;" trong HTML cho dấu "&" (line 90, 94) ✅

**Kết luận:** ✅ **PASS** – Nội dung song ngữ chính xác, phù hợp lề ý tưởng.

---

## 7. Tài nguyên ngoài & Theo dõi

**Tiêu chí:** Không dùng nguồn ngoài có theo dõi; tự chứa tài nguyên.

| Tài nguyên | Nguồn | Loại | Theo dõi? | Trạng thái |
|-----------|------|------|----------|-----------|
| Font | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif | Nội tuyến | ❌ Không | ✅ |
| CSS | `css/style.css` | Nội bộ | ❌ Không | ✅ |
| JS | `js/script.js` | Nội bộ | ❌ Không | ✅ |
| Favicon | `favicon.svg` | Nội bộ SVG | ❌ Không | ✅ |
| Analytics | — | Không có | ❌ Không | ✅ |
| CDN (jQuery, Axios, v.v.) | — | Không có | ❌ Không | ✅ |

**Kiểm tra chi tiết:**
- Không có `<script src="https://...">` ngoài ✅
- Không có Google Analytics, Hotjar, Mixpanel ✅
- Không có Google Fonts CDN ✅
- Không có Font Awesome CDN ✅
- Không có animation library (AOS, ScrollReveal, Animate.css) ✅
- Không có third-party tracker ✅

**Kết luận:** ✅ **PASS** – Không dùng nguồn ngoài, không có theo dõi.

---

## Tóm tắt

| Tiêu chí | Trạng thái |
|---------|-----------|
| 1. Nội dung & An toàn | ✅ PASS |
| 2. Các liên kết | ✅ PASS |
| 3. HTML & Truy cập | ✅ PASS |
| 4. Responsive | ✅ PASS |
| 5. Tương phản màu | ✅ PASS |
| 6. Nội dung song ngữ | ✅ PASS |
| 7. Tài nguyên ngoài | ✅ PASS |

**Tổng kết:** ✅ **KHÔNG CÓ LỖI – READY FOR REVIEW**

Trang redesign trên `redesign/profile-2026` đáp ứng đầy đủ 7 tiêu chí QA. Sẵn sàng để chủ sở hữu xem xét trước khi merge vào main.

---

**Báo cáo bởi:** Agent (Reviewer)  
**Thời gian:** 2026-11-24 10:30 UTC+7
