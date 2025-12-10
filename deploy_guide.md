# Deployment Guide for AnhDev99 Profile

This web profile is designed to be hosted on GitHub Pages or any static site host.

## Testing Locally
1. Simply open the `index.html` file in your browser (Chrome, Edge, etc.) to see the site.
2. Ensure `css/style.css` and `js/script.js` are in the same directory relative to `index.html`.

## Customization
- **Profile Photo**: Replace the "Terminal Icon" placeholder in `index.html`.
  1. Add your photo to the `images/` folder (e.g., `profile.jpg`).
  2. Update `index.html`:
     ```html
     <!-- Find this line -->
     <div class="img-placeholder">...</div>
     
     <!-- Replace with -->
     <div class="home-img" data-aos="zoom-in">
         <img src="images/profile.jpg" alt="Profile Picture" style="width: 350px; height: 350px; border-radius: 50%; border: 2px solid var(--main-color); object-fit: cover;">
     </div>
     ```
- **CV Download**: If you want to link your PDF:
  1. Rename `KIET-NGUYEN-TUAN-TopCV.vn-101225.94204.pdf` to something simpler like `cv.pdf`.
  2. In `index.html`, find the "Connect With Me" button or add a new button in the About section:
     ```html
     <a href="cv.pdf" download class="btn">Download CV</a>
     ```

## Deploying to GitHub Pages
1. Commit the new files:
   ```bash
   git add .
   git commit -m "Add web profile website"
   git push origin main
   ```
2. Go to your GitHub Repository Settings.
3. Navigate to **Pages** (on the left sidebar).
4. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
5. Select **main** branch and **/** (root) folder.
6. Click **Save**.
7. Your site will be live at `https://anhdev99.github.io/anhdev99/` (or just `anhdev99.github.io` if this is your main profile repo).
