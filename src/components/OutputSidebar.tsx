
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Code, 
  Database, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Eye
} from 'lucide-react';

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

interface OutputSidebarProps {
  tasks: Task[];
  isVisible: boolean;
  onToggle: () => void;
}

const OutputSidebar = ({ tasks, isVisible, onToggle }: OutputSidebarProps) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  };

  const applicationState = {
    authenticated: true,
    tasksLoaded: tasks.length > 0,
    lastUpdated: new Date().toLocaleTimeString(),
    features: [
      'CRUD Operations',
      'Task Filtering',
      'Status Management',
      'Priority System',
      'Due Date Tracking',
      'Responsive Design'
    ]
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white"
        size="sm"
      >
        <Eye className="w-4 h-4 mr-2" />
        Show Output
      </Button>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-xl z-40 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Application Output
          </h2>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Separator />

        {/* Application State */}
        <Card className="bg-white/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              Application State
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge className="bg-green-100 text-green-700">Running</Badge>
            </div>
            <div className="flex justify-between">
              <span>Authenticated:</span>
              <Badge className={applicationState.authenticated ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                {applicationState.authenticated ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Tasks Loaded:</span>
              <span className="font-medium">{applicationState.tasksLoaded ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span className="font-medium">{applicationState.lastUpdated}</span>
            </div>
          </CardContent>
        </Card>

        {/* Task Statistics */}
        <Card className="bg-white/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Task Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Tasks:</span>
              <Badge variant="outline">{stats.total}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Completed:</span>
              <Badge className="bg-green-100 text-green-700">{stats.completed}</Badge>
            </div>
            <div className="flex justify-between">
              <span>In Progress:</span>
              <Badge className="bg-blue-100 text-blue-700">{stats.inProgress}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Pending:</span>
              <Badge className="bg-orange-100 text-orange-700">{stats.pending}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Overdue:</span>
              <Badge className="bg-red-100 text-red-700">{stats.overdue}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Features Implemented */}
        <Card className="bg-white/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Features Implemented
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {applicationState.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Tasks Data */}
        <Card className="bg-white/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Current Tasks ({tasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-500">No tasks available</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="p-2 bg-gray-50 rounded text-xs space-y-1">
                  <div className="font-medium truncate">{task.title}</div>
                  <div className="flex gap-1 flex-wrap">
                    <Badge className={
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }>
                      {task.priority}
                    </Badge>
                    <Badge className={
                      task.status === 'completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }>
                      {task.status === 'in-progress' ? 'in progress' : task.status}
                    </Badge>
                  </div>
                  <div className="text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Hackathon Requirements Status */}
        <Card className="bg-white/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Hackathon Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Frontend Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Responsive Design</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Task CRUD Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-orange-600" />
              <span>Backend Integration Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-orange-600" />
              <span>OAuth Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-orange-600" />
              <span>Real-time Updates</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OutputSidebar;
