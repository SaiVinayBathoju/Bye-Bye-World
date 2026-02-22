Bye-bye World — Design Rationale

Design Philosophy: The Unified Workspace

### Core Concept
Bye-bye World (BBW) is designed around the principle of **contextual continuity** — the idea that switching between productivity tools creates cognitive friction that compounds throughout the workday. Rather than building separate apps that happen to share a navigation bar, BBW creates a single cohesive environment where work flows naturally between communication, task management, scheduling, and HR functions.

The metaphor is an **operating system for work**, not a suite of tools. Just as macOS seamlessly integrates the Finder, Mail, and Calendar through shared design language and deep cross-app functionality, BBW treats messages, tasks, meetings, and HR as facets of the same workspace rather than separate products.

---

## Information Architecture

### Home/Timeline — The "Today View"
**Purpose:** Answer "What's happening?" and "What did I miss?" in under 5 seconds.

**Design Decisions:**

1. **AI Summary Card**: Positioned prominently at the top as the first thing users see. The gradient styling and Sparkles icon differentiate it from regular content while the natural-language format ("You have 3 unread messages...") reduces cognitive load compared to raw numbers. The summary is always one scannable sentence.

2. **Unified Activity Feed**: Events from all modules appear chronologically in one stream. Each event type (message, task, meeting, HR) has:
   - **Consistent structure**: Icon + Type Badge + Title + Description + Metadata
   - **Distinct visual coding**: Each type has its own color (blue/amber/purple/green) applied to the icon container and badge, making filtering possible at a glance without reading
   - **Uniform interaction patterns**: Hover reveals actions, click navigates to source

3. **Filter System**: Implemented as pill tabs rather than dropdowns because:
   - Users need to see all options simultaneously
   - One-click switching beats two-click dropdown selection
   - Visual badges show counts, helping users prioritize

4. **Unread Indicators**: Left blue border + subtle pulse animation draws attention without being disruptive. The goal is "calm notification" — important but not alarming.

---

### Messaging — Communication Hub

**Purpose:** Replace Slack while adding contextual intelligence through task integration.

**Design Decisions:**

1. **Inline Task Preview Cards** (Key Differentiator):
   - When someone mentions a task, BBW displays a rich card showing status, priority, assignee, and due date
   - This eliminates the "let me look that up" moment — context is immediately visible
   - Cards are interactive (hover states, click to open) without disrupting message flow
   - Visual design uses bordered cards with subtle backgrounds to distinguish from message text while feeling native

2. **Thread System**:
   - Collapsed by default with avatar stack + reply count as visual summary
   - Expands inline (not in a sidebar) to maintain context of the parent message
   - Thread replies are visually indented with a left border to show hierarchy
   - Reply input appears at thread bottom for natural conversation flow

3. **Message Composer**:
   - Rich formatting toolbar visible by default (Bold, Italic, Code, etc.) — users shouldn't have to discover formatting
   - @ mentions and # task links have dedicated buttons with tooltip hints
   - Send button requires content (disabled when empty) to prevent accidental sends

4. **Channel Header**:
   - Shows channel description (helpful for orientation in unfamiliar channels)
   - Groups related actions: Members, Pinned, Search | Call, Video | Settings
   - Dividers separate action groups for scannability

5. **Pinned Messages**:
   - Subtle amber background + left border (not distracting, but noticeable when scrolling)
   - Attribution ("Pinned by...") adds social context

---

### Navigation System

**Purpose:** Enable movement between modules while maintaining awareness of activity across the workspace.

**Design Decisions:**

1. **Dark Sidebar**:
   - Creates clear separation between navigation and content
   - Establishes visual hierarchy — the sidebar is "chrome," content area is the focus
   - Dark backgrounds reduce perceived visual weight, making the content area feel more spacious

2. **Persistent Structure**:
   - Top: Brand + Notifications (global awareness)
   - Upper: Universal Search (⌘K shortcut hint for power users)
   - Middle: Primary Navigation with badge counts
   - Lower: Channels + DMs with unread indicators
   - Bottom: User profile (always accessible)

