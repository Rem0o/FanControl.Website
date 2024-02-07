import consts from "../../common/consts";

type VersionInfoJson = {
  Number: number;
  Message: string;
};

type VersionInfo = {
  Number: number;
  Message: string[];
};

async function getVersion() {
  var req = await fetch(consts.urls.versionJsonUrl);
  var json = (await req.json()) as VersionInfoJson;
  var versionInfo: VersionInfo = {
    Number: json.Number,
    Message: (json.Message as String).split("\r\n").map((x) => x.trim())
  };

  return versionInfo;
}

type Asset = {
  name: string;
  download_count: number;
  browser_download_url: string;
};

type LatestRelease = {
  assets: Asset[];
  name: string;
  tag_name: string;
};

async function getLatestRelease() {
  const req = await fetch(consts.urls.latestVersionGithubApiUrl);
  const json = (await req.json()) as LatestRelease;
  return json;
}

const latestRelease = await getLatestRelease();

export function getDownloadUrl(searchStr: string) {
  const asset = latestRelease.assets.find((a) =>
    a.name.toLowerCase().includes(searchStr.toLowerCase())
  );
  if (asset) {
    return asset.browser_download_url;
  }

  return "";
}

export const versionInfo = await getVersion();
