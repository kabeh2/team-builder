import React, { useState } from "react";
import Input from "./component/input";
import Button from "./component/button";
import data from "./data";

import "./App.css";
import TeamList from "./component/teamList";

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
            { value: "Backend Engineer", displayValue: "Backend Engineer" },
            { value: "Front End Engineer", displayValue: "Front End Engineer" },
            { value: "Designer", displayValue: "Designer" }
          ]
        },
        value: "Backend Engineer"
      }
    }
  };
  const [state, setState] = useState(initialState);
  const [members, setMembers] = useState(data);

  const addNewPerson = person => {
    setMembers([...members, person]);
  };

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

  const submitForm = event => {
    event.preventDefault();
    let formData = {};
    for (let formElementIdentifier in state.orderForm) {
      formData[formElementIdentifier] =
        state.orderForm[formElementIdentifier].value;
    }

    const newMember = {
      ...formData,
      id: Date.now()
    };
    console.log(newMember);
    addNewPerson(newMember);
    setState({
      ...initialState
    });
  };

  let form = (
    <form onSubmit={submitForm}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success">ADD</Button>
    </form>
  );

  return (
    <div className="App">
      {form}
      <TeamList teamList={members} />
    </div>
  );
}

export default App;
