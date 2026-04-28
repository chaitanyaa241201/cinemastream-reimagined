import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell, Menu, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/tv", label: "TV" },
  { to: "/movies", label: "Movies" },
  { to: "/sports", label: "Sports" },
  { to: "/disney", label: "Disney+" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/60" : "bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 md:px-8">
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Hotstream home">
          <span className="bg-gradient-primary bg-clip-text text-2xl font-black tracking-tight text-transparent">
            hotstream
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-muted-foreground hover:text-foreground transition-colors",
                  isActive && "text-foreground"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className={cn("flex items-center transition-all duration-300", searchOpen ? "w-52 md:w-72" : "w-9")}>
            {searchOpen ? (
              <Input
                autoFocus
                placeholder="Search movies, shows, sports…"
                onBlur={() => setSearchOpen(false)}
                className="h-9 bg-secondary/80 border-border text-sm"
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          <button className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full ring-1 ring-border hover:ring-primary transition" aria-label="Profile">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-semibold">
                    A
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              <DropdownMenuLabel>Amit Sharma</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Watchlist</DropdownMenuItem>
              <DropdownMenuItem>Continue Watching</DropdownMenuItem>
              <DropdownMenuItem>Subscriptions</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur px-4 py-3 flex flex-col gap-3 text-sm font-medium animate-fade-in">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn("text-muted-foreground", isActive && "text-foreground")
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
