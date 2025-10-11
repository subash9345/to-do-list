import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MdCheckCircle, MdRadioButtonUnchecked, MdTrendingUp } from 'react-icons/md';
import Card from '../common/Card';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: ${({ $color, theme }) => $color || theme.colors.primary}20;
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const ProgressText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

/**
 * Statistics Component
 * Displays todo statistics and progress tracking
 */
const Statistics = React.memo(({ todos }) => {
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority breakdown
    const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;
    const mediumPriority = todos.filter(t => t.priority === 'medium' && !t.completed).length;
    const lowPriority = todos.filter(t => t.priority === 'low' && !t.completed).length;

    // Overdue todos
    const overdue = todos.filter(t => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length;

    return {
      total,
      completed,
      active,
      completionRate,
      highPriority,
      mediumPriority,
      lowPriority,
      overdue,
    };
  }, [todos]);

  return (
    <>
      <StatsGrid>
        <StatCard>
          <StatIcon $color="#6366f1">
            <MdTrendingUp />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Total Tasks</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#10b981">
            <MdCheckCircle />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.completed}</StatValue>
            <StatLabel>Completed</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#f59e0b">
            <MdRadioButtonUnchecked />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.active}</StatValue>
            <StatLabel>Active</StatLabel>
          </StatContent>
        </StatCard>

        {stats.overdue > 0 && (
          <StatCard>
            <StatIcon $color="#ef4444">
              ⏰
            </StatIcon>
            <StatContent>
              <StatValue>{stats.overdue}</StatValue>
              <StatLabel>Overdue</StatLabel>
            </StatContent>
          </StatCard>
        )}
      </StatsGrid>

      {stats.total > 0 && (
        <Card>
          <StatLabel>Completion Progress</StatLabel>
          <ProgressBar>
            <ProgressFill
              initial={{ width: 0 }}
              animate={{ width: `${stats.completionRate}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </ProgressBar>
          <ProgressText>{stats.completionRate}% Complete</ProgressText>

          {stats.active > 0 && (
            <>
              <StatLabel style={{ marginTop: '16px' }}>Active Tasks by Priority</StatLabel>
              <ProgressText>
                High: {stats.highPriority} | Medium: {stats.mediumPriority} | Low: {stats.lowPriority}
              </ProgressText>
            </>
          )}
        </Card>
      )}
    </>
  );
});

Statistics.displayName = 'Statistics';

export default Statistics;
