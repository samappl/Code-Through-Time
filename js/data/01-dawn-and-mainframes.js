/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
CT.langs["assembly"] = {
  id: "assembly",
  name: "Assembly",
  year: 1947,
  era: "dawn",
  level: "classic",
  creator: "Kathleen Booth (credited with the first assembly language)",
  org: "Birkbeck College, London",
  paradigm: "Imperative, low-level",
  typing: "None — you work with raw bytes and registers",
  prism: "nasm",
  tags: ["systems", "games"],
  tagline: "Human-readable names for the CPU’s own instructions.",
  story: [
    "A CPU only understands machine code: numbers like 10111000. Assembly language gives every instruction a short name (a mnemonic) like MOV, ADD or JMP, and an assembler program converts those names back into numbers. Kathleen Booth is credited with designing the first assembly language for the ARC computer in 1947, and EDSAC’s “initial orders” in 1949 made the idea practical.",
    "There isn’t one assembly language — there is one per processor family. x86 assembly (Intel and AMD) is different from ARM assembly (your phone, Apple Silicon Macs) and from 6502 assembly (Apple II, Commodore 64, NES). Until the 1990s most games and operating systems were written largely in assembly because memory was tiny and every cycle counted.",
    "Today almost nobody writes whole programs in assembly, but it still matters: compilers produce it, security researchers read it to reverse-engineer malware, and performance-critical parts of video codecs, crypto libraries and game engines are still hand-tuned in it."
  ],
  usedBy: [
    {
      who: "Microsoft",
      what: "Altair BASIC (1975), Microsoft’s first product, was written in Intel 8080 assembly by Bill Gates, Paul Allen and Monte Davidoff."
    },
    {
      who: "Apple",
      what: "Steve Wozniak wrote the Apple I and Apple II system software in 6502 assembly; much of the original 1984 Macintosh was 68000 assembly."
    },
    {
      who: "Nintendo & Atari",
      what: "Atari 2600 and NES games were written almost entirely in 6502 assembly."
    },
    {
      who: "NASA",
      what: "The Apollo Guidance Computer software that landed on the Moon was written in AGC assembly."
    },
    {
      who: "Chris Sawyer",
      what: "RollerCoaster Tycoon (1999) was written almost entirely in x86 assembly by one person."
    }
  ],
  know: [
    "Registers are tiny, ultra-fast storage slots inside the CPU (e.g. rax, rbx on x86-64). Most instructions work on registers.",
    "Each line is usually one instruction: an opcode plus operands, like mov rax, 1.",
    "There are no variables, loops or if statements — just jumps (JMP, JE, JNE) based on flags set by comparisons.",
    "The stack (PUSH/POP) is how functions save data and return addresses.",
    "System calls (syscall on Linux x86-64, int 0x80 on old 32-bit Linux) are how a program asks the operating system to do things like print text.",
    "Learning a little assembly makes you understand pointers, memory, performance and security bugs much better in every other language."
  ],
  examples: [
    {
      title: "Hello, world — x86-64 Linux (NASM syntax)",
      code: `section .data
    msg db "Hello, World!", 10   ; the text plus a newline (ASCII 10)
    len equ $ - msg              ; length = current address - start of msg

section .text
    global _start
_start:
    mov rax, 1        ; system call number 1 = write
    mov rdi, 1        ; file descriptor 1 = standard output
    mov rsi, msg      ; address of the text
    mov rdx, len      ; how many bytes to write
    syscall           ; ask the Linux kernel to do it

    mov rax, 60       ; system call 60 = exit
    xor rdi, rdi      ; exit code 0 (xor with itself is a fast way to zero)
    syscall`,
      note: "Build with: nasm -f elf64 hello.asm && ld hello.o -o hello && ./hello"
    },
    {
      title: "A loop: add the numbers 1 to 10",
      code: `    mov rcx, 10       ; counter
    xor rax, rax      ; total = 0
add_loop:
    add rax, rcx      ; total += counter
    dec rcx           ; counter -= 1
    jnz add_loop      ; jump back if counter is not zero
    ; rax now holds 55`,
      note: "Loops are just labels and conditional jumps."
    },
    {
      title: "6502 assembly — the language of the NES and Commodore 64",
      code: `    LDA #$01     ; load the value 1 into the accumulator
    STA $0200    ; store it at memory address $0200 (a screen pixel in Easy6502)
    LDX #$05     ; load 5 into the X register
loop:
    DEX          ; X = X - 1
    BNE loop     ; branch back while X is not zero
    BRK          ; stop`,
      note: "The # means “this exact number”; $ means hexadecimal."
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does an assembler do?",
      options: [
        "Runs Python scripts",
        "Converts mnemonics like MOV into machine code",
        "Manages computer memory automatically",
        "Translates assembly into C"
      ],
      answer: 1,
      explain: "An assembler is a translator from human-readable instruction names into the binary opcodes a CPU executes."
    },
    {
      type: "mc",
      q: "In the x86-64 example, what does `syscall` do?",
      options: [
        "Calls a C function",
        "Restarts the CPU",
        "Asks the operating system kernel to perform a service",
        "Prints a newline"
      ],
      answer: 2,
      explain: "The syscall instruction hands control to the kernel, which reads rax to decide which service (write, exit…) you want."
    },
    {
      type: "mc",
      q: "Why is there a different assembly language for x86, ARM and 6502?",
      options: [
        "Different companies like different names",
        "Each processor family has its own instruction set",
        "Assembly is just a dialect of C",
        "Only x86 has real assembly"
      ],
      answer: 1,
      explain: "Assembly maps almost one-to-one to a CPU’s instruction set, so each processor architecture has its own."
    },
    {
      type: "mc",
      q: "After this runs, what is in rax?",
      options: ["10", "45", "55", "0"],
      answer: 2,
      explain: "The loop adds 10+9+…+1 = 55 before rcx reaches zero.",
      code: `    mov rcx, 10
    xor rax, rax
add_loop:
    add rax, rcx
    dec rcx
    jnz add_loop`
    },
    {
      type: "fill",
      q: "Complete the instruction that sets rdi to zero using a common fast trick.",
      code: "____ rdi, rdi",
      answers: ["xor"],
      explain: "XOR-ing a register with itself always produces 0 and is a tiny, fast instruction.",
      ci: true
    }
  ],
  sources: [
    {
      t: "Assembly language — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Assembly_language"
    },
    {
      t: "NASM documentation",
      u: "https://www.nasm.us/doc/"
    },
    {
      t: "Easy 6502 — write 6502 assembly in your browser",
      u: "https://skilldrick.github.io/easy6502/"
    },
    {
      t: "Apollo 11 guidance computer source code (GitHub)",
      u: "https://github.com/chrislgarry/Apollo-11"
    },
    {
      t: "Compiler Explorer — see the assembly your code compiles to",
      u: "https://godbolt.org/"
    }
  ],
  facts: [
    {
      text: "Chris Sawyer wrote about 99% of RollerCoaster Tycoon (1999) in x86 assembly, which is a big reason it ran so smoothly on modest PCs.",
      src: {
        t: "RollerCoaster Tycoon — Wikipedia",
        u: "https://en.wikipedia.org/wiki/RollerCoaster_Tycoon_(video_game)"
      }
    },
    {
      text: "The Apollo Guidance Computer had just 2,048 words of erasable memory. Its programs were stored in “core rope memory” — wires threaded by hand through or around tiny magnetic rings to make 1s and 0s.",
      src: {
        t: "Core rope memory — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Core_rope_memory"
      }
    },
    {
      text: "Some instruction names are jokes in disguise: IBM’s PowerPC really has an instruction called EIEIO (Enforce In-order Execution of I/O).",
      src: {
        t: "Enforce In-order Execution of I/O — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Enforce_In-order_Execution_of_I/O"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Firmware, bootloaders, compilers, reverse engineering, and the hottest loops in video codecs and crypto libraries."
  },
  learnIf: "you want to understand how computers really work, or you’re heading into security, embedded systems or reverse engineering."
};

CT.langs["fortran"] = {
  id: "fortran",
  name: "Fortran",
  year: 1957,
  era: "dawn",
  level: "classic",
  creator: "John Backus and team",
  org: "IBM",
  paradigm: "Imperative, procedural, array-oriented",
  typing: "Static",
  prism: "fortran",
  tags: ["science"],
  tagline: "The first widely used high-level language, built for scientists and engineers.",
  story: [
    "FORTRAN — short for FORmula TRANslation — was developed at IBM by John Backus’s team for the IBM 704 and delivered in 1957. Programmers at the time believed a compiler could never produce code as fast as hand-written assembly. The team spent years on optimisation to prove them wrong, and they did.",
    "Early FORTRAN was written on punch cards with strict column rules: columns 1–5 for statement labels, column 6 for continuation, and code in columns 7–72. Modern Fortran (Fortran 90 and later) dropped those rules and added free-form source, modules, array operations and even object-oriented features.",
    "Fortran is still used heavily in high-performance computing. Weather and climate models, physics simulations and the LINPACK benchmark used to rank supercomputers have deep Fortran roots."
  ],
  usedBy: [
    {
      who: "IBM",
      what: "Created Fortran to sell more IBM 704 computers to scientific customers."
    },
    {
      who: "NASA & national labs",
      what: "Orbital mechanics, fluid dynamics and nuclear physics codes, many still maintained today."
    },
    {
      who: "Weather services",
      what: "Many large weather and climate models are still written largely in Fortran."
    }
  ],
  know: [
    "Arrays start at index 1 by default, not 0.",
    "implicit none turns off an old rule where variables starting with I–N were automatically integers. Always use it.",
    "Fortran is case-insensitive: PRINT, print and Print are the same.",
    "Whole-array maths is built in: c = a + b adds two arrays element by element.",
    "It remains one of the fastest languages for number crunching, and modern compilers can parallelise it automatically."
  ],
  examples: [
    {
      title: "Modern Fortran: sum a loop",
      code: `program hello
  implicit none
  integer :: i
  real :: total = 0.0

  do i = 1, 10
     total = total + i
  end do

  print *, 'Sum of 1..10 =', total
end program hello`,
      note: "print * means “print with the default format.”"
    },
    {
      title: "Array operations without a loop",
      code: `program arrays
  implicit none
  real :: a(5) = [1.0, 2.0, 3.0, 4.0, 5.0]
  real :: b(5)

  b = a * 2.0              ! multiply every element
  print *, b               ! 2.0 4.0 6.0 8.0 10.0
  print *, sum(b), maxval(b)
end program arrays`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does FORTRAN stand for?",
      options: [
        "Formal Translation",
        "Formula Translation",
        "Fortified Runtime",
        "Fortune Transmission"
      ],
      answer: 1,
      explain: "FORmula TRANslation: it let scientists write maths-like formulas instead of machine instructions."
    },
    {
      type: "mc",
      q: "Which company created Fortran?",
      options: ["Microsoft", "Bell Labs", "IBM", "Apple"],
      answer: 2,
      explain: "John Backus’s team at IBM built it for the IBM 704."
    },
    {
      type: "mc",
      q: "By default, what is the first index of a Fortran array?",
      options: ["0", "1", "-1", "It must always be declared"],
      answer: 1,
      explain: "Fortran arrays start at 1 by default, matching mathematical notation."
    },
    {
      type: "mc",
      q: "Why should you write `implicit none`?",
      options: [
        "It makes code run faster",
        "It turns off automatic variable typing so typos become errors",
        "It enables free-form source",
        "It is required to print"
      ],
      answer: 1,
      explain: "Without it, an undeclared variable like ‘icount’ silently becomes an integer — a classic source of bugs."
    }
  ],
  sources: [
    {
      t: "fortran-lang.org — learn modern Fortran",
      u: "https://fortran-lang.org/learn/"
    },
    {
      t: "Fortran — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Fortran"
    },
    {
      t: "IBM history: Fortran",
      u: "https://www.ibm.com/history/fortran"
    }
  ],
  facts: [
    {
      text: "The FORTRAN team knew nobody would trust a compiler unless its output was nearly as fast as hand-written code, so the first compiler was one of the most aggressive optimisers ever built at the time.",
      src: {
        t: "Fortran — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Fortran"
      }
    },
    {
      text: "Fortran is still officially updated: the latest standard is Fortran 2023.",
      src: {
        t: "fortran-lang.org",
        u: "https://fortran-lang.org/"
      }
    },
    {
      text: "Old fixed-form FORTRAN ignored spaces entirely, so a single typo could quietly turn a loop statement into an assignment to a variable you never meant to create.",
      src: {
        t: "Fortran — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Fortran"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Supercomputers, weather and climate models, physics and engineering simulations."
  },
  learnIf: "you’re going into scientific computing or high-performance computing."
};

CT.langs["lisp"] = {
  id: "lisp",
  name: "Lisp",
  year: 1958,
  era: "dawn",
  level: "classic",
  creator: "John McCarthy",
  org: "MIT",
  paradigm: "Functional, multi-paradigm",
  typing: "Dynamic",
  prism: "lisp",
  tags: ["ai", "games"],
  tagline: "Code made of lists — the original language of artificial intelligence.",
  story: [
    "John McCarthy, who also coined the term “artificial intelligence,” designed Lisp (LISt Processor) at MIT in 1958. Everything is written as lists in parentheses, and code itself is a list — so Lisp programs can easily write and transform other Lisp programs. This idea is called homoiconicity.",
    "Lisp introduced a remarkable number of ideas that every modern language now takes for granted: garbage collection, the if/then/else expression, recursion as a normal tool, first-class functions and the interactive REPL (read-eval-print loop).",
    "For decades Lisp was the language of AI research. Its descendants include Common Lisp, Scheme, Racket and Clojure (which runs on the Java Virtual Machine)."
  ],
  usedBy: [
    {
      who: "Naughty Dog",
      what: "The Jak and Daxter games were built with GOAL (Game Oriented Assembly Lisp), the studio’s own Lisp dialect."
    },
    {
      who: "Autodesk",
      what: "AutoCAD has been scriptable with AutoLISP since the 1980s."
    },
    {
      who: "GNU Emacs",
      what: "The legendary text editor is mostly written in, and extended with, Emacs Lisp."
    },
    {
      who: "Yahoo! Store",
      what: "Paul Graham’s Viaweb, one of the first web-app companies, was written in Lisp and became Yahoo! Store."
    }
  ],
  know: [
    "Prefix notation: the function comes first. (+ 1 2 3) means 1 + 2 + 3.",
    "Everything is an expression that returns a value — even if.",
    "Recursion is the natural way to loop.",
    "Macros let you add new syntax to the language itself.",
    "If you learn Clojure, Racket or Scheme today, you are learning Lisp."
  ],
  examples: [
    {
      title: "Recursive factorial (Common Lisp)",
      code: `(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))

(print (factorial 5)) ; => 120`,
      note: ""
    },
    {
      title: "Working with lists",
      code: `(defvar *scores* '(90 75 88 61))

(print (car *scores*))                         ; first element => 90
(print (cdr *scores*))                         ; the rest => (75 88 61)
(print (mapcar (lambda (x) (* x 2)) *scores*)) ; => (180 150 176 122)
(print (remove-if (lambda (x) (< x 80)) *scores*)) ; => (90 88)`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `(+ 1 2 3)` evaluate to?",
      options: ["123", "6", "An error", "(1 2 3)"],
      answer: 1,
      explain: "In prefix notation the + function receives all three arguments and adds them."
    },
    {
      type: "mc",
      q: "What does `(car '(a b c))` return?",
      options: ["a", "(b c)", "c", "(a b c)"],
      answer: 0,
      explain: "car returns the first element of a list; cdr returns the rest."
    },
    {
      type: "mc",
      q: "Which idea did Lisp pioneer that almost every modern language uses?",
      options: ["Garbage collection", "Pointers", "Line numbers", "The GOTO statement"],
      answer: 0,
      explain: "Lisp was the first language with automatic garbage collection."
    },
    {
      type: "mc",
      q: "Which game studio built its own Lisp dialect to make games?",
      options: ["id Software", "Naughty Dog", "Valve", "Rockstar"],
      answer: 1,
      explain: "Naughty Dog’s GOAL language was used for the Jak and Daxter series."
    }
  ],
  sources: [
    {
      t: "Practical Common Lisp (free online book)",
      u: "https://gigamonkeys.com/book/"
    },
    {
      t: "Lisp — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Lisp_(programming_language)"
    },
    {
      t: "Clojure — a modern Lisp",
      u: "https://clojure.org/"
    },
    {
      t: "Structure and Interpretation of Computer Programs (Scheme)",
      u: "https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html"
    }
  ],
  facts: [
    {
      text: "Lisp is the second-oldest high-level language still in use — just one year younger than Fortran.",
      src: {
        t: "Lisp — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Lisp_(programming_language)"
      }
    },
    {
      text: "McCarthy planned a more conventional syntax (M-expressions). The parentheses-everywhere S-expressions were meant to be internal, but programmers liked them so much they became the language.",
      src: {
        t: "Lisp — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Lisp_(programming_language)"
      }
    },
    {
      text: "Programmers joke that LISP stands for “Lots of Irritating Superfluous Parentheses.”",
      src: {
        t: "Lisp — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Lisp_(programming_language)"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Clojure on the JVM, Emacs Lisp, Racket in teaching, and AutoLISP in CAD."
  },
  learnIf: "you want to bend your brain with functional programming and macros — it makes you better in every language."
};

CT.langs["cobol"] = {
  id: "cobol",
  name: "COBOL",
  year: 1959,
  era: "dawn",
  level: "classic",
  creator: "CODASYL committee, building on Grace Hopper’s FLOW-MATIC",
  org: "US Department of Defense and industry",
  paradigm: "Imperative, procedural",
  typing: "Static, record-based",
  prism: "cobol",
  tags: ["business"],
  tagline: "English-like code that still moves much of the world’s money.",
  story: [
    "COBOL (COmmon Business-Oriented Language) was designed in 1959 by a committee backed by the US Department of Defense. It drew heavily on Grace Hopper’s FLOW-MATIC, which proved business programs could be written in something close to English. The goal was one language that would run on every manufacturer’s computer.",
    "COBOL programs are split into four divisions — IDENTIFICATION, ENVIRONMENT, DATA and PROCEDURE — and data is described with PICTURE clauses that define exactly how many digits or characters each field holds. That precision is ideal for money.",
    "It never went away. Banks, insurers and governments still run enormous COBOL systems on IBM mainframes. A 2017 Reuters analysis estimated COBOL handled about 95% of ATM card swipes, and in 2020 several US states put out urgent calls for COBOL programmers when unemployment systems were overwhelmed."
  ],
  usedBy: [
    {
      who: "Banks",
      what: "Core banking, ATM and payment systems on IBM Z mainframes."
    },
    {
      who: "Governments",
      what: "Tax, pensions and unemployment systems."
    },
    {
      who: "IBM",
      what: "Continues to sell and support COBOL compilers for its mainframes."
    }
  ],
  know: [
    "Four divisions: IDENTIFICATION, ENVIRONMENT, DATA, PROCEDURE.",
    "PIC 9(5) means a five-digit number; PIC X(10) means ten characters; PIC 9(5)V99 means a number with an implied decimal point.",
    "Classic fixed format: columns 1–6 sequence numbers, column 7 for comments (*), code in columns 8–72.",
    "Statements read like English: ADD 5 TO TOTAL, MOVE NAME TO OUTPUT-NAME.",
    "COBOL skills are rare and well paid because so many critical systems still depend on them."
  ],
  examples: [
    {
      title: "Hello and arithmetic",
      code: `IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-NAME    PIC X(10) VALUE 'WORLD'.
01 WS-COUNT   PIC 9(2)  VALUE 0.
PROCEDURE DIVISION.
    DISPLAY 'HELLO, ' WS-NAME.
    ADD 5 TO WS-COUNT.
    DISPLAY 'COUNT IS ' WS-COUNT.
    STOP RUN.`,
      note: "Prints “HELLO, WORLD” and then “COUNT IS 05” — PIC 9(2) always shows two digits."
    },
    {
      title: "Money with decimals and a condition",
      code: `01 WS-BALANCE   PIC 9(7)V99 VALUE 1500.00.
01 WS-WITHDRAW  PIC 9(7)V99 VALUE 200.50.
PROCEDURE DIVISION.
    IF WS-WITHDRAW > WS-BALANCE
        DISPLAY 'INSUFFICIENT FUNDS'
    ELSE
        SUBTRACT WS-WITHDRAW FROM WS-BALANCE
        DISPLAY 'NEW BALANCE: ' WS-BALANCE
    END-IF.`,
      note: "V marks an implied decimal point: exact decimal maths, no floating-point rounding errors."
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which division contains the actual instructions?",
      options: ["IDENTIFICATION", "ENVIRONMENT", "DATA", "PROCEDURE"],
      answer: 3,
      explain: "The PROCEDURE DIVISION holds the executable statements."
    },
    {
      type: "mc",
      q: "What does `PIC 9(2)` describe?",
      options: [
        "Two characters of text",
        "A two-digit number",
        "The number 92",
        "Two decimal places"
      ],
      answer: 1,
      explain: "9 means a numeric digit; (2) means two of them."
    },
    {
      type: "mc",
      q: "Whose earlier language strongly influenced COBOL?",
      options: ["John Backus", "Grace Hopper", "Dennis Ritchie", "Alan Turing"],
      answer: 1,
      explain: "Grace Hopper’s FLOW-MATIC showed English-like business programming was possible."
    },
    {
      type: "mc",
      q: "Why is COBOL still used in banks today?",
      options: [
        "It is the newest language",
        "Huge, reliable systems already run on it and rewriting them is risky and expensive",
        "It is required by law",
        "It runs only on phones"
      ],
      answer: 1,
      explain: "Decades of tested business logic make replacement expensive and risky."
    }
  ],
  sources: [
    {
      t: "Open Mainframe Project COBOL Programming Course",
      u: "https://github.com/openmainframeproject/cobol-programming-course"
    },
    {
      t: "COBOL — Wikipedia",
      u: "https://en.wikipedia.org/wiki/COBOL"
    },
    {
      t: "GnuCOBOL — a free COBOL compiler",
      u: "https://gnucobol.sourceforge.io/"
    }
  ],
  facts: [
    {
      text: "Grace Hopper famously kept a clock that ran counterclockwise, as a reminder that “we’ve always done it this way” is a dangerous phrase.",
      src: {
        t: "Grace Hopper — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Grace_Hopper"
      }
    },
    {
      text: "COBOL was designed so managers could read code, which is why you write things like ADD TAX TO TOTAL.",
      src: {
        t: "COBOL — Wikipedia",
        u: "https://en.wikipedia.org/wiki/COBOL"
      }
    },
    {
      text: "A 2017 Reuters report estimated that about 220 billion lines of COBOL were still in use.",
      src: {
        t: "The Next Web (2017) — COBOL figures from Reuters",
        u: "https://thenextweb.com/finance/2017/04/10/ancient-programming-language-cobol-can-make-you-bank-literally/"
      }
    }
  ],
  today: {
    status: "Legacy",
    text: "Bank cores, insurance, payroll and government systems on IBM mainframes."
  },
  learnIf: "you want a well-paid niche maintaining the systems that move the world’s money."
};

CT.langs["basic"] = {
  id: "basic",
  name: "BASIC",
  year: 1964,
  era: "mainframe",
  level: "classic",
  creator: "John Kemeny and Thomas Kurtz",
  org: "Dartmouth College",
  paradigm: "Imperative (later structured and object-oriented dialects)",
  typing: "Dynamic, with type suffixes",
  prism: "basic",
  tags: ["games", "beginner"],
  tagline: "The language that turned millions of kids into programmers — and launched Microsoft.",
  story: [
    "BASIC (Beginner’s All-purpose Symbolic Instruction Code) was created at Dartmouth College in 1964 so that students who weren’t scientists could use a computer. It ran on a time-sharing system: students typed at terminals and got answers back in seconds.",
    "When microcomputers arrived in the 1970s, BASIC came with them. Microsoft’s very first product was Altair BASIC (1975). Apple’s Apple II shipped with Wozniak’s Integer BASIC and later Applesoft BASIC, licensed from Microsoft. The Commodore 64 booted straight into Microsoft BASIC. Magazines printed pages of BASIC games for readers to type in.",
    "Microsoft kept BASIC alive with QBasic (bundled with MS-DOS 5 along with the games Gorillas and Nibbles), then Visual Basic, and finally VB.NET."
  ],
  usedBy: [
    {
      who: "Microsoft",
      what: "Altair BASIC was the company’s first product; BASIC dialects shipped on most 8-bit home computers."
    },
    {
      who: "Apple",
      what: "Integer BASIC and Applesoft BASIC were built into the Apple II."
    },
    {
      who: "Commodore",
      what: "The Commodore 64, the best-selling single computer model, booted directly into BASIC."
    }
  ],
  know: [
    "Classic BASIC uses line numbers and GOTO to jump between them.",
    "A $ on the end of a variable name (NAME$) means it holds text.",
    "PRINT shows output; INPUT reads from the keyboard.",
    "Overusing GOTO creates “spaghetti code” — the reason structured programming (loops, functions) took over."
  ],
  examples: [
    {
      title: "Classic line-numbered BASIC",
      code: `10 PRINT "WHAT IS YOUR NAME";
20 INPUT N$
30 FOR I = 1 TO 3
40 PRINT "HELLO, "; N$
50 NEXT I
60 END`,
      note: ""
    },
    {
      title: "The famous one-line Commodore 64 maze",
      code: "10 PRINT CHR$(205.5+RND(1)); : GOTO 10",
      note: "Randomly prints one of two diagonal characters forever, drawing an endless maze."
    },
    {
      title: "QBasic: structured BASIC without line numbers",
      code: `DIM total AS INTEGER
FOR i = 1 TO 5
    total = total + i
NEXT i
IF total > 10 THEN
    PRINT "Big total:"; total
ELSE
    PRINT "Small total"
END IF`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What was Microsoft’s first product?",
      options: ["Windows", "MS-DOS", "Altair BASIC", "Excel"],
      answer: 2,
      explain: "Gates and Allen wrote BASIC for the Altair 8800 in 1975."
    },
    {
      type: "mc",
      q: "In classic BASIC, what does the `$` in `N$` mean?",
      options: [
        "It holds money",
        "It holds a string (text)",
        "It is a constant",
        "It is a global variable"
      ],
      answer: 1,
      explain: "String variables end in $ in classic BASIC."
    },
    {
      type: "mc",
      q: "What does `GOTO 10` do?",
      options: [
        "Calls a function named 10",
        "Jumps to line 10 and continues from there",
        "Repeats 10 times",
        "Ends the program"
      ],
      answer: 1,
      explain: "GOTO transfers control to the given line number."
    },
    {
      type: "mc",
      q: "What is printed by the QBasic example above?",
      options: ["Small total", "Big total: 15", "Big total: 10", "15"],
      answer: 1,
      explain: "1+2+3+4+5 = 15, which is greater than 10."
    }
  ],
  sources: [
    {
      t: "BASIC at 50 — Dartmouth",
      u: "https://www.dartmouth.edu/basicfifty/"
    },
    {
      t: "BASIC — Wikipedia",
      u: "https://en.wikipedia.org/wiki/BASIC"
    },
    {
      t: "Microsoft’s Altair BASIC — Computer History Museum",
      u: "https://computerhistory.org/blog/microsoft-altair-basic-source-code/"
    }
  ],
  facts: [
    {
      text: "The first BASIC programs ran at Dartmouth at about 4 a.m. on May 1, 1964.",
      src: {
        t: "BASIC at 50 (Dartmouth)",
        u: "https://www.dartmouth.edu/basicfifty/"
      }
    },
    {
      text: "Gates and Allen wrote Altair BASIC without ever touching an Altair. They used an emulator on a Harvard PDP-10, and the first real test was the live demo for the manufacturer.",
      src: {
        t: "Altair BASIC — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Altair_BASIC"
      }
    },
    {
      text: "In 1976 Bill Gates wrote an “Open Letter to Hobbyists” complaining that people were copying Altair BASIC without paying — one of the first public arguments about software piracy.",
      src: {
        t: "Open Letter to Hobbyists — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Open_Letter_to_Hobbyists"
      }
    }
  ],
  today: {
    status: "Retired",
    text: "Lives on through VBA, VB.NET and retro hobby versions like QB64 and BASIC on emulated 8-bit machines."
  },
  learnIf: "you love retro computing — otherwise start with Python, BASIC’s spiritual successor for beginners."
};

CT.langs["pascal"] = {
  id: "pascal",
  name: "Pascal",
  year: 1970,
  era: "mainframe",
  level: "classic",
  creator: "Niklaus Wirth",
  org: "ETH Zürich",
  paradigm: "Imperative, structured (Object Pascal adds OOP)",
  typing: "Static, strong",
  prism: "pascal",
  tags: ["beginner", "games"],
  tagline: "Clean, strict, structured — the teaching language that also built the first Macs.",
  story: [
    "Niklaus Wirth designed Pascal in 1970 as a descendant of ALGOL 60, aiming to teach good, structured programming: clear blocks, strong types and no reliance on GOTO. It quickly became the standard teaching language in universities.",
    "Apple adopted it in a big way. Much of the Lisa’s software and many early Macintosh applications were written in Pascal, and the original Mac programming interfaces used Pascal conventions. Apple worked with Wirth to create Object Pascal in the mid-1980s.",
    "Borland’s Turbo Pascal (1983) made compiling almost instant on cheap PCs, and its successor Delphi (1995) became a popular tool for Windows apps — the original Skype client was built with it. The first version of Tetris was also written in Pascal."
  ],
  usedBy: [
    {
      who: "Apple",
      what: "Lisa and early Macintosh software and toolbox APIs; co-developed Object Pascal."
    },
    {
      who: "Borland",
      what: "Turbo Pascal and Delphi, two hugely popular development tools."
    },
    {
      who: "Alexey Pajitnov",
      what: "Wrote the original Tetris in Pascal in 1984."
    }
  ],
  know: [
    "Assignment uses := and equality comparison uses =.",
    "Code blocks are wrapped in begin … end, and the program finishes with end. (with a full stop).",
    "Variables are declared in a var section before they are used.",
    "Its strict typing catches many mistakes at compile time.",
    "Free Pascal and the Lazarus IDE keep it alive and free today."
  ],
  examples: [
    {
      title: "Hello in a loop",
      code: `program Greeting;
var
  i: Integer;
  name: string;
begin
  name := 'Ada';
  for i := 1 to 3 do
    WriteLn('Hello, ', name, ' #', i);
end.`,
      note: ""
    },
    {
      title: "Functions and records",
      code: `type
  TPlayer = record
    Name: string;
    Score: Integer;
  end;

function DoubleScore(p: TPlayer): Integer;
begin
  DoubleScore := p.Score * 2;
end;`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which operator assigns a value in Pascal?",
      options: ["=", "==", ":=", "<-"],
      answer: 2,
      explain: "Pascal uses := for assignment and = for comparison, avoiding the classic = vs == confusion."
    },
    {
      type: "mc",
      q: "How does a Pascal program end?",
      options: ["return 0;", "end.", "STOP RUN.", "}"],
      answer: 1,
      explain: "The final end is followed by a period."
    },
    {
      type: "mc",
      q: "Which company used Pascal for the Lisa and early Macintosh software?",
      options: ["Microsoft", "IBM", "Apple", "Atari"],
      answer: 2,
      explain: "Apple used Pascal extensively and co-created Object Pascal."
    },
    {
      type: "mc",
      q: "Which famous game was first written in Pascal?",
      options: ["Pong", "Tetris", "Doom", "Pac-Man"],
      answer: 1,
      explain: "Alexey Pajitnov wrote Tetris in Pascal on an Elektronika 60."
    }
  ],
  sources: [
    {
      t: "Free Pascal documentation",
      u: "https://www.freepascal.org/docs.html"
    },
    {
      t: "Pascal — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Pascal_(programming_language)"
    },
    {
      t: "Object Pascal — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Object_Pascal"
    }
  ],
  facts: [
    {
      text: "Pascal is named after Blaise Pascal, the 17th-century mathematician who built one of the first mechanical calculators.",
      src: {
        t: "Pascal — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Pascal_(programming_language)"
      }
    },
    {
      text: "Turbo Pascal sold for $49.95 in 1983, when competing compilers cost hundreds of dollars — and it compiled almost instantly.",
      src: {
        t: "Turbo Pascal — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Turbo_Pascal"
      }
    },
    {
      text: "“Wirth’s law,” named after Pascal’s creator, says software gets slower faster than hardware gets faster.",
      src: {
        t: "Wirth’s law — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Wirth%27s_law"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Delphi business apps and the free Lazarus / Free Pascal toolchain."
  },
  learnIf: "you maintain Delphi apps or want a very clear language to learn structured programming."
};

CT.langs["c"] = {
  id: "c",
  name: "C",
  year: 1972,
  era: "mainframe",
  level: "core",
  creator: "Dennis Ritchie",
  org: "Bell Labs (AT&T)",
  paradigm: "Imperative, procedural",
  typing: "Static, weak",
  prism: "c",
  tags: ["systems", "games"],
  tagline: "The language underneath almost everything — operating systems, databases and engines.",
  story: [
    "Dennis Ritchie created C at Bell Labs between 1969 and 1973, evolving it from Ken Thompson’s language B. In 1973 they rewrote the Unix kernel in C. That was revolutionary: an operating system written in a high-level language could be moved to new hardware by recompiling, instead of rewriting everything in a new assembly language.",
    "Brian Kernighan and Ritchie’s book The C Programming Language (1978), known as “K&R,” taught a generation, and its “hello, world” example became the standard first program. C was standardised as ANSI C in 1989; recent versions include C11, C17 and C23.",
    "C gives you direct control of memory through pointers, with no garbage collector and almost no safety net. That makes it fast and portable — and also the source of many security bugs like buffer overflows, which is a big reason newer languages like Rust exist."
  ],
  usedBy: [
    {
      who: "Linux & Unix",
      what: "The Linux kernel and most Unix-like systems are written in C."
    },
    {
      who: "Microsoft",
      what: "The Windows kernel is written mostly in C."
    },
    {
      who: "Apple",
      what: "The XNU kernel under macOS and iOS is largely C."
    },
    {
      who: "id Software",
      what: "Doom (1993) and Quake (1996) were written in C."
    },
    {
      who: "Everywhere",
      what: "CPython (Python’s main interpreter), Git, SQLite, Redis and countless microcontroller firmwares."
    }
  ],
  know: [
    "Every program starts at the main function.",
    "Pointers store memory addresses. & gets the address of a variable; * reads the value at an address.",
    "You manage heap memory yourself with malloc and free. Forget free and you leak memory; free twice and you crash.",
    "Arrays don’t know their own length and C doesn’t check bounds — writing past the end is undefined behaviour.",
    "Strings are just arrays of char ending with a zero byte ('\\0').",
    "#include pulls in header files; the preprocessor runs before the compiler.",
    "Integer division truncates: 7 / 2 is 3."
  ],
  examples: [
    {
      title: "Arrays, loops and printf",
      code: `#include <stdio.h>

int main(void) {
    int scores[] = {90, 75, 88};
    int n = sizeof(scores) / sizeof(scores[0]);
    int total = 0;

    for (int i = 0; i < n; i++) {
        total += scores[i];
    }
    printf("Average: %d\\n", total / n);   /* integer division: prints 84 */
    return 0;
}`,
      note: ""
    },
    {
      title: "Pointers: swap two variables",
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;   /* value stored at address a */
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 1, y = 2;
    swap(&x, &y);              /* pass the addresses */
    printf("%d %d\\n", x, y);   /* 2 1 */
    return 0;
}`,
      note: ""
    },
    {
      title: "Manual memory and structs",
      code: `#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    int hp;
} Enemy;

Enemy *spawn(const char *name, int hp) {
    Enemy *e = malloc(sizeof(Enemy));
    if (e == NULL) return NULL;          /* always check malloc */
    strncpy(e->name, name, sizeof(e->name) - 1);
    e->name[sizeof(e->name) - 1] = '\\0';
    e->hp = hp;
    return e;
}

/* ...later: free(e); exactly once. */`,
      note: "-> accesses a struct field through a pointer."
    }
  ],
  cheats: [
    ["Print", "printf(\"%s is %d\\n\", name, age);"],
    ["Pointer", "int *p = &x;  *p = 10;"],
    ["Allocate", "int *arr = malloc(n * sizeof(int)); free(arr);"],
    ["Struct access", "p.x   /* value */    ptr->x   /* via pointer */"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `&x` give you?",
      options: [
        "The value of x",
        "The address of x in memory",
        "x squared",
        "A reference copy of x"
      ],
      answer: 1,
      explain: "& is the address-of operator."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["3.5", "3", "4", "Error"],
      answer: 1,
      explain: "Both operands are ints, so integer division truncates to 3.",
      code: `int a = 7, b = 2;
printf("%d\\n", a / b);`
    },
    {
      type: "mc",
      q: "Why was rewriting Unix in C such a big deal?",
      options: [
        "C was faster than assembly",
        "It made the OS portable to new hardware",
        "It added a GUI",
        "It made Unix free"
      ],
      answer: 1,
      explain: "A high-level OS could be recompiled for new machines instead of rewritten."
    },
    {
      type: "mc",
      q: "What is the bug here?",
      options: [
        "Nothing is wrong",
        "The loop writes past the end of the array",
        "arr should be a pointer",
        "i must start at 1"
      ],
      answer: 1,
      explain: "Valid indexes are 0–4; i <= 5 writes to arr[5], which is out of bounds and undefined behaviour.",
      code: `int arr[5];
for (int i = 0; i <= 5; i++) {
    arr[i] = 0;
}`
    },
    {
      type: "mc",
      q: "What must every malloc eventually be paired with?",
      options: ["delete", "free", "return", "close"],
      answer: 1,
      explain: "Heap memory from malloc must be released with free exactly once."
    },
    {
      type: "fill",
      q: "Complete the expression that reads the value stored at the address in pointer p.",
      code: "int value = ____p;",
      answers: ["*"],
      explain: "* dereferences a pointer."
    },
    {
      type: "mc",
      q: "How are strings stored in C?",
      options: [
        "As a built-in String object",
        "As arrays of char ending in a zero byte",
        "As linked lists",
        "As integers"
      ],
      answer: 1,
      explain: "C strings are null-terminated char arrays."
    },
    {
      type: "mc",
      q: "Which compiler flags help catch bugs early?",
      options: ["-O3", "-Wall -Wextra", "-static", "-g0"],
      answer: 1,
      explain: "Turn warnings on and treat them seriously."
    },
    {
      type: "mc",
      q: "Which tool detects buffer overflows and use-after-free at runtime?",
      options: ["Prettier", "AddressSanitizer", "Make", "Git"],
      answer: 1,
      explain: "Compile with -fsanitize=address."
    }
  ],
  sources: [
    {
      t: "cppreference — C reference",
      u: "https://en.cppreference.com/w/c"
    },
    {
      t: "Beej’s Guide to C Programming (free)",
      u: "https://beej.us/guide/bgc/"
    },
    {
      t: "C — Wikipedia",
      u: "https://en.wikipedia.org/wiki/C_(programming_language)"
    },
    {
      t: "Dennis Ritchie: The Development of the C Language",
      u: "https://www.bell-labs.com/usr/dmr/www/chist.html"
    }
  ],
  facts: [
    {
      text: "The “hello, world” tradition comes from Brian Kernighan, who used it in a 1972 Bell Labs tutorial and then in the famous 1978 K&R book.",
      src: {
        t: "“Hello, World!” program — Wikipedia",
        u: "https://en.wikipedia.org/wiki/%22Hello,_World!%22_program"
      }
    },
    {
      text: "C is called C because it came after B, which was a stripped-down version of BCPL.",
      src: {
        t: "C — Wikipedia",
        u: "https://en.wikipedia.org/wiki/C_(programming_language)"
      }
    },
    {
      text: "Since 1984 the International Obfuscated C Code Contest has rewarded the most unreadable C programs that still work.",
      src: {
        t: "International Obfuscated C Code Contest",
        u: "https://www.ioccc.org/"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Operating systems, embedded devices, databases, language runtimes and anything that has to be tiny and fast."
  },
  learnIf: "you want to work close to the hardware, on embedded systems, operating systems or security.",
  ecosystem: [
    {
      name: "GCC · Clang",
      what: "The two major open-source C compilers."
    },
    {
      name: "Make · CMake",
      what: "Build systems that compile multi-file projects."
    },
    {
      name: "GDB · LLDB",
      what: "Debuggers for stepping through code and inspecting memory."
    },
    {
      name: "Valgrind · AddressSanitizer",
      what: "Find memory leaks, buffer overflows and use-after-free bugs."
    },
    {
      name: "Embedded toolchains",
      what: "Arduino, ESP-IDF and vendor SDKs for microcontrollers."
    }
  ],
  pitfalls: [
    "Writing past the end of an array (buffer overflow).",
    "Forgetting to free memory, or freeing it twice.",
    "Using a pointer after the memory it points to was freed.",
    "Forgetting the '\\0' terminator on strings, or using unsafe functions like gets.",
    "Ignoring compiler warnings — compile with -Wall -Wextra."
  ],
  roadmap: [
    "Variables, types, control flow and functions.",
    "Arrays and strings.",
    "Pointers and memory (malloc/free).",
    "Structs and files.",
    "Build tools, a debugger and sanitizers.",
    "Pick a track: embedded (Arduino/ESP32), operating systems or performance work."
  ],
  projects: [
    "A command-line calculator.",
    "Your own simple shell that runs commands.",
    "An Arduino or ESP32 project with sensors and LEDs.",
    "Implement a linked list and a hash table from scratch."
  ]
};

CT.langs["smalltalk"] = {
  id: "smalltalk",
  name: "Smalltalk",
  year: 1972,
  era: "mainframe",
  level: "classic",
  creator: "Alan Kay, Dan Ingalls, Adele Goldberg and team",
  org: "Xerox PARC",
  paradigm: "Pure object-oriented",
  typing: "Dynamic",
  prism: "smalltalk",
  tags: ["design"],
  tagline: "Everything is an object, and objects talk by sending messages.",
  story: [
    "Smalltalk was developed at Xerox PARC in the 1970s alongside the Alto, the first computer with a graphical desktop. In Smalltalk literally everything is an object — numbers, classes, even true and false — and all work happens by sending messages to objects.",
    "Smalltalk wasn’t just a language; it was a whole live environment with overlapping windows and a mouse-driven editor where you could inspect and change the running system. When Steve Jobs visited PARC in 1979 and saw it, it shaped the Lisa and the Macintosh.",
    "The Model-View-Controller (MVC) pattern, still used in web frameworks and apps, was described by Trygve Reenskaug while working with Smalltalk in 1979. Objective-C copied Smalltalk’s message syntax, and Ruby borrowed its “everything is an object” philosophy."
  ],
  usedBy: [
    {
      who: "Xerox PARC",
      what: "Built the graphical Alto environment that inspired Apple and Microsoft."
    },
    {
      who: "Apple (indirectly)",
      what: "Jobs’s 1979 PARC visit influenced the Mac; Objective-C borrowed Smalltalk’s messaging."
    },
    {
      who: "Finance & industry",
      what: "Smalltalk was used for trading and logistics systems in the 1990s; Pharo continues it today."
    }
  ],
  know: [
    "Statements end with a period. Assignment is :=.",
    "Message types: unary (5 factorial), binary (3 + 4) and keyword (array at: 1 put: 99).",
    "Binary messages are evaluated left to right with no operator precedence: 3 + 4 * 2 is 14, not 11.",
    "Blocks in square brackets are anonymous functions: [:x | x * 2].",
    "Even if/else is a message: (x > 3) ifTrue: [...] ifFalse: [...]."
  ],
  examples: [
    {
      title: "Messages and blocks",
      code: `| total |
total := 0.
1 to: 5 do: [:i | total := total + i].
Transcript show: 'Total: ', total printString; cr.

(total > 10)
    ifTrue: [Transcript show: 'Big'; cr]
    ifFalse: [Transcript show: 'Small'; cr].`,
      note: ""
    },
    {
      title: "Collections",
      code: `#(3 8 1 9) select: [:n | n > 2].       "=> #(3 8 9)"
#(1 2 3) collect: [:n | n * n].        "=> #(1 4 9)"
#(1 2 3 4) inject: 0 into: [:a :b | a + b]. "=> 10"`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `3 + 4 * 2` evaluate to in Smalltalk?",
      options: ["11", "14", "10", "Error"],
      answer: 1,
      explain: "Binary messages go strictly left to right: (3 + 4) * 2 = 14."
    },
    {
      type: "mc",
      q: "Which pattern was first described in the Smalltalk world?",
      options: ["Singleton", "Model-View-Controller", "Microservices", "REST"],
      answer: 1,
      explain: "Trygve Reenskaug described MVC at Xerox PARC in 1979."
    },
    {
      type: "mc",
      q: "In Smalltalk, how is if/else expressed?",
      options: ["A special keyword", "A message sent to a Boolean object", "A GOTO", "A macro"],
      answer: 1,
      explain: "ifTrue:ifFalse: is just a message to true or false."
    },
    {
      type: "mc",
      q: "Whose famous visit to Xerox PARC was influenced by Smalltalk’s environment?",
      options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Tim Berners-Lee"],
      answer: 1,
      explain: "Steve Jobs’s 1979 visit shaped the Lisa and Macintosh."
    }
  ],
  sources: [
    {
      t: "Pharo — a modern Smalltalk",
      u: "https://pharo.org/"
    },
    {
      t: "Alan Kay: The Early History of Smalltalk",
      u: "https://worrydream.com/EarlyHistoryOfSmalltalk/"
    },
    {
      t: "Smalltalk — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Smalltalk"
    }
  ],
  facts: [
    {
      text: "Alan Kay coined the term “object-oriented” — and later joked that he did not have C++ in mind.",
      src: {
        t: "Alan Kay — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Alan_Kay"
      }
    },
    {
      text: "Kay’s 1972 Dynabook concept imagined a tablet computer for children, decades before the iPad.",
      src: {
        t: "Dynabook — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Dynabook"
      }
    },
    {
      text: "Smalltalk ran on a virtual machine with bytecode, the same basic approach Java made famous 20 years later.",
      src: {
        t: "Smalltalk — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Smalltalk"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Pharo and Squeak keep it alive for research, teaching and a few industrial systems."
  },
  learnIf: "you want to see pure object-oriented programming and a live, inspectable environment."
};

CT.langs["sql"] = {
  id: "sql",
  name: "SQL",
  year: 1974,
  era: "mainframe",
  level: "core",
  creator: "Donald Chamberlin and Raymond Boyce, based on Edgar F. Codd’s relational model",
  org: "IBM",
  paradigm: "Declarative, query language",
  typing: "Static (column types)",
  prism: "sql",
  tags: ["data", "web", "business"],
  tagline: "You describe what data you want; the database figures out how to get it.",
  story: [
    "In 1970 IBM researcher Edgar F. Codd proposed storing data in tables (relations) linked by keys. In 1974 his colleagues Donald Chamberlin and Raymond Boyce designed SEQUEL to query those tables; the name was later shortened to SQL for trademark reasons.",
    "SQL is declarative: you say what result you want (“customers in Alberta, sorted by name”) and the database’s query planner decides how to get it. A small company called Relational Software (soon renamed Oracle) shipped the first commercial SQL database in 1979. SQL became an ANSI standard in 1986.",
    "Fifty years later SQL is everywhere. SQLite is built into every iPhone and Android phone and most browsers, PostgreSQL and MySQL power countless websites, and data analysts write SQL every day. It’s one of the most useful languages you can learn for almost any tech job."
  ],
  usedBy: [
    {
      who: "IBM",
      what: "Invented SQL and the relational model; DB2 is IBM’s database."
    },
    {
      who: "Oracle",
      what: "Built a giant company on the first commercial SQL database."
    },
    {
      who: "Microsoft",
      what: "SQL Server and Azure SQL; T-SQL is Microsoft’s dialect."
    },
    {
      who: "Apple & Google",
      what: "SQLite stores data for apps on iOS and Android."
    },
    {
      who: "Meta, Uber, Shopify…",
      what: "MySQL and PostgreSQL are core to most web companies."
    }
  ],
  know: [
    "Core statements: SELECT (read), INSERT (add), UPDATE (change), DELETE (remove) — often called CRUD.",
    "WHERE filters rows before grouping; HAVING filters groups after GROUP BY.",
    "JOIN combines tables using matching keys. INNER JOIN keeps only matches; LEFT JOIN keeps every row from the left table.",
    "A primary key uniquely identifies each row; a foreign key points to a row in another table.",
    "Never build queries by gluing user input into strings — use parameterised queries to prevent SQL injection.",
    "Indexes make lookups fast but slow down writes slightly.",
    "Dialects differ (PostgreSQL, MySQL, SQL Server, SQLite), but the core is the same everywhere."
  ],
  examples: [
    {
      title: "Create, insert and query",
      code: `CREATE TABLE games (
  id        INTEGER PRIMARY KEY,
  title     TEXT NOT NULL,
  year      INTEGER,
  platform  TEXT
);

INSERT INTO games (title, year, platform) VALUES
  ('Tetris',            1984, 'Elektronika 60'),
  ('Super Mario Bros.', 1985, 'NES'),
  ('Doom',              1993, 'PC'),
  ('Minecraft',         2011, 'PC');

SELECT platform, COUNT(*) AS total
FROM games
WHERE year < 2000
GROUP BY platform
ORDER BY total DESC;`,
      note: ""
    },
    {
      title: "Joining two tables",
      code: `SELECT c.name, o.total
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE c.province = 'AB'
ORDER BY o.total DESC;`,
      note: "LEFT JOIN keeps customers even if they have no orders (total will be NULL)."
    },
    {
      title: "Safe parameters vs SQL injection (Python + SQLite)",
      code: `# DANGEROUS: user input pasted straight into SQL
cur.execute(f"SELECT * FROM users WHERE name = '{name}'")

# SAFE: the database treats name strictly as data
cur.execute("SELECT * FROM users WHERE name = ?", (name,))`,
      note: "If name were  ' OR '1'='1  the first query would return every user."
    }
  ],
  cheats: [
    ["Filter", "SELECT * FROM t WHERE x > 5 AND y = 'a';"],
    [
      "Aggregate",
      "SELECT dept, AVG(salary) FROM staff GROUP BY dept HAVING AVG(salary) > 50000;"
    ],
    ["Update", "UPDATE t SET status = 'done' WHERE id = 7;"],
    ["Pattern", "SELECT * FROM t WHERE name LIKE 'Sam%';"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What is the difference between WHERE and HAVING?",
      options: [
        "No difference",
        "WHERE filters rows before grouping; HAVING filters groups after GROUP BY",
        "HAVING is faster",
        "WHERE only works with numbers"
      ],
      answer: 1,
      explain: "HAVING can use aggregate results like COUNT(*)."
    },
    {
      type: "mc",
      q: "Which JOIN keeps every row from the left table, even without a match?",
      options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"],
      answer: 1,
      explain: "Unmatched right-side columns come back as NULL."
    },
    {
      type: "mc",
      q: "Using the games table from the example, how many rows does this return?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explain: "Only Doom (1993) and Minecraft (2011) are after 1990.",
      code: "SELECT title FROM games WHERE year > 1990;"
    },
    {
      type: "mc",
      q: "What is the best defence against SQL injection?",
      options: [
        "Hiding the database",
        "Parameterised (prepared) queries",
        "Using uppercase keywords",
        "Deleting old data"
      ],
      answer: 1,
      explain: "Parameters make the database treat input purely as data, never as SQL code."
    },
    {
      type: "mc",
      q: "SQL is described as declarative. What does that mean?",
      options: [
        "You describe the result you want, not the steps",
        "Every variable must be declared",
        "It only runs on IBM machines",
        "It can’t change data"
      ],
      answer: 0,
      explain: "The query planner chooses how to execute your request."
    },
    {
      type: "fill",
      q: "Complete the query to count rows per platform.",
      code: "SELECT platform, COUNT(*) FROM games ____ platform;",
      answers: ["GROUP BY"],
      explain: "GROUP BY collapses rows with the same platform into one group.",
      ci: true
    },
    {
      type: "mc",
      q: "Which database is built into every iPhone and Android phone?",
      options: ["Oracle", "SQLite", "SQL Server", "DB2"],
      answer: 1,
      explain: "SQLite is a tiny embedded database used by mobile apps and browsers."
    },
    {
      type: "mc",
      q: "Which check finds rows where `email` has no value?",
      options: ["email = NULL", "email IS NULL", "email == ''", "email = 0"],
      answer: 1,
      explain: "NULL never equals anything — even NULL — so use IS NULL."
    },
    {
      type: "mc",
      q: "What happens if you run `DELETE FROM users;` with no WHERE clause?",
      options: [
        "Nothing",
        "Every row in users is deleted",
        "It deletes the table definition",
        "It errors"
      ],
      answer: 1,
      explain: "Always double-check your WHERE — and use transactions."
    }
  ],
  sources: [
    {
      t: "SQLBolt — interactive SQL lessons",
      u: "https://sqlbolt.com/"
    },
    {
      t: "PostgreSQL tutorial (official)",
      u: "https://www.postgresql.org/docs/current/tutorial.html"
    },
    {
      t: "SQLite documentation",
      u: "https://www.sqlite.org/docs.html"
    },
    {
      t: "OWASP: SQL Injection Prevention Cheat Sheet",
      u: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
    },
    {
      t: "SQL — Wikipedia",
      u: "https://en.wikipedia.org/wiki/SQL"
    }
  ],
  facts: [
    {
      text: "People still argue whether it’s pronounced “S-Q-L” or “sequel.” Both are accepted.",
      src: {
        t: "SQL — Wikipedia",
        u: "https://en.wikipedia.org/wiki/SQL"
      }
    },
    {
      text: "The company that shipped the first commercial SQL database renamed itself after its own product: Oracle.",
      src: {
        t: "Oracle Corporation — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Oracle_Corporation"
      }
    },
    {
      text: "SQLite is probably the most widely deployed database engine on Earth — and its code is in the public domain.",
      src: {
        t: "Most widely deployed database engine (sqlite.org)",
        u: "https://www.sqlite.org/mostdeployed.html"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Nearly every app, website, analytics team and data warehouse."
  },
  learnIf: "you want almost any tech job — developers, analysts and IT staff all use it.",
  ecosystem: [
    {
      name: "PostgreSQL",
      what: "The most loved open-source relational database."
    },
    {
      name: "MySQL / MariaDB",
      what: "Hugely popular for web apps."
    },
    {
      name: "SQLite",
      what: "A database in a single file — built into phones and browsers."
    },
    {
      name: "SQL Server",
      what: "Microsoft’s database, common in business and with Power BI."
    },
    {
      name: "ORMs",
      what: "Prisma, Entity Framework, SQLAlchemy and Hibernate map tables to code."
    },
    {
      name: "DBeaver · Azure Data Studio",
      what: "GUI tools for exploring databases."
    }
  ],
  pitfalls: [
    "Building queries by concatenating user input (SQL injection).",
    "SELECT * in production code instead of naming columns.",
    "Forgetting a WHERE clause on UPDATE or DELETE.",
    "Missing indexes on columns you filter and join on.",
    "Confusing NULL with an empty string or zero (use IS NULL)."
  ],
  roadmap: [
    "SELECT, WHERE, ORDER BY and LIMIT.",
    "Aggregates: COUNT, SUM, AVG and GROUP BY / HAVING.",
    "JOINs between tables.",
    "INSERT, UPDATE, DELETE and transactions.",
    "Designing tables: keys, normalisation and indexes.",
    "Window functions and query plans (EXPLAIN)."
  ],
  projects: [
    "Design a database for a video game store.",
    "Analyse a public dataset with SQLite.",
    "Build a Power BI or Metabase dashboard on top of SQL queries.",
    "Add a database to one of your web apps."
  ]
};
