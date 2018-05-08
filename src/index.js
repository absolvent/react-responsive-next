// explicitly naming exports because webpack doesn't tree-shake 'export * from'
// correctly
export {
  MediaQueryWrapper, responsiveWrapper,
  PhoneScreen, PhoneAndTabletScreen, TabletScreen, TabletAndUpScreen, DesktopAndUpScreen,
} from './components'
export { breakPoints } from './defaults';
export { hoc as ReactResponsiveConnect } from './hoc';
