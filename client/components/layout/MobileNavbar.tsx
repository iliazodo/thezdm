"use client";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
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
  Ghost,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  Toolbox,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

const MobileNavbar = () => {
  const { isSignedIn } = useAuth();

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

            {/* Notifications & Profile & Login */}

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={`/profile`}>
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </SignInButton>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
