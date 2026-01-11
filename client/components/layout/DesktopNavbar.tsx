import { currentUser } from "@clerk/nextjs/server";
import ModeToggle from "../ModeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { HomeIcon, Info, Notebook, Toolbox, UserIcon } from "lucide-react";

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
          <span className="hidden lg:inline">Tools</span>
        </Link>
      </Button>

      {/* Tools */}

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <Notebook className="w-4 h-4" />
          <span className="hidden lg:inline">Blog</span>
        </Link>
      </Button>

      {/* About */}

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <Info className="w-4 h-4" />
          <span className="hidden lg:inline">About</span>
        </Link>
      </Button>
      
    </div>
  );
};

export default DesktopNavbar;
