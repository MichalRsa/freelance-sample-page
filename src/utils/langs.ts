// You can have the languages in an utils file so it can be reused.
const languages = ["en", "es"];
function getTransLink(language: string, slug: string): string {
  return language === "en" ? slug : `/${language}${slug}`;
}
export { getTransLink, languages };
