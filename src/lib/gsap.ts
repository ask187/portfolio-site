"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Register ScrollTrigger exactly once. Safe to call from many components or
 * across React Strict Mode double-mounts.
 */
export function registerGsap(): typeof gsap {
  if (typeof window === "undefined") return gsap;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };
