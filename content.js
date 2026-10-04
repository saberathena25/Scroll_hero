

export const content = {

  name: "Omkar",

headline: "WELCOME ITZFIZZ",

  hint: "psst… scroll slowly, he likes it gentle ↓",

  honks: ["beep beep!", "hey, watch it!", "on my way…", "vroom (quietly)"],

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
