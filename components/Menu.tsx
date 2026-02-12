"use client";
import Logout from "@/app/users/Logout";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

export const Menu = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="border-b border-neutral-700 bg-neutral-900/95">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowMenu(!showMenu)}
          className="gap-2"
        >
          <img
            src={showMenu ? "/close.svg" : "/menu.svg"}
            alt=""
            width={20}
            height={20}
            className="inline-block invert"
          />
          {showMenu ? "Tutup menu" : "Menu"}
        </Button>
      </div>
      {showMenu && (
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 pb-4 flex flex-col gap-2 md:flex-row md:gap-6 md:pb-3">
          <Link
            href="/"
            className="text-neutral-300 hover:text-yellow-400 transition-colors py-1"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-neutral-300 hover:text-yellow-400 transition-colors py-1"
          >
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-neutral-300 hover:text-yellow-400 transition-colors py-1"
              >
                Dashboard
              </Link>
              <Logout />
            </>
          ) : (
            <Link
              href="/users/login"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-yellow-400 text-neutral-900 hover:bg-yellow-500 transition-colors self-start md:self-center"
            >
              Login App
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};
