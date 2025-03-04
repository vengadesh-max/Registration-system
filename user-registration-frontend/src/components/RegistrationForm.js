import { useState, useEffect } from "react";
import axios from "axios";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    password: "",
    gender: "",
    about: "",
  });

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores filtered users for search
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input
  const [editUserId, setEditUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [genders, setGenders] = useState([]);

  // Fetch Users from Backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered users with full user list
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Gender Options from API
  const fetchGenders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/genders");
      setGenders(response.data);
    } catch (error) {
      console.error("Error fetching genders:", error);
      setGenders(["Male", "Female", "Other"]);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGenders();
  }, []);

  // Search Users by Name
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.name.toLowerCase().includes(query))
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Name (Min 2 characters)
    if (formData.name.length < 2) {
      alert("Name must be at least 2 characters long.");
      return;
    }

    // Validate Age (Between 0 and 120)
    const ageValue = parseInt(formData.age, 10);
    if (ageValue < 0 || ageValue > 120) {
      alert("Age must be between 0 and 120.");
      return;
    }

    // Validate Password (Only if provided)
    if (!editUserId || (formData.password && formData.password.length > 0)) {
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{10,}$/;
      if (!passwordPattern.test(formData.password)) {
        alert("Password must be at least 10 characters long and contain both letters and numbers.");
        return;
      }
    }

    try {
      const userData = { ...formData };
      delete userData._id;
      delete userData.__v;

      if (!formData.password) {
        delete userData.password;
      }

      if (editUserId) {
        await axios.put(`http://localhost:5000/api/users/${editUserId}`, userData);
        alert("User updated successfully");
        setEditUserId(null);
      } else {
        await axios.post("http://localhost:5000/api/users/register", userData);
        alert("User registered successfully");
      }
      fetchUsers();
      setFormData({ name: "", age: "", dob: "", password: "", gender: "", about: "" });
    } catch (error) {
      alert(error.response?.data?.error || "Error processing request");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      ...user,
      password: "",
      dob: user.dob ? user.dob.split("T")[0] : "",
    });
    setEditUserId(user._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        alert("User deleted successfully");
        fetchUsers();
      } catch (error) {
        alert("Error deleting user.");
      }
    }
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required min="0" max="120" />

        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <label>Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 10 characters, must contain letters & numbers"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>{gender}</option>
          ))}
        </select>

        <label>About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          maxLength="5000"
          placeholder="Tell us about yourself..."
        ></textarea>
        <p>{formData.about.length}/5000 characters</p>

        <button type="submit" className="register-btn">
  {editUserId ? "Update User" : "Register"}
</button>
      </form>

      {/* Search Input */}
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      {/* User List */}
      <h2>User List</h2>
      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="user-item">
              <div className="user-info">
                <p><strong>{user.name}</strong> ({user.age} years old)</p>
                <p>{user.gender}</p>
              </div>
              <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
