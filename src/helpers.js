import { TAG } from './default-config';

const getMediaByType = (mediaType, media) => {
  if (media[mediaType]) {
    return media[mediaType];
  }
  return media.desktop;
};

export const getMediaDefaultWidthByType = (mediaType, media) => {
  const mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.minWidth ? mediaItem.minWidth : -1;
};

export const getMediaMinWidthByType = (mediaType, media) => {
  const mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.minWidth ? mediaItem.minWidth : -1;
};

export const getMediaMaxWidthByType = (mediaType, media) => {
  const mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.maxWidth ? mediaItem.maxWidth : -1;
};


export const mediaQueryBuilder = (from, to) => {
  const mediaQueryParts = [];
  const fromNumeric = Number(from);
  const toNumeric = Number(to);

  if (!Number.isNaN(fromNumeric)) mediaQueryParts.push(`(min-width: ${from}px)`);
  if (!Number.isNaN(toNumeric)) mediaQueryParts.push(`(max-width: ${to}px)`);

  if (!Number.isNaN(fromNumeric) && !Number.isNaN(toNumeric) && fromNumeric > toNumeric) {
    throw new Error(`${TAG} from (${fromNumeric}) value is larger than to (${toNumeric}) value`)
  }

  return mediaQueryParts.join(' and ');
};

export const isString = value => (typeof value === 'string' || value instanceof String);
export const isStringOrNumber = value => ((typeof value === 'string' || value instanceof String) || !Number.isNaN(Number(value)));
