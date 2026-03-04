import { Question } from './types';

// ===== LESSON THEMES (Color Coding) =====
export const lessonThemes = [
  { lesson: 1, color: 'cyan' },
  { lesson: 2, color: 'amber' },
  { lesson: 3, color: 'orange' },
  { lesson: 4, color: 'red' },
  { lesson: 5, color: 'yellow' },
  { lesson: 6, color: 'teal' },
];

// ===== LESSON 1: ASCH'S CONFORMITY =====

// Do Now Quiz - 5 questions from PRIOR lessons (Biopsychology, Psychological Problems, Research Methods)
export const lesson1DoNow: Question[] = [
  {
    id: 1,
    question: "Biopsychology: What is the fluid-filled gap between two neurons called?",
    options: ["Axon", "Synapse", "Dendrite"],
    correct: 1
  },
  {
    id: 2,
    question: "Biopsychology: Which part of the brain is primarily responsible for balance and coordination?",
    options: ["Cerebellum", "Frontal Lobe", "Hypothalamus"],
    correct: 0
  },
  {
    id: 3,
    question: "Psych Problems: Low levels of Serotonin are most strongly associated with which disorder?",
    options: ["Schizophrenia", "Depression", "Phobias"],
    correct: 1
  },
  {
    id: 4,
    question: "Psych Problems: In the 'ABC' model of depression, what does 'B' stand for?",
    options: ["Behaviour", "Beliefs", "Biology"],
    correct: 1
  },
  {
    id: 5,
    question: "Research Methods: What is a hypothesis?",
    options: ["A proven fact", "A precise, testable prediction", "A summary of results"],
    correct: 1
  }
];

// Understanding Check - 5 questions testing ONLY Slides 2-3 content (Asch's Procedure & Social Factors)
export const lesson1UnderstandingCheck = [
  {
    id: 1,
    type: 'scenario' as const,
    question: "Asch varied the group size in his study and found that conformity increased from 1 to 3 confederates, then plateaued. What does this demonstrate?",
    options: [
      { text: 'Larger groups always increase conformity pressure', correct: false },
      { text: 'The quality of group support matters more than the size of the majority', correct: true },
      { text: 'Conformity is directly proportional to group size', correct: false }
    ],
    feedback: 'Correct. Asch found that conformity rose to ~31% with 3 confederates, then plateaued at ~35% with larger groups. This suggests that having even ONE person agree with you significantly reduces conformity pressure. The quality of the group dynamic is more important than sheer numbers.'
  },
  {
    id: 2,
    type: 'scenario' as const,
    question: "In Asch\'s variation where participants wrote their answers on paper (hidden) rather than speaking aloud, conformity dropped from 36.8% to 12.5%. Which type of social influence explains this reduction?",
    options: [
      { text: 'Informational Social Influence (ISI) – people sought information', correct: false },
      { text: 'Normative Social Influence (NSI) – fear of social disapproval was removed', correct: true },
      { text: 'Task difficulty increased their reliance on the group', correct: false }
    ],
    feedback: 'Correct. The dramatic drop in conformity when responses were anonymous demonstrates that NSI was the primary driver. Participants conformed largely to avoid being judged or rejected by the group, not because they believed the group was correct. When anonymity removed the social threat, conformity plummeted.'
  },
  {
    id: 3,
    type: 'scenario' as const,
    question: "Asch found that harder/more ambiguous line-matching tasks increased conformity rates. Why does task difficulty affect conformity?",
    options: [
      { text: 'Harder tasks make people naturally more anxious and nervous', correct: false },
      { text: 'Increased uncertainty activates ISI – people rely on the group for information when less confident', correct: true },
      { text: 'Harder tasks activate NSI because people fear looking incompetent', correct: false }
    ],
    feedback: 'Correct. Task difficulty increases Informational Social Influence (ISI). When unsure, people assume others have more information and are more likely to conform to reduce uncertainty. This is an example of genuine belief change, not just compliance. Domain expertise also matters – experts are less likely to defer to the group in their area of expertise.'
  },
  {
    id: 4,
    type: 'matching' as const,
    question: "Match each social factor to its effect on conformity in Asch\'s study:",
    items: [
      { 
        label: "Group Size (3+ confederates)", 
        options: ['Conformity increased dramatically', 'Conformity plateaued at ~35%', 'Conformity dropped to 12%'], 
        correct: 1 
      },
      { 
        label: "Anonymity (written responses)", 
        options: ['Conformity increased dramatically', 'Conformity plateaued at ~35%', 'Conformity dropped to 12%'], 
        correct: 2 
      },
      { 
        label: "Task Difficulty (ambiguous lines)", 
        options: ['Conformity increased dramatically', 'Conformity plateaued at ~35%', 'Conformity dropped to 12%'], 
        correct: 0 
      }
    ],
    feedback: 'Excellent matching. You\'ve demonstrated understanding of how social factors independently manipulate conformity. These variations allowed Asch to isolate which mechanisms drive conformity: NSI (anonymity effect), ISI (task difficulty), and group dynamics (size plateau).'
  },
  {
    id: 5,
    type: 'matching' as const,
    question: "Match each finding to the type of social influence it supports:",
    items: [
      { 
        label: "36.8% conformed despite obvious wrong answers", 
        options: ['ISI – desire for information', 'NSI – fear of rejection', 'Both equally'], 
        correct: 1 
      },
      { 
        label: "Harder tasks increased conformity rates", 
        options: ['ISI – desire for information', 'NSI – fear of rejection', 'Both equally'], 
        correct: 0 
      },
      { 
        label: "Anonymity reduced conformity from 36.8% to 12.5%", 
        options: ['ISI – desire for information', 'NSI – fear of rejection', 'Both equally'], 
        correct: 1 
      }
    ],
    feedback: 'Perfect understanding. Asch\'s conclusions: NSI was the PRIMARY driver (unambiguous task, dramatic drop with anonymity = fear of judgment). ISI played a secondary role (affected by task difficulty). This reveals why people conform: they want to be liked and fit in, even when they know the group is wrong.'
  }
];

