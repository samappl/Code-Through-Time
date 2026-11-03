/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
CT.people = [
  {
    id: "lovelace",
    name: "Ada Lovelace",
    years: "1815–1852",
    era: "dawn",
    role: "The first programmer",
    bio: "Wrote what is widely considered the first published algorithm for a machine — Babbage’s Analytical Engine — and imagined computers working with music and symbols, not just numbers.",
    langs: ["ada"],
    src: {
      t: "Ada Lovelace — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Ada_Lovelace"
    }
  },
  {
    id: "turing",
    name: "Alan Turing",
    years: "1912–1954",
    era: "dawn",
    role: "Father of computer science",
    bio: "Defined computation with the Turing machine, helped break Enigma codes in World War II, and proposed the Turing test for machine intelligence.",
    langs: [],
    src: {
      t: "Alan Turing — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Alan_Turing"
    }
  },
  {
    id: "hopper",
    name: "Grace Hopper",
    years: "1906–1992",
    era: "dawn",
    role: "Compiler pioneer",
    bio: "Built the A-0 compiler, created FLOW-MATIC and shaped COBOL. A US Navy rear admiral famous for explaining a nanosecond with a foot-long piece of wire.",
    langs: ["cobol"],
    src: {
      t: "Grace Hopper — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Grace_Hopper"
    }
  },
  {
    id: "booth",
    name: "Kathleen Booth",
    years: "1922–2022",
    era: "dawn",
    role: "Assembly language inventor",
    bio: "Credited with designing the first assembly language for the ARC computer at Birkbeck College in 1947.",
    langs: ["assembly"],
    src: {
      t: "Kathleen Booth — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Kathleen_Booth"
    }
  },
  {
    id: "backus",
    name: "John Backus",
    years: "1924–2007",
    era: "dawn",
    role: "Creator of Fortran",
    bio: "Led the IBM team that built Fortran and co-created Backus–Naur Form, used to describe programming-language grammars.",
    langs: ["fortran", "algol"],
    src: {
      t: "John Backus — Wikipedia",
      u: "https://en.wikipedia.org/wiki/John_Backus"
    }
  },
  {
    id: "mccarthy",
    name: "John McCarthy",
    years: "1927–2011",
    era: "dawn",
    role: "Coined “artificial intelligence”",
    bio: "Created Lisp, invented garbage collection and organised the 1956 Dartmouth workshop that launched AI as a field.",
    langs: ["lisp"],
    src: {
      t: "John McCarthy — Wikipedia",
      u: "https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)"
    }
  },
  {
    id: "hamilton",
    name: "Margaret Hamilton",
    years: "born 1936",
    era: "mainframe",
    role: "Apollo software lead",
    bio: "Led the MIT team that wrote the Apollo guidance software and helped establish “software engineering” as a discipline.",
    langs: ["assembly"],
    src: {
      t: "Margaret Hamilton — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)"
    }
  },
  {
    id: "ritchie",
    name: "Dennis Ritchie",
    years: "1941–2011",
    era: "mainframe",
    role: "Creator of C, co-creator of Unix",
    bio: "Designed C at Bell Labs and, with Ken Thompson, built Unix — the foundation of Linux, macOS, iOS and Android.",
    langs: ["c"],
    src: {
      t: "Dennis Ritchie — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Dennis_Ritchie"
    }
  },
  {
    id: "thompson",
    name: "Ken Thompson",
    years: "born 1943",
    era: "mainframe",
    role: "Unix, B and Go",
    bio: "Co-created Unix and the B language at Bell Labs, and decades later co-designed Go at Google.",
    langs: ["c", "go"],
    src: {
      t: "Ken Thompson — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Ken_Thompson"
    }
  },
  {
    id: "kay",
    name: "Alan Kay",
    years: "born 1940",
    era: "mainframe",
    role: "Object-oriented pioneer",
    bio: "Led Smalltalk at Xerox PARC, coined “object-oriented” and imagined the Dynabook tablet in 1972.",
    langs: ["smalltalk"],
    src: {
      t: "Alan Kay — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Alan_Kay"
    }
  },
  {
    id: "goldberg",
    name: "Adele Goldberg",
    years: "born 1945",
    era: "mainframe",
    role: "Smalltalk co-developer",
    bio: "Co-developed Smalltalk-80 at Xerox PARC and co-wrote the books that brought it to the world.",
    langs: ["smalltalk"],
    src: {
      t: "Adele Goldberg — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
    }
  },
  {
    id: "wirth",
    name: "Niklaus Wirth",
    years: "1934–2024",
    era: "mainframe",
    role: "Creator of Pascal",
    bio: "Designed Pascal, Modula-2 and Oberon, championing simple, structured languages for teaching.",
    langs: ["pascal"],
    src: {
      t: "Niklaus Wirth — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Niklaus_Wirth"
    }
  },
  {
    id: "liskov",
    name: "Barbara Liskov",
    years: "born 1939",
    era: "mainframe",
    role: "Abstraction pioneer",
    bio: "Created the CLU language and data abstraction ideas behind modern classes; the Liskov substitution principle is named after her. Turing Award 2008.",
    langs: [],
    src: {
      t: "Barbara Liskov — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Barbara_Liskov"
    }
  },
  {
    id: "stroustrup",
    name: "Bjarne Stroustrup",
    years: "born 1950",
    era: "pc",
    role: "Creator of C++",
    bio: "Added classes to C at Bell Labs, creating C++ — still the language of game engines, browsers and high-performance software.",
    langs: ["cpp"],
    src: {
      t: "Bjarne Stroustrup — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Bjarne_Stroustrup"
    }
  },
  {
    id: "berners-lee",
    name: "Tim Berners-Lee",
    years: "born 1955",
    era: "pc",
    role: "Inventor of the World Wide Web",
    bio: "Proposed the Web at CERN in 1989 and built the first browser, server and HTML.",
    langs: ["html", "objc"],
    src: {
      t: "Tim Berners-Lee — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Tim_Berners-Lee"
    }
  },
  {
    id: "torvalds",
    name: "Linus Torvalds",
    years: "born 1969",
    era: "web",
    role: "Creator of Linux and Git",
    bio: "Started the Linux kernel as a student in 1991 and wrote Git in 2005.",
    langs: ["c"],
    src: {
      t: "Linus Torvalds — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Linus_Torvalds"
    }
  },
  {
    id: "vanrossum",
    name: "Guido van Rossum",
    years: "born 1956",
    era: "web",
    role: "Creator of Python",
    bio: "Released Python in 1991 and led it for nearly 30 years as its “Benevolent Dictator For Life.”",
    langs: ["python"],
    src: {
      t: "Guido van Rossum — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Guido_van_Rossum"
    }
  },
  {
    id: "gosling",
    name: "James Gosling",
    years: "born 1955",
    era: "web",
    role: "Creator of Java",
    bio: "Led the Sun Microsystems team that created Java and its “write once, run anywhere” virtual machine.",
    langs: ["java"],
    src: {
      t: "James Gosling — Wikipedia",
      u: "https://en.wikipedia.org/wiki/James_Gosling"
    }
  },
  {
    id: "eich",
    name: "Brendan Eich",
    years: "born 1961",
    era: "web",
    role: "Creator of JavaScript",
    bio: "Wrote the first version of JavaScript for Netscape in about ten days in 1995.",
    langs: ["javascript"],
    src: {
      t: "Brendan Eich — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Brendan_Eich"
    }
  },
  {
    id: "matsumoto",
    name: "Yukihiro “Matz” Matsumoto",
    years: "born 1965",
    era: "web",
    role: "Creator of Ruby",
    bio: "Designed Ruby around programmer happiness, released in Japan in 1995.",
    langs: ["ruby"],
    src: {
      t: "Yukihiro Matsumoto — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Yukihiro_Matsumoto"
    }
  },
  {
    id: "hejlsberg",
    name: "Anders Hejlsberg",
    years: "born 1960",
    era: "platform",
    role: "Turbo Pascal, Delphi, C#, TypeScript",
    bio: "One of the most successful language designers ever, across four decades of tools.",
    langs: ["pascal", "csharp", "typescript"],
    src: {
      t: "Anders Hejlsberg — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Anders_Hejlsberg"
    }
  },
  {
    id: "lattner",
    name: "Chris Lattner",
    years: "born 1978",
    era: "mobile",
    role: "LLVM, Swift and Mojo",
    bio: "Created the LLVM compiler infrastructure, then Swift at Apple and Mojo at Modular.",
    langs: ["swift", "mojo"],
    src: {
      t: "Chris Lattner — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Chris_Lattner"
    }
  },
  {
    id: "feifeili",
    name: "Fei-Fei Li",
    years: "born 1976",
    era: "mobile",
    role: "Creator of ImageNet",
    bio: "Led the ImageNet dataset project, whose 2012 competition win by AlexNet launched the deep-learning boom.",
    langs: [],
    src: {
      t: "Fei-Fei Li — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Fei-Fei_Li"
    }
  },
  {
    id: "hinton",
    name: "Geoffrey Hinton",
    years: "born 1947",
    era: "ai",
    role: "“Godfather of deep learning”",
    bio: "Helped popularise backpropagation and co-created AlexNet. Turing Award 2018 and Nobel Prize in Physics 2024.",
    langs: [],
    src: {
      t: "Geoffrey Hinton — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Geoffrey_Hinton"
    }
  }
];

