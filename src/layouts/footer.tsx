import consts from "../common/consts";
import { icons } from "../common/icons";
import { ExternalLink } from "../reactComponents/links";
import { SpinningLogo } from "../reactComponents/spinningLogo";
import { PaypalDonateButton, SponsorButton } from "../reactComponents/donationButtons";

export const Footer = () => {
  return (
    <footer className="min-h-sm border-body-200/50 glass dark:border-body-700/50 flex border-t pb-6 pt-8 text-center text-body-800 backdrop-blur-xl dark:text-body-200">
      <DevInformation />
    </footer>
  );
};

export const DevInformation = () => {
  return (
    <div className="min-w-sm m-auto flex flex-col space-y-2">
      <div className="group flex items-center justify-center">
        <SpinningLogo className="h-10 w-10" />
        <span className="ml-2 self-center text-2xl font-semibold">
          Fan Control
        </span>
      </div>
      <div className="font-medium text-body-700 dark:text-body-300">Rémi Mercier</div>
      <ExternalLink 
        href={`mailto:${consts.urls.email}`}
        className="text-body-600 transition-colors hover:text-primary-600 dark:text-body-400 dark:hover:text-primary-400"
      >
        {consts.urls.email}
      </ExternalLink>
      <div className="flex items-center justify-center space-x-4 py-4">
        <PaypalDonateButton />
        <SponsorButton />
      </div>
    </div>
  );
};
