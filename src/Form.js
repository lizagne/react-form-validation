import React, { Component } from 'react';
import { FormErrors } from './components/FormErrors';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      formErrors: {name: ''},
      nameValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;


    switch(fieldName) {
      case 'name':
        nameValid = value.match(/^[a-zA-Z][a-zA-Z0-9 \-']+$/);
        fieldValidationErrors.name = nameValid ? '' : ' can only include, letters, numbers, hyphens and apostrophes';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="demoForm">
        <div className="panel panel-default">
          <FormErrors formErrors={ this.state.formErrors } />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
          <label htmlFor="email">Team Player Name</label>
          <input type="text" required className="form-control" name="name"
            placeholder="Name"
            value={ this.state.name }
            onChange={ this.handleUserInput }  />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Add Player</button>
      </form>
    )
  }
}

export default Form;