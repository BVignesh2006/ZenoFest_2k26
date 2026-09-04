import projectExpoImg from './p3.jpeg'
import uiUxImg from './ui ux .png'
import logicHuntImg from './p1.jpeg'
import whoAmIImg from './Who-Am-I-1.png'
import rapidFireImg from './p2.jpeg'
import freeFireImg from './FF.png'

export const eventsData = [
  // ── TECHNICAL EVENTS ──
  {
    id: 'project-expo',
    title: 'Project Expo',
    type: 'TECHNICAL',
    badge: 'FLAGSHIP EVENT',
    tagline: 'Unveil cutting-edge hardware prototypes and software innovations.',
    shortDesc: 'A national-level innovation showcase where visionary students present functional prototypes across AI/ML, IoT, Web3, Robotics, and Embedded Systems before industry experts.',
    coverImage: projectExpoImg,
    objectFit: 'cover',
    objectPosition: 'center',
    accentColor: '#06b6d4',
    teamSize: '2 – 3 Members',
    date: '25.09.2026',
    time: '10:30 AM – 12:30 PM',
    venue: 'IT Seminar Hall',
    hasCashPrize: true,
    prizePool: '₹10,000 Cash Prize + Merit Trophy + Certificate',
    firstPrize: '₹5,000',
    secondPrize: '₹3,000',
    thirdPrize: '₹2,000',
    overview: 'Each team will present their innovative project to the panel of evaluators. The presentation should clearly highlight the problem addressed, the innovation behind the solution, and how the prototype/model works. Teams should focus on clarity, teamwork, and showcasing the innovation effectively within the time frame.',
    rounds: [
      {
        roundNumber: '01',
        title: 'Project Presentation & Q&A',
        time: '10:30 AM – 12:30 PM',
        desc: 'Each team has 2 to 4 minutes to present their project. After the presentation, evaluators will ask questions for 2 to 3 minutes.'
      }
    ],
    rules: [
      'Team Size: Each team must have between 2 to 3 members.',
      'Presentation Time: Each team has 2 to 4 minutes to present their project. Strictly no extension beyond the allotted time.',
      'Prototype/Model: It is highly recommended to showcase a working prototype or model during the presentation.',
      'GitHub Repository: Each team must create a separate repository for their project under the Zenofest 2k26 GitHub Organization and submit the repository link.',
      'Project Documentation: Each team must bring proper documentation related to their project.',
      'No External Help: Use only your own knowledge and project work; no outside assistance is allowed during the presentation.',
      'Winner Calculation: Evaluation will be based on Innovation, Teamwork, and Clarity of presentation. The project prototype/model, GitHub repository, and project documentation will also be considered.'
    ],
    requirements: [
      'College ID card of all team members',
      'Working prototype / model',
      'GitHub repository link under the Zenofest 2k26 Organization',
      'Proper documentation related to the project'
    ],
    coordinators: [
      { name: 'Dr. R. Ramani', role: 'Staff Coordinator (HOD/IT)' },
      { name: 'Dr. P. Edwin Dhas', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Ramakrishnan M', role: 'Student Coordinator (III/IT)' },
      { name: 'Yukanthan P G', role: 'Student Coordinator (III/IT)' },
      { name: 'Guhan S', role: 'Student Coordinator (III/IT)' },
      { name: 'Sumithra S', role: 'Student Coordinator (III/IT)' },
      { name: 'Narmatha Baby B', role: 'Student Coordinator (III/IT)' },
      { name: 'Rishiga R', role: 'Student Coordinator (III/IT)' },
      { name: 'Revathi P', role: 'Student Coordinator (III/IT)' }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designathon',
    type: 'TECHNICAL',
    badge: 'DESIGN SPRINT',
    tagline: 'Craft intuitive interfaces, micro-interactions, and visual design masterpieces.',
    shortDesc: 'A fast-paced interactive design challenge where designers tackle a live real-world problem statement to architect high-fidelity Figma prototypes and design systems.',
    coverImage: uiUxImg,
    objectFit: 'cover',
    objectPosition: 'center',
    accentColor: '#8b5cf6',
    teamSize: '2 – 3 Members',
    date: '25.09.2026',
    time: '10:30 AM – 12:30 PM',
    venue: 'IT LAB -1',
    hasCashPrize: false,
    prizePool: 'Winner Trophy + Certificate of Merit + Design Swag',
    firstPrize: 'Winner Trophy + Certificate of Merit',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'A 2-hour UI/UX design challenge where participants are given a problem statement on the spot. Teams will go through ideation, wireframing, UI design, and prototyping to present a final solution.',
    rounds: [
      {
        roundNumber: '01',
        title: 'Problem Understanding & Ideation',
        time: '20 Mins',
        desc: 'Understand the problem statement, brainstorm solutions, and conduct necessary research.'
      },
      {
        roundNumber: '02',
        title: 'UI Design',
        time: '45 Mins',
        desc: 'Design the high-fidelity UI screens in Figma.'
      },
      {
        roundNumber: '03',
        title: 'Wireframing / User Flow',
        time: '25 Mins',
        desc: 'Create wireframes and define the user flow.'
      },
      {
        roundNumber: '04',
        title: 'Prototyping',
        time: '20 Mins',
        desc: 'Build interactive clickable prototypes.'
      },
      {
        roundNumber: '05',
        title: 'Final Review & Presentation Prep',
        time: '10 Mins',
        desc: 'Prepare for presentation and finalize the prototype.'
      }
    ],
    rules: [
      'Problem statement will be announced at the start. No prior hints.',
      'The design must directly address the problem statement. State assumptions clearly during the presentation.',
      'AI tools are allowed for research and copy, but NOT for auto-generating UI designs or copying templates.',
      'Only Figma is allowed for this event.',
      'Final submission must be made before the deadline.',
      'Judging based on UX, UI, creativity, innovation, user flow, and presentation.',
      'Judges decision is final and binding.'
    ],
    requirements: [
      'Laptop with Figma desktop or browser logged in',
      'Stable internet connection (Wi-Fi provided)',
      'College ID card of all team members'
    ],
    coordinators: [
      { name: 'Mr. T. Saravanan', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Kannan K', role: 'Student Coordinator (III/IT)' },
      { name: 'Mari Selvam M', role: 'Student Coordinator (III/IT)' },
      { name: 'Madhumitha B', role: 'Student Coordinator (III/IT)' },
      { name: 'Muthu Lakshmi R', role: 'Student Coordinator (III/IT)' },
      { name: 'Saranya S', role: 'Student Coordinator (III/IT)' }
    ]
  },
  {
    id: 'logic-hunt',
    title: 'Logic Hunt',
    type: 'TECHNICAL',
    badge: 'ALGO-QUEST',
    tagline: 'Crack cryptic ciphers, debug broken codebases, and conquer the algorithmic maze.',
    shortDesc: 'A multi-tier algorithmic code quest where programmers follow cyber breadcrumbs, fix obfuscated codebases, and crack logic puzzles to unearth the master key.',
    coverImage: logicHuntImg,
    objectFit: 'cover',
    objectPosition: 'center 36%',
    accentColor: '#3b82f6',
    teamSize: '2 – 3 Members',
    date: '25.09.2026',
    time: '10:30 AM – 12:30 PM',
    venue: 'IT Lab-2',
    hasCashPrize: false,
    prizePool: 'Champion Trophy + Certificate of Merit + Algo Badges',
    firstPrize: 'Champion Trophy + Certificate of Merit',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'Logical Hunt is a 3-round technical event testing your problem-solving skills across basic logical questions, debugging, and code logic challenges. Teams will be evaluated based on the correctness of their solutions and the time taken.',
    rounds: [
      {
        roundNumber: '01',
        title: 'Basic Logical Questions',
        time: '15 Mins',
        desc: 'Participants must answer 15 basic logic-related MCQs within 15 minutes. All questions are mandatory. Each question carries 1 mark with no negative marking. Points are calculated based on correct answers and submission time. Top teams will be shortlisted for Round 2.'
      },
      {
        roundNumber: '02',
        title: 'Debugging',
        time: '20 Mins',
        desc: 'Teams will be provided with exactly 5 code snippets containing syntax, runtime, or logical errors. Participants have 20 minutes to identify the errors and write the corrected code/output. Each correct solution carries 5 marks with no negative marking. Top teams advance to Round 3.'
      },
      {
        roundNumber: '03',
        title: 'Code Logic Challenge',
        time: 'TBA',
        desc: 'A pure coding challenge where teams are given 2 problem statements. Participants must write optimized code in any programming language that satisfies all mentioned constraints within the time limit. Final winners are determined by combined scores and time.'
      }
    ],
    rules: [
      'Each team must contain 2 to 3 members.',
      'Participants can use any programming language for the coding challenges.',
      'Time constraints are strictly followed in all rounds.',
      'Scoring: Winners will be determined based on a combination of secured points for correctness and time of submission.',
      'Judges decision is final.'
    ],
    requirements: [
      'Laptop with preferred IDE/compiler installed',
      'College Identity Card of all team members'
    ],
    coordinators: [
      { name: 'Ms. T. Bharathi Lakshmi', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Ms. M. Komathi Sathya', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Anu K', role: 'Student Coordinator (III/IT)' },
      { name: 'Lavanya K', role: 'Student Coordinator (III/IT)' },
      { name: 'Jothi Lakshmi K', role: 'Student Coordinator (III/IT)' },
      { name: 'Akash B', role: 'Student Coordinator (III/IT)' },
      { name: 'Bharathan K', role: 'Student Coordinator (III/IT)' }
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
    coverImage: whoAmIImg,
    objectFit: 'cover',
    objectPosition: 'center',
    accentColor: '#ec4899',
    teamSize: '2 – 3 Members',
    date: '25.09.2026',
    time: '02:00 PM – 03:00 PM',
    venue: 'III Yr IT class (TF01)',
    hasCashPrize: false,
    prizePool: 'Winner Trophy + Certificate of Merit + Gift Hampers',
    firstPrize: 'Winner Trophy + Certificate of Merit + Hamper',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'A 3-round non-technical event testing your pop-culture knowledge, quick thinking, and deduction skills. Identify logos, guess personas using emojis, and connect progressive hints before the time runs out!',
    rounds: [
      {
        roundNumber: '01',
        title: 'Logo Hunt',
        time: '30 sec / question',
        desc: 'Identify the correct original logo out of 4–6 options displayed on screen. No discussion between participants is allowed. Each correct answer carries 10 points with no negative marking. Top teams advance to Round 2.'
      },
      {
        roundNumber: '02',
        title: 'Guess By Emoji',
        time: '45 sec / question',
        desc: 'Connect the set of emojis on screen and guess the correct persona/character. You must press the buzzer first to answer. Correct answers get +10 points, while wrong answers or false buzzers result in a -5 penalty.'
      },
      {
        roundNumber: '03',
        title: '3 Hints - 1 Persona',
        time: '45 sec / question',
        desc: 'Guess the hidden persona using up to 3 progressive clues (Hard to Easy). Teams can press the buzzer at any hint stage. Guessing at Hint 1 gets +30 points, Hint 2 gets +20 points, and Hint 3 gets +10 points. A wrong guess incurs a -10 point penalty.'
      }
    ],
    rules: [
      'Team size must strictly be 2 to 3 members.',
      'Usage of mobile phones, smartwatches, or internet is strictly prohibited.',
      'Any form of cheating, external help, or audience hinting will lead to immediate disqualification.',
      'The team with the highest total score at the end of Round 3 wins the event.',
      'The decision of the coordinators/judges will be final and binding.'
    ],
    requirements: [
      'Valid College ID card',
      'Presence of all teammates on stage on time'
    ],
    coordinators: [
      { name: 'Mr. S. Shunmuga Sundaram', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Ms. Packiya Lakshmi', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Manivasaga Perumal P', role: 'Student Coordinator (III/IT)' },
      { name: 'Jeya Prakash S', role: 'Student Coordinator (III/IT)' },
      { name: 'Priyadharshini C', role: 'Student Coordinator (III/IT)' },
      { name: 'Harsika Sri M', role: 'Student Coordinator (III/IT)' }
    ]
  },
  {
    id: 'rapid-fire',
    title: 'Rapid Fire',
    type: 'NON-TECHNICAL',
    badge: 'LIGHTNING TRIVIA',
    tagline: 'Lightning buzzers, instant wit, and split-second pop & tech trivia.',
    shortDesc: 'A buzzer-driven quiz arena packed with fast-paced questions, music riffs, tech logos, viral memes, and general knowledge where hesitations cost victory.',
    coverImage: rapidFireImg,
    objectFit: 'cover',
    objectPosition: 'center',
    accentColor: '#f59e0b',
    teamSize: '2 – 3 Members',
    date: '25.09.2026',
    time: '02:00 PM – 03:00 PM',
    venue: 'II yr IT Class (TF02)',
    hasCashPrize: false,
    prizePool: 'Winner Trophy + Certificate of Merit + Fest Merchandise',
    firstPrize: 'Winner Trophy + Certificate of Merit + Swag',
    secondPrize: 'Runner Trophy + Certificate of Merit',
    thirdPrize: 'Certificate of Appreciation',
    overview: 'Rapid Fire is a lightning-fast quiz event covering Technology, Apps, Social Media, Entertainment, and General Knowledge. Participants will battle against the clock across three intense rounds. Hesitation costs victory!',
    rounds: [
      {
        roundNumber: '01',
        title: 'Fun Rapid Fire',
        time: '30 Secs',
        desc: 'Each team is given 30 seconds to answer fun and interesting questions. Each correct answer earns 1 point. The top 4 teams advance to Round 2.'
      },
      {
        roundNumber: '02',
        title: 'Think Fast',
        time: '45 Secs',
        desc: 'Teams have 45 seconds to answer slightly challenging questions as quickly as possible. Each correct answer earns 2 points. The top 2 teams advance to the final round.'
      },
      {
        roundNumber: '03',
        title: 'Final Challenge',
        time: '60 Secs',
        desc: 'The top 2 teams face challenging rapid-fire questions for 60 seconds. Each correct answer earns 3 points. The team with the highest score wins the event.'
      }
    ],
    rules: [
      'Teams must consist of 2 to 3 members.',
      'Questions will be based on Technology, Apps, Social Media, Entertainment and General Knowledge.',
      'No mobile phones, internet, smartwatches, or external help are allowed.',
      'Once an answer is given, it cannot be changed.',
      'Participants can say "Pass" if they don’t know an answer.',
      'In case of a tie, a Tie-Breaker Round will be conducted.',
      'The decision of the judges will be final.'
    ],
    requirements: [
      'College ID card of participants',
      'Punctual reporting 15 mins prior to commencement'
    ],
    coordinators: [
      { name: 'Ms. M. Anitha', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Ms. S. Sumathi', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Manoj M', role: 'Student Coordinator (III/IT)' },
      { name: 'Jagan Kumar V', role: 'Student Coordinator (III/IT)' },
      { name: 'Caroline M', role: 'Student Coordinator (III/IT)' },
      { name: 'Sujitha M', role: 'Student Coordinator (III/IT)' },
      { name: 'Kanaga Yuvasri R', role: 'Student Coordinator (III/IT)' }
    ]
  },
  {
    id: 'free-fire',
    title: 'Free Fire',
    type: 'NON-TECHNICAL',
    badge: 'ESPORTS ARENA',
    tagline: 'Drop in, survive, and conquer the battlefield.',
    shortDesc: 'Compete in the ultimate Free Fire battle royale and clash squad tournament. Prove your skills and claim the Booyah!',
    coverImage: freeFireImg,
    objectFit: 'cover',
    objectPosition: 'center 20%',
    accentColor: '#ef4444',
    teamSize: 'Solo',
    date: '25.09.2026',
    time: '02:00 PM – 03:00 PM',
    venue: 'IT Seminar Hall',
    hasCashPrize: true,
    cashPrizeBadge: '₹1,000 Cash Prize',
    prizePool: '₹1,000 Cash Prize for 1st Winner',
    firstPrize: '₹1,000 (Sole Winner)',
    firstPrizePerk: 'Certificate of Merit + Cash Prize',
    secondPrize: null,
    thirdPrize: null,
    overview: 'Get ready for intense action in the Free Fire Esports tournament! The event consists of two rounds: Battle Royale and Clash Squad. Prove your tactical superiority and outlast your opponents. The only prize for this tournament is a ₹1,000 cash prize awarded exclusively to the single winner who claims victory.',
    rounds: [
      {
        roundNumber: '01',
        title: 'Battle Royale',
        time: 'TBA',
        desc: 'Mode: Battle Royale. Players must survive and outplay others. Teaming, kill farming, and kill trading are strictly prohibited.'
      },
      {
        roundNumber: '02',
        title: 'Clash Squad',
        time: 'TBA',
        desc: 'Mode: Clash Squad. The top players/teams from Round 1 will face off in Clash Squad. Winner will be decided by the CS match result.'
      }
    ],
    rules: [
      'Round 1:',
      '🎮 Mode: Battle Royale – Solo',
      '👤 Each player plays individually.',
      '🚫 Teaming with other players is strictly prohibited.',
      '❌ Hacks, cheats, scripts, config files, or third-party tools are not allowed.',
      '🗣️ Abusive or toxic behavior may result in disqualification.',
      '🐛 Exploiting bugs or glitches will result in disqualification.',
      '⏰ Players must join the custom room before the announced start time.',
      '📱 Device, internet, battery, or connection issues are the player\'s responsibility.',
      '⚔️ Kill farming, kill trading, or intentionally helping another player is prohibited.',
      '📸 Players may be required to provide screenshots/video proof if requested by admins',
      '👑 Admin/Organizer decision is final.',
      'Round 2:',
      '🎮 Mode: Clash Squad – Solo',
      '❌ Hacks, cheats, scripts, config files, or third-party tools are not allowed.',
      '⚠️ Cheating or rule violations can result in immediate disqualification.',
      '🐛 Bug/glitch abuse will result in disqualification.',
      '📱 Network, device, battery, or disconnect issues are the player\'s responsibility.',
      '📸 Admins may request screenshots/video proof if there is a dispute.',
      '🏆 Winner will be decided by the CS match result.',
      '💰 Prize distribution will happen after result verification.'
    ],
    requirements: [
      'Mobile Phone with Free Fire installed',
      'Stable Internet Connection',
      'College Identity Card'
    ],
    coordinators: [
      { name: 'Mr. T. Saravanan', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Dr. P. Selvakumar', role: 'Staff Coordinator (AP/IT)' },
      { name: 'Ragavan K', role: 'Student Coordinator (III/IT)' },
      { name: 'Abilash Karthick G', role: 'Student Coordinator (III/IT)' },
      { name: 'Muthu Koodalingam V', role: 'Student Coordinator (III/IT)' },
      { name: 'Thiru Kumaran M', role: 'Student Coordinator (III/IT)' },
      { name: 'Gopi Krishnan M', role: 'Student Coordinator (III/IT)' },
      { name: 'Aravinth P', role: 'Student Coordinator (III/IT)' }
    ]
  }
]
