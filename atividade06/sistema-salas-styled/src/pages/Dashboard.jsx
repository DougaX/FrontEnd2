import { useSalas } from '../contexts/SalaContext';
import SalaCard from '../components/SalaCard';
import {
  DashboardContainer,
  Container,
  DashboardHeader,
  DashboardStats,
  StatCard,
  StatInfo,
  StatIcon,
  DashboardFilters,
  FilterButton,
  SalasGrid,
  EmptyState
} from '../styles/styled/Dashboard.styled';

const Dashboard = () => {
  const { 
    salasFiltradas, 
    filtro, 
    setFiltro,
    totalSalas,
    salasDisponiveis,
    salasOcupadas
  } = useSalas();

  return (
    <DashboardContainer>
      <Container>
        <DashboardHeader>
          <h1>Salas Disponíveis</h1>
          <p>Gerencie e reserve salas para suas aulas e atividades</p>
        </DashboardHeader>

        <DashboardStats>
          <StatCard>
            <StatInfo>
              <h3>{totalSalas}</h3>
              <p>Total de Salas</p>
            </StatInfo>
            <StatIcon>🏫</StatIcon>
          </StatCard>

          <StatCard>
            <StatInfo>
              <h3>{salasDisponiveis}</h3>
              <p>Salas Livres</p>
            </StatInfo>
            <StatIcon>✅</StatIcon>
          </StatCard>

          <StatCard>
            <StatInfo>
              <h3>{salasOcupadas}</h3>
              <p>Salas Ocupadas</p>
            </StatInfo>
            <StatIcon>🔒</StatIcon>
          </StatCard>
        </DashboardStats>

        <DashboardFilters>
          <FilterButton 
            className={filtro === 'todos' ? 'active' : ''}
            onClick={() => setFiltro('todos')}
          >
            Todas
          </FilterButton>
          <FilterButton 
            className={filtro === 'disponiveis' ? 'active' : ''}
            onClick={() => setFiltro('disponiveis')}
          >
            Disponíveis
          </FilterButton>
          <FilterButton 
            className={filtro === 'Sala de Aula' ? 'active' : ''}
            onClick={() => setFiltro('Sala de Aula')}
          >
            Salas de Aula
          </FilterButton>
          <FilterButton 
            className={filtro === 'Laboratório' ? 'active' : ''}
            onClick={() => setFiltro('Laboratório')}
          >
            Laboratórios
          </FilterButton>
          <FilterButton 
            className={filtro === 'Auditório' ? 'active' : ''}
            onClick={() => setFiltro('Auditório')}
          >
            Auditório
          </FilterButton>
          <FilterButton 
            className={filtro === 'Sala Especial' ? 'active' : ''}
            onClick={() => setFiltro('Sala Especial')}
          >
            Especiais
          </FilterButton>
        </DashboardFilters>

        {salasFiltradas.length === 0 ? (
          <EmptyState>
            <h2>Nenhuma sala encontrada</h2>
            <p>Tente ajustar os filtros</p>
          </EmptyState>
        ) : (
          <SalasGrid>
            {salasFiltradas.map(sala => (
              <SalaCard key={sala.id} sala={sala} />
            ))}
          </SalasGrid>
        )}
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;