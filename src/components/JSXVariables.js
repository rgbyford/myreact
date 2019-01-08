import React from "react";
import PropTypes from 'prop-types';

const styles = {
  heading: {
    blackground: "#3f51bl5",
    minHeight: 50,
    lineHeight: 3.5,
    fontSize: "1.2rem",
    color: "white",
    padding: "0 20px"
  },
  bodyStyle: {
    backgroundImage: `url(../assets/images/oriental.png)`,
    margin:-10
  },
  content: {
    padding: 20
  },
  imgResponsive: {
    width: 200,
    margin: 20
  },
      // The gray background
  backdropStyle: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    },
    // The modal "window"
    modalStyle: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      padding: 30,
      display: "flex",
      justifyContent: "center"
    },
    closeButton: {
      position: "absolute",
      top: 300,
      left: 300
    }
};

//  <div style={{display: "flex", justifyContent: "center"}}   >
//let sNumString1 = "./assets/images/1.jpg";
//let sNumString3 = "./assets/images/3.jpg";
let iImages = 12;

let asStrings = [];
let abAlreadyClicked = [];
let aiFindClicked = [];
let iDiff = 6;
let iClickedCount = 0;
let iBestScore = 0;

for (let i = 0; i < iImages; i++) {
  asStrings[i] = `./assets/images/${i +1}.jpg`;    // images numbered from 1
  aiFindClicked[i] = i + 1;
  abAlreadyClicked[i] = false;
}    

class Difficulty extends React.Component {
  constructor(props) {
    super (props);
    this.state = {iDifficulty: 6};
    this.diffChange = this.diffChange.bind(this);
  }
  
  NumberList() {
    const numbers = [6, 7, 8, 9, 10, 11, 12];
    return (
      numbers.map((number) =>
        <option key={number.toString()} value={number}>{number}</option>
      )
    )
  }

