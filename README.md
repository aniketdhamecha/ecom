# SHOP.CO - High-Fidelity React E-Commerce Console Suite

SHOP.CO is a premium, fully responsive React e-commerce portal and administrative console suite. It faithfully implements the SHOP.CO design system alongside custom-engineered interactive metrics, product catalog managers, and security/firewall systems.

---

## 🚀 Core Features

### 🛒 High-Fidelity Shopping Portal
* **Visual Landing Workspaces**: Premium hero grids, curated style selectors (Casual, Formal, Party), and new arrivals.
* **Responsive Shopping Catalogue (`/shop`)**: Multi-layered search engines, price filter sliders, and color-graded selection tags.
* **Real-time Shopping Cart (`/cart`)**: Dynamic quantity adjustments, local state contexts, and deconstructed VAT coupon summaries.
* **Product Detail Portal (`/product/:id`)**: High-fidelity product zoom previews, review timelines, and color-combed cotton selectors.

### 💼 Integrated Admin Suite Console (`/admin` & `/admin-dashboard`)
Unified multi-view sidebar console collapsing into horizontal horizontal swipes on smartphones:
* **Overview panel**: Tracks Net Revenues, total Packages dispatched, Active Carts checkout bounce registers, and deconstructed order values.
* **Interactive Revenue Analytics**:
  * **Sales Trend Graph**: Pure SVG-based weekly area chart with animated Bezier Coordinate plotting. Hover nodes trigger pulsing accent circles and overlay tooltips (Gross Sales vs Dispatches). Includes capsule metric toggles (*Revenue $* vs *Units Qty*).
  * **Monthly Sales Progression**: Responsive HTML/CSS growth bars with detail tooltips.
  * **Category Shares Progress Meters**: Graphical distribution bars (T-Shirts: 42%, Polos: 28%, Jeans: 20%, Accessories: 10%).
  * **Conversion Funnel Flow**: Interactive tapered stack tracking checkout sessions conversion rates.
  * **CSV Report Exporter**: Dynamic saving loaders that download telemetry financial data as `.json` logs.
* **Product Manager CRUD Panel**: Full-width active inventory logs allowing administrators to add products, modify pricing/stocks inline via overlay modal modals withPreset visual preset previews, and remove catalogue items.
* **Orders Ledger**: Real-time transactions log with **Fast Dispatch** overrides that change statuses from Processing ➔ Shipped ➔ Delivered and trigger success alert toasts.
* **Stock levels monitor**: Colorful progression registers displaying catalog item volumes and pulsing red warnings for items under 15 units.

### 🛡️ Technical & Security Suite
* **Wildcard 404 Error Page (`*` wildcards)**: Custom error grid with giant deconstructed numbers, search bars, and home directories redirectors.
* **Maintenance Offline Portal (`/maintenance`)**: Renders expanding radar pulse rings around CPU badges and visual Estimated progress meters.
* **Firewall Access Restricted (`/access-denied`)**: Displays security shields, client IP markers, requested scopes, incident logs, and validation ticket request handlers.
* **Session Expired Timeouts (`/session-expired`)**: Security elapsed clocks. Pre-fills passcode re-authentication cards that simulate unlock keys for 1.8s, shows toast success messages, and redirects back to dashboards.
* **Error Registry Logs**: Live telemetry alarm boards holding Critical, Fatal, and Warning incidents. Admins can "Acknowledge" lines to clear active alerts in real-time.
* **Audit Trails Timelines**: Signed compliance trail tracking staff overrides (UTC timestamps, acteur details, system logs, IPs).

### 👤 Personal User Portals
* **My Account (`/profile` & `/account`)**: Tabbed portal containing details forms, shipping grids, Visa design payments modules, security GDPR exporters, and a **Holographic Glare VIP Loyalty Card** that shines dynamically based on mouse angles.
* **Order History Ledger (`/orders`)**: Loyalty tier progress meters, Purchase logs, and Courier stepper tracking loops.

---

## 🛠️ Technology Stack

* **Front-End Framework**: [React v18](https://react.dev/)
* **Vite Tooling**: [Vite v8](https://vitejs.dev/) (Production compiles in **<700ms**)
* **Header & Icon System**: [Lucide-React](https://lucide.dev/) (Crisp high-definition vectors)
* **Styling core**: Vanilla CSS (Harmony HSL tailors, glassmorphism, responsive grids, and standard keyframe reveals)
* **State Management**: React context API (`CartContext`)

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd ecom
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Launch local development server**:
   ```bash
   npm run dev
   ```
   * *Open `http://localhost:5173` in your browser to inspect.*

4. **Compile production build bundle**:
   ```bash
   npm run build
   ```
   * *Vite will compile and compress code assets in under 1 second into the `/dist` directory.*

---

## 📐 Styling Guidelines & Transitions
* All primary sections feature viewport-reach **scroll reveals** or **tab reveals** sliding from left-to-right (`translateX(-30px) -> translateX(0)`) and fading in (`opacity: 0 -> 1`) using cubic-bezier transitions.
* Neon borders, glassmorphic grids, radial gradients, and pastel tag chips are coded natively in `src/index.css` without adding package bloat.
