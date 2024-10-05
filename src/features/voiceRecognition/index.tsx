'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import Conversations from './components/conversations'
import { Conversation } from "./types/conversation";
import style from './index.module.scss'
import VoiceField from "./components/voiceField";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceRecognition = () => {

  const scrollBottomRef = useRef<HTMLDivElement>(null);
  
  const [transcript, setTranscript] = useState<string>('');
  const [conversation, setConversation] = useState<Array<Conversation>>([
    {id: 8747722302, text: 'コンビニ'},
    {id: 5070858639, text: 'コメ'},
    {id: 4800580597, text: 'さようなら'},
    {id: 5333066174, text: 'モックやで'},
    {id: 4629803116, text: '今日は晴れです'},
    {id: 6650202305, text: '新しい本を読み始めたら、とても面白くて一気に進んだ。'},
    {id: 6773904590, text: '先日訪れた美術館では、特別展が開催されていて、多くの貴重な作品を見ることができました。'},
    {id: 5714100651, text: '電車の窓から見える田園風景が次第に山に変わり、遠くには青い海が広がる。駅に降り立つと、心地よい潮風が頬を撫で、静かな港町に旅が始まる予感がした。'},
    {id: 2617395506, text: '古い町並みが広がる石畳の道を歩きながら、香ばしい焼きたてのパンの香りが漂う。道端には小さなカフェが並び、風に揺れる花々が美しい。旅先の空気が心を癒してくれる。'},
    {id: 1358668873, text: '山間の小さな温泉街に降り立つと、静かな川のせせらぎと湯けむりが迎えてくれた。古い旅館の木の香りが漂い、心が落ち着く。ゆっくりと温泉に浸かりながら、日常を忘れるひとときを楽しんだ。'},
    // {id: 3603930057, text: '朝早く起きて、まだ人の少ない静かな海辺を歩く。波の音が心地よく、砂浜にはカモメが飛び交っている。遠くの水平線には漁船が見え、太陽がゆっくりと昇り始め、金色の光が海面を照らしていた。'},
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