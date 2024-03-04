import { languages } from "./langs";

interface ParseUrlReturnType {
  language: string | undefined;
  slug: string | undefined;
  langSwitch: Record<string, string>;
}

export default function parseUrl(url: string | undefined): ParseUrlReturnType {
  // converting the current url to an array based on '/'
  const urlToArray = url?.split("/");
  // Setting the fallback language to be english
  const defaultLang = "en";
  // Checking if current url contains a known language
  const isKnownLang = languages.some((l) => l === urlToArray?.[0]);
  // setting current language based on above
  const currentLang =
    url != null && isKnownLang ? urlToArray?.[0] : defaultLang;

  // removing language from the url and only keeping the slug
  const slug =
    url != null
      ? isKnownLang
        ? // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
          urlToArray?.slice(1)?.join("/") || undefined
        : urlToArray?.join("/")
      : undefined;

  // Same logic for generating the lang switch as we have in getStaticPaths
  let langSwitch = {};
  languages.forEach((lang) => {
    langSwitch = {
      ...langSwitch,
      [lang]: lang === "en" ? `/${slug ?? ""}` : `/${lang}/${slug ?? ""}`,
    };
  });
  // finally returning the same three variables we also get from getStaticPaths
  return { language: currentLang, slug, langSwitch };
}
