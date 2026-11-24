## ❌ FAIL — Review độc lập PR HOMA-28

### 1. Build CSS ✓ PASS
- npm run build → css/site.css không thay đổi
- Tailwind CLI 4.3.5, token trong @theme, không CDN

### 2. Chụp ảnh responsive ✓ PASS
- 12 ảnh: Profile + Blog, 360/768/1280px, light/dark
- Lưu: docs/evidence/homa-28/

### 3. Design critique — ✓ Hierarchy OK, ❌ Touch target FAIL
**Must-fix (blocks ship):**
- Contact button 101×39px < 44px minimum touch target (desktop)
- Nav links 22px height on 360px viewport (mobile fail)
- Stack cards (Vue/C#/.NET) hidden on 360px; phải show ở hero above fold

**Should-fix:**
- Contact CTA not primary; không nổi bật so với title
- VI/EN bilingual text merge (accessibility issue)

Xem chi tiết: docs/evidence/homa-28/DESIGN_CRITIQUE.md

### 4. Accessibility — ❌ Contrast AA FAIL
**Lỗi quan trọng:** Accent color #512bd4 on white = 2.65:1 (cần ≥4.5:1 AA)

Ảnh hưởng:
- Link "Liên hệ / Contact" trong tag ✗
- Glyph colors (C#, SQL, music) ✗
- Section tags ✗

**Fix:** Darken accent từ #512bd4 → #4A2FA0 (~5.0:1)

✓ PASS: Focus visible (18/18 elements), Tab order logic, VI/EN toggle site-wide, prefers-reduced-motion (no animations)

Xem chi tiết: docs/evidence/homa-28/ACCESSIBILITY.md

### 5. Nội dung ✓ PASS
- Tiêu đề: "anhdev99 - Nguyễn Tuấn Kiệt (Fullstack Developer)"
- Chỉ email (anhdev99@gmail.com) + GitHub
- Không tên dự án, không CV link, không bịa

### 6. README/deploy_guide ✓ PASS
- Lệnh build: npm install && npm run build
- Hướng dẫn thêm bài blog: README.md 26-33

---

## Kết luận

❌ **FAIL** do 2 lỗi WCAG (không thể phép):
1. **Touch target < 44px** — Contact button (101×39px), Nav links on 360px (22px)
2. **Contrast AA fail** — Accent #512bd4 on white (2.65:1 < 4.5:1)

Cần fix trước merge.
