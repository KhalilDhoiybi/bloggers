import type { FC, ReactNode } from "react";
import Navbar from "~/components/Navbar";

interface NavLayoutProps {
  children: ReactNode;
}

const NavLayout: FC<NavLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="py-11"></div>
      {children}
    </>
  );
};

export default NavLayout;
