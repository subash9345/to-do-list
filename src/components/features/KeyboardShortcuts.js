import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import { MdKeyboard } from 'react-icons/md';

const ShortcutsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ShortcutGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const GroupTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ShortcutItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ShortcutDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
`;

const ShortcutKeys = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Key = styled.kbd`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  box-shadow: 0 2px 0 ${({ theme }) => theme.colors.border};
`;

const shortcuts = [
  {
    group: 'General',
    items: [
      { description: 'Create new todo', keys: ['Ctrl', 'N'] },
      { description: 'Search todos', keys: ['Ctrl', 'K'] },
      { description: 'Toggle theme', keys: ['Ctrl', 'T'] },
      { description: 'Open settings', keys: ['Ctrl', ','] },
      { description: 'Show shortcuts', keys: ['Ctrl', '/'] },
    ],
  },
  {
    group: 'Todo Actions',
    items: [
      { description: 'Undo action', keys: ['Ctrl', 'Z'] },
      { description: 'Redo action', keys: ['Ctrl', 'Shift', 'Z'] },
      { description: 'Delete todo', keys: ['Delete'] },
    ],
  },
  {
    group: 'Navigation',
    items: [
      { description: 'Close modal/dialog', keys: ['Esc'] },
      { description: 'Navigate up', keys: ['↑'] },
      { description: 'Navigate down', keys: ['↓'] },
    ],
  },
];

/**
 * KeyboardShortcuts Component
 * Displays available keyboard shortcuts
 */
const KeyboardShortcuts = React.memo(({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Keyboard Shortcuts"
      size="md"
    >
      <ShortcutsGrid>
        {shortcuts.map((group) => (
          <ShortcutGroup key={group.group}>
            <GroupTitle>
              <MdKeyboard size={20} />
              {group.group}
            </GroupTitle>
            {group.items.map((shortcut, index) => (
              <ShortcutItem key={index}>
                <ShortcutDescription>{shortcut.description}</ShortcutDescription>
                <ShortcutKeys>
                  {shortcut.keys.map((key, i) => (
                    <Key key={i}>{key}</Key>
                  ))}
                </ShortcutKeys>
              </ShortcutItem>
            ))}
          </ShortcutGroup>
        ))}
      </ShortcutsGrid>
    </Modal>
  );
});

KeyboardShortcuts.displayName = 'KeyboardShortcuts';

export default KeyboardShortcuts;
