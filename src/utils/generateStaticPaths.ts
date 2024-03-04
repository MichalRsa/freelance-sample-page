import { useStoryblokApi } from "@storyblok/astro";
import isPreview from "./isPreview";
import { languages } from "./langs";

export default async function generateStaticPaths(): Promise<IPath[]> {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get("cdn/links", {
    version: isPreview() ? "draft" : "published",
  });
  let links = data.links;
  links = Object.values(links);
  const paths: IPath[] = [];
  // let paths = [];
  links.forEach((link: { slug: string }) => {
    languages.forEach((language) => {
      // This slug will be used for fetching data from storyblok
      const slug = link.slug === "home" ? undefined : link.slug;
      // This will be used for generating all the urls for astro
      const fullUrl = language === "en" ? slug : `${language}/${slug ?? ""}`;
      // This will let us change the url for diffrent versions
      let langSwitch = {};
      languages.forEach((lang) => {
        langSwitch = {
          ...langSwitch,
          [lang]: lang === "en" ? `/${slug ?? ""}` : `/${lang}/${slug ?? ""}`,
        };
      });
      paths.push({
        props: { language, slug, langSwitch },
        params: {
          slug: fullUrl,
        },
      });
    });
  });
  return paths;
}

interface IPath {
  props: {
    language: string;
    slug: string | undefined;
    langSwitch: Record<string, string>;
    // langSwitch: {};
  };
  params: {
    slug: string | undefined;
  };
}
