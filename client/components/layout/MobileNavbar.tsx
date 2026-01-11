"use client";
import { Button } from "../ui/button";
import ModeToggle from "../ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  BellIcon,
  HomeIcon,
  Info,
  LogOutIcon,
  MenuIcon,
  Notebook,
  Toolbox,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

const MobileNavbar = () => {

  return (
    <div className="flex md:hidden items-center space-x-2">
      {/* Dark mode Toggle */}
      <ModeToggle />

      {/* Sheet component from shadcn */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-75">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <Button className="w-11/12 mx-auto">Log in</Button>

          <nav className="flex flex-col space-y-4 mt-6">
            {/* Home */}

            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {/* Tools */}

            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/tools">
                <Toolbox className="w-4 h-4" />
                Tools
              </Link>
            </Button>

            {/* Blog */}

            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/tools">
                <Notebook className="w-4 h-4" />
                Blog
              </Link>
            </Button>

            {/* About */}

            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/tools">
                <Info className="w-4 h-4" />
                Abuot
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
