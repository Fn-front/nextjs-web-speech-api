'use client'

import { useEffect, useMemo, useState } from "react";
import Conversations from './components/conversations'
import { Conversation } from "./types/conversation";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceRecognition = () => {
  
  const [transcript, setTranscript] = useState<string>('');
  const [conversation, setConversation] = useState<Array<Conversation>>([
    {id: 1234567890, text: 'コンビニ'},
    {id: 2345678901, text: 'コメ'}
  ]);
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
    let num;
    for (let i = 0; i < 10; i++){
      num! += Math.floor(Math.random()*10)
    }
    return num
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
        setConversation([...conversation, transcript]);
      };

    }
    else{
      setMessage("このブラウザではSpeech Recognition APIがサポートされていません");
    }
    
  },[recognition, transcript, conversation])

  return (
    <>
      <div>
        <Conversations data={conversation} />
        <button onClick={handleStartListening} disabled={isListening}>音声認識を開始</button><br />
        <button onClick={handleStopListening} disabled={!isListening}>音声認識を停止</button><br />
        <p>{ message }</p>
      </div>
    </>
  )
}

export default VoiceRecognition;