import { Card, CardContent, Typography } from "@mui/material";
import { CardItem } from "./Cards";

type ListProps = CardItem[];

type ClickCardLengthProps = number;

type AnswerItemProps = {
  category: string;
  id: number;
  word: string;
  answer: string;
  clickCardLength: ClickCardLengthProps;
  list: ListProps;
  handleClickCard: () => void;
};

function AnswerCard(props: AnswerItemProps) {
  const { clickCardLength, list, handleClickCard } = props;

  const answerCardDisplay = () => {
    const index = Math.floor(clickCardLength / 2);
    if (index < list.length) {
      return list[index].answer;
    } else {
      return "終わり";
    }
  };

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
            A.{answerCardDisplay()}
          </Typography>
          <button className="button" onClick={handleClickCard}>
            次の問題
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnswerCard;
