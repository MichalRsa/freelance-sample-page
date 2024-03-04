import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import storyblok from "@storyblok/astro";
import basicSsl from "@vitejs/plugin-basic-ssl";
import netlify from "@astrojs/netlify";

import isPreview from "./src/utils/isPreview";
import { loadEnv } from "vite";
const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: isPreview(),
      components: {
        config: "storyblok/Config",
        page: "storyblok/Page",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        hero: "storyblok/Hero",
        teaser: "storyblok/Teaser",
        "popular-articles": "storyblok/PopularArticles",
        "all-articles": "storyblok/AllArticles",
        article: "storyblok/Article",
        reviews: "storyblok/Reviews",
        "review-card": "storyblok/ReviewCard",
        rating: "storyblok/Rating",
        menu_teaser_section: "storyblok/MenuTeaserSection",
        menu_teaser_card: "storyblok/MenuTeaserCard",
        map_section: "storyblok/MapSection",
        faq_section: "storyblok/FaqSection",
        faq_card: "storyblok/FaqCard",
        link:"storyblok/Link"
      },
    }),
    tailwind(),
    sitemap(),
  ],
  output: isPreview() ? "server" : "static",
  ...(env.STORYBLOK_ENV === "development" && {
    vite: {
      plugins: [basicSsl()],
      server: {
        https: true,
      },
    },
  }),
  adapter: netlify(),
});
