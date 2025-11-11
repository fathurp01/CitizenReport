# 🏘️ CitizenReport - Community Issue Reporting System

A comprehensive full-stack web application that enables citizens to report community issues (road damage, garbage, flooding, street lights, etc.) directly to village officials. Built with React.js frontend and Express.js backend, featuring role-based access control for citizens, village staff, and administrators.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### For Citizens
- 📝 **Submit Reports**: Create detailed reports about community issues with images
- 📸 **Image Upload**: Attach multiple photos to document issues
- 📍 **Location Details**: Specify RT/RW (neighborhood unit) information
- 🔍 **Track Reports**: Monitor the status of submitted reports (pending, received, in progress, completed, rejected)
- 📰 **Read Articles**: Access informative articles about community news and guidelines
- 👤 **Profile Management**: Update personal information and account settings

### For Village Staff
- 📋 **Manage Reports**: Review and process citizen reports
- 🔄 **Status Updates**: Change report status with action comments
- ✍️ **Article Management**: Create, edit, and publish community articles
- 📊 **Dashboard**: Overview of reports requiring attention

### For Administrators
- 👥 **User Management**: View, edit, and manage all user accounts
- 🔐 **Role Assignment**: Assign roles (citizen, village_staff, admin)
- 📊 **Complete Dashboard**: Full system overview and statistics
- 📝 **Report Oversight**: Access to all reports across the system
- 📰 **Content Moderation**: Approve or reject articles before publication

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18.2.0) - UI framework
- **React Router DOM** (v6.22.1) - Navigation and routing
- **Material-UI** (v5.15.10) - UI component library
- **Axios** (v1.9.0) - HTTP client for API requests
- **date-fns** (v3.3.1) - Date formatting and manipulation

### Backend
- **Node.js** with **Express.js** (v4.21.2) - Server framework
- **Sequelize** (v6.37.7) - ORM for database operations
- **MySQL2** (v3.14.1) - Database driver
- **JWT** (v9.0.2) - Authentication and authorization
- **bcryptjs** (v3.0.2) - Password hashing
- **Multer** (v2.0.0) - File upload handling
- **Helmet** (v7.1.0) - Security headers
- **Morgan** (v1.10.0) - HTTP request logging
- **Express Rate Limit** (v7.1.5) - Rate limiting middleware
- **Compression** (v1.7.4) - Response compression

## 📁 Project Structure

```
CitizenReport/
├── backend/
│   ├── config/
│   │   └── database.js           # Database configuration
│   ├── controllers/
│   │   ├── adminController.js    # Admin operations
│   │   ├── articleController.js  # Article CRUD
│   │   ├── authController.js     # Authentication
│   │   └── reportController.js   # Report management
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── upload.js             # File upload handling
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Report.js             # Report model
│   │   ├── ReportAction.js       # Report action history
│   │   └── article.js            # Article model
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── reports.js            # Report routes
│   │   ├── admin.js              # Admin routes
│   │   ├── articleRoutes.js      # Article routes
│   │   └── profile.js            # Profile routes
│   ├── public/
│   │   └── api-docs.html         # API documentation
│   ├── uploads/                  # Uploaded images directory
│   ├── seeder.js                 # Database seeder
│   ├── server.js                 # Main server file
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Layout.js           # Main layout wrapper
│   │   │   │   ├── ArticleCard.js      # Article display card
│   │   │   │   ├── SkeletonLoader.js   # Loading skeleton
│   │   │   │   └── ProtectedRoute.js   # Route protection
│   │   │   ├── EditProfile.js          # Profile editing
│   │   │   └── EditReport.js           # Report editing
│   │   ├── context/
│   │   │   └── AuthContext.js          # Authentication context
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.js        # Admin dashboard
│   │   │   │   ├── UserManagement.js   # User management
│   │   │   │   └── ArticleManagement.js # Article moderation
│   │   │   ├── citizen/
│   │   │   │   ├── Dashboard.js        # Citizen dashboard
│   │   │   │   ├── CreateReport.js     # Report creation
│   │   │   │   ├── ReportDetails.js    # Report view
│   │   │   │   └── ArticleList.js      # Article browsing
│   │   │   ├── staff/
│   │   │   │   ├── Dashboard.js        # Staff dashboard
│   │   │   │   ├── ReportDetails.js    # Report processing
│   │   │   │   └── ArticleForm.js      # Article creation
│   │   │   ├── Home.js                 # Home page
│   │   │   ├── LandingPage.js          # Landing page
│   │   │   ├── Login.js                # Login page
│   │   │   ├── Register.js             # Registration page
│   │   │   └── NotFound.js             # 404 page
│   │   ├── styles/
│   │   │   └── enhanced.css            # Enhanced styles
│   │   ├── App.js                      # Main app component
│   │   ├── App.css                     # App styles
│   │   ├── animations.css              # Animation styles
│   │   └── index.js                    # Entry point
│   └── package.json
│
├── package.json                  # Root package.json
├── README.md                     # This file
└── LICENSE                       # License file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **npm** (v6.x or higher) - Comes with Node.js
- **MySQL** (v5.7 or higher) or **MariaDB** - [Download](https://www.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/fathurp01/CitizenReport.git
cd CitizenReport
```

