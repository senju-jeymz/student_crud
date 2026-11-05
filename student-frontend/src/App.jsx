import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import { studentService } from './services/studentService';
import { RefreshCw, AlertCircle, Database, Sparkles } from 'lucide-react';

const INITIAL_DEMO_STUDENTS = [
  { id: 101, firstname: 'Maria', lastname: 'Santos', course: 'BSCS', section: '3-A' },
  { id: 102, firstname: 'Juan', lastname: 'Dela Cruz', course: 'BSIT', section: '4-B' },
  { id: 103, firstname: 'Angela', lastname: 'Reyes', course: 'BSIS', section: '2-A' },
  { id: 104, firstname: 'Carlos', lastname: 'Mendoza', course: 'BSCS', section: '3-B' },
];

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Form reference for smooth scrolling when "Edit" is clicked
  const formRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load students from backend
  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    setIsDemoMode(false);
    try {
      const data = await studentService.getAll();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load students:', err);
      setError(err.message || 'Unable to connect to the Student API backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnableDemoMode = () => {
    setIsDemoMode(true);
    setError(null);
    setStudents(INITIAL_DEMO_STUDENTS);
    showToast('Switched to Interactive Demo Mode (in-memory).', 'info');
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Compute distinct courses for filter dropdown
  const uniqueCourses = useMemo(() => {
    const list = students.map((s) => s.course).filter(Boolean);
    return Array.from(new Set(list)).sort();
  }, [students]);

  // Client-side search and filtering
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (student.firstname && student.firstname.toLowerCase().includes(query)) ||
        (student.lastname && student.lastname.toLowerCase().includes(query)) ||
        (student.course && student.course.toLowerCase().includes(query)) ||
        (student.section && student.section.toLowerCase().includes(query)) ||
        String(student.id).includes(query);

      const matchesCourse =
        !selectedCourse ||
        (student.course && student.course.toLowerCase() === selectedCourse.toLowerCase());

      return matchesSearch && matchesCourse;
    });
  }, [students, searchQuery, selectedCourse]);

  // Create or Update student handler
  const handleSaveStudent = async (studentData) => {
    setIsSubmitting(true);
    try {
      if (isDemoMode) {
        if (editingStudent) {
          const updated = { ...editingStudent, ...studentData };
          setStudents((prev) =>
            prev.map((s) => (s.id === editingStudent.id ? updated : s))
          );
          showToast(`Student "${updated.firstname} ${updated.lastname}" updated!`, 'success');
          setEditingStudent(null);
        } else {
          const newId =
            students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 101;
          const created = { id: newId, ...studentData };
          setStudents((prev) => [...prev, created]);
          showToast(`Student "${created.firstname} ${created.lastname}" added!`, 'success');
        }
        return;
      }

      if (editingStudent) {
        // Live API Update
        const updated = await studentService.update(editingStudent.id, studentData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showToast(
          `Student "${updated.firstname} ${updated.lastname}" updated successfully!`,
          'success'
        );
        setEditingStudent(null);
      } else {
        // Live API Create
        const created = await studentService.create(studentData);
        setStudents((prev) => [...prev, created]);
        showToast(
          `Student "${created.firstname} ${created.lastname}" registered successfully!`,
          'success'
        );
      }
    } catch (err) {
      console.error('Save failed:', err);
      showToast(err.message || 'Failed to save student record.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete student handler
  const handleDeleteStudent = async (id) => {
    setDeletingId(id);
    try {
      if (isDemoMode) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        if (editingStudent?.id === id) {
          setEditingStudent(null);
        }
        showToast(`Student #${id} deleted (demo mode).`, 'info');
        return;
      }

      await studentService.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent?.id === id) {
        setEditingStudent(null);
      }
      showToast(`Student #${id} deleted successfully.`, 'info');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast(err.message || `Failed to delete student #${id}`, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Trigger Edit Mode
  const handleStartEdit = (student) => {
    setEditingStudent(student);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleScrollToForm = () => {
    setEditingStudent(null);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Navigation Header */}
      <Navbar
        studentCount={students.length}
        onScrollToForm={handleScrollToForm}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Mode Banner */}
        {isDemoMode && (
          <div className="mb-6 p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wide bg-purple-200 text-purple-900 px-2 py-0.5 rounded-sm mr-2">
                  Demo Mode
                </span>
                <span className="text-xs text-purple-800">
                  Running in-memory. All CRUD operations (Create, Read, Update, Delete) are fully functional.
                </span>
              </div>
            </div>
            <button
              onClick={loadStudents}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-purple-300 hover:bg-purple-100 text-purple-900 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Connect Live API
            </button>
          </div>
        )}

        {/* Backend Error Banner if connection fails */}
        {error && !isDemoMode && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">API Backend Unreachable</h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  The Spring Boot API at <code className="font-mono bg-amber-100 px-1 py-0.5 rounded-sm">{import.meta.env.VITE_API_BASE_URL || '/infante/students'}</code> is currently offline or connecting from localhost.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={handleEnableDemoMode}
                className="px-3 py-1.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Use Demo Mode
              </button>
              <button
                onClick={loadStudents}
                className="px-3 py-1.5 text-xs font-semibold bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Responsive Two-Column Non-Modal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Non-Modal Student Form (Add / Edit) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <StudentForm
              formRef={formRef}
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />

            {/* Quick Helper Tips */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 shadow-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-700 mb-1.5">
                <Database className="w-4 h-4 text-indigo-500" />
                <span>Backend API Guide</span>
              </div>
              <p>
                Requests are routed to <code className="bg-slate-100 text-indigo-600 px-1 py-0.5 rounded-sm">/infante/students</code>. The primary key ID is auto-assigned by PostgreSQL/JPA.
              </p>
            </div>
          </div>

          {/* Right Column: Search & Student Directory Table */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {/* Search & Filter Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={uniqueCourses}
              onClear={() => {
                setSearchQuery('');
                setSelectedCourse('');
              }}
            />

            {/* Table Header Details */}
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Showing{' '}
                <span className="text-slate-800 font-bold">
                  {filteredStudents.length}
                </span>{' '}
                of {students.length} Student{students.length !== 1 ? 's' : ''}
              </div>

              <button
                onClick={loadStudents}
                disabled={loading}
                title="Refresh list"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Student Directory Table (with Inline Delete Confirmation) */}
            <StudentTable
              students={filteredStudents}
              loading={loading}
              editingStudentId={editingStudent?.id}
              onEdit={handleStartEdit}
              onDelete={handleDeleteStudent}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
