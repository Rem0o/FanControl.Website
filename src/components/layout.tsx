import * as React from "react";
import { Footer } from "./footer";
import { NavBar } from "./navbar";

type Props = {
  pageTitle?: string;
  children: React.ReactNode;
};

const Layout = ({ pageTitle, children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar pageTitle={pageTitle} />

      <main className="bg-transparent grow">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
