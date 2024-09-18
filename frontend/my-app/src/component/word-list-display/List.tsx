import React, { useEffect, useState } from 'react'
import axios from 'axios'

type ListItem = {
  id:number;
wordText:string;
  answerText:string;
}

function List() {
  const [word, setWord] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [list, setList] = useState<ListItem[]>([{id:0 ,wordText:'単語', answerText:'答え'}])
  const [deleteWord, setDeleteWord] = useState(false)


useEffect(()=> {
  axios.post('http://localhost:5000/')
  .then(response => setList(response.data.map((item: any)=>({
    id: item.id,
    wordText: item.word,
    answerText: item.answer,
  }),
  console.log('deleteのPOSTリクエストが成功しました。',response.data)))
)
  .catch(error => console.error('データ取得に失敗しました', error))
},[])


  const inputWordText =(e: { target: { value: React.SetStateAction<string>; }; }) =>{
    setWord(e.target.value)
  }

  const inputAnswerText = (e: { target: { value: React.SetStateAction<string>; }; }) =>{
    setAnswer(e.target.value)
  }

  const handleAddClick = () => {  
    axios.post('http://localhost:5000/post',{
      word:word,
      answer:answer
    })
    .then(response => {
      setList([...list, { id: response.data.id, wordText: word, answerText: answer }]);
      setWord('');
      setAnswer('');
    })
    .catch(error => console.log('POSTリクエストが失敗しました。',error))
  }

  const handleDeleteClick = (id: number,indexDelete:number) => {
    axios.post('http://localhost:5000/delete',{
      id: id
    })
    
    
    .then(response => {
      const newList = list.filter((_,index) => index !== indexDelete)
      setList(newList)
      console.log('deleteのPOSTリクエストが成功しました。',response.data)})
    .catch(error => console.log('deleteのPOSTリクエストが成功しました。',error))
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
             <button onClick={() => handleDeleteClick(item.id,index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List