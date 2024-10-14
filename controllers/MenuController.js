const { v4: uuidv4 } = require('uuid');
const MenuModel = require('../models/MenuModel');
const UserModel = require('../models/UserModel');


const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addMenu = async (req, res) => {
  const id = uuidv4();
  const manager_id = req.user.userId;
  const { menuName, toppings, price } = req.body;
  const image = req.file;

  try {
    // Retrieve the Kitchen Manager's restaurant
    const restaurantName = await UserModel.getAdminRestaurant(manager_id);
    
    if (!restaurantName) {
      return res.status(404).json({ message: "Admin restaurant not found" });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      folder: 'uploads/pizza',  // folder on Cloudinary
    });

    // Get the secure URL for the uploaded image
    const picture = uploadResult.secure_url;

    // Insert menu details into the database
    await MenuModel.addMenu(id, menuName, toppings, price, picture, restaurantName);

    res.status(201).json({ message: "Menu Successfully Added", imageUrl: picture });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding menu", error: err });
  }
};


const viewMenus = async (req, res) => {
  try {
    const menus = await MenuModel.viewMenus();
    res.json(menus.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving menus" });
  }
};

const orderPizza = async (req, res) => {
  const id = uuidv4();
  const customer_id = req.user.userId;
  const { menu_name, toppings, price, quantity, restaurant} = req.body;
  const order_status = "Pending";

  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Ensures two digits
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = currentDate.getDate().toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${hours}:${minutes} ${month}/${day}/${year}`;

  try {
  
    await MenuModel.orderPizza(id, customer_id, menu_name, toppings, price, quantity, restaurant, order_status, formattedDate);
    res.status(201).json({ message: "Your Order Successfully Submited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error, ",err });
  }
}; 

const viewOrders = async (req, res) => {
  const customer_id = req.user.userId;
  try {
    const menus = await MenuModel.viewOrders(customer_id);
    res.json(menus.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving menus" });
  }
};

const managerViewOrders = async (req, res) => {
  const manager_id = req.user.userId;
  try {
    const restaurant = await UserModel.getAdminRestaurant(manager_id);

    if (!restaurant) {
      return res.status(404).json({ message: "Admin restaurant not found" });
    }
    
    // Fetch orders with customer data
    const ordersWithCustomers = await MenuModel.managerViewOrdersWithCustomers(restaurant);
    
    // Log the response
    console.log("Orders with Customers: ", ordersWithCustomers.rows);
    
    res.json(ordersWithCustomers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { order_id } = req.params; // Get role_id from URL params
  const { order_status } = req.body; // Extract role_status from request body

  try {
    await MenuModel.updateOrderStatus(order_id, order_status);

    res.status(201).json({ message: 'Order Status updated successfully' });
    
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const managerViewMenus = async (req, res) => {
  const manager_id = req.user.userId;

  try {

      // Retrieve the Manager's restaurant
    const restaurantName = await UserModel.getAdminRestaurant(manager_id);

    if (!restaurantName) {
      return res.status(404).json({ message: "Manager restaurant not found" });
    }
    const menus = await MenuModel.managerViewMenus(restaurantName);
    res.json(menus.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving menus" });
  }
};

const reports = async (req, res) => {
  const manager_id = req.user.userId;
  console.log("User ID: ", manager_id)

  try {

      // Retrieve the Manager's restaurant
    const restaurantName = await UserModel.getAdminRestaurant(manager_id);

    if (!restaurantName) {
      return res.status(404).json({ message: "Manager restaurant not found" });
    }
    const report = await MenuModel.reports(restaurantName);
    console.log(report)
    res.json(report.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving order reports" });
  }
};

const viewEarnings = async (req, res) => {
  try {
    const earnings = await MenuModel.viewEarnings(); // Get data from model
    console.log("earnings: ", earnings);
    res.json(earnings); // Send the results as JSON to the client
  } catch (err) {
    console.error('Error retrieving earnings reports:', err);
    res.status(500).json({ message: "Error retrieving earnings reports" });
  }
};


module.exports = {
    addMenu,
    viewMenus,
    orderPizza,
    viewOrders,
    managerViewOrders,
    updateOrderStatus,
    managerViewMenus,
    reports,
    viewEarnings,

};