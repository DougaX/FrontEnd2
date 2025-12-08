import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xxl} 0 ${({ theme }) => theme.spacing.lg};
  margin-top: auto;
  border-top: ${({ theme }) => theme.borders.thick} ${({ theme }) => theme.colors.black};
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const FooterSection = styled.div`
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.white};
    border-bottom: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.white};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p, ul {
    color: ${({ theme }) => theme.colors.grayMedium};
    line-height: 1.8;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
  }

  a {
    color: ${({ theme }) => theme.colors.grayMedium};
    transition: color ${({ theme }) => theme.transitions.normal};

    &:hover {
      color: ${({ theme }) => theme.colors.white};
      text-decoration: underline;
    }
  }
`;

export const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  border-top: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.grayDark};
  padding-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.grayMedium};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;