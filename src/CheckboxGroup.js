import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

const required = (value, allValues) => {
  // when checkbox is never checked, value is undefined
  // when checkbox is checked once, value turns into an array
  if (value === undefined || value.length === 0) return "Required";
};

export default class CheckboxGroup extends Component {
  // Some intense props checking
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired
  };
  // field inherits Field component inputs
  field = ({ input, meta, options }) => {
    const { name, onChange, onBlur } = input;
    const { touched, error } = meta;
    const inputValue = input.value;

    // Build the checkboxes
    const checkboxes = options.map(({ label, value }, index) => {
      // Handle change
      const handleChange = event => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          // remove unchecked value from array
          arr.splice(arr.indexOf(value), 1);
        }
        onBlur(arr); // Fix some touched problem
        return onChange(arr);
      };

      // check if its the right value
      const checked = inputValue.includes(value);

      return (
        <label key={`checkbox-${index}`}>
          <input
            type="checkbox"
            name={`${name}[${index}]`}
            value={value}
            checked={checked}
            onChange={handleChange}
          />
          <span>{label}</span>
        </label>
      );
    });
    return (
      <div>
        <div>{checkboxes}</div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return (
      <Field
        {...this.props}
        type="checkbox"
        component={this.field}
        validate={[required]}
      />
    );
  }
}
