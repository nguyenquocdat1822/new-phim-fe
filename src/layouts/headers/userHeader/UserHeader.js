import UserHeaderPc from "./PcTb/UserHeaderPc";
import UserHeaderMobile from "./Mobile/UserHeaderMobile";
import "./UserHeader.scss";
import { useSelector } from "react-redux";
function UserHeader() {
  return (
    <div className="user-header">
      <div className="header-pc">
        <UserHeaderPc />
      </div>
      <div className="header-mobile">
        <UserHeaderMobile />
      </div>
    </div>
  );
}

export default UserHeader;
