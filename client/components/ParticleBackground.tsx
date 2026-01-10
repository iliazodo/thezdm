"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: Particle[] = [];

    // Particle settings per screen size
    const particleSettings = {
      mobile: { count: 600, size: 1 },
      tablet: { count: 800, size: 1.2 },
      desktop: { count: 1000, size: 1.5 },
    };

    const connectDistance = 40;
    const influenceRadius = 100;
    const influenceForce = 1;
    const friction = 1; // linear movement
    const maxSpeed = 0.07; // slower speed

    const mouse = { x: 0, y: 0, active: false };

    // Mouse events
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => (mouse.active = false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // Determine particle count/size by width
    const getParticleConfig = () => {
      const w = window.innerWidth;
      if (w < 640) return particleSettings.mobile;
      if (w < 1024) return particleSettings.tablet;
      return particleSettings.desktop;
    };

    // Initialize particles
    const initParticles = () => {
      const { count, size } = getParticleConfig();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * maxSpeed,
          vy: (Math.random() - 0.5) * maxSpeed,
          size: Math.random() * size + 1,
        });
      }
    };

    // Resize canvas
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
      initParticles();
    };

    window.addEventListener("resize", resize);
    resize();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = theme === "light" ? "#000" : "#fff";

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            ctx.strokeStyle = color;
            ctx.globalAlpha = 1 - dist / connectDistance;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius && dist > 0.1) {
            const strength =
              (1 - dist / influenceRadius) * influenceForce;
            p.vx += (dx / dist) * strength;
            p.vy += (dy / dist) * strength;
          }
        }

        // Friction (linear movement)
        p.vx *= friction;
        p.vy *= friction;

        // Limit speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
