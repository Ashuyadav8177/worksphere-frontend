import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#1a1f37] p-12 lg:flex">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-violet-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-white">Join Us Today!</h2>
        <p className="mt-3 max-w-sm text-center text-sm text-gray-400">
          Create your account to start managing your team, tasks, and office operations efficiently.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
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

          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-1 text-sm text-gray-500">Register to create your account</p>

          <div className="mt-8">
            <RegisterForm />
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-violet-600 hover:text-violet-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;