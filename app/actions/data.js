import * as actionTypes from './actionTypes';

export const setCollections = (collections) => {
  return {
    type: actionTypes.SET_COLLECTIONS,
    collections,
  };
};
export const setAnnouncements = (announcements) => {
  return {
    type: actionTypes.SET_ANNOUNCEMENT,
    announcements,
  };
};
export const setDatasets = (datasets) => {
  return {
    type: actionTypes.SET_DATASETS,
    datasets,
  };
};
export const setDocuments = (documents) => {
  return {
    type: actionTypes.SET_DOCUMENTS,
    documents,
  };
};
export const setNews = (news) => {
  return {
    type: actionTypes.SET_NEWS,
    news,
  };
};

export const setTags = (tags) => {
  return {
    type: actionTypes.SET_TAGS,
    tags,
  };
};

export const setDatas = (datas) => {
  return {
    type: actionTypes.SET_DATAS,
    datas,
  };
};

export const setAttributes = (attributes) => {
  return {
    type: actionTypes.SET_ATTRIBUTES,
    attributes,
  };
};

export const setMetadatas = (metadatas) => {
  return {
    type: actionTypes.SET_METADATA,
    metadatas,
  };
};

export const setFavourite = (favourites) => {
  return {
    type: actionTypes.SET_FAVOURITE,
    favourites,
  };
};

export const setPublication = (publications) => {
  return {
    type: actionTypes.SET_PUBLICATION,
    publications,
  };
};

export const setDocumentType = (documentTypes) => {
  return {
    type: actionTypes.SET_DOCUMENT_TYPES,
    documentTypes,
  };
};

export const setDocumentVideo = (documentVideos) => {
  return {
    type: actionTypes.SET_DOCUMENT_VIDEOS,
    documentVideos,
  };
};

export const setAuthor = (authors) => {
  return {
    type: actionTypes.SET_AUTHORS,
    authors,
  };
};

export const setResource = (resources) => {
  return {
    type: actionTypes.SET_RESOURCES,
    resources,
  };
};
