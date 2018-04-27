/**
 * SearchBar.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { Button, Col, Row } from 'reactstrap';

import { globalvars } from '../globalvars';
import './Components.css';


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} // end escapeRegexCharacters()


function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(`^${escapedValue}`, 'i');

  return globalvars.coinList.filter(coin => regex.test(coin.name));
} // end getSuggestions()


function getSuggestionValue(suggestion) {
  return suggestion.name;
} // end getSuggestionValue()


function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
} // end renderSuggestion()


export class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  } // end constructor


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  }; // end onChange()


  onSuggestionsFetchRequested = ({ value }) => {
    globalvars.coinListPromise
      .then(() => {
        this.setState({
          suggestions: getSuggestions(value),
        });
      });
  }; // end onSuggestionsFetchRequested()


  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }; // end onSuggestionsClearRequested()


  findCoin = () => {
    let coinSymbol;
    globalvars.coinListPromise.then(() => {
      coinSymbol = globalvars.coinList
        .find(coin => coin.name === this.state.value).symbol;
      if (coinSymbol === undefined) {
        alert(`${this.state.value} was not found`);
      } else {
        this.props.changeViewToCoinPage(coinSymbol);
      } // end if/else
    });
  } // end findCoin()


  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'currency name',
      value,
      onChange: this.onChange,
    };

    return (
      <Row>
        <Col>
          <Autosuggest
            className="search-bar"
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </Col>
        <Col>
          <Button
            className="search-button"
            onClick={this.findCoin}
          >
            FIND COIN
          </Button>
        </Col>
      </Row>
    );
  } // end render()
} // end class SearchBar


SearchBar.propTypes = {
  changeViewToCoinPage: PropTypes.func.isRequired,
};


export default SearchBar;
