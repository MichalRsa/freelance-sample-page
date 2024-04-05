import StoryblokClient from "storyblok-js-client";

const userToken = process.env.STORYBLOK_USER_AUTH_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

const destinationUserToken = process.env.DESTINATION_STORYBLOK_USER_AUTH_TOKEN;
const destinationSpaceId = process.env.DESTINATION_STORYBLOK_SPACE_ID;

const Storyblok = new StoryblokClient({
  oauthToken: userToken,
});

const importStoryblok = new StoryblokClient({
  oauthToken: destinationUserToken,
});

const getStories = () => Storyblok.get(`/spaces/${spaceId}/stories/`, {});

const getComponents = () => Storyblok.get(`/spaces/${spaceId}/components/`, {});

const getStory = (id) => Storyblok.get(`/spaces/${spaceId}/stories/${id}`, {});

const getComponentGroups = () =>
  importStoryblok.get(`/spaces/${destinationSpaceId}/component_groups/`, {});

const postComponentGroups = (name) =>
  importStoryblok.post(`/spaces/${destinationSpaceId}/component_groups/`, {
    component_group: {
      name: name,
    },
  });

const postComponent = (component) =>
  importStoryblok.post(`/spaces/${destinationSpaceId}/components/`, component);

const postStory = (story) =>
  importStoryblok.post(`/spaces/${destinationSpaceId}/stories`, {
    story,
  });

export default {
  getStories,
  getComponents,
  getStory,
  getComponentGroups,
  postComponentGroups,
  postComponent,
  postStory,
};
