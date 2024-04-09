#!/usr/bin/env node

import { Separator, checkbox, input, select } from "@inquirer/prompts";
import { exportSpaceData } from "./exportSpaceData.js";
import { importSpaceData } from "./importSpaceData.js";

console.clear();

const action = await select({
  message: "What do you want to do?",
  choices: [
    {
      name: "Export space data from my existing project",
      value: "export",
    },
    {
      name: "Import data to a new space",
      value: "import",
    },
  ],
});

const credentials = {
  userAuthToken: await input({ message: "Enter your auth token" }),
  spaceId: await input({ message: "Enter your space id (without # symbol)" }),
};

if (action === "export") {
  const elements = await checkbox({
    message: "What do you want to export?",
    choices: [
      new Separator("--Press Space to check, press Enter to continue --"),
      { name: "components", value: "components" },
      { name: "stories", value: "stories" },
    ],
  });
  exportSpaceData(credentials, elements);
} else if (action === "import") {
  const agrement = await select({
    message:
      "This installer works only with empty spaces. (It will remove all existing stories and components)",
    choices: [
      {
        name: "Ok",
        value: "yes",
        description:
          "I understand that all my stories and components will be deleted",
      },
      {
        name: "No I need my data",
        value: "no",
        description:
          "In case you need your existing data, don't proceed further",
      },
    ],
  });

  if (agrement === "yes") {
    const elements = await checkbox({
      message: "What do you want to import?",
      choices: [
        new Separator("--Press Space to check, press Enter to continue --"),
        { name: "components", value: "components" },
        { name: "stories", value: "stories" },
      ],
    });

    importSpaceData(credentials, elements);
  }
}
