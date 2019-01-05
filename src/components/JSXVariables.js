import React from "react";
//import ReactDOM from "react-dom";

const styles = {
  heading: {
    blackground: "#3f51bl5",
    minHeight: 50,
    lineHeight: 3.5,
    fontSize: "1.2rem",
    color: "white",
    padding: "0 20px"
  },
  content: {
    padding: 20
  },
  imgResponsive: {
    width: 200,
    margin: 20
    /*    position: relative */
    /*    margin-top: 10%;*/
    /*    width: 200px;*/
  }
};

let sNumString1 = "./assets/images/1.jpg";
//let sNumString3 = "./assets/images/3.jpg";
  let iImages = 12;
  let sStrings = [];
  for (let i = 0; i < iImages; i++) {
    sStrings[i] = `./assets/images/${i +1}.jpg`;    // images numbered from 1
  }    

class ClickButton extends React.Component {
  constructor(props) {
    super(props);
//    this.state = {sNumString: sNumString1};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let aiNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let iNumsLeft = iImages;
    let iChooser;
    for (let i = 0; i < iImages; i++) {
      iChooser = Math.floor(Math.random() * iNumsLeft) + 1;
//      console.log("random: ", aiNumbers[iChooser - 1]);
      sStrings[i] = `./assets/images/${aiNumbers[iChooser - 1]}.jpg`;
//      console.log (sStrings[i]);
      aiNumbers.splice(iChooser - 1, 1);
      //      console.log(aiNumbers);
      iNumsLeft--;
      //      console.log(iChooser);
    }
    console.log(this);
    this.setState(() => ({
//      sNumString: sStrings
    }));
  }

  render() {
    console.log ("cb render");
    return (
      <div>
      <img className="images" id="pic1" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[0]}/>
      <img className="images" id="pic2" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[1]}/>
      <img className="images" id="pic3" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[2]}/>
      <img className="images" id="pic4" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[3]}/>
      <img className="images" id="pic5" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[4]}/>
      <img className="images" id="pic6" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[5]}/>
      <img className="images" id="pic7" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[6]}/>
      <img className="images" id="pic8" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[7]}/>
      <img className="images" id="pic9" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[8]}/>
      <img className="images" id="pic10" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[9]}/>
      <img className="images" id="pic11" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[10]}/>
      <img className="images" id="pic12" onClick={this.handleClick} alt="" style={styles.imgResponsive} src={sStrings[11]}/>
      </div>
    );
  }
}

function JSXVariables() {

  return (
  <div className="mainContainer">
      <div className="container">
      <div id="outer"></div>
      <div id="pictures">
      <div className="row">
      <ClickButton />
      </div>
      </div>
      </div>
  </div>
  );
}


export default JSXVariables;