3. **Badge System**:
   - Numbers for actionable items (messages to read, tasks assigned)
   - Colored dots for status (online/away/offline)
   - Badges use contrasting colors that work on the dark sidebar

4. **Collapsible Sections**:
   - Channels and DMs can be collapsed to reduce visual noise
   - State persists across sessions (in production)
   - Collapse arrow rotates to indicate state

5. **Universal Search**:
   - Prominent placement encourages usage
   - Keyboard shortcut (⌘K) visible for discoverability
   - Placeholder text "Search everything..." signals scope

---

## Visual Design System

### Color Strategy

**Semantic Colors:**
- **Primary (Blue)**: Actions, links, selected states, unread indicators
- **Accent (Cyan)**: Secondary actions, highlights
- **Success (Green)**: Positive states, online status, completed tasks
- **Warning (Amber)**: Attention needed, away status, pinned items
- **Destructive (Red)**: Errors, urgent priority

**Event Type Colors:**
- Messages: Blue (communication)
- Tasks: Amber (work items)
- Meetings: Purple (scheduled time)
- HR: Green (people/status)

### Typography Hierarchy

```
Page Title:     text-2xl font-semibold (24px)
Section Title:  text-lg font-medium (18px)
Card Title:     text-sm font-medium (14px)
Body Text:      text-sm (14px)
Caption/Meta:   text-xs text-muted-foreground (12px)
Badge Text:     text-[10px] uppercase tracking-wider
```

### Spacing System

Based on 4px grid:
- Component padding: 12-16px (py-3, py-4)
- Element gaps: 8-12px (gap-2, gap-3)
- Section margins: 24-32px (mb-6, mb-8)
- Card corners: 8-12px (rounded-lg, rounded-xl)

### Interaction States

1. **Hover**: Subtle background shift (bg-muted/30) + reveal hidden actions
2. **Focus**: Ring outline for keyboard navigation accessibility
3. **Active/Selected**: Solid primary color fill
4. **Disabled**: Reduced opacity + cursor change

---

## Micro-UX Details

1. **Tooltips**: 0ms delay for responsive feel; positioned to avoid obscuring content

2. **Loading States**: Skeleton components match content structure for reduced perceived load time

3. **Empty States**: Friendly messages with suggested actions rather than blank screens

4. **Transitions**: 150-200ms for micro-interactions (button hover), 300ms for layout changes (collapsible)

5. **Avatar Stacks**: Overlapping avatars with border separation for thread previews — shows "who" at a glance without taking space

---

## Figma File Organization 

```
📁 Bye-bye World
├── 📄 Cover Page
├── 📁 1. Screens
│   ├── Home / Timeline
│   ├── Messaging
│   └── Navigation (documented as overlays)
├── 📁 2. Components
│   ├── Navigation
│   │   ├── Sidebar
│   │   ├── Nav Item
│   │   └── Channel Item
│   ├── Timeline
│   │   ├── AI Summary Card
│   │   ├── Timeline Event
│   │   └── Filter Pills
│   ├── Messaging
│   │   ├── Message Bubble
│   │   ├── Task Preview Card
│   │   ├── Thread Reply
│   │   └── Message Composer
│   └── Shared
│       ├── Avatar
│       ├── Badge
│       ├── Button
│       └── Input
├── 📁 3. Tokens
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Effects (shadows, blurs)
└── 📄 Design Rationale (this document)
```

**Layer Naming Convention:**
- Use `/` for variants: `Button/Primary/Default`
- Use `_` for states: `Button/Primary/Default_Hover`
- Prefix with `🔒` for locked layers, `👁` for hidden toggle layers

---

## Summary

Bye-bye World's design prioritizes:

1. **Calm density** — Information-rich without visual noise
2. **Contextual intelligence** — Task mentions become rich previews, not dead links
3. **Unified language** — Consistent patterns across all modules
4. **Progressive disclosure** — Show the essential, reveal details on demand
5. **Production readiness** — Every interaction state considered, accessibility patterns followed

The result is a workspace that feels like a single product, not a bundle of tools wearing matching clothes.

To run the devserver:
```
npm install
npm run dev
```
