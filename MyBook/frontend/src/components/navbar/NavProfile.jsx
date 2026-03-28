import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiChevronDown, FiUser, FiLogOut, FiLock } from "react-icons/fi";
import ModalLayout from "../ModalLayout";
import { useState } from "react";
import Profile from "../auth/Profile";
import Password from "../auth/Password";
import Logout from "../auth/Logout";

const NavProfile = () => {
  const user = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const closeDropdownFocus = () => {
    document.activeElement?.blur();
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/signup" className="premium-btn-outline desktop-only">
          Sign Up
        </Link>
        <Link to="/login" className="premium-btn">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          type="button"
          className="premium-btn-outline inline-flex items-center gap-2"
        >
          <span className="hidden sm:block">{user.data.firstName}</span>
          <FiChevronDown size={16} />
        </button>
        <ul className="dropdown-content z-[75] mt-3 w-58 rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <li onClick={closeDropdownFocus}>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-teal-500/10"
              onClick={() => setOpenProfile(true)}
            >
              <FiUser size={15} /> Profile
            </button>
          </li>
          <li onClick={closeDropdownFocus}>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-teal-500/10"
              onClick={() => setOpenPassword(true)}
            >
              <FiLock size={15} /> Change Password
            </button>
          </li>
          <li onClick={closeDropdownFocus}>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-500 hover:bg-red-500/10"
              onClick={() => setOpenLogout(true)}
            >
              <FiLogOut size={15} /> Log Out
            </button>
          </li>
        </ul>
      </div>

      <ModalLayout isOpen={openProfile} close={() => setOpenProfile(false)}>
        <Profile close={() => setOpenProfile(false)} />
      </ModalLayout>

      <ModalLayout isOpen={openPassword} close={() => setOpenPassword(false)}>
        <Password close={() => setOpenPassword(false)} />
      </ModalLayout>

      <ModalLayout isOpen={openLogout} close={() => setOpenLogout(false)}>
        <Logout close={() => setOpenLogout(false)} />
      </ModalLayout>
    </>
  );
};

export default NavProfile;
