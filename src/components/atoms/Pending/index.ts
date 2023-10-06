import { styled } from "styled-components";

const PendingStyled = styled.div<{ $status?: boolean }>`
    color: ${(props) => (props.$status ? "#7cb305" : "#d4380d")};
`;

export default PendingStyled;
