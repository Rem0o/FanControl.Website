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

export type Asset = {
  name: string;
  download_count: number;
  browser_download_url: string;
};

export type LatestRelease = {
  assets: Asset[];
  name: string;
  tag_name: string;
};

async function getLatestRelease() {
  const req = await fetch(consts.urls.latestVersionGithubApiUrl);
  const json = (await req.json()) as LatestRelease;
  return json;
}

export const latestRelease = await getLatestRelease();
export const versionInfo = await getVersion();
