export const PROJECTS = [
  {
    id: 'proj-1',
    num: '01',
    name: 'ET-Management System',
    status: 'Completed',
    browserTitle: 'et-management · internal platform',
    canvas: 'canvas-et',
    goal: 'Enterprise AI document processing — replacing manual contract workflows at East Telecom.',
    description: 'AI-powered PDF scanning, structured data extraction and a RU ↔ EN translation pipeline, wrapped in an RBAC admin dashboard with contract analytics.',
    stack: ['Python', 'JavaScript', 'PostgreSQL', 'AI'],
    note: 'Deployed internally at East Telecom · code proprietary',
    caseStudy: {
      blocks: [
        {
          title: 'Problem',
          items: [
            'Manual contract processing across departments',
            'No unified system for document tracking',
            'Language barrier with Russian/English documents',
            'No analytics on contract status or patterns',
          ],
        },
        {
          title: 'Solution',
          items: [
            'AI-powered PDF scanning and structured data extraction',
            'Multi-language translation pipeline (RU ↔ EN)',
            'Natural language contract query system',
            'Admin dashboard with status tracking and analytics',
            'Role-based access control (RBAC) for departments',
          ],
        },
        {
          title: 'Architecture',
          items: [
            'Python backend with AI/ML pipeline integration',
            'PostgreSQL for structured contract data storage',
            'REST API layer connecting frontend dashboard',
            'Role-based authentication and authorization',
          ],
        },
        {
          title: 'Impact',
          items: [
            'Deployed internally at East Telecom',
            'Eliminated manual document categorization workflow',
            'Centralized contract intelligence for management',
            "First AI integration in company's internal tools",
          ],
        },
      ],
      techPills: ['Python', 'JavaScript', 'PostgreSQL', 'PDF Processing', 'AI Integration', 'NLP', 'Translation API', 'RBAC'],
    },
  },
  {
    id: 'proj-2',
    num: '02',
    name: 'University LMS System',
    status: 'Completed',
    browserTitle: 'university-lms · web platform',
    canvas: 'canvas-lms',
    goal: 'Full-scale learning management platform built to replace an outdated, fragmented university system.',
    description: 'Four-tier role system (Admin / Professor / Student / Guest), course management with automated enrollment and conflict detection, plus a public portal — built by a team of 4.',
    stack: ['Node.js', 'React', 'PostgreSQL', 'Supabase'],
    note: 'Team of 4 developers · full academic lifecycle',
    caseStudy: {
      blocks: [
        {
          title: 'Problem',
          items: [
            'Existing university system was outdated and fragmented',
            'No unified portal for students, professors, and admins',
            'Manual enrollment and grading processes',
            'No public-facing information portal',
          ],
        },
        {
          title: 'Solution',
          items: [
            '4-tier role system: Admin / Professor / Student / Guest',
            'Complete course management and grading module',
            'Automated enrollment with conflict detection',
            'Public university portal for prospective students',
          ],
        },
        {
          title: 'Architecture',
          items: [
            'React frontend with role-based UI rendering',
            'Node.js REST API with JWT authentication',
            'PostgreSQL database with normalized schema',
            'Supabase for real-time features and file storage',
          ],
        },
        {
          title: 'Scale',
          items: [
            'Team of 4 developers, full collaboration',
            'Designed to replace existing legacy system',
            'Handles full university academic lifecycle',
            'Modular architecture for future expansion',
          ],
        },
      ],
      techPills: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'JWT Auth', 'Role-Based UI', 'REST API'],
    },
  },
  {
    id: 'proj-3',
    num: '03',
    name: 'CRM System',
    status: 'In Progress',
    inProgress: true,
    browserTitle: 'crm · saas dashboard',
    canvas: 'canvas-crm',
    goal: 'Course management CRM giving educators centralized control over students, scheduling and payments.',
    description: 'Unified student tracking, dynamic course scheduling and a KPI analytics dashboard on a SaaS-ready multi-tenant architecture — designed to scale to multiple education centers.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    note: 'Active development · SaaS-ready architecture',
    caseStudy: {
      blocks: [
        {
          title: 'Problem',
          items: [
            'Educators lack centralized tools for student management',
            'Course scheduling done manually via spreadsheets',
            'No visibility into payment status or student progress',
            'No data-driven insights for business decisions',
          ],
        },
        {
          title: 'Solution',
          items: [
            'Unified student tracking system with profiles',
            'Dynamic course scheduling and conflict management',
            'Analytics dashboard with KPI visualization',
            'Integrated payment tracking module (planned)',
          ],
        },
        {
          title: 'Architecture',
          items: [
            'SaaS-ready multi-tenant architecture',
            'React dashboard with real-time data updates',
            'Node.js API with business logic layer',
            'PostgreSQL with row-level security',
          ],
        },
        {
          title: 'Vision',
          items: [
            'Scalable for multiple education centers',
            'White-label ready for B2B distribution',
            'Analytics-first design for data-driven operators',
            'Mobile-responsive for on-the-go management',
          ],
        },
      ],
      techPills: ['React', 'Node.js', 'PostgreSQL', 'SaaS Architecture', 'Analytics', 'Multi-tenant'],
    },
  },
];
