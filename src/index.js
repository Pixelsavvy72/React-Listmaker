import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';


function FormFields(props) {
  return(
    <div>
      <input id="myInput" onChange={props.changed} placeholder="Please enter an item"/>
      <button onClick={props.added}>ADD</button>
    </div>
  )
}

function ListItem(props) {
  return(
    <li onClick={props.remove}>{props.value}</li>
  )
}

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: "",
      listItems: []
    }
  }

  onFieldChangedHandler = (event) => {
    this.setState({currentText: event.target.value})
  }

  addItemHandler = () => {
    let newList = [...this.state.listItems];
    newList.push(this.state.currentText);
    this.setState({
      currentText: "",
      listItems: newList
    });
    let myInput = document.getElementById("myInput");
    myInput.value = "";
  }

  removeItemHandler = (index) => {
    const items = [...this.state.listItems];
    items.splice(index, 1);
    this.setState({listItems: items});
  }
  
  render() {
    let items = this.state.listItems.map((item, index) => {
      return(
        <ListItem 
          remove={() => this.removeItemHandler(index)}
          value={item} 
          key={Math.random() * Math.random()}
        />
      )
    });

    return(
      <div>
        <h1>List Items:</h1>
        <p>(click item to remove)</p>
        <ul>
          {items}
        </ul>
        <FormFields 
          added={this.addItemHandler} 
          changed={this.onFieldChangedHandler}
        />
      </div>
    );
  }
}





ReactDOM.render(
  <ShoppingList />,
  document.getElementById('root')
);