# Kova Systems static website

A dependency-free, responsive static website for Kova Systems, Aver, and PrePIEP.

## Included

- Company homepage
- Aver product page
- PrePIEP product page
- About, Security, Contact, Privacy, and Terms pages
- Mobile navigation and accessible interaction patterns
- Static email-based contact form (no server-side collection)
- Netlify and Cloudflare Pages security-header files
- Sitemap, robots file, SVG logo, favicon, and 404 page

## Important pre-launch configuration

Edit `assets/js/config.js`:

1. Confirm the exact company and legal names.
2. Set `entityFormed: true` **only after** Massachusetts approves the Certificate of Organization.
3. Replace the contact and security email addresses with mailboxes you control.
4. Replace `siteUrl` with the final domain.
5. Replace the domain in `robots.txt` and `sitemap.xml`.

The current default intentionally displays **Kova Systems**, not **Kova Systems LLC**, because the entity has not been represented as already approved.

## Required business/legal checks before public launch

- Confirm that the Massachusetts entity has been formed and that the exact legal name matches the filing.
- Decide whether the product names require local business certificates / DBAs when used in commerce.
- Have counsel review the Privacy Notice and Terms for the actual data flows, products, customers, and risk allocation.
- Do not accept PrePIEP student records until product-specific privacy, security, retention, access, vendor, contract, and insurance controls are in place.
- Create product-specific pilot terms and data-processing terms before handling Aver customer prompts, outputs, or proprietary test cases.
- Verify trademarks, product names, domain ownership, and email ownership.
- Replace or expand the provider disclosure once hosting, email, analytics, forms, error tracking, and support vendors are chosen.
- Do not claim FERPA, COPPA, SOC 2, HIPAA, accessibility, security, or regulatory compliance unless the company has verified the claim and its scope.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

The directory can be deployed directly to Netlify, Cloudflare Pages, GitHub Pages, Vercel static hosting, or an S3-compatible static host. No build command is required.

## Content decisions reflected in this site

- Kova Systems is the umbrella brand for evidence-centered software.
- Aver is the active pilot-stage product, positioned around model-change assurance rather than broad certification.
- PrePIEP is in private development/customer discovery, is adult-facing, and accepts no sensitive document uploads through the public site.
- Both products clearly state their current limits and preserve human responsibility for consequential decisions.
