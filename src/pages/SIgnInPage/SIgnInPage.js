import SignInComponent from "../../components/SignInComponent/SignInComponent";
import DarkMode from "../../themes/DarkMode";
function SIgnInPage() {
  return (
    <div className="sign-in-page_container">
      <div hidden>
        <DarkMode />
      </div>
      <SignInComponent />
    </div>
  );
}

export default SIgnInPage;
