type Article = {
  imageAssetPath: string;
  href: string;
  imageClassNames?: string;
};

export const articles: Article[] = [
  {
    imageAssetPath: "assets/voltcave.png",
    href: "https://voltcave.com/fan-control-software/?utm_source=rss&utm_medium=rss&utm_campaign=fan-control-software"
  },
  {
    imageAssetPath: "assets/muo.svg",
    href: "https://www.makeuseof.com/how-to-use-fan-control-to-manage-your-windows-pcs-fan/"
  },
  {
    imageAssetPath: "assets/digitalTrends.svg",
    href: "https://www.digitaltrends.com/computing/how-to-use-fan-control/",
    imageClassNames: "bg-[#000000] rounded-xl p-2"
  },
  {
    imageAssetPath: "assets/techguided.png",
    href: "https://techguided.com/best-fan-control-software/",
    imageClassNames: "bg-[#000000] rounded-xl p-2 w-24"
  },
  {
    imageAssetPath: "assets/softlay.png",
    href: "https://www.softlay.com/downloads/remi-fan-control",
    imageClassNames: "p-2 w-60"
  }
];
