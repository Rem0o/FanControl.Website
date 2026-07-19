import { DonationModal } from "../reactComponents/donationModal";

export const DonationPage = () => (
  <DonationModal exitModal={() => window.history.back()} />
);