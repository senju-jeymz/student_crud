# Student Management CRUD Application — Project Plan & Context

## 1. Overview
This project is a modern, responsive Single Page Application (SPA) frontend built using **Vite + React (JavaScript)** and **Tailwind CSS** to interact with the existing Spring Boot Student REST API.

---

## 2. API Contract & Backend Context

### 2.1 Backend Details
- **Framework**: Spring Boot (Maven) with Spring Data JPA & PostgreSQL
- **Base Controller Path**: `/infante/students`
- **Default Port**: `8080` (`http://localhost:8080`)
- **Backend Directory**: `./student`

### 2.2 Data Model (`Student`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `Integer` | Auto-generated Primary Key |
| `firstname` | `String` | First name of the student |
| `lastname` | `String` | Last name of the student |
| `course` | `String` | Degree/Course program (e.g., BSCS, BSIT) |
| `section` | `String` | Class section (e.g., 3-A, 4-B) |

### 2.3 Endpoints
| HTTP Method | Endpoint | Request Body | Response (Success) | Response (Error) |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/infante/students` | None | `200 OK` (Array of students) | `500 Internal Error` |
| **GET** | `/infante/students/{id}` | None | `200 OK` (Student object) | `404 Not Found` |
| **POST** | `/infante/students` | `{"firstname", "lastname", "course", "section"}` | `201 Created` (Created student) | `400/500` |
| **PUT** | `/infante/students/{id}` | `{"firstname", "lastname", "course", "section"}` | `200 OK` (Updated student) | `404 Not Found` |
| **DELETE** | `/infante/students/{id}` | None | `200 OK` (Success message string) | `404 Not Found` |

---

## 3. UI/UX Design (Tailwind CSS, No Modals)

### 3.1 Non-Modal UI Layout
- **Two-Column / Split-View Dashboard (Responsive)**:
  - **Left / Top Panel — Student Form Card**:
    - Dedicated clean card for adding a new student or editing an existing student.
    - Dynamically switches title and actions:
      - *Add Mode*: "Add New Student" with "Create Student" button.
      - *Edit Mode*: "Edit Student #{id}" with "Update Student" and "Cancel Edit" buttons.
    - Responsive grid inputs styled with Tailwind CSS with validation feedback.
  - **Right / Main Panel — Students Directory**:
    - Header with search filter (by name, course, section) and student count badge.
    - Responsive Tailwind data table (or mobile cards).
    - Inline actions (Edit, Delete).
    - **Inline Delete Confirmation**: Instead of a pop-up modal, clicking "Delete" prompts an inline two-step confirmation (e.g. "Confirm Delete?" / "Cancel" buttons right in the table row/card) to prevent accidental deletions without popups.

### 3.2 Styling System
- **Framework**: Tailwind CSS (with `@tailwindcss/vite` or `postcss` + `autoprefixer`).
- **Icons**: `lucide-react` for clean iconography.
- **Color Palette**: Modern slate/indigo theme with high contrast, focus rings, and accessible states.

---

## 4. Proposed Directory Structure
```
STUDENT-CRUD/
├── PLAN.md                     # Saved context & updated project plan
├── student/                    # Existing Spring Boot backend
└── student-frontend/           # Vite + React (JS) + Tailwind Application
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # Header & branding
    │   │   ├── StudentForm.jsx    # Inline Card for Add & Edit (No modal)
    │   │   ├── StudentTable.jsx   # List with inline edit & delete actions
    │   │   ├── SearchBar.jsx      # Live search/filter bar
    │   │   └── Toast.jsx          # Inline / corner notification alerts
    │   ├── services/
    │   │   └── studentService.js  # API call abstraction layer
    │   ├── App.jsx                # Layout orchestration & state management
    │   ├── index.css              # Tailwind directives (@tailwind base/components/utilities)
    │   └── main.jsx               # React entry point
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── vite.config.js             # Dev server proxy configuration
```

---

## 5. Key Considerations & Solutions

### 5.1 CORS (Cross-Origin Resource Sharing)
- Backend controller does not specify `@CrossOrigin`.
- Configured Vite reverse proxy in `vite.config.js` forwarding `/infante` to `http://localhost:8080`.

### 5.2 Responsive & Accessible Non-Modal Design
- Side-by-side on desktop (`lg:grid-cols-3` or `lg:grid-cols-12`: form takes 4 cols, table takes 8 cols).
- Stacked on tablet/mobile (form on top, table below).
- Smooth scroll to form when user clicks "Edit" on a student.

---

## 6. Step-by-Step Implementation Roadmap (Status: COMPLETED)

1. **Phase 1: Project Initialization & Tailwind Setup** [COMPLETED]
   - Initialized Vite React (JavaScript) project (`student-frontend`).
   - Installed and configured Tailwind CSS (`@tailwindcss/vite` & `tailwindcss`) and `lucide-react`.
   - Setup Vite proxy for `/infante` -> `http://localhost:8080`.

2. **Phase 2: API Service Layer** [COMPLETED]
   - Created `src/services/studentService.js` with all 5 CRUD operations.

3. **Phase 3: Component Development (No Modals)** [COMPLETED]
   - `Navbar.jsx`: Header with branding, student count, and scroll-to-form action.
   - `StudentForm.jsx`: Responsive card form supporting Add and Edit modes (with cancel).
   - `StudentTable.jsx`: Clean Tailwind table with inline two-step delete confirmation (no popup modal).
   - `SearchBar.jsx`: Real-time filter input and course selector.
   - `Toast.jsx`: Auto-dismissing success/error toast alerts.

4. **Phase 4: State Management & Integration** [COMPLETED]
   - Wired components in `App.jsx` with full state management, error handling, and responsive split-view.

5. **Phase 5: Verification & Build** [COMPLETED]
   - Production build verified (`npm run build` completed cleanly in 194ms).

6. **Phase 6: Render.com Deployment Preparation** [COMPLETED]
   - Added environment variable support `VITE_API_BASE_URL` in `studentService.js`.
   - Created `render.yaml` blueprint configuration and `.env.example`.
   - Added `@CrossOrigin(origins = "*")` to `StudentController.java` to support cross-origin Render deployments.
   - Pushed updates and full deployment instructions to `https://github.com/senju-jeymz/student_crud` on branch `main`.
