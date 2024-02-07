import consts from "../common/consts";
import { Spacer } from "./Spacer";
import { TrackedAnchor, TrackedExternalLink } from "./links";
import { Modal } from "./modal";
import { getDownloadUrl } from "./services/versionService";

type downloadProps = {
  version: number;
  exitModal: Function;
  onDownload: Function;
};

function Download(props: downloadProps) {
  const fanControlStr: string = `Fan Control V${props.version}`;

  const portableDownloadNet8 = getDownloadUrl("net_8_0");

  return (
    <div className="text-left">
      <div className="text-xl font-medium">Portable</div>
      <TrackedExternalLink
        href={consts.urls.directDownloadUrl}
        onClick={() => props.onDownload()}
      >
        {fanControlStr} .NET Framework 4.8
      </TrackedExternalLink>
      <br />
      <TrackedExternalLink
        href={portableDownloadNet8}
        onClick={() => props.onDownload()}
      >
        {fanControlStr} .NET 8
      </TrackedExternalLink>
      <br />
    </div>
  );
}

export const DownloadModal = (props: downloadProps) => (
  <Modal exitModal={props.exitModal}>{Download(props)}</Modal>
);
