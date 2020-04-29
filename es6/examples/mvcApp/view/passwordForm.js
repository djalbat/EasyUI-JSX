"use strict";

import { Element, Button } from "easy";

import controller from "../controller";
import PasswordInput from "./passwordInput";
import ValidationError from "./validationError";

export default class PasswordForm extends Element {
  validateAndSubmitForm() {
    const passwordValid = this.validateForm();

    if (!passwordValid) {
      this.showValidationError("The password is invalid");
    } else {
      this.submitForm();
    }
  }

  validateForm() {
    const password = this.getPassword(),
          passwordValid = isPasswordValid(password);

    return passwordValid;
  }

  submitForm() {
    const password = this.getPassword();

    controller.setPassword(password);

    this.clearPassword();
  }

  childElements() {
    return([

      <PasswordInput />,
      <ValidationError/>,
      <Button className="submit"
              onClick={(event, element) => {

                event.preventDefault();

                this.validateAndSubmitForm();

              }}
      >
        Submit
      </Button>

    ]);
  }

  initialise(properties) {
    this.assignContext();
  }

  static tagName = "form";

  static defaultProperties = {
    className: "password"
  };

  static fromClass(Class, properties) {
    const passwordForm = Element.fromClass(Class, properties);

    passwordForm.initialise(properties);

    return passwordForm;
  }
}

function isPasswordValid(password) {
  const passwordValid = (password !== "");  ///

  return passwordValid;
}
