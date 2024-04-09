import fs from "fs";
import chalk from "chalk";

export const getComponents = async (StoryblokService) => {
  try {
    console.log(chalk.blue.bold.underline("Creating components..."));
    const response = await StoryblokService.getComponents();

    const componentGroups = response.data.component_groups;

    const components = response.data.components.map((component) => {
      return {
        ...component,
        groupName: componentGroups.find(
          (group) => group.uuid === component.component_group_uuid,
        ).name,
      };
    });

    await fs.promises
      .writeFile(
        "exportedData/component_group.json",
        JSON.stringify(componentGroups, null, 2),
      )
      .then(() =>
        console.log(chalk.green("Data written to file - component_group.json")),
      )
      .catch((error) =>
        console.log(
          chalk.red("Error while writting to component_group.json file", error),
        ),
      );

    await fs.promises
      .writeFile(
        "exportedData/components.json",
        JSON.stringify(components, null, 2),
      )
      .then(() => {
        console.log(chalk.green("Data written to file - components.json"));
      })
      .catch((error) =>
        console.log(
          chalk.red("Error while writting to component.json file", error),
        ),
      );
    console.log(chalk.blue.bold.underline("Components added"));
  } catch (error) {
    console.error(chalk.red("Error while fetching components", error));
  }
};
