import { currentUser } from "@clerk/nextjs/server";
import ModeToggle from "../ModeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { BellIcon, HomeIcon, Toolbox, UserIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

const DesktopNavbar = async () => {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      {/* Home */}

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {/* Tools */}

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <Toolbox className="w-4 h-4" />
          <span className="hidden lg:inline">tools</span>
        </Link>
      </Button>

      {/* Navigations & Profile & logaout */}

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline ">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
        </>
      ) : (
        <>
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </>
      )}
    </div>
  );
};

export default DesktopNavbar;
