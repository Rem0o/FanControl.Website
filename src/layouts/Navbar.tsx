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
    <nav className="bg-primary-800 text-body-50 shadow-body-400 sticky top-0 z-50 flex shadow-sm">
      <div className="m-1 flex items-center justify-center">
        <SpinningLogo />
        <div className="ml-2">
          <a href={links[0].url}>Fan Control</a> {getPageTitle(pageTitle)}
        </div>
      </div>
      <ul className="ml-auto flex items-center justify-center">
        {links.map((link) => (
          <li key={link.title}>
            <a className="hover:bg-primary-700 p-3" href={link.url}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NavBar };
