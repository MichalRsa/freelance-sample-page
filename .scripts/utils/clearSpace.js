import chalk from "chalk";

export const clearSpace = async (StoryblokService) => {
  try {
    const responseStories = await StoryblokService.getStories();
    const responseComponents = await StoryblokService.getComponents();

    await Promise.all(
      responseStories.data.stories.map((story) =>
        StoryblokService.deleteStory(story.id),
      ),
    );

    await Promise.all(
      responseComponents.data.components.map((component) =>
        StoryblokService.deleteComponent(component.id),
      ),
    );
    console.log(chalk.blue.bold.underline("Space cleared"));
  } catch (error) {
    console.log(chalk.red("Erro while preapring space"));
    console.log(chalk.red(error));
  }
};
