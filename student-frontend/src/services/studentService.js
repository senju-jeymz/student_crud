const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const API_BASE = `${BASE_URL}/infante/students`;

export const studentService = {
  // Fetch all students
  async getAll() {
    const res = await fetch(API_BASE);
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || `Failed to fetch students (status ${res.status})`);
    }
    return res.json();
  },

  // Fetch a single student by id
  async getById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || `Failed to fetch student with ID ${id}`);
    }
    return res.json();
  },

  // Create a new student
  async create(studentData) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || `Failed to create student (status ${res.status})`);
    }
    return res.json();
  },

  // Update an existing student
  async update(id, studentData) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || `Failed to update student with ID ${id}`);
    }
    return res.json();
  },

  // Delete a student
  async delete(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || `Failed to delete student with ID ${id}`);
    }
    return res.text();
  },
};
