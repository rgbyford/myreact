import React from "react";
import PropTypes from 'prop-types';

const styles = {
  imgResponsive: {
    width: 200,
    margin: 20
  },
  backdropStyle: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    },
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

let iImages = 12;
let aiArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
  render() {
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

    let iClicked = aiFindClicked[param];  // picture num
    iClickedCount = abAlreadyClicked.filter(c => c === true).length + 1;
    if (abAlreadyClicked[iClicked]) {  // this picture already clicked
      this.toggleModal("You lose!  Boo!");
      iBestScore = Math.max (iBestScore, iClickedCount);
    }
    else if (iClickedCount >= iDiff) {
      this.toggleModal("You win!  Yay!");
      iBestScore = Math.max (iBestScore, iClickedCount);
    }
    abAlreadyClicked[iClicked] = true;

    let iChooser;
    let iNumsLeft = iImages;
    for (let i = 0; i < iImages; i++) {
      iChooser = Math.floor(Math.random() * iNumsLeft);
      asStrings[i] = `./assets/images/${aiNumbers[iChooser]}.jpg`;
      aiFindClicked[i] = aiNumbers[iChooser];
      aiNumbers.splice(iChooser, 1);
      iNumsLeft--;
    }
    this.setState(() => ({
      //      sNumString: asStrings
    }));
  }

  render() {
    return (
      <div>
        <br />
        <h3>&nbsp;Click on the pictures of London.  But don't click on the same one twice!</h3>
        <div>
          <Difficulty />
        </div>
        <div>
          {aiArray.map((index) =>
            <img key={index} className="images" id="pic2" onClick={this.handleClick.bind(this, index - 1)} alt="" style={styles.imgResponsive} src={asStrings[index - 1]} />
          )}
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

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
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
  Modal.propTypes = {
      show: PropTypes.bool,
      children: PropTypes.node
  };

  document.body.style.backgroundImage= `url(../assets/images/oriental.png)`;
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