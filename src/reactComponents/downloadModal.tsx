import { Spacer } from "./spacer";
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

  var splittedName = name.split("_").filter(x => x != props.version.toString());
  // fc, version, net, major, minor
  const [fc, version, net, major, minor] = splittedName;

  const dotnetString = major == "4" ? ".NET Framework" : ".NET";
  const dotnetVersionString =
    minor == "0" ? major.toString() : `${major}.${minor}`;

  return {
    name: `Fan Control V${version} ${dotnetString} ${dotnetVersionString}`,
    url: asset.browser_download_url,
    type: ExtensionToAssetType(extension)
  };
}

function Download(props: DownloadProps) {
  const downloadableAssets = latestRelease.assets.map((a) =>
    GetDownloadable(a, props)
  ).filter( x => !x.name.includes("NET 7"));
  const grouped = Object.groupBy(downloadableAssets, (a) => a.type);

  return (
    <div className="text-left">
      {grouped.portable ? (
        DownloadableAssetAssetGroup(grouped.portable, "Portable (.zip)", props)
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
