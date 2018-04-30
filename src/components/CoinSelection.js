/**
 * CoinSelection.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'reactstrap';

import { globalvars } from '../globalvars';
import { viewEnum } from '../constants';


export class CoinSelection extends React.Component {
  renderButtons() {
    const buttons = [];

    for (let i = 0; i < this.props.coinData.length; i += 1) {
      const buttonText =
        `${this.props.coinData[i].symbol}:` +
        `${this.props.coinData[i].name}     ` +
        `$${this.props.coinData[i].price}`;

      buttons.push((
        <Row key={i}>
          <Button
            className="coin-button"
            onClick={
              () => this.props
              .changePageView(viewEnum.COINPAGE, this.props.coinData[i].symbol)
            } // end onClick function
            key={i}
          >
            {buttonText}
          </Button>
        </Row>
      ));
    } // end for

    return buttons;
  } // end makeButtons()


  render() {
    const heading = () => {
      if (globalvars.isLoggedIn()) {
        return <h3>YOUR CURRENCIES</h3>;
      }
      return <h3>CURRENCIES</h3>;
    }; // end heading()

    return (
      <div className="coin-selection">
        {heading()}
        {this.renderButtons()}
      </div>
    ); // end return
  } // end render()
} // end class CoinSelection


CoinSelection.propTypes = {
  coinData: PropTypes.arrayOf(PropTypes.object).isRequired,
  changePageView: PropTypes.func.isRequired,
};


export default CoinSelection;
