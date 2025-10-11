import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MdDarkMode, MdLightMode, MdSettings, MdKeyboard, MdFileDownload, MdFileUpload } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../common/Button';

const HeaderContainer = styled(motion.header)`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LogoIcon = styled(FaTasks)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const IconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }
`;

/**
 * Header Component
 * Top navigation bar with branding and actions
 */
const Header = React.memo(({ onOpenSettings, onOpenShortcuts, onExport, onImport }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <HeaderContent>
        <Logo>
          <LogoIcon />
          <LogoText>
            <LogoTitle>TaskMaster Pro</LogoTitle>
            <LogoSubtitle>Premium Todo Management</LogoSubtitle>
          </LogoText>
        </Logo>

        <Actions>
          <IconButton
            onClick={onExport}
            title="Export todos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdFileDownload size={20} />
          </IconButton>

          <IconButton
            onClick={onImport}
            title="Import todos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdFileUpload size={20} />
          </IconButton>

          <IconButton
            onClick={onOpenShortcuts}
            title="Keyboard shortcuts"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdKeyboard size={20} />
          </IconButton>

          <IconButton
            onClick={toggleTheme}
            title={isDark ? 'Light mode' : 'Dark mode'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </IconButton>

          <IconButton
            onClick={onOpenSettings}
            title="Settings"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdSettings size={20} />
          </IconButton>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
});

Header.displayName = 'Header';

export default Header;
