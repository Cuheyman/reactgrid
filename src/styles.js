import styled from '@emotion/styled';

const Styles = styled.div`
  padding: 1rem;
  display: flex;
`;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 50%;
  transition: width 0.8s;
`;

const ArrowsContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
`;

const ArrowButton = styled.button`
  border: none;
  background: transparent;
  padding: 1.0rem;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export default { Styles, Container, ArrowsContainer, ArrowButton };
