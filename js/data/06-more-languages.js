/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
CT.langs["algol"] = {
  id: "algol",
  name: "ALGOL 60",
  year: 1960,
  era: "mainframe",
  level: "classic",
  creator: "An international committee including John Backus and Peter Naur",
  org: "European and American computer scientists",
  paradigm: "Imperative, structured",
  typing: "Static",
  prism: "pascal",
  tags: ["science"],
  tagline: "The ancestor of nearly every language with blocks, scopes and begin/end — or curly braces.",
  story: [
    "ALGOL (ALGOrithmic Language) was designed by an international committee of European and American computer scientists. ALGOL 58 came first, but ALGOL 60 is the version that changed everything. It was designed to be a clean, machine-independent way to write algorithms.",
    "ALGOL 60 introduced ideas we now take for granted: code blocks with their own local variables, nested scopes, recursive procedures and a precise formal grammar. Its syntax was described using Backus–Naur Form (BNF), invented for the occasion and still used to define programming languages today.",
    "Commercially ALGOL never beat IBM-backed FORTRAN in the US, though it was popular in Europe, and for years it was the standard language for publishing algorithms in journals. Its real legacy is genetic: Pascal, Simula, C (through CPL, BCPL and B), Ada and, through them, Java, JavaScript and C# all descend from it."
  ],
  usedBy: [
    {
      who: "Burroughs",
      what: "The B5000 mainframe (1961) was designed to run ALGOL, and its operating system was written in an ALGOL dialect."
    },
    {
      who: "Academic journals",
      what: "Communications of the ACM published algorithms in ALGOL for years."
    },
    {
      who: "European universities",
      what: "Widely taught and used in Europe through the 1960s and 70s."
    }
  ],
  know: [
    "Blocks group statements with begin … end and can declare their own local variables.",
    "Assignment is := (Pascal kept it); = is comparison.",
    "for i := 1 step 1 until 10 do is ALGOL’s counting loop.",
    "ALGOL 60 had no standard input/output — every computer added its own, which made programs less portable than intended.",
    "BNF, the grammar notation first used for ALGOL, is still how language syntax is specified."
  ],
  examples: [
    {
      title: "Summing numbers in a block",
      code: `begin
  integer i, sum;
  sum := 0;
  for i := 1 step 1 until 10 do
    sum := sum + i;
  outinteger(1, sum)
end`,
      note: "outinteger is one implementation’s output procedure — ALGOL 60 left I/O to each machine."
    },
    {
      title: "A recursive procedure",
      code: `integer procedure factorial(n);
  value n; integer n;
begin
  if n <= 1 then factorial := 1
  else factorial := n * factorial(n - 1)
end`,
      note: "Recursion was controversial in 1960 — and ALGOL made it standard."
    },
    {
      title: "Backus–Naur Form (BNF), first used for ALGOL",
      code: `<digit>   ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
<integer> ::= <digit> | <integer> <digit>`,
      note: "Read it as: an integer is a digit, or an integer followed by a digit."
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What notation was first used to define ALGOL 60’s syntax?",
      options: ["UML", "BNF (Backus–Naur Form)", "JSON", "Regular expressions"],
      answer: 1,
      explain: "BNF was introduced to describe ALGOL 60 precisely."
    },
    {
      type: "mc",
      q: "Which of these ideas did ALGOL make mainstream?",
      options: ["Nested blocks with local variables", "Garbage collection", "Pointers", "Classes"],
      answer: 0,
      explain: "Block structure and lexical scope are ALGOL’s signature contribution."
    },
    {
      type: "mc",
      q: "Which modern feature descends from ALGOL’s begin … end?",
      options: [
        "Python decorators",
        "The { } blocks in C, Java and JavaScript",
        "SQL joins",
        "HTML tags"
      ],
      answer: 1,
      explain: "C’s braces play the same role as ALGOL’s begin and end."
    },
    {
      type: "mc",
      q: "Why were ALGOL 60 programs less portable than intended?",
      options: [
        "It only ran on IBM machines",
        "It had no standard input/output",
        "It required a GUI",
        "It used line numbers"
      ],
      answer: 1,
      explain: "Each implementation invented its own I/O procedures."
    }
  ],
  sources: [
    {
      t: "ALGOL 60 — Wikipedia",
      u: "https://en.wikipedia.org/wiki/ALGOL_60"
    },
    {
      t: "Revised Report on the Algorithmic Language ALGOL 60",
      u: "https://cseweb.ucsd.edu/~goguen/courses/130/algol60.html"
    },
    {
      t: "Backus–Naur form — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form"
    }
  ],
  facts: [
    {
      text: "Tony Hoare said ALGOL 60 was so far ahead of its time that it improved not only on its predecessors but on nearly all its successors.",
      src: {
        t: "ALGOL — Wikipedia",
        u: "https://en.wikipedia.org/wiki/ALGOL"
      }
    },
    {
      text: "ALGOL 60 was the first language described with BNF (Backus–Naur Form), the grammar notation still used for programming languages today.",
      src: {
        t: "Backus–Naur form — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form"
      }
    },
    {
      text: "The begin…end blocks in Pascal and the { } blocks in C, Java and JavaScript both descend from ALGOL’s block structure.",
      src: {
        t: "ALGOL — Wikipedia",
        u: "https://en.wikipedia.org/wiki/ALGOL"
      }
    }
  ],
  today: {
    status: "Retired",
    text: "Its ideas live on in almost every language you use."
  },
  learnIf: "you’re curious where modern syntax came from — read it, don’t ship it."
};

