import consts from "../common/consts";
import { icons } from "../common/icons";
import { FooterButton } from "./footerButton";
import { SpinningLogo } from "./spinningLogo";
import { Modal } from "./modal";
import { PaypalDonateButton, SponsorButton } from "./donationButtons";

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
        If you want to support the developer of this project:{" "}
      </div>

      <div className="m-2 flex flex-row space-x-4">
        <PaypalDonateButton />
        <SponsorButton />
      </div>
    </>
  );
}
