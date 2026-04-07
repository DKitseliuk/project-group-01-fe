🇺🇦 [Ukrainian version](README.uk.md)


# 🌍 Natural Travels 

A full-stack web application for discovering, sharing, and reviewing travel locations across Ukraine.

The platform allows users to explore places, filter them by different criteria, read real user reviews, and contribute their own travel experiences.

---

## 🚀 Features

### 🔍 Discovery & Search
- Search locations by name, type, or region
- Advanced filtering (region, category)
- Sorting (rating, popularity, newest)
- Dynamic URL-based query parameters

### 🧭 Locations Catalog
- Responsive grid with pagination / "Load More"
- Real-time data updates without page reload
- Empty state handling

### 📍 Location Details
- Full location information (name, rating, region, type)
- Image display with optimized loading
- Author profile navigation
- Reviews section

### ⭐ Reviews System
- View user reviews with ratings
- Add review (authorized users only)
- Modal-based interaction
- Validation and error handling

### 👤 Authentication & Profile
- User registration and login
- Protected routes
- Profile page with user-generated content
- Conditional UI based on auth state

### ➕ Content Creation
- Add new locations
- Edit existing locations
- Image upload preview
- Form validation (Formik + Yup)

### 🧩 UI/UX
- Fully responsive (mobile-first approach)
- Hover and interaction states
- Loaders for async operations
- Toast notifications for feedback

---

## 🛠 Tech Stack

### Core
- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**

### Styling
- CSS Modules
- modern-normalize

### State & Data
- Zustand (client state)
- TanStack React Query (server state, caching, sync)

### Forms & Validation
- Formik
- Yup

### API & Utilities
- Axios
- use-debounce

### UI Components & Libraries
- Swiper (sliders)
- React Icons
- React Hot Toast (notifications)
- React Loader Spinner
- React Select
- React Paginate

### Ratings
- @smastrom/react-rating
- react-simple-star-rating

---

## 🧱 Architecture

- **Server Components by default**
- **Client Components only when needed**:
  - forms
  - state management
  - interactivity

- **Routing**: Next.js App Router
- **Protected routes** handled at component level

- **Data fetching**:
  - React Query for caching and sync
  - Dynamic updates without reload

---

## 📁 Project Structure (simplified)

app/
layout.tsx
page.tsx
locations/
profile/
login/
register/

components/
UI/
layout/
forms/
modals/

lib/
api/
utils/


---

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build project
npm run build

# Start production
npm start

## 🌐 SEO & Performance

- Dynamic metadata generation using `generateMetadata`
- Open Graph tags for location pages
- Optimized image loading with `next/image`

---

## ✨ Implemented Features & Highlights

- Fully responsive design (mobile-first approach)
- Complete error handling (API + form validation)
- Toast notifications for user feedback
- Loading indicators for all async operations
- Clean and reusable component architecture

### Advanced Features Implemented

- Map integration for location details
- Pagination system (including advanced navigation)
- Profile editing via modal window
- Dynamic filtering with URL synchronization