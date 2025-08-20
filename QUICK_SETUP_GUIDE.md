# 🚀 GREITAS PALEIDIMAS - DomusVertical

## 1️⃣ Sukurk Duomenų Bazę (2 minutės)

### Eik į Supabase SQL Editor:
👉 https://supabase.com/dashboard/project/umgxfznmssatfaivrmdv/sql/new

### Įkopijuok ir paleisk šį SQL:
1. Atsidaryk failą **`SUPABASE_SQL_SETUP.sql`** šiame projekte
2. Nukopijuok VISĄ turinį
3. Įklijuok į Supabase SQL Editor
4. Spausk **"Run"** mygtuką (žalias)

✅ Tai sukurs:
- 6 lenteles (projects, clients, tasks, documents, financial_records, project_stages)
- Visus indeksus
- RLS politikas (development mode - atviros)
- Pavyzdinius duomenis

## 2️⃣ Patikrink ar Veikia

Sistema jau paleista adresu: http://localhost:3000

### Aplankyk šiuos puslapius:

#### 📊 **Dashboard** 
http://localhost:3000/en/dashboards/domus
- Pamatysi real-time metrikas
- 1 aktyvus projektas
- €35,000 balansas (€50k income - €15k expenses)

#### 🏗️ **Projektai**
http://localhost:3000/en/projects
- "Sample Villa Project" su €250,000 biudžetu
- Spustelėk ant projekto - pamatysi 4 stages

#### 👥 **Klientai**
http://localhost:3000/en/clients
- "Sample Client" su kontaktais
- Gali pridėti naujus klientus

#### ✅ **Užduotys**
http://localhost:3000/en/tasks
- 2 pavyzdinės užduotys Kanban lentoje
- Galima tempti tarp kolonų

#### 💰 **Finansai**
http://localhost:3000/en/financials
- €50,000 pajamos, €15,000 išlaidos
- Projekto biudžeto stebėjimas

## 3️⃣ Pradėk Naudoti!

### Sukurk pirmą realų projektą:
1. Eik į Projects → Create Project
2. Įvesk pavadinimą ir biudžetą
3. Pridėk stages projekto puslapyje
4. Sukurk tasks ir priskirkprojektui

### Sistema veikia su tikrais duomenimis!
- Visi pakeitimai išsaugomi Supabase
- Real-time sinchronizacija
- Galima naudoti produkcijai

## ❓ Problemos?

### Jei matai "relation does not exist":
- SQL dar neįvykdytas
- Eik į SQL Editor ir paleisk SUPABASE_SQL_SETUP.sql

### Jei nepavyksta sukurti įrašų:
- Patikrink ar lentelės sukurtos: 
  ```sql
  SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
  ```

### Serveris neveikia?
```bash
npm run dev
```

## ✨ Viskas Paruošta!

Sistema pilnai funkcionali ir paruošta naudojimui. Galite:
- Valdyti NT projektus
- Sekti biudžetus
- Organizuoti užduotis
- Saugoti dokumentus
- Stebėti finansus

**Sėkmės su DomusVertical!** 🏗️