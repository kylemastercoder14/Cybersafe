"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import SearchContainer from "./search-container";
import HeaderMobile from "./header-mobile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  const lastScrollTop = React.useRef(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <>
      {isMobile && <HeaderMobile />}
      {!isMobile && (
        <nav
          id="navbar"
          className={`fixed top-0 w-full h-[80px] bg-white border-b transition-all py-0 lg:px-[200px] px-10 z-50 flex justify-between items-center duration-500 ${
            isNavbarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center gap-2">
            <Link
              className="text-2xl font-black font-mono text-blue-600"
              href="/"
            >
              <Image src="/logo.png" alt="Logo" width={80} height={80} />
            </Link>
            <div className="flex items-center gap-3 ml-5">
              <SearchContainer />
            </div>
          </div>
          {user ? (
            <UserButton showName />
          ) : (
            <div className="flex items-center gap-3">
              <Button onClick={() => router.push("/sign-in")} variant="outline">
                Log in
              </Button>
              <Button onClick={() => router.push("/sign-up")} variant="default">
                Sign up
              </Button>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Header;
