import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Forgot Password Email:", email);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#1a1f37] p-12 lg:flex">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-violet-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-white">Forgot Your Password?</h2>
        <p className="mt-3 max-w-sm text-center text-sm text-gray-400">
          No worries! We'll help you reset it and get back into your account in no time.
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
              <p className="text-lg font-bold leading-tight text-gray-900">SOMS</p>
              <p className="text-[11px] leading-tight text-gray-500">WorkSpare</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your email to reset your password.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />

            <Button type="submit" variant="primary" className="w-full">
              Send Reset Link
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <a href="/login" className="font-medium text-violet-600 hover:text-violet-700">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;