import { SpinningLogo } from "../components/spinningLogo";

const links = [
  { url: "/", title: "Home" },
  //{ url: "/demo", title: "Demo" },
  { url: "/docs/", title: "Docs" },
  { url: "/about/", title: "About" },
];

const getPageTitle = (title?: string) => {
  if (title) {
    return `> ${title}`;
  }

  return "";
};

const NavBar = ({ pageTitle }: { pageTitle?: string }) => {
  return (
    <nav className="w-screen sticky top-0 z-50 flex bg-primary-800 text-body-50 shadow-sm shadow-body-400">
      <div className="m-1 flex items-center justify-center">
        <SpinningLogo />
        <div className="ml-2">
          <a href={links[0].url}>Fan Control</a> {getPageTitle(pageTitle)}
        </div>
      </div>
      <ul className="ml-auto flex items-center justify-center">
        {links.map((link) => (
          <li key={link.title}>
            <a className="p-3 hover:bg-primary-700" href={link.url}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NavBar };
