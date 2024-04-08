import fs from "fs";

export const pushComponents = async (StoryblokService) => {
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
          console.log("Error while creating component groups");
          console.log(error);
        }),
    ),
  ).then((data) => {
    console.log("Component groups created");
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
        console.log("Error while creating components");
        console.log(error);
      }),
    ),
  ).then(() => {
    console.log("Components created");
  });
};
