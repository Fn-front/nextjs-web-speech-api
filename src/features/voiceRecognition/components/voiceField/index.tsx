import style from './voice_field.module.scss'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export const VoiceField = (props: {data: string}) => {

  const {data} = props

  return(
    <>
      <div className={style.voice_recognition_voice_field}>
        <span>{ data }</span>
        <div className={style.voice_recognition_icon}><KeyboardVoiceIcon fontSize='large' style={{fontSize: '2.7875rem'}} /></div>
      </div>
    </>
  )
}

export default VoiceField;