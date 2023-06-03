import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserState } from "../Features/userSlice";

function getUserName(){
    const userState = useSelector(selectUserState);
    return userState.username;
}



function App() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const createQuiz = () => {
    navigate("/create");
  }
    const takeQuiz = () => {
    navigate("/take");
    }

   const login = () => {
      navigate("/login");
   }
    function checkAuth() {
        // Fetch and return the username
        fetch('/api/checkAuth')
            .then((res) => res.json())
            .then((data) => {
                return data.username;
            });

        // otherwise return false
        return false;

    }

    console.log(checkAuth());

  return (
    <div className="App" >
        <div className="container-fluid py-4">
            <div className="row ">
                <div className="col-md-12">
                    <h1> Quiz app</h1>
                    {getUserName() && <h3>Logged in as {checkAuth()}</h3>}
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-2 cen px-5">
                <Button variant="primary" onClick={createQuiz}>Create a quiz</Button>
                </div>

                <div className="col-md-2 px-5">
                <Button variant="primary" onClick={takeQuiz}>Take a quiz</Button>
                </div>

                <div className="col-md-2 px-5">
                <Button variant="primary" onClick={login}>Login</Button>
                </div>

            </div>
        </div>


    </div>
  );
}

export default App;
