import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const baiJamjuree = Bai_Jamjuree({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "SIMP - Dashboard",
  description: "Smart Irrigation Management Platform",
};

const navPage = [
  {
    label: "Monitor",
    path: "/",
  },
  {
    label: "Control",
    path: "/control",
  },
  {
    label: "Services",
    path: "/services",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={baiJamjuree.variable}>
      <body className="pt-[72]">
        <div className="h-[72] px-[32] bg-(--mtr-blue) text-white w-screen flex items-center gap-[75] fixed top-0 z-100 shadow-md">
          <div>
            <label className="font-bold text-3xl tracking-[6]">SIMP</label>
          </div>
          <div className="flex items-center gap-[60]">
            {navPage.map((item, index) => {
              return (
                <Link key={index} href={item.path}>
                  <label className="hover:underline">{item.label}</label>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="min-h-[calc(100vh-144px)] flex justify-center">
          <div className="w-full max-w-[1440px]">
            {children}
          </div>
        </div>
        <div className="h-[72] px-[32] bg-(--mtr-blue) text-white w-screen flex items-center gap-[75] shadow-md">
          <label>Smart Irrigration Management Platform</label>
        </div>
      </body>
    </html>
  );
}
