import { useTimeoutBooleanState } from "../common/CustomHooks";
import icons from "../common/Icons";

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

const NavBar = ({ pageTitle }: { pageTitle: string | undefined }) => {
  const [isSpinning, setIsSpinning] = useTimeoutBooleanState(false, 3000);

  return (
    <nav className="flex bg-primary-800 text-body-50 shadow-md shadow-body-400 sticky top-0 z-50">
      <div className="m-1 flex items-center justify-center">
        <svg
          onMouseEnter={() => setIsSpinning(true)}
          className={`${
            isSpinning ? "animate-spin" : ""
          } h-10 w-10 hover:animate-spin`}
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={icons.svgPaths.fan} />
        </svg>
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
