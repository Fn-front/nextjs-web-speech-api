import React, { Dispatch, memo, SetStateAction } from "react";
import style from './voice_field.module.scss'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { green, grey } from "@mui/material/colors";

type Props = {
  data: string
  recognition: any
  setIsListening: Dispatch<SetStateAction<boolean>>
  isListening: boolean
}

const VoiceField = memo((props: Props) => {

  const {data, recognition, setIsListening, isListening} = props  

  const handleStartListening = () => {
    setIsListening(true);
    recognition && recognition.start();
  };
  
  const handleStopListening = () => {
    setIsListening(false);
    recognition && recognition.stop();
  };

  return(
    <>
      <div className={style.voice_recognition_voice_field}>
        <span>{ data }</span>
        {!data && <span className={style.placeholder}>マイクアイコンをクリックし、音声入力をおこなってください</span>}
        <button
          className={style.voice_recognition_icon}
          onClick={() => !isListening ? handleStartListening() : handleStopListening()}
        >
          <KeyboardVoiceIcon fontSize='large' style={{fontSize: '2.7875rem'}} sx={{color: !isListening ? "white" : grey[700]}} />
        </button>
      </div>
    </>
  )
})

VoiceField.displayName = "VoiceField";

export default VoiceField;