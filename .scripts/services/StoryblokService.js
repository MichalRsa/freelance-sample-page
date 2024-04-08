import StoryblokClient from "storyblok-js-client";

export const initStoryblokClient = (spaceId, userToken) => {
  const Storyblok = new StoryblokClient({
    oauthToken: userToken,
  });

  const getStories = () => Storyblok.get(`/spaces/${spaceId}/stories/`, {});

  const getComponents = () =>
    Storyblok.get(`/spaces/${spaceId}/components/`, {});

  const getStory = (id) =>
    Storyblok.get(`/spaces/${spaceId}/stories/${id}`, {});

  const getComponentGroups = () =>
    Storyblok.get(`/spaces/${spaceId}/component_groups/`, {});

  const postSpace = (space) => Storyblok.post("/spaces/", space);

  const postComponentGroups = (name) =>
    Storyblok.post(`/spaces/${spaceId}/component_groups/`, {
      component_group: {
        name: name,
      },
    });

  const postComponent = (component) =>
    Storyblok.post(`/spaces/${spaceId}/components/`, component);

  const postStory = (story) =>
    Storyblok.post(`/spaces/${spaceId}/stories`, {
      story,
    });

  const deleteStory = (id) =>
    Storyblok.delete(`/spaces/${spaceId}/stories/${id}`);

  const deleteComponent = (id) =>
    Storyblok.delete(`/spaces/${spaceId}/components/${id}`);

  return {
    getStories,
    getComponents,
    getStory,
    getComponentGroups,
    postSpace,
    postComponentGroups,
    postComponent,
    postStory,
    deleteStory,
    deleteComponent,
  };
};
