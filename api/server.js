import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const BASE_URL = 'https://alphasilver.productsalphawizz.com/app/v1/api';

// Enable CORS and JSON parsing for incoming requests
app.use(cors());
app.use(express.json());

// Helper function to create API routes
const createApiRoute = (endpoint) => {
  app.post(`/api/${endpoint}`, async (req, res) => {
    console.log("Request Body:", req.body);
    // try {
    //   const response = await axios.post(`${BASE_URL}/${endpoint}`, req.body);
    //   res.json(response.data);
      
    try {
      // Convert request body to URL-encoded format
      const formData = qs.stringify(req.body);
      const response = await axios.post(`${BASE_URL}/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      res.status(500).send(`Error fetching ${endpoint}`);
    }
  });
};

// Create routes for multiple API endpoints
const endpoints = [
  // General API Endpoints
  'get_sections',
  'get_categories',
  'get_cities',
  'get_areas_by_city_id',
  'get_products',
  'get_settings',
  'get_slider_images',
  'validate_promo_code',

  // User's Orders Management
  'place_order',
  'add_transaction',
  'get_orders',
  'update_order_item_status',

  // User's Ratings Management
  'set_product_rating',
  'delete_product_rating',
  'get_product_rating',
  'get_product_review_images',

  // User's Address Management
  'add_address',
  'update_address',
  'delete_address',
  'get_address',

  // User's Cart Management
  'get_user_cart',
  'remove_from_cart',
  'manage_cart',

  // User Management        
  'verify_user',
  'register_user',
  'update_user',
  'reset_password',
  'login',
  'get_login_identity',

  // Section Management
  'get_notifications',

  // Favorite Management
  'add_to_favorites',
  'remove_from_favorites',
  'get_favorites',
  'get_jwt_key',

  // PayPal and Payment
  'get_paypal_link',
  'get_offer_images',
  'get_faqs',
  'stripe_webhook',
  'transactions',
  'generate_paytm_checksum',
  'generate_paytm_txn_token',
  'validate_paytm_checksum',
  'validate_refer_code',
  'flutterwave_webview',
  'flutterwave_payment_response',
  'delete_order',

  // Support Ticket API
  'get_ticket_types',
  'add_ticket',
  'edit_ticket',
  'send_message',
  'get_tickets',
  'get_messages',

  // Direct Bank Transfer
  'send_bank_transfer_proof',
  'get_zipcodes',

  // Seller and Promo Codes
  'get_sellers',
  'get_promo_codes',
];


// Set up routes for each endpoint
endpoints.forEach(createApiRoute);

// Export the Express app as the default export
export default app;
