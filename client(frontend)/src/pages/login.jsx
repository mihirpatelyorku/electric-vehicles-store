import { useState } from "react";
function Login() {
  const [login, setLogin] = useState(true);

  const handleClick = () => {
    setLogin(!login);
  };
  return (
    <form action="">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email address" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required />

      {!login && (
        <>
          <label htmlFor="confirm">Confirm Password:</label>
          <input type="password" id="confirm" name="confirm"  placeholder="Re-enter your password" required />

          <label htmlFor="firstname">FirstName:</label>
          <input type="text" id="firstname" name="firstname" placeholder="Enter your first name" required/>

          <label htmlFor="lastname">LastName:</label>
          <input type="text" name="lastname" id="lastname" placeholder="Enter your last name" required/>

          <label htmlFor="phone">Mobile:</label>
          <input
            type="tel"
            name="mobile"
            id="phone"
            pattern="[0-9]{10}"
            required
            placeholder="Enter 10-digit number"
          />
        </>
      )}
      <button type="submit">Submit</button>

      <button onClick={handleClick} type="button">
        {login ? "Create My Account" : "Back to Login"}
      </button>
    </form>
  );
}

export default Login;
