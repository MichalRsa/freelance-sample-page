import StoryblokClient from "storyblok-js-client";
import { pushComponents } from "./utils/pushComponents.js";
import { pushStories } from "./utils/pushStories.js";

const userToken = process.env.DESTINATION_STORYBLOK_USER_AUTH_TOKEN;

const Storyblok = new StoryblokClient({
  oauthToken: userToken,
});

pushComponents(Storyblok);

pushStories(Storyblok);