CT.glossary = [
  {
    term: "Algorithm",
    text: "A precise, step-by-step set of instructions for solving a problem."
  },
  {
    term: "API",
    text: "Application Programming Interface — a defined way for one program to ask another for data or actions."
  },
  {
    term: "Assembler",
    text: "A program that turns assembly mnemonics like MOV into machine code.",
    see: "assembly"
  },
  {
    term: "Async / await",
    text: "Syntax for writing code that waits for slow work (network, disk) without freezing everything else.",
    see: "javascript"
  },
  {
    term: "Back end",
    text: "The server side of an app: databases, business logic and APIs."
  },
  {
    term: "Big O notation",
    text: "A way to describe how an algorithm’s time or memory grows as the input gets bigger, like O(n) or O(n²)."
  },
  {
    term: "Bytecode",
    text: "Compact instructions for a virtual machine rather than a real CPU, such as Java’s .class files.",
    see: "java"
  },
  {
    term: "CI/CD",
    text: "Continuous integration and delivery: automatically building, testing and deploying code on every change."
  },
  {
    term: "Class",
    text: "A blueprint for creating objects with shared data and behaviour."
  },
  {
    term: "Closure",
    text: "A function that remembers the variables from the place it was created.",
    see: "javascript"
  },
  {
    term: "Compiler",
    text: "A program that translates source code into a lower-level form (machine code or bytecode) before it runs.",
    see: "fortran"
  },
  {
    term: "Concurrency",
    text: "Structuring a program so several tasks can make progress at overlapping times.",
    see: "go"
  },
  {
    term: "Container",
    text: "A packaged app with everything it needs to run, isolated from the rest of the system (for example with Docker)."
  },
  {
    term: "Dynamic typing",
    text: "Types are checked while the program runs, so a variable can hold different kinds of values.",
    see: "python"
  },
  {
    term: "Embedding",
    text: "A list of numbers that represents the meaning of text, images or other data for AI models."
  },
  {
    term: "Framework",
    text: "A large structure of code you build inside of, which calls your code (React, Rails, Django)."
  },
  {
    term: "Front end",
    text: "The part of an app people see and interact with, usually in a browser or on a phone."
  },
  {
    term: "Functional programming",
    text: "A style built on pure functions and immutable data rather than changing state.",
    see: "haskell"
  },
  {
    term: "Garbage collection",
    text: "Automatic freeing of memory that a program no longer uses.",
    see: "lisp"
  },
  {
    term: "Git",
    text: "The most widely used version-control system, for tracking changes and collaborating."
  },
  {
    term: "Gradient descent",
    text: "Training method that repeatedly nudges a model’s weights in the direction that reduces its error."
  },
  {
    term: "Hallucination",
    text: "When an AI model produces confident-sounding information that is false."
  },
  {
    term: "Heap",
    text: "Memory for data whose size or lifetime isn’t known in advance; must be freed manually in C.",
    see: "c"
  },
  {
    term: "IDE",
    text: "Integrated Development Environment — an editor with debugging, running and code intelligence built in."
  },
  {
    term: "Immutable",
    text: "A value that can’t be changed after it’s created."
  },
  {
    term: "Interpreter",
    text: "A program that runs source code directly, line by line, instead of compiling it first.",
    see: "python"
  },
  {
    term: "JIT compiler",
    text: "Just-in-time compiler: compiles code while the program runs, for speed.",
    see: "julia"
  },
  {
    term: "JSON",
    text: "JavaScript Object Notation — a simple text format for data, used by most web APIs."
  },
  {
    term: "Library",
    text: "Reusable code you call from your program (the opposite of a framework, which calls you)."
  },
  {
    term: "LLM",
    text: "Large language model — an AI trained on huge amounts of text to predict the next token."
  },
  {
    term: "Memory safety",
    text: "Protection against bugs like buffer overflows and use-after-free.",
    see: "rust"
  },
  {
    term: "Null",
    text: "A special value meaning “nothing”; a frequent source of crashes, which is why Swift, Kotlin and Rust handle it carefully.",
    see: "kotlin"
  },
  {
    term: "Object-oriented programming",
    text: "A style that organises code into objects combining data and the functions that act on it.",
    see: "smalltalk"
  },
  {
    term: "Open source",
    text: "Software whose source code anyone can read, modify and share under its licence."
  },
  {
    term: "Overfitting",
    text: "When a model memorises its training data and performs badly on new data."
  },
  {
    term: "Package manager",
    text: "A tool that installs and updates libraries for you (npm, pip, Cargo, NuGet)."
  },
  {
    term: "Pointer",
    text: "A variable that stores a memory address.",
    see: "c"
  },
  {
    term: "Prompt injection",
    text: "Hidden instructions in content an AI reads that try to hijack its behaviour."
  },
  {
    term: "Pull request",
    text: "A proposal to merge your code changes into a project, usually reviewed by others."
  },
  {
    term: "Recursion",
    text: "When a function calls itself to solve a smaller version of the same problem.",
    see: "lisp"
  },
  {
    term: "Regular expression",
    text: "A pattern language for searching and matching text.",
    see: "perl"
  },
  {
    term: "REST",
    text: "A common style for web APIs using URLs and HTTP methods like GET and POST."
  },
  {
    term: "Runtime",
    text: "The environment that runs your program, such as the JVM, Node.js or the BEAM."
  },
  {
    term: "SQL injection",
    text: "An attack where user input is treated as SQL code; prevented with parameterised queries.",
    see: "sql"
  },
  {
    term: "Stack",
    text: "Fast memory for function calls and local variables; freed automatically when a function returns."
  },
  {
    term: "Static typing",
    text: "Types are checked before the program runs, catching many mistakes early.",
    see: "typescript"
  },
  {
    term: "Syntax",
    text: "The rules for how code must be written; semantics is what it means."
  },
  {
    term: "Token",
    text: "A chunk of text an AI model reads or writes — often a word or part of a word."
  },
  {
    term: "Transformer",
    text: "The neural network architecture behind modern LLMs, introduced in 2017."
  },
  {
    term: "Version control",
    text: "Tracking every change to code so you can review history and undo mistakes."
  },
  {
    term: "Virtual machine",
    text: "Software that pretends to be a computer, running bytecode on any real hardware.",
    see: "java"
  },
  {
    term: "XSS",
    text: "Cross-site scripting — injecting malicious scripts into web pages; prevented by escaping output.",
    see: "php"
  }
];

