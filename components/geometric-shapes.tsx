"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function GeometricShapes() {
  const [shapes, setShapes] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      rotation: number
      opacity: number
      type: "triangle" | "shard" | "fragment"
    }>
  >([])

  useEffect(() => {
    // Generate shapes that match the original design
    const newShapes = [
      // Top left cluster
      { id: 1, x: 5, y: 10, size: 60, rotation: 45, opacity: 0.15, type: "triangle" as const },
      { id: 2, x: 15, y: 15, size: 40, rotation: 30, opacity: 0.12, type: "shard" as const },
      { id: 3, x: 10, y: 25, size: 50, rotation: 60, opacity: 0.1, type: "fragment" as const },

      // Top right (subtle)
      { id: 4, x: 85, y: 15, size: 40, rotation: 120, opacity: 0.08, type: "triangle" as const },
      { id: 5, x: 80, y: 20, size: 30, rotation: 150, opacity: 0.1, type: "shard" as const },

      // Bottom right
      { id: 6, x: 85, y: 85, size: 70, rotation: 210, opacity: 0.12, type: "fragment" as const },
      { id: 7, x: 75, y: 80, size: 50, rotation: 195, opacity: 0.1, type: "shard" as const },

      // Additional scattered shapes
      { id: 8, x: 30, y: 40, size: 25, rotation: 80, opacity: 0.07, type: "triangle" as const },
      { id: 9, x: 70, y: 30, size: 35, rotation: 100, opacity: 0.09, type: "fragment" as const },
      { id: 10, x: 20, y: 70, size: 45, rotation: 170, opacity: 0.08, type: "shard" as const },
      { id: 11, x: 60, y: 65, size: 30, rotation: 220, opacity: 0.07, type: "triangle" as const },
    ]

    setShapes(newShapes)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 3, shape.rotation],
            scale: [1, 1.02, 1],
            opacity: [shape.opacity, shape.opacity + 0.02, shape.opacity],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {shape.type === "triangle" && (
            <svg
              width={shape.size}
              height={shape.size}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 0L100 86.6H0L50 0Z" fill="#ffffff" />
            </svg>
          )}
          {shape.type === "shard" && (
            <svg
              width={shape.size}
              height={shape.size}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0L100 30L70 100L0 0Z" fill="#ffffff" />
            </svg>
          )}
          {shape.type === "fragment" && (
            <svg
              width={shape.size}
              height={shape.size}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 20L100 0L80 100L0 20Z" fill="#ffffff" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
