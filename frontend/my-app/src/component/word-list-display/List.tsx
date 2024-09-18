import React, { useEffect, useState } from 'react'
import axios from 'axios'

type ListItem = {
  wordText:string;
  answerText:string;
}

function List() {
  const [word, setWord] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [list, setList] = useState<ListItem[]>([{wordText:'単語', answerText:'答え'}])
  const [deleteWord, setDeleteWord] = useState(false)

  const inputWordText =(e: { target: { value: React.SetStateAction<string>; }; }) =>{
    setWord(e.target.value)
  }

  const inputAnswerText = (e: { target: { value: React.SetStateAction<string>; }; }) =>{
    setAnswer(e.target.value)
  }

  const handleAddClick = () => {
    setList([...list,{wordText:word, answerText:answer}])
    setWord('')
    setAnswer('')
    axios.post('http://localhost:5000/post',{
      word:word,
      answer:answer
    })
    .then(response => console.log('POSTリクエストが成功しました。',response.data))
    .catch(error => console.log('POSTリクエストが成功しました。',error))
    console.log(list)
  }

  const handleDeleteClick = (indexDelete:number) => {
    const newList = list.filter((_,index) => index !== indexDelete)
    setList(newList)
  }

  return (
    <div>
      <h3> 単語帳編集画面</h3>
      Q.<input type='text' value={word} onChange={inputWordText}/>
      A.<input type='textarea' value={answer} onChange={inputAnswerText}/>
      <button onClick={handleAddClick}>追加</button>
      

      <ul>
        {list.map((item, index)=> (
          <li key={index}>
             Q: {item.wordText} - A: {item.answerText}
             <button onClick={() => handleDeleteClick(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List