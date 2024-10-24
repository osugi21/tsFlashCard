import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import ResetCard from "./ResetCard";

export type CardItem = {
  category: string;
  id: number;
  word: string;
  answer: string;
};

type List = CardItem[];

type ClickCardLength = number;

export type ResetCard = () => void;

function Cards(props: CardItem) {
  const [clickCardLength, setClickCardLength] = useState<ClickCardLength>(0);
  const [list, setList] = useState<List>([
    { category: "未分類", id: 0, word: "単語", answer: "答え" },
  ]);
  const [isReset, setIsReset] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/")
      .then((response) => {
        const shuffleArray = () => {
          const array = response.data.map((item: CardItem) => ({
            category: item.category,
            id: item.id,
            word: item.word,
            answer: item.answer,
          }));
          for (let i = array.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };
        setList(shuffleArray());
        console.log(shuffleArray());
      })
      .catch((error) => console.error("データ取得に失敗しました", error));
  }, []);

  const handleClickCard = () => {
    setClickCardLength(clickCardLength + 1);
    console.log(clickCardLength);
  };

  const resetCard: ResetCard = () => {
    setClickCardLength(0);
    setIsReset(!isReset);
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/")
      .then((response) => {
        const shuffleArray = () => {
          const array = response.data.map((item: CardItem) => ({
            category: item.category,
            id: item.id,
            word: item.word,
            answer: item.answer,
          }));
          for (let i = array.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };
        setList(shuffleArray());
        console.log(shuffleArray());
      })
      .catch((error) => console.error("データ取得に失敗しました", error));
  }, [isReset]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {clickCardLength < list.length * 2 ? (
        clickCardLength % 2 === 0 ? (
          <QuestionCard
            category={"未分類"}
            id={0}
            word={"問題文"}
            answer={"答え"}
            clickCardLength={clickCardLength}
            list={list}
            handleClickCard={handleClickCard}
          />
        ) : (
          <AnswerCard
            category={"未分類"}
            id={0}
            word={"問題文"}
            answer={"答え"}
            clickCardLength={clickCardLength}
            list={list}
            handleClickCard={handleClickCard}
          />
        )
      ) : (
        <ResetCard resetCard={resetCard} />
      )}
    </div>
  );
}

export default Cards;
