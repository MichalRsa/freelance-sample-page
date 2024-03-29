export default function isPreview(env?: string): boolean {
  return (env ?? import.meta.env.STORYBLOK_IS_PREVIEW) === "yes";
}
