import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
function Navbar() {
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={() => console.log("toggle sidebar")}
        >
          <FaAlignLeft />
        </button>

        <div>
          <Logo />

          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => console.log("Show/hide dropdown")}
          >
            <FaUserCircle />
            John
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => console.log("Logout user")}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
