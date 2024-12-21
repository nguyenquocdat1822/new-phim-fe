import SignUpComponent from "../../components/SignUpComponent/SignUpComponent";
import DarkMode from "../../themes/DarkMode";

function SignUpPage() {
  return (
    <div className="sign-up-page_container">
      <div hidden>
        <DarkMode />
      </div>
      <SignUpComponent />
    </div>
  );
}

export default SignUpPage;
