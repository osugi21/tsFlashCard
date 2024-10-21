import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function QuestionCard() {
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
        // onClick={handleClickCard}
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
          ></Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuestionCard;
