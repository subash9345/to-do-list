import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Modal from '../common/Modal';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SettingSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SettingLabel = styled.div`
  flex: 1;
`;

const SettingTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SettingDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ToggleSwitch = styled.button`
  position: relative;
  width: 48px;
  height: 28px;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.backgroundTertiary)};
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $active }) => ($active ? '23px' : '3px')};
    width: 22px;
    height: 22px;
    background: white;
    border-radius: 50%;
    transition: left ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    opacity: 0.9;
  }
`;

/**
 * Settings Component
 * Application settings modal
 */
const Settings = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="600px">
      <SettingsContainer>
        <SettingsHeader>
          <Title>Settings</Title>
          <CloseButton onClick={onClose} aria-label="Close settings">
            <MdClose size={24} />
          </CloseButton>
        </SettingsHeader>

        <SettingSection>
          <SectionTitle>Appearance</SectionTitle>
          <SettingItem>
            <SettingLabel>
              <SettingTitle>Dark Mode</SettingTitle>
              <SettingDescription>
                Switch between light and dark theme
              </SettingDescription>
            </SettingLabel>
            <ToggleSwitch
              $active={isDark}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            />
          </SettingItem>
        </SettingSection>

        <SettingSection>
          <SectionTitle>About</SectionTitle>
          <SettingItem>
            <SettingLabel>
              <SettingTitle>Version</SettingTitle>
              <SettingDescription>TaskMaster Pro v1.0.0</SettingDescription>
            </SettingLabel>
          </SettingItem>
        </SettingSection>
      </SettingsContainer>
    </Modal>
  );
};

export default Settings;
