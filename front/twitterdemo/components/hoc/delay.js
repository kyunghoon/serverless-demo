import React from 'react';

export default delayInMSecs => Wrapped => {
  class Delay extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isWaiting: true };
    }
    componentDidMount() {
      this.timeoutId = null;
    }
    componentWillReceiveProps(_nextProps) {
      this.setState({ isWaiting: true });
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.timeoutId = setTimeout(() => {
        this.setState({ isWaiting: false });
      }, delayInMSecs);
    }
    componentWillUnmount() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
    render() {
      if (this.state.isWaiting) {
        return null;
      } else {
        return <Wrapped {...this.props} />;
      }
    }
  }
  return Delay;
};
