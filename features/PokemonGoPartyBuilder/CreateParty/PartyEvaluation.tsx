import React, { useState } from 'react';
import { chat } from './chatService'; // chatService.js から chat 関数をインポート

export default function PartyEvaluation() {
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pokemonA = "リザードン";
  const pokemonB = "ゲッコーガ";
  const pokemonC = "フシギバナ";

  const handleEvaluate = async () => {
    const prompt = `あなたはポケモンGOのPvPマスターです。私のパーティーは${pokemonA}、${pokemonB}、${pokemonC}です。ポケモンGOのPvPパーティとして評価してください。星五段階で答えて100文字程度で評論してください。最後に悪い点を改善するとしたらどうするかアドバイスをしてください。他のポケモンの名前を挙げるときは必ず存在するポケモンにしてください。`;
    console.log("Sending prompt:", prompt);

    setIsLoading(true);
    const apiResponse = await chat(prompt);
    if (apiResponse) {
      console.log("API Response:", apiResponse);
      setResponses(prevResponses => [...prevResponses, apiResponse]); // 既存の応答リストに新しい応答を追加
    } else {
      setResponses(prevResponses => [...prevResponses, "エラーが発生しました。もう一度試してください。"]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center py-4">
        <h2 className="text-black mb-4 flex">ポケモンパーティ評価</h2>
        <button
          onClick={handleEvaluate}
          className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded"
        >
          {isLoading ? "評価中..." : "評価"}
        </button>
      </div>
      <div className="">
        <div className="m-auto text-black">
          {responses.map((response, index) => (
            <p key={index}>{response}</p> // 各応答を個別の段落として表示
          ))}
        </div>
      </div>
    </>
  );
}