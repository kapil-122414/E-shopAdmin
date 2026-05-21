import React from "react";

const Loginfromdata = ({
  editfrom,
  setEditfrom,
  formData,
  setFormData,
  register,
}) => {
  if (!editfrom) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const onhandsubmit = async (e) => {
    e.preventDefault();
    await register();
    alert("scess");
  };

  return (
    <div className="login-from">
      <form onSubmit={onhandsubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
        />

        <div className="flex gap-5 loginbtn">
          <button type="submit">Save</button>

          <button type="button" onClick={() => setEditfrom(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loginfromdata;
