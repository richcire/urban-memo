import { useDrop } from "react-dnd";
import styled from "styled-components";
import Label from "./Label";

const BoardContainer = styled.ul`
  background-color: bisque;
  width: 30%;
  min-height: 500px;
`;

interface IBoard {
  labelList: (string | null)[];
}
function Board({ labelList }: IBoard) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "label",
    drop: () => ({ name: "board" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <BoardContainer ref={drop}>
      {labelList.map((todo) => (
        <Label key={todo} text={todo}></Label>
      ))}
    </BoardContainer>
  );
}

export default Board;
