import React, { useState } from "react";

//TODO: Install React-icons
import Icon from "./components/Icon";

//TODO: Install React-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//TODO: Install Bootstrap Reactstrap
import { Card, CardBody, Container, ButtonToggle, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const itemArray = new Array(9).fill("empty");

const App = () => {
  
  const [isCross, setIsCross] = useState(true);
  const [winMessage, setWinMessage] = useState("");

  const reload = () => {
    setIsCross(true);
    setWinMessage("");
    itemArray.fill("empty"); 
  }

  const checkIsWinner = () => {
    if(itemArray[0] !== "empty" && itemArray[0] === itemArray[1] && itemArray[1] === itemArray[2]){
      setWinMessage(`${itemArray[0]} Wins!`);
     }
     else if(
      (itemArray[3] !== "empty") &&
      (itemArray[3] === itemArray[4])&&
      (itemArray[4] === itemArray[5])
      ){
       setWinMessage(`${itemArray[3]} Wins!`);
      }
      else if(
      (itemArray[6] !== "empty") &&
      (itemArray[6] === itemArray[7])&&
      (itemArray[7] === itemArray[8])
      ){
         setWinMessage(`${itemArray[6]} Wins!`);
      }
      else if(
      (itemArray[0] !== "empty") &&
      (itemArray[0] === itemArray[3])&&
      (itemArray[3] === itemArray[6])
      ){
        setWinMessage(`${itemArray[0]} Wins!`);
      }
      else if(
      (itemArray[1] !== "empty") &&
      (itemArray[1] === itemArray[4])&&
      (itemArray[4] === itemArray[7])
      ){
          setWinMessage(`${itemArray[1]} Wins!`);
      }
      else if(
      (itemArray[2] !== "empty") &&
      (itemArray[2] === itemArray[5])&&
      (itemArray[5] === itemArray[8])
      ){
        setWinMessage(`${itemArray[2]} Wins!`);
      }
      else if(
      (itemArray[0] !== "empty") &&
      (itemArray[0] === itemArray[4])&&
      (itemArray[4] === itemArray[8])
      ){
          setWinMessage(`${itemArray[0]} Wins!`);
      }
      else if(
      (itemArray[2] !== "empty") &&
      (itemArray[2] === itemArray[4])&&
      (itemArray[4] === itemArray[6])
      ){
          setWinMessage(`${itemArray[2]} Wins!`);
      }
      else if(!(itemArray.includes("empty"))){
        setWinMessage("Game Over");
      }
  }

  const changeItem = (itemNumber) =>{

    if(winMessage){
      return toast(winMessage, {type: "success"});
    }

    if(itemArray[itemNumber] === "empty"){
      itemArray[itemNumber] = isCross? "cross" : "circle";
      setIsCross(!isCross);
    }
    else{
      return toast("Already Filled!", {type: "error"});
    }

    checkIsWinner();
  }

  const itemColor = (item) => {
    if(item === "cross") return "success";
    else if(item === "circle") return "primary";
    else return "warning";
  }

  
  return(
      <Container className="p-5 view">
        <ToastContainer position="top-left"/>
          <Row>
            <Col md={6} className="offset-md-3 item-container-bg">
            {winMessage? (
                <div className="mb-2 mt-2">
                  <h1 className="header text-light text-center text-uppercase">{winMessage}</h1>
                  <div className="d-grid gap-2">
                    <ButtonToggle className="btn-color" size="lg" onClick={reload}>Reload the button</ButtonToggle>
                  </div>
                </div>
              ) : (
                <h1 className=" header-warning text-center">
                  It's {isCross? "Cross" : "Circle"} turn!
                </h1>
              )}
              <div className="grid">
                {itemArray.map( (item, index) => {
                  return(
                  <Card color={itemColor(item)} onClick={() => (changeItem(index))}>
                    <CardBody className="box">
                     <Icon iconName={item}/>
                    </CardBody>
                  </Card>
                  );
                })}
              </div>
            </Col>
          </Row>
      </Container>
  );
}

export default App;
