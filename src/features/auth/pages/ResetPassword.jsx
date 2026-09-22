import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import Button from "../../../components/common/Button";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Reset Password Data:", formData);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#1a1f37] p-12 lg:flex">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-violet-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-white">Almost There!</h2>
        <p className="mt-3 max-w-sm text-center text-sm text-gray-400">
          Set a new password to secure your account and get back to managing your workspace.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold leading-tight text-gray-900">WorkSphere</p>
              <p className="text-[11px] leading-tight text-gray-500">WorkSphere</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your new password.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <PasswordInput
              label="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />

            <Button type="submit" variant="primary" className="w-full">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;