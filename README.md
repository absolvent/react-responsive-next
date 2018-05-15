# react-responsive-next v0.8.0

## Project Idea

Add a simple to use tool to detect user media serve content adapted to the browser size and the device.

It's based on the [react-responsive-redux](https://github.com/modosc/react-responsive-redux) project but without using the redux.

 ### How does it work

`react-responsive-next` combines several pieces together to detect the device and the resolution:
1. The `User-Agent` string is sniffed to get a reasonable guess of the client's screen size
2. Detected size is being passed over HOC component to the react-responsive-next HOC component through Next.js page 
and you can use helper components to differentiate content on a specific media.
3. When browser is running - react-responsive is being used to detect more accurate media info by css media queries. Detected size 
is being stored in a session cookie.
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
        <div>
          Content on all screens
        </div>
        <Show on={'sm'}>
          <div>
            Show content on small screens
          </div>
        </Show>
        <Show on={'md'}>
          <div>
            Show content on medium screens
          </div>
        </Show>
        <Show on={'lg'}>
          <div>
            Show content on large screens
          </div>
        </Show>
        <Show from={'md'}>
          <div>
            Show content on medium and large screens
          </div>
        </Show>
        <Show to={'md'}>
          <div>
            Show content on small and medium screens
          </div>
        </Show>
        <Hide on={'sm'}>
          <div>
            Hide content only on small screen
          </div>
        </Hide>
        <Hide to={'md'}>
          <div>
            Hide content on small and medium screens
          </div>
        </Hide>
      </div>
    );
  }
}

export default ReactResponsiveConnect(IndexPage);
```

#### Default config
By default below config is being used with defined named ranges as `sm` (small), 
`md` (medium), `lg` (large) which can be used in `Show`/`Hide` components.
```javascript
{
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
}
```

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
      <div>
        <div>
          Content on all screens
        </div>
        <Show on={'sm'}>
          <div>
            Show content on small screens
          </div>
        </Show>
        <Show on={'md'}>
          <div>
            Show content on medium screens
          </div>
        </Show>
        <Show on={'lg'}>
          <div>
            Show content on large screens
          </div>
        </Show>
        <Show from={'md'}>
          <div>
            Show content on medium and large screens
          </div>
        </Show>
        <Show to={'md'}>
          <div>
            Show content on small and medium screens
          </div>
        </Show>
        <Hide on={'sm'}>
          <div>
            Hide content only on small screen
          </div>
        </Hide>
        <Hide to={'md'}>
          <div>
            Hide content on small and medium screens
          </div>
        </Hide>
      </div>
    );
  }
}

export default ReactResponsiveConnect(IndexPage);
```

#### Legacy components
*WARNING:* Previously available predefined components won't work correctly with a customConfig.
They are deprecated and should be replaced with a `Show` components 

##### List of deprecated components and proposed replacements:
| Legacy component        |      | New component
| ----------------:       | ---- | -------------------
| `<PhoneScreen>`         | `->` | `<Show on={'sm'}>`   
| `<TabletScreen>`        | `->` | `<Show on={'md'}>`   
| `<DesktopAndUpScreen>`  | `->` | `<Show on={'lg'}>`
| `<PhoneAndTabletScreen>`| `->` | `<Show to={'md'}>`
| `<TabletAndUpScreen>`   | `->` | `<Show from={'md'}>`

