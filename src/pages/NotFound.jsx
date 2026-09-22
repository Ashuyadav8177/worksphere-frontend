import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function NotFound() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      {/* Illustration */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-56 w-56 text-violet-200">
        <circle cx="100" cy="100" r="90" fill="currentColor" opacity="0.3" />
        <circle cx="100" cy="100" r="60" fill="currentColor" opacity="0.5" />
        <g transform="translate(65,60)">
          <ellipse cx="35" cy="70" rx="28" ry="10" fill="currentColor" opacity="0.4" />
          <circle cx="35" cy="35" r="30" fill="white" stroke="#7c3aed" strokeWidth="3" />
          <circle cx="35" cy="35" r="18" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <rect x="18" y="55" width="34" height="24" rx="10" fill="white" stroke="#7c3aed" strokeWidth="3" />
        </g>
      </svg>

      {/* 404 */}
      <h1 className="mt-4 text-6xl font-extrabold text-violet-600">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-gray-900">Page Not Found</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        The page you are looking for does not exist.
      </p>

      <div className="mt-6">
        <Button variant="primary" onClick={handleDashboard}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;