import style from './voice_field.module.scss'

export const VoiceField = (props: {data: string}) => {

  const {data} = props

  return(
    <>
      <div className={style.voice_recognition_voice_field}>
        <span>{ data }</span>
      </div>
    </>
  )
}

export default VoiceField;