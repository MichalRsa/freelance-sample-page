import { pushComponents } from "./utils/pushComponents.js";
import { pushStories } from "./utils/pushStories.js";
import { clearSpace } from "./utils/clearSpace.js";
import { initStoryblokClient } from "./services/StoryblokService.js";

const userToken = process.env.DESTINATION_STORYBLOK_USER_AUTH_TOKEN;
const spaceId = process.env.DESTINATION_STORYBLOK_SPACE_ID;

const StoryblokService = initStoryblokClient(spaceId, userToken);

await clearSpace(StoryblokService);

await pushComponents(StoryblokService);

pushStories(StoryblokService);
