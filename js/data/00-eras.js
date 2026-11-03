/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
window.CT = window.CT || { eras: [], langs: {}, ai: null };

CT.eras = [
  {
    id: "dawn",
    n: "01",
    title: "The dawn of code",
    years: "1843–1959",
    accent: "#f2b84b",
    mood: "Vacuum tubes, punch cards and the very first compilers",
    intro: "Before screens, keyboards or even transistors, programming meant rewiring machines by hand or punching holes in cards. This era invents the idea of a program — and then the bigger idea that people shouldn’t have to write in raw numbers. Grace Hopper’s compiler and IBM’s FORTRAN prove a computer can translate human-friendly code into machine instructions, and almost everything after builds on that.",
    breakthroughs: [
      {
        y: "1843",
        t: "Ada Lovelace’s Note G",
        d: "Lovelace publishes what is widely considered the first algorithm meant for a machine: computing Bernoulli numbers on Charles Babbage’s Analytical Engine, which was never actually built."
      },
      {
        y: "1936",
        t: "The Turing machine",
        d: "Alan Turing describes an imaginary machine that reads and writes symbols on a tape. It defines what “computable” means, and every programming language you will see on this site is, in theory, equivalent to it."
      },
      {
        y: "1945",
        t: "ENIAC",
        d: "The first general-purpose electronic computer. It was programmed by plugging cables and setting switches — work done largely by six women: Kay McNulty, Betty Jennings, Betty Snyder, Marlyn Wescoff, Fran Bilas and Ruth Lichterman."
      },
      {
        y: "1945",
        t: "The stored-program idea",
        d: "John von Neumann’s EDVAC report describes keeping the program in memory alongside the data, so changing software no longer means rewiring hardware. Every modern computer still works this way."
      },
      {
        y: "1947",
        t: "The transistor and the first “bug”",
        d: "Bell Labs invents the transistor, the switch inside every chip today. The same year, Harvard Mark II operators tape a moth into their logbook — the famous “first actual case of bug being found.”"
      },
      {
        y: "1952",
        t: "Grace Hopper’s A-0 compiler",
        d: "Hopper builds a program that turns symbolic code into machine code. Most experts said computers could only do arithmetic, not write programs. She proved them wrong."
      },
      {
        y: "1957",
        t: "The FORTRAN compiler ships",
        d: "IBM shows compiled code can run nearly as fast as hand-written assembly. Programmers switch to high-level languages and never look back."
      }
    ],
    tracks: [
      {
        k: "games",
        y: "1952",
        t: "OXO",
        d: "A. S. Douglas writes noughts-and-crosses (tic-tac-toe) for the EDSAC computer at Cambridge — one of the first video games, displayed on a tiny CRT."
      },
      {
        k: "games",
        y: "1958",
        t: "Tennis for Two",
        d: "William Higinbotham builds a tennis game on an analog computer and oscilloscope for a lab open house. No code at all: the “program” is circuitry."
      }
    ],
    langs: ["assembly", "fortran", "lisp", "cobol"],
    machine: {
      name: "IBM 704",
      year: "1954",
      specs: [
        ["Speed", "About 40,000 instructions per second"],
        ["Memory", "4K–32K words of magnetic-core memory"],
        ["Input", "Punch cards and magnetic tape"],
        ["Size", "Filled a room and needed its own cooling"]
      ],
      compare: "The phone in your pocket is millions of times faster — and it isn’t rented by the month."
    },
    day: "You write your program on paper coding sheets, then punch it onto cards — one line per card — at a keypunch machine. You hand the deck to an operator through a window, and your job joins the queue. Hours later (or tomorrow) you collect a printout. If you dropped your deck on the way, you hope you drew a diagonal line across the top so you can sort it again. One typo means doing the whole cycle again.",
    short: "Dawn",
    shortYears: "1843–1959",
    sources: [
      {
        t: "Computer History Museum — timeline of computer history",
        u: "https://www.computerhistory.org/timeline/"
      },
      {
        t: "Note G (Ada Lovelace’s algorithm) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Note_G"
      },
      {
        t: "ENIAC — Wikipedia",
        u: "https://en.wikipedia.org/wiki/ENIAC"
      },
      {
        t: "Grace Hopper — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Grace_Hopper"
      },
      {
        t: "IBM 704 — Wikipedia",
        u: "https://en.wikipedia.org/wiki/IBM_704"
      },
      {
        t: "OXO (video game) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/OXO_(video_game)"
      },
      {
        t: "Tennis for Two — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Tennis_for_Two"
      }
    ]
  },
  {
    id: "mainframe",
    n: "02",
    title: "Mainframes, minis and Unix",
    years: "1960–1979",
    accent: "#3ef08b",
    mood: "Green phosphor terminals, time-sharing and the birth of the internet",
    intro: "Computers move from one-off lab machines to product lines sold to businesses and universities. Operating systems, time-sharing, networking and the first video games appear. Two Bell Labs researchers create Unix and C — arguably the most influential software pairing ever — while Xerox PARC quietly invents the modern graphical computer. By the end of the decade Microsoft and Apple exist.",
    breakthroughs: [
      {
        y: "1964",
        t: "IBM System/360",
        d: "The first family of computers that all ran the same software. Write a program once, run it on the small or the huge model. “Compatibility” becomes a business strategy."
      },
      {
        y: "1964",
        t: "Time-sharing and BASIC",
        d: "Dartmouth lets many students share one computer at the same time through terminals, and gives them a friendly language to use it."
      },
      {
        y: "1968",
        t: "The Mother of All Demos",
        d: "Douglas Engelbart demonstrates the mouse, hypertext links, windows, shared editing and video calls — in 1968."
      },
      {
        y: "1969",
        t: "Apollo 11’s guidance software",
        d: "Margaret Hamilton’s MIT team writes the lunar module software in assembly. When the computer overloads during landing, its priority scheduling drops low-priority work and the landing continues. Hamilton helped popularise the term “software engineering.”"
      },
      {
        y: "1969",
        t: "ARPANET and Unix",
        d: "The first network message travels from UCLA to SRI (the system crashed after “LO” of “LOGIN”). That same year at Bell Labs, Ken Thompson and Dennis Ritchie start Unix."
      },
      {
        y: "1971",
        t: "Microprocessors and email",
        d: "Intel’s 4004 puts a whole CPU on one chip. Ray Tomlinson sends the first networked email and picks the @ sign to separate user from host."
      },
      {
        y: "1973",
        t: "Xerox Alto",
        d: "The first computer built around a graphical desktop, windows, a mouse and Ethernet. Xerox never sold it widely — but Apple and Microsoft were paying attention."
      },
      {
        y: "1975–76",
        t: "Microsoft and Apple are founded",
        d: "Bill Gates and Paul Allen sell Altair BASIC; a year later Steve Jobs and Steve Wozniak sell the Apple I. Both companies start by shipping a programming language or a computer to run one."
      },
      {
        y: "1979",
        t: "VisiCalc",
        d: "The first spreadsheet becomes the “killer app” that makes businesses buy Apple IIs. Software, not hardware, starts selling computers."
      }
    ],
    tracks: [
      {
        k: "games",
        y: "1962",
        t: "Spacewar!",
        d: "Steve Russell and friends at MIT write a two-player space dogfight in PDP-1 assembly. Copies spread to computer labs everywhere."
      },
      {
        k: "games",
        y: "1972",
        t: "Pong",
        d: "Atari’s hit arcade game contains no software and no CPU at all — it is built from discrete logic chips wired together."
      },
      {
        k: "games",
        y: "1977",
        t: "Atari 2600",
        d: "Games are written in 6502 assembly for a machine with just 128 bytes of RAM. Programmers “race the beam,” drawing each line of the TV picture just in time."
      },
      {
        k: "games",
        y: "1978",
        t: "Space Invaders",
        d: "Written in Intel 8080 assembly. As aliens are destroyed the processor has less to draw, so the remaining invaders speed up — a hardware limit that became a famous mechanic."
      },
      {
        k: "phones",
        y: "1973",
        t: "First handheld cellphone call",
        d: "Motorola’s Martin Cooper calls a rival at Bell Labs from a prototype DynaTAC. No apps, no screen worth mentioning — but the phone is now portable."
      },
      {
        k: "phones",
        y: "1979",
        t: "First commercial cellular network",
        d: "NTT launches automated cellular service in Tokyo. The networks that will carry apps decades later start here."
      }
    ],
    langs: ["algol", "basic", "pascal", "c", "smalltalk", "sql"],
    machine: {
      name: "Apple II",
      year: "1977",
      specs: [
        ["CPU", "MOS 6502 at about 1 MHz"],
        ["Memory", "4 KB RAM to start, up to 48 KB"],
        ["Storage", "Cassette tape, later 140 KB floppy disks"],
        ["Price", "$1,298 with 4 KB of RAM"]
      ],
      compare: "A single high-resolution photo today is bigger than everything an Apple II could hold in memory."
    },
    day: "You sit at a terminal connected to a shared minicomputer, typing into an editor like ed while dozens of other users share the same machine. Your screen glows green, your code lives on a tape or disk pack in the machine room, and you print listings on fanfold paper to read with a pen. At home, hobbyists type BASIC programs from magazines into brand-new microcomputers — and save them on cassette tapes.",
    short: "Mainframes",
    shortYears: "1960s–70s",
    sources: [
      {
        t: "IBM System/360 — Wikipedia",
        u: "https://en.wikipedia.org/wiki/IBM_System/360"
      },
      {
        t: "The Mother of All Demos — Wikipedia",
        u: "https://en.wikipedia.org/wiki/The_Mother_of_All_Demos"
      },
      {
        t: "Apollo Guidance Computer — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Apollo_Guidance_Computer"
      },
      {
        t: "ARPANET — Wikipedia",
        u: "https://en.wikipedia.org/wiki/ARPANET"
      },
      {
        t: "History of Unix — Wikipedia",
        u: "https://en.wikipedia.org/wiki/History_of_Unix"
      },
      {
        t: "Xerox Alto — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Xerox_Alto"
      },
      {
        t: "Spacewar! — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Spacewar!"
      },
      {
        t: "Apple II — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Apple_II"
      }
    ]
  },
  {
    id: "pc",
    n: "03",
    title: "The personal computer revolution",
    years: "1980–1989",
    accent: "#5aa9ff",
    mood: "Beige boxes, floppy disks, DOS prompts and 8-bit consoles",
    intro: "Computers land on desks and in living rooms. IBM’s PC and MS-DOS turn Microsoft into a giant, the Macintosh brings the graphical interface to everyone, and the NES makes game programming a real industry. Object-oriented programming goes mainstream through C++ and Objective-C, and Perl becomes the glue holding Unix systems together.",
    breakthroughs: [
      {
        y: "1981",
        t: "IBM PC and MS-DOS",
        d: "Microsoft licenses DOS to IBM but keeps the right to sell it to other manufacturers. When “PC clones” flood the market, every one of them needs Microsoft’s software."
      },
      {
        y: "1983",
        t: "TCP/IP: the Internet is born",
        d: "On January 1, 1983, ARPANET switches to TCP/IP, the protocols the Internet still runs on."
      },
      {
        y: "1983",
        t: "The GNU Project",
        d: "Richard Stallman announces a free Unix-like operating system and later the GPL licence. The free and open-source movement starts here."
      },
      {
        y: "1984",
        t: "Macintosh",
        d: "Apple ships a mass-market computer with a mouse and a graphical desktop. Developers now have to think about windows, menus and events instead of just text."
      },
      {
        y: "1985",
        t: "Windows 1.0",
        d: "Microsoft’s graphical shell for DOS. It took until Windows 3.0 (1990) to really take off."
      },
      {
        y: "1987",
        t: "HyperCard",
        d: "Apple’s HyperCard lets non-programmers build linked “stacks” of cards with a scripting language. It inspired the web and wikis, and the hit game Myst was built with it."
      },
      {
        y: "1989",
        t: "The World Wide Web is proposed",
        d: "Tim Berners-Lee at CERN writes a proposal for linked hypertext documents over the Internet. His boss called it “vague but exciting.”"
      }
    ],
    tracks: [
      {
        k: "games",
        y: "1980",
        t: "Pac-Man",
        d: "Written in Z80 assembly. A famous overflow bug corrupts level 256 into a garbled, unwinnable “kill screen.”"
      },
      {
        k: "games",
        y: "1984",
        t: "Tetris",
        d: "Alexey Pajitnov writes the original Tetris in Pascal on a Soviet Elektronika 60, which could only display text characters."
      },
      {
        k: "games",
        y: "1985",
        t: "Super Mario Bros.",
        d: "Hand-written 6502 assembly squeezed into a 40 KB cartridge. Every byte mattered: the clouds and bushes are the same sprite in different colours."
      },
      {
        k: "games",
        y: "1989",
        t: "Game Boy",
        d: "Nintendo’s handheld runs a Z80-like CPU. Developers write in assembly for a 160×144 four-shade screen and an 8 KB work RAM."
      },
      {
        k: "phones",
        y: "1983",
        t: "Motorola DynaTAC 8000X",
        d: "The first commercial handheld cellphone costs about $4,000 and offers 30 minutes of talk time. It runs firmware, not apps."
      }
    ],
    langs: ["ada", "objc", "matlab", "cpp", "perl", "bash"],
    machine: {
      name: "IBM PC 5150",
      year: "1981",
      specs: [
        ["CPU", "Intel 8088 at 4.77 MHz"],
        ["Memory", "16 KB RAM to start, up to 256 KB"],
        ["Storage", "160 KB 5.25-inch floppy disks"],
        ["Price", "From $1,565"]
      ],
      compare: "One 3 MB photo from a modern phone would need about 20 of those floppy disks."
    },
    day: "You boot DOS from a floppy, type cd and dir at the C:\\> prompt, and open Turbo Pascal or a C compiler in a blue text-mode editor. Memory is measured in kilobytes, so you think hard about every array. Games programmers hand-write assembly for the NES or Commodore 64, and you share code by mailing floppy disks or dialling into bulletin board systems (BBSes) with a modem.",
    short: "PCs",
    shortYears: "1980s",
    sources: [
      {
        t: "IBM Personal Computer — Wikipedia",
        u: "https://en.wikipedia.org/wiki/IBM_Personal_Computer"
      },
      {
        t: "The GNU Project (gnu.org)",
        u: "https://www.gnu.org/gnu/thegnuproject.html"
      },
      {
        t: "Macintosh 128K — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Macintosh_128K"
      },
      {
        t: "HyperCard — Wikipedia",
        u: "https://en.wikipedia.org/wiki/HyperCard"
      },
      {
        t: "Tim Berners-Lee’s 1989 proposal (W3C)",
        u: "https://www.w3.org/History/1989/proposal.html"
      },
      {
        t: "Tetris — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Tetris"
      },
      {
        t: "Super Mario Bros. — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Super_Mario_Bros."
      }
    ]
  },
  {
    id: "web",
    n: "04",
    title: "The internet explodes",
    years: "1990–1999",
    accent: "#ff5fd2",
    mood: "Dial-up tones, GeoCities pages, CD-ROMs and the first 3D games",
    intro: "The Web turns computers into windows onto the whole world, and Linux proves volunteers can build world-class software. A single year — 1995 — gives us Java, JavaScript, PHP and Ruby, with Python, Lua and Visual Basic arriving just before. Games go 3D, Google is founded, and phones start running tiny programs. Nearly every language used on the web today was born in this decade.",
    breakthroughs: [
      {
        y: "1991",
        t: "The Web goes public",
        d: "The first website, info.cern.ch, explains what the Web is and how to make your own pages with HTML."
      },
      {
        y: "1991",
        t: "Linux",
        d: "Linus Torvalds announces a free kernel as “just a hobby, won’t be big and professional.” Today it runs most servers, every Android phone and every top-500 supercomputer."
      },
      {
        y: "1993",
        t: "Mosaic",
        d: "The first popular graphical browser shows images inline with text. Its developers go on to build Netscape Navigator."
      },
      {
        y: "1995",
        t: "The big bang year",
        d: "Java, JavaScript, PHP and Ruby are all released. Amazon and eBay launch, and Windows 95 brings the Start menu and built-in networking to millions."
      },
      {
        y: "1998",
        t: "Google and open source",
        d: "Google is founded around the PageRank algorithm. The same year Netscape releases its browser source code and the term “open source” is coined."
      },
      {
        y: "1999",
        t: "The Y2K bug",
        d: "Decades of code stored years as two digits, so “00” could mean 1900. The world spends billions checking and fixing old software — much of it COBOL — before January 1, 2000."
      }
    ],
    tracks: [
      {
        k: "games",
        y: "1993",
        t: "Doom",
        d: "id Software writes Doom in C with a little assembly. It popularises shareware, mods and online deathmatch, and its source code was released in 1997."
      },
      {
        k: "games",
        y: "1996",
        t: "Quake and Super Mario 64",
        d: "Quake brings true 3D and QuakeC, a scripting language for mods. Super Mario 64 is written in C for the Nintendo 64 — fans later decompiled it entirely."
      },
      {
        k: "games",
        y: "1998",
        t: "Half-Life and Unreal",
        d: "Both are C++ engines. Unreal ships with UnrealScript and an editor, starting the era of licensable game engines."
      },
      {
        k: "phones",
        y: "1994",
        t: "IBM Simon",
        d: "Often called the first smartphone: a touchscreen, email, a calendar and a few built-in apps — but no app store."
      },
      {
        k: "phones",
        y: "1997",
        t: "Snake on Nokia",
        d: "Taneli Armanto’s Snake ships on the Nokia 6110 and becomes one of the most-played games ever, purely because it was on so many phones."
      },
      {
        k: "phones",
        y: "1999",
        t: "Java on phones and BlackBerry",
        d: "Sun announces J2ME, a cut-down Java for small devices that would power thousands of phone games. BlackBerry launches its email pager."
      }
    ],
    langs: ["haskell", "python", "vb", "html", "lua", "r", "java", "javascript", "php", "ruby"],
    machine: {
      name: "A typical Windows 95 home PC",
      year: "1995",
      specs: [
        ["CPU", "Intel Pentium, 75–133 MHz"],
        ["Memory", "8–16 MB RAM"],
        ["Storage", "About 1 GB hard drive and a CD-ROM"],
        ["Internet", "28.8 kbit/s dial-up modem"]
      ],
      compare: "Downloading a 5 MB file took about half an hour — and nobody could use the phone line while you did."
    },
    day: "You learn HTML from View Source, write your homepage in Notepad, and upload it to GeoCities over a screeching dial-up modem. Your page has a visitor counter, an animated “under construction” GIF and a guestbook powered by a Perl CGI script. At work you might build Windows apps in Visual Basic or write Java applets. Answers come from books, newsgroups and very early search engines.",
    short: "The Web",
    shortYears: "1990s",
    sources: [
      {
        t: "The first website (CERN)",
        u: "https://info.cern.ch/"
      },
      {
        t: "History of Linux — Wikipedia",
        u: "https://en.wikipedia.org/wiki/History_of_Linux"
      },
      {
        t: "Mosaic (web browser) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Mosaic_(web_browser)"
      },
      {
        t: "Year 2000 problem — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Year_2000_problem"
      },
      {
        t: "Doom source code (id Software on GitHub)",
        u: "https://github.com/id-Software/DOOM"
      },
      {
        t: "IBM Simon — Wikipedia",
        u: "https://en.wikipedia.org/wiki/IBM_Simon"
      },
      {
        t: "Nokia 6110 — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Nokia_6110"
      }
    ]
  },
  {
    id: "platform",
    n: "05",
    title: "Platforms, open source and the first smartphones",
    years: "2000–2009",
    accent: "#ff8a3d",
    mood: "Flash intros, broadband, Web 2.0 and a computer in every pocket",
    intro: "After the dot-com crash, the survivors build platforms: Microsoft’s .NET, Amazon’s cloud, Google’s web apps — and finally the iPhone and Android, which put a computer in every pocket and created the app economy. Git and GitHub change how every developer collaborates, and engines like Unity let small teams ship games on every platform.",
    breakthroughs: [
      {
        y: "2000",
        t: "The dot-com crash",
        d: "Hundreds of internet companies collapse. The ones left standing — Amazon, Google, eBay — learn to build software that scales."
      },
      {
        y: "2001",
        t: "The Agile Manifesto and Mac OS X",
        d: "Seventeen developers publish four values for building software in short, feedback-driven iterations. Apple ships Mac OS X, built on NeXTSTEP and Unix."
      },
      {
        y: "2002",
        t: ".NET 1.0",
        d: "Microsoft launches its managed runtime and C#, its answer to Java."
      },
      {
        y: "2004",
        t: "Gmail and Web 2.0",
        d: "Gmail feels like a desktop app inside a browser, using JavaScript to fetch data in the background (soon named AJAX). Facebook launches the same year."
      },
      {
        y: "2005",
        t: "Git",
        d: "Linus Torvalds writes Git in about two weeks after losing access to the tool Linux had been using. Today almost all code is version-controlled with it."
      },
      {
        y: "2006",
        t: "Amazon Web Services",
        d: "S3 storage and EC2 servers let anyone rent computing by the hour. Startups no longer need to buy servers — cloud computing begins."
      },
      {
        y: "2007",
        t: "iPhone",
        d: "A multi-touch phone with a real web browser. At launch Apple told developers to build web apps; a native SDK followed a year later."
      },
      {
        y: "2008",
        t: "App Store, Android, GitHub and Chrome",
        d: "One very big year: the App Store opens, the first Android phone ships, GitHub launches, and Google’s Chrome arrives with the fast V8 JavaScript engine."
      },
      {
        y: "2009",
        t: "Node.js",
        d: "Ryan Dahl puts V8 on the server. JavaScript developers can now write the back end too."
      }
    ],
    tracks: [
      {
        k: "games",
        y: "2004",
        t: "World of Warcraft",
        d: "A C++ engine with a Lua-scripted user interface. Players write their own Lua add-ons, and many professional programmers got started this way."
      },
      {
        k: "games",
        y: "2005–06",
        t: "Unity and XNA",
        d: "Unity 1.0 launches at Apple’s developer conference; Microsoft’s XNA lets hobbyists write Xbox 360 games in C#. Indie game development takes off."
      },
      {
        k: "games",
        y: "2009",
        t: "Minecraft and Flash games",
        d: "Markus “Notch” Persson writes Minecraft in Java. Meanwhile Flash portals like Newgrounds and Miniclip host millions of ActionScript games."
      },
      {
        k: "phones",
        y: "2000s",
        t: "Symbian, J2ME and BlackBerry",
        d: "Pre-iPhone phones run Symbian (C++) and Java ME apps, and BlackBerry apps are written in Java."
      },
      {
        k: "phones",
        y: "2008",
        t: "Native apps arrive",
        d: "The iPhone SDK (Objective-C) and Android (Java) open app stores to everyone. Apps become a whole industry."
      },
      {
        k: "phones",
        y: "2009",
        t: "Angry Birds",
        d: "Rovio’s physics game becomes the first mobile mega-hit, proving phones are serious game platforms."
      }
    ],
    langs: ["csharp", "actionscript", "scala", "powershell", "go"],
    machine: {
      name: "Original iPhone",
      year: "2007",
      specs: [
        ["CPU", "412 MHz ARM processor"],
        ["Memory", "128 MB RAM"],
        ["Storage", "4 or 8 GB"],
        ["Price", "$499 or $599 on a two-year contract"]
      ],
      compare: "It had no App Store, no copy-and-paste and no third-party apps at launch."
    },
    day: "You use Subversion or, from 2005, Git, and search Google for answers — and from 2008, Stack Overflow. You build web apps with AJAX, PHP or Rails, maybe rent servers from Amazon’s new cloud, and argue about Flash. Then the App Store opens and suddenly everyone wants an iPhone app written in Objective-C.",
    short: "Platforms",
    shortYears: "2000s",
    sources: [
      {
        t: "Manifesto for Agile Software Development",
        u: "https://agilemanifesto.org/"
      },
      {
        t: "A Short History of Git (Pro Git book)",
        u: "https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git"
      },
      {
        t: "Amazon Web Services — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Amazon_Web_Services"
      },
      {
        t: "iPhone (1st generation) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/IPhone_(1st_generation)"
      },
      {
        t: "Android version history — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Android_version_history"
      },
      {
        t: "Unity (game engine) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Unity_(game_engine)"
      },
      {
        t: "Node.js — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Node.js"
      }
    ]
  },
  {
    id: "mobile",
    n: "06",
    title: "Mobile, cloud and modern languages",
    years: "2010–2019",
    accent: "#2de2e6",
    mood: "Touchscreens, app stores, containers and declarative UI",
    intro: "Smartphones become the main computer for billions of people. Apple and Google each adopt new languages — Swift and Kotlin — designed to remove whole categories of bugs. Docker and Kubernetes reshape servers, TypeScript tames huge JavaScript codebases, Rust delivers memory safety without a garbage collector, and Flutter targets every screen from one codebase. Quietly, deep learning sets up the AI revolution.",
    breakthroughs: [
      {
        y: "2010",
        t: "iPad and Instagram",
        d: "Tablets arrive, and Instagram (built with Python and Django) shows how a tiny team can serve millions."
      },
      {
        y: "2012",
        t: "AlexNet",
        d: "A deep neural network trained on GPUs wins the ImageNet image-recognition contest by a huge margin. Deep learning goes mainstream."
      },
      {
        y: "2013",
        t: "Docker and React",
        d: "Docker packages apps into portable containers. Facebook open-sources React, changing how user interfaces are built."
      },
      {
        y: "2014",
        t: "Kubernetes and Swift",
        d: "Google open-sources Kubernetes, based on its internal Borg system. Apple surprises everyone by announcing a brand-new language."
      },
      {
        y: "2015",
        t: "TensorFlow and Rust 1.0",
        d: "Google open-sources its machine-learning library; Rust reaches its first stable release."
      },
      {
        y: "2016",
        t: "AlphaGo",
        d: "DeepMind’s program beats Lee Sedol at Go, a game many experts thought was a decade away from being mastered by computers."
      },
      {
        y: "2017",
        t: "Transformers and Kotlin",
        d: "Google researchers publish “Attention Is All You Need,” the architecture behind modern AI chatbots. Google makes Kotlin an official Android language."
      },
      {
        y: "2018",
        t: "Microsoft buys GitHub; Flutter 1.0",
        d: "The home of open source changes hands, and Google ships its cross-platform UI toolkit."
      },
      {
        y: "2019",
        t: "Declarative UI everywhere",
        d: "Apple announces SwiftUI and Google announces Jetpack Compose. You describe what the screen should look like, and the framework works out how to update it."
      }
    ],
    tracks: [
      {
        k: "games",
        y: "2014",
        t: "Godot goes open source",
        d: "The Godot engine is released under the MIT licence with its own Python-like language, GDScript."
      },
      {
        k: "games",
        y: "2016",
        t: "Pokémon GO",
        d: "Built in Unity with C#, it shows how phones plus GPS can turn the real world into a game board."
      },
      {
        k: "games",
        y: "2017",
        t: "Fortnite",
        d: "Built on Unreal Engine 4 with C++ and Blueprints visual scripting. It later runs on everything from phones to consoles with shared cross-play."
      },
      {
        k: "games",
        y: "2018",
        t: "Among Us",
        d: "A tiny team’s Unity game that exploded in 2020. Small engines plus app stores mean anyone can have a global hit."
      },
      {
        k: "phones",
        y: "2014–15",
        t: "Swift and React Native",
        d: "Apple’s Swift replaces Objective-C for new apps; Facebook’s React Native lets JavaScript developers build native mobile apps."
      },
      {
        k: "phones",
        y: "2017–19",
        t: "Kotlin-first Android and Flutter",
        d: "Google adopts Kotlin and then declares Android development “Kotlin-first.” Flutter brings one Dart codebase to iOS and Android."
      }
    ],
    langs: ["kotlin", "dart", "typescript", "elixir", "julia", "swift", "gdscript", "solidity", "rust", "zig"],
    machine: {
      name: "Raspberry Pi 3",
      year: "2016",
      specs: [
        ["CPU", "Quad-core 1.2 GHz ARM Cortex-A53"],
        ["Memory", "1 GB RAM"],
        ["Storage", "microSD card"],
        ["Price", "$35"]
      ],
      compare: "A credit-card-sized $35 computer that outperforms supercomputers from the 1980s."
    },
    day: "You open a pull request on GitHub, your tests run automatically in CI, and your code ships in a Docker container to the cloud. You build the same app for iPhone and Android, debug on a phone plugged into your laptop, and read docs, blog posts and Stack Overflow answers all day. Code review, agile stand-ups and continuous deployment are normal.",
    short: "Mobile",
    shortYears: "2010s",
    sources: [
      {
        t: "AlexNet — Wikipedia",
        u: "https://en.wikipedia.org/wiki/AlexNet"
      },
      {
        t: "Docker — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Docker_(software)"
      },
      {
        t: "Kubernetes overview (kubernetes.io)",
        u: "https://kubernetes.io/docs/concepts/overview/"
      },
      {
        t: "AlphaGo versus Lee Sedol — Wikipedia",
        u: "https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol"
      },
      {
        t: "Attention Is All You Need (arXiv)",
        u: "https://arxiv.org/abs/1706.03762"
      },
      {
        t: "Raspberry Pi 3 Model B",
        u: "https://www.raspberrypi.com/products/raspberry-pi-3-model-b/"
      },
      {
        t: "Pokémon Go — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Pok%C3%A9mon_Go"
      }
    ]
  },
  {
    id: "ai",
    n: "07",
    title: "The AI era",
    years: "2020–today",
    accent: "#b794ff",
    mood: "Large language models, coding assistants and AI agents",
    intro: "Large language models learn to read and write code. Tools like GitHub Copilot, ChatGPT and Claude become everyday coding partners, and AI agents start running commands, editing files and opening pull requests. Every language you learned on the way here still matters — AI makes people who understand code faster, but it can’t understand it for you.",
    breakthroughs: [
      {
        y: "2020",
        t: "GPT-3",
        d: "OpenAI shows that a large enough language model can write essays, answer questions and produce working code from plain-English descriptions."
      },
      {
        y: "2021",
        t: "GitHub Copilot",
        d: "AI autocomplete for whole functions appears inside code editors."
      },
      {
        y: "2022",
        t: "ChatGPT",
        d: "Released November 30, 2022, it becomes one of the fastest-growing apps ever and brings conversational AI to the public."
      },
      {
        y: "2023",
        t: "GPT-4, Claude and open models",
        d: "More capable models arrive from OpenAI and Anthropic, and Meta releases Llama, kicking off a wave of open-weight models."
      },
      {
        y: "2024",
        t: "Model Context Protocol",
        d: "Anthropic introduces MCP, an open standard for connecting AI models to tools and data sources."
      },
      {
        y: "2025–26",
        t: "AI coding agents",
        d: "AI agents that plan work, edit many files, run tests and open pull requests become part of normal development workflows."
      }
    ],
    tracks: [],
    langs: ["mojo", "gleam"],
    machine: {
      name: "NVIDIA H100 GPU",
      year: "2022",
      specs: [
        ["Memory", "80 GB of high-bandwidth memory"],
        ["Built for", "Training and running large AI models"],
        ["Scale", "Large models are trained on thousands of these at once"],
        ["Price", "Tens of thousands of dollars each"]
      ],
      compare: "One H100 has about 20 million times the memory of a 4 KB Apple II."
    },
    day: "You describe a feature to an AI assistant, review the plan it suggests, and let an agent draft code and tests in a branch. Your job shifts toward reading carefully, asking the right questions, catching subtle bugs and security issues, and deciding what to build. The fundamentals from every earlier era are what let you tell good AI output from confident nonsense.",
    short: "AI",
    shortYears: "2020s",
    sources: [
      {
        t: "Language Models are Few-Shot Learners (GPT-3 paper, arXiv)",
        u: "https://arxiv.org/abs/2005.14165"
      },
      {
        t: "GitHub Copilot",
        u: "https://github.com/features/copilot"
      },
      {
        t: "Introducing ChatGPT (OpenAI)",
        u: "https://openai.com/index/chatgpt/"
      },
      {
        t: "Introducing the Model Context Protocol (Anthropic)",
        u: "https://www.anthropic.com/news/model-context-protocol"
      },
      {
        t: "NVIDIA H100 Tensor Core GPU",
        u: "https://www.nvidia.com/en-us/data-center/h100/"
      },
      {
        t: "Llama (language model) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Llama_(language_model)"
      }
    ]
  }
];
