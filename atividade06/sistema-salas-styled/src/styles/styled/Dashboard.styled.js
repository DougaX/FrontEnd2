import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export const DashboardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h1 {
      font-size: ${({ theme }) => theme.fontSizes.xlarge};
    }
  }
`;

export const DashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.medium} ${({ theme }) => theme.colors.black};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadows.large} ${({ theme }) => theme.colors.black};
  }
`;

export const StatInfo = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-weight: 700;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.small};
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const StatIcon = styled.div`
  font-size: 48px;
  opacity: 0.7;
`;

export const DashboardFilters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.borders.medium} ${({ theme }) => theme.colors.black};
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.small} ${({ theme }) => theme.colors.black};
    transform: translate(-2px, -2px);
  }
`;

export const SalasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.grayDark};
  border: 2px dashed ${({ theme }) => theme.colors.black};
  margin-top: ${({ theme }) => theme.spacing.xxl};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.black};
  }
`;