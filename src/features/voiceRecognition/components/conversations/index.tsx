'use client'

import { charStringAnimation } from "@/hooks/charStringAnimation";
import { Conversation } from "../../types/conversation";
import style from './conversations.module.scss'
import { charSplit } from "@/hooks/charSplit";
import { useEffect, useState } from "react";

type Props = {
  data: Array<Conversation>
}

export const Conversations = (props: Props) => {

  const { data } = props;
  const [baseData, setBaseData] = useState(data);
  const [charAnimation, setCharAnimation] = useState<boolean>(false)

  useEffect(() => {
    if(data !== baseData){
      setCharAnimation(true)
      setBaseData(data)
    }
    
  },[data, baseData])

  return (
    <div className={style.voice_recognition_conversations}>
      <ul className={style.voice_recognition_conversations_list}>
        {data.map((item, index) => {
          return(
            <li
              key={item.id}
              className={style.voice_recognition_conversations_list_item}
            >
              {/* 追加された文字に対してアニメーションさせる */}
              { charAnimation && 
                charStringAnimation(charSplit(item.text), index, data.length)
              }
              {/* 初期表示の文字に対してはアニメーションをさせない */}
              { !charAnimation && charSplit(item.text).map((item, index) => <span key={index}>{item}</span>) }
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Conversations