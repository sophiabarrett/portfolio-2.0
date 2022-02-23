import { useState } from "react";
import { validateEmail } from "../../utils/helpers";

function Contact() {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [inputErrors, setInputErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  // validate input and return appropriate validation message
  const validateInput = (inputName, inputValue) => {
    if (inputName === "email") {
      const validEmail = validateEmail(inputValue);
      if (!validEmail) {
        return "Please provide a valid email address.";
      }
    }
    if (!inputValue.length) {
      if (inputName === "name") {
        return "Please tell me your name.";
      }
      if (inputName === "message") {
        return "Please let me know how I can help you.";
      }
    }
  };

  // get validation message for individual input and display to user
  const updateInputError = (e) => {
    const validationMessage = validateInput(e.target.name, e.target.value);
    setInputErrors({ ...inputErrors, [e.target.name]: validationMessage });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // create object to hold error messages for all inputs
    const updatedInputErrors = {};
    // create variable to indicate if there are input errors
    let inputErrorsExists;

    // loop through each input to validate and retrieve error message
    for (let input in inputValues) {
      const errMsg = validateInput(input, inputValues[input]);
      if (errMsg) {
        updatedInputErrors[input] = errMsg;
        inputErrorsExists = true;
      } else {
        updatedInputErrors[input] = "";
      }
    }

    // after retrieving all validation messages, update inputErrors state
    setInputErrors({ ...inputErrors, ...updatedInputErrors });

    // only submit if there are no input errors
    if (!inputErrorsExists) {
      console.log(inputValues);

      // clear form
      setInputValues({
        name: "",
        email: "",
        message: "",
      });
    }

    // remove focus from submit button
    document.querySelector("#submit").blur();
  }

  return (
    <section id="contact">
      <div className="title-wrapper">
        <h2>Contact</h2>
      </div>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              className={inputErrors.name && "error"}
              type="text"
              name="name"
              onChange={handleInputChange}
              onBlur={updateInputError}
            />
            <p className="error-message">
              {inputErrors.name ? inputErrors.name : <br />}
            </p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className={inputErrors.email && "error"}
              type="text"
              name="email"
              onChange={handleInputChange}
              onBlur={updateInputError}
            />
            <p className="error-message">
              {inputErrors.email ? inputErrors.email : <br />}
            </p>
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              className={inputErrors.message && "error"}
              name="message"
              rows="6"
              onChange={handleInputChange}
              onBlur={updateInputError}
            />
            <p className="error-message">
              {inputErrors.message ? inputErrors.message : <br />}
            </p>
          </div>
          <div>
            <button id="submit" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        <h4>Contact me directly at:</h4>
        <ul>
          <li>
            <a href="mailto:sophia@yoursummit.media" target="_blank">
              <i className="fas fa-paper-plane"></i> sophia@yoursummit.media
            </a>
          </li>
          <li>
            <a href="https://github.com/sophiabarrett" target="_blank">
              <i className="fab fa-github"></i> github.com/sophiabarrett
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sophiabarrett/"
              target="_blank"
            >
              <i className="fab fa-linkedin"></i> linkedin.com/in/sophiabarrett
            </a>
          </li>
        </ul>
      </div> */}
    </section>
  );
}

export default Contact;
