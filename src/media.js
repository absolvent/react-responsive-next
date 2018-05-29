// Must be correlated with devices-sizes entries !
import { mediaQueryBuilder } from './helpers';
import { TAG } from './default-config';

const createMediaFromBreakPoint = (breakPoint) => {
  const minWidth = !Number.isNaN(Number(breakPoint.from)) ? breakPoint.from : 1;
  const maxWidth = !Number.isNaN(Number(breakPoint.to)) ? breakPoint.to : Number.MAX_SAFE_INTEGER;
  return {
    mediaQuery: mediaQueryBuilder(breakPoint.from, breakPoint.to),
    minWidth,
    maxWidth,
    defaultWidth: minWidth,
  };
};

export const getMedia = (config) => {
  const { breakPoints, devicesToBreakPoints } = config;
  if (breakPoints === undefined) throw new Error(`${TAG} No breakPoints entry in react-responsive-next config`);
  if (devicesToBreakPoints === undefined) throw new Error(`${TAG} No devicesToBreakPoints entry in react-responsive-next config`);

  const media = {};

  Object.keys(breakPoints).forEach((type) => {
    media[type] = createMediaFromBreakPoint(breakPoints[type]);
  });
  Object.keys(devicesToBreakPoints).forEach((deviceType) => {
    if (media[deviceType]) throw new Error(`${TAG} ${deviceType} already defined in config.breakPoints`);
    if (!media[devicesToBreakPoints[deviceType]]) throw new Error(`${TAG} Breakpoint ${devicesToBreakPoints[deviceType]} from ${deviceType} doesn't exists in config.breakPoints`);
    media[deviceType] = media[devicesToBreakPoints[deviceType]];
  });
  return media;
};
