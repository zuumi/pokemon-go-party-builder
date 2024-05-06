import React, { useState } from 'react';
import { chat } from './chatService'; // chatService.js から chat 関数をインポート
import { useSelector } from "react-redux";

export default function PartyEvaluation() {
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const state: any = useSelector((state: any) => state.partyData.data);
  const selectedPokemonPatry = state.map((pokemon: {index: number,id: number, name: string}) => pokemon.name);

  const handleEvaluate = async () => {
    const prompt = `あなたはポケモンGOのPvPマスターです。私のパーティーは${selectedPokemonPatry[0]}、${selectedPokemonPatry[1]}、${selectedPokemonPatry[2]}です。ポケモンGOのPvPパーティとして評価してください。星五段階で答えて100文字程度で評論してください。最後に悪い点を改善するとしたらどうするかアドバイスをしてください。他のポケモンの名前を挙げるときは必ず存在するポケモンにしてください。`;
    console.log("Sending prompt:", prompt);

    setIsLoading(true);
    const apiResponse = await chat(prompt);
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