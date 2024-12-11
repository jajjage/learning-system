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
import { FreeMode, Autoplay } from "swiper/modules"
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
      <div className="relative">
        {/* Gradient overlays for visual feedback */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />

        <Swiper
          modules={[FreeMode]}
          spaceBetween={4}
          slidesPerView="auto"
          loop={true}
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
          <SwiperSlide className="max-w-fit">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => onSelectCategory(null)}
              className="flex-shrink-0"
            >
              <Atom className="mr-2 h-4 w-4" />
              All
            </Button>
          </SwiperSlide>
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="max-w-fit">
              <Button
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => onSelectCategory(category.id)}
                className="flex-shrink-0 whitespace-nowrap"
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
