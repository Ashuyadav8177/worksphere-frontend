import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PasswordInput from "./PasswordInput";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import ErrorMessage from "../../../components/common/ErrorMessage";

import { login } from "../../../services/authService";
import { loginSuccess } from "../authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await login(formData);
      console.log("Login response:", response.data);
      dispatch(loginSuccess(response.data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <div>
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <div className="mt-2 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
            Remember me
          </label>
          <a href="/forgot-password" className="font-medium text-violet-600 hover:text-violet-700">
            Forgot password?
          </a>
        </div>
      </div>

      {error && <ErrorMessage title="Login failed">{error}</ErrorMessage>}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;