### 2. Install Dependencies

Install all dependencies for both backend and frontend:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root directory
cd ..
```

**Or use the convenient script:**

```bash
npm run install-all
```

## ⚙️ Configuration

### 1. Database Setup

Create a MySQL database for the application:

```sql
CREATE DATABASE citizen_report;
```

### 2. Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
```

Create `.env` file with the following content:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=citizen_report
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg
```

**Important:** Replace `your_mysql_password` and `your_jwt_secret_key_here_make_it_long_and_random` with your actual values.

### 3. Seed Database (Optional)

Populate the database with sample data:

```bash
# From the root directory
npm run seed

# Or from backend directory
cd backend
npm run seed
```

This will create:
- Sample admin, staff, and citizen accounts
- Sample reports
- Sample articles

**Default credentials after seeding:**
- **Admin**: admin@example.com / admin123
- **Staff**: staff@example.com / staff123
- **Citizen**: citizen@example.com / citizen123

## 🎯 Usage

### Development Mode

Run both frontend and backend concurrently:

```bash
# From root directory
npm start
```

This will start:
- Backend server at `http://localhost:5001`
- Frontend development server at `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
npm run server
# Or
cd backend
npm run dev
```

**Frontend only:**
```bash
npm run client
# Or
cd frontend
npm start
```

### Production Mode

**Build frontend:**
```bash
cd frontend
npm run build
```

**Start backend:**
```bash
cd backend
npm start
```

## 📚 API Documentation

The API documentation is available at `http://localhost:5001/api-docs` when the backend server is running.

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

#### Reports
- `GET /api/reports` - Get all reports (filtered by role)
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create new report (citizen only)
- `PUT /api/reports/:id` - Update report (staff/admin)
- `DELETE /api/reports/:id` - Delete report (admin only)

#### Articles
- `GET /api/articles` - Get all approved articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article (staff/admin)
- `PUT /api/articles/:id` - Update article (staff/admin)
- `DELETE /api/articles/:id` - Delete article (admin only)

#### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

#### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## 👥 User Roles

### Citizen
- Create and submit community issue reports
- View own reports and their status
- Edit own profile information
- Read approved articles
- Upload images with reports

### Village Staff
- View and manage all reports
- Update report status (received, in_progress, completed, rejected)
- Add action comments to reports
- Create and publish articles
- View pending articles

### Administrator
- Full access to all features
- Manage users (create, update, delete, role assignment)
- Moderate articles (approve/reject)
- Delete any report
- Access complete system dashboard
- View system statistics

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `fullName` - User's full name
- `email` - Unique email (login credential)
- `password` - Hashed password
- `phoneNumber` - Contact number
- `address` - Full address
- `rt` - Neighborhood unit number
- `rw` - Community unit number
- `role` - ENUM('citizen', 'village_staff', 'admin')
- `birthDate` - Date of birth
- `gender` - ENUM('male', 'female')
- `occupation` - User's occupation
- `createdAt`, `updatedAt` - Timestamps

### Reports Table
- `id` - Primary key
- `userId` - Foreign key to Users
- `title` - Report title
- `description` - Detailed description
- `category` - ENUM('road_damage', 'garbage', 'flood', 'street_light', 'other')
- `address` - Issue location
- `rt` - Neighborhood unit
- `rw` - Community unit
- `images` - JSON array of image paths
- `status` - ENUM('pending', 'received', 'in_progress', 'completed', 'rejected')
- `createdAt`, `updatedAt` - Timestamps

### ReportActions Table
- `id` - Primary key
- `reportId` - Foreign key to Reports
- `userId` - Foreign key to Users (staff who took action)
- `action` - Status change action
- `comment` - Action comment/note
- `createdAt` - Timestamp

### Articles Table
- `id` - Primary key
- `title` - Article title
- `content` - Article content (HTML supported)
- `author` - Author name
- `image` - Featured image path
- `status` - ENUM('pending', 'approved', 'rejected')
- `createdAt`, `updatedAt` - Timestamps

## 🎨 Screenshots

*(Add screenshots of your application here)*

- Landing Page
- Login/Register
- Citizen Dashboard
- Create Report
- Staff Dashboard
- Admin User Management
- Article List

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow existing code style
- Write meaningful commit messages
- Comment complex logic
- Update documentation as needed
- Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Fathur Rahman**
- GitHub: [@fathurp01](https://github.com/fathurp01)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- Express.js community for excellent middleware
- React.js team for the amazing framework
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainer

## 🔄 Updates and Roadmap

### Current Version: 1.0.0

### Future Enhancements
- [ ] Real-time notifications using WebSocket
- [ ] Email notifications for report updates
- [ ] Mobile app version (React Native)
- [ ] Map integration for location visualization
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Export reports to PDF
- [ ] Public report viewing (anonymous)

---

**Made with ❤️ for better community engagement**