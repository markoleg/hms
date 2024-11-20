"use client";

import { getStoryblokApi } from "@/app/lib/StoryBlok";

interface IStoryblokProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function StoryblokProvider({
  children,
}: IStoryblokProviderProps) {
  getStoryblokApi();
  return children;
}
