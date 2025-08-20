];
}

````

### 15.2 Verslo Rizikos

```typescript
interface BusinessRisks {
  risks: [
    {
      name: 'Low User Adoption';
      probability: 'Medium';
      impact: 'Critical';
      mitigation: [
        'Strong partnership with Piurko',
        'Free tier offering',
        'Extensive onboarding support',
        'Referral program',
        'Case studies and social proof'
      ];
    },
    {
      name: 'Competitor Entry';
      probability: 'High';
      impact: 'Medium';
      mitigation: [
        'First mover advantage',
        'Strong brand building',
        'Exclusive partnerships',
        'Continuous innovation',
        'Customer lock-in through data'
      ];
    },
    {
      name: 'Regulatory Changes';
      probability: 'Low';
      impact: 'High';
      mitigation: [
        'Legal counsel consultation',
        'Compliance monitoring',
        'Flexible architecture',
        'Insurance coverage'
      ];
    },
    {
      name: 'Economic Downturn';
      probability: 'Medium';
      impact: 'High';
      mitigation: [
        'Diverse revenue streams',
        'Cost-efficient operations',
        'Flexible pricing',
        'Focus on renovation market'
      ];
    },
    {
      name: 'Key Person Dependency';
      probability: 'Medium';
      impact: 'High';
      mitigation: [
        'Knowledge documentation',
        'Cross-training',
        'Succession planning',
        'Equity incentives'
      ];
    }
  ];

  contingency_plans: {
    pivot_strategies: [
      'B2B focus if B2C fails',
      'White-label solution',
      'API-first approach',
      'Acquisition exit'
    ];

    cost_reduction: [
      'Reduce marketing spend',
      'Pause new features',
      'Renegotiate contracts',
      'Remote-only operation'
    ];
  };
}
````

### 15.3 Rinkos Rizikos

```typescript
interface MarketRisks {
  risks: [
    {
      name: 'Seasonal Fluctuations'
      probability: 'High'
      impact: 'Medium'
      mitigation: [
        'Focus on planning tools in winter',
        'Renovation market emphasis',
        'International expansion',
        'Diverse service offering'
      ]
    },
    {
      name: 'Cultural Resistance'
      probability: 'Medium'
      impact: 'Medium'
      mitigation: [
        'Gradual feature introduction',
        'Local language support',
        'Offline capabilities',
        'Traditional invoice support',
        'Phone support option'
      ]
    },
    {
      name: 'Partnership Failure'
      probability: 'Low'
      impact: 'High'
      mitigation: [
        'Multiple partnerships',
        'Direct customer acquisition',
        'Contract protection',
        'Alternative channels'
      ]
    }
  ]
}
```

---

## 16. Sėkmės Metrikų ir KPI

### 16.1 Produkto Metrikos

```typescript
interface ProductMetrics {
  user_metrics: {
    acquisition: {
      new_signups_daily: number
      signup_conversion_rate: percentage
      referral_rate: percentage
      organic_vs_paid: ratio
    }

    activation: {
      onboarding_completion: percentage
      first_project_created: percentage
      first_contractor_invited: percentage
      time_to_value: hours
    }

    engagement: {
      dau: number // Daily Active Users
      mau: number // Monthly Active Users
      sessions_per_user: number
      features_used_per_session: number
      mobile_vs_desktop: ratio
    }

    retention: {
      day_1: percentage
      day_7: percentage
      day_30: percentage
      month_3: percentage
      cohort_analysis: true
    }
  }

  feature_metrics: {
    projects: {
      total_projects: number
      active_projects: number
      completed_projects: number
      average_project_duration: days
      stages_per_project: number
    }

    marketplace: {
      requests_created: number
      offers_submitted: number
      transactions_completed: number
      average_transaction_value: currency
      vendor_response_time: hours
    }

    calculators: {
      usage_count: number
      most_popular: string[]
      conversion_to_project: percentage
      saved_calculations: number
    }

    collaboration: {
      messages_sent: number
      documents_uploaded: number
      team_members_per_project: number
      contractor_rating: score
    }
  }
}
```

### 16.2 Verslo Metrikos

```typescript
interface BusinessMetrics {
  financial: {
    revenue: {
      mrr: currency // Monthly Recurring Revenue
      arr: currency // Annual Recurring Revenue
      arpu: currency // Average Revenue Per User
      growth_rate: percentage
    }

    costs: {
      cac: currency // Customer Acquisition Cost
      hosting_costs: currency
      support_costs: currency
      development_costs: currency
    }

    profitability: {
      gross_margin: percentage
      net_margin: percentage
      ltv: currency // Lifetime Value
      ltv_cac_ratio: number
      payback_period: months
    }
  }

  growth: {
    user_growth: {
      month_over_month: percentage
      year_over_year: percentage
      viral_coefficient: number
    }

    market_share: {
      tam: currency // Total Addressable Market
      sam: currency // Serviceable Addressable Market
      som: currency // Serviceable Obtainable Market
      current_penetration: percentage
    }
  }

  quality: {
    nps: score // Net Promoter Score
    csat: percentage // Customer Satisfaction
    support_tickets: number
    resolution_time: hours
    bug_rate: number
    uptime: percentage
  }
}
```

---

## 17. Komandos Struktūra ir Rolės

### 17.1 Pradinė Komanda (MVP)

```typescript
interface TeamStructure {
  founders: {
    ceo: {
      responsibilities: ['Vision and strategy', 'Fundraising', 'Key partnerships', 'Product direction']
      requirements: ['Business experience', 'Industry knowledge', 'Network in construction']
    }

    cto: {
      responsibilities: [
        'Technical architecture',
        'Development leadership',
        'Technology decisions',
        'Security oversight'
      ]
      requirements: ['Full-stack expertise', 'Scaling experience', 'Team leadership']
    }
  }

  core_team: {
    lead_developer: {
      count: 1
      focus: 'Full-stack development'
      skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'DevOps']
    }

    frontend_developer: {
      count: 1
      focus: 'UI/UX implementation'
      skills: ['React', 'TypeScript', 'Tailwind', 'Responsive design']
    }

    product_designer: {
      count: 1
      focus: 'UX/UI design'
      skills: ['Figma', 'User research', 'Prototyping', 'Design systems']
    }

    marketing_manager: {
      count: 1
      focus: 'Growth and marketing'
      skills: ['Digital marketing', 'Content creation', 'Analytics', 'Social media']
    }
  }

  advisors: {
    piurko: {
      role: 'Strategic advisor & Ambassador'
      contribution: ['Marketing reach', 'Industry credibility', 'User feedback']
    }

    construction_expert: {
      role: 'Industry advisor'
      contribution: ['Process validation', 'Contractor network', 'Regulations']
    }

    technical_advisor: {
      role: 'Technical scaling advisor'
      contribution: ['Architecture review', 'Scaling strategy', 'Security']
    }
  }
}
```

### 17.2 Augimo Fazės Komanda

```typescript
interface GrowthTeam {
  engineering: {
    backend_developers: 3
    frontend_developers: 2
    mobile_developer: 1
    devops_engineer: 1
    qa_engineer: 2
  }

  product: {
    product_managers: 2
    ux_designers: 2
    ui_designer: 1
    user_researcher: 1
  }

  business: {
    sales_team: 3
    customer_success: 2
    support_team: 3
    business_development: 1
  }

  operations: {
    finance_manager: 1
    hr_manager: 1
    legal_counsel: 1
    data_analyst: 2
  }
}
```

---

## 18. Finansinės Projekcijos

### 18.1 Pradinio Kapitalo Poreikis

```typescript
interface InitialCapital {
  seed_round: {
    amount: 250000 // EUR

    allocation: {
      development: 100000 // 40%
      marketing: 75000 // 30%
      operations: 37500 // 15%
      legal_compliance: 12500 // 5%
      contingency: 25000 // 10%
    }

    runway: '12 months'

    milestones: ['MVP launch', '1000 active users', '100 paying customers', 'Product-market fit validation']
  }

  series_a: {
    target: 1500000 // EUR
    timing: 'Month 12-15'

    use_of_funds: {
      team_expansion: 600000 // 40%
      product_development: 450000 // 30%
      marketing_sales: 300000 // 20%
      infrastructure: 150000 // 10%
    }

    targets: ['10,000 active users', '€50,000 MRR', 'International expansion', 'Enterprise features']
  }
}
```

### 18.2 Pajamų Projekcijos

```typescript
interface RevenueProjections {
  year_1: {
    quarters: {
      Q1: { users: 100; mrr: 0 } // Beta
      Q2: { users: 500; mrr: 1000 }
      Q3: { users: 1500; mrr: 5000 }
      Q4: { users: 3000; mrr: 15000 }
    }
    total_revenue: 63000
  }

  year_2: {
    quarters: {
      Q1: { users: 5000; mrr: 30000 }
      Q2: { users: 8000; mrr: 50000 }
      Q3: { users: 12000; mrr: 80000 }
      Q4: { users: 18000; mrr: 120000 }
    }
    total_revenue: 840000
  }

  year_3: {
    quarters: {
      Q1: { users: 25000; mrr: 180000 }
      Q2: { users: 35000; mrr: 250000 }
      Q3: { users: 48000; mrr: 350000 }
      Q4: { users: 65000; mrr: 480000 }
    }
    total_revenue: 3780000
  }

  assumptions: {
    conversion_rate: '5%'
    churn_rate: '5% monthly'
    arpu: '€25-35'
    marketplace_take_rate: '2.5%'
  }
}
```

---

## 19. Implementacijos Gairės AI Programuotojui

### 19.1 Darbo Metodika

````markdown
## AI Programuotojo Darbo Instrukcijos

### PRADŽIA (Prieš pradedant kodinti)

1. **Aplinkos Paruošimas**

   ```bash
   # 1. Clone Vuexy Next.js temą (jau integruota šiame repo)
   # (nereikia, šis repo jau su Vuexy)

   # 2. Sukurti naują Next.js 15 projektą
   npx create-next-app@latest nt-knygele \
     --typescript \
     --tailwind \
     --app \
     --src-dir \
     --import-alias "@/*"

   # 3. Vuexy komponentai jau integruoti šiame projekte
   # Naudokite src/views, src/components, src/@core, src/@layouts (Vuexy)
   # Adaptuoti pagal Next.js 15 App Router
   ```
````

2. **Supabase Setup**

   - Sukurti projektą Supabase konsolėje
   - Išsaugoti environment variables
   - Inicializuoti Prisma su Supabase
   - Sukurti pradines DB lenteles pagal schemas.prisma

3. **Git Workflow**
   - Main branch: production
   - Develop branch: aktyvus development
   - Feature branches: feature/[funkcionalumas]
   - Commit messages: conventional commits

### KIEKVIENOS DIENOS WORKFLOW

1. **Pradžia**

   - Patikrinti šį dokumentą dėl sekančio etapo
   - Sukurti feature branch
   - Atnaujinti local dependencies

2. **Kodavimas**

   - Laikytis TypeScript strict mode
   - Kiekviena funkcija turi tipus
   - Komentuoti sudėtingą logiką
   - Testuoti locally prieš commit

3. **Pabaiga**
   - Commit su aiškiu aprašymu
   - Push į GitHub
   - Sukurti draft PR su progreso aprašymu
   - Atnaujinti progreso tracking dokumentą

### PRIORITETŲ TVARKA

#### Savaitė 1-2: Fundamentals

1. Auth sistema (Supabase Auth)
2. User profilio valdymas
3. Projekto CRUD operacijos
4. Bazinis dashboard

#### Savaitė 3-4: Core Features

1. Etapų sistema su drag-drop
2. Dokumentų upload/valdymas
3. Rangovų kvietimas
4. Activity feed

#### Savaitė 5-6: Collaboration

1. Komentarai ir pranešimai
2. Real-time updates
3. Biudžeto tracking
4. Paprastos ataskaitos

#### Savaitė 7-8: Marketplace

1. Request/Offer sistema
2. Vendor dashboard
3. Pasiūlymų palyginimas
4. Transakcijų flow

#### Savaitė 9-10: Calculators

1. 5 baziniai skaičiuotuvai
2. Rezultatų išsaugojimas
3. Integracija su projektais

### TECHNINĖS GAIRĖS

#### Component Structure

```typescript
// Kiekvienas komponentas:
// 1. Turi savo katalogą
// 2. index.tsx - pagrindinis failas
// 3. styles.module.css - jei reikia custom stilių
// 4. types.ts - TypeScript tipai
// 5. utils.ts - helper funkcijos
// 6. tests.tsx - unit testai

components / ProjectCard / index.tsx
types.ts
utils.ts
ProjectCard.test.tsx
```

#### State Management

```typescript
// Zustand store kiekvienam moduliui
stores / auth.store.ts // Vartotojo sesija
project.store.ts // Aktyvus projektas
ui.store.ts // UI būsena
```

#### API Routes Pattern

```typescript
// tRPC su Zod validacija
app / api / trpc / [trpc] / route.ts

server / routers / project.router.ts
user.router.ts
```

#### Database Queries

```typescript
// Visada naudoti Prisma
// Optimizuoti su select ir include
// Implementuoti pagination
const projects = await prisma.project.findMany({
  where: { userId },
  select: {
    id: true,
    name: true,
    status: true,
    _count: {
      select: { stages: true }
    }
  },
  take: 20,
  skip: page * 20
})
```

### TESTING STRATEGIJA

1. **Unit Tests** (kiekvienam utility)
2. **Component Tests** (React Testing Library)
3. **API Tests** (endpoint testing)
4. **E2E Tests** (pagrindiniai user flows)

### PERFORMANCE GUIDELINES

1. **Images**: Naudoti Next.js Image component
2. **Lazy Loading**: Suspense visiems heavy komponenetams
3. **Code Splitting**: Dynamic imports
4. **Caching**: React Query su tinkamais staleTime
5. **DB Queries**: Indeksai, select tik reikalingus laukus

### SAUGUMO REIKALAVIMAI

1. **Input Validation**: Zod schemas visur
2. **SQL Injection**: Tik Prisma, no raw SQL
3. **XSS Prevention**: DOMPurify rich text
4. **CSRF**: Next.js built-in apsauga
5. **Rate Limiting**: API route middleware

### DEBUG IR TROUBLESHOOTING

1. Console.log su prasmingais pranešimais
2. React Developer Tools
3. Network tab API calls
4. Supabase logs
5. Vercel Functions logs

### DEPLOYMENT CHECKLIST

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Build succeeds locally
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] SEO meta tags
- [ ] Error boundaries implemented
- [ ] Loading states everywhere

````

### 19.2 Kodo Pavyzdžiai

```typescript
// PAVYZDYS: Projekto kūrimo flow
// app/(dashboard)/projects/new/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select, Textarea } from '@/components/ui';
import { Steps } from '@/components/ui/steps';
import { api } from '@/lib/api';
import { useProjectStore } from '@/stores/project.store';
import { toast } from '@/components/ui/toast';

