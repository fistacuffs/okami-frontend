/**
 * SearchBar.js
 *
 * This is the search bar component of the application. It allows users to
 * search for any currency in the master coin list and will offer suggestions
 * based on their input. When they click the button, they will be directed to
 * page view for that coin or alerted that it cannot be found.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {
  Button,
  Col,
  Row } from 'reactstrap';

import { globalvars } from '../globalvars';
import { viewEnum } from '../constants';
import './Components.css';


/**
 * escapeRegexCharacters:
 * function used by Autosuggest component to handle regex escape characters.
 *
 * @param str: the string to be parsed
 */
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} // end escapeRegexCharacters()


/**
 * getSuggestions:
 * function used by Autosuggest component to get search suggestions
 *
 * @param value: a string on which suggestions are based
 */
function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  } // end if

  const regex = new RegExp(`^${escapedValue}`, 'i');

  return globalvars.coinList.filter(coin => regex.test(coin.name));
} // end getSuggestions()


/**
 * getSuggestionValue:
 * function used by Autosuggest component to get name string from suggestion
 *
 * @param suggestion: object containing name string
 */
function getSuggestionValue(suggestion) {
  return suggestion.name;
} // end getSuggestionValue()


/**
 * renderSuggestion:
 * function used by Autosuggest component to make JSX object of string data
 *
 * @param suggestion: object to be rendered
 */
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  ); // end return()
} // end renderSuggestion()


export class SearchBar extends React.Component {
  /**
   * @constructor
   * SearchBar constructor
   * -initializes state properties for value, suggestion array and message
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      message: '',
    }; // end state

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested
      = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested
      = this.onSuggestionsClearRequested.bind(this);
    this.findCoin = this.findCoin.bind(this);
  } // end constructor


  /**
   * onChange:
   * method changes the state property value of 'this' component
   *
   * @param event: event that triggers change
   * @param newValue: the new string value for value
   */
  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
      message: '',
    }); // end setState()
  } // end onChange()


  /**
   * onSuggestionsFetchRequested:
   * method required by Autosuggest component
   *
   * @param value: the value to test against possible suggestions
   */
  onSuggestionsFetchRequested({ value }) {
    // use promise to make sure coin list has loaded
    globalvars.coinListPromise
      .then(() => {
        this.setState({
          suggestions: getSuggestions(value),
        }); // end setState()
      }); // end then()
  } // end onSuggestionsFetchRequested()


  /**
   * onSuggestionsClearRequested:
   * method required by Autosuggest component
   */
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    }); // end setState()
  } // end onSuggestionsClearRequested()


  /**
   * findCoin:
   * method to redirect user to the page view for the coin searched when the
   * button is clicked or to notify them it was not found
   */
  findCoin() {
    // use promise to make sure coin list has loaded
    globalvars.coinListPromise.then(() => {
      const foundCoin =
        globalvars.coinList.find(coin => coin.name === this.state.value);
      // test if coin was found
      if (foundCoin === undefined) {
        // test if any input was entered
        if (!this.state.value) {
          this.setState({
            message: <h4>search field is empty</h4>,
          }); // end setState()
        } else {
          this.setState({
            message: <h4><b><em>{this.state.value}</em></b> was not found</h4>,
          }); // end this.setState()
        } // end if/else
      } else {
        this.props.changePageView(viewEnum.COINPAGE, foundCoin.symbol);
      } // end if/else
    }); // end then()
  } // end findCoin()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'currency name',
      value,
      onChange: this.onChange,
    };

    return (
      <div>
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
        <Row>
          {this.state.message}
        </Row>
      </div>
    ); // end return()
  } // end render()
} // end class SearchBar


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
SearchBar.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default SearchBar;