CT.langs["ada"] = {
  id: "ada",
  name: "Ada",
  year: 1980,
  era: "pc",
  level: "classic",
  creator: "Jean Ichbiah and team",
  org: "CII Honeywell Bull, for the US Department of Defense",
  paradigm: "Imperative, structured, object-oriented, concurrent",
  typing: "Static, very strong",
  prism: "ada",
  tags: ["systems", "science"],
  tagline: "Named after Ada Lovelace, built for software that must never fail — planes, trains and rockets.",
  story: [
    "By the 1970s the US Department of Defense was using hundreds of different programming languages, which made software expensive and unreliable. It held a competition to design one language for all its embedded and safety-critical systems. Jean Ichbiah’s team won, and the language was named Ada in honour of Ada Lovelace. Its standard number, MIL-STD-1815, is the year she was born.",
    "Ada was designed for reliability: very strong typing, range-checked numeric types, packages for modularity, exceptions, and built-in concurrency with tasks. Ada 95 became the first internationally standardised object-oriented language.",
    "Ada is still trusted where failure is not an option. The Boeing 777’s flight software was written mostly in Ada, and it is used in air traffic control, railways, satellites and defence. Its subset SPARK lets developers mathematically prove that code is free of certain bugs."
  ],
  usedBy: [
    {
      who: "US Department of Defense",
      what: "Commissioned Ada and required it on many projects in the 1980s and 90s."
    },
    {
      who: "Boeing & Airbus suppliers",
      what: "Flight control and avionics software, including most of the Boeing 777’s."
    },
    {
      who: "Railways & air traffic control",
      what: "Signalling and control systems in several countries."
    },
    {
      who: "NVIDIA",
      what: "Adopted SPARK for some security-critical firmware."
    }
  ],
  know: [
    "Assignment is := and statements end with ;.",
    "You can define numeric types with ranges: type Percent is range 0 .. 100; — assigning 150 raises Constraint_Error.",
    "Packages split code into a specification (the interface) and a body (the implementation).",
    "Attributes use an apostrophe: Score'Image(S) converts a value to text.",
    "Tasks and protected objects provide concurrency built into the language.",
    "The free GNAT compiler is part of GCC."
  ],
  examples: [
    {
      title: "Hello with a range-checked type",
      code: `with Ada.Text_IO; use Ada.Text_IO;

procedure Hello is
   type Score is range 0 .. 100;
   S : Score := 95;
begin
   Put_Line ("Hello from Ada!");
   Put_Line ("Score:" & Score'Image (S));   -- Score: 95
   S := S + 10;                             -- raises Constraint_Error at runtime
end Hello;`,
      note: ""
    },
    {
      title: "A package specification",
      code: `package Bank_Account is
   type Account is private;
   procedure Deposit (A : in out Account; Amount : Positive);
   function Balance (A : Account) return Natural;
private
   type Account is record
      Total : Natural := 0;
   end record;
end Bank_Account;`,
      note: "Positive and Natural are built-in subtypes: Natural can’t go below 0."
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What is special about Ada’s standard number MIL-STD-1815?",
      options: [
        "It’s the number of keywords",
        "It’s the year Ada Lovelace was born",
        "It’s the year the first computer was built",
        "It’s random"
      ],
      answer: 1,
      explain: "Lovelace was born in 1815."
    },
    {
      type: "mc",
      q: "What happens when you assign 150 to a variable of type range 0 .. 100?",
      options: [
        "It wraps to 49",
        "It’s silently clamped to 100",
        "Constraint_Error is raised",
        "Nothing"
      ],
      answer: 2,
      explain: "Ada checks ranges and raises an exception instead of corrupting data."
    },
    {
      type: "mc",
      q: "Where is Ada most commonly used?",
      options: [
        "Web front ends",
        "Safety-critical systems like avionics and rail",
        "Video editing apps",
        "Spreadsheets"
      ],
      answer: 1,
      explain: "Ada is built for software that must not fail."
    },
    {
      type: "mc",
      q: "What caused the 1996 Ariane 5 failure?",
      options: [
        "A hardware fire",
        "Reused code overflowed when converting a 64-bit number to 16 bits",
        "A virus",
        "A typo in a comment"
      ],
      answer: 1,
      explain: "Code reused from Ariane 4 wasn’t re-checked for the new rocket’s bigger values."
    },
    {
      type: "fill",
      q: "Complete the assignment operator.",
      code: "S ____ 42;",
      answers: [":="],
      explain: "Ada (like Pascal and ALGOL) uses := for assignment."
    }
  ],
  sources: [
    {
      t: "learn.adacore.com — free interactive Ada courses",
      u: "https://learn.adacore.com/"
    },
    {
      t: "Ada — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Ada_(programming_language)"
    },
    {
      t: "Ada Reference Manual",
      u: "http://www.ada-auth.org/standards/ada22.html"
    },
    {
      t: "Ariane flight V88 — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Ariane_flight_V88"
    }
  ],
  facts: [
    {
      text: "Ada’s military standard number, MIL-STD-1815, is the year Ada Lovelace was born.",
      src: {
        t: "Ada — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Ada_(programming_language)"
      }
    },
    {
      text: "The Boeing 777’s flight software was written mostly in Ada.",
      src: {
        t: "Ada — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Ada_(programming_language)"
      }
    },
    {
      text: "In 1996 the first Ariane 5 rocket self-destructed about 37 seconds after launch because reused code converted a 64-bit number into a 16-bit integer that overflowed.",
      src: {
        t: "Ariane flight V88 — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Ariane_flight_V88"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Aerospace, defence, rail and other safety-critical systems; SPARK for formally verified code."
  },
  learnIf: "you’re interested in safety-critical or high-assurance software."
};

CT.langs["haskell"] = {
  id: "haskell",
  name: "Haskell",
  year: 1990,
  era: "web",
  level: "core",
  creator: "A committee of researchers (including Simon Peyton Jones, Paul Hudak and Philip Wadler)",
  org: "Academic and industry researchers",
  paradigm: "Purely functional, lazy",
  typing: "Static, strong, inferred",
  prism: "haskell",
  tags: ["science", "data"],
  tagline: "Pure functions, lazy evaluation and a type system that inspired Swift, Rust and Kotlin.",
  story: [
    "In the late 1980s there were many small lazy functional languages and no common standard. A committee formed in 1987 to design one open language for research and teaching, and Haskell 1.0 appeared in 1990. It is named after the logician Haskell Curry.",
    "Haskell is purely functional: functions can’t change variables or do input/output as a side effect. Side effects are tracked in the type system (the famous IO monad), so the compiler knows which code is pure. It is also lazy — values are only computed when needed, so infinite lists are perfectly fine.",
    "Few companies use Haskell for everything, but its ideas are everywhere: type inference, algebraic data types (Rust and Swift enums), Maybe (Swift and Kotlin optionals, Rust’s Option), pattern matching and higher-order functions like map and filter. The GHC compiler is the main implementation."
  ],
  usedBy: [
    {
      who: "Meta",
      what: "Facebook rewrote Sigma, its system for fighting spam and abuse, in Haskell."
    },
    {
      who: "GitHub",
      what: "Its Semantic project for parsing and analysing code was written in Haskell."
    },
    {
      who: "Pandoc",
      what: "The universal document converter is written in Haskell."
    },
    {
      who: "Finance & blockchain",
      what: "Standard Chartered and the Cardano blockchain use Haskell or Haskell-based languages."
    }
  ],
  know: [
    "Function application has no parentheses: f x y calls f with x and y.",
    ":: reads as “has type”: add :: Int -> Int -> Int.",
    "Variables never change once defined.",
    "Pattern matching defines functions case by case.",
    "Maybe a represents a value that might be missing (Just x or Nothing) — no null.",
    "Laziness means expressions are only evaluated when their result is needed.",
    "do-notation sequences IO actions so programs can still read input and print output."
  ],
  examples: [
    {
      title: "Pattern matching, laziness and lists",
      code: `factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

evens :: [Integer]
evens = [x | x <- [0..], even x]   -- an infinite list

main :: IO ()
main = do
  print (factorial 20)               -- 2432902008176640000
  print (take 5 evens)               -- [0,2,4,6,8]
  print (map (* 2) [1, 2, 3])        -- [2,4,6]
  print (filter odd [1 .. 10])       -- [1,3,5,7,9]`,
      note: ""
    },
    {
      title: "Maybe instead of null",
      code: `safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv a b = Just (a \`div\` b)

describe :: Maybe Int -> String
describe Nothing  = "can't divide by zero"
describe (Just n) = "answer: " ++ show n

-- describe (safeDiv 10 2)  ==> "answer: 5"
-- describe (safeDiv 1 0)   ==> "can't divide by zero"`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `take 3 [1..]` return?",
      options: ["An infinite loop", "[1,2,3]", "An error", "[3]"],
      answer: 1,
      explain: "Laziness means only the first three elements of the infinite list are ever computed."
    },
    {
      type: "mc",
      q: "What does `::` mean in `add :: Int -> Int -> Int`?",
      options: ["Assignment", "“has type”", "List concatenation", "A comment"],
      answer: 1,
      explain: ":: gives a type signature."
    },
    {
      type: "mc",
      q: "How does Haskell represent a value that might be missing?",
      options: ["null", "Maybe (Just x or Nothing)", "undefined", "-1"],
      answer: 1,
      explain: "Maybe makes the possibility of “no value” explicit in the type."
    },
    {
      type: "mc",
      q: "Who is Haskell named after?",
      options: [
        "A programmer at Microsoft",
        "The logician Haskell Curry",
        "A town in Texas",
        "A Monty Python character"
      ],
      answer: 1,
      explain: "Curry also gives us the word “currying.”"
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["[1,2,3]", "[2,4,6]", "6", "[1,4,9]"],
      answer: 1,
      explain: "map applies (* 2) to each element.",
      code: "main = print (map (* 2) [1, 2, 3])"
    }
  ],
  sources: [
    {
      t: "haskell.org — get started",
      u: "https://www.haskell.org/get-started/"
    },
    {
      t: "Learn You a Haskell for Great Good! (free book)",
      u: "https://learnyouahaskell.com/"
    },
    {
      t: "Fighting spam with Haskell (Meta engineering)",
      u: "https://engineering.fb.com/2015/06/26/security/fighting-spam-with-haskell/"
    },
    {
      t: "Haskell — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Haskell"
    }
  ],
  facts: [
    {
      text: "Haskell is named after logician Haskell Curry — and so is “currying,” turning a multi-argument function into a chain of one-argument functions.",
      src: {
        t: "Haskell Curry — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Haskell_Curry"
      }
    },
    {
      text: "Because Haskell is lazy, take 5 [1..] works fine even though [1..] is an infinite list.",
      src: {
        t: "Learn You a Haskell",
        u: "https://learnyouahaskell.com/"
      }
    },
    {
      text: "Pandoc, the universal document converter used by writers and publishers, is written in Haskell.",
      src: {
        t: "Pandoc",
        u: "https://pandoc.org/"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Compilers, finance, blockchain, research and tools like Pandoc."
  },
  learnIf: "you want to master functional programming and types — ideas that now show up in Swift, Rust and Kotlin."
};

CT.langs["r"] = {
  id: "r",
  name: "R",
  year: 1993,
  era: "web",
  level: "core",
  creator: "Ross Ihaka and Robert Gentleman",
  org: "University of Auckland, New Zealand",
  paradigm: "Functional and array-based, for statistics",
  typing: "Dynamic",
  prism: "r",
  tags: ["data", "science", "ai"],
  tagline: "The statistician’s language — data frames, models and beautiful charts.",
  story: [
    "R grew out of S, a statistics language created by John Chambers at Bell Labs in the 1970s. In the early 1990s Ross Ihaka and Robert Gentleman at the University of Auckland built a free implementation inspired by it, first announced in 1993 and released as open source in 1995. The name comes from their first initials — and is a play on S.",
    "R is built around vectors and data frames (tables), so operations apply to whole columns at once. Thousands of statistical methods are available as packages on CRAN, and researchers often release a new statistical technique as an R package first.",
    "Hadley Wickham’s ggplot2 and the tidyverse made data analysis in R far friendlier, and RStudio (now Posit) gave it a polished IDE. R remains a favourite in universities, medicine, pharma and anywhere statistics matter."
  ],
  usedBy: [
    {
      who: "Pharma & medicine",
      what: "Clinical trial analysis; R is accepted in regulatory submissions."
    },
    {
      who: "Universities",
      what: "A standard tool in statistics, biology, psychology and economics research."
    },
    {
      who: "Microsoft",
      what: "Bought Revolution Analytics in 2015 and added R support to SQL Server and Power BI."
    },
    {
      who: "Posit (formerly RStudio)",
      what: "Builds the most popular R IDE and many core packages."
    }
  ],
  know: [
    "<- is the traditional assignment operator (= also works).",
    "Vectors are the basic unit: c(1, 2, 3) combines values into one, and maths applies to every element.",
    "Indexes start at 1.",
    "Data frames are tables; df$column pulls out a column.",
    "Install packages with install.packages(\"name\") and load them with library(name).",
    "The pipe |> (or %>% in the tidyverse) chains steps: data |> filter(...) |> summarise(...)."
  ],
  examples: [
    {
      title: "Vectors and filtering",
      code: `scores <- c(Ada = 92, Linus = 78, Grace = 88)

mean(scores)              # 86
scores[scores > 80]       # Ada 92, Grace 88
scores * 2                # every element doubled`,
      note: ""
    },
    {
      title: "Data frames and a chart with ggplot2",
      code: `library(ggplot2)

players <- data.frame(
  month  = 1:6,
  online = c(120, 180, 260, 240, 390, 510)
)

summary(players$online)

ggplot(players, aes(x = month, y = online)) +
  geom_line() +
  geom_point() +
  labs(title = "Players online per month")`,
      note: "Each + adds a layer — the “grammar of graphics.”"
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `mean(c(92, 78, 88))` return?",
      options: ["86", "258", "88", "78"],
      answer: 0,
      explain: "(92 + 78 + 88) / 3 = 86."
    },
    {
      type: "mc",
      q: "What is the traditional assignment operator in R?",
      options: ["=", ":=", "<-", "->>"],
      answer: 2,
      explain: "x <- 5 is idiomatic R."
    },
    {
      type: "mc",
      q: "What does `c(1, 2, 3) * 2` produce?",
      options: ["c(1, 2, 3, 1, 2, 3)", "c(2, 4, 6)", "12", "An error"],
      answer: 1,
      explain: "Arithmetic is vectorised — it applies to every element."
    },
    {
      type: "mc",
      q: "Where does R’s name come from?",
      options: [
        "Random",
        "Its creators’ first initials, and a play on the S language",
        "Regression",
        "Ruby"
      ],
      answer: 1,
      explain: "Ross Ihaka and Robert Gentleman."
    },
    {
      type: "fill",
      q: "Complete the code to load the ggplot2 package.",
      code: "____(ggplot2)",
      answers: ["library"],
      explain: "library() loads an installed package."
    }
  ],
  sources: [
    {
      t: "R for Data Science (free book)",
      u: "https://r4ds.hadley.nz/"
    },
    {
      t: "The R Project",
      u: "https://www.r-project.org/"
    },
    {
      t: "CRAN — R packages",
      u: "https://cran.r-project.org/"
    },
    {
      t: "ggplot2",
      u: "https://ggplot2.tidyverse.org/"
    },
    {
      t: "R — Wikipedia",
      u: "https://en.wikipedia.org/wiki/R_(programming_language)"
    }
  ],
  facts: [
    {
      text: "R is named after its creators, Ross Ihaka and Robert Gentleman — and as a play on its ancestor, the S language.",
      src: {
        t: "R — Wikipedia",
        u: "https://en.wikipedia.org/wiki/R_(programming_language)"
      }
    },
    {
      text: "CRAN, R’s package archive, hosts over 20,000 packages.",
      src: {
        t: "CRAN packages",
        u: "https://cran.r-project.org/web/packages/"
      }
    },
    {
      text: "ggplot2 is based on Leland Wilkinson’s book The Grammar of Graphics, which treats charts as layers you can combine.",
      src: {
        t: "ggplot2",
        u: "https://ggplot2.tidyverse.org/"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Statistics, academic research, bioinformatics, pharma and data analysis."
  },
  learnIf: "you’re heading into statistics, research or data analysis."
};
