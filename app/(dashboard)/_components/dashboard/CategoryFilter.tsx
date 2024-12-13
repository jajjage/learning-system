"use client"

import { Button } from "@/components/ui/button"
import { Category } from "@prisma/client"
import {
  Code,
  Laptop,
  Brain,
  Database,
  Paintbrush,
  Wrench,
  TrendingUp,
  Atom,
} from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  "Web Development": <Laptop className="mr-2 h-4 w-4" />,
  Programming: <Code className="mr-2 h-4 w-4" />,
  "Computer Science": <Brain className="mr-2 h-4 w-4" />,
  "Data Science": <Database className="mr-2 h-4 w-4" />,
  Design: <Paintbrush className="mr-2 h-4 w-4" />,
  Engineering: <Wrench className="mr-2 h-4 w-4" />,
  Marketing: <TrendingUp className="mr-2 h-4 w-4" />,
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="w-full bg-background px-4 sm:px-6">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-primary">
          Course Categories
        </h3>
      </div>
      <div className="relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <Swiper
          modules={[FreeMode]}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode={{
            enabled: true,
            momentum: true,
            minimumVelocity: 0.02,
          }}
          breakpoints={{
            320: { slidesPerView: "auto", spaceBetween: 4 },
            640: { slidesPerView: "auto", spaceBetween: 6 },
            1024: { slidesPerView: "auto", spaceBetween: 8 },
          }}
          className="!px-2"
        >
          {/* "All" Category Button */}
          <SwiperSlide className="!max-w-fit">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => onSelectCategory(null)} // Set categoryId to null for "All"
              className="flex-shrink-0"
              aria-selected={selectedCategory === null}
            >
              <Atom className="mr-2 h-4 w-4" />
              All
            </Button>
          </SwiperSlide>

          {/* Map through categories */}
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="!max-w-fit">
              <Button
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => onSelectCategory(category.id)}
                className="flex-shrink-0 whitespace-nowrap"
                aria-selected={selectedCategory === category.id}
              >
                {categoryIcons[category.name] || (
                  <Atom className="mr-2 h-4 w-4" />
                )}
                {category.name}
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
