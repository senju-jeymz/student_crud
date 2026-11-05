import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, XCircle, RotateCcw, Loader2 } from 'lucide-react';

export default function StudentForm({
  editingStudent,
  onSave,
  onCancelEdit,
  isSubmitting,
  formRef,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [validationError, setValidationError] = useState('');

  // Sync state when entering or exiting edit mode
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setValidationError('');
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = {
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim(),
      section: formData.section.trim(),
    };

    if (!trimmed.firstname || !trimmed.lastname || !trimmed.course || !trimmed.section) {
      setValidationError('All fields are required.');
      return;
    }

    onSave(trimmed);
  };

  const handleReset = () => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
    }
    setValidationError('');
  };

  const isEditMode = Boolean(editingStudent);

  return (
    <div
      ref={formRef}
      className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
        isEditMode
          ? 'border-indigo-400 ring-2 ring-indigo-100 shadow-indigo-100/50'
          : 'border-slate-200'
      }`}
    >
      {/* Card Header */}
      <div
        className={`px-6 py-4 flex items-center justify-between border-b ${
          isEditMode
            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100'
            : 'bg-slate-50/70 border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isEditMode
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {isEditMode ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEditMode ? `Edit Student (#${editingStudent.id})` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode
                ? 'Update student details below'
                : 'Enter student information to enroll'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1 rounded-md hover:bg-white/80 transition-colors cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            Cancel
          </button>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {validationError && (
          <div className="p-3 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
            {validationError}
          </div>
        )}

        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g. Juan"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 disabled:opacity-60 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g. Dela Cruz"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 disabled:opacity-60 transition-all"
            />
          </div>
        </div>

        {/* Course & Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Course / Program <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g. BSCS, BSIT"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 disabled:opacity-60 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g. 3-A, 4-B"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 disabled:opacity-60 transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <div className="flex items-center gap-2">
            {isEditMode && (
              <button
                type="button"
                onClick={onCancelEdit}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-lg shadow-sm transition-all cursor-pointer ${
                isEditMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500'
              } disabled:opacity-50`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : isEditMode ? (
                'Update Student'
              ) : (
                'Save Student'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
