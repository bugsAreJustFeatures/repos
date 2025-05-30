import { Link } from "react-router-dom"

const DefaultProfile = () => {
  return (
    <>
      <u><p>Click these:</p></u>

      <li>
        <Link to="/profile/spinach">Spinach, hmmmm!</Link>
      </li>
      <br />
      <li>
        <Link to="/profile/popeye">DONT TOUCH MY SPINACH!</Link>
      </li>
      
    </>
  );
};

export default DefaultProfile;
