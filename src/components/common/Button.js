import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ $size, theme }) => {
    if ($size === 'sm') return `${theme.spacing.sm} ${theme.spacing.md}`;
    if ($size === 'lg') return `${theme.spacing.md} ${theme.spacing.xl}`;
    return `${theme.spacing.sm} ${theme.spacing.lg}`;
  }};
  font-size: ${({ $size, theme }) => {
    if ($size === 'sm') return theme.fontSizes.sm;
    if ($size === 'lg') return theme.fontSizes.lg;
    return theme.fontSizes.base;
  }};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;

  /* Variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          box-shadow: 0 2px 4px ${theme.colors.shadow};

          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: 0 4px 8px ${theme.colors.shadowMedium};
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.backgroundTertiary};
          color: ${theme.colors.text};

          &:hover:not(:disabled) {
            background: ${theme.colors.border};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: white;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text};

          &:hover:not(:disabled) {
            background: ${theme.colors.backgroundTertiary};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: white;

          &:hover:not(:disabled) {
            background: ${theme.colors.error};
            filter: brightness(0.9);
          }
        `;
      default:
        return '';
    }
  }}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
`;

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */
const Button = React.memo(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  icon,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;
