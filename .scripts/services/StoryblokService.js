import StoryblokClient from "storyblok-js-client";

const userToken = process.env.STORYBLOK_USER_AUTH_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

const Storyblok = new StoryblokClient({
  oauthToken: userToken,
});

const getStories = () => Storyblok.get(`/spaces/${spaceId}/stories/`, {});

const getComponents = () => Storyblok.get(`/spaces/${spaceId}/components/`, {});

const getStory = (id) => Storyblok.get(`/spaces/${spaceId}/stories/${id}`, {});

const getComponentGroups = () =>
  Storyblok.get(`/spaces/${spaceId}/component_groups/`, {});

const postComponentGroups = (name) =>
  Storyblok.post(`/spaces/${spaceId}/component_groups/`, {
    component_group: {
      name,
    },
  });

const postComponent = (component) =>
  StoryblokClient.post(`/spaces/${spaceId}/components/`, {
    component,
  });

const postStory = (story) =>
  StoryblokClient.post(`/spaces/${spaceId}/stories`, {
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
