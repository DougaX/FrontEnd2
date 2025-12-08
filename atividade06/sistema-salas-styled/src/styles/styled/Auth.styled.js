import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const AuthBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spacing.xxl};
  width: 100%;
  max-width: 450px;
  box-shadow: ${({ theme }) => theme.shadows.large} ${({ theme }) => theme.colors.black};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  }
`;

export const AuthLogo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  span {
    font-size: 64px;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    color: ${({ theme }) => theme.colors.black};
    margin-top: ${({ theme }) => theme.spacing.sm};
    font-weight: 700;
  }

  p {
    color: ${({ theme }) => theme.colors.grayDark};
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

export const AuthForm = styled.form`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }

  input, textarea, select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.normal};
    transition: all ${({ theme }) => theme.transitions.normal};

    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.shadows.small} ${({ theme }) => theme.colors.black};
      transform: translate(-2px, -2px);
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.grayMedium};
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

export const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.small};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

export const ForgotLink = styled.a`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  }
`;

export const AuthDivider = styled.div`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.black};
  }

  span {
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0 ${({ theme }) => theme.spacing.md};
    position: relative;
    color: ${({ theme }) => theme.colors.black};
    font-weight: 600;
  }
`;

export const AuthSwitch = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: ${({ theme }) => theme.fontSizes.small};

  a {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 600;
    margin-left: ${({ theme }) => theme.spacing.xs};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};

    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    }
  }
`;

export const Message = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: 600;
  text-align: center;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.success {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }

  &.error {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;