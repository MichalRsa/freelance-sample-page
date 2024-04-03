import StoryblokClient from "storyblok-js-client";
import { getComponents } from "./utils/getComponents.js";
import { getStories } from "./utils/getStories.js";
const userToken = process.env.STORYBLOK_USER_AUTH_TOKEN;

const Storyblok = new StoryblokClient({
  oauthToken: userToken,
});

getComponents(Storyblok);

getStories(Storyblok);
