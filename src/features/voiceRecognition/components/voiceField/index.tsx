import React, { memo } from "react";
import style from './voice_field.module.scss'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const VoiceField = memo((props: {data: string}) => {

  const {data} = props

  return(
    <>
      <div className={style.voice_recognition_voice_field}>
        <span>{ data }</span>
        <div className={style.voice_recognition_icon}><KeyboardVoiceIcon fontSize='large' style={{fontSize: '2.7875rem'}} /></div>
      </div>
    </>
  )
})

VoiceField.displayName = "VoiceField";

export default VoiceField;