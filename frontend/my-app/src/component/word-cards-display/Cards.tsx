import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



function Cards() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ minWidth: 275, width: 400, height: 200  }}>
      <CardContent sx={{
            display: 'flex',
            justifyContent: 'center',   
            alignItems: 'center',       
            height: '100%',   
            textAlign: 'left',          
          }}>
      <Typography gutterBottom sx={{ 
            color: 'text.secondary', 
            fontSize: 22, 
            wordWrap: 'break-word',
            whiteSpace: 'normal', 
            maxWidth: '100%', }}>
              単語・word・タンゴ
        </Typography>
      </CardContent>
      </Card>
    </div>
  )
}

export default Cards


