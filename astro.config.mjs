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
  site: "https://kawusia-coffe-bar.netlify.app/",
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
        link: "storyblok/Link",
        hero_with_links: "storyblok/HeroWithLinks",
        menu_cards: "storyblok/MenuCards",
        menu_card: "storyblok/MenuCard",
        link_button: "storyblok/LinkButton",
        contact_section: "storyblok/ContactSection",
        about_us_section: "storyblok/AboutUsSection",
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
