import { useState } from "react";
import PasswordInput from "./PasswordInput";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import ErrorMessage from "../../../components/common/ErrorMessage";

import authService from "../authService";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        employeeId: Number(formData.employeeId),
      });

      setSuccess(true);
    } catch (err) {
      console.error("Register error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <p className="text-green-600 font-medium">Account created successfully!</p>
        <a href="/login" className="mt-2 inline-block text-violet-600 hover:text-violet-700">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <Input
        label="Employee ID"
        type="number"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        placeholder="Enter your Employee ID (provided by Admin)"
        required
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter password"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
      />

      {error && <ErrorMessage title="Registration failed">{error}</ErrorMessage>}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}

export default RegisterForm;