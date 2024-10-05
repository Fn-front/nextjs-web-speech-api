import { text } from "stream/consumers";
import { Conversation } from "../../types/conversation";
import style from './conversations.module.scss'

type Props = {
  data: Array<Conversation>
}

export const Conversations = (props: Props) => {

  const { data } = props;

  console.log(data);
  

  return (
    <div className={style.voice_recognition_conversations}>
      <ul className={style.voice_recognition_conversations_list}>
        {data.map((item) => {
          return(
            <li key={item.id} className={style.voice_recognition_conversations_list_item}>{ item.text }</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Conversations