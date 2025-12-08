import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium} ${({ theme }) => theme.colors.black};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.large} ${({ theme }) => theme.colors.black};
    transform: translate(-2px, -2px);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.black};
    flex: 1;
    font-weight: 700;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &.success {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }

  &.danger {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  &.warning {
    background-color: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

export const CardInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CardRecursos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const RecursoTag = styled.span`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  button {
    flex: 1;
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;