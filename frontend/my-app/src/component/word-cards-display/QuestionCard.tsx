import { Card, CardContent, Typography } from "@mui/material";
import { CardItem } from "./Cards";

type ListProps = CardItem[];

type ClickCardLengthProps = number;

type QuestionItemProps = {
  category: string;
  id: number;
  word: string;
  answer: string;
  list: ListProps;
  clickCardLength: ClickCardLengthProps;
  handleClickCard: () => void;
};

function QuestionCard(props: QuestionItemProps) {
  const { list, clickCardLength, handleClickCard } = props;

  const questionCardDisplay = () => {
    const index = Math.floor(clickCardLength / 2);
    if (index < list.length) {
      return list[index].word;
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
            Q.{questionCardDisplay()}
          </Typography>
          <button className="button" onClick={handleClickCard}>
            答え
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuestionCard;
