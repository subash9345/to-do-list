import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  transition: all ${({ theme }) => theme.transitions.base};
  overflow: hidden;

  ${({ $hoverable }) =>
    $hoverable &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}

  ${({ $padding, theme }) => {
    if ($padding === 'none') return 'padding: 0;';
    if ($padding === 'sm') return `padding: ${theme.spacing.sm};`;
    if ($padding === 'lg') return `padding: ${theme.spacing.xl};`;
    return `padding: ${theme.spacing.lg};`;
  }}
`;

/**
 * Card Component
 * Reusable card container with optional hover effects
 */
const Card = React.memo(({
  children,
  hoverable = false,
  padding = 'md',
  onClick,
  ...props
}) => {
  return (
    <StyledCard
      $hoverable={hoverable}
      $padding={padding}
      onClick={onClick}
      whileHover={hoverable ? { y: -2 } : {}}
      {...props}
    >
      {children}
    </StyledCard>
  );
});

Card.displayName = 'Card';

export default Card;
