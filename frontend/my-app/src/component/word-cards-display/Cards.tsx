import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Cards() {
const [clickCardLength, setClickCardLength] = useState(0)

  const handleClickCard = () =>{
  setClickCardLength(clickCardLength + 1)
  console.log(clickCardLength)
}
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ minWidth: 275, width: 400, height: 200  }} onClick={handleClickCard}>
      <CardContent sx={{
            display: 'flex',
            justifyContent: 'center',   
            alignItems: 'center',       
            height: '100%',   
            textAlign: 'left'         
          }}>
            
      <Typography gutterBottom sx={{ 
            color: 'text.secondary', 
            fontSize: 22, 
            wordWrap: 'break-word',
            whiteSpace: 'normal', 
            maxWidth: '100%' }}>
           {clickCardLength %2 === 0
           ? "問題（単語）"
           : "答え"
           }
        </Typography>
      </CardContent>
      </Card>
    </div>
  )
}

export default Cards


