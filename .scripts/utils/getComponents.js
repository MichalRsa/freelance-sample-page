import fs from "fs";

const spaceId = process.env.STORYBLOK_SPACE_ID;

export const getComponents = async (StoryblokClient) => {
  await StoryblokClient.get(`/spaces/${spaceId}/components/`, {})
    .then((response) => {
      const componentGroups = response.data.component_groups;

      try {
        const components = response.data.components.map((component) => {
          return {
            ...component,
            groupName: componentGroups.find(
              (group) => group.uuid === component.component_group_uuid,
            ).name,
          };
        });

        fs.writeFile(
          "exportedData/component_group.json",
          JSON.stringify(componentGroups, null, 2),
          (err) => {
            if (err) throw err;
            console.log("Data written to file");
          },
        );

        fs.writeFile(
          "exportedData/components.json",
          JSON.stringify(components, null, 2),
          (err) => {
            if (err) throw err;
            console.log("Data written to file");
          },
        );
      } catch (error) {
        console.error("Error parsing JSON:", error.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
