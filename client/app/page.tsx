"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:p-10 p-5">
      {/* Title */}
      <div className="text-4xl md:text-8xl mt-15 md:mt-20 flex flex-row justify-center items-center">
        <h1 className="flex flex-col md:flex-row justify-center items-center">
          {/* desktop & tablet */}
          <span className="hidden md:flex text-9xl">
            <span className="pt-3">ZDM</span>|
          </span>
          <div className="flex flex-col pt-5">
            <span className="hidden md:flex text-6xl">Data</span>
            <span className="hidden md:flex text-6xl">Playground</span>
          </div>
          {/* mobile */}
          <span className="md:hidden text-2xl">Data Playground</span>
          <span className="md:hidden text-8xl">ZDM</span>
        </h1>
      </div>

      {/* Description */}
      <div className="md:w-2/3 justify-center items-center mx-auto pl-5 md:mt-40 mt-20 ">
        <h4 className="md:text-3xl/12 text-xl text-foreground/90">
          Explore, experiment, and play with data. Free Python-powered tools for
          charts, math, finance, AI, and more—designed for learning, testing, or
          just having fun.
        </h4>
      </div>

      {/* Explore Button */}
      <Button variant="default" className="bg-foreground/80 md:mt-16 mt-8 md:w-1/12 h-10 mx-auto" asChild>
        <Link href="/explore">Explore</Link>
      </Button>
    </div>
  );
}
