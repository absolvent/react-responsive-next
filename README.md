# react-responsive-next v0.8.0

## Project Idea
Add a simple to use tool to detect user media and then serve content adapted to the browser size and the device.
It's based on the [react-responsive-redux](https://github.com/modosc/react-responsive-redux) project but without using the redux.

## Browser Support
| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :---------: | :---------: | :---------: | :---------: | :---------: |
| Yes | 10+ | Yes | 9+ | Yes |


 ### How does it work

`react-responsive-next` combines several pieces together to detect the device and the resolution:
1. The `User-Agent` string is sniffed to get a reasonable guess of the client's screen size
2. Detected size is being passed over HOC component to the react-responsive-next HOC component through Next.js page then you can use helper components to differentiate content on a specific media.
3. When browser is running - react-responsive is being used to detect more accurate media info by css media queries. Detected size is being stored in a session cookie.
4. On the page reload value from cookie is being used to render appropriate content on the server side.


## Installation
Install with or [yarn](https://yarnpkg.com):
```
yarn add https://github.com/absolvent/react-responsive-next.git
```

## Usage
To use `react-responsive-next` you need to do the following:
1. Import `ReactResponsiveConnect` HOC component from `react-responsive-next`
2. Wrap your Next.js page component with `ReactResponsiveConnect`
3. Use helper components `Show` or `Hide` to differentiate the content

#### ES6 Example
```javascript
import React from 'react';
import { ReactResponsiveConnect, Show, Hide } from 'react-responsive-next';

class IndexPage extends React.PureComponent {

  render() {
    return (
      <div>
        <Show on={'sm'}>
          <div>
            Show content only on small screen
          </div>
        </Show>
        <Hide on={'md'}>
          <div>
            Hide content only for medium screens
          </div>
        </Hide>
      </div>
    );
  }
}

export default ReactResponsiveConnect(IndexPage);
```
Components can receive device alias that is passed by props for example:
`<Show on={'sm'}>`

But you can also define range  by passing props `from` and  `to` for example:
`<Show from={'sm'} to={'md'}>`

#### Default config
By default below config is being used with defined named ranges as `sm` (small), 
`md` (medium), `lg` (large) which can be used in `Show`/`Hide` components.

|Alias|Range|Device mapping
|-|-|-|
|sm|0 - 767px|phone|
|md|768px - 1239px|tablet / car|
|lg|1240px - ∞|desktop / tv / bot / undefined|

#### Using the customConfig
```javascript
import React from 'react';
import { ReactResponsiveConnect, Show, Hide } from 'react-responsive-next';

ReactResponsiveConnect.customConfig = {
  breakPoints: {
    sm: { to: 500 },
    md: { from: 501, to: 1279 },
    lg: { from: 1280 },
  },
  devicesToBreakPoints: {
    phone: 'sm',
    tablet: 'md',
    car: 'md',
    desktop: 'lg',
    tv: 'lg',
    bot: 'lg',
    undefined: 'lg',
  },
};

class IndexPage extends React.PureComponent {

  render() {
    return (
      ...
    );
  }
}

export default ReactResponsiveConnect(IndexPage);
```

#### Legacy components
*WARNING:* Previously available predefined components won't work correctly with a customConfig. They are deprecated and should be replaced with a `Show` components 

##### List of deprecated components and proposed replacements:
| Legacy component        |      | New component
| ----------------:       | ---- | -------------------
| `<PhoneScreen>`         | `->` | `<Show on={'sm'}>`   
| `<TabletScreen>`        | `->` | `<Show on={'md'}>`   
| `<DesktopAndUpScreen>`  | `->` | `<Show on={'lg'}>`
| `<PhoneAndTabletScreen>`| `->` | `<Show to={'md'}>`
| `<TabletAndUpScreen>`   | `->` | `<Show from={'md'}>`
