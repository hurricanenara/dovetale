import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  left: 2rem;
  top: 1.5rem;
  font-size: 30px;
  margin: 5px;
`;

const Save = () => {
  return (
    <StyledDiv>
      <FontAwesomeIcon icon={farHeart} />
    </StyledDiv>
  );
};

export default Save;
