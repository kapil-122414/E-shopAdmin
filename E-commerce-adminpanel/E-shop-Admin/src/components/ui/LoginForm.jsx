import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Loginfromdata = ({
  editfrom,
  setEditfrom,
  formData,
  setFormData,
  register,
}) => {
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const onhandsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register();
    } finally {
      setLoading(false);
      setEditfrom(false);
    }
  };

  return (
    <div className="login-from">
      <form onSubmit={onhandsubmit}>
        <h1>{editfrom ? "Edit Form" : "Login Form"}</h1>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          required
          onChange={handleChange}
        />

        <div className="flex gap-5 loginbtn">
          <button type="submit" disabled={loading}>
            {loading ? <FaSpinner className="animate-spin" /> : editfrom ? "Edit" : "login"}
          </button>

          {editfrom && !loading && (
            <button type="button" onClick={() => setEditfrom(false)}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Loginfromdata;
