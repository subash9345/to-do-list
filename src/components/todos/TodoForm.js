import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdAdd, MdClose } from 'react-icons/md';
import Input from '../common/Input';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { PRIORITY, DEFAULT_CATEGORIES } from '../../types/todo';

const FormGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns || '1fr'};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 42px;
`;

const TagItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TagRemoveButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const TagInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  min-width: 100px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

/**
 * TodoForm Component
 * Advanced form for creating/editing todos
 */
const TodoForm = React.memo(({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    text: '',
    description: '',
    priority: PRIORITY.MEDIUM,
    category: DEFAULT_CATEGORIES[0].name,
    dueDate: '',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        text: initialData.text || '',
        description: initialData.description || '',
        priority: initialData.priority || PRIORITY.MEDIUM,
        category: initialData.category || DEFAULT_CATEGORIES[0].name,
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
        tags: initialData.tags || [],
      });
    } else {
      setFormData({
        text: '',
        description: '',
        priority: PRIORITY.MEDIUM,
        category: DEFAULT_CATEGORIES[0].name,
        dueDate: '',
        tags: [],
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) return;

    onSubmit({
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    });

    onClose();
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Todo' : 'Create New Todo'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <Input
            label="Title *"
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Enter todo title..."
            required
          />

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Add more details..."
            multiline
            minHeight="100px"
          />

          <FormRow $columns="1fr 1fr 1fr">
            <div>
              <Label>Priority</Label>
              <SelectInput
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value={PRIORITY.LOW}>Low</option>
                <option value={PRIORITY.MEDIUM}>Medium</option>
                <option value={PRIORITY.HIGH}>High</option>
              </SelectInput>
            </div>

            <div>
              <Label>Category</Label>
              <SelectInput
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                {DEFAULT_CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </SelectInput>
            </div>

            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </FormRow>

          <div>
            <Label>Tags (press Enter to add)</Label>
            <TagsInput>
              {formData.tags.map(tag => (
                <TagItem key={tag}>
                  {tag}
                  <TagRemoveButton type="button" onClick={() => handleRemoveTag(tag)}>
                    <MdClose size={14} />
                  </TagRemoveButton>
                </TagItem>
              ))}
              <TagInput
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags..."
              />
            </TagsInput>
          </div>

          <FormRow $columns="1fr 1fr">
            <Button type="button" variant="ghost" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              {initialData ? 'Update Todo' : 'Create Todo'}
            </Button>
          </FormRow>
        </FormGrid>
      </form>
    </Modal>
  );
});

TodoForm.displayName = 'TodoForm';

export default TodoForm;