  diffChange (param) {
    console.log("p: ", param);
    iDiff = param;
    this.setState({
      iDifficulty: param
    });
 
  }
      //<select value="difficulty" onChange={(e) => this.diffChange.bind(this, e.target.value)}></select>
  render() {
//    console.log ("diffSel");
    return (
      <div>
      <h3>&nbsp;How many do you want to have to click on to win?&nbsp;&nbsp;
      <select value={this.state.iDifficulty} onChange={(e) => this.diffChange(e.target.value)}>{this.NumberList()}</select>
      </h3>
      <h3>&nbsp;Your score: {iClickedCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Best score: {iBestScore}</h3>
      </div>  
    );
  }
}

class ClickButton extends React.Component {
  constructor(props) {
    super(props);
    //    this.state = {sNumString: sNumString1};
    this.state = { isOpen: false, bLose: false };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  toggleModal = (sLoseWin) => {
    if (this.state.isOpen) {
      iClickedCount = 0;
      for (let i = 0; i < iImages; i++) {
        asStrings[i] = `./assets/images/${i +1}.jpg`;    // images numbered from 1
        aiFindClicked[i] = i + 1;
        abAlreadyClicked[i] = false;
      }    
    }
    this.setState({
      sLoseWin: sLoseWin,
      isOpen: !this.state.isOpen
    });
  }


  handleClick(param) {
    let aiNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    console.log("p: ", param);  // the number of the button
    console.log ("aiFC: ", aiFindClicked);
    let iClicked = aiFindClicked[param];  // picture num
    console.log("picture num: ", iClicked);
    console.log("already been clicked: ", abAlreadyClicked);
    iClickedCount = abAlreadyClicked.filter(c => c === true).length + 1;
    console.log("how many clicked: ", iClickedCount);
    if (abAlreadyClicked[iClicked]) {  // this picture already clicked
      console.log("Lost!");
      this.toggleModal("You lose!  Boo!");
      iBestScore = Math.max (iBestScore, iClickedCount);
    }
    else if (iClickedCount >= iDiff) {
      console.log("Won");
      this.toggleModal("You win!  Yay!");
      iBestScore = Math.max (iBestScore, iClickedCount);
    }
    abAlreadyClicked[iClicked] = true;

    let iChooser;
    let iNumsLeft = iImages;
    for (let i = 0; i < iImages; i++) {
      iChooser = Math.floor(Math.random() * iNumsLeft);
//      console.log("random: ", aiNumbers[iChooser]);
      asStrings[i] = `./assets/images/${aiNumbers[iChooser]}.jpg`;
      //      console.log (asStrings[i]);
      aiFindClicked[i] = aiNumbers[iChooser];
      aiNumbers.splice(iChooser, 1);
      //      console.log(aiNumbers);
      iNumsLeft--;
      //      console.log(iChooser);
    }
    //console.log(this);
    this.setState(() => ({
      //      sNumString: asStrings
    }));
  }

        // <button onClick={this.toggleModal}>
        //   Open the modal
        // </button>
        
        render() {
//          console.log("cb render");
          return (
            <div>
              <br/>
              <h3>&nbsp;Click on the pictures of London.  But don't click on the same one twice!</h3>
            <div>
              <Difficulty />
            </div>
      <div>
      <img className="images" id="pic1" onClick={this.handleClick.bind(this, 0)} alt="" style={styles.imgResponsive} src={asStrings[0]}/>
      <img className="images" id="pic2" onClick={this.handleClick.bind(this, 1)} alt="" style={styles.imgResponsive} src={asStrings[1]}/>
      <img className="images" id="pic3" onClick={this.handleClick.bind(this, 2)} alt="" style={styles.imgResponsive} src={asStrings[2]}/>
      <img className="images" id="pic4" onClick={this.handleClick.bind(this, 3)} alt="" style={styles.imgResponsive} src={asStrings[3]}/>
      <img className="images" id="pic5" onClick={this.handleClick.bind(this, 4)} alt="" style={styles.imgResponsive} src={asStrings[4]}/>
      <img className="images" id="pic6" onClick={this.handleClick.bind(this, 5)} alt="" style={styles.imgResponsive} src={asStrings[5]}/>
      <img className="images" id="pic7" onClick={this.handleClick.bind(this, 6)} alt="" style={styles.imgResponsive} src={asStrings[6]}/>
      <img className="images" id="pic8" onClick={this.handleClick.bind(this, 7)} alt="" style={styles.imgResponsive} src={asStrings[7]}/>
      <img className="images" id="pic9" onClick={this.handleClick.bind(this, 8)} alt="" style={styles.imgResponsive} src={asStrings[8]}/>
      <img className="images" id="pic10" onClick={this.handleClick.bind(this, 9)} alt="" style={styles.imgResponsive} src={asStrings[9]}/>
      <img className="images" id="pic11" onClick={this.handleClick.bind(this, 10)} alt="" style={styles.imgResponsive} src={asStrings[10]}/>
      <img className="images" id="pic12" onClick={this.handleClick.bind(this, 11)} alt="" style={styles.imgResponsive} src={asStrings[11]}/>
      </div>
      <div>

              <Modal show={this.state.isOpen}>
              <h3>{this.state.sLoseWin}</h3>
              <button style={styles.closeButton} onClick={this.toggleModal}>
              Close
            </button>

              </Modal>
              </div>
              </div>
    );
  }
}

//   <input type="text" readOnly value={this.state.sLoseWin} />

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
//    console.log ("renderModal");
    if(!this.props.show) {
//      console.log ("no show");
      return null;
    }

    return (
      <div className="backdrop" style={styles.backdropStyle}>
        <div className="modal" style={styles.modalStyle}>
          {this.props.children}
          <div className="footer">
          </div>
        </div>
      </div>
    );
  }
}

function JSXVariables() {
  // constructor(props) {
  //   super(props);

  //   this.state = { isOpen: false };
  // }

  Modal.propTypes = {
      onClose: PropTypes.func.isRequired,
      show: PropTypes.bool,
      children: PropTypes.node
  };

  return (
  <body style={styles.bodyStyle}>

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
  </body>
  );
}


export default JSXVariables;