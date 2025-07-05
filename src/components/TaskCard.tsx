
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Users, MoreVertical, Edit, Trash, Share, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  sharedWith: string[];
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: number, updates: Partial<Task>) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === 'completed') {
      setIsCompleting(true);
      setTimeout(() => {
        onUpdate(task.id, { status: newStatus });
        setIsCompleting(false);
      }, 300);
    } else {
      onUpdate(task.id, { status: newStatus });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <Card className={`bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200 hover:shadow-lg ${
      isCompleting ? 'animate-pulse' : ''
    } ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold text-gray-800 mb-2 ${
              task.status === 'completed' ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`${getPriorityColor(task.priority)} border`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Badge>
              <Badge className={`${getStatusColor(task.status)} border flex items-center gap-1`}>
                {getStatusIcon(task.status)}
                {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
              {isOverdue && (
                <Badge className="bg-red-100 text-red-700 border-red-200 border">
                  Overdue
                </Badge>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                  Due {formatDate(task.dueDate)}
                </span>
              </div>
              {task.sharedWith.length > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Shared with {task.sharedWith.length}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/20">
              <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
                <Clock className="w-4 h-4 mr-2" />
                Mark In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Complete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="w-4 h-4 mr-2" />
                Share Task
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDelete(task.id)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          {task.status !== 'completed' && (
            <Button
              size="sm"
              onClick={() => handleStatusChange('completed')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Complete
            </Button>
          )}
          {task.status === 'pending' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange('in-progress')}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Clock className="w-4 h-4 mr-1" />
              Start
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