const projectSchema = z.object({
  name: z.string().min(3).max(100),
  type: z.enum(['house', 'apartment', 'renovation']),
  description: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string()
  }),
  budget: z.number().positive().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional()
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const setActiveProject = useProjectStore(s => s.setActiveProject);

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema)
  });

  const createProject = api.project.create.useMutation({
    onSuccess: (project) => {
      setActiveProject(project);
      toast.success('Projektas sukurtas!');
      router.push(`/projects/${project.id}`);
    },
    onError: () => {
      toast.error('Klaida kuriant projektą');
    }
  });

  const onSubmit = (data: ProjectForm) => {
    createProject.mutate(data);
  };

  return (
    <div className="container mx-auto py-8">
      <Steps current={step} onChange={setStep}>
        <Steps.Item title="Pagrindai" />
        <Steps.Item title="Lokacija" />
        <Steps.Item title="Biudžetas" />
        <Steps.Item title="Etapai" />
      </Steps>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {step === 0 && (
          <div className="space-y-4">
            <Input
              label="Projekto pavadinimas"
              {...register('name')}
              error={errors.name?.message}
            />
            <Select
              label="Tipas"
              {...register('type')}
              options={[
                { value: 'house', label: 'Namo statyba' },
                { value: 'apartment', label: 'Buto remontas' },
                { value: 'renovation', label: 'Renovacija' }
              ]}
            />
            <Textarea
              label="Aprašymas"
              {...register('description')}
              rows={4}
            />
          </div>
        )}

        {/* Kiti žingsniai... */}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Atgal
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              onClick={() => setStep(step + 1)}
            >
              Toliau
            </Button>
          ) : (
            <Button
              type="submit"
              loading={createProject.isLoading}
            >
              Sukurti projektą
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
````

---

## 20. Baigiamosios Pastabos

### Svarbiausios Sėkmės Sąlygos

1. **Piurko Partnerystė** - Tai yra kritinis sėkmės faktorius. Be jo auditorijos ir pasitikėjimo, user acquisition kaina būtų per didelė.

2. **Paprastumas** - UI turi būti intuityvus net "diedukui" meistrui. Jei reikia mokymų - pralaimėjom.

3. **Mobile-First** - Dauguma rangovų dirba objekte su telefonu rankoje. Desktop yra bonus, ne prioritetas.

4. **Lokalizacija** - Viskas turi būti pritaikyta Lietuvos rinkai: procesai, terminologija, mokėjimai, reguliacijos.

5. **Greitis** - MVP turi būti gatavas per 2-3 mėnesius. Kiekviena papildoma savaitė = prarastos galimybės.

### Rekomenduojami Pirmi Žingsniai

1. **Savaitė 1**: Techninės aplinkos setup + autentifikacija
2. **Savaitė 2**: Projekto CRUD + bazinis dashboard
3. **Savaitė 3**: Etapų sistema (core funkcionalumas)
4. **Savaitė 4**: Dokumentai + failų valdymas
5. **Savaitė 5**: Rangovų sistema
6. **Savaitė 6**: Beta testavimas su Piurko community

### Potencialūs Šou-Stoperiai

- Jei Piurko partnerystė žlugtų
- Jei rangovai atsisakytų naudoti sistemą
- Jei techninė implementacija būtų per sudėtinga
- Jei konkurentas pasirodytų su didesniu biudžetu

### Galutinė Vizija

NT Knygelė turi tapti "Spotify statyboms" - viena platforma, kurioje yra viskas, ko reikia statybų projektui. Nuo pirmos idėjos iki paskutinio varžto.

---

## APPENDIX: Quick Reference

### Komandos AI Programuotojui

```bash
# Pradėti naują funkciją
git checkout -b feature/[pavadinimas]

# Pridėti Vuexy/MUI komponentą
# Naudok @mui/material komponentus arba Vuexy pavyzdžius iš src/views/*

# Sukurti naują API endpoint
npm run generate:api [endpoint-name]

# Paleisti development
npm run dev

# Prisma migracija
npx prisma migrate dev --name [migration-name]

# Testuoti
npm run test
npm run test:e2e

# Build production
npm run build
npm run start
```

### Prioritetiniai Komponentai iš Vuexy (MUI)

1. **Forms**: Input, Select, Textarea, Checkbox, Radio, DatePicker
2. **Layout**: Container, Grid, Card, Sidebar, Header
3. **Feedback**: Toast, Modal, Alert, Spinner
4. **Navigation**: Tabs, Steps, Breadcrumb, Menu
5. **Data**: Table, Pagination, Filters
6. **Charts**: AreaChart, BarChart, PieChart

### Support Kontaktai

- **Techniniai klausimai**: [Tavo email/Discord]
- **Vuexy (Next.js) dokumentacija**: https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation/
- **Supabase docs**: https://supabase.com/docs
- **Next.js 15 docs**: https://nextjs.org/docs

---

**SĖKMĖS! 🚀 Šis projektas turi milžinišką potencialą. Eik etapais, netobulėk, ir per 2-3 mėnesius turėsim veikiantį MVP su realiais vartotojais.**# NT Knygelė - Pilnas Projekto Įgyvendinimo Planas

## 📋 Turinys

1. [Projekto Vizija ir Tikslai](#projekto-vizija)
2. [Techninė Architektūra](#technine-architektura)
3. [Duomenų Bazės Modelis](#duomenu-bazes-modelis)
4. [Vartotojų Tipai ir Rolės](#vartotoju-tipai)
5. [Lietuvos NT Procesų Specifika](#lietuvos-nt-procesu-specifika)
6. [Funkcionalumo Moduliai](#funkcionalumo-moduliai)
7. [UI/UX Detalus Planas](#ui-ux-planas)
8. [Kūrimo Etapai (Fazės)](#kurimo-etapai)
9. [Integracijų Planas](#integraciju-planas)
10. [Saugumo Reikalavimai](#saugumo-reikalavimai)
11. [Testavimo Strategija](#testavimo-strategija)
12. [Deployment ir DevOps](#deployment-devops)

---

## 1. Projekto Vizija ir Tikslai {#projekto-vizija}

### Pagrindinė Vizija

Sukurti visapusišką NT ekosistemą Lietuvos rinkai, kuri sujungtų visus statybų proceso dalyvius į vieną skaitmeninę platformą, užtikrinančią skaidrumą, efektyvumą ir patogumą.

### Konkretūs Tikslai

- **Q1 2025**: MVP su pagrindinėmis funkcijomis (projekto kūrimas, etapai, rangovai)
- **Q2 2025**: Parduotuvių integracija ir prekyvietė
- **Q3 2025**: Pilna skaičiuotuvų biblioteka
- **Q4 2025**: AI asistento integracija ir automatizacijos

### Sėkmės Metrikos

- 1000+ aktyvių projektų per pirmus 6 mėnesius
- 100+ registruotų rangovų įmonių
- 20+ integruotų parduotuvių partnerių
- 85%+ vartotojų pasitenkinimo rodiklis (NPS)

---

## 2. Techninė Architektūra {#technine-architektura}

### Frontend Stack

```
Framework: Next.js 15 (App Router)
Language: TypeScript 5.x
UI Theme: Vuexy – MUI NextJS Admin Template (https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation/)
State Management: Zustand + React Query (TanStack Query v5)
Forms: React Hook Form + Zod validation
Styling: MUI (Vuexy) + Tailwind utility klasės (pagal poreikį)
Charts: ApexCharts / Recharts (pagal Vuexy pavyzdžius)
Tables: MUI DataGrid / TanStack Table (pagal Vuexy pavyzdžius)
Maps: Mapbox GL JS (objektų lokacijos)
Rich Text Editor: Lexical (dokumentams)
File Upload: Uploadthing arba AWS S3 presigned URLs
Real-time: Socket.io arba Pusher (pranešimams)
PWA: next-pwa (mobile experience)
```

### Backend Stack

```
API: Next.js API Routes + tRPC (type-safe API)
Database: PostgreSQL (Supabase arba Neon.tech)
ORM: Prisma 5.x
Authentication: Supabase Auth arba NextAuth.js v5
File Storage: Supabase Storage arba AWS S3
Email Service: Resend arba SendGrid
SMS Service: Twilio (pranešimams rangovams)
Background Jobs: Inngest arba Trigger.dev
Search: Algolia arba Meilisearch
Analytics: PostHog arba Plausible
Error Tracking: Sentry
```

### Infrastruktūra

```
Hosting: Vercel (Frontend + API)
Database: Supabase (PostgreSQL + Realtime + Storage)
CDN: Cloudflare (statiniam turiniui)
Monitoring: Better Uptime
CI/CD: GitHub Actions
Environment: Development, Staging, Production
```

### Mikroservisų Architektūra (Ateičiai)

```
- Auth Service (vartotojų valdymas)
- Project Service (projektų logika)
- Marketplace Service (prekyvietė)
- Notification Service (pranešimai)
- Calculator Service (skaičiuotuvai)
- Analytics Service (statistika)
- AI Service (rekomendacijos)
```

---

## 3. Duomenų Bazės Modelis {#duomenu-bazes-modelis}

### Pagrindinės Lentelės

#### Users (Vartotojai)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    role ENUM('owner', 'contractor', 'vendor', 'admin'),
    company_id UUID REFERENCES companies(id),
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    onboarding_completed BOOLEAN DEFAULT false,
    preferences JSONB DEFAULT '{}',
    notification_settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);
```

#### Companies (Įmonės)

```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    company_code VARCHAR(20) UNIQUE,
    vat_code VARCHAR(20),
    type ENUM('contractor', 'vendor', 'developer'),
    category VARCHAR(100), -- 'pamatai', 'muras', 'elektra', etc.
    logo_url TEXT,
    website VARCHAR(255),
    description TEXT,
    address JSONB,
    contact_info JSONB,
    working_hours JSONB,
    service_areas TEXT[], -- miestai/rajonai kur dirba
    certificates JSONB[], -- sertifikatai, licencijos
    portfolio_images TEXT[],
    rating DECIMAL(3,2),
    reviews_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT false,
    subscription_plan VARCHAR(50),
    subscription_expires_at TIMESTAMPTZ,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Projects (NT Objektai/Projektai)

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    type ENUM('house', 'apartment', 'cottage', 'commercial', 'renovation'),
    status ENUM('planning', 'in_progress', 'completed', 'on_hold'),
    owner_id UUID REFERENCES users(id) NOT NULL,
    address JSONB,
    coordinates POINT, -- PostGIS
    area_m2 DECIMAL(10,2),
    floors INTEGER,
    rooms INTEGER,
    budget_planned DECIMAL(12,2),
    budget_spent DECIMAL(12,2),
    start_date DATE,
    planned_end_date DATE,
    actual_end_date DATE,
    description TEXT,
    cover_image_url TEXT,
    gallery_images TEXT[],
    documents JSONB[], -- {name, url, type, uploaded_at}
    metadata JSONB, -- papildoma info
    privacy ENUM('private', 'contractors_only', 'public'),
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Project_Stages (Projekto Etapai)

```sql
CREATE TABLE project_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    template_stage_id UUID REFERENCES stage_templates(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    description TEXT,
    order_index INTEGER NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed', 'blocked'),
    progress_percentage INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    budget_planned DECIMAL(10,2),
    budget_spent DECIMAL(10,2),
    responsible_contractor_id UUID REFERENCES companies(id),
    dependencies UUID[], -- priklausomybės nuo kitų etapų
    checklist JSONB[], -- {task, completed, date}
    documents JSONB[],
    notes TEXT,
    color VARCHAR(7), -- HEX spalva timeline'ui
    icon VARCHAR(50), -- ikona pagal Vuexy/MUI ikonografiją
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(project_id, order_index)
);
```

#### Stage_Templates (Etapų Šablonai)

```sql
CREATE TABLE stage_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL, -- 'statyba', 'renovacija', etc.
    name VARCHAR(255) NOT NULL,
    name_lt VARCHAR(255) NOT NULL, -- lietuviškas pavadinimas
    description TEXT,
    typical_duration_days INTEGER,
    typical_budget_percentage DECIMAL(5,2),
    order_suggestion INTEGER,
    required_permits TEXT[], -- kokie leidimai reikalingi
    typical_contractors VARCHAR[], -- kokio tipo rangovai
    checklist_template JSONB[],
    materials_needed JSONB[], -- tipinės medžiagos
    tools_needed TEXT[],
    icon VARCHAR(50),
    color VARCHAR(7),
    is_mandatory BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Project_Members (Projekto Dalyviai)

```sql
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    company_id UUID REFERENCES companies(id),
    role ENUM('owner', 'contractor', 'viewer', 'consultant'),
    permissions JSONB DEFAULT '{}', -- {can_edit, can_delete, can_invite, etc}
    stages_assigned UUID[], -- kuriems etapams priskirtas
    invited_by UUID REFERENCES users(id),
    invitation_status ENUM('pending', 'accepted', 'declined'),
    invitation_token VARCHAR(255),
    joined_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Activities (Veiklos Žurnalas)

```sql
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    stage_id UUID REFERENCES project_stages(id),
    user_id UUID REFERENCES users(id),
    company_id UUID REFERENCES companies(id),
    action VARCHAR(100) NOT NULL, -- 'stage_completed', 'document_uploaded', etc.
    description TEXT,
    metadata JSONB, -- papildoma info apie veiksmą
    attachments TEXT[],
    is_milestone BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Documents (Dokumentai)

```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    stage_id UUID REFERENCES project_stages(id),
    uploaded_by UUID REFERENCES users(id),
    company_id UUID REFERENCES companies(id),
    type VARCHAR(50), -- 'invoice', 'contract', 'permit', 'photo', etc.
    name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    thumbnail_url TEXT,
    metadata JSONB, -- EXIF data, dimensions, etc.
    tags TEXT[],
    ocr_text TEXT, -- tekstas ištrauktas iš dokumento
    version INTEGER DEFAULT 1,
    parent_document_id UUID REFERENCES documents(id),
    is_public BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Materials (Medžiagos)

```sql
CREATE TABLE materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    stage_id UUID REFERENCES project_stages(id),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    model VARCHAR(100),
    sku VARCHAR(100),
    quantity DECIMAL(10,3),
    unit VARCHAR(20), -- 'vnt', 'm2', 'kg', etc.
    price_per_unit DECIMAL(10,2),
    total_price DECIMAL(10,2),
    vendor_id UUID REFERENCES companies(id),
    purchase_date DATE,
    delivery_date DATE,
    warranty_months INTEGER,
    warranty_document_url TEXT,
    color VARCHAR(100),
    dimensions JSONB,
    specifications JSONB,
    installation_location TEXT,
    photos TEXT[],
    notes TEXT,
    status ENUM('planned', 'ordered', 'delivered', 'installed'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Marketplace_Requests (Prekyvietės Užklausos)

```sql
CREATE TABLE marketplace_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    stage_id UUID REFERENCES project_stages(id),
    created_by UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    materials_needed JSONB[], -- {name, quantity, unit, specifications}
    budget_range_from DECIMAL(10,2),
    budget_range_to DECIMAL(10,2),
    delivery_date DATE,
    delivery_address JSONB,
    status ENUM('draft', 'active', 'closed', 'cancelled'),
    visibility ENUM('all_vendors', 'selected_vendors', 'category_vendors'),
    selected_vendors UUID[], -- jei visibility = 'selected_vendors'
    expires_at TIMESTAMPTZ,
    auto_close_after_offers INTEGER, -- automatiškai uždaryti po X pasiūlymų
    created_at TIMESTAMPTZ DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);
```

#### Marketplace_Offers (Prekyvietės Pasiūlymai)

```sql
CREATE TABLE marketplace_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES marketplace_requests(id),
    vendor_id UUID REFERENCES companies(id),
    offered_by UUID REFERENCES users(id),
    status ENUM('draft', 'submitted', 'accepted', 'rejected', 'withdrawn'),
    total_price DECIMAL(10,2),
    items JSONB[], -- {name, quantity, unit_price, total_price, notes}
    delivery_date DATE,
    delivery_cost DECIMAL(10,2),
    payment_terms TEXT,
    validity_days INTEGER DEFAULT 30,
    notes TEXT,
    attachments TEXT[], -- PDF pasiūlymai, etc.
    discount_percentage DECIMAL(5,2),
    final_price DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    rejected_at TIMESTAMPTZ,
    rejection_reason TEXT
);
```

#### Notifications (Pranešimai)

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50), -- 'stage_completed', 'new_offer', etc.
    title VARCHAR(255),
    message TEXT,
    data JSONB, -- papildoma info
    priority ENUM('low', 'medium', 'high', 'urgent'),
    channel ENUM('in_app', 'email', 'sms', 'push'),
    read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Reviews (Atsiliepimai)

```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    reviewer_id UUID REFERENCES users(id),
    company_id UUID REFERENCES companies(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    pros TEXT[],
    cons TEXT[],
    would_recommend BOOLEAN,
    verified_purchase BOOLEAN DEFAULT false,
    photos TEXT[],
    helpful_count INTEGER DEFAULT 0,
    response_from_company TEXT,
    response_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Calculators (Skaičiuotuvai)

```sql
CREATE TABLE calculators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    category VARCHAR(100),
    description TEXT,
    formula JSONB, -- skaičiavimo formulė
    inputs JSONB[], -- {name, type, unit, min, max, default}
    outputs JSONB[], -- {name, unit, formula}
    examples JSONB[],
    tips TEXT[],
    related_materials JSONB[],
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Indeksai

```sql
-- Performance optimizacija
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_stages_project ON project_stages(project_id);
CREATE INDEX idx_stages_status ON project_stages(status);
CREATE INDEX idx_activities_project ON activities(project_id);
CREATE INDEX idx_activities_created ON activities(created_at DESC);
CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_marketplace_requests_status ON marketplace_requests(status);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, read);

-- Full-text search
CREATE INDEX idx_projects_search ON projects USING GIN(to_tsvector('lithuanian', name || ' ' || description));
CREATE INDEX idx_companies_search ON companies USING GIN(to_tsvector('lithuanian', name || ' ' || description));
CREATE INDEX idx_materials_search ON materials USING GIN(to_tsvector('lithuanian', name || ' ' || brand || ' ' || model));
```

---

## 4. Vartotojų Tipai ir Rolės {#vartotoju-tipai}

### 1. Savininkas (Owner)

**Kas tai:** Privatus asmuo statantis/renovuojantis savo NT
**Galimybės:**

- Kurti ir valdyti savo projektus
- Kviesti rangovus į projektą
- Matyti visą projekto informaciją
- Užsakyti medžiagas per prekyvietę
- Naudoti skaičiuotuvus
- Rašyti atsiliepimus rangovams

### 2. Rangovas (Contractor)

**Kas tai:** Statybų įmonė ar individualus meistras
**Galimybės:**

- Turėti įmonės profilį
- Prisijungti prie projektų (kai pakviečiamas)
- Valdyti savo etapus projekte
- Įkelti dokumentus, nuotraukas
- Žymėti darbų progresą
- Gauti užklausas iš prekyvietės (jei tinka kategorija)

### 3. Pardavėjas (Vendor)

**Kas tai:** Statybinių medžiagų parduotuvė
**Galimybės:**

- Turėti parduotuvės profilį
- Gauti užklausas iš vartotojų
- Teikti pasiūlymus
- Valdyti savo produktų katalogą
- Matyti projekto etapus (planuoti pasiūlymus)

### 4. Administratorius (Admin)

**Kas tai:** Platformos valdytojas
**Galimybės:**

- Pilna prieiga prie visų duomenų
- Vartotojų valdymas
- Turinio moderavimas
- Statistikos peržiūra
- Sistemos konfigūracija

### 5. Konsultantas (Consultant)

**Kas tai:** Architektas, dizaineris, inžinierius
**Galimybės:**

- Prisijungti prie projektų kaip konsultantas
- Įkelti brėžinius, dokumentus
- Komentuoti etapus
- Teikti rekomendacijas

---

## 5. Lietuvos NT Procesų Specifika {#lietuvos-nt-procesu-specifika}

### A. NAMO STATYBA (Naujas Objektas)

#### FAZĖ 1: PLANAVIMAS IR PROJEKTAVIMAS

```
1. Žemės sklypo paruošimas
   - Geodeziniai matavimai
   - Topografinė nuotrauka
   - Geologiniai tyrimai
   - Sklype esančių medžių inventorizacija

2. Projektavimas
   - Architektūrinis projektas
   - Konstrukcijų projektas
   - Inžinerinių tinklų projektai (elektra, vanduo, kanalizacija, šildymas)
   - Statybos leidimas
   - Statybos pradžios registravimas VTPSI

3. Rangovų atranka
   - Konkursų organizavimas
   - Sutarčių pasirašymas
   - Darbų grafikų sudarymas
```

#### FAZĖ 2: PAMATAI IR POŽEMINĖ DALIS

```
4. Paruošiamieji darbai
   - Laikinos tvoros įrengimas
   - Statybvietės įrengimas
   - Laikinų komunikacijų pajungimas
   - Medžių pašalinimas (jei reikia)

5. Žemės darbai
   - Dirvožemio nuėmimas
   - Duobės kasimas
   - Drenažo įrengimas
   - Grunto tankinimas

6. Pamatai
   - Pamatų duobės paruošimas
   - Hidroizoliacija
   - Armatūros rišimas
   - Betonavimas
   - Pamatų šiltinimas

7. Požeminės komunikacijos
   - Kanalizacijos įvadai
   - Vandentiekio įvadai
   - Elektros kabelių klojimas
   - Drenažo sistema
```

#### FAZĖ 3: ANTŽEMINĖ KONSTRUKCIJA

```
8. Sienos (priklauso nuo technologijos)
   a) Mūras:
      - Blokelių mūrijimas
      - Armavimo diržai
      - Angokraščiai
   b) Karkasas:
      - Karkaso montavimas
      - Apšiltinimas
      - Vėjo izoliacija
      - Apdaila
   c) Rąstai:
      - Rąstų montavimas
      - Sandarinimas
      - Medienos apsauga

9. Perdangos
   - Sijų montavimas
   - Perdangos įrengimas
   - Garso izoliacija
   - Betonavimas (jei reikia)

10. Stogas
    - Gegnių sistema
    - Garo izoliacija
    - Apšiltinimas
    - Vėjo izoliacija
    - Stogo danga
    - Lietaus nuvedimo sistema
```

#### FAZĖ 4: IŠORĖS DARBAI

```
11. Langai ir durys
    - Angų paruošimas
    - Langų montavimas
    - Durų montavimas
    - Palangių įrengimas
    - Sandarinimas

12. Fasadas
    - Fasado apšiltinimas
    - Apdailos sluoksnis
    - Dekoratyviniai elementai
    - Pamatų apdaila (cokolio įrengimas)
```

#### FAZĖ 5: VIDAUS INŽINERINIAI TINKLAI

```
13. Elektros instaliacija
    - Kabelių tiesimas
    - Paskirstymo skydo montavimas
    - Rozetių ir jungiklių dėžučių montavimas
    - Apšvietimo taškų paruošimas
    - Įžeminimas

14. Santechnika
    - Vandentiekio vamzdynų montavimas
    - Kanalizacijos vamzdynų montavimas
    - Santechnikos prietaisų pajungimo paruošimas

15. Šildymas
    - Šildymo sistemos montavimas
    - Radiatorių/grindų šildymo įrengimas
    - Katilo montavimas
    - Sistemos paleidimas

16. Vėdinimas
    - Vėdinimo kanalų montavimas
    - Rekuperatoriaus įrengimas
    - Ortakių izoliavimas
```

#### FAZĖ 6: VIDAUS APDAILA

```
17. Grindys
    - Grindų lyginimas
    - Hidroizoliacija (drėgnose patalpose)
    - Grindų šildymo įrengimas (jei yra)
    - Grindų dangos montavimas
    - Grindjuosčių įrengimas

18. Sienos
    - Sienų lyginimas/glaistymas
    - Gruntavimas
    - Dažymas/tapetavimas
    - Plytelių klijavimas (virtuvė, vonios)

19. Lubos
    - Lubų lyginimas
    - Pakabinamų lubų montavimas (jei yra)
    - Dažymas
    - Apšvietimo įrengimas

20. Vidaus durys
    - Durų staktos montavimas
    - Durų varčios montavimas
    - Apvadų montavimas
    - Spynų, rankenų montavimas
```

#### FAZĖ 7: GALUTINIAI DARBAI

```
21. Santechnikos montavimas
    - Klozeto montavimas
    - Kriauklių montavimas
    - Vonios/dušo kabinos montavimas
    - Maišytuvų montavimas

22. Elektros galutiniai darbai
    - Rozetių ir jungiklių montavimas
    - Šviestuvų montavimas
    - Elektros prietaisų pajungimas
    - Elektros instaliacijos patikra

23. Virtuvės įrengimas
    - Virtuvės baldų montavimas
    - Stalviršio montavimas
    - Buitinės technikos pajungimas

24. Papildomi elementai
    - Laiptų turėklai
    - Palangės viduje
    - Ventiliacijos grotelės
    - Kiti aksesuarai
```

#### FAZĖ 8: TERITORIJOS SUTVARKYMAS

```
25. Kiemo darbai
    - Įvažiavimo įrengimas
    - Takų klojimas
    - Terasų įrengimas
    - Apšvietimo įrengimas

26. Žalieji plotai
    - Dirvožemio paskleidimas
    - Vejos sėjimas
    - Augalų sodinimas
    - Laistymo sistemos įrengimas

27. Tvoros ir vartai
    - Tvoros montavimas
    - Vartų montavimas
    - Automatikos įrengimas
```

#### FAZĖ 9: PRIĖMIMAS IR DOKUMENTACIJA

```
28. Objekto priėmimas
    - Kadastriniai matavimai
    - Energetinis sertifikavimas
    - Statybos užbaigimo aktas
    - Deklaracijos pateikimas

29. Garantiniai dokumentai
    - Rangovų garantijų surinkimas
    - Įrangos garantinių dokumentų surinkimas
    - Eksploatacijos instrukcijų surinkimas
```

### B. BUTO RENOVACIJA

#### FAZĖ 1: PLANAVIMAS

```
1. Būklės įvertinimas
   - Esamų komunikacijų patikra
   - Konstrukcijų būklės įvertinimas
   - Matavimų atlikimas

2. Projektavimas
   - Interjero projektas
   - Pertvarų planas
   - Elektros projektas
   - Santechnikos projektas

3. Leidimai (jei reikia)
   - Butų savininkų sutikimas
   - Statybos leidimas (jei keičiamos konstrukcijos)
```

#### FAZĖ 2: GRIOVIMO DARBAI

```
4. Paruošimas
   - Baldų išnešimas
   - Apsaugos priemonių įrengimas

5. Griovimas
   - Senų dangų nuėmimas
   - Pertvarų griovimas (jei planuota)
   - Senų komunikacijų demontavimas
   - Šiukšlių išvežimas
```

#### FAZĖ 3: KONSTRUKCINIAI DARBAI

```
6. Pertvaros
   - Naujų pertvarų mūrijimas
   - Angų praplatinimas/užmūrijimas
   - Konstrukcijų sutvirtinimas
```

#### FAZĖ 4: INŽINERINIAI TINKLAI

```
7. Elektra
   - Naujų kabelių tiesimas
   - Skydelio keitimas
   - Rozetių/jungiklių vietų paruošimas

8. Santechnika
   - Vamzdynų keitimas
   - Naujų taškų įrengimas
   - Nuotekų sistema

9. Šildymas
   - Radiatorių keitimas
   - Grindų šildymo įrengimas
   - Termostatų montavimas
```

#### FAZĖ 5: APDAILOS DARBAI

```
10. Lubos
    - Lyginimas
    - Įtempiamos lubos (jei planuota)
    - Dažymas

11. Sienos
    - Tinkavimas/glaistymas
    - Gruntavimas
    - Dažymas/tapetai
    - Plytelių klijavimas

12. Grindys
    - Išlyginimas
    - Dangos klojimas
    - Grindjuosčiai
```

#### FAZĖ 6: MONTAVIMO DARBAI

```
13. Durys
    - Durų montavimas
    - Apvadų montavimas
    - Furnitūros montavimas

14. Langai (jei keičiami)
    - Senų langų demontavimas
    - Naujų langų montavimas
    - Angokraščių apdaila
    - Palangių montavimas

15. Santechnika
    - Vonios/dušo montavimas
    - Unitazų montavimas
    - Kriauklių montavimas
    - Maišytuvų montavimas

16. Elektra
    - Rozetės ir jungikliai
    - Šviestuvai
    - Elektros prietaisų pajungimas
```

#### FAZĖ 7: BALDAI IR DEKORAS

```
17. Virtuvė
    - Virtuvės baldų surinkimas
    - Stalviršio montavimas
    - Buitinės technikos pajungimas

18. Vonios baldai
    - Spintelių montavimas
    - Veidrodžių montavimas
    - Aksesuarų montavimas

19. Šviestuvai ir dekoras
    - Šviestuvų montavimas
    - Užuolaidų karnizų montavimas
    - Dekoratyvinių elementų montavimas
```

#### FAZĖ 8: GALUTINIS SUTVARKYMAS

```
20. Valymas
    - Statybinių šiukšlių išvežimas
    - Generalinis valymas
    - Langų valymas

21. Defektų šalinimas
    - Smulkių defektų taisymas
    - Dažymo pataisymai
    - Reguliavimai
```

### C. KOMERCINIŲ PATALPŲ ĮRENGIMAS

```
[Specifiniai etapai komercinėms patalpoms]
- Verslo licencijų gavimas
- Specialūs saugumo reikalavimai
- Priešgaisrinė sistema
- Apsaugos sistemos
- Kasų sistemos
- Specifinė įranga pagal veiklos tipą
```

---

## 6. Funkcionalumo Moduliai {#funkcionalumo-moduliai}

### MODULIS 1: Vartotojų Valdymas

#### 1.1 Registracija ir Autentifikacija

```typescript
// Registracijos flow
interface RegistrationFlow {
  steps: [
    'email_input', // El. pašto įvedimas
    'verification_code', // 6 skaičių kodas į el. paštą
    'account_type', // Savininkas / Rangovas / Pardavėjas
    'personal_info', // Vardas, pavardė, telefonas
    'company_info', // Jei rangovas/pardavėjas
    'password_creation', // Slaptažodis + patvirtinimas
    'terms_acceptance' // Sutikimas su taisyklėmis
  ]

  validations: {
    email: 'RFC5322 compliant + unique in DB'
    phone: 'Lithuanian format +370XXXXXXXX'
    password: 'min 8 chars, 1 uppercase, 1 number, 1 special'
    company_code: 'Valid Lithuanian company code'
  }

  verification: {
    method: 'email_otp'
    code_length: 6
    expiry_minutes: 15
    max_attempts: 5
  }
}

// Prisijungimo metodai
interface LoginMethods {
  email_password: boolean
  google_oauth: boolean
  facebook_oauth: boolean
  apple_signin: boolean
  magic_link: boolean
  phone_otp: boolean // Ateičiai
}

// Sesijos valdymas
interface SessionManagement {
  token_type: 'JWT'
  access_token_expiry: '15 minutes'
  refresh_token_expiry: '30 days'
  remember_me_expiry: '90 days'
  multi_device: true
  session_limit: 5 // Max aktyvių sesijų
}
```

#### 1.2 Profilio Valdymas

```typescript
interface UserProfile {
  // Asmeninė informacija
  personal: {
    avatar: ImageUpload
    first_name: string
    last_name: string
    phone: PhoneWithVerification
    email: EmailWithVerification
    birth_date?: Date
    address?: Address
    language: 'lt' | 'en' | 'ru'
    timezone: string
  }

  // Pranešimų nustatymai
  notifications: {
    channels: {
      email: boolean
      sms: boolean
      push: boolean
      in_app: boolean
    }

    types: {
      project_updates: boolean
      stage_completions: boolean
      new_offers: boolean
      messages: boolean
      reminders: boolean
      marketing: boolean
    }

    quiet_hours: {
      enabled: boolean
      start: string // "22:00"
      end: string // "08:00"
    }
  }

  // Saugumo nustatymai
  security: {
    two_factor_auth: boolean
    login_alerts: boolean
    trusted_devices: Device[]
    active_sessions: Session[]
    password_last_changed: Date
  }

  // Privatumo nustatymai
  privacy: {
    profile_visibility: 'public' | 'contractors' | 'private'
    show_phone: boolean
    show_email: boolean
    show_projects: boolean
    allow_reviews: boolean
  }
}
```

### MODULIS 2: Projektų Valdymas

#### 2.1 Projekto Kūrimas

```typescript
interface ProjectCreationWizard {
  steps: {
    // Step 1: Pagrindai
    basics: {
      name: string
      type: 'house' | 'apartment' | 'cottage' | 'commercial' | 'renovation'
      description?: string
      cover_image?: File
    }

    // Step 2: Lokacija
    location: {
      address: {
        street: string
        city: string
        postal_code: string
        country: string
      }
      coordinates?: {
        lat: number
        lng: number
      }
      map_picker: boolean // Interaktyvus žemėlapis
    }

    // Step 3: Specifikacijos
    specifications: {
      area_m2?: number
      floors?: number
      rooms?: number
      bathrooms?: number
      garage?: boolean
      basement?: boolean
      attic?: boolean
    }

    // Step 4: Biudžetas ir laikas
    planning: {
      budget_planned?: number
      start_date?: Date
      planned_end_date?: Date
      financing_type?: 'cash' | 'loan' | 'mixed'
    }

    // Step 5: Etapų šablonas
    stages_template: {
      template: 'new_house' | 'renovation' | 'custom'
      selected_stages: StageTemplate[]
      custom_stages?: CustomStage[]
    }

    // Step 6: Privatumas
    privacy: {
      visibility: 'private' | 'contractors_only' | 'public'
      allow_contractor_suggestions: boolean
      allow_vendor_offers: boolean
    }
  }

  // Automatinis išsaugojimas
  autosave: {
    enabled: true
    interval_seconds: 30
    draft_storage: 'localStorage + backend'
  }
}
```

#### 2.2 Projekto Dashboard

```typescript
interface ProjectDashboard {
  layout: {
    // Viršutinė statistika (Cards)
    stats_cards: [
      { title: 'Progresas'; value: '45%'; trend: '+5%' },
      { title: 'Biudžetas'; value: '€25,430'; remaining: '€34,570' },
      { title: 'Liko dienų'; value: '127'; status: 'on_track' },
      { title: 'Aktyvūs etapai'; value: '3'; total: '24' }
    ]

    // Pagrindinės sekcijos
    sections: {
      timeline: {
        view: 'gantt' | 'calendar' | 'list'
        filters: ['status', 'contractor', 'date_range']
        zoom: 'day' | 'week' | 'month'
      }

      recent_activity: {
        items_count: 10
        types: ['all', 'documents', 'photos', 'comments', 'status_changes']
        real_time_updates: true
      }

      team_members: {
        display: 'grid' | 'list'
        quick_actions: ['message', 'call', 'view_work']
      }

      upcoming_tasks: {
        days_ahead: 7
        grouping: 'by_stage' | 'by_contractor' | 'by_date'
      }

      budget_overview: {
        chart_type: 'donut' | 'bar'
        breakdown: 'by_stage' | 'by_category'
      }
    }
  }

  // Quick Actions
  quick_actions: ['add_document', 'upload_photo', 'invite_contractor', 'create_task', 'request_materials', 'write_note']
}
```

#### 2.3 Etapų Valdymas

```typescript
interface StageManagement {
  // Etapo kortelė
  stage_card: {
    header: {
      icon: string
      name: string
      status_badge: StatusBadge
      progress_bar: ProgressBar
      menu_actions: ['edit', 'duplicate', 'delete', 'archive']
    }

    body: {
      dates: {
        planned: DateRange
        actual?: DateRange
        days_remaining?: number
      }

      contractor: {
        company_logo: string
        company_name: string
        contact_person: string
        quick_contact: ['phone', 'email', 'message']
      }

      budget: {
        planned: number
        spent: number
        percentage: number
        warning_threshold: 90 // Įspėjimas kai viršija 90%
      }
    }

    footer: {
      documents_count: number
      photos_count: number
      tasks_completed: string // "7/10"
      last_update: RelativeTime
    }
  }

  // Etapo detalus vaizdas
  stage_detail: {
    tabs: [
      {
        name: 'overview'
        content: {
          description: RichText
          checklist: ChecklistWithProgress
          key_dates: Timeline
          dependencies: DependencyGraph
        }
      },
      {
        name: 'documents'
        content: {
          folders: FolderStructure
          recent: DocumentList
          upload: DragDropZone
        }
      },
      {
        name: 'photos'
        content: {
          gallery: PhotoGallery
          albums: AlbumList
          compare: BeforeAfter
        }
      },
      {
        name: 'materials'
        content: {
          used: MaterialsList
          planned: MaterialsList
          request_quotes: QuickAction
        }
      },
      {
        name: 'communication'
        content: {
          comments: ThreadedComments
          mentions: MentionSystem
          attachments: boolean
        }
      }
    ]
  }

  // Drag & Drop funkcionalumas
  drag_drop: {
    reorder_stages: boolean
    move_between_phases: boolean
    visual_feedback: 'ghost' | 'placeholder'
    auto_save: boolean
  }
}
```

### MODULIS 3: Rangovų Sistema

#### 3.1 Rangovų Katalogas

```typescript
interface ContractorCatalog {
  // Paieškos ir filtravimo sistema
  search: {
    text_search: {
      fields: ['name', 'description', 'services']
      fuzzy_matching: true
      suggestions: true
    }

    filters: {
      category: string[] // Multi-select
      location: {
        city: string
        radius_km: number
      }
      rating: {
        min: number
        stars_display: boolean
      }
      price_range: 'budget' | 'medium' | 'premium'
      availability: 'immediate' | 'week' | 'month'
      verified_only: boolean
      has_insurance: boolean
      has_portfolio: boolean
    }

    sorting: {
      options: ['rating', 'reviews_count', 'distance', 'price', 'response_time']
      default: 'rating'
    }
  }

  // Rangovo kortelė kataloge
  contractor_card: {
    badge: 'verified' | 'premium' | 'new'
    header: {
      logo: Image
      name: string
      category: string
      rating: StarRating
      reviews_count: number
    }

    body: {
      description: string // Max 200 chars
      specializations: Tag[]
      service_areas: string[]
      years_experience: number
      completed_projects: number
    }

    footer: {
      portfolio_preview: Image[] // Max 3
      response_time: string // "Atsako per 2 val"
      starting_price?: string
      actions: ['view_profile', 'quick_message', 'save']
    }
  }
}
```

#### 3.2 Rangovo Profilis

```typescript
interface ContractorProfile {
  sections: {
    // Hero sekcija
    hero: {
      cover_image: Image
      logo: Image
      name: string
      tagline: string
      badges: Badge[] // Verified, Premium, Awards
      stats: [
        { label: 'Metų patirtis'; value: number },
        { label: 'Užbaigti projektai'; value: number },
        { label: 'Komandos nariai'; value: number },
        { label: 'Klientų įvertinimas'; value: number }
      ]
      cta_buttons: ['contact', 'request_quote', 'save']
    }

    // Apie įmonę
    about: {
      description: RichText
      specializations: DetailedList
      service_areas: MapWithPins
      working_hours: Schedule
      languages: string[]
      payment_methods: string[]
    }

    // Portfolio
    portfolio: {
      projects: {
        display: 'grid' | 'carousel'
        items: ProjectShowcase[]
        filters: ['type', 'year', 'budget_range']
      }

      before_after: BeforeAfterGallery
      videos: VideoGallery
    }

    // Sertifikatai ir leidimai
    credentials: {
      licenses: Document[]
      certificates: Document[]
      insurance: Document[]
      associations: Logo[]
    }

    // Atsiliepimai
    reviews: {
      summary: {
        average_rating: number
        total_reviews: number
        distribution: RatingDistribution
        recent_trend: 'improving' | 'stable' | 'declining'
      }

      reviews_list: {
        sorting: ['newest', 'highest', 'lowest', 'most_helpful']
        filters: ['with_photos', 'verified', 'rating']
        items: Review[]
        pagination: Pagination
      }
    }

    // Komanda
    team: {
      members: TeamMember[]
      show_credentials: boolean
      show_experience: boolean
    }

    // Kainos (optional)
    pricing: {
      display_type: 'packages' | 'hourly' | 'request_quote'
      packages?: PricingPackage[]
      hourly_rate?: PriceRange
      typical_project?: PriceRange
      price_includes?: string[]
      additional_costs?: string[]
    }
  }
}
```

### MODULIS 4: Prekyvietė (Marketplace)

#### 4.1 Užklausos Kūrimas

```typescript
interface MarketplaceRequestCreation {
  wizard: {
    // Step 1: Ko reikia?
    what: {
      title: string
      category: CategorySelector
      description: RichTextEditor
      specifications: DynamicFields // Pagal kategoriją
    }

    // Step 2: Kiek reikia?
    quantity: {
      items: [
        {
          name: string
          quantity: number
          unit: Unit
          specifications?: KeyValue[]
          reference_image?: Image
        }
      ]

      templates: {
        load_from_calculator: boolean
        save_as_template: boolean
      }
    }

    // Step 3: Kada reikia?
    when: {
      urgency: 'asap' | 'this_week' | 'specific_date'
      delivery_date?: Date
      flexible_dates: boolean
      date_range?: DateRange
    }

    // Step 4: Kur pristatyti?
    where: {
      use_project_address: boolean
      custom_address?: Address
      delivery_instructions?: string
      access_info?: string
    }

    // Step 5: Biudžetas
    budget: {
      type: 'fixed' | 'range' | 'request_prices'
      fixed_amount?: number
      range?: { min: number; max: number }
      include_delivery: boolean
      payment_terms?: 'immediate' | 'invoice_15' | 'invoice_30'
    }

    // Step 6: Kam siųsti?
    recipients: {
      visibility: 'all_vendors' | 'category_vendors' | 'selected_vendors'
      selected_vendors?: Vendor[]
      exclude_vendors?: Vendor[]
      auto_close: {
        enabled: boolean
        after_offers: number
      }
    }
  }
}
```

#### 4.2 Pasiūlymų Valdymas

```typescript
interface OfferManagement {
  // Pasiūlymų sąrašas
  offers_list: {
    sorting: ['price_low', 'price_high', 'rating', 'newest', 'delivery_date']

    filters: {
      price_range: Range
      delivery_date: DateRange
      vendor_rating: number
      includes_delivery: boolean
      payment_terms: string[]
    }

    comparison: {
      enabled: boolean
      max_items: 3
      highlight_differences: boolean
    }
  }

  // Pasiūlymo kortelė
  offer_card: {
    header: {
      vendor: {
        logo: Image
        name: string
        rating: StarRating
        response_time: string
      }

      badge?: 'best_price' | 'fastest_delivery' | 'recommended'
    }

    body: {
      price: {
        total: number
        breakdown: LineItem[]
        includes_vat: boolean
        delivery_cost?: number
      }

      delivery: {
        date: Date
        guarantee: boolean
      }

      items: {
        display: 'summary' | 'detailed'
        match_percentage: number // Kiek % atitinka užklausą
      }

      notes?: string
      attachments?: Document[]
    }

    footer: {
      actions: ['accept', 'reject', 'negotiate', 'message']
      valid_until: Date
    }
  }

  // Derybų funkcija
  negotiation: {
    chat: {
      enabled: boolean
      attachments: boolean
      offer_updates: boolean
    }

    counter_offer: {
      enabled: boolean
      max_rounds: 3
      history: NegotiationHistory
    }
  }
}
```

### MODULIS 5: Dokumentų Sistema

#### 5.1 Dokumentų Tvarkyklė

```typescript
interface DocumentManager {
  // Failų struktūra
  structure: {
    view: 'folders' | 'list' | 'timeline'

    default_folders: [
      'Projektai ir brėžiniai',
      'Leidimai ir dokumentai',
      'Sutartys',
      'Sąskaitos faktūros',
      'Aktai',
      'Garantijos',
      'Nuotraukos',
      'Kita'
    ]

    custom_folders: {
      enabled: boolean
      nesting_levels: 3
      color_coding: boolean
    }
  }

  // Įkėlimo sistema
  upload: {
    methods: ['drag_drop', 'file_picker', 'camera', 'scanner_app']

    limits: {
      max_file_size_mb: 100
      allowed_formats: [
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'jpg',
        'jpeg',
        'png',
        'heic',
        'dwg',
        'dxf', // CAD failai
        'mp4',
        'mov' // Video
      ]

      batch_upload: {
        enabled: boolean
        max_files: 50
      }
    }

    processing: {
      auto_rename: boolean // Data + tipas + projektas
      ocr: boolean // Teksto atpažinimas
      compression: boolean
      thumbnail_generation: boolean
      virus_scan: boolean
    }
  }

  // Dokumentų peržiūra
  viewer: {
    inline_preview: boolean
    supported_formats: ['pdf', 'images', 'office']

    annotations: {
      enabled: boolean
      tools: ['highlight', 'comment', 'draw', 'measure']
      collaboration: boolean
    }

    versions: {
      enabled: boolean
      comparison: boolean
      auto_versioning: boolean
    }
  }

  // Paieška ir filtravimas
  search: {
    full_text: boolean // Paieška dokumento turinyje

    filters: {
      date_range: DateRange
      file_type: string[]
      uploaded_by: User[]
      tags: string[]
      stage: Stage[]
    }

    ai_categorization: {
      enabled: boolean
      auto_tagging: boolean
      smart_folders: boolean
    }
  }
}
```

### MODULIS 6: Komunikacijos Sistema

#### 6.1 Pranešimų Sistema

```typescript
interface MessagingSystem {
  // Pokalbių sąrašas
  conversations: {
    types: ['direct', 'group', 'project']

    list_view: {
      sorting: ['recent', 'unread', 'pinned']
      search: boolean
      filters: ['unread', 'archived', 'starred']

      preview: {
        show_last_message: boolean
        show_timestamp: boolean
        show_unread_count: boolean
        show_typing_indicator: boolean
      }
    }
  }

  // Pokalbio langas
  chat: {
    header: {
      participant_info: boolean
      online_status: boolean
      actions: ['call', 'video', 'info', 'mute', 'archive']
    }

    messages: {
      types: ['text', 'image', 'file', 'voice', 'location']

      features: {
        read_receipts: boolean
        typing_indicators: boolean
        reactions: boolean
        reply_to_message: boolean
        forward: boolean
        delete: boolean
        edit: boolean // Per 15 min
      }

      formatting: {
        enabled: boolean
        options: ['bold', 'italic', 'code', 'link']
      }
    }

    input: {
      attachments: {
        from_device: boolean
        from_project: boolean
        max_size_mb: 25
      }

      mentions: boolean // @vardas
      quick_replies: string[] // Dažni atsakymai
      voice_messages: boolean
    }
  }

  // Pranešimai (Notifications)
  notifications: {
    channels: {
      in_app: {
        bell_icon: boolean
        badge_count: boolean
        toast_messages: boolean
      }

      email: {
        instant: ['urgent_only']
        digest: 'daily' | 'weekly' | 'never'
        templates: EmailTemplate[]
      }

      sms: {
        enabled: boolean
        types: ['stage_completed', 'new_message', 'payment_due']
      }

      push: {
        enabled: boolean
        sound: boolean
        vibration: boolean
      }
    }

    preferences: {
      do_not_disturb: TimeRange
      weekend_mode: boolean
      vacation_mode: boolean
    }
  }
}
```

### MODULIS 7: Skaičiuotuvų Biblioteka

#### 7.1 Skaičiuotuvų Tipai

```typescript
interface CalculatorTypes {
  // Medžiagų skaičiuotuvai
  materials: {
    concrete: {
      inputs: ['length', 'width', 'depth']
      outputs: ['volume_m3', 'bags_needed', 'estimated_cost']
    }

    bricks: {
      inputs: ['wall_length', 'wall_height', 'brick_type']
      outputs: ['bricks_count', 'mortar_kg', 'estimated_cost']
    }

    tiles: {
      inputs: ['room_length', 'room_width', 'tile_size', 'waste_percentage']
      outputs: ['tiles_needed', 'boxes_needed', 'grout_kg']
    }

    paint: {
      inputs: ['wall_area', 'ceiling_area', 'coats_number', 'paint_coverage']
      outputs: ['paint_liters', 'primer_liters', 'estimated_cost']
    }

    insulation: {
      inputs: ['area', 'thickness', 'material_type']
      outputs: ['volume', 'packages_needed', 'r_value']
    }
  }

  // Konstrukcijų skaičiuotuvai
  constructions: {
    foundation: {
      inputs: ['building_area', 'foundation_type', 'soil_type', 'depth']
      outputs: ['concrete_m3', 'rebar_kg', 'waterproofing_m2']
    }

    roof: {
      inputs: ['roof_type', 'length', 'width', 'pitch_angle']
      outputs: ['area_m2', 'tiles_count', 'battens_m', 'membrane_m2']
    }

    stairs: {
      inputs: ['floor_height', 'stair_width', 'tread_depth']
      outputs: ['steps_count', 'rise_height', 'total_run', 'angle']
    }
  }

  // Inžineriniai skaičiuotuvai
  engineering: {
    heating: {
      inputs: ['area', 'ceiling_height', 'insulation_level', 'climate_zone']
      outputs: ['heat_loss_kw', 'radiators_needed', 'boiler_power']
    }

    electrical: {
      inputs: ['rooms', 'appliances', 'lighting_points']
      outputs: ['total_load_kw', 'circuit_breakers', 'cable_sizes']
    }

    ventilation: {
      inputs: ['room_volumes', 'occupancy', 'activity_level']
      outputs: ['air_flow_m3h', 'duct_sizes', 'fan_power']
    }
  }

  // Finansiniai skaičiuotuvai
  financial: {
    mortgage: {
      inputs: ['loan_amount', 'interest_rate', 'loan_term', 'down_payment']
      outputs: ['monthly_payment', 'total_interest', 'amortization_schedule']
    }

    roi: {
      inputs: ['investment', 'rental_income', 'expenses', 'appreciation_rate']
      outputs: ['roi_percentage', 'payback_period', 'cash_flow']
    }

    budget_planner: {
      inputs: ['total_budget', 'categories', 'contingency_percentage']
      outputs: ['category_budgets', 'payment_schedule', 'cash_flow_chart']
    }
  }
}
```

#### 7.2 Skaičiuotuvo UI

```typescript
interface CalculatorUI {
  layout: {
    type: 'single_page' | 'wizard' | 'tabs'

    input_section: {
      style: 'form' | 'sliders' | 'mixed'

      components: {
        number_input: {
          min?: number
          max?: number
          step?: number
          unit?: string
          help_text?: string
        }

        slider: {
          min: number
          max: number
          marks?: boolean
          tooltip?: boolean
        }

        select: {
          options: Option[]
          searchable?: boolean
          multi?: boolean
        }

        radio_group: {
          options: Option[]
          layout: 'horizontal' | 'vertical'
          with_images?: boolean
        }
      }

      validation: {
        real_time: boolean
        error_messages: Map<string, string>
      }
    }

    output_section: {
      display: {
        summary_cards: Card[]
        detailed_table: Table
        charts: Chart[]
        breakdown: ItemizedList
      }

      actions: {
        save_to_project: boolean
        share: boolean
        print: boolean
        export_pdf: boolean
        create_material_request: boolean
      }
    }

    visualization: {
      enabled: boolean
      type: '2d_diagram' | '3d_model' | 'interactive'
      real_time_update: boolean
    }
  }

  // Rezultatų išsaugojimas
  persistence: {
    auto_save: boolean
    history: {
      enabled: boolean
      max_items: 10
      compare: boolean
    }

    templates: {
      save_as_template: boolean
      load_from_template: boolean
      share_templates: boolean
    }
  }
}
```

### MODULIS 8: Analitika ir Ataskaitos

#### 8.1 Projekto Analitika

```typescript
interface ProjectAnalytics {
  dashboard: {
    // KPI kortelės
    kpis: [
      {
        title: 'Bendras progresas'
        value: Percentage
        chart: SparklineChart
        comparison: 'vs_planned'
      },
      {
        title: 'Biudžeto panaudojimas'
        value: Currency
        chart: ProgressBar
        alert: 'over_budget' | 'on_track' | 'under_budget'
      },
      {
        title: 'Laiko efektyvumas'
        value: Days
        chart: GaugeChart
        forecast: Date
      },
      {
        title: 'Kokybės rodiklis'
        value: Score
        chart: RadarChart
        factors: ['timeliness', 'budget', 'quality', 'communication']
      }
    ]

    // Grafikai
    charts: {
      budget_timeline: {
        type: 'area'
        data: 'planned_vs_actual'
        granularity: 'week' | 'month'
      }

      stage_progress: {
        type: 'horizontal_bar'
        data: 'stages_completion'
        grouping: 'by_phase'
      }

      expense_breakdown: {
        type: 'donut'
        data: 'expenses_by_category'
        drill_down: boolean
      }

      contractor_performance: {
        type: 'radar'
        metrics: ['timeliness', 'quality', 'communication', 'value']
      }
    }

    // Prognozės
    predictions: {
      completion_date: {
        algorithm: 'linear_regression'
        confidence_interval: 95
        factors: ['current_pace', 'seasonal_adjustments', 'dependencies']
      }

      budget_forecast: {
        scenarios: ['optimistic', 'realistic', 'pessimistic']
        risk_factors: string[]
      }
    }
  }

  // Ataskaitos
  reports: {
    types: {
      progress_report: {
        frequency: 'weekly' | 'monthly'
        sections: ['summary', 'completed_tasks', 'upcoming', 'issues', 'photos']
        recipients: User[]
      }

      financial_report: {
        period: DateRange
        sections: ['overview', 'expenses', 'invoices', 'forecast']
        export_format: 'pdf' | 'excel'
      }

      contractor_report: {
        contractor: Company
        metrics: ['tasks', 'timeliness', 'quality', 'communication']
      }
    }

    generation: {
      manual: boolean
      scheduled: boolean
      templates: ReportTemplate[]
      ai_insights: boolean
    }
  }
}
```

---

## 7. UI/UX Detalus Planas {#ui-ux-planas}

### 7.1 Navigacijos Struktūra

```typescript
interface NavigationStructure {
  // Desktop navigacija
  desktop: {
    top_bar: {
      logo: Link<'/dashboard'>

      main_menu: [
        { label: 'Pradžia'; href: '/dashboard'; icon: 'Home' },
        { label: 'Projektai'; href: '/projects'; icon: 'Briefcase' },
        { label: 'Skaičiuotuvai'; href: '/calculators'; icon: 'Calculator' },
        { label: 'Prekyvietė'; href: '/marketplace'; icon: 'ShoppingCart' },
        { label: 'Rangovai'; href: '/contractors'; icon: 'Users' }
      ]

      right_section: {
        search: GlobalSearch
        notifications: NotificationBell
        messages: MessageIcon
        profile: ProfileDropdown
      }
    }

    sidebar: {
      collapsed_width: '80px'
      expanded_width: '280px'

      project_context: {
        show: 'when_in_project'
        quick_switch: ProjectSwitcher

        menu: [
          { label: 'Apžvalga'; icon: 'LayoutDashboard' },
          { label: 'Etapai'; icon: 'GitBranch' },
          { label: 'Dokumentai'; icon: 'FileText' },
          { label: 'Komanda'; icon: 'Users' },
          { label: 'Biudžetas'; icon: 'DollarSign' },
          { label: 'Nuotraukos'; icon: 'Camera' },
          { label: 'Užrašai'; icon: 'StickyNote' },
          { label: 'Nustatymai'; icon: 'Settings' }
        ]
      }
    }
  }

  // Mobile navigacija
  mobile: {
    bottom_navigation: {
      items: [
        { icon: 'Home'; label: 'Pradžia' },
        { icon: 'Briefcase'; label: 'Projektai' },
        { icon: 'Plus'; label: 'Pridėti'; action: 'modal' },
        { icon: 'Calculator'; label: 'Skaičiuoti' },
        { icon: 'User'; label: 'Profilis' }
      ]

      style: 'floating' | 'fixed'
      hide_on_scroll: boolean
    }

    hamburger_menu: {
      position: 'top_left'
      overlay: boolean
      animation: 'slide' | 'fade'
    }
  }
}
```

### 7.2 Komponentų Sistema (Vuexy – MUI)

```typescript
interface ComponentSystem {
  // Formos
  forms: {
    inputs: {
      text: 'mui/TextField'
      textarea: 'mui/TextareaAutosize'
      select: 'mui/Select'
      multiselect: 'mui/Autocomplete'
      checkbox: 'mui/Checkbox'
      radio: 'mui/RadioGroup'
      switch: 'mui/Switch'
      datepicker: 'mui/DatePicker'
      timepicker: 'mui/TimePicker'
      file_upload: 'custom/FileUpload (Vuexy example)'
      color_picker: 'mui/ColorPicker (or react-colorful)'
      slider: 'mui/Slider'
      rating: 'mui/Rating'
    }

    validation: {
      inline_errors: boolean
      error_summary: boolean
      success_feedback: boolean
    }
  }

  // Lentelės
  tables: {
    base: 'mui/DataGrid'

    features: {
      sorting: boolean
      filtering: boolean
      pagination: boolean
      row_selection: boolean
      column_resizing: boolean
      column_reordering: boolean
      export: ['csv', 'excel', 'pdf']
      bulk_actions: boolean
      expandable_rows: boolean
      sticky_header: boolean
    }
  }

  // Modalai ir DrawerS
  modals: {
    sizes: ['sm', 'md', 'lg', 'xl', 'full']

    types: {
      standard: 'isomorphic/Modal'
      drawer: 'isomorphic/Drawer'
      sheet: 'isomorphic/Sheet'
      popover: 'isomorphic/Popover'
      tooltip: 'isomorphic/Tooltip'
    }

    animations: {
      open: 'fadeIn' | 'slideUp' | 'zoomIn'
      close: 'fadeOut' | 'slideDown' | 'zoomOut'
    }
  }

  // Pranešimai
  feedback: {
    toast: 'isomorphic/Toast'
    alert: 'isomorphic/Alert'
    notification: 'isomorphic/Notification'
    progress: 'isomorphic/Progress'
    skeleton: 'isomorphic/Skeleton'
    spinner: 'isomorphic/Spinner'
  }

  // Navigacija
  navigation: {
    breadcrumb: 'isomorphic/Breadcrumb'
    tabs: 'isomorphic/Tabs'
    steps: 'isomorphic/Steps'
    pagination: 'isomorphic/Pagination'
    menu: 'isomorphic/Menu'
    dropdown: 'isomorphic/Dropdown'
  }
}
```

### 7.3 Responsive Design

```typescript
interface ResponsiveDesign {
  breakpoints: {
    xs: '0-639px' // Phones
    sm: '640-767px' // Large phones
    md: '768-1023px' // Tablets
    lg: '1024-1279px' // Small laptops
    xl: '1280-1535px' // Desktops
    '2xl': '1536px+' // Large screens
  }

  layout_adjustments: {
    mobile: {
      navigation: 'bottom_tabs'
      sidebar: 'hamburger_menu'
      tables: 'cards_view'
      forms: 'single_column'
      modals: 'full_screen'
      charts: 'scrollable'
    }

    tablet: {
      navigation: 'top_bar'
      sidebar: 'collapsible'
      tables: 'responsive_table'
      forms: 'two_column'
      modals: 'centered'
      charts: 'responsive'
    }

    desktop: {
      navigation: 'top_bar + sidebar'
      sidebar: 'expanded'
      tables: 'full_table'
      forms: 'multi_column'
      modals: 'centered'
      charts: 'interactive'
    }
  }
}
```

### 7.4 Spalvų Sistema ir Temos

```typescript
interface ThemeSystem {
  // Pagrindinės spalvos (Isomorphic defaults)
  colors: {
    primary: {
      50: '#eff6ff'
      500: '#3b82f6' // Main
      900: '#1e3a8a'
    }

    secondary: {
      50: '#f8fafc'
      500: '#64748b'
      900: '#0f172a'
    }

    success: '#10b981'
    warning: '#f59e0b'
    error: '#ef4444'
    info: '#06b6d4'
  }

  // Temos
  themes: {
    light: {
      background: '#ffffff'
      surface: '#f8fafc'
      text: '#0f172a'
      border: '#e2e8f0'
    }

    dark: {
      background: '#0f172a'
      surface: '#1e293b'
      text: '#f8fafc'
      border: '#334155'
    }

    // Custom tema specifiškai NT projektams
    construction: {
      primary: '#ff6b35' // Oranžinė
      secondary: '#004643' // Tamsiai žalia
      accent: '#ffd23f' // Geltona
      neutral: '#e8e4e1' // Smėlio
    }
  }

  // Tipografija
  typography: {
    fonts: {
      sans: 'Inter, system-ui, sans-serif'
      mono: 'JetBrains Mono, monospace'
    }

    sizes: {
      xs: '0.75rem' // 12px
      sm: '0.875rem' // 14px
      base: '1rem' // 16px
      lg: '1.125rem' // 18px
      xl: '1.25rem' // 20px
      '2xl': '1.5rem' // 24px
      '3xl': '1.875rem' // 30px
      '4xl': '2.25rem' // 36px
    }
  }
}
```

### 7.5 Animacijos ir Mikro-Interakcijos

```typescript
interface AnimationSystem {
  // Puslapio animacijos
  page_transitions: {
    type: 'fade' | 'slide' | 'none'
    duration: 300 // ms
    easing: 'ease-in-out'
  }

  // Komponentų animacijos
  component_animations: {
    hover_effects: {
      cards: 'lift' // translateY(-4px) + shadow
      buttons: 'scale' // scale(1.05)
      links: 'underline'
    }

    loading_states: {
      skeleton: boolean
      shimmer: boolean
      progress_bar: boolean
      spinner: boolean
    }

    feedback: {
      success: 'checkmark_animation'
      error: 'shake'
      delete: 'fade_out'
      add: 'slide_in'
    }
  }

  // Gesture support (mobile)
  gestures: {
    swipe: {
      enabled: boolean
      actions: {
        left: 'delete' | 'archive'
        right: 'complete' | 'favorite'
      }
    }

    pull_to_refresh: boolean
    pinch_to_zoom: boolean
    long_press: boolean
  }
}
```

---

## 8. Kūrimo Etapai (Fazės) {#kurimo-etapai}

### FAZĖ 0: Pasiruošimas (1 savaitė)

````markdown
## Aplinkos paruošimas

1. **Development Environment**

   - [ ] Node.js 20+ LTS
   - [ ] pnpm package manager
   - [ ] VS Code + extensions (ESLint, Prettier, Tailwind CSS IntelliSense)
   - [ ] Git versijų kontrolė

2. **Projekto inicializavimas**
   ```bash
   npx create-next-app@latest nt-knygele --typescript --tailwind --app
   cd nt-knygele
   pnpm install
   ```
````

3. **Vuexy Theme integracija**

   - [ ] Vuexy Next.js šablonas jau integruotas šiame repo; dokumentacija: https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation/
   - [ ] Nukopijuoti components katalogą
   - [ ] Nukopijuoti styles
   - [ ] Sukonfigūruoti Tailwind pagal temą

4. **Supabase projekto sukūrimas**

   - [ ] Sukurti Supabase projektą
   - [ ] Gauti API raktus
   - [ ] Sukonfigūruoti lokalią DB

5. **Projekto struktūra**

   ```
   nt-knygele/
   ├── app/                    # Next.js 15 App Router
   │   ├── (auth)/            # Auth layout grupė
   │   ├── (dashboard)/       # Dashboard layout grupė
   │   ├── api/               # API routes
   │   └── globals.css
   ├── components/            # Vuexy/MUI komponentai ir wrapper'iai
   │   ├── ui/               # Base UI komponentai
   │   ├── forms/            # Formos komponentai
   │   ├── layouts/          # Layout komponentai
   │   └── features/         # Feature-specific komponentai
   ├── lib/                  # Utility funkcijos
   │   ├── supabase/        # Supabase client
   │   ├── hooks/           # Custom React hooks
   │   └── utils/           # Helper funkcijos
   ├── types/               # TypeScript tipai
   ├── public/              # Statiniai failai
   └── prisma/              # Prisma schema
       └── schema.prisma
   ```

6. **Bazinių dependencies**
   ```json
   {
     "dependencies": {
       "@supabase/supabase-js": "^2.x",
       "@tanstack/react-query": "^5.x",
       "zustand": "^4.x",
       "react-hook-form": "^7.x",
       "zod": "^3.x",
       "@hookform/resolvers": "^3.x",
       "date-fns": "^3.x",
       "recharts": "^2.x"
     }
   }
   ```

````

### FAZĖ 1: MVP Core (4 savaitės)

```markdown
## Savaitė 1: Autentifikacija ir Vartotojų Sistema

### Diena 1-2: Supabase Auth Setup
- [ ] Auth konfigūracija (email/password + OAuth)
- [ ] Registracijos forma su Vuexy/MUI komponentais
- [ ] Email verifikacija flow
- [ ] Prisijungimo forma
- [ ] Password reset flow

### Diena 3-4: Vartotojų Profiliai
- [ ] User profilio DB schema
- [ ] Profilio kūrimo wizard (po registracijos)
- [ ] Profilio redagavimo forma
- [ ] Avatar upload su Supabase Storage

### Diena 5: Rolių Sistema
- [ ] RBAC implementacija
- [ ] Role-based route protection
- [ ] Permissions middleware

## Savaitė 2: Projektų Pagrindai

### Diena 1-2: Projektų CRUD
- [ ] Projects lentelė DB
- [ ] Projekto kūrimo wizard (6 žingsniai)
- [ ] Projektų sąrašo puslapis
- [ ] Projekto kortelės komponentas

### Diena 3-4: Projekto Dashboard
- [ ] Dashboard layout su Vuexy (MUI)
- [ ] Statistikos kortelės
- [ ] Projekto navigacija (sidebar)
- [ ] Quick actions meniu

### Diena 5: Projekto Nariai
- [ ] Project members lentelė
- [ ] Kvietimų sistema (email)
- [ ] Narių valdymo UI
- [ ] Permissions per role

## Savaitė 3: Etapų Sistema

### Diena 1-2: Etapų Šablonai
- [ ] Stage templates DB seed
- [ ] Lietuvos statybų procesų etapai
- [ ] Renovacijos etapai
- [ ] Template selector UI

### Diena 3-4: Etapų Valdymas
- [ ] Project stages CRUD
- [ ] Etapo kortelė (su progress)
- [ ] Drag & drop reordering
- [ ] Status keitimo flow

### Diena 5: Timeline Vizualizacija
- [ ] Gantt chart komponentas
- [ ] Etapų priklausomybės
- [ ] Critical path highlighting
- [ ] Datos keitimo funkcionalumas

## Savaitė 4: Dokumentai ir Veikla

### Diena 1-2: Failų Sistema
- [ ] Supabase Storage setup
- [ ] File upload komponentas
- [ ] Folder struktūra
- [ ] File preview (PDF, images)

### Diena 3-4: Aktivitės Feed
- [ ] Activities lentelė
- [ ] Real-time updates (Supabase Realtime)
- [ ] Activity feed komponentas
- [ ] Filtravimas pagal tipą

### Diena 5: Testing ir Bug Fixes
- [ ] End-to-end testavimas
- [ ] Bug fixing
- [ ] Performance optimizacija
- [ ] Deployment į staging
````

### FAZĖ 2: Rangovai ir Komunikacija (3 savaitės)

```markdown
## Savaitė 5: Rangovų Sistema

### Diena 1-2: Įmonių Profiliai

- [ ] Companies lentelė
- [ ] Įmonės registracijos forma
- [ ] Įmonės profilio puslapis
- [ ] Portfolio galerija

### Diena 3-4: Rangovų Katalogas

- [ ] Katalogo puslapis su filtrais
- [ ] Paieškos funkcionalumas
- [ ] Rangovo kortelė
- [ ] Kategorijų sistema

### Diena 5: Rangovų Kvietimas

- [ ] Kvietimo į projektą flow
- [ ] Rangovo dashboard
- [ ] Etapų priskyrimas rangovams

## Savaitė 6: Komunikacijos Sistema

### Diena 1-2: Komentarai

- [ ] Comments lentelė
- [ ] Threaded komentarai prie etapų
- [ ] Rich text editor
- [ ] Mentions (@user)

### Diena 3-4: Pranešimų Sistema

- [ ] Notifications lentelė
- [ ] In-app pranešimai
- [ ] Email pranešimai (Resend integracija)
- [ ] Notification preferences

### Diena 5: Real-time Chat (Paprastas)

- [ ] Messages lentelė
- [ ] Projekto chat kanalas
- [ ] Real-time su Supabase
- [ ] Typing indicators

## Savaitė 7: Biudžetas ir Medžiagos

### Diena 1-2: Biudžeto Tracking

- [ ] Biudžeto planavimas per etapą
- [ ] Išlaidų įvedimas
- [ ] Biudžeto dashboard widgets

### Diena 3-4: Medžiagų Sistema

- [ ] Materials lentelė
- [ ] Medžiagų pridėjimas prie etapo
- [ ] Medžiagų sąrašas su kainomis

### Diena 5: Ataskaitos

- [ ] Paprastas PDF generavimas
- [ ] Projekto progress ataskaita
- [ ] Biudžeto ataskaita
```

### FAZĖ 3: Prekyvietė ir Skaičiuotuvai (4 savaitės)

```markdown
## Savaitė 8-9: Marketplace

### Marketplace Backend

- [ ] Marketplace_requests lentelė
- [ ] Marketplace_offers lentelė
- [ ] API endpoints

### Request Creation Flow

- [ ] 6 žingsnių wizard
- [ ] Medžiagų selector
- [ ] Biudžeto nustatymas
- [ ] Vendor targeting

### Vendor Dashboard

- [ ] Incoming requests view
- [ ] Offer creation form
- [ ] Offer management

### Buyer Flow

- [ ] Offers comparison table
- [ ] Accept/reject flow
- [ ] Messaging su vendors

## Savaitė 10-11: Skaičiuotuvų Biblioteka

### Baziniai Skaičiuotuvai

- [ ] Betono skaičiuotuvas
- [ ] Plytų skaičiuotuvas
- [ ] Plytelių skaičiuotuvas
- [ ] Dažų skaičiuotuvas
- [ ] Šildymo galios skaičiuotuvas

### Skaičiuotuvo Framework

- [ ] Calculator lentelė
- [ ] Formula engine
- [ ] Input validacija
- [ ] Rezultatų vizualizacija

### Integracija

- [ ] Save rezultatai į projektą
- [ ] Generate material request
- [ ] Istorijos funkcija
```

### FAZĖ 4: Mobile ir PWA (2 savaitės)

```markdown
## Savaitė 12-13: Mobile Optimizacija

### PWA Setup

- [ ] Service worker
- [ ] Manifest failas
- [ ] Offline funkcionalumas
- [ ] Push notifications

### Mobile UI

- [ ] Bottom navigation
- [ ] Touch gestures
- [ ] Camera integracija
- [ ] Responsive tables → cards

### Mobile-Specific Features

- [ ] Quick photo upload
- [ ] Voice notes
- [ ] GPS location for projects
- [ ] Biometric auth
```

### FAZĖ 5: AI ir Automatizacija (2 savaitės)

```markdown
## Savaitė 14-15: AI Features

### AI Integracija

- [ ] OpenAI API setup
- [ ] Document OCR (text extraction)
- [ ] Smart kategorization
- [ ] Automatic tagging

### AI Asistantas

- [ ] Projekto rekomendacijos
- [ ] Biudžeto optimizavimas
- [ ] Rangovo matching
- [ ] Rizikų identifikavimas

### Automatizacija

- [ ] Automated reminders
- [ ] Stage dependencies check
- [ ] Budget alerts
- [ ] Progress predictions
```

### FAZĖ 6: Testing ir Launch (2 savaitės)

```markdown
## Savaitė 16-17: Paruošimas Produkcijai

### Testing

- [ ] Unit testai (Vitest)
- [ ] Integration testai
- [ ] E2E testai (Playwright)
- [ ] Load testing

### Performance

- [ ] Image optimizacija
- [ ] Code splitting
- [ ] DB query optimizacija
- [ ] CDN setup

### Security

- [ ] Security audit
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] GDPR compliance

### Deployment

- [ ] Production environment setup
- [ ] CI/CD pipeline
- [ ] Monitoring (Sentry)
- [ ] Analytics (PostHog)

### Documentation

- [ ] User dokumentacija
- [ ] API dokumentacija
- [ ] Onboarding tutorial
- [ ] Video guides
```

---

## 9. Integracijų Planas {#integraciju-planas}

### 9.1 Išorinės Integrracijos

```typescript
interface ExternalIntegrations {
  // Mokėjimų Sistema
  payment: {
    provider: 'Stripe' | 'Paysera' | 'Kevin'

    features: {
      subscriptions: boolean // Rangovų planai
      one_time_payments: boolean // Marketplace
      invoicing: boolean
      payment_links: boolean
      recurring_billing: boolean
    }

    supported_methods: ['card', 'bank_transfer', 'paysera', 'revolut', 'paypal']
  }

  // Komunikacija
  communication: {
    email: {
      provider: 'Resend' | 'SendGrid'
      templates: EmailTemplate[]
      tracking: boolean
    }

    sms: {
      provider: 'Twilio'
      templates: SMSTemplate[]
      two_way: boolean
    }

    push: {
      provider: 'OneSignal'
      platforms: ['web', 'ios', 'android']
    }
  }

  // Dokumentai
  documents: {
    ocr: {
      provider: 'Google Cloud Vision' | 'AWS Textract'
      languages: ['lt', 'en', 'ru']
      document_types: ['invoice', 'contract', 'permit']
    }

    e_signature: {
      provider: 'DocuSign' | 'Dokobit'
      workflows: ['contract_signing', 'approval']
    }

    generation: {
      pdf: 'React-PDF' | 'Puppeteer'
      templates: ['invoice', 'report', 'contract']
    }
  }

  // Maps ir Lokacija
  maps: {
    provider: 'Mapbox' | 'Google Maps'

    features: {
      project_locations: boolean
      contractor_service_areas: boolean
      delivery_tracking: boolean
      geocoding: boolean
    }
  }

  // Analytics
  analytics: {
    product: {
      provider: 'PostHog' | 'Mixpanel'
      events: EventSchema[]
      user_profiles: boolean
    }

    performance: {
      provider: 'Sentry'
      error_tracking: boolean
      performance_monitoring: boolean
    }
  }

  // AI Services
  ai: {
    llm: {
      provider: 'OpenAI' | 'Anthropic'
      models: ['gpt-4', 'claude-3']

      use_cases: ['document_summarization', 'smart_categorization', 'chat_assistant', 'content_generation']
    }

    computer_vision: {
      provider: 'Google Cloud Vision'

      features: ['construction_progress_detection', 'safety_compliance_check', 'material_identification']
    }
  }
}
```

### 9.2 Lietuvos Rinkai Specifinės Integrracijos

```typescript
interface LithuanianIntegrations {
  // Valstybinės Institucijos
  government: {
    vtpsi: {
      name: 'Valstybinė teritorijų planavimo ir statybos inspekcija'
      features: ['statybos_leidimu_patikra', 'statybos_pradzios_registravimas', 'statybos_uzbaigimo_deklaravimas']
      api_available: false // Reikės web scraping
    }

    registru_centras: {
      features: ['imoniu_paieska', 'imoniu_verifikavimas', 'savininku_patikra']
      api_available: true
      authentication: 'certificate'
    }

    vmi: {
      name: 'Valstybinė mokesčių inspekcija'
      features: ['pvm_saskaitu_registras', 'imones_patikimumas']
    }
  }

  // Bankai
  banks: {
    providers: ['Swedbank', 'SEB', 'Luminor', 'Šiaulių bankas']

    features: {
      account_verification: boolean
      payment_initiation: boolean
      balance_check: boolean
      loan_calculator: boolean
    }

    protocol: 'PSD2 Open Banking'
  }

  // Tiekėjai ir Parduotuvės
  suppliers: {
    integration_type: 'API' | 'EDI' | 'Email'

    major_partners: [
      {
        name: 'Senukai'
        integration: 'API'
        features: ['catalog', 'pricing', 'availability', 'ordering']
      },
      {
        name: 'Ermitažas'
        integration: 'EDI'
        features: ['catalog', 'pricing']
      },
      {
        name: 'Limedika'
        integration: 'API'
        features: ['catalog', 'pricing', 'availability']
      }
    ]
  }

  // Draudimas
  insurance: {
    providers: ['Lietuvos draudimas', 'BTA', 'Gjensidige']

    features: {
      contractor_insurance_verification: boolean
      project_insurance_quotes: boolean
      claim_submission: boolean
    }
  }
}
```

---

## 10. Saugumo Reikalavimai {#saugumo-reikalavimai}

### 10.1 Autentifikacija ir Autorizacija

```typescript
interface SecurityRequirements {
  authentication: {
    methods: {
      password: {
        min_length: 8
        require_uppercase: true
        require_number: true
        require_special: true
        password_history: 5 // Neleidžia naudoti paskutinių 5
        expiry_days: 90 // Priminti keisti
      }

      two_factor: {
        methods: ['totp', 'sms', 'email']
        backup_codes: 10
        required_for: ['admin', 'contractor_admin']
      }

      oauth: {
        providers: ['google', 'facebook', 'apple']
        auto_link_accounts: boolean
      }

      biometric: {
        platforms: ['ios', 'android']
        types: ['fingerprint', 'face_id']
      }
    }

    session: {
      token_type: 'JWT'
      access_token_ttl: 900 // 15 min
      refresh_token_ttl: 2592000 // 30 days
      refresh_rotation: true
      concurrent_sessions: 5
      ip_validation: boolean
      device_fingerprinting: boolean
    }

    rate_limiting: {
      login_attempts: {
        max: 5
        window_minutes: 15
        lockout_minutes: 30
      }

      api_requests: {
        authenticated: 1000 // per hour
        unauthenticated: 100 // per hour
      }
    }
  }

  authorization: {
    model: 'RBAC' // Role-Based Access Control

    roles: {
      system_admin: 'all_permissions'
      project_owner: 'full_project_control'
      contractor_admin: 'company_management'
      contractor_worker: 'assigned_stages_only'
      vendor: 'marketplace_only'
      viewer: 'read_only'
    }

    fine_grained_permissions: {
      project: ['view', 'edit', 'delete', 'invite_members', 'manage_budget']
      stage: ['view', 'edit', 'complete', 'assign_contractor']
      document: ['view', 'upload', 'delete', 'share']
      marketplace: ['create_request', 'submit_offer', 'accept_offer']
    }

    data_isolation: {
      multi_tenancy: 'row_level_security'
      project_visibility: ['private', 'team', 'public']
      document_encryption: boolean
    }
  }
}
```

### 10.2 Duomenų Apsauga

```typescript
interface DataProtection {
  encryption: {
    at_rest: {
      database: 'AES-256'
      files: 'AES-256'
      backups: 'AES-256'
    }

    in_transit: {
      api: 'TLS 1.3'
      websocket: 'WSS'
      file_upload: 'HTTPS'
    }

    sensitive_fields: {
      personal_data: ['ssn', 'bank_account', 'phone']
      encryption_method: 'field_level_encryption'
      key_management: 'AWS KMS' | 'HashiCorp Vault'
    }
  }

  gdpr_compliance: {
    consent_management: {
      cookie_consent: boolean
      data_processing_consent: boolean
      marketing_consent: boolean
    }

    user_rights: {
      data_access: 'export_personal_data'
      data_portability: 'json_export'
      data_deletion: 'right_to_be_forgotten'
      data_correction: 'profile_editing'
    }

    data_retention: {
      active_projects: 'indefinite'
      completed_projects: '7_years'
      user_data_after_deletion: '30_days'
      logs: '90_days'
    }

    privacy_by_design: {
      data_minimization: true
      purpose_limitation: true
      pseudonymization: true
    }
  }

  audit_logging: {
    events_logged: [
      'login',
      'logout',
      'password_change',
      'permission_change',
      'data_access',
      'data_modification',
      'data_deletion',
      'document_view',
      'payment_transaction'
    ]

    log_retention: '1_year'
    log_storage: 'append_only'
    log_analysis: 'real_time_alerting'
  }
}
```

### 10.3 Infrastruktūros Sauga

```typescript
interface InfrastructureSecurity {
  network: {
    firewall: {
      waf: 'Cloudflare WAF'
      rules: ['ip_whitelist', 'geo_blocking', 'rate_limiting']
      ddos_protection: 'Cloudflare'
    }

    api_security: {
      authentication: 'Bearer token'
      cors: {
        allowed_origins: ['https://nt-knygele.lt']
        allowed_methods: ['GET', 'POST', 'PUT', 'DELETE']
      }

      headers: {
        'X-Frame-Options': 'DENY'
        'X-Content-Type-Options': 'nosniff'
        'X-XSS-Protection': '1; mode=block'
        'Strict-Transport-Security': 'max-age=31536000'
        'Content-Security-Policy': 'strict'
      }
    }
  }

  monitoring: {
    security_monitoring: {
      siem: 'Datadog' | 'Splunk'
      threat_detection: 'real_time'
      incident_response: 'automated_alerting'
    }

    vulnerability_scanning: {
      dependency_scanning: 'Snyk' | 'Dependabot'
      container_scanning: 'Trivy'
      code_scanning: 'SonarQube'
      frequency: 'continuous'
    }
  }

  backup_and_recovery: {
    backup: {
      frequency: 'daily'
      retention: '30_days'
      location: 'different_region'
      encryption: true
      testing: 'monthly'
    }

    disaster_recovery: {
      rpo: '1_hour' // Recovery Point Objective
      rto: '4_hours' // Recovery Time Objective
      failover: 'automated'
      dr_site: 'different_region'
    }
  }
}
```

---

## 11. Testavimo Strategija {#testavimo-strategija}

### 11.1 Testavimo Lygiai

```typescript
interface TestingStrategy {
  unit_testing: {
    framework: 'Vitest'
    coverage_target: 80

    test_areas: {
      utilities: '100% coverage'
      hooks: '90% coverage'
      api_handlers: '85% coverage'
      components: '70% coverage'
    }

    mocking: {
      database: 'Prisma mock'
      api_calls: 'MSW'
      external_services: 'Stubs'
    }
  }

  integration_testing: {
    framework: 'Vitest + Testing Library'

    test_scenarios: [
      'user_registration_flow',
      'project_creation_flow',
      'contractor_invitation_flow',
      'marketplace_request_flow',
      'payment_flow'
    ]

    api_testing: {
      tool: 'Supertest'
      coverage: 'all_endpoints'
      auth_testing: true
      error_handling: true
    }
  }

  e2e_testing: {
    framework: 'Playwright'

    critical_paths: [
      'complete_project_lifecycle',
      'contractor_onboarding',
      'marketplace_transaction',
      'document_management',
      'mobile_responsive'
    ]

    browsers: ['Chrome', 'Firefox', 'Safari', 'Mobile Chrome']

    visual_regression: {
      tool: 'Percy' | 'Chromatic'
      components: true
      pages: true
      responsive: true
    }
  }

  performance_testing: {
    tools: {
      load_testing: 'k6' | 'JMeter'
      frontend_performance: 'Lighthouse CI'
    }

    metrics: {
      response_time_p95: '<500ms'
      concurrent_users: 1000
      requests_per_second: 100
      error_rate: '<1%'
    }

    scenarios: ['normal_load', 'peak_load', 'stress_test', 'spike_test']
  }

  security_testing: {
    penetration_testing: {
      frequency: 'quarterly'
      scope: ['application', 'api', 'infrastructure']
      provider: 'external'
    }

    automated_scanning: {
      sast: 'SonarQube' // Static Application Security Testing
      dast: 'OWASP ZAP' // Dynamic Application Security Testing
      dependency_check: 'Snyk'
    }
  }
}
```

### 11.2 Testavimo Automatizacija

```typescript
interface TestAutomation {
  ci_cd_pipeline: {
    trigger: ['push', 'pull_request', 'schedule']

    stages: [
      {
        name: 'lint'
        tools: ['ESLint', 'Prettier', 'TypeScript']
        fail_fast: true
      },
      {
        name: 'unit_tests'
        parallel: true
        coverage_report: true
      },
      {
        name: 'integration_tests'
        database: 'test_container'
        seed_data: true
      },
      {
        name: 'build'
        environments: ['development', 'staging', 'production']
      },
      {
        name: 'e2e_tests'
        environment: 'staging'
        parallel_execution: 4
      },
      {
        name: 'performance_tests'
        condition: 'main_branch_only'
      },
      {
        name: 'deploy'
        approval_required: true
        rollback_enabled: true
      }
    ]
  }

  test_data: {
    generation: {
      tool: 'Faker.js'
      factories: ['user', 'project', 'contractor', 'document']
      seed_scripts: true
    }

    management: {
      test_database: 'separate'
      data_refresh: 'before_each_suite'
      cleanup: 'after_each_test'
    }
  }

  reporting: {
    test_results: {
      format: ['junit', 'html', 'json']
      storage: 'artifact_storage'
      trending: true
    }

    coverage: {
      format: ['lcov', 'html']
      threshold_enforcement: true
      pr_comments: true
    }

    dashboards: {
      tool: 'Allure' | 'ReportPortal'
      metrics: ['pass_rate', 'flaky_tests', 'execution_time']
      alerts: ['failure_threshold', 'performance_degradation']
    }
  }
}
```

---

## 12. Deployment ir DevOps {#deployment-devops}

### 12.1 Deployment Strategija

```typescript
interface DeploymentStrategy {
  environments: {
    development: {
      url: 'dev.nt-knygele.lt'
      hosting: 'Vercel Preview'
      database: 'Supabase Dev Project'
      auto_deploy: true
      branch: 'develop'
    }

    staging: {
      url: 'staging.nt-knygele.lt'
      hosting: 'Vercel'
      database: 'Supabase Staging'
      auto_deploy: true
      branch: 'staging'
      password_protected: true
    }

    production: {
      url: 'nt-knygele.lt'
      hosting: 'Vercel Pro'
      database: 'Supabase Pro'
      auto_deploy: false
      branch: 'main'
      approval_required: true
      rollback_enabled: true
    }
  }

  deployment_process: {
    blue_green: {
      enabled: true
      health_checks: true
      traffic_switching: 'gradual' // 10% -> 50% -> 100%
      rollback_threshold: '5% error rate'
    }

    database_migrations: {
      tool: 'Prisma Migrate'
      strategy: 'forward_only'
      backup_before_migration: true
      dry_run: true
    }

    feature_flags: {
      service: 'LaunchDarkly' | 'Unleash'
      use_cases: ['gradual_rollout', 'a_b_testing', 'emergency_kill_switch']
    }
  }

  cdn_and_assets: {
    provider: 'Cloudflare'

    optimization: {
      images: {
        format: 'webp'
        responsive: true
        lazy_loading: true
        cdn_transform: true
      }

      caching: {
        static_assets: '1 year'
        api_responses: 'no-cache'
        html: '10 minutes'
      }

      compression: 'brotli'
      minification: true
    }
  }
}
```

### 12.2 Monitoring ir Observability

```typescript
interface MonitoringStrategy {
  apm: {
    // Application Performance Monitoring
    provider: 'Datadog' | 'New Relic'

    metrics: {
      response_time: true
      throughput: true
      error_rate: true
      apdex_score: true
    }

    tracing: {
      distributed_tracing: true
      sample_rate: 0.1 // 10%
      trace_critical_paths: true
    }
  }

  logging: {
    aggregation: 'Datadog Logs' | 'ELK Stack'

    levels: {
      production: 'info'
      staging: 'debug'
      development: 'trace'
    }

    structured_logging: {
      format: 'json'
      correlation_id: true
      user_context: true
      request_context: true
    }

    sensitive_data: {
      masking: true
      fields: ['password', 'token', 'ssn', 'credit_card']
    }
  }

  alerts: {
    channels: ['email', 'slack', 'pagerduty']

    critical_alerts: [
      'service_down',
      'error_rate_>_5%',
      'response_time_>_2s',
      'database_connection_failed',
      'payment_service_error'
    ]

    warning_alerts: ['high_memory_usage', 'slow_queries', 'failed_background_jobs', '404_rate_increase']

    escalation: {
      levels: ['oncall_engineer', 'team_lead', 'cto']
      timeout_minutes: [5, 15, 30]
    }
  }

  dashboards: {
    business_metrics: ['active_users', 'new_projects', 'marketplace_transactions', 'revenue']

    technical_metrics: ['uptime', 'latency', 'error_rate', 'throughput']

    custom_dashboards: ['contractor_activity', 'project_completion_rate', 'user_engagement']
  }
}
```

### 12.3 DevOps Kultūra

```typescript
interface DevOpsCulture {
  version_control: {
    platform: 'GitHub'
    branching_strategy: 'Git Flow'

    branches: {
      main: 'production_ready'
      develop: 'integration_branch'
      feature: 'feature/*'
      bugfix: 'bugfix/*'
      hotfix: 'hotfix/*'
    }

    pull_requests: {
      required_reviews: 2
      automated_checks: ['tests', 'linting', 'build']
      merge_strategy: 'squash_and_merge'
    }

    commit_convention: 'Conventional Commits'
  }

  documentation: {
    code_documentation: {
      standard: 'JSDoc'
      coverage: '80%'
      examples: true
    }

    api_documentation: {
      tool: 'Swagger' | 'Postman'
      auto_generation: true
      versioning: true
    }

    runbooks: ['deployment_procedure', 'rollback_procedure', 'incident_response', 'database_backup_restore']

    architecture_decisions: 'ADR' // Architecture Decision Records
  }

  continuous_improvement: {
    post_mortems: {
      trigger: 'major_incident'
      blame_free: true
      action_items: true
      sharing: 'team_wide'
    }

    metrics: {
      deployment_frequency: 'daily'
      lead_time: '<1_day'
      mttr: '<1_hour' // Mean Time To Recovery
      change_failure_rate: '<5%'
    }

    innovation_time: '20%' // Laikas eksperimentams
  }
}
```

---

## 13. Papildomi Moduliai (Ateities Plėtra)

### 13.1 AI Asistentas

```typescript
interface AIAssistant {
  chatbot: {
    name: 'Statybų Asistentas'

    capabilities: [
      'answer_construction_questions',
      'suggest_next_steps',
      'identify_risks',
      'budget_optimization',
      'contractor_recommendations',
      'material_suggestions'
    ]

    integration: {
      llm: 'GPT-4' | 'Claude'
      context_window: 128000
      fine_tuning: 'construction_domain'

      knowledge_base: [
        'lithuanian_building_codes',
        'construction_best_practices',
        'material_specifications',
        'safety_regulations'
      ]
    }

    ui: {
      chat_widget: true
      voice_input: true
      suggested_actions: true
      inline_help: true
    }
  }

  automation: {
    document_processing: {
      invoice_extraction: true
      contract_analysis: true
      permit_validation: true
      compliance_check: true
    }

    predictive_analytics: {
      delay_prediction: true
      budget_overrun_prediction: true
      quality_issue_detection: true
      weather_impact_analysis: true
    }

    smart_scheduling: {
      optimal_sequence: true
      resource_allocation: true
      conflict_detection: true
      auto_rescheduling: true
    }
  }
}
```

### 13.2 IoT Integracija

```typescript
interface IoTIntegration {
  sensors: {
    types: ['temperature_humidity', 'motion_detection', 'power_consumption', 'water_leak', 'air_quality']

    protocols: ['MQTT', 'LoRaWAN', 'Zigbee']

    use_cases: {
      construction_monitoring: ['concrete_curing', 'moisture_levels', 'structural_movement']

      security: ['site_access', 'equipment_tracking', 'theft_prevention']

      safety: ['worker_presence', 'hazard_detection', 'equipment_status']
    }
  }

  dashboard: {
    real_time_monitoring: true
    alerts: true
    historical_data: true
    predictive_maintenance: true
  }
}
```

### 13.3 Blockchain Integracija

```typescript
interface BlockchainIntegration {
  use_cases: {
    smart_contracts: {
      payment_automation: true
      milestone_verification: true
      warranty_management: true
    }

    document_verification: {
      certificates: true
      permits: true
      ownership_transfer: true
    }

    supply_chain: {
      material_tracking: true
      authenticity_verification: true
      quality_assurance: true
    }
  }

  implementation: {
    network: 'Ethereum' | 'Polygon'
    wallet_integration: 'MetaMask'
    gas_optimization: true
  }
}
```

---

## 14. Verslo Modelis ir Monetizacija

### 14.1 Kainodara

```typescript
interface PricingModel {
  tiers: {
    free: {
      name: 'Pradedantiesiems'
      price: 0
      limits: {
        projects: 1
        team_members: 3
        storage_gb: 5
        calculators: 'basic_only'
      }
      features: ['Pagrindinis projekto valdymas', 'Baziniai skaičiuotuvai', 'El. pašto palaikymas']
    }

    homeowner: {
      name: 'Namų Savininkas'
      price_monthly: 9.99
      price_yearly: 99
      limits: {
        projects: 3
        team_members: 10
        storage_gb: 50
        calculators: 'all'
      }
      features: [
        'Visi Free funkcionalumai',
        'Neriboti skaičiuotuvai',
        'Prekyvietė',
        'Dokumentų OCR',
        'Prioritetinis palaikymas'
      ]
    }

    contractor: {
      name: 'Rangovas'
      price_monthly: 49.99
      price_yearly: 499
      limits: {
        projects: 'unlimited'
        team_members: 50
        storage_gb: 500
      }
      features: [
        'Visi Homeowner funkcionalumai',
        'Įmonės profilis',
        'Darbuotojų valdymas',
        'Ataskaitos ir analitika',
        'API prieiga',
        'White-label galimybė'
      ]
    }

    enterprise: {
      name: 'Įmonė'
      price: 'custom'
      features: [
        'Visi funkcionalumai',
        'Neriboti vartotojai',
        'Dedikuotas serveris',
        'Custom integrracijos',
        'SLA garantija',
        'Dedikuotas account manager'
      ]
    }
  }

  marketplace_fees: {
    transaction_fee: '2.5%'
    minimum_fee: 0.5
    premium_placement: 29.99 // per month
  }

  additional_services: {
    consulting: 150 // per hour
    custom_integration: 'quote'
    training: 500 // per session
    data_migration: 'quote'
  }
}
```

### 14.2 Go-to-Market Strategija

```typescript
interface GoToMarketStrategy {
  launch_phases: {
    phase1_beta: {
      duration: '3 months'
      users: 100
      focus: 'Product validation'
      channels: ['Piurko community', 'Direct outreach']
      pricing: 'Free'
    }

    phase2_soft_launch: {
      duration: '3 months'
      users: 1000
      focus: 'Feature refinement'
      channels: ['Social media', 'Construction forums']
      pricing: '50% discount'
    }

    phase3_public_launch: {
      focus: 'Scale'
      channels: ['Piurko promotion', 'Google Ads', 'Facebook Ads', 'SEO', 'Content marketing']
      pricing: 'Full price'
    }
  }

  marketing_channels: {
    influencer: {
      primary: 'Piurko'
      secondary: ['Other construction influencers']
      content: ['Tutorials', 'Case studies', 'Reviews']
    }

    content: {
      blog: 'weekly'
      video_tutorials: 'bi-weekly'
      case_studies: 'monthly'
      webinars: 'monthly'
    }

    partnerships: [
      'Construction material stores',
      'Contractor associations',
      'Architecture schools',
      'Real estate developers'
    ]
  }

  metrics: {
    acquisition: {
      cac: '<50 EUR' // Customer Acquisition Cost
      ltv: '>500 EUR' // Lifetime Value
      ltv_cac_ratio: '>3'
    }

    engagement: {
      dau_mau: '>40%' // Daily/Monthly Active Users
      retention_30d: '>60%'
      nps: '>50'
    }

    revenue: {
      mrr_growth: '>20%' // Monthly Recurring Revenue
      churn_rate: '<5%'
      arpu: '>30 EUR' // Average Revenue Per User
    }
  }
}
```

---

## 15. Rizikų Valdymas

### 15.1 Techninės Rizikos

```typescript
interface TechnicalRisks {
  risks: [
    {
      name: 'Scalability Issues';
      probability: 'Medium';
      impact: 'High';
      mitigation: [
        'Microservices architecture preparation',
        'Database sharding strategy',
        'CDN implementation',
        'Load testing from day 1'
      ];
    },
    {
      name: 'Data Loss';
      probability: 'Low';
      impact: 'Critical';
      mitigation: [
        'Automated daily backups',
        'Multi-region replication',
        'Point-in-time recovery',
        'Regular disaster recovery drills'
      ];
    },
    {
      name: 'Security Breach';
      probability: 'Medium';
      impact: 'Critical';
      mitigation: [
        'Regular security audits',
        'Penetration testing',
        'Bug bounty program',
        'Security training for team',
        'Incident response plan'
      ];
    },
    {
      name: 'Third-party Service Failure';
      probability: 'Medium';
      impact: 'High';
      mitigation: [
        'Fallback providers',
        'Service abstraction layers',
        'Local caching',
        'Graceful degradation'
      ];
    },
    {
      name: 'Technical Debt';
      probability: 'High';
      impact: 'Medium';
      mitigation: [
        'Code review process',
        'Regular refactoring sprints',
        'Automated testing',
        'Documentation standards'
      ];
    }
```
