import { useEffect, useState } from "react";
import { SpinningLogo } from "./spinningLogo";
import { Modal } from "./modal";
import { PayPalDonateButton, StripeDonateButton } from "./donationButtons";

type DonationModalProps = {
  exitModal: () => void;
  onDownload: () => void;
};

const donationAmounts = [5, 10, 20] as const;

export const DonationModal = ({ exitModal, onDownload }: DonationModalProps) => {
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(10);

  useEffect(() => {
    if (secondsRemaining === 0) {
      onDownload();
      return;
    }

    const timeout = window.setTimeout(
      () => setSecondsRemaining((seconds) => seconds - 1),
      1000
    );

    return () => window.clearTimeout(timeout);
  }, [onDownload, secondsRemaining]);

  const amount = selectedAmount === "custom" ? 0 : selectedAmount;
  const stripeAmount = selectedAmount === "custom" ? undefined : selectedAmount;

  return (
    <Modal exitModal={exitModal}>
      <div className="flex w-full flex-row">
        <SpinningLogo className="m-auto h-8 w-8" spinInitially={true} />
      </div>

      <div className="m-2 text-xl font-semibold">Thanks for downloading Fan Control!</div>

      <div className="mb-4 text-center">
        {secondsRemaining > 0 ? (
          <>
            Download will start in <span className="font-bold">{secondsRemaining}</span>.
          </>
        ) : (
          "Your download is starting..."
        )}
      </div>

      <div className="mb-2 text-center">Support the project with a donation:</div>
      <div className="mb-4 flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Donation amount">
        {donationAmounts.map((donationAmount) => (
          <button
            key={donationAmount}
            type="button"
            role="radio"
            aria-checked={selectedAmount === donationAmount}
            onClick={() => setSelectedAmount(donationAmount)}
            className={`rounded-full border-2 px-4 py-2 font-semibold transition-colors ${
              selectedAmount === donationAmount
                ? "border-primary-600 bg-primary-600 text-white"
                : "border-body-300 hover:border-primary-500 dark:border-body-600"
            }`}
          >
            ${donationAmount}
          </button>
        ))}
        <button
          type="button"
          role="radio"
          aria-checked={selectedAmount === "custom"}
          onClick={() => setSelectedAmount("custom")}
          className={`rounded-full border-2 px-4 py-2 font-semibold transition-colors ${
            selectedAmount === "custom"
              ? "border-primary-600 bg-primary-600 text-white"
              : "border-body-300 hover:border-primary-500 dark:border-body-600"
          }`}
        >
          Custom
        </button>
      </div>
      <div className="flex flex-row space-x-4">
        <PayPalDonateButton amount={amount} />
        <StripeDonateButton amount={stripeAmount} />
      </div>
    </Modal>
  );
};
