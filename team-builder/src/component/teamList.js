import React from "react";
import "./teamList.css";

const TeamList = props => {
  return (
    <div>
      <div key={props.member.id}>
        <br />

        <h2>{props.member.name}</h2>
        <h3>{props.member.role}</h3>
        <p>{props.member.email}</p>
        <button className="edit_btn">Edit</button>
        <button className="edit_btn" onClick={props.onClick}>
          Delete
        </button>
        <br />
        <hr />
      </div>
    </div>
  );
};

export default TeamList;
