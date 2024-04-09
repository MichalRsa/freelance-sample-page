import fs from "fs";
import chalk from "chalk";

export const pushComponents = async (StoryblokService) => {
  console.log(chalk.blue.bold.underline("Uploading components..."));
  const componentGroups = JSON.parse(
    fs.readFileSync("exportedData/component_group.json", "utf8"),
  );

  const groups = await Promise.all(
    componentGroups.map((group) =>
      StoryblokService.postComponentGroups(group.name)
        .then((response) => {
          return response.data.component_group;
        })
        .catch((error) => {
          console.log(chalk.red("Error while creating component groups"));
          console.log(chalk.red(error));
        }),
    ),
  ).then((data) => {
    console.log(chalk.green("Component groups created"));
    return data;
  });

  const components = JSON.parse(
    fs.readFileSync("exportedData/components.json", "utf8"),
  );

  await Promise.all(
    components.map(async (component) =>
      StoryblokService.postComponent({
        component: {
          ...component,
          component_group_uuid: groups.find(
            (group) => group.name === component.groupName,
          ).uuid,
        },
      }).catch((error) => {
        console.log(chalk.red("Error while creating components"));
        console.log(chalk.red(error));
      }),
    ),
  ).then(() => {
    console.log(chalk.green("Components created"));
  });
};
