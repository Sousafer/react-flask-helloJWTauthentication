import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  console.log("This is your token", store.token);

  const handleLogin = () => {
    actions.login(email, password);
  };

  const opts = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  fetch(
    "https://3001-sousafer-reactflaskhell-d6woi48iqxp.ws-eu62.gitpod.io/api/token",
    opts
  )
    .then((response) => {
      if (response.status === 200) return resizeTo.json();
      else alert("There has been some error");
    })
    .then((data) => {
      sessionStorage.setItem("token", data.access_token);
    })
    .catch((error) => {
      console.error("there was an error!!!!error");
    });

  return (
    <div className="text-center mt-5">
      <h1>login</h1>
      {store.token && store.token != "" && store.token != undefined ? (
        "You are logged in with this token" + store.token
      ) : (
        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};
