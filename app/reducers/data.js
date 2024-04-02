import * as actionTypes from '@/actions/actionTypes';

const initialState = {
  collections: [],
  announcements: [],
  datasets: [],
  documents: [],
  documentTypes: [],
  documentVideos: [],
  news: [],
  tags: [],
  datas: [],
  attributes: [],
  metadatas: [],
  favourites: [],
  publications: [],
  authors: [],
  resources: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.collections,
      };
    case actionTypes.SET_ANNOUNCEMENT:
      return {
        ...state,
        announcements: action.announcements,
      };
    case actionTypes.SET_DATASETS:
      return {
        ...state,
        datasets: action.datasets,
      };
    case actionTypes.SET_DOCUMENTS:
      return {
        ...state,
        documents: action.documents,
      };
    case actionTypes.SET_NEWS:
      return {
        ...state,
        news: action.news,
      };
    case actionTypes.SET_TAGS:
      return {
        ...state,
        tags: action.tags,
      };
    case actionTypes.SET_DATAS:
      return {
        ...state,
        datas: action.datas,
      };
    case actionTypes.SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.attributes,
      };
    case actionTypes.SET_METADATA:
      return {
        ...state,
        metadatas: action.metadatas,
      };
    case actionTypes.SET_FAVOURITE:
      return {
        ...state,
        favourites: action.favourites,
      };
    case actionTypes.SET_PUBLICATION:
      return {
        ...state,
        publications: action.publications,
      };
    case actionTypes.SET_DOCUMENT_TYPES:
      return {
        ...state,
        documentTypes: action.documentTypes,
      };
    case actionTypes.SET_DOCUMENT_VIDEOS:
      return {
        ...state,
        documentVideos: action.documentVideos,
      };
    case actionTypes.SET_AUTHORS:
      return {
        ...state,
        authors: action.authors,
      };
    case actionTypes.SET_RESOURCES:
      return {
        ...state,
        resources: action.resources,
      };
    default:
      return state;
  }
};
