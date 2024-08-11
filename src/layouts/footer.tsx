import consts from "../common/consts";
import { icons } from "../common/icons";
import { ExternalLink } from "../reactComponents/links";
import { SpinningLogo } from "../reactComponents/spinningLogo";
import { FooterButton } from "../reactComponents/footerButton";

export const Footer = () => {
  return (
    <footer className="min-h-sm mt-10 flex border-t border-body-300 bg-body-100 pt-2 text-center text-body-800">
      <DevInformation />
    </footer>
  );
};

export const DevInformation = () => {
  return (
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
          iconSvgPath={icons.heart}
          href={consts.urls.sponsor}
          text="Sponsor"
        />
        <FooterButton
          iconSvgPath={icons.paypal}
          href={consts.urls.donationUrl}
          viewBox="0 0 16 16"
          text="Donate"
        />
      </div>
    </div>
  );
};
