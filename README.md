# Play Pixel - Video Game Shopping Cart

Welcome to Play Pixel, your ultimate destination for purchasing and exploring the latest video games! This monorepo combines a seamless shopping experience with user authentication, product reviews, secure payments through the Stripe gateway, a powerful search functionality, and distinct directories for the frontend and backend.

## Key Features

### 1. User Authentication
- Users can create accounts, log in, and enjoy a personalized shopping experience.
- Secure authentication powered by Node.js and Express.js ensures data integrity.

### 2. Intuitive Shopping Cart
- Browse a vast selection of video games, add them to your cart, and proceed to checkout effortlessly.
- Vite-React and Bootstrap provide a responsive and user-friendly interface.

### 3. Product Reviews
- Users can share their thoughts on purchased products, contributing to a dynamic and interactive community.
- Product reviews are seamlessly updated in real-time on the product page.

### 4. Secure Payments with Stripe
- Integrated Stripe payment gateway ensures secure and efficient transactions.
- Users can confidently make purchases with a trusted payment processing solution.

### 5. Robust Search Functionality
- Easily find your favorite games using the powerful search functionality.
- Search results are instant and help you quickly discover the games you're looking for.

### 6. Database Powered by MySQL
- MySQL handles the backend database, ensuring data is stored and retrieved efficiently.
- Database management allows for scalable growth and smooth user experiences.

## Project Structure

- **frontend:** Vite-React application for the user interface.
- **backend:** Node.js and Express.js application for server-side logic and API.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/play-pixel.git
   ```

2. Install dependencies:

   ```bash
   cd play-pixel
   npm install
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Run the applications:

   ```bash
   # Run the frontend
   cd ../frontend
   npm run dev

   # Run the backend
   cd ../backend
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser for the frontend.

## Deployment

- **Frontend:** Deployed on [Vercel](https://play-pixel.vercel.app/)
- **Backend:** Deployed on [Render](https://play-pixel-qdr3.onrender.com)

Make sure to adjust the commands and paths based on your actual project structure and scripts.
