import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

// TypeScript interfaces
interface ExamMark {
  subject: string;
  obtained: number | string;
  outOf: number | string;
}

interface Student {
  _id: string;
  name: string;
  standard: number;
  phone: string;
  address: string;
  examMarks?: ExamMark[];
}

interface Faculty {
  _id: string;
  name: string;
  standard: string;
  subjects: string;
  phone: string;
  address: string;
  age: number;
  email?: string;
}

const AdminPanel: React.FC = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    type: 'student' as 'student' | 'faculty',
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    standard: 1,
    examMarks: [{ subject: '', obtained: '', outOf: '' }] as ExamMark[],
    subjects: '',
    age: '',
  });
  const [selectedStandard, setSelectedStandard] = useState<number>(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandardFilter, setSelectedStandardFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'percentage'>('default');
  const [facultySearchQuery, setFacultySearchQuery] = useState('');
  const [facultyStandardFilter, setFacultyStandardFilter] = useState<string>('All');

  // Check localStorage for authentication on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      fetchFaculty();
      fetchStudents();
    }
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get<Faculty[]>('https://utc-admin-backend-seven.vercel.app/api/faculty');
      setFaculty(response.data);
    } catch (err: any) {
      console.error('Error fetching faculty:', err);
      setError(`Failed to fetch faculty: ${err.response?.data?.message || err.message}`);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get<Student[]>('https://utc-admin-backend-seven.vercel.app/api/students');
      setStudents(response.data);
    } catch (err: any) {
      console.error('Error fetching students:', err);
      setError(`Failed to fetch students: ${err.response?.data?.message || err.message}`);
    }
  };

  // Handle password submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = 'admin123';
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setError('');
      fetchFaculty();
      fetchStudents();
    } else {
      setError('Incorrect password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setPassword('');
    setError('');
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle standard selection for students
  const handleStandardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStandard(parseInt(e.target.value));
    setFormData({ ...formData, standard: parseInt(e.target.value) });
  };

  // Handle exam marks changes
  const handleExamMarkChange = (index: number, field: keyof ExamMark, value: string) => {
    const updatedMarks = [...formData.examMarks];
    updatedMarks[index] = { ...updatedMarks[index], [field]: value };
    setFormData({ ...formData, examMarks: updatedMarks });
  };

  // Add new exam mark entry
  const addExamMark = () => {
    setFormData({ ...formData, examMarks: [...formData.examMarks, { subject: '', obtained: '', outOf: '' }] });
  };

  // Remove exam mark entry
  const removeExamMark = (index: number) => {
    setFormData({ ...formData, examMarks: formData.examMarks.filter((_, i) => i !== index) });
  };

  // Handle form submission with confirmation for updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.id) {
      const confirmAction = window.confirm(`Are you sure you want to update this ${formData.type}?`);
      if (!confirmAction) return;
    }

    const url = formData.type === 'student' 
      ? formData.id 
        ? `https://utc-admin-backend-seven.vercel.app/api/students/${formData.id}`
        : 'https://utc-admin-backend-seven.vercel.app/api/students'
      : formData.id 
        ? `https://utc-admin-backend-seven.vercel.app/api/faculty/${formData.id}`
        : 'https://utc-admin-backend-seven.vercel.app/api/faculty';

    const data = formData.type === 'student' 
      ? { 
          name: formData.name, 
          standard: formData.standard, 
          phone: formData.phone, 
          address: formData.address, 
          examMarks: formData.examMarks
            .filter(mark => mark.subject && mark.obtained && mark.outOf)
            .map(mark => ({
              subject: mark.subject,
              obtained: parseFloat(mark.obtained as string) || 0,
              outOf: parseFloat(mark.outOf as string) || 0,
            }))
        }
      : { 
          name: formData.name, 
          standard: formData.standard.toString(), 
          subjects: formData.subjects, 
          phone: formData.phone, 
          address: formData.address, 
          age: parseInt(formData.age), 
          email: formData.email || undefined 
        };

    try {
      if (formData.id) {
        await axios.put(url, data);
      } else {
        await axios.post(url, data);
      }
      formData.type === 'student' ? fetchStudents() : fetchFaculty();
      resetForm();
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.message || 'Failed to save data');
    }
  };

  // Handle edit without confirmation
  const handleEdit = (item: Student | Faculty, type: 'student' | 'faculty') => {
    const standardValue = type === 'student' 
      ? (item as Student).standard 
      : parseInt((item as Faculty).standard.split(',')[0]) || 1;

    setFormData({
      type,
      id: item._id,
      name: item.name,
      email: (item as Faculty).email || '',
      phone: item.phone,
      address: item.address,
      standard: standardValue,
      examMarks: (item as Student).examMarks?.length > 0 
        ? (item as Student).examMarks 
        : [{ subject: '', obtained: '', outOf: '' }],
      subjects: (item as Faculty).subjects || '',
      age: (item as Faculty).age?.toString() || '',
    });
    if (type === 'student') setSelectedStandard(standardValue);
    setError('');
  };

  // Handle delete with confirmation
  const handleDelete = async (id: string, type: 'student' | 'faculty') => {
    const confirmAction = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmAction) return;

    const url = type === 'student' 
      ? `https://utc-admin-backend-seven.vercel.app/api/students/${id}`
      : `https://utc-admin-backend-seven.vercel.app/api/faculty/${id}`;
    try {
      await axios.delete(url);
      type === 'student' ? fetchStudents() : fetchFaculty();
      setError('');
    } catch (err: any) {
      console.error('Error deleting:', err);
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      type: 'student',
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      standard: 1,
      examMarks: [{ subject: '', obtained: '', outOf: '' }],
      subjects: '',
      age: '',
    });
    setSelectedStandard(1);
    setError('');
  };

  // Calculate percentage as a number for sorting
  const calculatePercentage = (examMarks: ExamMark[] | undefined): number => {
    if (!examMarks || examMarks.length === 0) return 0;
    const totalObtained = examMarks.reduce((sum, mark) => {
      const obtained = typeof mark.obtained === 'string' ? parseFloat(mark.obtained) || 0 : mark.obtained || 0;
      return sum + obtained;
    }, 0);
    const totalOutOf = examMarks.reduce((sum, mark) => {
      const outOf = typeof mark.outOf === 'string' ? parseFloat(mark.outOf) || 0 : mark.outOf || 0;
      return sum + outOf;
    }, 0);
    return totalOutOf > 0 ? (totalObtained / totalOutOf) * 100 : 0;
  };

  // Filter students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStandard = selectedStandardFilter === 'All' || student.standard === parseInt(selectedStandardFilter);
      return matchesSearch && matchesStandard;
    })
    .sort((a, b) => {
      if (sortBy === 'percentage') {
        return calculatePercentage(b.examMarks) - calculatePercentage(a.examMarks);
      }
      return 0; // Default: no sorting
    });

  // Filter faculty
  const filteredFaculty = faculty.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(facultySearchQuery.toLowerCase());
    const matchesStandard = facultyStandardFilter === 'All' || faculty.standard.includes(facultyStandardFilter);
    return matchesSearch && matchesStandard;
  });

  // Prepare CSV data for students
  const studentCsvData = filteredStudents.map(student => ({
    Name: student.name,
    Standard: student.standard,
    Phone: student.phone,
    Address: student.address,
    Marks: student.examMarks?.map(mark => `${mark.subject}: ${mark.obtained}/${mark.outOf}`).join('; ') || '',
    Percentage: `${calculatePercentage(student.examMarks).toFixed(2)}%`
  }));

  // Prepare CSV data for faculty
  const facultyCsvData = filteredFaculty.map(faculty => ({
    Name: faculty.name,
    Email: faculty.email || '',
    Phone: faculty.phone,
    Standards: faculty.standard,
    Subjects: faculty.subjects,
    Address: faculty.address,
    Age: faculty.age
  }));

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-muted/30 dark:bg-gray-900">
        <div className="p-4 bg-background dark:bg-gray-800 rounded-lg shadow-md w-full max-w-xs xs:max-w-sm sm:max-w-md">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary dark:text-primary mb-3 text-center">Admin Login</h2>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {error && <p className="text-destructive dark:text-red-400 text-xs xs:text-sm mt-1">{error}</p>}
          </div>
          <button
            onClick={handleLogin}
            className="bg-primary text-primary-foreground p-2 rounded w-full text-sm xs:text-base hover:bg-primary/90 dark:hover:bg-primary/80"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Render admin panel if authenticated
  return (
    <div className="container mx-auto p-2 xs:p-3 sm:p-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary dark:text-primary">Unique Tuition Classes Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-destructive text-primary-foreground px-3 py-2 rounded text-sm xs:text-base hover:bg-destructive/90 dark:hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      {/* Form */}
      <div className="mb-4 xs:mb-6 sm:mb-8 p-2 xs:p-3 sm:p-4 bg-background dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-primary dark:text-primary mb-2">
          {formData.id ? 'Edit' : 'Add'} {formData.type === 'student' ? 'Student' : 'Faculty'}
        </h2>
        {error && <p className="text-destructive dark:text-red-400 text-xs xs:text-sm mb-2">{error}</p>}
        <div className="mb-3">
          <label className="mr-2 text-sm xs:text-base text-muted-foreground dark:text-gray-300">Type:</label>
          <select 
            value={formData.type} 
            onChange={handleInputChange}
            name="type"
            className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-2 xs:gap-3 sm:grid-cols-2 sm:gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          {formData.type === 'student' ? (
            <>
              <select
                value={selectedStandard}
                onChange={handleStandardChange}
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[...Array(12).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <div className="col-span-1 sm:col-span-2">
                <label className="text-sm xs:text-base text-muted-foreground dark:text-gray-300">Exam Marks</label>
                {formData.examMarks.map((mark, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 xs:gap-3 mb-2 xs:mb-3">
                    <input
                      type="text"
                      value={mark.subject}
                      onChange={(e) => handleExamMarkChange(index, 'subject', e.target.value)}
                      placeholder="Subject"
                      className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="number"
                      value={mark.obtained}
                      onChange={(e) => handleExamMarkChange(index, 'obtained', e.target.value)}
                      placeholder="Obtained"
                      className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="number"
                      value={mark.outOf}
                      onChange={(e) => handleExamMarkChange(index, 'outOf', e.target.value)}
                      placeholder="Out Of"
                      className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {formData.examMarks.length > 1 && (
                      <button
                        onClick={() => removeExamMark(index)}
                        className="bg-destructive text-primary-foreground px-3 py-2 rounded text-sm xs:text-base hover:bg-destructive/90 dark:hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addExamMark}
                  className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm xs:text-base hover:bg-primary/90 dark:hover:bg-primary/80"
                >
                  Add Exam Mark
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email (optional)"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="standard"
                value={formData.standard}
                onChange={handleInputChange}
                placeholder="Standards (e.g., 1,2,3)"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                placeholder="Subjects (e.g., Mathematics,Physics)"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </>
          )}
        </div>
        <div className="mt-3 xs:mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm xs:text-base hover:bg-primary/90 dark:hover:bg-primary/80"
          >
            {formData.id ? 'Update' : 'Add'}
          </button>
          <button
            onClick={resetForm}
            className="bg-muted text-muted-foreground px-3 py-2 rounded text-sm xs:text-base hover:bg-muted/90 dark:hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="mb-4 xs:mb-6 sm:mb-8">
        <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-primary dark:text-primary mb-2 xs:mb-3">Faculty List</h2>
        <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 mb-3 xs:mb-4">
          <input
            type="text"
            value={facultySearchQuery}
            onChange={(e) => setFacultySearchQuery(e.target.value)}
            placeholder="Search by faculty name"
            className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={facultyStandardFilter}
            onChange={(e) => setFacultyStandardFilter(e.target.value)}
            className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full sm:w-40 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Standards</option>
            {[...Array(12).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <CSVLink
            data={facultyCsvData}
            filename={`faculty_data_${new Date().toISOString().split('T')[0]}.csv`}
            className="bg-green-500 text-primary-foreground px-3 py-2 rounded text-sm xs:text-base hover:bg-green-600 dark:hover:bg-green-400 text-center"
          >
            Download Faculty CSV
          </CSVLink>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-muted-foreground/50 dark:border-gray-600 text-xs xs:text-sm sm:text-base">
            <thead>
              <tr className="bg-muted/30 dark:bg-gray-700">
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Name</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Email</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary sm:hidden">Details</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-primary dark:text-primary">Phone</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-primary dark:text-primary">Standards</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-primary dark:text-primary">Subjects</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-primary dark:text-primary">Address</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-primary dark:text-primary">Age</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map(f => (
                <tr key={f._id} className="bg-background dark:bg-gray-800">
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200">{f.name}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200">{f.email || '-'}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200 sm:hidden">
                    <div>Phone: {f.phone}</div>
                    <div>Std: {f.standard}</div>
                    <div>Sub: {f.subjects}</div>
                    <div>Addr: {f.address}</div>
                    <div>Age: {f.age}</div>
                  </td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-foreground dark:text-gray-200">{f.phone}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-foreground dark:text-gray-200">{f.standard}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-foreground dark:text-gray-200">{f.subjects}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-foreground dark:text-gray-200">{f.address}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-foreground dark:text-gray-200">{f.age}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 flex flex-col xs:flex-row space-y-1 xs:space-y-0 xs:space-x-2">
                    <button
                      onClick={() => handleEdit(f, 'faculty')}
                      className="bg-yellow-500 text-primary-foreground px-2 py-1 rounded text-xs xs:text-sm hover:bg-yellow-600 dark:hover:bg-yellow-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f._id, 'faculty')}
                      className="bg-destructive text-primary-foreground px-2 py-1 rounded text-xs xs:text-sm hover:bg-destructive/90 dark:hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Table with Search, Filter, and Sort */}
      <div>
        <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-primary dark:text-primary mb-2 xs:mb-3">Student List</h2>
        <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 mb-3 xs:mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name"
            className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={selectedStandardFilter}
            onChange={(e) => setSelectedStandardFilter(e.target.value)}
            className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full sm:w-40 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Standards</option>
            {[...Array(12).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'default' | 'percentage')}
            className="border border-muted-foreground/50 dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 p-2 rounded w-full sm:w-40 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="default">Sort: Default</option>
            <option value="percentage">Sort: Best Students (Percentage)</option>
          </select>
          <CSVLink
            data={studentCsvData}
            filename={`student_data_${new Date().toISOString().split('T')[0]}.csv`}
            className="bg-green-500 text-primary-foreground px-3 py-2 rounded text-sm xs:text-base hover:bg-green-600 dark:hover:bg-green-400 text-center"
          >
            Download Student CSV
          </CSVLink>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-muted-foreground/50 dark:border-gray-600 text-xs xs:text-sm sm:text-base">
            <thead>
              <tr className="bg-muted/30 dark:bg-gray-700">
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Name</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Standard</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary sm:hidden">Details</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-primary dark:text-primary">Phone</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-primary dark:text-primary">Address</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Exam Marks</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Percentage</th>
                <th className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-primary dark:text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(s => (
                <tr key={s._id} className="bg-background dark:bg-gray-800">
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200">{s.name}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200">{s.standard}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200 sm:hidden">
                    <div>Phone: {s.phone}</div>
                    <div>Addr: {s.address}</div>
                    <div>Marks: {s.examMarks?.map((mark, index) => (
                      <div key={index}>{mark.subject}: {mark.obtained}/{mark.outOf}</div>
                    ))}</div>
                    <div>Percentage: {calculatePercentage(s.examMarks).toFixed(2)}%</div>
                  </td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-foreground dark:text-gray-200">{s.phone}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 hidden sm:table-cell text-foreground dark:text-gray-200">{s.address}</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200">
                    {s.examMarks?.map((mark, index) => (
                      <div key={index}>{mark.subject}: {mark.obtained}/{mark.outOf}</div>
                    ))}
                  </td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 text-foreground dark:text-gray-200">{calculatePercentage(s.examMarks).toFixed(2)}%</td>
                  <td className="border border-muted-foreground/50 dark:border-gray-600 p-1 xs:p-2 flex flex-col xs:flex-row space-y-1 xs:space-y-0 xs:space-x-2">
                    <button
                      onClick={() => handleEdit(s, 'student')}
                      className="bg-yellow-500 text-primary-foreground px-2 py-1 rounded text-xs xs:text-sm hover:bg-yellow-600 dark:hover:bg-yellow-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id, 'student')}
                      className="bg-destructive text-primary-foreground px-2 py-1 rounded text-xs xs:text-sm hover:bg-destructive/90 dark:hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;