import React, { useEffect, useRef } from 'react';

interface ConfettiAnimationProps {
  active: boolean;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: any[] = [];
  const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];

  useEffect(() => {
    if (!active) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        radius: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: Math.random() * 5 + 1,
        },
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.velocity.x;
        p.y += p.velocity.y;

        if (p.y > canvas.height) {
          p.y = -p.radius;
          p.x = Math.random() * canvas.width;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default ConfettiAnimation;
