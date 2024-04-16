import type { LinkButtonStoryblok, LinkStoryblok } from "component-types-sb";

export const getLinkUrl = (
  link: LinkButtonStoryblok["link"] | LinkStoryblok["link"],
): string => {
  let url;
  try {
    const isExternal = Boolean(link.url);

    const anchor = link.anchor != null ? `#${link.anchor}` : "";

    url = isExternal ? link.url : `/${link.story.full_slug as string}${anchor}`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    url = "";
  }

  return url;
};
