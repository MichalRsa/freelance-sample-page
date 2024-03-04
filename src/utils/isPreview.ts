export default function isPreview(): boolean {
  return import.meta.env.STORYBLOK_IS_PREVIEW === "yes";
}
