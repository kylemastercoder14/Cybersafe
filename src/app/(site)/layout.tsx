import React from "react";
import Header from "@/components/globals/header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className='lg:px-[200px] px-10'>
      {children}
      </main>
    </div>
  );
};

export default RootLayout;
