import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate()

  async function handleForm(e) {
    e.preventDefault(); // stop page reloading before request finishes

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
  
      try {
        const loginUser = await fetch("api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: enteredUsername, password: enteredPassword }),
        });
  
        if (!loginUser.ok) {
          throw new Error("API had a problem");
        };
  
        const data = await loginUser.json();
        localStorage.setItem("token", data.token);
        navigate("/blogs")
      } catch (err) {
        console.error("Unexpexted error occured: ", err);
        return;
      };
    };
  
  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleForm}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" defaultValue={"123"} />

        <label htmlFor="password">Password: </label>
        <input type="text" name="password" id="password" defaultValue={"123"} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
  };
