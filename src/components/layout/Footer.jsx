function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-gray-500">
          © {currentYear} WorkSphere. All rights reserved.
        </p>

        <nav aria-label="Footer navigation" className="flex items-center gap-4">
          <a href="/privacy" className="text-xs text-gray-500 transition-colors hover:text-violet-600">
            Privacy Policy
          </a>
          <a href="/terms" className="text-xs text-gray-500 transition-colors hover:text-violet-600">
            Terms & Conditions
          </a>
          <a href="/help" className="text-xs text-gray-500 transition-colors hover:text-violet-600">
            Help & Support
          </a>
        </nav>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>WorkSphere</span>
          <span>•</span>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;