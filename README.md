## Table of contents

- [Live Preview](#live-preview)
- [Project Description](#project-description)
- [Quickstart](#quickstart)
- [Internationalization](#internationalization)
- [Its key components are](#its-key-components-are)
- [Project ](#project-structure)
- [Website update](#website-update)
- [Generating types for Storyblok](#generating-types-for-storyblok)
- [styles](#styles)
- [Images](#images)
- [JavaScript](#javascript)
- [TypeScript](#typescript)
- [Environment variables](#environment-variables)
- [Commands](#commands)
- [Web Components](#web-components)


## Live Preview
https://kawusia-coffee-bar.netlify.app/

## Project Description
This project serves as an example of the template to build portfolio/product/blog websites. It is completely static which means it doesn't need a server and during the build time it generates all the files needed for the website to work.

For a good and quick introduction to storyblok-astro.js integration, you can go through (The Storyblok Astro Ultimate Tutorial)[https://www.storyblok.com/tp/the-storyblok-astro-ultimate-tutorial].

## Quickstart
- `npm install`
- `touch .env` => add variables described in [Environment variables](#environment-variables) section.
- Create a new Storyblok space, choose a billing plan, find space ID, and generate a new token.

  ![quickstart](https://github.com/MichalRsa/freelance-sample-page/assets/73226214/a0e59c5f-3584-495c-97ca-3136a97111dd)
  ![quickstart2](https://github.com/MichalRsa/freelance-sample-page/assets/73226214/bccf0c31-1be0-41a9-803b-34277840d8eb)

- `npm run prepare-space` => select `import data to a new space`. Proceed with the installer.
- Add localhost to Preview URL

  ![quickstart3](https://github.com/MichalRsa/freelance-sample-page/assets/73226214/349894ff-84f3-45a5-a393-98ebc442a30e)
  ![quickstart4](https://github.com/MichalRsa/freelance-sample-page/assets/73226214/77f17113-3389-48f8-9203-321080dde8b9)

`npm run dev`

## Internationalization
The project uses field-level translations. Most of the stories' fields are already translated. To use translated fields, add language in settings:

![quickstart5](https://github.com/MichalRsa/freelance-sample-page/assets/73226214/074654aa-f768-4895-824c-3371757036fd)


### Its key components are:

- **Astro.js** as an HTML-first framework gives things like JSX-like syntax, modules, and fenced js that run during the build time. If you before made such a project with React.js/Next.js. And you see it as too much for this kind of work, dealing with state, effects, useRefs, client site navigation, and shipping all the stuff as a JS bundle. Astro.js can feel like a big relief. It leaves the best part of React DX and gets rid of all bloated stuff, that you probably will never need in this kind of project. 
- **TailwindCSS** will allow us to build pretty much reusable components. And if the too much logic in the components is not an issue in this kind of website. We will just write all styles in line with no harm to readability.
- **Storyblok** is a great choice for editing as a nontechnical person, through a visual editor you can modify each Page, Section of the Page, and each component. It also gives us a lifetime free tier for one user, even for commercial purposes. 
- Hosting on **Netlify**. Simple. GitHub and Storyblok integrations give us enough space to push our builds on code change and Storyblok content change. A free tier also allows us to build commercial projects and gives 100GB bandwidth, which is suitable for small websites.

## Project Structure

Inside of the project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   └── [...slug].astro
│   ├── storyblok/
│   │   └── *.astro
│   ├── styles/
│   └── utils/
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. However, to build pages we get data from the Storyblok. that's why there is only one file `[...slug].astro`. We treat Storyblok's `Page` stories as a data source.

In the `storyblok/` directory we keep all the Storyblok stories. Which then we have to register in an `astro.config.mjs` file.


There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Website update

The website will be updated on push to `main` or through the Stroyblok hook when you update, add or remove a story.

## Generating types for Storyblok
Each time you change the  of Storyblok's block you have to generate types for the app

To do that you have to install `npm i -g storyblok`. Then log in with your user's credentials. 

In the project root directory run `storyblok pull-components --space 277873h` Where `277873h` is your space id. Then run `npm run generate-sb-types`

[Full tutorial can be found here ](https://www.storyblok.com/faq/how-can-i-utilize-typescript-in-my-storyblok-project)

## Styles 

The majority of styles are written in TailwindCSS. font families, font sizes, and colors were overridden in the `tailwind.config.mjs`. With this config, there is no possibility to use the default ones eg. `bg-red200`.  

## Images

Astro.js offers an `Image` component we can use and with the netlify config under the `netlify.toml` we can get automatic optimization (converting images to webp or avif format, image compression, avoiding Cumulative Layout Shift). therefore avoid using pure `<img />` tag.

For the full guide to work with images in the Astro project, [check the official documentation](https://docs.astro.build/en/guides/images/)

## JavaScript
The project does not use any frontend library in place its needed we can use the native `<script />` tag.

## TypeScript

TypeScript is supported across `.tsx` and `.astro` files.


## Environment variables

From now on, the project requires only three environments:

```
STORYBLOK_TOKEN=<your_accont's_preview_token>
STORYBLOK_IS_PREVIEW=<yes/no>
STORYBLOK_ENV=<development/production>
```


## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run generate-sb-types`|Generaty types for Storyblok component based on components.277873.json file|
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## Web Components

When using reusable components that include JavaScript logic, the project relies on (Native Web Components)[https://docs.astro.build/en/guides/client-side-scripts/#web-components-with-custom-elements](Without UI Framework). The example can be seen in `/src/storyblok/FaqCard.astro`
