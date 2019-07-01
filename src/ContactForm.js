import React from "react";
import { reduxForm } from "redux-form";
import CheckboxGroup from "./CheckboxGroup";

const ContactForm = props => {
  // these props comes from reduxForm
  const { handleSubmit, pristine, reset, submitting } = props;
  const options = [
    { label: "English", value: "en" },
    { label: "繁體中文", value: "zh-TW" },
    { label: "Tibetan", value: "bo" }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CheckboxGroup name="langs" options={options} />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "fieldArrays" // a unique identifier for this form
})(ContactForm);
