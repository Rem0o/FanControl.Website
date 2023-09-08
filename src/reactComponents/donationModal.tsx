import consts from "../common/consts";
import icons from "../common/icons";
import { FooterButton } from "./footerButton";
import { BigIcon, Icon } from "./icon";
import { SpinningLogo } from "./spinningLogo";

export const DonationModal = (exitModal: Function) => (
  <>
    <div className="fixed left-1/2 top-1/2 z-50 m-auto -translate-x-1/2 -translate-y-1/2 rounded bg-slate-50 p-5 shadow-xl">
      <div className="flex flex-col items-center self-center">
        <div className="flex w-full flex-row">
          <SpinningLogo className="m-auto h-8 w-8" spinInitially={true} />
          <button
            className="absolute right-2 top-2 rounded-full border border-body-700 px-2 text-body-700 hover:border-primary-600 hover:text-primary-600"
            onClick={() => exitModal()}
          >
            X
          </button>
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
      </div>
    </div>

    <div
      onClick={() => exitModal()}
      className="fixed left-0 top-0 z-40 block h-full w-full bg-black opacity-50 "
    ></div>
  </>
);
