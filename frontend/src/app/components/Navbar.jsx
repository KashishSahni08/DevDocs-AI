"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ================= LOAD USER =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // ================= LOGOUT =================
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-800">

      {/* LOGO */}
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          📄
        </div>
        <span className="font-semibold text-lg">DevDocsAI</span>
      </div>

      {/* CENTER LINKS */}
      <div className="hidden md:flex gap-8 text-sm text-gray-300">
        <span className="cursor-pointer hover:text-white">Features</span>
        <span className="cursor-pointer hover:text-white">Preview</span>
        <span className="cursor-pointer hover:text-white">Pricing</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {!user ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-gray-300 hover:text-white"
            >
              Sign in
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-sm font-medium"
            >
              Get Started
            </button>
          </>
        ) : (
          <div className="relative">

            {/* AVATAR */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2"
            >
              <img
                src={
                  user.picture ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(user.name)
                }
                className="w-9 h-9 rounded-full border border-gray-700"
                alt="avatar"
              />
            </button>

            {/* DROPDOWN */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 bg-[#0b1220] border border-gray-800 rounded-lg w-44 shadow-xl">

                <div className="px-4 py-3 text-sm border-b border-gray-700">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>

                {/* <button
                  onClick={() => router.push("/profile")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                >
                  Profile
                </button> */}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}