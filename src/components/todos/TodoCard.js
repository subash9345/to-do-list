import React from 'react';
import styled from 'styled-components';
import { format, isPast } from 'date-fns';
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdDelete,
  MdEdit,
  MdCalendarToday,
  MdLabel,
  MdComment,
  MdAttachFile,
} from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from '../common/Card';

const TodoCardContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: grab;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  border-left: 4px solid ${({ $priority, theme }) => {
    if ($priority === 'high') return theme.colors.priorityHigh;
    if ($priority === 'medium') return theme.colors.priorityMedium;
    return theme.colors.priorityLow;
  }};
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CheckboxButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: ${({ $completed, theme }) => ($completed ? theme.colors.success : theme.colors.textTertiary)};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TodoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TodoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme, $completed }) => ($completed ? theme.colors.textTertiary : theme.colors.text)};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  word-wrap: break-word;
`;

const TodoDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TodoMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $isOverdue }) => ($isOverdue ? theme.colors.error : theme.colors.textSecondary)};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
`;

const CategoryBadge = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  ${TodoCardContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === 'danger' ? theme.colors.error : theme.colors.primary};
    color: white;
  }
`;

const SubtaskProgress = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * TodoCard Component
 * Premium todo item with full feature support
 */
const TodoCard = React.memo(({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isOverdue = todo.dueDate && isPast(new Date(todo.dueDate)) && !todo.completed;
  const completedSubtasks = todo.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = todo.subtasks?.length || 0;

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(todo);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(todo.id);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(todo.id);
  };

  return (
    <TodoCardContainer
      ref={setNodeRef}
      style={style}
      $priority={todo.priority}
      $isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <TodoHeader>
        <CheckboxButton
          $completed={todo.completed}
          onClick={handleToggle}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? <MdCheckCircle size={24} /> : <MdRadioButtonUnchecked size={24} />}
        </CheckboxButton>

        <TodoContent>
          <TodoTitle $completed={todo.completed}>{todo.text}</TodoTitle>
          {todo.description && <TodoDescription>{todo.description}</TodoDescription>}

          {todo.category && <CategoryBadge>{todo.category}</CategoryBadge>}

          {todo.tags && todo.tags.length > 0 && (
            <Tags>
              {todo.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
          )}

          <TodoMeta>
            {todo.dueDate && (
              <MetaItem $isOverdue={isOverdue}>
                <MdCalendarToday size={16} />
                {format(new Date(todo.dueDate), 'MMM d, yyyy')}
              </MetaItem>
            )}

            {todo.comments && todo.comments.length > 0 && (
              <MetaItem>
                <MdComment size={16} />
                {todo.comments.length}
              </MetaItem>
            )}

            {todo.attachments && todo.attachments.length > 0 && (
              <MetaItem>
                <MdAttachFile size={16} />
                {todo.attachments.length}
              </MetaItem>
            )}
          </TodoMeta>

          {totalSubtasks > 0 && (
            <SubtaskProgress>
              Subtasks: {completedSubtasks}/{totalSubtasks} completed
            </SubtaskProgress>
          )}
        </TodoContent>

        <Actions>
          <ActionButton onClick={handleEdit} aria-label="Edit todo">
            <MdEdit size={18} />
          </ActionButton>
          <ActionButton
            $variant="danger"
            onClick={handleDelete}
            aria-label="Delete todo"
          >
            <MdDelete size={18} />
          </ActionButton>
        </Actions>
      </TodoHeader>
    </TodoCardContainer>
  );
});

TodoCard.displayName = 'TodoCard';

export default TodoCard;
