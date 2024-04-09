import { pushComponents } from "./utils/pushComponents.js";
import { pushStories } from "./utils/pushStories.js";
import { clearSpace } from "./utils/clearSpace.js";
import { initStoryblokClient } from "./services/StoryblokService.js";

export const importSpaceData = async (credentials, elements) => {
  const { userAuthToken, spaceId } = credentials;

  const StoryblokService = initStoryblokClient(spaceId, userAuthToken);

  await clearSpace(StoryblokService);

  if (elements.includes("components")) await pushComponents(StoryblokService);

  if (elements.includes("stories")) pushStories(StoryblokService);
};
