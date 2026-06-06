# MediBridge India 🏥 — UI & Design System Analysis

This document provides a comprehensive breakdown of the visual system, styles, typography, and page structure analyzed from the **MediBridge India - Doctors Edition** screen. It defines a highly premium "Billion-Dollar Concierge" aesthetic combining Deep Emerald/Forest Green, Rich Ochre/Gold accents, and sophisticated typography.

---

## 1. Complete Page Inventory

Based on the core features and the visual foundations established in the Stitch template, the platform requires the following core views:

### 1.1 Public Pages (SEO & Lead Gen Focus)
*   **Landing Page (`/`):** 
    *   Hero section with search bar and trust badges.
    *   Popular treatments spotlight.
    *   Top-rated JCI-accredited hospital showcase.
    *   Featured doctors list.
    *   Interactive testimonial section.
*   **Treatments Directory (`/treatments`):** Filterable list of treatments by category with cost indicator tags.
*   **Treatment Detail Page (`/treatments/[id]`):** In-depth analysis of a procedure, risks, recovery, cost comparison charts, and recommended doctors.
*   **Hospitals Directory (`/hospitals`):** Map and list views of partner hospitals filtered by city, accreditation, and specialties.
*   **Hospital Detail Page (`/hospitals/[id]`):** Showcase of infrastructure, medical teams, specialized treatments, and direct intake action.
*   **Doctors Directory (`/doctors`):** Directory of specialists filtered by language, fee, experience, and affiliated hospital.
*   **Doctor Detail Page (`/doctors/[id]`):** Deep dive into educational background, success rates, reviews, and booking calendar.
*   **Cost Estimator (`/cost-estimator`):** Interactive interface allowing patients to compare itemized costs in their native currency.
*   **Consultation Booking Form (`/consultation`):** Multi-step intake flow collecting contact data, medical conditions, and report files.

### 1.2 Patient Portal (Authenticated Interface)
*   **Dashboard Hub (`/portal`):** Timeline of the patient’s medical journey, active booking statuses, and coordinator contacts.
*   **Medical Report Vault (`/portal/reports`):** File manager for uploading and reviewing diagnostic reports and imaging data.
*   **Visa Assistant Hub (`/portal/visa`):** Form for passport detail submissions and downloading hospital visa invitation letters.
*   **Support & Messaging (`/portal/support`):** Interactive ticketing client and support chat workspace.

### 1.3 Admin & Operations Dashboard
*   **Dashboard Hub (`/admin`):** Live queue of pending consultation bookings, visa assistance requests, and open support tickets.
*   **Directory Management (`/admin/directory`):** CRUD interface to update treatment details, hospital profiles, and doctors.
*   **Visa Process Manager (`/admin/visa`):** Upload portal for issuing official invitation letters and transitioning statuses.

---

## 2. Reusable Components Library

To maintain consistency and design elegance, components are divided into structural and feature-specific categories:

### 2.1 Navigation & Footers
*   **`Navbar`:** Glassmorphic sticky header containing the logo, key directory links, currency dropdown selector, and a premium "Get Started" CTA sheen-button.
*   **`Footer`:** Multi-column layout with links, legal disclosures, and a gold-accented gradient border dividing it from the main content canvas.

### 2.2 Card Components
*   **`TreatmentCard`:** Clean cards with specialty tags, brief descriptions, and starting cost indicators.
*   **`HospitalCard`:** Multi-grid card showing JCI/NABH badges, city tag, specialty lists, and overall quality rating stars.
*   **`DoctorCard`:** Profile card containing the doctor's avatar, specialty tag, years of experience, languages, success rate badge, and consultation fee.

### 2.3 Interactive Widgets (Derived from Stitch Screen)
*   **`FloatingDoctorWidget`:** Floating card featuring doctor details, rating stars, and custom animation profiles, styled with a primary green background.
*   **`FloatingCostWidget`:** Glassmorphic calculation card displaying estimated cost comparisons, currency conversions, savings percentages, and a gold-border gradient.
*   **`TrustBadge`:** Animated rounded badges displaying accreditation logos or security indicators.
*   **`SearchBar`:** Gold-bordered glass panel input field with search icons and a primary action button.

---

