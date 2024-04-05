import fs from "fs";
import StoryblokService from "../services/StoryblokService.js";

export const getStories = async () => {
  try {
    const response = await StoryblokService.getStories();
    const storiesId = response.data.stories.map((story) => story.id);

    storiesId.forEach(async (id) => {
      const response = await StoryblokService.getStory(id);
      const name = response.data.story.slug;
      const isFolder = response.data.story.is_folder;

      const fileName = isFolder ? `folder_${name}` : name;

      try {
        fs.writeFileSync(
          `exportedData/stories/${fileName}.json`,
          JSON.stringify(response.data.story, null, 2),
        );
        console.log(`Data written to file - ${fileName}.json`);
      } catch (error) {
        console.log(`Error while writting ${fileName}`, error);
      }
    });
  } catch (error) {
    console.log("Error while fetching stories data", error);
  }
};
