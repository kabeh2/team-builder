import React, {
  useState
  // useEffect
} from "react";
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
        value: "",
        memberToEdit: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        memberToEdit: false
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
        value: "Backend Engineer",
        memberToEdit: false
      }
    }
  };
  const [state, setState] = useState(initialState);
  const [members, setMembers] = useState(data);
  const [editing, setEditing] = useState(false);
  const [memberIndex, setMemberIndex] = useState(null);

  const editPerson = personIndex => {
    let person = [...members];
    person = person[personIndex];

    setEditing(true);
    console.log(editing);

    //

    setMemberIndex(personIndex);
    console.log(memberIndex);

    setState({
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name"
          },
          value: person.name
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your Email"
          },
          value: person.email
        },
        role: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "Backend Engineer", displayValue: "Backend Engineer" },
              {
                value: "Front End Engineer",
                displayValue: "Front End Engineer"
              },
              { value: "Designer", displayValue: "Designer" }
            ]
          },
          value: person.role
        }
      }
    });
  };

  const clearInput = () => {
    setState({ ...initialState });
    setEditing(false);
  };

  const addNewPerson = person => {
    setMembers([...members, person]);
  };
  const editSubmit = person => {
    let editedMember = [...members];
    editedMember[memberIndex] = person;
    console.log("editPerson: " + JSON.stringify(editedMember));

    setMembers([...editedMember]);
  };

  // useEffect(() => {
  //   editSubmit();
  //   // return () => {
  //   //   cleanup
  //   // };
  // }, []);

  const deletePersonHandler = personIndex => {
    const person = [...members];
    person.splice(personIndex, 1);
    setMembers([...person]);
    console.log(person);
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

    // if editing editPerson else addNewPerson
    if (editing) {
      editSubmit(newMember);
    } else {
      addNewPerson(newMember);
    }
    setState({
      ...initialState
    });
    setEditing(false);
  };

  let form = (
    <form onSubmit={submitForm}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          editing={editing}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button type="reset" value="Reset" clear={clearInput}>
        {editing ? "CANCEL" : "CLEAR"}
      </Button>
      {editing ? (
        <Button onClick={editSubmit}>EDIT</Button>
      ) : (
        <Button>ADD</Button>
      )}
    </form>
  );

  return (
    <div className="App">
      {form}
      {members.map((member, index) => (
        <TeamList
          teamList={members}
          edit={() => editPerson(index)}
          member={member}
          index={index}
          key={index}
          onClick={() => deletePersonHandler(index)}
        />
      ))}
    </div>
  );
}

export default App;
