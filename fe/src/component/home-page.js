import "../App.css";
import { useState } from "react";

function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    fetch("https://localhost:7183/api/Users/authenticate", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        localStorage.setItem("Authorization", `Basic ${data}`);
        window.location.href = "http://localhost:3000/vols";
      });
  };

  return (
    <div>
      <form>
        <fieldset>
          <legend>Login</legend>
          <div>
            <label>Username : </label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>
          <div>
            <label>Password : </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
          <div>
            <button onClick={handleAddClick}>Login</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default HomePage;
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: "React POST Request Example" }),
//   };
//   fetch("https://reqres.in/api/posts", requestOptions)
//     .then((response) => response.json())
//     .then((data) => this.setState({ postId: data.id }));

//   return (
//     <div>
//       <div>HomePage</div>
//       <form>
//         <fieldset>
//           <legend>Login</legend>
//           <div>
//             <label>Username : </label>
//             <input type="text"></input>
//           </div>
//           <div>
//             <label>Password : </label>
//             <input type="password"></input>
//           </div>
//           <div>
//             <button onClick="">Add</button>
//           </div>
//         </fieldset>
//       </form>
//     </div>
//   );
// }

// export default HomePage;
