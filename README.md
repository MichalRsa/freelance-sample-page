## Table of contents

- [Project Description](#project-description)
- [Its key components are](#its-key-components-are)
- [Project Structure](#project-structure)
- [Website update](#website-update)
- [Generating types for Storyblok](#generating-styles-for-storyblok)
- [styles](#styles)
- [Images](#images)
- [JavaScript](#javascript)
- [TypeScript](#typescript)
- [Environment variables](#environment-variables)
- [Commands](#commands)

## Project Description
This project serves as a example for template to build portfolio/product/blog websites. Is is complitely static which means it doesnt need a server and during the build time its generating all the file needed for website to work.

### Its key components are:

- **Astro.js** as a HTML first framework gives as things like JSX syntax, modules, fenced js that runs during the build time. If you beofre made such a projects with React.js/Next.js. And you see it as to much for this kind of work, dealing with state, effects, useRefs, client site navigation, and shipping ale the stuff as a JS bundle. Astro.js can feel like a big relieve. It leaves best part of React DX and gets rid of all bloated stuff, that you probably will never need in this kind of projects. 
- **TailwindCSS** will allows us to build pretty much reausable components. And if the too much logic in the components is not a issue in this kind of the website. We will just write all styles inline with no harm to readbility.
- **Storyblok** is great choice for editing as a non technical person, through visual editor you can modify each Page, Section of the Page and each component. It also gives us life time free tier for one user, even for commercial purpose. 
- Hosting on **Netlify**. Really simple. With GitHub and Storyblok integrations, gives as enough space to push our builds on code change and storyblok content change. On a free tier also allows us to build commercial projects and gives 100GB bandwith, which suitable for small websites.

## 🚀 Project Structure

Inside of your the project, you'll see the following folders and files:

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

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. However, to build pages we get a data from the Storyblok. that's why there is the only one file `[...slug].astro`. We treat Storyblok's `Page` stories as a data source.

In `storyblok/` directory we keep all the Storyblok stories. Which then we have to regsiter in a `astro.config.mjs` file.


There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Website update

Website will be udpated on push to `main` or through Stroyblok hook when you update, add or remove story.

## Generating types for Storyblok
Each time you change the structure of Storyblok's block you have to generate types for the app

In order to do that you have to install `npm i -g storyblok`. Then log in with your users credendtials. 

In project root directory run `storyblok pull-components --space 277873h` Where `277873h` is your space id. Then run `npm run generate-sb-types`

[Full tutorial can be found here ](https://www.storyblok.com/faq/how-can-i-utilize-typescript-in-my-storyblok-project)

## Styles 

Majority of styles are written in TailwindCSS. font families, font sizes and colors were overriden in the `tailwind.config.mjs`. With this config there is no possibility to use default ones eg. `bg-red200`.  

## Images

Astro.js offers `Image` component we can use it and with netlify config under the `netlify.toml` we can get automatic optimization (converting images to webp or avif format, image compression, avoiding Cumulative Layout Shift). therefore avoid using pure `<img />` tag.

For the full guide to work with images in Astro project, [check the official documentation](https://docs.astro.build/en/guides/images/)

## JavaScript
The project does not use any frontend library in place its needed we can use native `<script />` tag. If we want to make reusable component with interactivty we can use [browser native custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), you can see example in `FaqCard.astro`.

[See full documentation on scripts](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)

## TypeScript

TypeScript is supported accross `.tsx` and `.astro` files.


## Environment variables

For this now on, project requires only three envs:

```
STORYBLOK_TOKEN=<your_accont's_preview_token>
STORYBLOK_IS_PREVIEW=<yes/no>
STORYBLOK_ENV=<development/production>
```


## 🧞 Commands

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


