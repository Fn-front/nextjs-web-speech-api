'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import Conversations from './components/conversations'
import { Conversation } from "./types/conversation";
import style from './index.module.scss'
import VoiceField from "./components/voiceField";
import { voiceConversation } from './constatants/data'

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceRecognition = () => {

  const scrollBottomRef = useRef<HTMLDivElement>(null);
  
  const [transcript, setTranscript] = useState<string>('');
  const [conversation, setConversation] = useState<Array<Conversation>>(voiceConversation);
  const [message, setMessage] = useState<string>('')
  const [isListening, setIsListening] = useState(false);

  // speech APIが使用できるか確認
  const recognition = useMemo(() => {
    return typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition) ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() : null;
  }, [])

  
  const handleStartListening = () => {
    setIsListening(true);
    recognition && recognition.start();
  };
  
  const handleStopListening = () => {
    setIsListening(false);
    recognition && recognition.stop();
  };

  const randomNum = () => {
    const numArray = [];
    for (let i = 0; i < 10; i++){
      numArray.push(Math.floor(Math.random()*10))
    }
    const result = Number(numArray.join(''))
    return result
  }

  const scrollBottom = () => {
    const set = setTimeout(() => {
      scrollBottomRef?.current?.scrollIntoView();
      clearTimeout(set);
    },1)
  }
  
  useEffect(() => {

    if (recognition) {
      // 言語設定
      recognition.lang = 'ja-JP';
      // 音声認識の途中の結果を返却するかどうか、デフォルトはfalse
      recognition.interimResults = true;

      // 音声入力の結果が返ってくる
      recognition.onresult = (event: any) => {
        // console.log(Array.from(event.results));
        const currentTranscript = Array.from(event.results)
          .map((i: any) => i[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      // 音声入力終了後の処理
      recognition.onend = () => {
        setIsListening(false);
        
        const setData = {
          id: randomNum(),
          text: transcript
        }
        setConversation([...conversation, setData]);
        scrollBottom()
      };

    }
    else{
      setMessage("このブラウザではSpeech Recognition APIがサポートされていません");
    }
    
  },[recognition, transcript, conversation])

  return (
    <>
      <div className={style.voice_recognition}>
        <Conversations data={conversation} />
        <div ref={scrollBottomRef} />
        <div className={style.voice_recognition_user_area}>
          <VoiceField data={transcript}/>
          <button onClick={handleStartListening} disabled={isListening}>音声認識を開始</button><br />
          <button onClick={handleStopListening} disabled={!isListening}>音声認識を停止</button><br />
        </div>
        <p>{ message }</p>
      </div>
    </>
  )
}

export default VoiceRecognition;