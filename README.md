# Student CRUD System (Spring Boot + Vite React)

A full-stack Student Management CRUD application featuring a **Spring Boot REST API** backend and a **Vite + React (JavaScript) + Tailwind CSS** frontend.

---

## Project Structure

```text
STUDENT-CRUD/
├── PLAN.md                 # Architecture plan and requirements tracking
├── README.md               # Quickstart guide
├── student/                # Spring Boot (Maven + PostgreSQL) Backend
│   ├── src/main/java/com/infante/student/
│   │   ├── Student.java
│   │   ├── StudentController.java
│   │   ├── StudentRepository.java
│   │   └── StudentApplication.java
│   └── src/main/resources/application.properties
└── student-frontend/       # Vite + React (JavaScript) + Tailwind CSS Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # App header & branding
    │   │   ├── StudentForm.jsx    # Non-modal Add/Edit card form
    │   │   ├── StudentTable.jsx   # Data table with inline delete confirmation
    │   │   ├── SearchBar.jsx      # Filter by name, course, or section
    │   │   └── Toast.jsx          # Notification alerts
    │   ├── services/
    │   │   └── studentService.js  # CRUD API fetch abstraction
    │   ├── App.jsx                # Layout & state management
    │   ├── index.css              # Tailwind CSS imports
    │   └── main.jsx
    ├── vite.config.js             # Dev server & API proxy (/infante -> port 8080)
    └── package.json
```

---

## Quickstart

### 1. Run the Spring Boot Backend

Ensure PostgreSQL is running and the database `db_student` exists (as configured in `student/src/main/resources/application.properties`).

Open a terminal and run:
```powershell
cd student
.\mvnw.cmd spring-boot:run
```
The backend starts at `http://localhost:8080`.

### 2. Run the Vite React Frontend

Open another terminal and run:
```powershell
cd student-frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## Features

- **No Modals**: Uses a clean, responsive split-view card form for Adding and Editing student records.
- **Inline Delete Confirmation**: Protects against accidental deletions directly within the table row (no popups).
- **Tailwind CSS Styling**: Modern, accessible UI with responsive layouts, focus rings, and status badges.
- **Real-Time Search & Filtering**: Instant filter across student names, courses, and sections.
- **Automatic Dev Proxy**: Vite dev server reverse-proxies `/infante` to `http://localhost:8080`, bypassing CORS issues seamlessly.
- **Toast Notifications**: Feedback for Create, Read, Update, and Delete actions.
