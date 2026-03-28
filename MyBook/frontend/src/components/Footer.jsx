import { FiBookOpen } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer-shell">
      <div className="footer-container">
        <div className="flex items-center gap-2">
          <FiBookOpen size={18} />
          <span className="footer-brand">MyBook</span>
        </div>
        <p className="m-0 text-sm text-slate-300">
          Private journaling for focused minds. Built for clarity, reflection, and consistency.
        </p>
        <p className="m-0 text-sm text-slate-300">© {new Date().getFullYear()} Ankit Sharma</p>
      </div>
    </footer>
  );
};

export default Footer;
