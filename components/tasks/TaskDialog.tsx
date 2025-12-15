'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaskStatus, TaskPriority } from '@prisma/client';
import { createTask, updateTask } from '@/actions/tasks';

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: {
    id: string;
    title: string;
    description?: string | null;
    assignedToUserId: string;
    priority: TaskPriority;
    dueDate?: Date | string | null;
    status?: TaskStatus;
  } | null;
  users: User[];
  locale?: string;
  onSuccess?: () => void;
}

export function TaskDialog({
  open,
  onOpenChange,
  task,
  users,
  locale = 'en',
  onSuccess,
}: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToUserId, setAssignedToUserId] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const isRTL = locale === 'ar';

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setAssignedToUserId(task.assignedToUserId);
      setPriority(task.priority);
      setDueDate(
        task.dueDate
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : ''
      );
    } else {
      setTitle('');
      setDescription('');
      setAssignedToUserId('');
      setPriority(TaskPriority.MEDIUM);
      setDueDate('');
    }
    setError('');
  }, [task, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (task) {
        const result = await updateTask(task.id, {
          title,
          description: description || undefined,
          assignedToUserId,
          priority,
          dueDate: dueDate || undefined,
        });

        if (!result.success) {
          setError(result.error || 'Failed to update task');
          return;
        }
      } else {
        if (!assignedToUserId) {
          setError(locale === 'ar' ? 'يرجى اختيار المستخدم' : 'Please select a user');
          setIsSubmitting(false);
          return;
        }

        const result = await createTask({
          title,
          description: description || undefined,
          assignedToUserId,
          priority,
          dueDate: dueDate || undefined,
        });

        if (!result.success) {
          setError(result.error || 'Failed to create task');
          return;
        }
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isRTL ? 'text-right' : ''} dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle>
            {task
              ? locale === 'ar'
                ? 'تعديل المهمة'
                : 'Edit Task'
              : locale === 'ar'
                ? 'إنشاء مهمة جديدة'
                : 'Create New Task'}
          </DialogTitle>
          <DialogDescription>
            {task
              ? locale === 'ar'
                ? 'قم بتعديل تفاصيل المهمة'
                : 'Update the task details'
              : locale === 'ar'
                ? 'أدخل تفاصيل المهمة الجديدة'
                : 'Enter the details for the new task'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {locale === 'ar' ? 'العنوان' : 'Title'} *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder={locale === 'ar' ? 'أدخل عنوان المهمة' : 'Enter task title'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {locale === 'ar' ? 'الوصف' : 'Description'}
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={locale === 'ar' ? 'أدخل وصف المهمة' : 'Enter task description'}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">
                {locale === 'ar' ? 'مخصص لـ' : 'Assign To'} *
              </Label>
              <Select
                value={assignedToUserId}
                onValueChange={setAssignedToUserId}
                required
              >
                <SelectTrigger id="assignedTo">
                  <SelectValue
                    placeholder={locale === 'ar' ? 'اختر المستخدم' : 'Select user'}
                  />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name || user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">
                  {locale === 'ar' ? 'الأولوية' : 'Priority'}
                </Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as TaskPriority)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TaskPriority.LOW}>
                      {locale === 'ar' ? 'منخفض' : 'Low'}
                    </SelectItem>
                    <SelectItem value={TaskPriority.MEDIUM}>
                      {locale === 'ar' ? 'متوسط' : 'Medium'}
                    </SelectItem>
                    <SelectItem value={TaskPriority.HIGH}>
                      {locale === 'ar' ? 'عالي' : 'High'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">
                  {locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            )}
          </div>

          <DialogFooter className={isRTL ? 'flex-row-reverse' : ''}>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? locale === 'ar'
                  ? 'جاري الحفظ...'
                  : 'Saving...'
                : task
                  ? locale === 'ar'
                    ? 'حفظ التغييرات'
                    : 'Save Changes'
                  : locale === 'ar'
                    ? 'إنشاء'
                    : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}








