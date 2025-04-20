"use client"

import { motion } from "framer-motion"

interface AwardTrophyProps {
  title: string
  isGlowing: boolean
}

export default function AwardTrophy({ title, isGlowing }: AwardTrophyProps) {
  return (
    <motion.div
      className="relative"
      animate={{
        scale: isGlowing ? 1.05 : 1,
        y: isGlowing ? -2 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      {isGlowing && (
        <motion.div
          className="absolute inset-0 bg-cyan-400 rounded-md filter blur-md z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <div className="relative z-10 bg-black bg-opacity-80 p-2 rounded-md transform rotate-3 w-[4.5rem] h-[6.5rem] flex flex-col items-center justify-center text-center shadow-lg border border-gray-800">
        {/* Trophy icon that matches the original design */}
        <div className="mb-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 21H16M12 17V21M7 4H17M17 4V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V4M17 4H19C19.5523 4 20 4.44772 20 5V6C20 7.65685 18.6569 9 17 9M7 4H5C4.44772 4 4 4.44772 4 5V6C4 7.65685 5.34315 9 7 9"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-white text-[6px] font-bold tracking-wide">SPEEDTEST AWARDS</div>
        <div className="mt-1 text-white text-[5px] font-medium px-1 leading-tight">{title}</div>
        <div className="text-white text-[5px] mt-1 font-medium">2024</div>
      </div>
    </motion.div>
  )
}
