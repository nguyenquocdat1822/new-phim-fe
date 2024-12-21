import { useEffect } from "react";
import "./CommentsPlugin.scss";
function CommentsPlugin(props) {
  let { href } = props;
  let url = `portfolio.satomijin.id.vn${href}`;
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v20.0",
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = process.env.REACT_APP_FB_URL_SC;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, []);
  return (
    <div className="comments-plugin_container">
      <div id="fb-root"></div>{" "}
      <div
        className="fb-comments"
        data-href={
          href ? url : "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0&appId=2390033274535140"
        }
        data-width="100%"
        data-numposts="5"
        data-lazy
      ></div>
    </div>
  );
}

export default CommentsPlugin;
