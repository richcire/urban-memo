import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { recoilStorage } from "../atom";

const InputContainer = styled.form`
  width: 100%;
  max-width: 1300px;
  height: 100px;
  background-color: aqua;
  margin: 0 auto;
  margin-top: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TodoInput = styled.input``;

function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const [storage, setStorage] = useRecoilState(recoilStorage);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTodoList = [...storage.todo, inputValue];
    console.log(currentTodoList);
    setStorage((prev) => ({
      ...prev,
      todo: currentTodoList,
    }));
    window.localStorage.setItem("data", JSON.stringify(storage));
    setInputValue("");
  };

  return (
    <InputContainer onSubmit={handleSubmit}>
      <TodoInput type="text" value={inputValue} onChange={handleChange} />
    </InputContainer>
  );
}

export default TodoForm;
