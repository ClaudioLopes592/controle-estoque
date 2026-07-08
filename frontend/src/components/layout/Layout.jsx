import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    function handleResize() {
      const desktop = window.innerWidth >= 992;

      setIsDesktop(desktop);

      if (desktop) {
        setSidebarOpen(true);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex min-vh-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDesktop={isDesktop}
      />

      <div className="flex-grow-1 d-flex flex-column">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDesktop={isDesktop}
        />

        <main className="flex-grow-1 p-4">{children}</main>
      </div>
    </div>
  );
}