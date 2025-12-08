import styled, { css } from 'styled-components';

const buttonBase = css`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  ${buttonBase}
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.small} ${({ theme }) => theme.colors.black};
    transform: translate(-2px, -2px);
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.small} ${({ theme }) => theme.colors.black};
    transform: translate(-1px, -1px);
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.grayLight};
  }
`;

export const ButtonDanger = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.danger};

  &:hover:not(:disabled) {
    background-color: #cc0000;
    box-shadow: ${({ theme }) => theme.shadows.small} ${({ theme }) => theme.colors.danger};
  }
`;

export const ButtonSmall = styled(Button)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;