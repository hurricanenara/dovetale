import styled from "styled-components";

const Saved = (props) => {
  const StyledDiv = styled.div`
    color: #a39ae0;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  `;
  return <StyledDiv>Saved</StyledDiv>;
};

export default Saved;
