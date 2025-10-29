# TicketHub - Vue.js Ticket Management System

Live URL - https://vue-ticket-management-app.vercel.app/

A modern, responsive ticket management system built with Vue.js 3, Vue Router, and Tailwind CSS. This application allows users to create accounts, manage support tickets, and track their status through an intuitive dashboard interface.

## 🚀 Features

### Authentication
- **User Registration**: Create new accounts with email, password, and name validation
- **User Login**: Secure sign-in with email and password
- **Form Validation**: Real-time validation with helpful error messages
- **Local Storage**: User data persistence using browser localStorage

### Dashboard
- **Statistics Overview**: Real-time statistics showing total, open, in-progress, and closed tickets
- **Quick Actions**: Direct navigation to ticket management
- **Responsive Design**: Optimized for desktop and mobile devices

### Ticket Management
- **Create Tickets**: Add new support tickets with title, description, and status
- **Edit Tickets**: Modify existing ticket details
- **Delete Tickets**: Remove tickets with confirmation dialog
- **Status Tracking**: Track tickets through Open, In Progress, and Closed states
- **Local Storage**: All ticket data persists in browser localStorage

### User Interface
- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Works seamlessly on all device sizes
- **Smooth Animations**: Hover effects and transitions for better UX
- **Accessibility**: Proper form labels and semantic HTML

## 🛠️ Tech Stack

- **Vue.js 3**: Progressive JavaScript framework with Composition API
- **Vue Router**: Official router for Vue.js with lazy-loaded routes
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript with async/await

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js) or **yarn**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mimidev247/vue-ticket-management-app.git
cd vue-ticket-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at the development server

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
vue-ticket-management-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── base.css
│   │   ├── logo.svg
│   │   ├── main.css
│   │   └── tailwind.css
│   ├── components/
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   └── icons/
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── Authentication.vue
│   │   ├── Dashboard.vue
│   │   ├── HomeView.vue
│   │   ├── LandingPage.vue
│   │   └── TicketManagement.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── jsconfig.json
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`:


### Vue Router

Routes are configured in `src/router/index.js`:

- `/` - Landing page
- `/login` - Authentication page
- `/dashboard` - User dashboard
- `/tickets` - Ticket management

## 🎯 Usage Guide

### First Time Setup

1. **Visit the Application**: Open the development server  in your browser
2. **Create an Account**: Click "Sign In" on the landing page, then "Sign Up" to create a new account
3. **Sign In**: Use your credentials to log into the application
4. **Explore Dashboard**: View ticket statistics and navigate to ticket management

### Managing Tickets

1. **Create a Ticket**:
   - Navigate to the Dashboard and click "Manage Tickets"
   - Fill in the title, description, and select a status
   - Click "Create Ticket"

2. **Edit a Ticket**:
   - In the ticket list, click the "Edit" button next to any ticket
   - Modify the details and click "Update Ticket"

3. **Delete a Ticket**:
   - Click the "Delete" button next to a ticket
   - Confirm the deletion in the dialog

### Navigation

- **Landing Page**: Marketing page with feature overview
- **Authentication**: Sign up or sign in to access the app
- **Dashboard**: Overview of ticket statistics
- **Ticket Management**: Full CRUD operations for tickets

## 💾 Data Storage

The application uses browser localStorage for data persistence:

- **Users**: Stored as JSON array under `users` key
- **Current User**: Stored as JSON object under `currentUser` key
- **Tickets**: Stored as JSON array under `tickets` key

**Note**: This is for demonstration purposes. In a production application, you would use a proper backend API with secure authentication and database storage.





