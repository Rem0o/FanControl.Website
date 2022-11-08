import * as React from "react";
import { Footer } from "./footer";
import { NavBar } from "./navbar";

type Props = {
  pageTitle?: string;
  children: React.ReactNode;
};

const Layout = ({ pageTitle, children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar pageTitle={pageTitle} />
      <main className="grow bg-transparent">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
