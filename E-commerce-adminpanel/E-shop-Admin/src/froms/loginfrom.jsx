import React, { useEffect } from "react";

const Loginfromdata = ({
  editfrom,
  setEditfrom,
  formData,
  setFormData,
  register,
}) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const onhandsubmit = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <div className="login-from">
      <form onSubmit={onhandsubmit}>
        <h1>{editfrom ? "Login Form" : "Edit Form"}</h1>
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
          <button type="submit" onClick={() => setEditfrom(false)}>
            {!editfrom ? "login" : "Edit"}
          </button>

          {editfrom && (
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