CT.challenges = {
  javascript: [
    {
      id: "js-sum",
      title: "Sum an array",
      prompt: "Write sumArray(nums) that returns the total of an array of numbers. An empty array should return 0.",
      fn: "sumArray",
      starter: `function sumArray(nums) {
  // your code here
}`,
      tests: [
        [
          [
            [1, 2, 3]
          ],
          6
        ],
        [
          [
            []
          ],
          0
        ],
        [
          [
            [-5, 5, 10]
          ],
          10
        ]
      ],
      hint: "Try reduce: nums.reduce((total, n) => total + n, 0)",
      solution: `function sumArray(nums) {
  return nums.reduce((total, n) => total + n, 0);
}`
    },
    {
      id: "js-palindrome",
      title: "Palindrome checker",
      prompt: "Write isPalindrome(text) that returns true if the text reads the same forwards and backwards, ignoring case and anything that isn’t a letter or number.",
      fn: "isPalindrome",
      starter: `function isPalindrome(text) {
  // your code here
}`,
      tests: [
        [
          ["Racecar"],
          true
        ],
        [
          ["hello"],
          false
        ],
        [
          ["A man, a plan, a canal: Panama"],
          true
        ]
      ],
      hint: "Clean the text with toLowerCase() and replace(/[^a-z0-9]/g, \"\"), then compare it with its reverse.",
      solution: `function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === [...clean].reverse().join("");
}`
    },
    {
      id: "js-fizzbuzz",
      title: "FizzBuzz",
      prompt: "Write fizzBuzz(n) that returns an array of strings from 1 to n, but multiples of 3 are \"Fizz\", multiples of 5 are \"Buzz\", and multiples of both are \"FizzBuzz\".",
      fn: "fizzBuzz",
      starter: `function fizzBuzz(n) {
  const out = [];
  // your code here
  return out;
}`,
      tests: [
        [
          [5],
          ["1", "2", "Fizz", "4", "Buzz"]
        ],
        [
          [15],
          ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
        ]
      ],
      hint: "Check 15 first, then 3, then 5 — and convert numbers with String(i).",
      solution: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out;
}`
    },
    {
      id: "js-words",
      title: "Count the words",
      prompt: "Write countWords(text) that returns an object counting how many times each word appears. Treat words case-insensitively and split on spaces.",
      fn: "countWords",
      starter: `function countWords(text) {
  const counts = {};
  // your code here
  return counts;
}`,
      tests: [
        [
          ["the cat the hat"],
          {
            the: 2,
            cat: 1,
            hat: 1
          }
        ],
        [
          ["Go go GO"],
          {
            go: 3
          }
        ]
      ],
      hint: "Loop over text.toLowerCase().split(\" \") and use counts[word] = (counts[word] || 0) + 1.",
      solution: `function countWords(text) {
  const counts = {};
  for (const word of text.toLowerCase().split(" ")) {
    if (word) counts[word] = (counts[word] || 0) + 1;
  }
  return counts;
}`
    }
  ],
  python: [
    {
      id: "py-average",
      title: "Average",
      prompt: "Write average(nums) that returns the mean of a list of numbers, or 0 for an empty list.",
      fn: "average",
      starter: `def average(nums):
    # your code here
    pass`,
      tests: [
        [
          [
            [2, 4, 6]
          ],
          4
        ],
        [
          [
            []
          ],
          0
        ],
        [
          [
            [1, 2]
          ],
          1.5
        ]
      ],
      hint: "sum(nums) / len(nums) — but check for an empty list first.",
      solution: `def average(nums):
    if not nums:
        return 0
    return sum(nums) / len(nums)`
    },
    {
      id: "py-reverse-words",
      title: "Reverse the words",
      prompt: "Write reverse_words(sentence) that returns the words in reverse order: \"hello big world\" becomes \"world big hello\".",
      fn: "reverse_words",
      starter: `def reverse_words(sentence):
    # your code here
    pass`,
      tests: [
        [
          ["hello big world"],
          "world big hello"
        ],
        [
          ["python"],
          "python"
        ]
      ],
      hint: "Split into a list, reverse it with [::-1], then join it back with spaces.",
      solution: `def reverse_words(sentence):
    return " ".join(sentence.split()[::-1])`
    },
    {
      id: "py-fizzbuzz",
      title: "FizzBuzz",
      prompt: "Write fizzbuzz(n) that returns a list of strings from 1 to n with \"Fizz\" for multiples of 3, \"Buzz\" for multiples of 5 and \"FizzBuzz\" for both.",
      fn: "fizzbuzz",
      starter: `def fizzbuzz(n):
    out = []
    # your code here
    return out`,
      tests: [
        [
          [5],
          ["1", "2", "Fizz", "4", "Buzz"]
        ],
        [
          [15],
          ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
        ]
      ],
      hint: "Use range(1, n + 1) and check i % 15 first.",
      solution: `def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out`
    },
    {
      id: "py-words",
      title: "Count the words",
      prompt: "Write word_counts(text) that returns a dict counting each word, case-insensitively.",
      fn: "word_counts",
      starter: `def word_counts(text):
    counts = {}
    # your code here
    return counts`,
      tests: [
        [
          ["the cat the hat"],
          {
            the: 2,
            cat: 1,
            hat: 1
          }
        ],
        [
          ["Go go GO"],
          {
            go: 3
          }
        ]
      ],
      hint: "Loop over text.lower().split() and use counts.get(word, 0) + 1 — or collections.Counter.",
      solution: `def word_counts(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts`
    }
  ]
};
