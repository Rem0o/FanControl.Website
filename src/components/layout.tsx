import * as React from "react";
import { Footer } from "./footer";
import { NavBar } from "./navbar";

type LayoutProps = {
  pageTitle?: string;
  children: React.ReactNode;
};

const Layout = ({ pageTitle, children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar pageTitle={pageTitle} />
      <main className="grow bg-transparent mt-5">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
