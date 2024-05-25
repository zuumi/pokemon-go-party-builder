import React, { useState, useEffect } from 'react';
import { gptChat } from './ChatService';
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

export default function PartyEvaluation() {
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const state: any = useSelector((state: any) => state.partyData.data);
  const selectedPokemonPatry = state.map((
    pokemon: {
      index: number,
      id: number,
      name: string
    }) => pokemon.name);

  useEffect(() => {
    // クッキーから評価回数を取得
    const count = parseInt(Cookies.get('evaluateCount') || '0');
    // クッキーの期限を当日の23:59に設定
    const expires = new Date();
    expires.setHours(23, 59, 59, 999);
    Cookies.set('evaluateCount', count.toString(), { expires });
  }, []);

  const handleEvaluate = async () => {
    // クッキーから評価回数を取得し、更新
    let count = parseInt(Cookies.get('evaluateCount') || '0');
    if (count >= 3) {
      alert('評価は1日に3回までです。');
      return;
    }
    count += 1;
    const expires = new Date();
    expires.setHours(23, 59, 59, 999);
    Cookies.set('evaluateCount', count.toString() , { expires });

    const prompt = `
      あなたはポケモンGOのPvPマスターです。
      私のパーティーは${selectedPokemonPatry[0]}、${selectedPokemonPatry[1]}、${selectedPokemonPatry[2]}です。
      ポケモンGOバトルのパーティとして評価してください。
      星5段階で答えて100文字程度で評論してください。

      * ノーマルタイプ
        * 超耐性：ゴースト
        * 耐性：なし
        * 弱点：かくとう
        * 超弱点：なし

      * ほのおタイプ
        * 超耐性：なし
        * 耐性：フェアリー、ほのお、くさ、こおり、むし、はがね
        * 弱点：みず、じめん、いわ
        * 超弱点：なし
      
      * みずタイプ
        * 超耐性：なし
        * 耐性：みず、ほのお、こおり、はがね
        * 弱点：でんき、くさ
        * 超弱点：なし

      * でんきタイプ
        * 超耐性：なし
        * 耐性：でんき、ひこう、はがね
        * 弱点：じめん
        * 超弱点：なし

      * くさタイプ
        * 超耐性：なし
        * 耐性：じめん、みず、くさ、でんき
        * 弱点：ほのお、こおり、どく、ひこう、むし
        * 超弱点：なし

      * こおりタイプ
        * 超耐性：なし
        * 耐性：こおり
        * 弱点：ほのお、かくとう、いわ、はがね
        * 超弱点：なし

      * かくとうタイプ
        * 超耐性：なし
        * 耐性：むし、あく、いわ
        * 弱点：ひこう、エスパー、フェアリー
        * 超弱点：なし

      * どくタイプ
        * 超耐性：なし
        * 耐性：くさ、かくとう、どく、むし、フェアリー
        * 弱点：じめん、エスパー
        * 超弱点：なし

      * じめんタイプ
        * 超耐性：でんき
        * 耐性：どく、いわ
        * 弱点：みず、くさ、こおり
        * 超弱点：なし

      * ひこうタイプ
        * 超耐性：じめん
        * 耐性：くさ、かくとう、むし
        * 弱点：でんき、こおり、いわ
        * 超弱点：なし

      * エスパータイプ
        * 超耐性：なし
        * 耐性：かくとう、エスパー
        * 弱点：むし、ゴースト、あく
        * 超弱点：なし

      * むしタイプ
        * 超耐性：なし
        * 耐性：くさ、かくとう、じめん
        * 弱点：ほのお、ひこう、いわ
        * 超弱点：なし

      * いわタイプ
        * 超耐性：なし
        * 耐性：ノーマル、ほのお、どく、ひこう
        * 弱点：みず、くさ、かくとう、じめん、はがね
        * 超弱点：なし

      * ゴーストタイプ
        * 超耐性：ノーマル、かくとう
        * 耐性：むし、ゴースト、どく
        * 弱点：ゴースト、あく
        * 超弱点：なし

      * ドラゴンタイプ
        * 超耐性：なし
        * 耐性：ほのお、みず、でんき、くさ
        * 弱点：こおり、ドラゴン、フェアリー
        * 超弱点：なし

      * あくタイプ
        * 超耐性：エスパー
        * 耐性：ゴースト、あく
        * 弱点：かくとう、むし、フェアリー
        * 超弱点：なし

      * はがねタイプ
        * 超耐性：どく
        * 耐性：ノーマル、くさ、こおり、ひこう、エスパー、いわ、ドラゴン、はがね、フェアリー
        * 弱点：ほのお、かくとう、じめん
        * 超弱点：なし

      * フェアリータイプ
        * 超耐性：ドラゴン
        * 耐性：かくとう、むし、あく
        * 弱点：どく、はがね
        * 超弱点：なし

      悪い点があれば改善する策を教えて下さい。アドバイスをしてください。
      他のポケモンの名前を挙げずにヒントだけお願いします。
    `;

    setIsLoading(true);
    const apiResponse = await gptChat(prompt);
    if (apiResponse) {
      console.log("API Response:", apiResponse);
      setResponses(apiResponse); // 既存の応答リストに新しい応答を追加
    } else {
      setResponses(["エラーが発生しました。もう一度試してください。"]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center py-4">
        <h2 className="text-black mb-4 flex">ポケモンパーティ評価<br/>※ChatGPT-4評価（実証実験中）</h2>
        <button
          onClick={handleEvaluate}
          className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded"
        >
          {isLoading ? "評価中..." : "評価"}
        </button>
      </div>
      <div className="">
        <div className="m-auto text-black">
            <p>{responses}</p>
        </div>
      </div>
    </>
  );
}