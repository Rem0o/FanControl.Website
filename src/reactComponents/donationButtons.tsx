import consts from "../common/consts";
import { icons } from "../common/icons";
import { FooterButton } from "./footerButton";

export const PaypalDonateButton = () => (
  <FooterButton
    iconSvgPath={icons.paypal}
    href={consts.urls.donationUrl}
    viewBox="0 0 16 16"
    text="Donate"
    className="border-2 border-[#00457C] font-semibold text-[#00457C] hover:border-[#00053C] hover:text-[#00053C] dark:border-[#52b1ff] dark:text-[#52b1ff]"
  />
);

export const SponsorButton = () => (
  <FooterButton
    iconSvgPath={icons.heart}
    href={consts.urls.sponsor}
    text="Sponsor"
    className="border-2 border-[#db61a2] font-semibold text-[#db61a2] hover:border-[#ab2172] hover:text-[#ab2172]"
  />
);
