export const eventsData = [
  // ── TECHNICAL EVENTS ──
  {
    id: 'project-expo',
    title: 'Project Expo',
    type: 'TECHNICAL',
    badge: 'FLAGSHIP EVENT',
    tagline: 'Unveil cutting-edge hardware prototypes and software innovations.',
    shortDesc: 'A national-level innovation showcase where visionary students present functional prototypes across AI/ML, IoT, Web3, Robotics, and Embedded Systems before industry experts.',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    accentColor: '#06b6d4',
    teamSize: '1 – 4 Members',
    date: '08 OCT 2026 (Day 1)',
    time: '10:00 AM – 01:30 PM',
    venue: 'IT Innovation Center & Project Labs',
    hasCashPrize: true,
    prizePool: '₹10,000 Cash Prize + Merit Trophy + Certificate',
    firstPrize: '₹5,000',
    secondPrize: '₹3,000',
    thirdPrize: '₹2,000',
    overview: 'Project Expo at ZenoFest 2K26 is the epicenter of technological breakthrough. This exhibition provides a premier stage for aspiring engineers and innovators to demonstrate practical working models, software applications, embedded systems, and disruptive ideas that solve pressing real-world challenges.',
    rounds: [
      {
        roundNumber: '01',
        title: 'Prototype Verification & Stall Setup',
        time: '10:00 AM – 10:45 AM',
        desc: 'Teams set up their physical booths, boot up software instances, verify hardware connections, and submit their one-page technical abstract to the judging desk.'
      },
      {
        roundNumber: '02',
        title: 'Jury Evaluation & Live Demonstration',
        time: '10:45 AM – 12:45 PM',
        desc: 'Each team presents an 8-minute deep-dive pitch followed by 4 minutes of intense Q&A with the industry panel. Demonstrating the working live prototype is mandatory.'
      },
      {
        roundNumber: '03',
        title: 'Grand Finale Showcase & Winner Reveal',
        time: '01:00 PM – 01:30 PM',
        desc: 'Top 5 shortlisted finalists present a 3-minute lightning elevator pitch before the grand audience in the auditorium.'
      }
    ],
    rules: [
      'Every team can consist of minimum 1 to maximum 4 participants.',
      'Working live prototype / simulation demo is strictly mandatory during evaluation.',
      'Teams must bring their own laptops, microcontrollers, sensors, cables, and development boards. Standard 230V power sockets and high-speed Wi-Fi will be provided.',
      'Projects must be original creations by student team members. Plagiarism or commercial turn-key solutions will lead to immediate disqualification.',
      'Submissions can span domains including AI/ML, IoT, Embedded Systems, Cloud/Web3, AR/VR, Assistive Tech, and Green Energy.',
      'Judges will evaluate on 4 key pillars: Innovation & Novelty (25%), Technical Complexity (25%), Real-world Feasibility (25%), and Demonstration Clarity (25%).',
      'The decision of the jury committee is final and binding on all participating teams.'
    ],
    requirements: [
      'College ID card of all team members',
      'Working prototype / hardware kit / laptop with local codebase',
      'Extension cord / converter (optional but advised)',
      '1-Page printed project summary sheet'
    ],
    coordinators: [
      { name: 'Arun Kumar M', role: 'Student Coordinator', phone: '+91 98765 43210', email: 'arunkumar.it@zenofest.in' },
      { name: 'Priya Sundar', role: 'Student Coordinator', phone: '+91 87654 32109', email: 'priya.s@zenofest.in' },
      { name: 'Dr. K. Ramesh', role: 'Faculty Advisor (Dept of IT)', phone: '+91 94432 56789', email: 'ramesh.hod@zenofest.in' }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designathon',
    type: 'TECHNICAL',
    badge: 'DESIGN SPRINT',
    tagline: 'Craft intuitive interfaces, micro-interactions, and visual design masterpieces.',
    shortDesc: 'A fast-paced interactive design challenge where designers tackle a live real-world problem statement to architect high-fidelity Figma prototypes and design systems.',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
    accentColor: '#8b5cf6',
    teamSize: '1 – 2 Members',
    date: '25 SEP 2026',
    time: '02:00 PM – 04:30 PM',
    venue: 'CAD Design Studio & Multimedia Lab',
    hasCashPrize: false,
    prizePool: 'Winner Trophy + Certificate of Merit + Design Swag',
    firstPrize: 'Winner Trophy + Certificate of Merit',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'UI/UX Designathon is a crucible for digital product architects and visual storytellers. Participants will be handed a surprise problem statement at the start of the clock and must conduct user journey mapping, wireframing, and build interactive clickable prototypes that elevate user experience.',
    rounds: [
      {
        roundNumber: '01',
        title: 'Brief Reveal & User Journey Mapping',
        time: '02:00 PM – 02:30 PM',
        desc: 'Unsealing the core problem prompt (e.g. AI-assisted healthcare workflow, next-gen EV dashboard, or campus collaborative super-app). Teams formulate user personas and wireframes.'
      },
      {
        roundNumber: '02',
        title: 'High-Fidelity Sprint & Prototyping',
        time: '02:30 PM – 04:00 PM',
        desc: '90 minutes of focused digital craftsmanship in Figma/Adobe XD creating components, tokens, interactions, and responsive mobile/desktop viewports.'
      },
      {
        roundNumber: '03',
        title: 'Interactive Walkthrough & Critiques',
        time: '04:00 PM – 04:30 PM',
        desc: 'Teams present a live clickable prototype walkthrough to UI/UX lead designers, articulating their UX rationale and design token hierarchy.'
      }
    ],
    rules: [
      'Teams can participate individually or in pairs (max 2 members).',
      'Supported tools: Figma (preferred), Adobe XD, Penpot, or Sketch.',
      'The exact design problem statement will be disclosed on-spot when the countdown begins.',
      'All UI assets, screens, and interaction flows must be created during the 2.5-hour event duration. Using pre-fabricated community templates is strictly forbidden.',
      'Final submission must include: (1) Viewable Figma link with prototype permissions, (2) User persona slide, (3) Color palette & typography styleguide.',
      'Scoring Rubric: Ergonomics & UX Usability (35%), Visual Aesthetics & Typography (30%), Innovation & Problem Solving (20%), Design System Cohesion (15%).',
      'Plagiarism checks will be conducted on final component libraries.'
    ],
    requirements: [
      'Laptop with Figma desktop or browser logged in',
      'Stable internet connection (Wi-Fi provided)',
      'Figma community access'
    ],
    coordinators: [
      { name: 'Dharshini R', role: 'Student Coordinator', phone: '+91 97890 12345', email: 'dharshini.des@zenofest.in' },
      { name: 'Vignesh K', role: 'Student Coordinator', phone: '+91 94432 10987', email: 'vignesh.k@zenofest.in' },
      { name: 'Prof. M. Selvi', role: 'Faculty Coordinator', phone: '+91 98421 98765', email: 'selvi.m@zenofest.in' }
    ]
  },
  {
    id: 'logic-hunt',
    title: 'Logic Hunt',
    type: 'TECHNICAL',
    badge: 'ALGO-QUEST',
    tagline: 'Crack cryptic ciphers, debug broken codebases, and conquer the algorithmic maze.',
    shortDesc: 'A multi-tier algorithmic code quest where programmers follow cyber breadcrumbs, fix obfuscated codebases, and crack logic puzzles to unearth the master key.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    accentColor: '#3b82f6',
    teamSize: '1 – 2 Members (Solo / Duo)',
    date: '09 OCT 2026 (Day 2)',
    time: '10:00 AM – 12:30 PM',
    venue: 'Advanced Coding Lab 2 & Server Room',
    hasCashPrize: false,
    prizePool: 'Champion Trophy + Certificate of Merit + Algo Badges',
    firstPrize: 'Champion Trophy + Certificate of Merit',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'Logic Hunt is no ordinary hackathon—it is a cyberpunk intelligence labyrinth. Teams will be tested on mathematical logic, reverse engineering, output prediction, and algorithm optimization in a battle against the ticking clock.',
    rounds: [
      {
        roundNumber: '01',
        title: 'Cryptic Code Decryption',
        time: '10:00 AM – 10:40 AM',
        desc: 'Solve 15 rapid-fire code puzzles, output riddles, and hexadecimal/ASCII encoded breadcrumbs to unlock the level-2 terminal.'
      },
      {
        roundNumber: '02',
        title: 'Bug Hunting in Obfuscated Source',
        time: '10:40 AM – 11:30 AM',
        desc: 'Inspect real-world buggy programs in C++/Python/Java, find memory leaks, recursion bottlenecks, and edge case bugs to patch the software vault.'
      },
      {
        roundNumber: '03',
        title: 'The Algorithmic Maze & Master Key',
        time: '11:30 AM – 12:30 PM',
        desc: 'Write optimal algorithms for dynamic programming, graph traversals, and pathfinding to extract the final cryptographic token.'
      }
    ],
    rules: [
      'Teams of 1 or 2 participants are allowed.',
      'Permitted Programming Languages: C, C++, Python 3, Java, JavaScript (Node.js).',
      'The competition is strictly proctored on a customized offline terminal environment.',
      'Access to AI assistance tools (ChatGPT, Copilot, Gemini, Claude) or external code repos is strictly banned and monitored via screen logs.',
      'Checkpoints must be unlocked in sequential order; each milestone grants access tokens to the next challenge.',
      'Tie breaker: In case of equal scores, the team with fewer wrong attempts and earlier completion time takes priority.',
      'Unsportsmanlike conduct or network tampering will lead to immediate ban.'
    ],
    requirements: [
      'Laptop with pre-configured IDE/compiler (VS Code / PyCharm / GCC)',
      'College Identity Card'
    ],
    coordinators: [
      { name: 'Karthik M', role: 'Student Lead', phone: '+91 99440 55667', email: 'karthik.algo@zenofest.in' },
      { name: 'Swetha B', role: 'Student Coordinator', phone: '+91 96290 88776', email: 'swetha.b@zenofest.in' },
      { name: 'Dr. S. Anand', role: 'Faculty Coordinator', phone: '+91 94420 11223', email: 'anand.s@zenofest.in' }
    ]
  },

  // ── NON-TECHNICAL EVENTS ──
  {
    id: 'who-am-i',
    title: 'Who Am I?',
    type: 'NON-TECHNICAL',
    badge: 'DEDUCTION SHOWDOWN',
    tagline: 'Test your sharp instincts, deductive reasoning, and pop-culture tech mastery.',
    shortDesc: 'A captivating 20-questions mystery showdown where players unmask iconic tech legends, pop culture titans, sci-fi movies, and quirky personas against the clock.',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    accentColor: '#ec4899',
    teamSize: '2 Members (Duo)',
    date: '08 OCT 2026 (Day 1)',
    time: '11:30 AM – 01:00 PM',
    venue: 'Open Amphitheatre / Seminar Hall 1',
    hasCashPrize: false,
    prizePool: 'Winner Trophy + Certificate of Merit + Gift Hampers',
    firstPrize: 'Winner Trophy + Certificate of Merit + Hamper',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'Who Am I? brings high-octane entertainment and intense detective chemistry to the festival stage. One participant receives an identity pinned to their head or screen, while their partner holds the clues. Can you deduce your mystery persona using only Yes/No questions and taboo-style clues before the sand runs out?',
    rounds: [
      {
        roundNumber: '01',
        title: 'The Yes/No Forehead Matrix',
        time: '11:30 AM – 12:00 PM',
        desc: 'Player A wears a digital headband card displaying a character (e.g. Alan Turing, Tony Stark, Linus Torvalds). They ask 10 strict Yes/No questions to Player B within 90 seconds to guess who they are.'
      },
      {
        roundNumber: '02',
        title: 'Taboo & Forbidden Words',
        time: '12:00 PM – 12:35 PM',
        desc: 'Player B must describe a famous technology, CEO, movie or gadget to Player A without uttering 5 forbidden buzzwords listed on the screen.'
      },
      {
        roundNumber: '03',
        title: 'Sudden Death Buzzer Faceoff',
        time: '12:35 PM – 01:00 PM',
        desc: 'Top 4 teams duel head-to-head with progressive voice distorted clues and silhouette reveals on the main projector.'
      }
    ],
    rules: [
      'Teams must strictly consist of exactly 2 participants.',
      'In Round 1, only queries that can be answered with "Yes", "No", or "Irrelevant" are permitted. Descriptive questions (e.g., "What color is my hair?") result in a 5-second time penalty.',
      'In Round 2, saying any taboo word, rhymes, or miming triggers a buzzer penalty.',
      'Mobile phones and smart watches must remain powered off in bags throughout the session.',
      'The time taken for correct guesses will be recorded down to hundredths of a second.',
      'The judges’ adjudication on allowable hints and deductions is final.'
    ],
    requirements: [
      'Valid College ID card',
      'Presence of both teammates on stage on time'
    ],
    coordinators: [
      { name: 'Naveen Raj C', role: 'Student Coordinator', phone: '+91 91234 56780', email: 'naveen.raj@zenofest.in' },
      { name: 'Ananya G', role: 'Student Coordinator', phone: '+91 98401 23456', email: 'ananya.g@zenofest.in' },
      { name: 'Prof. R. Kavitha', role: 'Faculty Coordinator', phone: '+91 94860 77889', email: 'kavitha.r@zenofest.in' }
    ]
  },
  {
    id: 'rapid-fire',
    title: 'Rapid Fire',
    type: 'NON-TECHNICAL',
    badge: 'LIGHTNING TRIVIA',
    tagline: 'Lightning buzzers, instant wit, and split-second pop & tech trivia.',
    shortDesc: 'A buzzer-driven quiz arena packed with fast-paced questions, music riffs, tech logos, viral memes, and general knowledge where hesitations cost victory.',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    accentColor: '#f59e0b',
    teamSize: '1 – 2 Members',
    date: '09 OCT 2026 (Day 2)',
    time: '11:00 AM – 12:30 PM',
    venue: 'Main University Auditorium',
    hasCashPrize: false,
    prizePool: 'Winner Trophy + Certificate of Merit + Fest Merchandise',
    firstPrize: 'Winner Trophy + Certificate of Merit + Swag',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'Rapid Fire is a battle of lightning-fast cognitive reflexes. From tech history and trending AI tools to blockbuster movies, gaming lore, and auditory brain teasers, this event separates the swift from the slow in an electric auditorium atmosphere.',
    rounds: [
      {
        roundNumber: '01',
        title: 'The 60-Second Hot Seat',
        time: '11:00 AM – 11:35 AM',
        desc: 'Each team occupies the hot seat and faces a relentless barrage of 15 rapid-fire questions within 60 seconds (+10 for correct, -5 for incorrect, pass allowed).'
      },
      {
        roundNumber: '02',
        title: 'Buzzer Blitzkrieg',
        time: '11:35 AM – 12:05 PM',
        desc: 'Live hardware buzzers! Audio tracks, pixelated logos, scrambled names, and mind-bending trivia thrown open to all qualifying teams.'
      },
      {
        roundNumber: '03',
        title: 'Sudden Death Showdown',
        time: '12:05 PM – 12:30 PM',
        desc: 'Direct 1v1 faceoffs with a strict 3-second answer window. First team to reach 50 points takes the championship.'
      }
    ],
    rules: [
      'Teams can consist of 1 or 2 participants.',
      'Electronic buzzers with millisecond precision are deployed on the arena tables.',
      'Early buzzing before the quizmaster completes reading the question will lock out the buzzer for that question.',
      'No prompting or assistance from the audience is permitted (will result in audience removal and team penalty).',
      'Scores and penalties will be live-streamed on the auditorium jumbo screen.',
      'The Quizmaster\'s verdict is absolute and uncontested.'
    ],
    requirements: [
      'College ID card of participants',
      'Punctual reporting 15 mins prior to commencement'
    ],
    coordinators: [
      { name: 'Rahul S', role: 'Student Coordinator', phone: '+91 97531 08642', email: 'rahul.s@zenofest.in' },
      { name: 'Sneha R', role: 'Student Coordinator', phone: '+91 93612 34567', email: 'sneha.r@zenofest.in' },
      { name: 'Prof. T. Venkatesh', role: 'Faculty Coordinator', phone: '+91 94431 22334', email: 'venkatesh.t@zenofest.in' }
    ]
  },
  {
    id: 'surprise-event',
    title: 'Surprise Event',
    type: 'NON-TECHNICAL',
    badge: 'MYSTERY ARENA',
    tagline: 'Expect the unexpected. Wildcard challenges, physical mini-games, and pure fun.',
    shortDesc: 'The biggest mystery showdown of ZenoFest 2K26! Locked in a secret vault until you step into the arena, this event tests spontaneous agility, creative madness, and team synergy.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    accentColor: '#10b981',
    teamSize: '2 – 3 Members',
    date: '09 OCT 2026 (Day 2)',
    time: '02:00 PM – 04:00 PM',
    venue: 'Central Fest Courtyard & Activity Arena',
    hasCashPrize: false,
    prizePool: 'Mystery Trophy + Certificate of Merit + Fest Vault Gift',
    firstPrize: 'Mystery Trophy + Certificate of Merit + Gift Box',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'True to its name, the Surprise Event keeps everyone on edge! No preparation, no syllabus, and no leaks. Step into our dynamic arena where teams tackle hilarious physical mini-tasks, synchronized coordination challenges, puzzle relays, and situational roleplays.',
    rounds: [
      {
        roundNumber: '01',
        title: 'The Sealed Envelope Task',
        time: '02:00 PM – 02:40 PM',
        desc: 'Teams rip open secret task cards with quirky team relay challenges designed to test synchronization and lateral problem-solving.'
      },
      {
        roundNumber: '02',
        title: 'The Vault Obstacle Relay',
        time: '02:40 PM – 03:20 PM',
        desc: 'High-energy physical mini-challenges (cup stacking physics, blindfolded guide maze, balloon balancing) against the stopwatch.'
      },
      {
        roundNumber: '03',
        title: 'The Grand Mystery Finale',
        time: '03:20 PM – 04:00 PM',
        desc: 'Top 3 qualifying teams face an epic spontaneous finale designed exclusively by the ZenoFest organizing committee.'
      }
    ],
    rules: [
      'Teams must consist of 2 to 3 members.',
      'No prior preparation or specific domain knowledge is required. Just bring boundless energy and enthusiasm!',
      'All rules and scoring criteria for individual tasks will be announced on the spot before each challenge begins.',
      'Comfortable casual clothing and sneakers are strongly advised due to light physical mini-games.',
      'Cheating, intentional obstruction of other teams, or disrespecting volunteers results in an instant red card.',
      'The spirit of the event is fun, camaraderie, and laughter.'
    ],
    requirements: [
      'College Identity Card',
      'Comfortable attire & footwear for active participation'
    ],
    coordinators: [
      { name: 'Gokul N', role: 'Student Coordinator', phone: '+91 95001 12233', email: 'gokul.n@zenofest.in' },
      { name: 'Meera V', role: 'Student Coordinator', phone: '+91 98412 33445', email: 'meera.v@zenofest.in' },
      { name: 'Dr. P. Murugan', role: 'Faculty Coordinator', phone: '+91 94440 99887', email: 'murugan.p@zenofest.in' }
    ]
  }
]
