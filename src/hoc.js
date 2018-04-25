const React = require('react');
import { MediaQueryWrapper } from './components';

export const hoc = (WrappedComponent, options) => class ReactResponsiveNextHoc extends React.Component {

  static async getInitialProps(args = {}) {
    let newProps = {
      env: {},
    };

    if (args && args.req) {
      //newProps.env = getVariables(args, options);
    } else {
      //newProps.env = getVariables({}, options);
    }
    const newArgs = {
      ...args,
      ...newProps,
    };
    if (WrappedComponent.getInitialProps) {
      newProps = {
        ...newProps,
        ...await WrappedComponent.getInitialProps(newArgs),
      };
    }
    MediaQueryWrapper.fakeWidth = 800;
    return newProps;
  }
  //constructor && componentWillMount: in case getInitialProps isn't called
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      env: {},
    };
  }
  /* istanbul ignore next */
  // componentWillMount() {
  //   if (!this.props.env) {
  //     this.setState({
  //       env: getVariables({}, {
  //         ...options,
  //         debug: false,
  //       }),
  //     });
  //   }
  // }
  /* istanbul ignore next */
  render() {
    return <WrappedComponent  {...this.state} {...this.props} />;
  }
};
