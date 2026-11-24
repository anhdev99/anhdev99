## Design critique: Profile + Blog

### Must-fix (blocks ship)

- **Affordance:** Contact button ("Liên hệ/Contact") at 101×39px fails 44px minimum touch target on desktop. Buttons at 360px: nav links 22px height (too small). **Try:** Increase button padding/min-height to 44px; nav links to 32–44px min-height on mobile.

- **Affordance:** "Contact" button does not meet 44×44px on 1280px viewport (101w × 39h). **Try:** Pad to 44px min-height; increase vertical padding from current 39px to 44px or use `min-h-11` Tailwind token.

- **Responsive:** 360px nav links (22px height) fail touch target. Menu text "Chuyên môn/Expertise" appears truncated or cramped. **Try:** Stack nav vertically on 360px or increase link height to 44px minimum; consider hamburger menu below 640px.

### Should-fix (before broader rollout)

- **Hierarchy:** "Contact" button not prominently placed on Profile hero; primary action unclear. CTA button at top-right blend with smaller "Liên hệ" text visually. **Try:** Make "Contact" section (email link) in hero more prominent; button text should lead hero task (e.g., "Liên hệ ngay / Contact now").

- **Hierarchy:** Profile mobile (360px) hides stack cards (Vue, C#, .NET) after name until scroll—not visible in first viewport. User job is "assess fullstack skills." **Try:** Show badge stack (Vue / C# / .NET) in hero above fold on mobile, or as inline tag row after name.

- **Affordance:** VI/EN language toggle buttons 44×36px—just below 44px height on mobile. Layout looks cramped. **Try:** Increase height to 44px minimum or add more vertical padding.

- **States:** Blog empty state shows two lines ("Chưa có bài viết / No posts yet" + "Bài đầu tiên sẽ sớm có / First post coming soon"). Lacks visual emphasis on the main message. **Try:** Larger font for "No posts yet"; secondary text smaller/muted; center align if already centered—confirm visual weight matches empty-state priority.

- **Copy:** Bilingual text ("Liên hệContact", "Giới thiệuAbout") renders merged in focusable text; screen reader reads "LiênhệContact" (no space). **Try:** Add `aria-label` or use CSS to separate (e.g., hide one language per `data-l` attribute, use lang-specific display).

### Nice-to-fix (when there's room)

- **Consistency:** Skip link ("Bỏ qua tới nội dung / Skip to content") visible on page (not hidden by default). Common practice is `sr-only` (visually hidden, screen-reader only). **Try:** Add `sr-only` class if focusing Skip link on first Tab.

- **Copy:** Profile meta "anhdev99 (Steven) — Fullstack Developer, Việt Nam/Vietnam" mixes bilingual inline; no HTML semantic structure. **Try:** Separate `<span data-l="vi">` and `<span data-l="en">` on new line or use BDO/direction hints for clarity.

- **Accessibility:** 16 nav items (19 focusable on Profile). Focus order runs: skip → logo → nav menu → lang → contact → article links → footer links. No visible focus indicator screenshot captured. **Try:** Confirm `:focus-visible` has 2+ px outline or background change on all interactive elements.

- **Responsive:** 768px tablet — layout appears correct (2-col magazine). No explicit break tests at 480px or other common tablet breakpoints. **Try:** Add 480px and 1024px breakpoint tests to regression suite.

### Strengths to keep

- ✓ Semantic HTML: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` properly nested.
- ✓ Bilingual support with `data-l` attributes + lang buttons—good UX for international audience.
- ✓ H1 present, clear hierarchy H1 → H2 → H3 on both pages.
- ✓ Blog empty state styled (bg-soft, padded box) with friendly copy—not a blank rectangle.
- ✓ Dark mode contrast preserved (white text on #15171a, accent color adapts in dark mode).
- ✓ Hero code block ("const kiet = {…}") with syntax highlighting creates visual interest + tech credibility.
- ✓ Card magazine layout responsive (1-col mobile, 16-col grid desktop) scales well.
- ✓ Email call-to-action button (44×44px) meets touch target minimum.
