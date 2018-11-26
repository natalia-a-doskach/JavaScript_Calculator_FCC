import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
constructor(props){
super(props);
this.state={
onDisplay:"",
currResult: 0,
currentOperation: "+",
currNumber:"",
lastClicked:""
};
this.cleanUp = this.cleanUp.bind(this);
this.updateOper = this.updateOper.bind(this);
this.updateNumber = this.updateNumber.bind(this);
this.equals = this.equals.bind(this);
}
cleanUp(){
this.setState({
onDisplay:"",
currResult:0,
currentOperation: "+",
currNumber:"",
lastClicked:""
})
}
updateOper(value){
//calculate stuff
switch(this.state.currentOperation){
case"+": this.setState({currResult: this.state.currResult + parseFloat(this.state.currNumber)});
break;
case"-": this.setState({currResult: this.state.currResult - parseFloat(this.state.currNumber)});
break;
case"×": this.setState({currResult: this.state.currResult * parseFloat(this.state.currNumber)});
break;
case"/": this.setState({currResult: this.state.currResult / parseFloat(this.state.currNumber)});
break;
case"^": this.setState({currResult: Math.pow(this.state.currResult,
  parseFloat(this.state.currNumber))});
break;
}
//update operation & display
this.setState({currentOperation: value,
onDisplay: this.state.onDisplay + value,
currNumber: ""});
//set type
this.setState({lastClicked:"oper"})};

updateNumber(value,type){
//creating a number & displaying it
this.setState({currNumber: this.state.currNumber + value,
onDisplay: this.state.onDisplay + value});
//setting type
this.setState({lastClicked:type})
}

equals(){
console.log(this.state);
let result;
switch(this.state.currentOperation){
case"+": result = this.state.currResult + parseFloat(this.state.currNumber);
break;
case"-":  result = this.state.currResult - parseFloat(this.state.currNumber);
break;
case"×":  result = this.state.currResult * parseFloat(this.state.currNumber);
break;
case"/":  result = this.state.currResult / parseFloat(this.state.currNumber);
break;
case"^":  result = Math.pow(this.state.currResult, parseFloat(this.state.currNumber));
break;
};
result = Number(result.toFixed(5));
this.setState({
onDisplay: ""+result,
currentOperation: "+",
currNumber:result,
currResult: 0,
lastClicked:"equals"
})

}
render(){
return(
<div id="calcBody">
<Screen onDisplay={this.state.onDisplay}/>
<Buttons cleanUp={this.cleanUp} updateOper={this.updateOper} equals={this.equals}
 updateNumber={this.updateNumber} lastClicked={this.state.lastClicked} currNumber={this.state.currNumber}/>
</div>
)
}
}


class Buttons extends React.Component{
constructor(props){
super(props);
this.numberClick = this.numberClick.bind(this);
this.operClick = this.operClick.bind(this);
this.clearClick = this.clearClick.bind(this);
this.decimalClick = this.decimalClick.bind(this);
this.equalClick = this.equalClick.bind(this);
}
numberClick(e){
let val = e.target.value;
let type = 'number';
if (!(this.props.currNumber === "0" && val ==="0"))
{this.props.updateNumber(val,type)};
};
decimalClick(e){
  let val = e.target.value;
  let type = 'decimal';
  if (this.props.lastClicked === "number")
  {this.props.updateNumber(val,type)};
};
operClick(e){
  let val = e.target.value;
  if (this.props.lastClicked === ""){
  this.props.updateNumber(val,"oper")
  }
  if (this.props.lastClicked === "number" || this.props.lastClicked === "equals")
  {this.props.updateOper(val)};
};
equalClick(e){
this.props.equals();
};
clearClick(e){
this.props.cleanUp();
};
render(){
return(
  <div id="buttons">
  <button onClick={this.clearClick}id="clear" className="button blackBtn">MC</button>
  <button onClick={this.operClick}id="power" className="button blackBtn" value="^">^</button>
  <button onClick={this.operClick}id="divide" className="button blackBtn" value="/">/</button>
  <button onClick={this.operClick}id="multiply" className="button blackBtn" value="×">×</button>
  <button onClick={this.numberClick}id="seven" className="button grayBtn" value="7">7</button>
  <button onClick={this.numberClick}id="eight" className="button grayBtn" value="8">8</button>
  <button onClick={this.numberClick}id="nine" className="button grayBtn" value="9">9</button>
  <button onClick={this.operClick}id="subtract" className="button grayBtn" value="-">-</button>
  <button onClick={this.numberClick}id="four" className="button grayBtn" value="4">4</button>
  <button onClick={this.numberClick}id="five" className="button grayBtn" value="5">5</button>
  <button onClick={this.numberClick}id="six" className="button grayBtn" value="6">6</button>
  <button onClick={this.operClick}id="add" className="button grayBtn" value="+">+</button>
  <button onClick={this.numberClick}id="one" className="button grayBtn" value="1">1</button>
  <button onClick={this.numberClick}id="two" className="button grayBtn" value="2">2</button>
  <button onClick={this.numberClick}id="three" className="button grayBtn" value="3">3</button>
  <button onClick={this.equalClick}id="equals" className="button redBtn">=</button>
  <button onClick={this.numberClick}id="zero" className="button grayBtn bigBtn" value="0">0</button>
  <button onClick={this.decimalClick}id="decimal" className="button grayBtn" value=".">.</button>
 </div>
)
}
}

class Screen extends React.Component{
render(){
return(
   <div id="screen"><p id="screenText">{this.props.onDisplay}</p></div>
)
}
}


ReactDOM.render(
  <App / > ,
          document.getElementById('root')
        );
