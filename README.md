# 🚚 ProFast Delivery Service – A Modern Courier & Delivery Web App

A full-featured delivery service web application where users can sign up, create shipment requests, track parcels, and get real-time delivery updates. It supports dynamic content rendering, user authentication, and is fully mobile responsive.

---

## 🌟 Main Features

- 🔐 User authentication (Sign in/up via Firebase)  
- 📦 Create, update, delete, and track shipment requests (CRUD)  
- 🛵 Rider-specific delivery management & status updates  
- 📈 Delivery statistics and summary reports  
- 💬 Customer feedback and contact support system  
- 🌐 Responsive layout compatible with all devices  
- 🔔 Real-time notifications for parcel status changes

---

## 🧰 Technologies Used

| Technology       | Version | Purpose                         |
|------------------|---------|--------------------------------|
| React.js         | ^18.x   | Frontend framework             |
| Firebase         | ^9.x    | Authentication & hosting       |
| Node.js          | ^18.x   | Backend runtime (if used)       |
| Express.js       | ^4.x    | Backend API handling           |
| MongoDB (Atlas)  | Cloud   | Database                      |
| React Router DOM | ^6.x    | Client-side routing            |
| Tailwind CSS     | ^3.x    | UI styling                    |
| React Icons      | ^4.x    | Icon components                |
| React Query      | ^4.x    | Data fetching & caching        |
| React Toastify   | ^9.x    | Toast notifications            |

---

## 📦 Project Dependencies

- `react`  
- `react-router-dom`  
- `firebase`  
- `tailwindcss`  
- `daisyui`  
- `react-icons`  
- `react-query`  
- `react-toastify`  

---

## ⚙️ How to Run Locally

Follow these steps to run ProFast Delivery Service on your local machine:

```bash
# 1. Clone the repo
git clone https://github.com/your-username/profast-delivery.git

# 2. Navigate into the project folder
cd profast-delivery

# 3. Install dependencies
npm install

# 4. Add Firebase config in .env file
REACT_APP_apiKey=your_firebase_api_key
REACT_APP_authDomain=your_auth_domain
REACT_APP_projectId=your_project_id
REACT_APP_storageBucket=your_storage_bucket
REACT_APP_messagingSenderId=your_sender_id
REACT_APP_appId=your_app_id

# 5. Run the development server
npm start

