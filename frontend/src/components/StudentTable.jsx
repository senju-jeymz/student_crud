import React, { useState } from 'react';
import { Edit2, Trash2, AlertTriangle, X, Check, BookOpen, Layers } from 'lucide-react';

export default function StudentTable({
  students,
  loading,
  editingStudentId,
  onEdit,
  onDelete,
  deletingId,
}) {
  // Store the student id currently undergoing inline delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (id) => {
    onDelete(id);
    setConfirmDeleteId(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded-sm w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">No students found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No records match your criteria or no students have been registered yet. Use the form to add one!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">ID</th>
              <th className="py-3.5 px-4 sm:px-6">Student Name</th>
              <th className="py-3.5 px-4 sm:px-6">Course</th>
              <th className="py-3.5 px-4 sm:px-6">Section</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => {
              const isEditing = editingStudentId === student.id;
              const isConfirming = confirmDeleteId === student.id;
              const isDeleting = deletingId === student.id;

              return (
                <tr
                  key={student.id}
                  className={`transition-colors ${
                    isEditing
                      ? 'bg-indigo-50/60 font-medium'
                      : isConfirming
                      ? 'bg-rose-50/40'
                      : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      #{student.id}
                    </span>
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {(student.firstname?.[0] || 'S').toUpperCase()}
                      </div>
                      <div>
                        <div className="text-slate-900 font-medium">
                          {student.lastname}, {student.firstname}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {student.firstname} {student.lastname}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      <BookOpen className="w-3 h-3" />
                      {student.course}
                    </span>
                  </td>

                  {/* Section */}
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      <Layers className="w-3 h-3 text-slate-400" />
                      {student.section}
                    </span>
                  </td>

                  {/* Actions (Inline Delete Confirmation - No Modals) */}
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap text-right">
                    {isConfirming ? (
                      <div className="inline-flex items-center gap-2 animate-in fade-in duration-200">
                        <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Delete?
                        </span>
                        <button
                          onClick={() => handleConfirmDelete(student.id)}
                          disabled={isDeleting}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          Confirm
                        </button>
                        <button
                          onClick={handleCancelDelete}
                          disabled={isDeleting}
                          className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => onEdit(student)}
                          title="Edit Student"
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student.id)}
                          title="Delete Student"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
