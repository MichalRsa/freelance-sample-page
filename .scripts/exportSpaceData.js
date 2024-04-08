import { initStoryblokClient } from "./services/StoryblokService.js";
import { getComponents } from "./utils/getComponents.js";
import { getStories } from "./utils/getStories.js";

const userToken = process.env.STORYBLOK_USER_AUTH_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

const StoryblokService = initStoryblokClient(spaceId, userToken);

await getComponents(StoryblokService);

await getStories(StoryblokService);
