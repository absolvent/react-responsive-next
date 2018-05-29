// explicitly naming exports because webpack doesn't tree-shake 'export * from'
// correctly
export {
  MediaQueryWrapper, responsiveWrapper,
  Show, Hide,
  PhoneScreen, PhoneAndTabletScreen, TabletScreen, TabletAndUpScreen, DesktopAndUpScreen,
} from './components'
export { defaultConfig } from './default-config';
export { hoc as ReactResponsiveConnect } from './hoc';
