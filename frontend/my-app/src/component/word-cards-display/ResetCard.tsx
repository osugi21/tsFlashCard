import { Card, CardContent } from "@mui/material";
import React from "react";

type ResetCardProps = {
  resetCard: () => void;
};

function ResetCard(props: ResetCardProps) {
  const { resetCard } = props;
  return (
    <div>
      <Card className="card" sx={{ minWidth: 275, width: 400, height: 200 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "left",
          }}
        >
          <button className="reset-button" onClick={resetCard}>
            もう一度
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetCard;
