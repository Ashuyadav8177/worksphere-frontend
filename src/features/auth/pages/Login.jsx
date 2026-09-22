import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Illustration */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#1a1f37] p-12 lg:flex">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-violet-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="mt-8 text-2xl font-bold text-white">Welcome Back!</h2>
        <p className="mt-3 max-w-sm text-center text-sm text-gray-400">
          Manage your team, track attendance, and streamline office operations — all in one place.
        </p>
      </div>

      {/* Right Panel - Form */}
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

          <h1 className="text-2xl font-bold text-gray-900">Welcome Back! 👋</h1>
          <p className="mt-1 text-sm text-gray-500">Please sign in to your account</p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-violet-600 hover:text-violet-700">
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;