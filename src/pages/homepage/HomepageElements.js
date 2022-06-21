import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: whitesmoke;
  h1 {
    font-weight: 400;
    font-size: 72px;
    background: -webkit-linear-gradient(right, #adb9e3, #a379c9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media screen and (max-width: 768px) {
    h1 {
      margin: 20px;
    }
    min-width: 270px;
  }
`;