// Evidence Grid - 4 studies supporting conformity research
export const lesson1Evidence = [
  {
    id: 1,
    author: 'Perrin & Spencer',
    year: 1980,
    title: 'Asch Conformity Replication',
    findings: 'Replicated Asch in the UK with 396 trials. Found only 1 conforming response. Suggests conformity rates are historically and culturally contingent (child of the 1950s Cold War era).'
  },
  {
    id: 2,
    author: 'Bond & Smith',
    year: 1996,
    title: 'Meta-Analysis of Conformity Studies',
    findings: 'Analyzed 133 studies across 17 countries. Conformity rates higher in collectivist cultures (China, Japan ~50%) than individualist (USA, UK ~30%). Culture shapes conformity behaviour.'
  },
  {
    id: 3,
    author: 'Fiske',
    year: 2014,
    title: 'Critique of Asch Paradigm',
    findings: 'Argued "groups were not groupy." Asch\'s artificial assembly of strangers lacks real group identity, cohesion, and meaningful consequences. Limits ecological validity of findings.'
  },
  {
    id: 4,
    author: 'Moscovici & Nemeth',
    year: 1974,
    title: 'Minority Influence Study',
    findings: 'Showed that minorities with consistency can influence majorities (opposite of conformity). Suggests group influence is bidirectional, not just majority → minority pressure.'
  }
];

// Critique Grid - Strengths, Limitations, Alternatives
export const lesson1Critique = {
  strengths: [
    'Controlled lab environment allowed measurement of conformity under identical conditions',
    'Large sample size (123 participants) provides robust statistical power',
    'Objective, unambiguous task (line matching) isolated conformity from task difficulty',
    'Multiple variations (group size, anonymity, task difficulty) revealed causal mechanisms'
  ],
  limitations: [
    'Temporal validity – Perrin & Spencer found minimal conformity in 1980s UK; may be "child of the times"',
    'Ecological validity – Trivial task with no real consequences; artificial stranger group',
    'Androcentric – All male participants; may not generalize to mixed-gender groups',
    'Ethnocentric – US study; Bond & Smith showed higher conformity in collectivist cultures'
  ],
  alternatives: [
    'Use real, meaningful groups (friendship circles, workplace teams) instead of strangers',
    'Test consequential decisions (jury decisions, medical diagnoses) instead of line matching',
    'Include diverse populations (women, non-Western cultures) to improve generalizability',
    'Use longitudinal designs to track conformity over time and across multiple situations'
  ]
};

// Essay Plan Structure
export const lesson1EssayPlan = {
  ao1: [
    'Aim: Investigate how people respond to group pressure in unambiguous situations',
    'Method: 123 American male undergraduates; lab experiment; 7-9 person groups',
    'Procedure: Match standard line (X) to three comparison lines (A, B, C); 18 trials (12 critical with confederate consensus on wrong answer)',
    'Results: 36.8% conformity on critical trials; 75% conformed at least once; 25% never conformed'
  ],
  ao3: [
    { label: 'Temporal Validity', evidence: 'Perrin & Spencer (1980) found only 1 conforming response in 396 UK trials; suggests effect is historically contingent' },
    { label: 'Ecological Validity', evidence: 'Task is trivial with no real consequences; artificial stranger group. Fiske (2014) noted "groups were not groupy"' },
    { label: 'Ethnocentrism', evidence: 'Bond & Smith (1996) meta-analysis found higher conformity in collectivist cultures (~50%) than individualist (~30%)' },
    { label: 'Strength', evidence: 'Controlled lab design allowed cause-and-effect conclusions; variations isolated NSI vs ISI mechanisms' }
  ]
};
