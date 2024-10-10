import React, { useEffect, useState } from "react";
import axios from "axios";
import { typographyClasses } from "@mui/material";

type ListItem = {
  id: number;
  word: string;
  answer: string;
};

type DbListItem = {
  class: null;
  id: number;
  word: string;
  answer: string;
};

function List() {
  const [wordText, setWordText] = useState<string>("");
  const [answerText, setAnswerText] = useState<string>("");
  const [list, setList] = useState<ListItem[]>([
    { id: 0, word: "単語", answer: "答え" },
  ]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/")
      .then((response) => {
        console.log("レスポンスデータ", response.data);
        const filteredList: ListItem[] = response.data
          // .reduce((acc: { word: string; answer: string }[], item: ListItem) => {
          //   acc[item.id] = { word: item.wordText, answer: item.answerText };
          // })
          .filter(
            (item: ListItem) =>
              item.id && item.word && item.answer
          );
        // .map((item: ListItem) => ({
        //   id: item.id,
        //   wordText: item.wordText,
        //   answerText: item.answerText,
        // }));
        console.log(filteredList);
        setList(filteredList);
      })
      .catch((error) => console.error("データ取得に失敗しました", error));
  }, []);

  // 取得したデータをリストにセット
  // const listItem: ListItem = {
  //   answer: "hot",
  //   class: null,
  //   id: 17,
  //   word: "熱い",
  // };
  // const listItem: ListItem = {
  //   id: 17,
  //   wordText: "熱い",
  //   answerText: "hot",
  // };

  // setList(
  //   response.data.map(
  //     (item: ListItem) => ({
  //       id: item.id,
  //       wordText: item.wordText,
  //       answerText: item.answerText,
  //     }),
  //     console.log("POSTリクエストが成功しました。", response.data)
  //   )
  //

  const inputWordText = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setWordText(e.target.value);
  };

  const inputAnswerText = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAnswerText(e.target.value);
  };

  const handleAddClick = () => {
    axios
      .post("http://localhost:5000/post", {
        word: wordText,
        answer: answerText,
      })
      .then((response) => {
        setList([
          ...list,
          { id: response.data.id, word: wordText, answer: answerText },
        ]);
        setWordText("");
        setAnswerText("");
      })
      .catch((error) =>
        console.log("追加のPOSTリクエストが失敗しました。", error)
      );
  };

  const handleDeleteClick = (id: number, indexDelete: number) => {
    axios
      .post("http://localhost:5000/delete", {
        id: id,
      })

      .then((response) => {
        const newList = list.filter((_, index) => index !== indexDelete);
        setList(newList);
        console.log("deleteのPOSTリクエストが成功しました。", response.data);
      })
      .catch((error) =>
        console.log("deleteのPOSTリクエストが成功しました。", error)
      );
  };

  return (
    <div>
      <h3> 単語帳編集画面</h3>
      Q.
      <input type="text" value={wordText} onChange={inputWordText} />
      A.
      <input type="text" value={answerText} onChange={inputAnswerText} />
      <button onClick={handleAddClick}>追加</button>
      <ul>
        {list.map((item, index) => (
          <li key={item.id}>
            Q: {item.word} - A: {item.answer}
            <button onClick={() => handleDeleteClick(item.id, index)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
