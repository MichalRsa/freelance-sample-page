import fs from "fs";

const spaceId = process.env.STORYBLOK_SPACE_ID;

export const getStories = async (StoryblokClient) => {
  let storiesId;
  await StoryblokClient.get(`/spaces/${spaceId}/stories/`, {})
    .then((response) => {
      storiesId = response.data.stories.map((story) => story.id);
    })
    .catch((error) => {
      console.log(error);
    });

  storiesId.forEach(async (id) => {
    StoryblokClient.get(`/spaces/${spaceId}/stories/${id}`, {})
      .then((response) => {
        const name = response.data.story.slug;
        const isFolder = response.data.story.is_folder;

        const fileName = isFolder ? `folder_${name}` : name;
        fs.writeFileSync(
          `exportedData/stories/${fileName}.json`,
          JSON.stringify(response.data.story, null, 2),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
