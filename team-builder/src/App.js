import React, { useState } from "react";
import Input from "./component/input";

import "./App.css";

function App() {
  const initialState = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: ""
      },
      role: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    }
  };
  const [state, setState] = useState(initialState);

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    setState({ orderForm: updatedOrderForm });
  };

  const formElementsArray = [];
  for (let key in state.orderForm) {
    formElementsArray.push({
      id: key,
      config: state.orderForm[key]
    });
  }

  let form = (
    <form>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
    </form>
  );

  return <div className="App">{form}</div>;
}

export default App;
