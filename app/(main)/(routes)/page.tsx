
import { ModeToggle } from "@/components/providers/mode-toggel";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
 <div className="flex items-center h-screen justify-center space-x-3">
  <UserButton  afterSignOutUrl="/sign-up"></UserButton>
  <ModeToggle  />
 </div>
  );
}
