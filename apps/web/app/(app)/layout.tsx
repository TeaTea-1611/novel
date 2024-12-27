"use client";

import { MainHeader } from "@/components/main-header";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/extension/carousel";
import MainFooter from "@/components/main-footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <div className="max-w-screen-xl mx-auto md:-mt-2 md:p-2">
        <Carousel>
          <CarouselNext />
          <CarouselPrevious />
          <div className="relative ">
            <CarouselMainContainer className="h-60">
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderMainItem key={index} className="bg-transparent">
                  <div className="flex items-center justify-center outline outline-1 outline-border size-full rounded-xl bg-background">
                    Slide {index + 1}
                  </div>
                </SliderMainItem>
              ))}
            </CarouselMainContainer>
            <div className="absolute -translate-x-1/2 bottom-2 left-1/2">
              <CarouselThumbsContainer className="gap-x-1 ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselIndicator key={index} index={index} />
                ))}
              </CarouselThumbsContainer>
            </div>
          </div>
        </Carousel>
      </div>
      <main className="flex flex-col flex-1 max-w-screen-xl gap-4 mx-auto md:p-2 min-h-svh">
        {children}
      </main>
      <div className="fixed inset-0 pointer-events-none -z-50">
        <div className="absolute size-full bg-gradient-to-b from-gradient-from to-gradient-to"></div>
        <div className="absolute w-full h-full bg-[url('/mask-image.svg')] bg-repeat"></div>
      </div>
      <MainFooter />
    </>
  );
}
