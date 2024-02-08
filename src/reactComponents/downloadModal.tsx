import { Spacer } from "./Spacer";
import { TrackedExternalLink } from "./links";
import { Modal } from "./modal";
import {
  latestRelease,
  type Asset
} from "./services/versionService";

type DownloadProps = {
  version: number;
  exitModal: Function;
  onDownload: Function;
};

type AssetType = "portable" | "installer" | "unknown";

type DownloadableAsset = {
  name: string;
  url: string;
  type: AssetType;
};

function ExtensionToAssetType(ext: string): AssetType {
  switch (ext) {
    case "zip":
      return "portable";
    case "exe":
      return "installer";
    default:
      return "unknown";
  }
}

function GetDownloadable(
  asset: Asset,
  props: DownloadProps
): DownloadableAsset {
  const splitted = asset.name.split(".");
  const [name, extension] = splitted;

  const expectedExtensions = ["zip", "exe"];
  if (!expectedExtensions.includes(extension)) {
    return { name, url: asset.browser_download_url, type: "unknown" };
  }

  var splittedName = name.split("_");
  const [fc, net, major, minor] = splittedName;

  const dotnetString = major == "4" ? ".NET Framework" : ".NET";
  const dotnetVersionString =
    minor == "0" ? major.toString() : `${major}.${minor}`;

  return {
    name: `Fan Control V${props.version} ${dotnetString} ${dotnetVersionString}`,
    url: asset.browser_download_url,
    type: ExtensionToAssetType(extension)
  };
}

function Download(props: DownloadProps) {
  const downloadableAssets = latestRelease.assets.map((a) =>
    GetDownloadable(a, props)
  );
  const grouped = Object.groupBy(downloadableAssets, (a) => a.type);

  return (
    <div className="text-left">
      {grouped.portable ? (
        DownloadableAssetAssetGroup(grouped.portable, "Portable", props)
      ) : (
        <></>
      )}
      {grouped.installer ? (
        <>
          <Spacer/>
          {DownloadableAssetAssetGroup(grouped.installer, "Installer", props)}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

function DownloadableAssetAssetGroup(
  assets: DownloadableAsset[],
  name: string,
  props: DownloadProps
) {
  return (
    <>
      <div className="text-xl font-medium">{name}</div>
      {assets.map((a) => DownloadableAssetLink(a, props))}
    </>
  );
}

function DownloadableAssetLink(asset: DownloadableAsset, props: DownloadProps) {
  return (
    <>
      <TrackedExternalLink href={asset.url} onClick={() => props.onDownload()}>
        {asset.name}
      </TrackedExternalLink>
      <br />
    </>
  );
}

export const DownloadModal = (props: DownloadProps) => (
  <Modal exitModal={props.exitModal}>{Download(props)}</Modal>
);
