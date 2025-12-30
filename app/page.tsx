import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Hello World!</h1>
      <br />
      <Button>Click me</Button>
      <ModeToggle></ModeToggle>
    </div>
  );
}
