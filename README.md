# EWS1 Website

Professional EWS1 fire safety service website — fully static, SEO-optimised, EEAT-compliant.

## 📁 Files
- `index.html` — The complete single-page website (all 7 pages)
- `netlify.toml` — Netlify configuration (redirects, security headers, caching)
- `robots.txt` — Search engine crawl instructions
- `sitemap.xml` — XML sitemap for Google indexing

---

## 🚀 How to Deploy on Netlify (Step-by-Step)

### Option 1: Drag & Drop (Easiest — No account needed)
1. Go to **https://app.netlify.com**
2. Sign up for a free account (or log in)
3. On the dashboard, scroll down to **"Want to deploy a new site without connecting to Git?"**
4. **Drag and drop this entire folder** onto that drop zone
5. Netlify will deploy instantly and give you a URL like `https://amazing-name-123.netlify.app`
6. Done! ✅

### Option 2: Connect to GitHub (Recommended for ongoing updates)
1. Upload this folder to a **GitHub repository** (github.com → New repo → Upload files)
2. Go to **https://app.netlify.com** → "Add new site" → "Import an existing project"
3. Choose **GitHub** and select your repository
4. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (just a dot)
5. Click **Deploy site**
6. Every time you push to GitHub, Netlify auto-redeploys ✅

---

## 🌐 Custom Domain Setup on Netlify
1. In your Netlify site dashboard → **Domain management** → **Add custom domain**
2. Enter your domain (e.g. `ews1.co.uk`)
3. Update your domain's DNS with your registrar:
   - Add a **CNAME record**: `www` → `your-site-name.netlify.app`
   - Or use **Netlify DNS** (they'll walk you through it)
4. Netlify auto-provisions a **free SSL certificate** (HTTPS) via Let's Encrypt

---

## ✅ SEO & EEAT Features Included
- Meta title, description, keywords, Open Graph, Twitter Card tags
- Schema.org structured data (ProfessionalService + FAQPage + BlogPosting)
- Semantic HTML5 (article, nav, section, footer)
- robots.txt and sitemap.xml
- Security headers (X-Frame-Options, CSP, etc.)
- Fast-loading: no build tools, no npm, CDN fonts only
- Mobile-responsive design
- Accessible: ARIA labels, semantic markup

---

## 📝 Updating Content
All content is in `index.html`. Search for the section you want to update:
- Hero text: search for `hero-content`
- Services: search for `services-grid`
- Blog posts: search for `blog-grid`
- FAQ answers: search for `faq-list`
- Testimonials: search for `testimonials-grid`
- Contact info: search for `contact-items`

Replace placeholder contact details (phone, email, address) with your real details before going live.
