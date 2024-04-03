import fs from "fs";

const spaceId = process.env.DESTINATION_STORYBLOK_SPACE_ID;

export const pushComponents = async (StoryblokClient) => {
  const componentGroups = JSON.parse(
    fs.readFileSync("exportedData/component_group.json", "utf8"),
  );

  await componentGroups.forEach(async (group) => {
    await StoryblokClient.post(`/spaces/${spaceId}/component_groups/`, {
      component_group: {
        name: group.name,
      },
    })
      .then((response) => {
        console.log("Component groups created");
      })
      .catch((error) => {
        console.log("Error while creating component groups");
        console.log(error);
      });
  });

  let groups;

  await StoryblokClient.get(`/spaces/${spaceId}/component_groups/`, {})
    .then((response) => {
      groups = response.data.component_groups;
    })
    .catch((error) => {
      console.log(error);
    });

  const components = JSON.parse(
    fs.readFileSync("exportedData/components.json", "utf8"),
  );

  await components.forEach(async (component) => {
    await StoryblokClient.post(`/spaces/${spaceId}/components/`, {
      component: {
        ...component,
        component_group_uuid: groups.find(
          (group) => group.name === component.groupName,
        ).uuid,
      },
    })
      .then((response) => {
        console.log("Components created");
      })
      .catch((error) => {
        console.log("Error while creating components");
        console.log(error);
      });
  });
};
