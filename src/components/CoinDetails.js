/**
 * CoinDetails.js
 *
 * This component will be used by the coin page view to display more details
 * about the coin. It will handle loading the data from the API as well.
 */
import React from 'react';


export class CoinDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false,
      imageLoaded: true,
    } // end state
  } // end constructor


  render() {
    return <div>this.state.dataLoaded</div>;
  } // end render()
} // end class CoinDetails


export default CoinDetails;
