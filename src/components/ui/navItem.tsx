import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenSquare, User, FileText, UserPlus, LogIn, LucideIcon } from "lucide-react";

type NavItemType ={
  link: string;
  label: string;
  icon?: LucideIcon;
}

export const NavItems = () => {
  const pathname = usePathname();

  const item: NavItemType[] = [
    { link: "/create-post", label: 'Create a blog post', icon: PenSquare },
    { link: "/user-profile", label: 'Update profile', icon: User },
    { link: "/", label: 'View posts', icon: FileText },
    { link: "/register", label: 'Register', icon: UserPlus },
    { link: "/login", label: 'Login', icon: LogIn }
  ];

  const activeStyle = "bg-slate-800 shadow-md border border-slate-900 hover:border ";
  const inactiveStyle = "hover:bg-slate-600 cursor-pointer transition duration-400";

  return (
    <div className="p-4">
      <ul className='flex justify-center space-x-1.5 gap-6 p-2 bg-slate-700 rounded-3xl'>
          {item && item.map((navItem: NavItemType) => {
            const isActive = pathname === navItem.link;
            const Icon = navItem.icon;
            return (
                <li key={navItem.link} className={cn(
                  "px-7 py-3.5 p-2 rounded-2xl transition-colors duration-200 overflow-hidden",
                isActive 
                  ? activeStyle
                  : inactiveStyle)}
                  >
                <Link href={navItem.link}>
                
                <div className="flex items-center justify-center align-middle gap-2 px-3">
                {Icon && (
                  <Icon className="w-5 h-5 mr-2" />
                )}
                <h4>{navItem.label}</h4>
                {isActive && (
                  <div className="flex justify-center items-center gap-3 pl-4">
                  <div className="block border-1 w-2 h-2 mt-1 rounded-3xl bg-green-300 shadow-green-200" />
                  </div>
                )}
                </div>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}