/* const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];
*/
import React from 'react';
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

  const regex = new RegExp(`^${escapedValue}i`);

  return globalvars.coinListPromise
    .then(
      () => globalvars.coinList.filter(coin => regex.test(coin.name)),
      () => console.log('Error with coin list'),
    )
    .catch(() => []);
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
    this.setState({
      suggestions: getSuggestions(value),
    });
  }; // end onSuggestionsFetchRequested()


  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }; // end onSuggestionsClearRequested()


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
          <Button className="search-button">
            FIND COIN
          </Button>
        </Col>
      </Row>
    );
  } // end render()
} // end class SearchBar


export default SearchBar;
