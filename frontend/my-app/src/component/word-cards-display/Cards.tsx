import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

type CardItem = {
  class: string;
  id: number;
  word: string;
  answer: string;
};

// データベースに入れた単語と答えを交互にランダムにカードに反映させたい

// データベースとカードのフロントエンドを繋げる
// データベースのwordとanswerがフロントエンドで別々に反映されるようにしたい
// idが同じwordとanswerが交互に反映されてほしい

function Cards(props: CardItem) {
  const { word, answer } = props;
  const [clickCardLength, setClickCardLength] = useState(0);
  const [list, setList] = useState<CardItem[]>([
    { class: "未分類", id: 0, word: "単語", answer: "答え" },
  ]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/")
      .then((response) => {
        const shuffleArray = () => {
          const array = response.data.map((item: CardItem) => ({
            class: item.class,
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

  const cardDisplay = () => {
    if (clickCardLength < list.length * 2) {
      if (clickCardLength % 2 === 0) {
        const index = clickCardLength / 2;
        if (index < list.length) {
          return list[index].word;
        }
      } else {
        const index = (clickCardLength - 1) / 2;
        return list[index].answer;
      }
    }else{
      return ("終わり")
    }
  };
  // clickCardLength % 2 === 0 ? list[clickCardLength].word : list[clickCardLength-1].answer
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{ minWidth: 275, width: 400, height: 200 }}
        onClick={handleClickCard}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "left",
          }}
        >
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              fontSize: 22,
              wordWrap: "break-word",
              whiteSpace: "normal",
              maxWidth: "100%",
            }}
          >
            {/* 偶数の時はresponse.dataのword反映される。奇数の時はresponse.dataのさっき反映されたwordとおなじidのanswerが反映される。 */}
            {/* {if(list.length-1 ===clickCardLength){clickCardLength % 2 === 0 ? list[clickCardLength].word : list[clickCardLength-1].answer}} */}
            {cardDisplay()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Cards;
