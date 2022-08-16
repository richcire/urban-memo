import styled from "styled-components";

const BoardContainer = styled.ul`
  background-color: bisque;
  width: 30%;
  min-height: 500px;
`;

const Label = styled.li``;

interface IBoard {
  labelList: (string | null)[];
}
function Board({ labelList }: IBoard) {
  return (
    <BoardContainer>
      {labelList.map((todo) => (
        <Label>{todo}</Label>
      ))}
    </BoardContainer>
  );
}

export default Board;
