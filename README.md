# Pizza Ordering App

A full-stack application that allows various restaurants to register and manage their menus, users, and orders efficiently. 
Customers can browse available menus, place orders, and track order status through the app.
The application provides user roles for seamless restaurant management and order tracking.
This app is Deployed on Vercel.

[Go to the App](https://pizza-ordering-app-tau.vercel.app/) 

## Table of Contents
- [About the App](#about-the-app)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contributing](#contributing)

## About the App

This application is designed to support multiple restaurants by enabling them to:
- **Register and manage staff roles** including Branch Manager, Kitchen Manager, and Cashier.
- **Administer menus and orders** where the Kitchen Manager can add menu items, toppings, and manage order statuses.
- **Assign roles** such as Super Admin to oversee the platform and register new restaurants with restaurant register. The restaurant register add roles and staffs.
- **Track orders in real-time** for customer convenience.

Each restaurant admin can manage staff members and define roles, while the Kitchen Manager oversees menu creation and order updates. Customers enjoy browsing the menu and tracking their orders with ease.

## Features

- **Role-based Access Control**: CASL handles different access levels based on user roles.
- **Dynamic Menu Management**: Kitchen Managers can create and update menu items and toppings.
- **Order Management**: Orders are tracked in real-time for both customers and staff.
- **Admin Control**: Super Admin oversees the platform, while Restaurant Admins manage restaurant-specific settings and users.

## Installation
To get a local copy up and running, follow these steps:

### Prerequisites
- Node.js (v20 or higher)
- PostgreSQL

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/getye/Pizza-Ordering-App.git

2. **Navigate into the project directory**:
    ```bash
    cd Pizza-Ordering-App

3. **Install dependencies**:
    ```bash
    npm install

4. **Start the application**:
    ```bash
    npm start

## Usage

- Access the app at http://localhost:3000 in your browser.
- Register a restaurant with restaurant register.
- Add roles and staffs.
- Add menus with topping.
- Customers can browse the menu, customize their pizza, and place orders.

## Technologies Used

### Frameworks
- **React.js**: For building the frontend, managing state, and rendering   components dynamically.
- **Node.js**: Server-side runtime environment for JavaScript.
- **Express.js**: Backend framework for building API routes and handling HTTP requests.

### Tools
- **PostgreSQL**: Relational database to store restaurant, menu, and order data.
- **JWT (JSON Web Tokens)**: For handling secure authentication.
- **CASL**: For implementing role-based access control.
- **Material UI**: Component library for responsive UI.
- **Material React Table**: For displaying data in a table format.
- **Cloudinary**: Media storage for images

### Deployment
- **Frontend**: Deployed on Vercel.
- **Backend**: Hosted on Railway.
- **Media**: Cloudinary is used for storing images.