import styled from 'styled-components'

const StyledTodo = styled.li`
  display: flex;
  justify-content: space-between;
  text-decoration: ${(pr) => (pr.$complete ? 'line-through' : 'initial')};
  cursor: pointer;
  transition: transform 150ms ease;

  div {
    display: flex;
    align-items: center;
  }

  span {
    color: #575767;
    margin-left: 10px;
    font-size: 18px;
    font-family: Inter;
    font-weight: 500;
  }
`

export default StyledTodo
