// All the words on the page live here, so you can make it yours without touching any component.

export const content = {
  // Your name, used in the sign-off at the bottom of the page.
  name: "Omkar",

  // Spaces between words become wider gaps; every letter is spaced out and animated individually.
  headline: "WELCOME ITZFIZZ",

  // Small handwritten line under the headline.
  tagline: "A tiny road trip, powered by your scroll wheel
    ",

  // Handwritten hint that rides along with the car until you start scrolling.
  hint: "psst… scroll slowly, he likes it gentle ↓",

  // What the car says when you click it (cycles through in order).
  honks: ["beep beep!", "hey, watch it!", "on my way…", "vroom (quietly)"],

  // `top` is the vertical position inside the hero. The car lights each stat up as it drives past.
  stats: [
    { value: 58, suffix: "%", label: "more people choosing pick-up points", side: "left", top: "52%" },
    { value: 23, suffix: "%", label: "fewer “where is my order?” calls", side: "right", top: "62%" },
    { value: 27, suffix: "%", label: "quicker handovers at the door", side: "left", top: "74%" },
    { value: 40, suffix: "%", label: "less time spent waiting around", side: "right", top: "85%" },
  ],

  note: {
    kicker: "a note from the driver’s seat",
    title: "I built this one slowly, on purpose.",
    paragraphs: [
      "This started as an assignment: make a hero section that reacts to scroll. I wanted it to feel like something a person made, not something a template produced.",
      "So the little car is hand-drawn in SVG, the road remembers where he’s been, and if you click him he honks. Those are the details nobody asked for, and they’re the ones I enjoyed most.",
      "Everything moves with transforms only, tied to scroll progress and smoothed with a touch of easing. Smooth is a kind of politeness.",
    ],
    signoff: "thanks for stopping by",
  },
};
