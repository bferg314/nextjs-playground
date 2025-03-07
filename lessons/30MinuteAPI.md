### **🚀 Half-Hour Next.js Lesson Plan: "Build a Mini Dashboard with API Calls"**  
An interactive introduction to **Next.js App Router**, covering:
✅ Server & Client Components  
✅ API fetching  
✅ `next/image` for optimized images  
✅ TypeScript best practices  

---

## **⏳ Lesson Breakdown (30 Minutes)**
1. **[0-5 min]** - Intro to App Router  
2. **[5-10 min]** - Create a new page (`dashboard/page.tsx`)  
3. **[10-20 min]** - Fetch and display API data in a **Server Component**  
4. **[20-30 min]** - Add interactivity using a **Client Component**  
5. **[Last 5 min]** - Wrap-up & fun challenge  

---

## **📌 Step 1: Overview of Next.js App Router (5 min)**
1. **Explain how App Router works:**
   - **`/app` directory** replaces `/pages`
   - **Folder-based routing** → A folder becomes a route
   - **`page.tsx` inside a folder** defines that route
   - **Server Components by default** (no `useEffect` inside them!)
2. **Key concepts:**
   - **Server Components**: Fetch data directly inside  
   - **Client Components**: Add interactivity  
   - **API fetching** can be done in Server or Client Components  
3. **Introduce `use client`** for Client Components  

---

## **📌 Step 2: Create a New Page (`dashboard/page.tsx`) (5 min)**
### **Instructions**
1. Have everyone **create their own folder** inside `playground`:
   ```
   /playground/[your-name]/dashboard/page.tsx
   ```
2. Inside `page.tsx`, create a **basic Server Component**:
   ```tsx
   export default function Dashboard() {
     return (
       <div>
         <h1 className="text-2xl font-bold">My Mini Dashboard</h1>
       </div>
     );
   }
   ```
3. **Visit:** `http://localhost:3000/playground/[your-name]/dashboard` to see the page.

---

## **📌 Step 3: Fetch API Data in a Server Component (10 min)**
### **🛠️ Goal:** Fetch a **random user** using Next.js's built-in server-side fetching.

#### **Updated Server Component (`dashboard/page.tsx`)**
```tsx
import Image from "next/image";

interface User {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
}

async function getUser(): Promise<User> {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  return data.results[0]; // ✅ Return only the user object
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Random User</h1>
      <div className="relative w-32 h-32 mt-2">
        <Image
          src={user.picture.large}
          alt="User"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <p className="mt-2">{user.name.first} {user.name.last}</p>
      <p>{user.email}</p>
    </div>
  );
}
```

### **💡 What We Fixed?**
✅ **Used `next/image`** for optimized images  
✅ **Awaited `getUser()` properly** (no "Property 'picture' does not exist" error)  
✅ **Added TypeScript types** for better safety  

---

## **📌 Step 4: Add Interactivity with a Client Component (10 min)**
### **🛠️ Goal:** Move fetching logic into a **Client Component** for dynamic updates.

### **New `UserCard.tsx` (Client Component)**
```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface User {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
}

export default function UserCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => setUser(data.results[0]));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded-md flex flex-col items-center">
      <h2 className="text-xl font-semibold">{user.name.first} {user.name.last}</h2>
      <div className="relative w-32 h-32 mt-2">
        <Image
          src={user.picture.large}
          alt="User"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <p className="mt-2">{user.email}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Get New User
      </button>
    </div>
  );
}
```

### **🚀 Update `dashboard/page.tsx` to use `UserCard`**
```tsx
import UserCard from "./UserCard";

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Mini Dashboard</h1>
      <UserCard />
    </div>
  );
}
```

---

## **📌 Wrap-Up (Last 5 min)**
### **🛠️ Ask:**
❓ **What was the most interesting part?**  
❓ **What was confusing?**  

### **🎯 Fun Challenge:**
1. **Replace the API** with [PokeAPI](https://pokeapi.co/) or [The Rick and Morty API](https://rickandmortyapi.com/).
2. **Style your dashboard uniquely** using Tailwind.
3. **Add a search bar** to fetch users dynamically.

---

## **🎯 Final Takeaways**
✅ **App Router replaces `/pages` with folders**  
✅ **Server Components** fetch data directly (no `useEffect`)  
✅ **Client Components** allow interactivity (use `use client`)  
✅ **Using `next/image` improves performance**  
✅ **TypeScript prevents runtime errors**  

---

## **🚀 What's Next?**
Want to go deeper? Try:  
- **Fetching API data with `getServerSideProps` in App Router**
- **Using `useState` to store multiple users**
- **Adding Tailwind animations for a smooth UI**

---

### **📝 TL;DR (Summary of Code)**
1. **Create `dashboard/page.tsx` (Server Component)**
2. **Fetch API data and display a user**
3. **Create `UserCard.tsx` (Client Component)**
4. **Move fetching logic to `useEffect`**
5. **Use `next/image` for optimized images**
6. **Make it interactive with a refresh button**

---

### **💬 Would this lesson keep your team engaged? Any tweaks needed? 🚀**