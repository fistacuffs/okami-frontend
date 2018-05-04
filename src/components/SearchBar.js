/**
 * @file
 * SearchBar.js
 * This is the search bar component of the application. It allows users to
 * search for any currency in the master coin list and will offer suggestions
 * based on their input. When they click the button, they will be directed to
 * page view for that coin or alerted that it cannot be found.
 *
 * @author Nicholas Weitzel
 * @since 1.0.0
 */
import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader } from 'reactstrap';

import { globalvars } from '../globalvars';
import { viewEnum } from '../constants';
import './Components.css';


/**
 * escapeRegexCharacters:
 * This function is used by Autosuggest component to handle regex escape
 * characters.
 *
 * @param str: the string to be parsed
 */
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} // end escapeRegexCharacters()


/**
 * getSuggestions:
 * This function is used by Autosuggest component to get search suggestions.
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
 * This function is used by Autosuggest component to get a name string from
 * suggestion.
 *
 * @param suggestion: object containing name string
 */
function getSuggestionValue(suggestion) {
  return suggestion.name;
} // end getSuggestionValue()


/**
 * renderSuggestion:
 * This function is used by Autosuggest component to make a JSX object of string
 * data.
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
   * -initializes state properties for value, suggestion array, modal, and
   *  message
   * -binds methods onChange, onKeyDown, onSuggestionsClearRequested
   *  onSuggestionsFetchRequested and toggle to 'this' component
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      message: '',
      modal: false,
    }; // end state

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSuggestionsFetchRequested
      = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested
      = this.onSuggestionsClearRequested.bind(this);
    this.findCoin = this.findCoin.bind(this);
    this.toggle = this.toggle.bind(this);
  } // end constructor


  /**
   * onChange:
   * This method changes the state property value of 'this' component.
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
   * This method is required by Autosuggest component.
   *
   * @param value: the value to test against possible suggestions
   */
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
    }); // end setState()
  } // end onSuggestionsFetchRequested()


  /**
   * onSuggestionsClearRequested:
   * This method is required by Autosuggest component.
   */
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    }); // end setState()
  } // end onSuggestionsClearRequested()


  /**
   * onKeyDown:
   * This method will trigger the search to execute when the enter key is
   * pressed during while typing in the search bar.
   */
  onKeyDown(e) {
    if (e.keyCode === 13) {
      // stop propagation
      e.preventDefault();
      e.stopPropagation();
      this.findCoin();
    } // end if
  } // end onKeyDown()


  /**
   * toggle:
   * This method will toggle the modal between view and hidden.
   */
  toggle() {
    this.setState({
      modal: !this.state.modal,
    }); // end setState()
  } // end toggle


  /**
   * findCoin:
   * This method redirects the user to the page view for the coin searched when
   * the button is clicked or notifies them it was not found.
   */
  findCoin() {
    const foundCoin =
      globalvars.coinList.find(coin => coin.name === this.state.value);
    // test if coin was found
    if (foundCoin === undefined) {
      // test if any input was entered
      if (!this.state.value) {
        this.setState({
          message: 'please enter a search term',
          modal: true,
        }); // end setState()
      } else {
        this.setState({
          message: `${this.state.value}`
            + ' was not found. try another currency name',
          modal: true,
        }); // end this.setState()
      } // end if/else
    } else {
      this.props.changePageView(viewEnum.COINPAGE, foundCoin.symbol);
    } // end if/else
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
      onKeyDown: this.onKeyDown,
    }; // end inputProps

    return (
      <div className="search-bar-container">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <Button
          className="search-bar-button"
          onClick={this.findCoin}
        >
          FIND COIN
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>no search results...</ModalHeader>
          <ModalBody>
            {this.state.message}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>OK</Button>
          </ModalFooter>
        </Modal>
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
