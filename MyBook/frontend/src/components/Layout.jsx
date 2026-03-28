import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useProfileQuery } from "../redux/api/usersApiSlice";
import { useDispatch } from "react-redux";
import { removeUserInfo, userInfo } from "../redux/features/userSlice";
import Loader from "./Loader";
import NavLinks from "./navbar/NavLinks";
import SearchBox from "./navbar/SearchBox";

const Layout = () => {
  const { data: profile, isError, isLoading } = useProfileQuery();
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (profile) {
        dispatch(userInfo(profile));
      } else if (isError) {
        dispatch(removeUserInfo());
      }
      setIsReady(true);
    }
  }, [profile, dispatch, isError, isLoading]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html")?.setAttribute("data-theme", storedTheme);
  }, []);

  if (!isReady) {
    return (
      <div className="app-shell flex min-h-dvh items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar onMenuToggle={() => setIsDrawerOpen((prev) => !prev)} />

      <div className={`mobile-drawer mobile-only ${isDrawerOpen ? "open" : ""}`}>
        <button
          type="button"
          aria-label="Close menu"
          className="overlay"
          onClick={() => setIsDrawerOpen(false)}
        />
        <aside className="panel">
          <div className="flex items-center justify-between pb-4">
            <span className="text-xl font-semibold brand-gradient">MyBook</span>
            <button
              type="button"
              className="premium-btn-outline"
              onClick={() => setIsDrawerOpen(false)}
            >
              Close
            </button>
          </div>
          <SearchBox toggle={() => setIsDrawerOpen(false)} />
          <nav className="pt-4">
            <ul className="flex flex-col gap-1">
              <NavLinks toggle={() => setIsDrawerOpen(false)} mobile />
            </ul>
          </nav>
        </aside>
      </div>

      <main className="app-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
