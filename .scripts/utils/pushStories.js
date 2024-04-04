import fs from "fs";

const spaceId = process.env.DESTINATION_STORYBLOK_SPACE_ID;

export const pushStories = (StoryblokClient) => {
  fs.readdir("exportedData/stories/", async (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const rootLevelStories = [];
    const folders = [];
    const nestedStories = [];

    files.forEach((file) => {
      const story = JSON.parse(
        fs.readFileSync(`exportedData/stories/${file}`, "utf8"),
      );
      if (story.is_folder) {
        folders.push(story);
      } else if (!!story.parent_id) {
        nestedStories.push(story);
      } else rootLevelStories.push(story);
    });

    await Promise.all(
      rootLevelStories.map(async (story) => {
        await StoryblokClient.post(`/spaces/${spaceId}/stories`, {
          story: { ...story },
        })
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.log(`Error while adding story - ${story.name}`);
            console.log(error);
          });
      }),
    );

    const pushedFoldersIds = [];

    let count = 0;

    const doesParentExist = (parentId, idsArray) =>
      !!idsArray.find((id) => id.oldId === parentId);

    const pushFolders = async (folders) => {
      count++;
      if (count >= 20)
        return console.log("We have infinite loop! STOP NOW!!!!!!!");

      if (folders.length === 0)
        return console.log("All folders has been added");

      const remainingFolders = [];

      await folders.reduce((prevPromise, folder) => {
        return prevPromise.then(async () => {
          const isParent = doesParentExist(folder.parent_id, pushedFoldersIds);
          if (!!folder.parent_id && !isParent)
            return remainingFolders.push(folder);

          folder.parent_id = isParent
            ? pushedFoldersIds.find((ids) => (ids.oldId = folder.parent_id))
                .newId
            : folder.parent_id;
          try {
            const res = await StoryblokClient.post(
              `/spaces/${spaceId}/stories`,
              {
                story: { ...folder },
              },
            );

            const pushedFolder = res.data.story;

            pushedFoldersIds.push({ newId: pushedFolder.id, oldId: folder.id });

            return pushedFolder;
          } catch (error) {}
        });
      }, Promise.resolve());

      await pushFolders(remainingFolders);
    };

    await pushFolders(folders);

    await Promise.all(
      nestedStories.map(async (story) => {
        const isParent = doesParentExist(story.parent_id, pushedFoldersIds);

        story.parent_id = isParent
          ? pushedFoldersIds.find((ids) => (ids.oldId = story.parent_id)).newId
          : story.parent_id;

        await StoryblokClient.post(`/spaces/${spaceId}/stories`, {
          story: { ...story },
        }).catch((error) => {
          console.log(`Error while adding story - ${story.name}`);
          console.log(error);
        });
      }),
    );
  });
};
