import fs from "fs";
import StoryblokService from "../services/StoryblokService.js";

export const getComponents = async () => {
  try {
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

    fs.writeFile(
      "exportedData/component_group.json",
      JSON.stringify(componentGroups, null, 2),
      (err) => {
        if (err)
          console.log("Error while writting to component_group.json file", err);
        console.log("Data written to file - component_group.json");
      },
    );

    fs.writeFile(
      "exportedData/components.json",
      JSON.stringify(components, null, 2),
      (err) => {
        if (err)
          console.log("Error while writting to component.json file", err);
        console.log("Data written to file - components.json");
      },
    );
  } catch (error) {
    console.error("Error while fetching components", error);
  }
};
