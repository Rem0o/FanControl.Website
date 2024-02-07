import type { JsxElement } from "typescript";
import consts from "../common/consts";
import icons from "../common/icons";
import { FooterButton } from "./footerButton";
import { BigIcon, Icon } from "./icon";
import { SpinningLogo } from "./spinningLogo";
import { Modal } from "./modal";

export const DonationModal = (exitModal: Function) => <Modal exitModal={exitModal}>{Donation(exitModal)}</Modal>;

function Donation(exitModal: Function) {
  return (
    <>
      <div className="flex w-full flex-row">
        <SpinningLogo className="m-auto h-8 w-8" spinInitially={true} />
      </div>

      <div className="m-2">Thanks for downloading FanControl !</div>

      <div className="m-2 flex flex-row space-x-4">
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
    </>
  );
}
