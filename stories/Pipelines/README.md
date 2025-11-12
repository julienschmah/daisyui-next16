# Storybook Pipeline Documentation

Complete Storybook documentation for the Pipeline/Kanban system with comprehensive scenarios and visual showcases.

## Stories Created

### 1. **KanbanBoard.stories.tsx**
Visual documentation of the complete Kanban board component with multiple scenarios.

**Story Variants:**
- ✅ **Default**: Standard sales pipeline (Novo → Em Negociação → Proposta → Fechado) with 4 cards
- ✅ **WithManyCards**: Same pipeline with 9 total cards spread across stages
- ✅ **CustomStages**: Development pipeline (6 stages) with task cards
- ✅ **WithPriorities**: Pipeline showcasing all 4 priority levels (urgent, high, medium, low)
- ✅ **EmptyStages**: No cards (shows empty state)
- ✅ **SupportPipeline**: Support ticket system with 5 stages and 4 tickets
- ✅ **RealEstatePipeline**: Real estate leads (6 stages) with property-related cards

### 2. **KanbanColumn.stories.tsx**
Visual documentation of individual Kanban columns with various states.

**Story Variants:**
- ✅ **Empty**: Column with no cards
- ✅ **WithCards**: Column with 3 cards
- ✅ **HighPriority**: CRÍTICO stage (red) with 2 urgent cards
- ✅ **WithDueDates**: Cards with due date indicators (2 days, 5 days)
- ✅ **ManyCards**: 10 cards demonstrating scroll behavior
- ✅ **DifferentColors**: Grid of 4 columns with different colors

### 3. **KanbanCard.stories.tsx**
Pure visual components showcasing different card states and features.

**Story Variants:**
- ✅ **CardBasic**: Minimal card with just title
- ✅ **CardWithDescription**: Card + description text
- ✅ **CardWithLabels**: Card + 2 label badges
- ✅ **CardWithDueDate**: Card + date indicator
- ✅ **CardHighPriority**: Red urgent card with critical labels
- ✅ **CardAssigned**: Card with assigned user (👤 João Silva)
- ✅ **CardFull**: All features combined
- ✅ **CardAllPriorities**: Grid showing all 4 priority border colors

### 4. **PipelineModal.stories.tsx** *(NEW)*
Documentation of the Create Pipeline modal with different templates.

**Story Variants:**
- ✅ **CreateNew**: Interactive create pipeline form (component mode)
- ✅ **SalesTemplate**: Sales pipeline template preview
- ✅ **SupportTemplate**: Support pipeline template preview
- ✅ **DevelopmentTemplate**: Development pipeline template preview

### 5. **PipelineEditModal.stories.tsx** *(NEW)*
Documentation of the Edit Pipeline modal with advanced controls.

**Story Variants:**
- ✅ **EditSalesPipeline**: Edit existing sales pipeline (component mode)
- ✅ **EditSupportPipeline**: Edit support pipeline (component mode)
- ✅ **EditDevPipeline**: Edit development pipeline with 6 stages (component mode)
- ✅ **EditStageReordering**: Visual showcase of stage reordering UI (↑↓ buttons)
- ✅ **EditWithColorPicker**: Visual showcase of color customization interface
- ✅ **EditMetadata**: Visual showcase of pipeline metadata display

### 6. **KanbanCardModal.stories.tsx** *(NEW)*
Documentation of the Create/Edit Card modal.

**Story Variants:**
- ✅ **CreateNewCard**: Interactive create card form (component mode)
- ✅ **EditExistingCard**: Interactive edit existing card (component mode)
- ✅ **CreateWithPriority**: Visual showcase of priority selection
- ✅ **EditWithAllFields**: Visual showcase of all form fields
- ✅ **CreateUrgentCard**: Visual showcase of urgent card creation
- ✅ **CreateWithLabels**: Visual showcase of label management
- ✅ **MinimalCard**: Visual showcase of minimal card creation form

### 7. **AddStageModal.stories.tsx** *(NEW)*
Documentation of the Add New Stage modal.

**Story Variants:**
- ✅ **Default**: Interactive add stage form (component mode)
- ✅ **AddSalesStage**: Visual showcase of stage creation
- ✅ **AddWithPreview**: Visual showcase with color preview
- ✅ **AddMultipleStages**: Visual showcase of batch stage creation
- ✅ **ColorSelection**: Visual showcase of color picker interface
- ✅ **DuplicateWarning**: Visual showcase of duplicate name warning

