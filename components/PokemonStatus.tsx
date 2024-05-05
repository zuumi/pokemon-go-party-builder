import React, { useState } from "react";

export default function PokemonStatus({ pokemonData, image }: { pokemonData: any,image: any }) {
  const [selectedQuickMove, setSelectedQuickMove] = useState<any>(null);
  const [selectedSpecialQuickMove1, setSelectedSpecialQuickMove1] = useState<any>(null);
  const [selectedSpecialQuickMove2, setSelectedSpecialQuickMove2] = useState<any>(null);

  const handleChangeQuickMove = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moveId = e.target.value;
    const quickMove = pokemonData.quickMoves[moveId] || pokemonData.eliteQuickMoves[moveId];
    setSelectedQuickMove(quickMove);
  }
  const handleChangeSpecialQuickMove1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moveId = e.target.value;
    const cinematicMove = pokemonData.cinematicMoves[moveId] || pokemonData.eliteCinematicMoves[moveId];
    setSelectedSpecialQuickMove1(cinematicMove);
  }
  const handleChangeSpecialQuickMove2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moveId = e.target.value;
    const cinematicMove = pokemonData.cinematicMoves[moveId] || pokemonData.eliteCinematicMoves[moveId];
    setSelectedSpecialQuickMove2(cinematicMove);
  }

  const calculateActivationCount = (selectedQuickMove: any, selectedSpecialQuickMove: any) => {
    if (!selectedQuickMove || !selectedSpecialQuickMove) return ['-', '-', '-'];
    const energyPerQuickMove = selectedQuickMove.combat.energy;
    const energyNeeded = Math.abs(selectedSpecialQuickMove.combat.energy);

    // エネルギー増加量が0または負の値の場合、計算を行わない
    if (energyPerQuickMove <= 0) {
      console.error('Invalid energy per quick move value:', energyPerQuickMove);
      return ['-', '-', '-'];
    }

    let totalEnergy = 0;
    let count = 0;
    let preCount = 0;
    let countResult = 0;
    const counts = [];

    while (totalEnergy < energyNeeded && counts.length < 3) {
      totalEnergy += energyPerQuickMove;
      count++;
      if (totalEnergy >= energyNeeded) {
        countResult = count - preCount;
        counts.push(countResult);
        preCount = count;
        totalEnergy -= energyNeeded;
      }
    }
    return counts;
  };

  return (
    <>
      <div className="text-black mb-2">
        <p>タイプ１:{image && pokemonData.primaryType.names.Japanese}</p>
        <p>{image && pokemonData.secondaryType && `タイプ２:${pokemonData.secondaryType.names.Japanese}`}</p>
        <p>{image && !pokemonData.secondaryType && `-`}</p>
      </div>
    <label htmlFor="" className="text-black flex">
      ノーマル 
      <select className="block text-black w-full ml-6 mb-2 p-2 border rounded" onChange={handleChangeQuickMove}>
        {
          !selectedQuickMove &&
          (<option value="">選択して下さい</option>)
        }
        {
          image && pokemonData.quickMoves &&
          Object.entries(pokemonData.quickMoves).map(([key, quickMove]: [string, any]) => {
              return (<option key={key} value={key} className="text-black">{quickMove.names.Japanese}</option>)
            }
          )
        }
        {
          image && pokemonData.eliteQuickMoves &&
          Object.entries(pokemonData.eliteQuickMoves).map(([key, quickMove]: [string, any]) => {
              return (<option key={key} value={key} className="text-black">*{quickMove.names.Japanese}</option>)
            }
          )
        }
      </select>
    </label>
    <label htmlFor="" className="text-black flex">
      スペシャル1
      <select className="block text-black w-full ml-2 mb-2 p-2 border rounded" onChange={handleChangeSpecialQuickMove1}>
        {
          !selectedSpecialQuickMove1 &&
          (<option value="">選択して下さい</option>)
        }
        {
          image && pokemonData.cinematicMoves &&
          Object.entries(pokemonData.cinematicMoves).map(([key, cinematicMove]: [string, any]) => {
            return (<option key={key} value={key} className="text-black">{cinematicMove.names.Japanese}</option>)
          })
        }
        {
          image && pokemonData.eliteCinematicMoves &&
          Object.entries(pokemonData.eliteCinematicMoves).map(([key, eliteCinematicMove]: [string, any]) => {
            return (<option key={key} value={key} className="text-black">*{eliteCinematicMove.names.Japanese}</option>)
          })
        }
      </select>
    </label>
    <label htmlFor="" className="text-black flex">
      スペシャル2
      <select className="block text-black w-full ml-2 mb-2 p-2 border rounded" onChange={handleChangeSpecialQuickMove2}>
        {
          !selectedSpecialQuickMove2 &&
          (<option value="">選択して下さい</option>)
        }
        {
          image && pokemonData.cinematicMoves &&
          Object.entries(pokemonData.cinematicMoves).map(([key, cinematicMove]: [string, any]) => {
            return (<option key={key} value={key} className="text-black">{cinematicMove.names.Japanese}</option>)
          })
        }
        {
          image && pokemonData.eliteCinematicMoves &&
          Object.entries(pokemonData.eliteCinematicMoves).map(([key, eliteCinematicMove]: [string, any]) => {
            return (<option key={key} value={key} className="text-black">*{eliteCinematicMove.names.Japanese}</option>)
          })
        }
      </select>
    </label>
    <div className="text-black pt-5">
      <div>
        <p>↓ノーマル技のステータス↓<br/>
        {`${selectedQuickMove ? selectedQuickMove.combat.energy : '-'}エネルギ
          ${selectedQuickMove ? selectedQuickMove.combat.turns : '-'}ターン
          ${selectedQuickMove ? selectedQuickMove.combat.turns : '-'}ダメージ
        `}<br/>
        </p>
      </div>
      <div  className="pt-5">
        <label htmlFor="">↓スペシャル技のステータス↓<br/>
            <p>→1: {`${selectedSpecialQuickMove1 ? Math.abs(selectedSpecialQuickMove1.combat.energy) : '-'}`}消費<br/>
              蓄積必要数{selectedQuickMove && selectedSpecialQuickMove1 && calculateActivationCount(selectedQuickMove, selectedSpecialQuickMove1).map((count) => {
                  return (`…${count}`)
              })}
            </p>
            <p>→2: {`${selectedSpecialQuickMove2 ? Math.abs(selectedSpecialQuickMove2.combat.energy) : '-'}`}消費<br/>
              蓄積必要数{selectedQuickMove && selectedSpecialQuickMove2 && calculateActivationCount(selectedQuickMove, selectedSpecialQuickMove2).map((count) => {
                  return (`…${count}`)
              })}
            </p>
        </label>
      </div>
    </div>
  </>
  );
}