import { NavLink } from "react-router-dom";
import { FaHome, FaBookOpen, FaInfo } from "react-icons/fa";

const linkItems = [
  { to: "/", label: "Home", icon: <FaHome size={14} /> },
  { to: "/entries", label: "Entries", icon: <FaBookOpen size={14} /> },
  { to: "/about", label: "About", icon: <FaInfo size={14} /> },
];

const NavLinks = ({ toggle, mobile = false }) => {
  return (
    <>
      {linkItems.map((item) => (
        <li key={item.to} onClick={toggle}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `${mobile ? "flex w-full" : ""} nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="inline-flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
