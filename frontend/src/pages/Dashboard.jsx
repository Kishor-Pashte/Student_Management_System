import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");

  const navigate = useNavigate();

  const BACKEND_URL = "https://student-management-system-yhqs.onrender.com/";

  const token = localStorage.getItem("token");
  const fetchStudents = async () => {
    const res = await axios.get(`${BACKEND_URL}api/students`, {
      headers: { Authorization: token },
    });
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!name || !rollNo || !course) {
      alert("All fields are required");
      return;
    }
    await axios.post(
      `${BACKEND_URL}api/students`,
      { name, rollNo, course },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    fetchStudents();
    setName("");
    setRollNo("");
    setCourse("");
  };

  const deleteStudent = async (id) => {
    const student = students.find((s) => s._id === id);
    const res = confirm(`Delete ${student.name}'s information?`);
    if (!res) return;

    await axios.delete(`${BACKEND_URL}api/students/${id}`, {
      headers: { Authorization: token },
    });
    fetchStudents();

    console.log("Deletion Cancelled");
  };

  useEffect(() => {
    fetchStudents();
  }, []); //once on mount

  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/"); //login
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          backgroundClip: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ margin: "0" }}>Dashboard</h2>
        <button
          onClick={logout}
          style={{
            padding: "8px 14px",
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          LogOut
        </button>
      </div>

      {/*Form */}

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "30px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: "1",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="Number"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          style={{
            flex: "1",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={{
            flex: "1",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addStudent}
          style={{
            padding: "10px 18px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add
        </button>
      </div>

      {/* list of students */}

      <div>
        {students.map((s) => (
          <div
            key={s._id}
            style={{
              backgroundClip: "#fff",
              display: "inline-block",
              margin: "10px",
              padding: "16px",
              borderRadius: "8px",
              width: "220px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <p style={{ margin: "0px 0" }}>
                <strong>Name:</strong> {s.name}
              </p>
              <button
                style={{
                  color: "#f50000",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "end",
                }}
                onClick={() => deleteStudent(s._id)}
              >
                X
              </button>
            </span>
            <p style={{ margin: "6px 0" }}>
              <strong>Roll No:</strong>
              {s.rollNo}
            </p>
            <p style={{ margin: "6px 0" }}>
              <strong>Course:</strong> {s.course}
            </p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
