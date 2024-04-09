import fs from "fs";
import chalk from "chalk";

export const getStories = async (StoryblokService) => {
  try {
    console.log(chalk.blue.bold.underline("Creating stories..."));

    const response = await StoryblokService.getStories();
    const storiesId = response.data.stories.map((story) => story.id);

    await Promise.all(
      storiesId.map(async (id) => {
        const response = await StoryblokService.getStory(id);
        const name = response.data.story.slug;
        const isFolder = response.data.story.is_folder;

        const fileName = isFolder ? `folder_${name}` : name;

        try {
          await fs.promises.writeFile(
            `exportedData/stories/${fileName}.json`,
            JSON.stringify(response.data.story, null, 2),
          );
          console.log(chalk.green(`Data written to file - ${fileName}.json`));
        } catch (error) {
          console.log(chalk.red(`Error while writting ${fileName}`, error));
        }
      }),
    );
    console.log(chalk.blue.bold.underline("Stories added"));
  } catch (error) {
    console.log(chalk.red("Error while fetching stories data", error));
  }
};
