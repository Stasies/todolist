import styled from "styled-components";

export const CardContainer = styled.div`
  margin-bottom: 100px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px; */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: fit-content;
  width: 50%;
  background-color: white;
  .icon {
    color: #d3d3d3;
    width: 20px;
    height: 20px;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  font-size: 18px;
  input::placeholder {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    margin: 20px;
    width: auto;
    min-width: 80%;
  }
`;
export const TaskInput = styled.div`
  /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; */
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  border-bottom: 1px solid #d3d3d3;
  input {
    width: 90%;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 300;
    font-family: "Roboto", sans-serif;
    &::placeholder {
      font-style: italic;
      color: #d3d3d3;
      font-weight: 300;
      font-size: 18px;
    }
  }
`;
export const TaskList = styled.div`
  border-bottom: 1px solid #d3d3d3;
`;
export const TaskItem = styled.div`
  padding: 0 10px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .taskItemLeft {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #d3d3d3;
  }
  p.finished {
    color: #d3d3d3;
    text-decoration: line-through;
  }
  input {
    border: none;
    border-bottom: 1px solid #d3d3d3;
    width: 100%;
    outline: none;
  }
`;
export const TaskNavigation = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  font-size: 14px;
  button {
    font-family: "Roboto", sans-serif;
    font-weight: 300;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 10px;
    gap: 10px;
    height: fit-content;
  }
`;
export const TaskNavigationLeft = styled.div``;
export const TaskNavigationCenter = styled.div`
  button {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 3px;
    outline: none;
    padding: 4px 7px;
    background-color: transparent;
    &.selected {
      border: 2px solid #adb9e3;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    button {
      padding: 2px 4px;
    }
  }
`;
export const TaskNavigationRight = styled.div`
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    &:hover {
      color: #adb9e3;
    }
  }
`;
