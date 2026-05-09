import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../context/StudyGuide";

const courseData = {
  BCA: {
    label: "BCA",
    full: "Bachelor of Computer Applications",
    color: "from-violet-600 to-indigo-600",
    semesters: {
      1: ["Computer Fundamental", "Programming Principle & Algorithm", "Principle of Management", "Business Communication", "Mathematics-1"],
      2: ["C Programming", "Digital Electronics", "Organization Behaviour", "Financial Accounting", "Mathematics-2"],
      3: ["Object Oriented Programming Using C++", "Data Structure Using C", "Computer Architecture & Assembly Language", "Business Economics", "Elements of Statistics"],
      4: ["Computer Graphics", "Operating System", "Software Engineering", "Optimization Techniques", "Graph Theory"],
      5: ["Introduction to DBMS", "Java Programming", "Computer Network", "Software Project Management"],
      6: ["Computer Network Security", "Information System", "E-commerce", "Knowledge Management"],
    },
  },
  MCA: {
    label: "MCA",
    full: "Master of Computer Applications",
    color: "from-cyan-500 to-teal-600",
    semesters: {
      1: ["Discrete Mathematics", "Computer Organization", "Programming in C", "Communication Skills", "IT Workshop"],
      2: ["Data Structures", "Database Management", "Operating Systems", "Object Oriented Programming", "Numerical Methods"],
      3: ["Advanced Java", "Software Engineering", "Computer Networks", "Web Technologies", "Elective-I"],
      4: ["Machine Learning", "Cloud Computing", "Cyber Security", "Mobile Application Development", "Elective-II"],
      5: ["Artificial Intelligence", "Big Data Analytics", "Internet of Things", "Project Work", "Seminar"],
      6: ["Advanced Database Systems", "Distributed Computing", "Research Methodology", "Major Project", "Viva Voce"],
    },
  },
  "B.COM": {
    label: "B.COM",
    full: "Bachelor of Commerce",
    color: "from-amber-500 to-orange-600",
    semesters: {
      1: ["Financial Accounting", "Business Economics", "Business Communication", "Business Mathematics", "Environmental Studies"],
      2: ["Advanced Accounting", "Business Law", "Statistics for Business", "Computer Applications", "Banking & Finance"],
      3: ["Corporate Accounting", "Income Tax Law", "Cost Accounting", "Business Organisation", "Auditing"],
      4: ["Management Accounting", "Indirect Taxation", "Business Ethics", "Entrepreneurship", "E-Commerce"],
      5: ["Financial Management", "Marketing Management", "Human Resource Management", "Research Methodology", "Elective-I"],
      6: ["Strategic Management", "International Business", "Project Work", "Elective-II", "Viva Voce"],
    },
  },
  BBA: {
    label: "BBA",
    full: "Bachelor of Business Administration",
    color: "from-rose-500 to-pink-600",
    semesters: {
      1: ["Principles of Management", "Business Communication", "Business Economics", "Financial Accounting", "Computer Fundamentals"],
      2: ["Organizational Behaviour", "Business Mathematics", "Marketing Management", "Financial Management", "Business Law"],
      3: ["Human Resource Management", "Operations Management", "Cost & Management Accounting", "Business Statistics", "Entrepreneurship"],
      4: ["Strategic Management", "Research Methodology", "International Business", "Consumer Behaviour", "Elective-I"],
      5: ["Project Management", "Business Ethics", "E-Commerce", "Supply Chain Management", "Elective-II"],
      6: ["Corporate Governance", "Leadership & Change Management", "Industry Project", "Elective-III", "Viva Voce"],
    },
  },
};

// Build a flat search index from courseData
const buildSearchIndex = () => {
  const results = [];
  Object.entries(courseData).forEach(([courseKey, courseVal]) => {
    Object.entries(courseVal.semesters).forEach(([sem, subjects]) => {
      subjects.forEach((subject) => {
        results.push({
          courseKey,
          courseLabel: courseVal.label,
          courseFull: courseVal.full,
          color: courseVal.color,
          sem: Number(sem),
          subject,
        });
      });
    });
  });
  return results;
};

