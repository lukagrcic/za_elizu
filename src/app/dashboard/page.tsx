// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/Sidebar";

// type Role = "ADMIN" | "IMPORTER" | "SUPPLIER";
// type User = { email: string; role: Role };

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const raw = localStorage.getItem("user");
//     if (!raw) {
//       router.replace("/login");
//       return;
//     }
//     try {
//       const parsed = JSON.parse(raw) as User;
//       setUser(parsed);
//     } catch {
//       localStorage.removeItem("user");
//       router.replace("/login");
//     }
//   }, [router]);

//   function logout() {
//     localStorage.removeItem("user");
//     router.push("/login");
//   }

//   if (!user) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-gray-700">Loading...</div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100">
//       <div className="md:flex">
//         <Sidebar role={user.role} />

//         <section className="flex-1 p-6">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
//               <p className="mt-1 text-sm text-gray-600">
//                 Ulogovan si kao <span className="font-medium">{user.email}</span>
//               </p>
//             </div>

//             <button
//               onClick={logout}
//               className="rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800"
//             >
//               Logout
//             </button>
//           </div>

//           <div className="mt-6 grid gap-4 md:grid-cols-3">
//             {user.role === "ADMIN" && (
//               <>
//                 <Card title="Users" desc="Upravljanje korisnicima" href="/admin/users" />
//                 <Card title="Categories" desc="CRUD kategorija" href="/admin/categories" />
//                 <Card title="Suppliers" desc="Pregled dobavljača" href="/admin/suppliers" />
//               </>
//             )}

//             {user.role === "IMPORTER" && (
//               <>
//                 <Card title="Offers" desc="Pregled ponuda" href="/importer/offers" />
//                 <Card title="Compare" desc="Uporedi ponude" href="/importer/compare" />
//                 <Card title="Containers" desc="Moji kontejneri" href="/importer/containers" />
//               </>
//             )}

//             {user.role === "SUPPLIER" && (
//               <>
//                 <Card title="My Offers" desc="Lista tvojih ponuda" href="/supplier/offers" />
//                 <Card title="New Offer" desc="Kreiraj novu ponudu" href="/supplier/offers/new" />
//                 <Card title="Products" desc="Tvoj katalog" href="/supplier/products" />
//               </>
//             )}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
//   return (
//     <a
//       href={href}
//       className="block rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
//     >
//       <div className="text-lg font-semibold text-gray-900">{title}</div>
//       <div className="mt-1 text-sm text-gray-600">{desc}</div>
//       <div className="mt-4 text-sm font-medium text-black underline">Open</div>
//     </a>
//   );
// }


/////////////////////////////////////////////////////////////




"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import NewOfferModal from "@/components/NewOfferModal";
import CreateCollaborationModal from "@/components/CreateCollaborationModal";
import DashboardCard from "@/components/DashboardCard";
import DashboardActionCard from "@/components/DashboardActionCard";

type Role = "ADMIN" | "IMPORTER" | "SUPPLIER";

type User = {
  email: string;
  role: Role;
  companyName?: string | null;
  country?: string | null;
  address?: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [openNewOffer, setOpenNewOffer] = useState(false);
  const [openCollab, setOpenCollab] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.user) {
          router.replace("/login");
          return;
        }

        if (!cancelled) {
          setUser({
            email: data.user.email,
            role: data.user.role,
            companyName: data.user.companyName,
            country: data.user.country,
            address: data.user.address,
          });
        }
      } catch {
        router.replace("/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/login");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-700">Loading...</div>
      </main>
    );
  }

  if (!user) return null;

  const displayName = user.companyName?.trim() ? user.companyName : user.email;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="md:flex">

        <section className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

              <p className="mt-1 text-sm text-gray-600">
                You are logged in as{" "}
                <span className="font-medium">{displayName}</span>
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Role: <span className="font-medium">{user.role}</span>
              </p>

              {user.companyName && (
                <p className="mt-1 text-sm text-gray-600">
                  Location:{" "}
                  <span className="font-medium">
                    {user.country ?? "—"}
                    {user.address ? `, ${user.address}` : ""}
                  </span>
                </p>
              )}
            </div>

            <button
              onClick={logout}
              className="rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Logout
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {user.role === "ADMIN" && (
              <>
                <DashboardCard
                  title="Users"
                  desc="User management"
                  href="/admin/users"
                />

                <DashboardActionCard
                  title="Create a collaboration"
                  desc="Create a collaboration importer–supplier"
                  onClick={() => setOpenCollab(true)}
                />

                <DashboardCard
                  title="All Collaborations"
                  desc="View all collaborations"
                  href="/admin/collaborations"
                />
              </>
            )}

            {user.role === "IMPORTER" && (
              <>
                <DashboardCard
                  title="Offers"
                  desc="Overview of offers"
                  href="/importer/offers"
                />
              </>
            )}

            {user.role === "SUPPLIER" && (
              <>
                <DashboardCard
                  title="My Offers"
                  desc="List of your offers"
                  href="/supplier/offers"
                />

                <DashboardActionCard
                  title="New Offer"
                  desc="Create a new offer"
                  onClick={() => setOpenNewOffer(true)}
                />
              </>
            )}
          </div>

          <NewOfferModal
            open={openNewOffer}
            onClose={() => setOpenNewOffer(false)}
            onCreated={() => {
              router.push("/supplier/offers");
            }}
          />

          <CreateCollaborationModal
            open={openCollab && user.role === "ADMIN"}
            onClose={() => setOpenCollab(false)}
          />
        </section>
      </div>
    </main>
  );
}

// function Card({
//   title,
//   desc,
//   href,
// }: {
//   title: string;
//   desc: string;
//   href: string;
// }) {
//   return (
//     <a
//       href={href}
//       className="group block rounded-2xl bg-white p-5 shadow-sm transition
//                 hover:-translate-y-0.5 hover:shadow-md"
//     >
//       <div className="text-lg font-semibold text-gray-900">{title}</div>
//       <div className="mt-1 text-sm text-gray-600">{desc}</div>
//     </a>
//   );
// }

// function ActionCard({
//   title,
//   desc,
//   onClick,
// }: {
//   title: string;
//   desc: string;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="text-left block w-full rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
//     >
//       <div className="text-lg font-semibold text-gray-900">{title}</div>
//       <div className="mt-1 text-sm text-gray-600">{desc}</div>
//     </button>
//   );
// }

