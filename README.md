# 🛒 বাজার দর | BazarDor

### Know the Price. Shop Smarter.

BazarDor (বাজার দর) is a modern, responsive market-price tracking web application designed to help users explore products, monitor daily price movements, and discover which products have experienced the biggest price increases or decreases.

The platform provides an intuitive browsing experience with category-based navigation, daily price-change sections, and multiple authentication options. Built with modern web technologies, BazarDor aims to make market-price information easier to access and help users make more informed shopping decisions.

---

## 🌐 Live Demo & Repository

- **Live Website:** https://bazar-dor-by-asif.vercel.app
- **GitHub Repository:** https://github.com/Asif-Hosen/bazar-dor

Explore the live application or visit the repository to review the source code, project structure, and implementation.

---

## ✨ Key Features

### 1. 📈 Daily Price Increases

Discover products whose prices have increased.

- Displays up to six products with the largest percentage increases.
- Sorts products by their percentage increase so the biggest risers appear first.
- Helps users identify products that have become more expensive.

### 2. 📉 Daily Price Decreases

Find products whose prices have decreased.

- Displays up to six products with the largest percentage decreases.
- Ranks products by the magnitude of their price decreases.
- Helps users discover potentially more affordable products.

### 3. 🛍️ Product Browsing & Category Navigation

Browse available products through a clean and user-friendly interface.

- Explore product categories using category-based navigation.
- Navigate horizontally through categories on smaller screens.
- Use mobile-friendly left and right navigation arrows to discover additional categories.
- Enjoy a consistent browsing experience across mobile, tablet, and desktop devices.

### 4. 🔐 Multiple Authentication Options

Access the application through a flexible authentication system powered by Better Auth.

- Register using an email address and password.
- Sign in using email and password.
- Authenticate with Google.
- Authenticate with GitHub.
- Store authentication-related data using MongoDB.

### 5. 📱 Responsive & User-Friendly Interface

Designed to provide a smooth experience across different screen sizes.

- Responsive layouts for mobile, tablet, and desktop.
- Clear visual hierarchy and easy-to-understand sections.
- Mobile-friendly horizontal navigation.
- Loading and fallback handling for unavailable product or category data.
- Simple navigation designed to help users find information quickly.

---

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Application framework, routing, and server-side rendering |
| React | Component-based UI development |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and UI design |
| MongoDB Atlas | Cloud database |
| Better Auth | Authentication and session management |
| Google OAuth | Google authentication |
| GitHub OAuth | GitHub authentication |
| Vercel | Application deployment and hosting |

---

## 🏗️ Application Highlights

- **Server-side data fetching:** Product and category data are retrieved from the configured API.
- **Revalidation:** Product data is configured to revalidate every 60 seconds, while category data revalidates every hour.
- **Type-safe development:** TypeScript interfaces help maintain consistent data structures.
- **Reusable components:** Shared components help keep the UI organized and maintainable.
- **Authentication integration:** Better Auth connects email/password and social authentication providers.
- **Production deployment:** The application is deployed on Vercel and available through the live website.

---

## 🎯 Project Objectives

BazarDor was developed to provide a convenient way to explore market products and understand daily price movements.

The main objectives are to:

- Make product and market-price information easier to browse.
- Highlight products with significant price increases and decreases.
- Provide accessible navigation on mobile and desktop.
- Offer convenient and reliable authentication options.
- Deliver a responsive, maintainable web application using modern development practices.

---

## ⚙️ Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- A MongoDB Atlas database or compatible MongoDB connection
- Google and GitHub OAuth credentials if you want to test social authentication

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Asif-Hosen/bazar-dor.git
```

**2. Navigate to the project directory**

```bash
cd bazar-dor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the project's root directory and configure the environment variables required by your application.

```env
NEXT_PUBLIC_SERVER_BASE_URL=your_api_base_url
MONGO_DB_URL=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the example values with your actual credentials. Never commit your `.env` file or expose private credentials in your repository.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

BazarDor is deployed using Vercel.

To deploy your own instance:

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel.
4. Configure the Google and GitHub OAuth callback URLs for your deployment domain.
5. Deploy the application and verify that product data and authentication work correctly.

---

## 🔒 Security Notes

- Keep database connection strings and authentication secrets private.
- Configure the correct production URL and trusted origins.
- Restrict MongoDB Atlas network access appropriately for your deployment environment.
- Configure OAuth redirect URLs to match the deployed application.
- Never commit API keys, OAuth secrets, or other private credentials.

---

## 👨‍💻 Author

**Asif Hosen**

- GitHub: [@Asif-Hosen](https://github.com/Asif-Hosen)
- Project Repository: [BazarDor](https://github.com/Asif-Hosen/bazar-dor)

---

## 📄 License

This project is available for educational and portfolio purposes. Add a `LICENSE` file to the repository if you intend to distribute it under a specific open-source license.

---

**বাজার দর | BazarDor — Know the Price. Shop Smarter.**
