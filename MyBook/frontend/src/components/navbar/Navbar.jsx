import { Link } from "react-router-dom";
import { FiBookOpen, FiMenu } from "react-icons/fi";
import NavLinks from "./NavLinks";
import ThemeController from "../ThemeController";
import NavProfile from "./NavProfile";
import SearchBox from "./SearchBox";

const Navbar = ({ onMenuToggle }) => {
  return (
    <header className="nav-shell">
      <div className="nav-container">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="premium-btn-outline mobile-only"
            aria-label="Open navigation menu"
            onClick={onMenuToggle}
          >
            <FiMenu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="rounded-xl bg-teal-500/15 p-2 text-teal-500">
              <FiBookOpen size={20} />
            </span>
            <span className="text-xl font-extrabold tracking-tight brand-gradient">
              MyBook
            </span>
          </Link>
        </div>

        <nav className="desktop-only">
          <ul className="nav-links">
            <NavLinks />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="desktop-only">
            <SearchBox />
          </div>
          <ThemeController />
          <NavProfile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
