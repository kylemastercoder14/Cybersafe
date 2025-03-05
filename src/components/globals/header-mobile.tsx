"use client";

import React from "react";
import MobileSearch from "./mobile-search";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const HeaderMobile = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  const lastScrollTop = React.useRef(0);

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

  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full bg-white border-b transition-all py-2 px-5 z-50 duration-500 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col">
        {/* topbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
            </Link>
            <MobileSearch />
          </div>
          {user ? (
            <UserButton showName />
          ) : (
            <div className="flex items-center gap-1">
              <Button size="sm" onClick={() => router.push("/sign-in")} variant="outline">
                Log in
              </Button>
              <Button size="sm" onClick={() => router.push("/sign-up")} variant="default">
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderMobile;
