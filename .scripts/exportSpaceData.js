import { initStoryblokClient } from "./services/StoryblokService.js";
import { getComponents } from "./utils/getComponents.js";
import { getStories } from "./utils/getStories.js";

export const exportSpaceData = async (credentials, elements) => {
  const { userAuthToken, spaceId } = credentials;

  const StoryblokService = initStoryblokClient(spaceId, userAuthToken);

  if (elements.includes("components")) await getComponents(StoryblokService);

  if (elements.includes("stories")) await getStories(StoryblokService);
};
