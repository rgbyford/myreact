import React from "react";

const sName = "Roger";
const iLetters = 5;
const sReactThoughts = "is pretty cool!";

function JSXVariables() {
  return (
    <div className="main-container">
      <div className="container">
        <div className="jumbotron">
          <h1>Hi! My name is {sName}.</h1>
          <h2>My name has {iLetters} letters.</h2>
          <h2>I think React {sReactThoughts}</h2>
        </div>
      </div>
    </div>
  );
}

export default JSXVariables;
