"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

interface PageTransitionProps {
  children: React.ReactNode
  isLoading?: boolean
}

export default function PageTransition({ children, isLoading = false }: PageTransitionProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setShowContent(true), 500)
            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setShowContent(true)
    }
  }, [isLoading])

  return (
    <AnimatePresence mode="wait">
      {isLoading && !showContent ? (
        <motion.div
          key="loading"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <Image
                src="/complete-logo.png"
                alt="Stamped in Style"
                width={120}
                height={120}
                className="object-contain mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="text-2xl font-light text-amber-900">{Math.round(loadingProgress)}%</div>
              <div className="w-48 h-1 bg-amber-200 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="min-h-screen"
          style={{ transformOrigin: "center center" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