## 3. Design System & Aesthetics
The platform leverages a custom-configured design system built around the concept of "Opulent Concierge Care."

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Aesthetic Tokens                               │
├───────────────────┬─────────────────────────────────────────────────────┤
│ Glass Panel       │ bg-white/75, backdrop-blur-3xl, 1px white/50 border │
│ Gold Border       │ linear-gradient(135deg, #ffe088 0%, #fed65b 100%)    │
│ Ambient Shadows   │ 0 8px 16px -4px rgba(0, 52, 43, 0.05)                │
│ Text Fill         │ Metallic gradients for highlight text (#735c00)     │
└───────────────────┴─────────────────────────────────────────────────────┘
```

### 3.1 Custom Utility Classes
```css
/* Glassmorphism Panel */
.glass-panel {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 
        0 4px 24px -1px rgba(0, 52, 43, 0.05),
        0 16px 40px -4px rgba(0, 52, 43, 0.05);
}

/* Gold Accent Border Gradient */
.gold-border-gradient {
    position: relative;
}
.gold-border-gradient::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: inherit;
    padding: 1.5px;
    background: linear-gradient(135deg, #ffe088 0%, rgba(255, 224, 136, 0.2) 50%, #fed65b 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

/* Sheen Button Hover Effect */
.sheen-btn {
    position: relative;
    overflow: hidden;
}
.sheen-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent);
    transform: skewX(-20deg);
    transition: left 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 10;
}
.sheen-btn:hover::before {
    left: 150%;
}
```

---

## 4. Color System

The color palette is modeled around premium clinical trust combined with luxury concierge elements:

| Color Token | Hex Value | Application / Role |
| :--- | :--- | :--- |
| **`primary`** | `#00342b` | Deep Emerald/Forest Green. Used for primary branding, headers, and major actions. |
| **`primary-container`** | `#004d40` | Darker teal variant for deep buttons or backgrounds. |
| **`primary-fixed`** | `#afefdd` | Pastel mint for light-colored UI indicators. |
| **`secondary`** | `#735c00` | Rich Gold/Ochre. Used for highlights, stars, and verified tags. |
| **`secondary-container`**| `#fed65b` | Bright Gold Accent. Highlight backgrounds or important indicators. |
| **`secondary-fixed`** | `#ffe088` | Warm light gold background tints and borders. |
| **`background`** | `#fcf9f8` | Warm Alabaster/Cream. Gives a welcoming, clean, non-sterile atmosphere. |
| **`surface`** | `#fcf9f8` | Primary surface backdrop. |
| **`surface-container-lowest`** | `#ffffff` | Absolute white for content card structures. |
| **`surface-container`**| `#f0eded` | Soft gray-cream for dividing background blocks. |
| **`outline`** | `#707975` | Mid-tone gray for standard border outlines. |
| **`outline-variant`** | `#bfc9c4` | Light border outline for separators. |

---

## 5. Typography System

The typography configuration utilizes **Playfair Display** (a sophisticated serif typeface) to project prestige and authority, paired with **Manrope** (a highly readable, structured geometric sans-serif) for tabular and body elements.

*   **Font Families:**
    *   `headline` / `display`: **Playfair Display** (Serif)
    *   `body` / `label`: **Manrope** (Sans-Serif)

### 5.1 Type scale Configurations
*   **`display-lg` (Desktop Hero Titles):**
    *   Font Size: `64px` | Line Height: `72px` | Tracking: `-0.02em` | Font Weight: `700` (Bold)
*   **`display-lg-mobile` (Mobile Hero Titles):**
    *   Font Size: `40px` | Line Height: `48px` | Tracking: `-0.01em` | Font Weight: `700` (Bold)
*   **`headline-xl` (Page Headings):**
    *   Font Size: `48px` | Line Height: `56px` | Font Weight: `600` (Semibold)
*   **`headline-lg` (Card / Section Headings):**
    *   Font Size: `32px` | Line Height: `40px` | Font Weight: `600` (Semibold)
*   **`body-lg` (Subheadings / Intro Paragraphs):**
    *   Font Size: `18px` | Line Height: `28px` | Font Weight: `400` (Regular)
*   **`body-md` (Standard Content / Metadata):**
    *   Font Size: `16px` | Line Height: `24px` | Font Weight: `400` (Regular)
*   **`label-md` (Buttons / Navigation Links):**
    *   Font Size: `14px` | Line Height: `20px` | Tracking: `0.05em` | Font Weight: `600` (Semibold)
*   **`label-sm` (Overlines / Badges):**
    *   Font Size: `12px` | Line Height: `16px` | Tracking: `0.08em` | Font Weight: `700` (Bold)

---

## 6. Responsive Strategy

To accommodate users accessing the portal from different devices (desktop at home vs. mobile during travel), the responsive scaling applies distinct layouts:

*   **Breakpoints:**
    *   `sm`: `640px` (Mobile portrait / landscape)
    *   `md`: `768px` (Tablets / small laptops)
    *   `lg`: `1024px` (Desktops / large screens)
    *   `xl`: `1280px` (Wide desktops)
    *   `max-width`: `1440px` (Container max-width to prevent stretching on high-resolution displays)

### 6.1 Layout Adaptations
*   **Hero Grid:** On screens under `lg` (1024px), the grid collapses to 1 column. The floating widgets (Doctor Profile, Cost Estimate) hide on mobile to keep focus on the main text, search bar, and direct CTAs.
*   **Main Navigation:** Web view uses inline text links and CTA buttons. Mobile view switches to a standard collapsible hamburger drawer.
*   **Card Containers:** Grid systems adapt dynamically using responsive Tailwind directives:
    *   Hospitals/Doctors lists: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
*   **Fluid Typography:** Elements like display headers use CSS clamp configurations to scale fluidly without causing line wrap collisions:
    *   `font-size: clamp(3rem, 5vw + 1rem, 5rem);`

---
*End of UI and Design System Specification.*