const searchIndex = buildSearchIndex();

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  console.log(searchQuery)
  const navigate = useNavigate();
  const { setUserContentUrl } = useContext(userAuth);

  const course = selectedCourse ? courseData[selectedCourse] : null;
  const subjects = course && selectedSem ? course.semesters[selectedSem] : null;

  // Search logic
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const filtered = searchIndex.filter(
      (item) =>
        item.subject.toLowerCase().includes(q) ||
        item.courseLabel.toLowerCase().includes(q) ||
        item.courseFull.toLowerCase().includes(q)
    );
    setSearchResults(filtered.slice(0, 8));
    setShowDropdown(true);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchSelect = (item) => {
    setSelectedCourse(item.courseKey);
    setSelectedSem(item.sem);
    setSelectedSubject(item.subject);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleCourseSelect = (key) => {
    setSelectedCourse(key);
    setSelectedSem(null);
    setSelectedSubject(null);
  };

  const handleSemSelect = (sem) => {
    setSelectedSem(sem);
    setSelectedSubject(null);
  };

  const token = sessionStorage.getItem("token");

  const fetchUserContent = async (subjectName) => {
    try {
      if (!token || !subjectName) return;
      const res = await axios.get("http://localhost:3000/api/auth/user/get-data", {
        params: { subjectName },
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res?.data?.data;
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setUserContentUrl([]);
        return;
      }
      setUserContentUrl(data);
    } catch (error) {
      console.error("Error fetching user content:", error);
      setUserContentUrl([]);
    }
  };

  useEffect(() => {
    if (selectedSubject) {
      fetchUserContent(selectedSubject);
    }
  }, [selectedSubject]);

  const renderRight = () => {
    if (selectedSubject && course) {
      return (
        <div className="h-full flex flex-col">
          <div className={`bg-gradient-to-r ${course.color} px-8 py-6`}>
            <p className="text-xs font-bold tracking-widest uppercase text-white/70 mb-1">
              {selectedCourse} · Semester {selectedSem}
            </p>
            <h2 className="text-2xl font-extrabold text-white leading-snug">{selectedSubject}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
            <button
              onClick={() => navigate("/content")}
              className={`w-full bg-gradient-to-r ${course.color} text-white font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity mt-2`}
            >
              View Study Materials →
            </button>
          </div>
        </div>
      );
    }

    if (subjects && course) {
      return (
        <div className="h-full flex flex-col">
          <div className={`bg-gradient-to-r ${course.color} px-8 py-6`}>
            <p className="text-xs font-bold tracking-widest uppercase text-white/70 mb-1">Semester {selectedSem}</p>
            <h2 className="text-2xl font-extrabold text-white">{subjects.length} Subjects</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Click a subject for details</p>
            <div className="space-y-2">
              {subjects.map((sub, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSubject(sub)}
                  className={`w-full text-left flex items-center justify-between rounded-xl px-5 py-3.5 text-sm font-medium border transition-all duration-200 group ${
                    selectedSubject === sub
                      ? `bg-gradient-to-r ${course.color} border-transparent text-white shadow-md`
                      : "bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        selectedSubject === sub ? "bg-white" : `bg-gradient-to-br ${course.color}`
                      }`}
                    />
                    {sub}
                  </span>
                  <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (course && !selectedSem) {
      return (
        <div className="h-full flex flex-col">
          <div className={`bg-gradient-to-r ${course.color} px-8 py-6`}>
            <p className="text-xs font-bold tracking-widest uppercase text-white/70 mb-1">Course</p>
            <h2 className="text-2xl font-extrabold text-white">{course.full}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Select a Semester</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <button
                  key={sem}
                  onClick={() => handleSemSelect(sem)}
                  className="py-6 rounded-xl text-sm font-bold border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-800 transition-all duration-200 hover:scale-[1.02] shadow-sm"
                >
                  <div className="text-2xl mb-1">📅</div>
                  Semester {sem}
                  <div className="text-xs text-gray-400 mt-1 font-normal">
                    {Object.values(course.semesters)[sem - 1]?.length} subjects
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-10 bg-white">
        <div className="text-6xl mb-5 opacity-20">🎓</div>
        <h2 className="text-xl font-bold text-gray-400 mb-2">Select a course to begin</h2>
        <p className="text-gray-400 text-sm">Choose a course from the left panel to explore semesters and subjects.</p>
      </div>
    );
  };

  // Highlight matching text in search results
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-100 text-yellow-800 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div className="h-screen bg-white text-gray-900 font-sans flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-gray-200 bg-white z-20">
        {/* Logo */}
        <div className="mt-20 flex items-center gap-3 w-48">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-sm">🎓</div>
          <span className="font-extrabold text-sm tracking-wide text-gray-900">Course Navigator</span>
        </div>

        {/* Breadcrumb — center */}
        <div className=" mt-20 flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
          <span
            className={`cursor-pointer hover:text-gray-900 transition-colors ${!selectedCourse ? "text-gray-900 font-bold" : ""}`}
            onClick={() => { setSelectedCourse(null); setSelectedSem(null); setSelectedSubject(null); }}
          >
            All Courses
          </span>
          {selectedCourse && (
            <>
              <span className="text-gray-300">/</span>
              <span
                className={`cursor-pointer hover:text-gray-900 transition-colors ${selectedCourse && !selectedSem ? "text-gray-900 font-bold" : ""}`}
                onClick={() => { setSelectedSem(null); setSelectedSubject(null); }}
              >
                {selectedCourse}
              </span>
            </>
          )}
          {selectedSem && (
            <>
              <span className="text-gray-300">/</span>
              <span
                className={`cursor-pointer hover:text-gray-900 transition-colors ${selectedSem && !selectedSubject ? "text-gray-900 font-bold" : ""}`}
                onClick={() => setSelectedSubject(null)}
              >
                Sem {selectedSem}
              </span>
            </>
          )}
          {selectedSubject && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-bold truncate max-w-[140px]">{selectedSubject}</span>
            </>
          )}
        </div>

        {/* Search Bar — right corner */}
        <div className=" mt-20 relative" ref={searchRef}>
          <div className="relative w-56">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowDropdown(true)}
              placeholder="Search subjects..."
              className=" w-full pl-8 pr-8 py-2 text-xs rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all placeholder-gray-400"
            />

            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setShowDropdown(false); }}
                className="absolute inset-y-0 right-2.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Dropdown Results — opens to the left so it doesn't overflow */}
          {showDropdown && (
            <div className="absolute top-full mt-2 right-0 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
              {searchResults.length === 0 ? (
                <div className="px-4 py-5 text-center text-sm text-gray-400">
                  <div className="text-xl mb-1">🔍</div>
                  No results for "<span className="font-medium text-gray-600">{searchQuery}</span>"
                </div>
              ) : (
                <>
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Results</span>
                    <span className="text-xs text-gray-400">{searchResults.length} found</span>
                  </div>
                  <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                    {searchResults.map((item, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handleSearchSelect(item)}
                          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors group"
                        >
                          <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${item.color} flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-800 truncate">
                              {highlightMatch(item.subject, searchQuery)}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {item.courseLabel} · Semester {item.sem}
                            </div>
                          </div>
                          <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="m-10 w-64 shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="p-4">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 px-1">Courses</p>
            <div className="space-y-1.5">
              {Object.entries(courseData).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => handleCourseSelect(key)}
                  className={`w-full text-left flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 group ${
                    selectedCourse === key
                      ? `bg-gradient-to-r ${val.color} text-white shadow-md`
                      : "hover:bg-white text-gray-600 hover:text-gray-900 border border-transparent hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{val.label}</div>
                    <div className={`text-xs truncate ${selectedCourse === key ? "text-white/70" : "text-gray-400"}`}>{val.full}</div>
                  </div>
                  <svg className={`w-4 h-4 flex-shrink-0 ${selectedCourse === key ? "text-white/70" : "text-gray-300 group-hover:text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {course && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 px-1">Semesters</p>
              <div className="space-y-1">
                {[1, 2, 3, 4, 5, 6].map((sem) => (
                  <button
                    key={sem}
                    onClick={() => handleSemSelect(sem)}
                    className={`w-full text-left flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                      selectedSem === sem
                        ? `bg-gradient-to-r ${course.color} text-white font-bold shadow-md`
                        : "hover:bg-white text-gray-600 hover:text-gray-900 font-medium border border-transparent hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <span>Semester {sem}</span>
                    <span className={`text-xs ${selectedSem === sem ? "text-white/70" : "text-gray-400"}`}>
                      {course.semesters[sem].length} sub
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 overflow-hidden bg-white flex flex-col">{renderRight()}</div>
      </div>
    </div>
  );
}