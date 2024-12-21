import { useTranslation } from "react-i18next";
import "./SpeechComponent.scss";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useRef } from "react";

function SpeechComponent(props) {
  let { t } = useTranslation();
  //  transcript : giá trị được chuyển đổng từ giọng nói sang văn bản
  // browserSupportsSpeechRecognition (boolean): kiểm tra xem trình duyệt có hỗ trợ speech hay ko 
  // resetTranscript : xóa bộ nhớ transcript
  //  listening (boolean) : kiểm tra xem có đang lắng nghe ng dùng nói hay không 
  const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening } = useSpeechRecognition();
  const timeOutRef = useRef(null);
  // function
  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      return <p>Trình duyệt của bạn không hỗ trợ tính năng Speech Recognition.</p>;
    }
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setUpTimeout();
  };

  const stopListening = () => {
    props.setSearchInput(transcript);
    SpeechRecognition.stopListening();
    clearTimeout(timeOutRef.current);
  };

  const setUpTimeout = () => {
    clearTimeout(timeOutRef.current); // xóa bộ đếm trước đó (nếu có)
    timeOutRef.current = setTimeout(() => {
      console.log("Khong phat hien giong noi dung lang nghe,...");
      props.setIsOpenSpeech(false);
      stopListening();
    }, 1500); // stop after 1.5s
  };
  // useEffect
  useEffect(() => {
    if (listening) {
      setUpTimeout();
    }
    return () => clearTimeout(timeOutRef.current); // đảm bảo luôn xóa bộ nhớ đệm
  }, [transcript]);

  useEffect(() => {
    if (props.isOpenSpeech === true) {
      startListening();
    } else {
      stopListening();
    }
  }, [props.isOpenSpeech]);

  return (
    <div className="speech-component_container" onClick={() => props.setIsOpenSpeech(false)}>
      <div className="voice-component_wrapper">
        <div className="header_modal">
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => props.setIsOpenSpeech(false)}
          ></button>
        </div>
        <div className="speech_wrapper">
          <div className="title">{t("speechNameFilm")}</div>
          <div className="speech-wave active">
            <i className="fa-solid fa-microphone"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeechComponent;