### 8. **AutomationModal.stories.tsx** *(NEW)*
Documentation of the Automation Builder modal with complex workflows.

**Story Variants:**
- ✅ **CreateNewAutomation**: Interactive automation creation form (component mode)
- ✅ **AutoMoveToStage**: Visual showcase of "move to stage" automation
- ✅ **TimeBasedAutomation**: Visual showcase of time-based triggers
- ✅ **ComplexAutomation**: Visual showcase with multiple actions
- ✅ **AutoAssignUser**: Visual showcase of user auto-assignment
- ✅ **EmptyForm**: Visual showcase of empty form state

### 9. **PipelineList.stories.tsx** *(NEW)*
Documentation of the Pipeline List component showing grid of pipelines.

**Story Variants:**
- ✅ **Default**: Grid of 3 pipelines (Sales, Support, Development)
- ✅ **SinglePipeline**: Single pipeline card
- ✅ **EmptyState**: Empty pipelines list
- ✅ **ManyPipelines**: 5 pipelines grid showcasing multiple types
- ✅ **WithLabels**: Visual showcase with asset labels and badges
- ✅ **DetailedView**: Detailed list view with metadata

## Features Documented

### Core Components
- ✅ **KanbanBoard**: Drag-drop board with multiple columns
- ✅ **KanbanColumn**: Individual stage column with card list
- ✅ **KanbanCard**: Card item with priority, labels, dates, assignment
- ✅ **PipelineList**: Grid view of all pipelines
- ✅ **PipelineModal**: Create new pipeline with templates
- ✅ **PipelineEditModal**: Edit pipeline with stage management
- ✅ **KanbanCardModal**: Create/edit individual cards
- ✅ **AddStageModal**: Add new column to board
- ✅ **AutomationModal**: Create automated workflows

### Scenarios Covered
- ✅ Sales pipeline (typical CRM flow)
- ✅ Support/Help desk (ticket management)
- ✅ Development (software project management)
- ✅ Real estate (lead management)
- ✅ Marketing (campaign management)

### States & Variations
- ✅ Empty states (no data)
- ✅ Full states (many items)
- ✅ All priority levels (low, medium, high, urgent)
- ✅ Color variations (8+ color options)
- ✅ Edit modes (with modification UI)
- ✅ Loading states (if applicable)

### Interactions Documented
- ✅ Drag and drop behavior
- ✅ Stage reordering
- ✅ Color customization
- ✅ Label management
- ✅ Priority selection
- ✅ User assignment
- ✅ Automation triggers and actions
- ✅ Date selection
- ✅ CRUD operations

## Total Story Count
**42 story variants** across **9 story files**:
- 7 stories (KanbanBoard)
- 6 stories (KanbanColumn)
- 8 stories (KanbanCard)
- 4 stories (PipelineModal)
- 6 stories (PipelineEditModal)
- 7 stories (KanbanCardModal)
- 6 stories (AddStageModal)
- 6 stories (AutomationModal)
- 6 stories (PipelineList)

## Usage

All stories are available in Storybook under the **Pipelines** category:
```
Pipelines/
├── KanbanBoard
├── KanbanColumn
├── KanbanCard
├── PipelineModal
├── PipelineEditModal
├── KanbanCardModal
├── AddStageModal
├── AutomationModal
└── PipelineList
```

## How to View

1. Run Storybook: `npm run storybook`
2. Navigate to `Pipelines/` category
3. Select any story to see the component in action
4. Use Storybook controls to interact with interactive stories
5. View component documentation with autodocs enabled

## Components with Storybook Support

- ✅ KanbanBoard - Full interactive story + variants
- ✅ KanbanColumn - Full interactive story + variants  
- ✅ KanbanCard - Visual + interactive stories
- ✅ PipelineList - Full interactive story + variants
- ✅ PipelineModal - Full interactive story + visual variants
- ✅ PipelineEditModal - Full interactive story + visual variants
- ✅ KanbanCardModal - Full interactive story + visual variants
- ✅ AddStageModal - Full interactive story + visual variants
- ✅ AutomationModal - Full interactive story + visual variants

## Quality

- ✅ All stories have realistic mock data
- ✅ All interactions are documented
- ✅ Multiple real-world scenarios included
- ✅ Responsive design variations shown
- ✅ Edge cases covered (empty states, warnings)
- ✅ All accessibility features maintained
- ✅ daisyUI theming support included
