// Mock data for Bye-bye World productivity OS

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'online' | 'away' | 'offline';
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  unreadCount: number;
  members: string[];
}

export interface DirectMessage {
  id: string;
  userId: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: string;
  dueDate: string;
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  type: 'message' | 'task' | 'leave' | 'meeting';
  title: string;
  description: string;
  timestamp: string;
  userId: string;
  metadata: Record<string, unknown>;
  isRead: boolean;
}

export const currentUser: User = {
  id: 'u1',
  name: 'Sarah Chen',
  email: 'sarah@byebyeworld.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  role: 'Product Designer',
  status: 'online',
};

export const users: User[] = [
  currentUser,
  {
    id: 'u2',
    name: 'Alex Rivera',
    email: 'alex@byebyeworld.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'Engineering Lead',
    status: 'online',
  },
  {
    id: 'u3',
    name: 'Maya Patel',
    email: 'maya@byebyeworld.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    role: 'Product Manager',
    status: 'away',
  },
  {
    id: 'u4',
    name: 'James Wilson',
    email: 'james@byebyeworld.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'Frontend Developer',
    status: 'online',
  },
  {
    id: 'u5',
    name: 'Emma Thompson',
    email: 'emma@byebyeworld.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    role: 'HR Manager',
    status: 'online',
  },
  {
    id: 'u6',
    name: 'David Kim',
    email: 'david@byebyeworld.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    role: 'Backend Developer',
    status: 'offline',
  },
];

export const channels: Channel[] = [
  {
    id: 'ch1',
    name: 'general',
    description: 'Company-wide announcements and discussions',
    isPrivate: false,
    unreadCount: 3,
    members: users.map(u => u.id),
  },
  {
    id: 'ch2',
    name: 'design',
    description: 'Design team discussions and feedback',
    isPrivate: false,
    unreadCount: 5,
    members: ['u1', 'u3', 'u4'],
  },
  {
    id: 'ch3',
    name: 'engineering',
    description: 'Engineering discussions and code reviews',
    isPrivate: false,
    unreadCount: 0,
    members: ['u2', 'u4', 'u6'],
  },
  {
    id: 'ch4',
    name: 'product',
    description: 'Product strategy and roadmap planning',
    isPrivate: false,
    unreadCount: 2,
    members: ['u1', 'u2', 'u3'],
  },
  {
    id: 'ch5',
    name: 'leadership',
    description: 'Leadership team private channel',
    isPrivate: true,
    unreadCount: 0,
    members: ['u2', 'u3', 'u5'],
  },
];

export const directMessages: DirectMessage[] = [
  {
    id: 'dm1',
    userId: 'u2',
    unreadCount: 2,
    lastMessage: 'Can you review the API changes?',
    lastMessageTime: '10:32 AM',
  },
  {
    id: 'dm2',
    userId: 'u3',
    unreadCount: 0,
    lastMessage: 'Sounds good, let\'s sync tomorrow',
    lastMessageTime: 'Yesterday',
  },
  {
    id: 'dm3',
    userId: 'u5',
    unreadCount: 1,
    lastMessage: 'Your leave request has been approved!',
    lastMessageTime: '9:15 AM',
  },
];

export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Design new onboarding flow',
    description: 'Create high-fidelity mockups for the new user onboarding experience',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'u1',
    dueDate: '2024-01-20',
    tags: ['design', 'ux'],
  },
  {
    id: 't2',
    title: 'Fix authentication bug',
    description: 'Users are getting logged out randomly on mobile devices',
    status: 'review',
    priority: 'urgent',
    assigneeId: 'u4',
    dueDate: '2024-01-18',
    tags: ['bug', 'mobile'],
  },
  {
    id: 't3',
    title: 'Update API documentation',
    description: 'Add documentation for new endpoints added in v2.3',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'u6',
    dueDate: '2024-01-25',
    tags: ['docs'],
  },
  {
    id: 't4',
    title: 'Quarterly planning presentation',
    description: 'Prepare slides for Q1 planning meeting',
    status: 'done',
    priority: 'high',
    assigneeId: 'u3',
    dueDate: '2024-01-15',
    tags: ['planning'],
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'e1',
    type: 'message',
    title: 'New message in #design',
    description: 'Maya Patel: "The new dashboard mockups look great! Can we add a dark mode toggle?"',
    timestamp: '2024-01-17T10:45:00Z',
    userId: 'u3',
    metadata: { channelId: 'ch2', channelName: 'design' },
    isRead: false,
  },
  {
    id: 'e2',
    type: 'task',
    title: 'Task moved to Review',
    description: 'Fix authentication bug was moved to Review by James Wilson',
    timestamp: '2024-01-17T10:30:00Z',
    userId: 'u4',
    metadata: { taskId: 't2', status: 'review', priority: 'urgent' },
    isRead: false,
  },
  {
    id: 'e3',
    type: 'leave',
    title: 'Leave request approved',
    description: 'Your leave request for Jan 22-24 has been approved by Emma Thompson',
    timestamp: '2024-01-17T09:15:00Z',
    userId: 'u5',
    metadata: { startDate: '2024-01-22', endDate: '2024-01-24', type: 'vacation' },
    isRead: false,
  },
  {
    id: 'e4',
    type: 'meeting',
    title: 'Upcoming: Design Review',
    description: 'Design Review meeting in 30 minutes with Maya, Alex, and James',
    timestamp: '2024-01-17T11:00:00Z',
    userId: 'u1',
    metadata: { 
      attendees: ['u1', 'u2', 'u3', 'u4'],
      duration: 60,
      meetingLink: 'https://meet.byebyeworld.com/design-review'
    },
    isRead: true,
  },
  {
    id: 'e5',
    type: 'message',
    title: 'Direct message from Alex Rivera',
    description: 'Alex Rivera: "Can you review the API changes I pushed yesterday?"',
    timestamp: '2024-01-17T10:32:00Z',
    userId: 'u2',
    metadata: { isDirect: true },
    isRead: false,
  },
  {
    id: 'e6',
    type: 'task',
    title: 'New task assigned',
    description: 'You have been assigned "Update component library documentation"',
    timestamp: '2024-01-17T08:45:00Z',
    userId: 'u3',
    metadata: { taskId: 't5', status: 'todo', priority: 'medium' },
    isRead: true,
  },
  {
    id: 'e7',
    type: 'message',
    title: 'New message in #general',
    description: 'Alex Rivera: "Team standup moving to 10am starting next week"',
    timestamp: '2024-01-17T08:00:00Z',
    userId: 'u2',
    metadata: { channelId: 'ch1', channelName: 'general' },
    isRead: true,
  },
  {
    id: 'e8',
    type: 'meeting',
    title: 'Meeting completed: Sprint Planning',
    description: 'Sprint Planning with the product team - 45 minutes',
    timestamp: '2024-01-16T15:00:00Z',
    userId: 'u3',
    metadata: { attendees: ['u1', 'u2', 'u3'], duration: 45, completed: true },
    isRead: true,
  },
];

export const getUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};

export const getAISummary = (): string => {
  const unreadMessages = timelineEvents.filter(e => e.type === 'message' && !e.isRead).length;
  const pendingTasks = tasks.filter(t => t.status !== 'done' && t.assigneeId === currentUser.id).length;
  const upcomingMeetings = timelineEvents.filter(e => e.type === 'meeting' && !e.metadata.completed).length;
  
  return `You have ${unreadMessages} unread messages, ${pendingTasks} tasks in progress, and ${upcomingMeetings} meeting coming up. Your leave for Jan 22-24 was approved.`;
};
