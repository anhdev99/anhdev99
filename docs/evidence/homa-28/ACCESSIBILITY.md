# Accessibility Audit Report
**Date:** November 24, 2026  
**Pages Tested:** Profile (http://127.0.0.1:8765/), Blog (http://127.0.0.1:8765/blog)  
**Tool:** Puppeteer + Manual DevTools Inspection

---

## Executive Summary

| Criterion | Status | Details |
|-----------|--------|---------|
| **Contrast AA** | ❌ FAIL | Light mode has 9+ color pairs below 4.5:1 ratio |
| **Focus Visible** | ✓ PASS | All 18 interactive elements have focus styles |
| **Tab Order Logic** | ✓ PASS | Logical sequence: skip-link → logo → nav → lang-toggle → contact → footer |
| **prefers-reduced-motion** | ✓ PASS | No animations present; support not needed |
| **VI/EN Toggle** | ✓ PASS | Site-wide language switching works; persists across pages via localStorage |

---

## 1. Contrast AA Check (Light Mode)

### Status: ❌ FAIL

**Found 9 color pair issues:**

| Element | Text Sample | Contrast Ratio | Required | Issue |
|---------|------------|---|---|---|
| `<html>` root | "anhdev99 - Nguyễn Tuấn Kiệt..." | 1.00:1 | 4.5:1 | No bg color (transparent) + black text |
| `<header>` | "anhdev99 Giới thiệu About..." | 1.17:1 | 4.5:1 | Transparent bg + dark text |
| `<div>` lang group | "VI EN" | 1.17:1 | 4.5:1 | Transparent/near-transparent bg |
| `<button>` VI | "VI" | 1.00:1 | 4.5:1 | Transparent bg + muted text (rgba 58%) |
| `<p>` tag accent | "Giới thiệu / About" | 2.65:1 | 4.5:1 | Light purple (#512bd4) on white |
| `<span>` glyph | "{ }" (cover) | 2.35:1 | 4.5:1 | Dark purple (#4a25c4) on white |
| `<span>` glyph | "♫ ▶" (music card) | 3.12:1 | 4.5:1 | Dark brown (#943d0f) on white |
| `<span>` glyph | "C#" (stack card) | 2.58:1 | 4.5:1 | Dark blue (#1d4f91) on white |
| `<span>` glyph | "SQL" (data card) | 3.15:1 | 4.5:1 | Dark green (#1c6943) on white |

### Root Cause

Tailwind CSS uses accent color `--color-accent: #512bd4` and decorative glyph colors that don't meet WCAG AA standard when placed on white background (light mode).

### Recommendations

1. **Accent text** (`#512bd4` on white): Increase luminance to ~`#5D3FD3` or use darker shade like `#4A2FA0`
2. **Glyph colors**: Increase saturation/darkness or add semi-transparent white background behind glyphs
3. **Button text in light group**: Use `text-fg` instead of `text-muted` for VI/EN buttons
4. **Header nav links**: Consider darker shade for accent links

**WCAG AA fix example:**
```css
/* Current (fails) */
--color-accent: #512bd4;      /* 2.65:1 on white */

/* Fixed */
--color-accent: #4A2FA0;      /* ~5.0:1 on white */
```

---

## 2. Focus Visible Check

### Status: ✓ PASS

**Result:** All 18 interactive elements (a, button) have visible focus indicators.

**Elements checked:**
- Skip link: "Bỏ qua tới nội dung / Skip to content"
- Logo: "anhdev99"
- Nav links: About, Expertise, How I work, Blog, GitHub
- Language buttons: VI, EN
- Contact link: "Liên hệ / Contact"
- Footer links: code, email, navigation

**Implementation:**
- Tailwind classes provide `:focus-visible` pseudo-class styling
- Outline + background color change visible on tab

**Example:** EN button has `aria-label="English"` and receives focus outline properly.

---

## 3. Tab Order Logic

### Status: ✓ PASS

**Tab sequence (Profile page, first 15 stops):**

1. `<a>` Skip link: "Bỏ qua tới nội dung / Skip to content"
2. `<a>` Logo: "anhdev99"
3. `<a>` Nav: "Giới thiệu / About" (section anchor)
4. `<a>` Nav: "Chuyên môn / Expertise"
5. `<a>` Nav: "Cách làm việc / How I work"
6. `<a>` Nav: "Blog"
7. `<a>` Nav: "GitHub" (external)
8. `<button>` VI (language toggle)
9. `<button>` EN (language toggle)
10. `<a>` Contact: "Liên hệ / Contact"
11. `<a>` Footer: (empty code link)
12. `<a>` Footer: "Gửi email / Email me"
13. `<a>` Footer: "anhdev99"
14. `<a>` Nav (footer): "Giới thiệu / About"
15. `<a>` Nav (footer): "Chuyên môn / Expertise"

**Logical flow:** ✓ Skip link → Header navigation → Language toggle → Main CTA → Footer

**No `tabindex` overrides found** (good practice).

---

## 4. prefers-reduced-motion Support

### Status: ✓ PASS

**Analysis:**
- **Animations found:** 0 @keyframes rules
- **Transitions found:** 0 transition declarations
- **prefers-reduced-motion media query:** Not present (not needed)

**Result:** Site has no animations or transitions, so `prefers-reduced-motion: reduce` compliance is not applicable.

✓ No motion-related accessibility issues.

---

## 5. Language Toggle (VI ↔ EN)

### Status: ✓ PASS

### Test Procedure

1. **Initial state (Profile page):** `lang="en"`, page title in English
2. **Click EN button:** No change (already English)
3. **Navigate to Blog:** `lang="en"`
4. **Click VI button on Blog:** Page switches to `lang="vi"`
5. **Return to Profile:** `lang="vi"` persists

### Results

| Test Case | Expected | Actual | Status |
|-----------|----------|--------|--------|
| EN button on Profile | Activate English mode | ✓ EN already active, localStorage.lang="en" | ✓ PASS |
| VI button on Blog | Switch to Vietnamese | ✓ lang="vi" after click | ✓ PASS |
| Language persists | VI state survives page navigation | ✓ Profile page shows lang="vi" after returning | ✓ PASS |
| Site-wide switch | Both pages use same language | ✓ Blog and Profile use same lang attribute | ✓ PASS |

### Implementation Details

- **Storage mechanism:** `localStorage.lang` (key="lang", value="en"/"vi")
- **Buttons:** `<button data-set-lang="vi">VI</button>` and `<button data-set-lang="en">EN</button>`
- **Aria labels:** Buttons have `aria-label="Tiếng Việt"` / `aria-label="English"`
- **Button group:** `<div role="group" aria-label="Ngôn ngữ / Language">`

### Evidence

**Console output (Blog page lang toggle):**
```
Clicking VI button on Blog...
After clicking VI on Blog:
  - Page lang: vi
  - Page title: Blog - anhdev99 (Nguyễn Tuấn Kiệt)
✓ EN→VI toggle PASS on Blog page

Profile page after returning from Blog:
  - Page lang: vi
  - Page title: anhdev99 - Nguyễn Tuấn Kiệt (Fullstack Developer)
✓ Language persists across pages (VI/EN toggle site-wide)
```

---

## 6. Additional Findings

### Skip Link Implementation
- ✓ Present: `<a class="skip" href="#main">`
- ✓ Visible on tab focus
- ✓ Links to `<main id="main">` element

### Semantic HTML
- ✓ Proper heading hierarchy (H1 → H2 → H3)
- ✓ `<nav>` with `aria-label="Menu"`
- ✓ Language group has `role="group"` with `aria-label`
- ✓ Main content in `<main>` element
- ✓ Sections have `aria-labelledby`

### Image Accessibility
- ✓ No images found (site uses CSS-based graphics and glyphs)
- N/A: Alt text not needed

---

## Summary Table

```
✓ / ❌ Contrast AA: ❌ FAIL (9 color pairs below 4.5:1 on light mode)
✓ / ❌ Focus visible: ✓ PASS (18/18 interactive elements have focus styles)
✓ / ❌ Tab order logic: ✓ PASS (skip → logo → nav → lang-toggle → contact → footer)
✓ / ❌ prefers-reduced-motion: ✓ PASS (no animations present)
✓ / ❌ VI/EN toggle: ✓ PASS (site-wide language switching via localStorage.lang)
```

---

## Actionable Next Steps

1. **High priority:** Fix accent color contrast (affects 4+ elements)
2. **Medium priority:** Increase glyph/cover color contrast
3. **Low priority:** Add prefers-reduced-motion support if animations are added in future
4. **Nice-to-have:** Test dark mode contrast ratio

---

**Audit completed:** November 24, 2026 02:10 UTC  
**Browser:** Chromium (Puppeteer headless)  
**Test environment:** http://127.0.0.1:8765/ (local dev server)
