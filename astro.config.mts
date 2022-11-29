import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://getfancontrol.com",
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    robotsTxt(),
    partytown({
      config:{
        forward: ["dataLayer.push", "gtag"],
      }
    }),
  ],
});
