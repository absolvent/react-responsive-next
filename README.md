# react-responsive-next v0.7.0

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
3. Use helper components like `DesktopScreen` or `TabletScreen` to differentiate the content

#### ES6 Example
```javascript
import React from 'react';
import { ReactResponsiveConnect, PhoneScreen, DesktopScreen, TabletScreen, PhoneTabletScreen, TabletDesktopScreen } from 'react-responsive-next';

class IndexPage extends React.PureComponent {

  render() {
    return (
        <div>
          <div>Content on all media</div>
          <PhoneScreen>
            Content only on a phone
          </PhoneScreen>
          <TabletScreen>
            Content only on a tablet
          </TabletScreen>
          <DesktopScreen>
            Content only on a desktop
          </DesktopScreen>
          <TabletDesktopScreen>
            Content on a tablet and a desktop
          </TabletDesktopScreen>
          <PhoneTabletScreen>
            Content on a phone and a tablet
          </PhoneTabletScreen>
        </div>
    );
  }
}

export default ReactResponsiveConnect(IndexPage);
```



