# WorkSphere — Frontend

WorkSphere is a modern role-based employee and office management platform built with React.

The frontend provides a centralized interface for managing employees, departments, attendance, leaves, tasks, documents, notifications, dashboards, and audit logs.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 👥 Role-based access control
- 📊 Admin and manager dashboards
- 👨‍💼 Employee management
- 🏢 Department management
- 🕐 Attendance management
- 📝 Leave management
- ✅ Task management
- 📄 Document upload and management
- 🔔 Notifications
- 📋 Audit logs
- 🔎 Global search
- 📱 Responsive user interface
- ⚡ API integration with Axios
- 🛡️ Protected routes
- ♻️ Reusable React components

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- React Router
- Axios
- Vite
- CSS / Utility-based styling

### Backend

- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- MySQL
- REST APIs

---

## 🏗️ Project Architecture

The frontend follows a feature-based structure to keep the application modular and maintainable.

    src/
    ├── components/
    ├── pages/
    ├── services/
    ├── layouts/
    ├── routes/
    ├── utils/
    ├── App.jsx
    └── main.jsx

### Services

API communication is organized through service files.

    src/services/
    ├── api.js
    ├── attendanceService.js
    ├── auditService.js
    ├── dashboardService.js
    ├── documentService.js
    ├── notificationService.js
    └── ...

The Axios API client automatically attaches the JWT token to authenticated requests.

---

## 🔐 Authentication & Authorization

WorkSphere uses JWT-based authentication.

The frontend:

1. Sends login credentials to the backend.
2. Receives a JWT token.
3. Stores the token in browser local storage.
4. Attaches the token to protected API requests.
5. Redirects the user to the login page when authentication expires.

Role-based access is handled through the application's protected routes and backend authorization.

Supported application roles include:

- ADMIN
- MANAGER
- EMPLOYEE

---

## 📊 Dashboard

The dashboard provides role-based information such as:

- Total employees
- Departments
- Pending leaves
- Tasks
- Completed tasks
- Attendance information
- Leave status
- Recent activities

Dashboard data is retrieved from the WorkSphere backend through REST APIs.

---

## 👨‍💼 Employee Management

The employee module provides functionality for managing employee information and includes:

- Employee listing
- Employee details
- Employee creation
- Employee updates
- Employee deletion/deactivation
- Employee search

---

## 🏢 Department Management

The department module provides:

- Department listing
- Department management
- Employee-department association

---

## 🕐 Attendance Management

The attendance module supports:

- Employee check-in
- Employee check-out
- Personal attendance history
- Employee attendance records
- Attendance status

Attendance information is integrated with the dashboard.

---

## 📝 Leave Management

The leave module provides functionality for:

- Applying for leave
- Viewing leave requests
- Leave approval/rejection
- Leave status tracking

---

## ✅ Task Management

The task module allows users to work with tasks through:

- Task creation
- Task assignment
- Task status
- Task updates
- Task tracking

---

## 📄 Documents

WorkSphere supports PDF document uploads.

Frontend document functionality includes:

- PDF selection
- File upload
- Document listing
- Document access

The backend validates uploaded files and provides document URLs.

---

## 🔔 Notifications

The notification system provides:

- User-specific notifications
- Notification listing
- Read/unread status
- Mark notification as read

The frontend communicates with the notification APIs through the notification service.

---

## 📋 Audit Logs

The audit module provides administrators with visibility into important system activities.

Features include:

- Audit log listing
- Search
- Action filtering
- Resource filtering
- Pagination
- Activity details

---

## 🔎 Global Search

WorkSphere includes a global search feature that communicates with the backend search API and allows users to quickly find relevant application data.

---

## 🌐 Environment Configuration

Create a `.env` file in the frontend project root.

    VITE_API_BASE_URL=http://localhost:8080/api

> `.env` is excluded from Git and should not be committed to the repository.

---

## ▶️ Running the Project Locally

### 1. Clone the repository

    git clone https://github.com/Ashuyadav8177/worksphere-frontend.git

### 2. Navigate to the project

    cd worksphere-frontend

### 3. Install dependencies

    npm install

### 4. Configure environment variables

Create a `.env` file in the project root:

    VITE_API_BASE_URL=http://localhost:8080/api

### 5. Start the development server

    npm run dev

The frontend will normally be available at:

    http://localhost:5173

---

## 🔗 Backend

The WorkSphere frontend communicates with the Spring Boot backend through REST APIs.

Backend repository:

https://github.com/Ashuyadav8177/worksphere-backend

---

## 🔄 Application Flow

    User
      ↓
    React Frontend
      ↓
    React Router
      ↓
    Protected Routes
      ↓
    Axios API Services
      ↓
    JWT Authentication
      ↓
    Spring Boot REST API
      ↓
    Spring Security
      ↓
    Service Layer
      ↓
    Repository Layer
      ↓
    MySQL

---

## 📁 Important Frontend Modules

    Authentication
    Dashboard
    Employees
    Departments
    Attendance
    Leaves
    Tasks
    Documents
    Notifications
    Audit Logs
    Global Search

---

## 🎯 Project Status

WorkSphere frontend is functionally integrated with the backend and the major application modules have been implemented.

The project is currently focused on production-readiness, documentation, deployment preparation, and portfolio presentation.

---

## 🔮 Future Enhancements

Potential future improvements include:

- Production deployment
- Improved responsive design
- Advanced analytics
- Enhanced notification system
- More granular permissions
- Performance optimization
- Automated testing
- CI/CD integration

---

## 👨‍💻 Author

**Ashutosh Yadav**

B.Tech — Information Technology

Interested in:

- Full Stack Development
- Software Engineering
- Backend Development
- Java
- Spring Boot
- React

---

## 📌 Related Repository

**WorkSphere Backend**

https://github.com/Ashuyadav8177/worksphere-backend