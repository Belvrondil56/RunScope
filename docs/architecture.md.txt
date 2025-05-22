# Architecture Technique - Projet RunScope

Dernière mise à jour  2025-05-22

---

## 🧱 Stack technique

- Next.js (v14) – Frontend + Backend (API routes REST)
- React – UI dynamique, formulaire, routing
- Prisma ORM – Accès à la base de données (SQLite pour le dev)
- SQLite – Base de données locale pour le développement
- TypeScript – Typage fort sur tout le projet
- Tailwind CSS – Style léger et réactif
- bcryptjs – Hashage des mots de passe côté serveur

---

## 👤 Modèle utilisateur (`User`)

Chaque utilisateur possède 
- un `id` unique
- un `email` (requis)
- un `age` (optionnel)
- un `password` (hashé, requis)
- une relation avec 0 ou plusieurs Programmes
- une table liée aux Records personnels

```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  age      Int
  password String

  programs Program[]
  records  Record[]
}

model Program {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  createdAt   DateTime  @default(now())
  userId      Int

  user        User      @relation(fields: [userId], references: [id])
  sessions    Session[]
  goal        Goal?
}

model Session {
  id          Int       @id @default(autoincrement())
  date        DateTime?
  type        String     // ex : "VMA", "Endurance", "Seuil"
  duration    Int?       // en minutes
  pace        String?    // ex : "5'30 / km"
  notes       String?

  programId   Int
  program     Program    @relation(fields: [programId], references: [id])
  feedback    Feedback?
}

model Goal {
  id          Int      @id @default(autoincrement())
  type        String   // ex : "10 km", "Semi", "Marathon"
  targetTime  String?  // ex : "50'00"
  date        DateTime

  program     Program  @relation(fields: [programId], references: [id])
  programId   Int
}

model Feedback {
  id         Int      @id @default(autoincrement())
  sessionId  Int      @unique
  feeling    Int      // échelle 1 à 10
  comment    String?

  session    Session  @relation(fields: [sessionId], references: [id])
}

model Record {
  id        Int      @id @default(autoincrement())
  userId    Int
  distance  String   // ex : "5 km", "10 km", "21.1 km"
  time      String   // ex : "00:23:45"
  date      DateTime

  user      User     @relation(fields: [userId], references: [id])
}

User --< Program --< Session --? Feedback
        |              |
        |              --> Goal (1:1)
        |
        --> Record (1:N)
