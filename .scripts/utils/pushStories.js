import fs from "fs";

export const pushStories = (StoryblokService) => {
  fs.readdir("exportedData/stories/", async (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const stories = [];
    const folders = [];

    files.forEach((file) => {
      const story = JSON.parse(
        fs.readFileSync(`exportedData/stories/${file}`, "utf8"),
      );

      if (story.is_folder) {
        folders.push(story);
      } else stories.push(story);
    });

    const pushedFoldersIds = [];

    let count = 0;

    const doesParentExist = (parentId, idsArray) =>
      !!idsArray.find((id) => id.oldId === parentId);

    const pushFolders = async (folders) => {
      if (count >= 20) return console.log("Too manu requests");

      if (folders.length === 0)
        return console.log("All folders have been added");

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
            const res = await StoryblokService.postStory(folder);

            const pushedFolder = res.data.story;

            pushedFoldersIds.push({ newId: pushedFolder.id, oldId: folder.id });

            count++;
            return pushedFolder;
          } catch (error) {
            console.log("Error while adding folder", error);
          }
        });
      }, Promise.resolve());

      await pushFolders(remainingFolders);
    };

    await pushFolders(folders);

    await Promise.all(
      stories.map(async (story) => {
        const isParent = doesParentExist(story.parent_id, pushedFoldersIds);

        story.parent_id = isParent
          ? pushedFoldersIds.find((ids) => (ids.oldId = story.parent_id)).newId
          : story.parent_id;

        await StoryblokService.postStory(story).catch((error) => {
          console.log(`Error while adding story - ${story.name}`);
          console.log(error);
        });
      }),
    ).then(() => "All Stories have been added");
  });
};
