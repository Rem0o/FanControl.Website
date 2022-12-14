import consts from "../common/consts";
import icons from "../common/icons";
import { ExternalLink, TrackedAnchor } from "../components/links";
import { SpinningLogo } from "../components/spinningLogo";

const FooterButton = ({
  href,
  text,
  iconSvgPath,
  viewBox,
}: {
  href: string;
  text: string;
  iconSvgPath: string;
  viewBox?: string;
}) => {
  return (
    <TrackedAnchor href={href}>
      <button className="flex rounded-2xl border border-black py-1 px-2 pr-3 text-sm hover:border-primary-600 hover:text-primary-600">
        <svg className="h-4 w-4" viewBox={viewBox ?? "0 0 24 24"}>
          <path fill="currentColor" d={iconSvgPath} />
        </svg>
        <span className="ml-1 self-center">{text}</span>
      </button>
    </TrackedAnchor>
  );
};

export const Footer = () => {
  return (
    <footer className="min-h-sm mt-10 flex border border-t border-body-300 bg-body-100 pt-2 text-center text-body-800">
      <div className="min-w-sm m-auto flex flex-col space-y-0">
        <div className="flex items-center justify-center ">
          <SpinningLogo className="h-8 w-8" />
          <span className="ml-1 self-center text-xl">Fan Control</span>
        </div>
        <div>Rémi Mercier</div>
        <ExternalLink href={`mailto:${consts.urls.email}`}>
          {consts.urls.email}
        </ExternalLink>
        <div className="flex items-center justify-center space-x-3 py-3">
          <FooterButton
            iconSvgPath={icons.svgPaths.heart}
            href={consts.urls.sponsor}
            text="Sponsor"
          />
          <FooterButton
            iconSvgPath={icons.svgPaths.paypal}
            href={consts.urls.donationUrl}
            viewBox="0 0 16 16"
            text="PayPal"
          />
        </div>
      </div>
    </footer>
  );
};
