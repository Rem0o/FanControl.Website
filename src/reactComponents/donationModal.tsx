import consts from "../common/consts";
import { icons } from "../common/icons";
import { FooterButton } from "./footerButton";
import { SpinningLogo } from "./spinningLogo";
import { Modal } from "./modal";

export const DonationModal = (exitModal: Function) => (
  <Modal exitModal={exitModal}>
    <Donation />
  </Modal>
);

function Donation() {
  return (
    <>
      <div className="flex w-full flex-row">
        <SpinningLogo className="m-auto h-8 w-8" spinInitially={true} />
      </div>

      <div className="m-2">Thanks for downloading FanControl !</div>

      <div className="mb-2">
        If you want to support the developper of this project:{" "}
      </div>

      <div className="m-2 flex flex-row space-x-4">
        <FooterButton
          iconSvgPath={icons.paypal}
          href={consts.urls.donationUrl}
          viewBox="0 0 16 16"
          text="Donate"
          className="border-2 border-[#00457C] font-semibold text-[#00457C] hover:border-[#00053C] hover:text-[#00053C] dark:border-[#52b1ff] dark:text-[#52b1ff]"
        />
        <FooterButton
          iconSvgPath={icons.heart}
          href={consts.urls.sponsor}
          text="Sponsor"
          className="border-2 border-[#db61a2] font-semibold text-[#db61a2] hover:border-[#ab2172] hover:text-[#ab2172]"
        />
      </div>
    </>
  );
}
