import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

export default function Navbar({ studentCount, onScrollToForm }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Student Portal</h1>
              <p className="text-xs text-slate-500">Spring Boot REST API &bull; Vite React CRUD</p>
            </div>
          </div>

          {/* Right badges & action */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Total: <strong className="text-slate-900">{studentCount}</strong></span>
            </div>

            <button
              onClick={onScrollToForm}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              + New Student
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
