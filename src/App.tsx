import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import { recoilStorage } from "./atom";
import Board from "./components/Board";
import TodoForm from "./components/TodoForm";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const BoardsContainer = styled.section`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  min-height: 600px;
  background-color: beige;
  margin: 0 auto;

  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

function App() {
  const [storage, setStorage] = useRecoilState(recoilStorage);
  useEffect(() => {
    const localStorageData = window.localStorage.getItem("data");
    if (localStorageData) {
      setStorage(JSON.parse(localStorageData));
    }
  }, []);

  return (
    <>
      <GlobalStyle />

      <TodoForm />
      <BoardsContainer>
        <Board labelList={storage.done} />
        <Board labelList={storage.todo} />
        <Board labelList={storage.willDo} />
      </BoardsContainer>
    </>
  );
}

export default App;
