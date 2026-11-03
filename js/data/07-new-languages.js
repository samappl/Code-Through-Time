/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
CT.langs["matlab"] = {
  id: "matlab",
  name: "MATLAB",
  year: 1984,
  era: "pc",
  level: "classic",
  creator: "Cleve Moler (original); Jack Little and Steve Bangert founded MathWorks",
  org: "MathWorks",
  paradigm: "Array-based, procedural, object-oriented",
  typing: "Dynamic",
  prism: "matlab",
  tags: ["science", "data"],
  tagline: "The MATrix LABoratory — the engineer’s calculator that became a language.",
  story: [
    "In the late 1970s mathematician Cleve Moler wrote a small interactive program so his students could use the LINPACK and EISPACK matrix libraries without learning Fortran. Copies spread across universities. In 1984 engineers Jack Little and Steve Bangert rewrote it in C, founded MathWorks with Moler, and sold MATLAB commercially.",
    "In MATLAB everything is a matrix, so maths reads almost exactly like it does on paper. Toolboxes add signal processing, control systems, image processing and machine learning, and Simulink lets engineers simulate systems by connecting blocks.",
    "MATLAB is a standard tool in engineering schools and in industries such as automotive, aerospace and medical devices. GNU Octave is a free, largely compatible alternative."
  ],
  usedBy: [
    {
      who: "Universities",
      what: "Taught in engineering, physics and maths courses around the world."
    },
    {
      who: "Automotive & aerospace",
      what: "Control systems, signal processing and simulation with Simulink, often generating embedded C code."
    },
    {
      who: "Research labs",
      what: "Data analysis, image processing and prototyping algorithms."
    }
  ],
  know: [
    "Arrays start at 1, like Fortran.",
    "A semicolon at the end of a line hides its output; leave it off to print the result.",
    "* is matrix multiplication; .* multiplies element by element.",
    "A \\ b solves the linear system A·x = b.",
    "Comments start with %.",
    "Vectorised code (whole-array operations) is much faster than loops."
  ],
  examples: [
    {
      title: "Matrices and solving equations",
      code: `A = [1 2; 3 4];
b = [5; 6];
x = A \\ b          % solves A*x = b  ->  x = [-4; 4.5]

v = 1:5;           % [1 2 3 4 5]
squares = v .^ 2   % element-wise: [1 4 9 16 25]`,
      note: ""
    },
    {
      title: "Plotting a signal",
      code: `t = 0:0.01:2*pi;
y = sin(t) + 0.3 * sin(5*t);
plot(t, y)
title('Signal')
xlabel('time (s)')
grid on`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does MATLAB stand for?",
      options: [
        "Machine Learning Toolbox",
        "MATrix LABoratory",
        "Mathematical Algorithm Builder",
        "Math Lab"
      ],
      answer: 1,
      explain: "Everything in MATLAB is built around matrices."
    },
    {
      type: "mc",
      q: "What is the difference between `*` and `.*`?",
      options: [
        "None",
        "`*` is matrix multiplication; `.*` multiplies element by element",
        "`.*` is faster",
        "`*` only works on scalars"
      ],
      answer: 1,
      explain: "The dot means “element-wise.”"
    },
    {
      type: "mc",
      q: "What does a semicolon at the end of a line do?",
      options: [
        "Ends the program",
        "Hides the result from being printed",
        "Starts a comment",
        "Nothing"
      ],
      answer: 1,
      explain: "Without it, MATLAB prints the result."
    },
    {
      type: "mc",
      q: "Which free tool is largely compatible with MATLAB?",
      options: ["GNU Octave", "Excel", "Blender", "Docker"],
      answer: 0,
      explain: "Octave runs most MATLAB code."
    }
  ],
  sources: [
    {
      t: "MATLAB Onramp (free MathWorks course)",
      u: "https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted"
    },
    {
      t: "A History of MATLAB (Moler & Little, ACM HOPL 2020)",
      u: "https://dl.acm.org/doi/10.1145/3386331"
    },
    {
      t: "GNU Octave",
      u: "https://octave.org/"
    },
    {
      t: "MATLAB — Wikipedia",
      u: "https://en.wikipedia.org/wiki/MATLAB"
    }
  ],
  facts: [
    {
      text: "MATLAB stands for MATrix LABoratory.",
      src: {
        t: "MATLAB — Wikipedia",
        u: "https://en.wikipedia.org/wiki/MATLAB"
      }
    },
    {
      text: "Cleve Moler wrote the first MATLAB so students could use the LINPACK and EISPACK libraries without writing Fortran.",
      src: {
        t: "A History of MATLAB (ACM)",
        u: "https://dl.acm.org/doi/10.1145/3386331"
      }
    },
    {
      text: "GNU Octave is a free program that runs most MATLAB code.",
      src: {
        t: "GNU Octave",
        u: "https://octave.org/"
      }
    }
  ],
  today: {
    status: "Steady",
    text: "Engineering education, control systems, signal processing and simulation."
  },
  learnIf: "you’re studying or working in engineering, physics or signal processing."
};

CT.langs["bash"] = {
  id: "bash",
  name: "Bash & the shell",
  year: 1989,
  era: "pc",
  level: "modern",
  creator: "Brian Fox (for the GNU Project), building on Stephen Bourne’s 1979 sh",
  org: "GNU Project / Free Software Foundation",
  paradigm: "Command language, scripting",
  typing: "Untyped (everything is text)",
  prism: "bash",
  tags: ["systems", "business"],
  tagline: "The language of the terminal — glue for every Linux server, build pipeline and container.",
  story: [
    "Unix shells let you type commands to the operating system and chain small programs together. Stephen Bourne’s sh (1979, Bell Labs) became the standard Unix shell. In 1989 Brian Fox wrote Bash — the “Bourne Again SHell” — as a free replacement for the GNU Project, adding features like command history and tab completion.",
    "The shell’s superpower is the pipe: | sends the output of one program into the next, so tiny tools like grep, sort and wc combine into powerful one-liners. Shell scripts automate anything you could type by hand.",
    "Bash became the default shell on nearly every Linux system and on macOS until 2019, when Apple switched to zsh. Today shell scripts run inside CI pipelines, Docker containers and cloud servers everywhere, and Windows users get Bash through WSL and Git Bash."
  ],
  usedBy: [
    {
      who: "Linux everywhere",
      what: "The default shell on most Linux distributions — servers, cloud machines and containers."
    },
    {
      who: "DevOps & CI",
      what: "GitHub Actions, GitLab CI and Docker entrypoints are full of shell scripts."
    },
    {
      who: "Apple",
      what: "macOS’s default shell until Catalina (2019), which switched to zsh."
    },
    {
      who: "Microsoft",
      what: "Bash runs on Windows through WSL (Windows Subsystem for Linux) and Git Bash."
    }
  ],
  know: [
    "Start scripts with a shebang: #!/usr/bin/env bash, then chmod +x script.sh to make it runnable.",
    "No spaces around = when assigning: name=\"Ada\".",
    "Always quote variables: \"$file\" — otherwise names with spaces break.",
    "Single quotes are literal ('$HOME' prints $HOME); double quotes expand variables.",
    "$? holds the last command’s exit code: 0 means success, anything else is an error.",
    "| pipes output into the next command; > overwrites a file, >> appends, 2>&1 also captures errors.",
    "$(command) inserts a command’s output into another command.",
    "set -euo pipefail makes scripts stop on errors and unset variables instead of carrying on.",
    "Use ShellCheck to catch common bugs automatically."
  ],
  examples: [
    {
      title: "A safe script with arguments, loops and tests",
      code: `#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob                 # an unmatched *.log expands to nothing

name="\${1:-world}"                # first argument, default "world"
echo "Hello, $name!"

for file in *.log; do
  lines=$(wc -l < "$file")
  echo "$file has $lines lines"
done

if [[ -d backups ]]; then
  echo "backups/ already exists"
else
  mkdir backups && echo "created backups/"
fi`,
      note: ""
    },
    {
      title: "Pipes: small tools, big results",
      code: `# Top 5 IP addresses in a web server log
cut -d' ' -f1 access.log | sort | uniq -c | sort -rn | head -5

# How many TODO comments are in the project?
grep -rn "TODO" src/ | wc -l

# Back up a folder with today's date in the file name
tar -czf "backup-$(date +%F).tar.gz" ~/projects`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `$?` contain right after a successful command?",
      options: ["1", "0", "true", "The command’s output"],
      answer: 1,
      explain: "Exit code 0 means success."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["Ada", "$name", "name", "An error"],
      answer: 1,
      explain: "Single quotes stop variable expansion.",
      code: `name="Ada"
echo '$name'`
    },
    {
      type: "mc",
      q: "What is the difference between `>` and `>>`?",
      options: [
        "None",
        "`>` overwrites the file, `>>` appends to it",
        "`>>` is for errors",
        "`>` reads a file"
      ],
      answer: 1,
      explain: "Use >> to add to a log without wiping it."
    },
    {
      type: "mc",
      q: "What does `|` do?",
      options: [
        "Runs commands in parallel",
        "Sends one command’s output into the next command’s input",
        "Means OR",
        "Comments out the line"
      ],
      answer: 1,
      explain: "The pipe is the heart of the Unix philosophy."
    },
    {
      type: "mc",
      q: "Why write `\"$file\"` with quotes?",
      options: [
        "It’s faster",
        "So file names with spaces stay as one argument",
        "Quotes are required for all variables to work",
        "It makes the variable read-only"
      ],
      answer: 1,
      explain: "Unquoted, “my notes.txt” becomes two arguments."
    },
    {
      type: "mc",
      q: "What does `set -e` do?",
      options: [
        "Enables emojis",
        "Stops the script when a command fails",
        "Exports all variables",
        "Echoes every command"
      ],
      answer: 1,
      explain: "Combined with -u and -o pipefail it makes scripts much safer."
    },
    {
      type: "fill",
      q: "Complete the shebang line for a Bash script.",
      code: "#!/usr/bin/env ____",
      answers: ["bash"],
      explain: "env finds bash wherever it’s installed."
    },
    {
      type: "mc",
      q: "What does `rm -rf \"$DIR/\"` do if DIR is accidentally empty and you didn’t use `set -u`?",
      options: [
        "Nothing",
        "It deletes from / — the whole filesystem it can reach",
        "It errors safely",
        "It deletes the current folder only"
      ],
      answer: 1,
      explain: "That’s exactly why set -u and checks on variables matter."
    },
    {
      type: "mc",
      q: "Which tool would you use to pull a field out of JSON in a shell script?",
      options: ["jq", "awk only", "ping", "chmod"],
      answer: 0,
      explain: "jq '.name' file.json"
    },
    {
      type: "mc",
      q: "How do you make `script.sh` executable?",
      options: ["run script.sh", "chmod +x script.sh", "exec script.sh", "sudo script.sh"],
      answer: 1,
      explain: "Then run it with ./script.sh."
    }
  ],
  sources: [
    {
      t: "GNU Bash manual",
      u: "https://www.gnu.org/software/bash/manual/"
    },
    {
      t: "BashGuide (Greg’s Wiki)",
      u: "https://mywiki.wooledge.org/BashGuide"
    },
    {
      t: "ShellCheck — finds bugs in shell scripts",
      u: "https://www.shellcheck.net/"
    },
    {
      t: "Bash (Unix shell) — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Bash_(Unix_shell)"
    }
  ],
  facts: [
    {
      text: "Bash stands for “Bourne Again SHell,” a pun on Stephen Bourne’s original Unix shell.",
      src: {
        t: "Bash (Unix shell) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Bash_(Unix_shell)"
      }
    },
    {
      text: "The 2014 Shellshock security bug had been sitting in Bash’s code since 1989.",
      src: {
        t: "Shellshock (software bug) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Shellshock_(software_bug)"
      }
    },
    {
      text: "macOS switched its default shell from Bash to zsh in macOS Catalina (2019).",
      src: {
        t: "Z shell — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Z_shell"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Every Linux server, CI pipelines, Docker containers and developer terminals."
  },
  learnIf: "you’ll work in IT, DevOps, cloud, security or with Linux at all.",
  ecosystem: [
    {
      name: "ShellCheck",
      what: "A linter that finds bugs in shell scripts."
    },
    {
      name: "grep · sed · awk",
      what: "Search, edit and process text."
    },
    {
      name: "find · xargs",
      what: "Find files and run commands on them."
    },
    {
      name: "ssh · scp · rsync",
      what: "Work on remote servers and copy files."
    },
    {
      name: "tmux",
      what: "Keep terminal sessions running and split panes."
    },
    {
      name: "jq",
      what: "Process JSON on the command line."
    }
  ],
  pitfalls: [
    "Unquoted variables breaking on spaces.",
    "Missing set -euo pipefail, so scripts carry on after errors.",
    "Parsing ls output instead of using globs or find.",
    "Using sh when the script needs bash features.",
    "Running destructive commands with unchecked variables (rm -rf \"$DIR/\")."
  ],
  roadmap: [
    "Navigate: cd, ls, pwd, cp, mv, rm.",
    "Pipes, redirection and grep.",
    "Variables, quoting and exit codes.",
    "Scripts with if, for and functions.",
    "Text tools: sed, awk, jq.",
    "Automation: cron jobs, SSH and CI pipelines."
  ],
  projects: [
    "A backup script that runs every night with cron.",
    "A script that sets up a new Linux machine with your tools.",
    "A log analyser using grep, sort and uniq.",
    "A GitHub Actions workflow that tests your code."
  ]
};

CT.langs["html"] = {
  id: "html",
  name: "HTML & CSS",
  year: 1991,
  era: "web",
  level: "core",
  creator: "Tim Berners-Lee (HTML); Håkon Wium Lie and Bert Bos (CSS)",
  org: "CERN, now the W3C and WHATWG",
  paradigm: "Markup (HTML) and style sheets (CSS)",
  typing: "Not applicable",
  prism: "markup",
  tags: ["web", "beginner"],
  tagline: "The structure and style of every web page — not programming languages, but you can’t build the web without them.",
  story: [
    "Tim Berners-Lee created HTML (HyperText Markup Language) at CERN alongside the first web browser and server. Tags like <h1>, <p> and <a href> describe what each piece of a page is, and links connect documents across the world.",
    "Early pages were styled with tags like <font> and layout hacks using tables. In 1994 Håkon Wium Lie proposed Cascading Style Sheets to separate content from presentation; CSS1 became a standard in 1996, developed with Bert Bos.",
    "HTML5 added video, audio, canvas and semantic elements like <nav> and <article>. Modern CSS has Flexbox, Grid, custom properties (variables), animations and media queries for responsive design. HTML is now a “living standard” maintained by WHATWG, and CSS is developed at the W3C."
  ],
  usedBy: [
    {
      who: "Every website",
      what: "Browsers render HTML and CSS for every page you visit."
    },
    {
      who: "Apps",
      what: "Electron apps (VS Code, Discord, Slack) and many mobile apps render their UI with HTML and CSS."
    },
    {
      who: "Email",
      what: "HTML emails — still stuck with old table-based layouts for compatibility."
    }
  ],
  know: [
    "HTML gives structure and meaning; CSS gives appearance; JavaScript gives behaviour.",
    "Use semantic elements (<header>, <nav>, <main>, <article>, <button>) instead of <div> for everything — it helps accessibility and search engines.",
    "Every image needs an alt attribute describing it for screen readers.",
    "The box model: every element has content, padding, border and margin.",
    "Flexbox lays things out in one direction; Grid lays them out in two.",
    "Specificity decides which CSS rule wins: IDs beat classes, classes beat element selectors.",
    "Media queries adapt layouts to screen sizes — design for phones first."
  ],
  examples: [
    {
      title: "A semantic HTML page",
      prism: "markup",
      note: "",
      code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My first page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Hello, web!</h1>
    <nav><a href="#about">About</a> <a href="#projects">Projects</a></nav>
  </header>
  <main>
    <section id="about">
      <h2>About me</h2>
      <img src="me.jpg" alt="Me holding a vintage keyboard">
      <p>I’m learning to build websites.</p>
    </section>
  </main>
</body>
</html>`
    },
    {
      title: "Modern CSS: variables, Grid and responsive design",
      prism: "css",
      note: "",
      code: `:root {
  --accent: #2de2e6;
  --gap: 16px;
}

body {
  font-family: system-ui, sans-serif;
  margin: 0;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--gap);
}

.card {
  padding: 16px;
  border-radius: 8px;
  border-top: 4px solid var(--accent);
}

@media (max-width: 600px) {
  body { font-size: 16px; }
}`
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which part of a web page does CSS control?",
      options: ["Structure", "Appearance and layout", "Database queries", "Server logic"],
      answer: 1,
      explain: "HTML is structure, CSS is presentation, JavaScript is behaviour."
    },
    {
      type: "mc",
      q: "Why should every `<img>` have an `alt` attribute?",
      options: [
        "It makes images load faster",
        "Screen readers read it aloud, and it shows if the image fails to load",
        "It is required for CSS",
        "It adds a caption"
      ],
      answer: 1,
      explain: "Alt text is essential for accessibility."
    },
    {
      type: "mc",
      q: "Which is better for a clickable control that performs an action?",
      options: ["<div onclick>", "<button>", "<span>", "<p>"],
      answer: 1,
      explain: "Buttons work with the keyboard and screen readers automatically."
    },
    {
      type: "mc",
      q: "Which CSS selector wins if all three target the same element?",
      options: ["p", ".intro", "#welcome", "They tie"],
      answer: 2,
      explain: "IDs are more specific than classes, which beat element selectors."
    },
    {
      type: "mc",
      q: "Which layout tool is designed for two-dimensional layouts (rows and columns)?",
      options: ["Flexbox", "Grid", "float", "position: absolute"],
      answer: 1,
      explain: "Flexbox is one-dimensional; Grid handles both directions."
    }
  ],
  sources: [
    {
      t: "MDN — Learn web development",
      u: "https://developer.mozilla.org/en-US/docs/Learn_web_development"
    },
    {
      t: "web.dev — Learn CSS",
      u: "https://web.dev/learn/css"
    },
    {
      t: "HTML Living Standard (WHATWG)",
      u: "https://html.spec.whatwg.org/"
    },
    {
      t: "A Complete Guide to Flexbox (CSS-Tricks)",
      u: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
    },
    {
      t: "CSS — Wikipedia",
      u: "https://en.wikipedia.org/wiki/CSS"
    }
  ],
  facts: [
    {
      text: "The first website, info.cern.ch, is still online.",
      src: {
        t: "The first website (CERN)",
        u: "https://info.cern.ch/"
      }
    },
    {
      text: "Håkon Wium Lie proposed CSS on October 10, 1994, while working with Tim Berners-Lee at CERN.",
      src: {
        t: "CSS — Wikipedia",
        u: "https://en.wikipedia.org/wiki/CSS"
      }
    },
    {
      text: "Netscape’s <blink> tag made text flash on and off; modern browsers dropped it.",
      src: {
        t: "Blink element — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Blink_element"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Every website, web app and many desktop and mobile apps."
  },
  learnIf: "you want to build anything for the web — start here, before JavaScript."
};

CT.langs["scala"] = {
  id: "scala",
  name: "Scala",
  year: 2004,
  era: "platform",
  level: "core",
  creator: "Martin Odersky",
  org: "EPFL (Switzerland)",
  paradigm: "Object-oriented and functional",
  typing: "Static, strong, inferred",
  prism: "scala",
  tags: ["data", "web"],
  tagline: "Functional and object-oriented on the JVM — the language behind Apache Spark.",
  story: [
    "Martin Odersky had already helped bring generics to Java. At EPFL he designed Scala (from “scalable language”) to fuse object-oriented and functional programming on the Java Virtual Machine, with full access to Java libraries. It was released in 2004.",
    "Scala offers immutable data by default, powerful pattern matching, case classes, higher-order functions and a strong type system with inference. Scala 3 (2021) simplified the syntax and added optional indentation-based blocks.",
    "Twitter famously moved much of its back end from Ruby on Rails to Scala around 2009–2011 to handle growth. Apache Spark, the big-data processing engine, is written in Scala, and Kafka was originally built at LinkedIn in Scala and Java."
  ],
  usedBy: [
    {
      who: "Apache Spark",
      what: "The leading big-data engine is written in Scala and has a native Scala API."
    },
    {
      who: "Twitter (X)",
      what: "Moved core services to Scala for performance and scale."
    },
    {
      who: "LinkedIn",
      what: "Kafka, the event-streaming platform, started there in Scala and Java."
    }
  ],
  know: [
    "val is immutable; var is mutable. Prefer val.",
    "case classes are concise immutable data types with equality and pattern matching built in.",
    "match is pattern matching — far more powerful than switch.",
    "_ is a placeholder: list.map(_ * 2).",
    "Scala runs on the JVM and can use any Java library.",
    "sbt is the usual build tool."
  ],
  examples: [
    {
      title: "Case classes, collections and pattern matching (Scala 3)",
      code: `case class Player(name: String, score: Int)

def grade(score: Int): String = score match
  case s if s >= 90 => "A"
  case s if s >= 80 => "B"
  case _            => "C"

@main def run(): Unit =
  val players = List(Player("Ada", 92), Player("Linus", 78), Player("Grace", 88))
  val top = players.filter(_.score > 80).sortBy(-_.score).map(_.name)
  println(top)                                  // List(Ada, Grace)
  players.foreach(p => println(s"\${p.name}: \${grade(p.score)}"))`,
      note: ""
    },
    {
      title: "Apache Spark: big data in a few lines",
      code: `val events = spark.read.json("events.json")

events
  .groupBy("country")
  .count()
  .orderBy($"count".desc)
  .show(5)`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does Scala’s name come from?",
      options: ["A staircase", "“Scalable language”", "Scala Milan", "A Java codename"],
      answer: 1,
      explain: "It was designed to grow with its users."
    },
    {
      type: "mc",
      q: "Which famous big-data engine is written in Scala?",
      options: ["Hadoop", "Apache Spark", "PostgreSQL", "Redis"],
      answer: 1,
      explain: "Spark’s core is Scala."
    },
    {
      type: "mc",
      q: "What does `List(1, 2, 3).map(_ * 2)` return?",
      options: ["List(1, 2, 3)", "List(2, 4, 6)", "6", "An error"],
      answer: 1,
      explain: "_ stands for each element."
    },
    {
      type: "mc",
      q: "What does a `case class` give you automatically?",
      options: [
        "A database table",
        "Immutable fields, equality, toString and pattern matching",
        "A thread",
        "A GUI"
      ],
      answer: 1,
      explain: "Case classes are Scala’s data classes."
    }
  ],
  sources: [
    {
      t: "Tour of Scala",
      u: "https://docs.scala-lang.org/tour/tour-of-scala.html"
    },
    {
      t: "Scala 3 Book",
      u: "https://docs.scala-lang.org/scala3/book/introduction.html"
    },
    {
      t: "Scala — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Scala_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Scala’s name is short for “scalable language.”",
      src: {
        t: "Scala — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Scala_(programming_language)"
      }
    },
    {
      text: "Before Scala, Martin Odersky worked on Generic Java, which became the basis for Java’s generics and its javac compiler.",
      src: {
        t: "Martin Odersky — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Martin_Odersky"
      }
    },
    {
      text: "Apache Spark, one of the most popular big-data engines, is written in Scala.",
      src: {
        t: "Apache Spark — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Apache_Spark"
      }
    }
  ],
  today: {
    status: "Steady",
    text: "Big-data pipelines (Spark), back-end services and functional programming."
  },
  learnIf: "you’re heading into data engineering or want functional programming on the JVM."
};

CT.langs["powershell"] = {
  id: "powershell",
  name: "PowerShell",
  year: 2006,
  era: "platform",
  level: "modern",
  creator: "Jeffrey Snover",
  org: "Microsoft",
  paradigm: "Object-based shell and scripting",
  typing: "Dynamic, .NET types",
  prism: "powershell",
  tags: ["windows", "business", "systems"],
  tagline: "Microsoft’s object-powered shell for automating Windows, Microsoft 365 and Azure.",
  story: [
    "Jeffrey Snover’s 2002 “Monad Manifesto” argued that Windows needed a real automation shell. Unix shells pass text between commands; his design would pass structured .NET objects instead, so you never have to cut text apart to find a column. Codenamed Monad, it shipped as Windows PowerShell 1.0 in 2006.",
    "Commands are called cmdlets and follow a Verb-Noun pattern — Get-Process, Stop-Service, New-Item — which makes them easy to guess. Get-Help, Get-Command and Get-Member let you explore everything from inside the shell.",
    "In 2016 Microsoft open-sourced PowerShell and made it cross-platform, so PowerShell 7 runs on Windows, macOS and Linux. It is the standard way to administer Windows Server, Active Directory, Microsoft 365 and Azure at scale."
  ],
  usedBy: [
    {
      who: "IT departments",
      what: "Automating user accounts, Active Directory, file shares and Windows updates."
    },
    {
      who: "Microsoft 365 & Azure",
      what: "Exchange Online, Teams, Entra ID and Azure resources are all scriptable with PowerShell modules."
    },
    {
      who: "Security teams",
      what: "Incident response and auditing — and, unfortunately, attackers too, which is why logging PowerShell matters."
    }
  ],
  know: [
    "Cmdlets use Verb-Noun names: Get-Service, Set-Location, Remove-Item.",
    "The pipeline passes objects, not text — use Select-Object, Where-Object and Sort-Object on their properties.",
    "$_ (or $PSItem) is the current object inside a pipeline script block.",
    "Comparison operators are words: -eq, -ne, -gt, -lt, -like, -match.",
    "Get-Help, Get-Command and Get-Member are how you discover anything.",
    "Familiar aliases exist: ls, dir and gci all mean Get-ChildItem.",
    "Execution policy controls whether scripts can run; sign scripts in managed environments."
  ],
  examples: [
    {
      title: "Objects in the pipeline",
      code: `# Top 5 processes by memory, in MB
Get-Process |
    Sort-Object -Property WorkingSet64 -Descending |
    Select-Object -First 5 Name,
        @{ Name = "MemoryMB"; Expression = { [math]::Round($_.WorkingSet64 / 1MB) } }

# Big files in Downloads
Get-ChildItem -Path "$HOME\\Downloads" -File -Recurse |
    Where-Object { $_.Length -gt 100MB } |
    Select-Object Name, @{ Name = "SizeMB"; Expression = { [int]($_.Length / 1MB) } }`,
      note: ""
    },
    {
      title: "A function with parameters and error handling",
      code: `function Test-Website {
    param(
        [Parameter(Mandatory)]
        [string] $Url
    )
    try {
        $response = Invoke-WebRequest -Uri $Url -TimeoutSec 10
        "$Url is up (status $($response.StatusCode))"
    }
    catch {
        "$Url is DOWN: $($_.Exception.Message)"
    }
}

"https://example.com", "https://github.com" | ForEach-Object { Test-Website -Url $_ }`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What travels through a PowerShell pipeline?",
      options: ["Plain text", ".NET objects with properties", "Bytes only", "HTML"],
      answer: 1,
      explain: "That’s the big difference from Unix shells."
    },
    {
      type: "mc",
      q: "Which operator means “greater than” in PowerShell?",
      options: [">", "-gt", "gt", "=>"],
      answer: 1,
      explain: "> is redirection, so comparisons use -gt, -lt, -eq…"
    },
    {
      type: "mc",
      q: "Which cmdlet shows an object’s properties and methods?",
      options: ["Get-Help", "Get-Member", "Get-Item", "Show-Object"],
      answer: 1,
      explain: "Pipe anything into Get-Member to explore it."
    },
    {
      type: "mc",
      q: "What was PowerShell’s codename?",
      options: ["Longhorn", "Monad", "Cairo", "Whistler"],
      answer: 1,
      explain: "From Jeffrey Snover’s Monad Manifesto."
    },
    {
      type: "fill",
      q: "Complete the cmdlet that keeps only processes using more than 100 seconds of CPU.",
      code: "Get-Process | ____-Object { $_.CPU -gt 100 }",
      answers: ["Where"],
      explain: "Where-Object filters; Select-Object picks properties.",
      ci: true
    },
    {
      type: "mc",
      q: "What does `$_` mean inside `ForEach-Object { }`?",
      options: [
        "The previous command",
        "The current object in the pipeline",
        "An empty variable",
        "The script’s path"
      ],
      answer: 1,
      explain: "$PSItem is its longer name."
    },
    {
      type: "mc",
      q: "Since 2016, where can PowerShell run?",
      options: ["Only Windows", "Windows, macOS and Linux", "Only Azure", "Only Xbox"],
      answer: 1,
      explain: "PowerShell 7 is open source and cross-platform."
    },
    {
      type: "mc",
      q: "What does adding `-WhatIf` to a cmdlet do?",
      options: [
        "Runs it twice",
        "Shows what would happen without making changes",
        "Asks the internet",
        "Speeds it up"
      ],
      answer: 1,
      explain: "Always try destructive commands with -WhatIf first."
    },
    {
      type: "mc",
      q: "Which command installs a module from the PowerShell Gallery?",
      options: ["npm install", "Install-Module", "Get-Module", "Add-Package"],
      answer: 1,
      explain: "Install-Module -Name Az, for example."
    }
  ],
  sources: [
    {
      t: "PowerShell documentation (Microsoft Learn)",
      u: "https://learn.microsoft.com/en-us/powershell/"
    },
    {
      t: "PowerShell on GitHub",
      u: "https://github.com/PowerShell/PowerShell"
    },
    {
      t: "Monad Manifesto (Jeffrey Snover)",
      u: "https://www.jsnover.com/blog/2011/10/01/monad-manifesto/"
    },
    {
      t: "PowerShell — Wikipedia",
      u: "https://en.wikipedia.org/wiki/PowerShell"
    }
  ],
  facts: [
    {
      text: "PowerShell’s codename was Monad, from Jeffrey Snover’s 2002 “Monad Manifesto.”",
      src: {
        t: "Monad Manifesto (Jeffrey Snover)",
        u: "https://www.jsnover.com/blog/2011/10/01/monad-manifesto/"
      }
    },
    {
      text: "Microsoft open-sourced PowerShell in 2016; it now runs on Linux and macOS too.",
      src: {
        t: "PowerShell — Wikipedia",
        u: "https://en.wikipedia.org/wiki/PowerShell"
      }
    },
    {
      text: "ls, dir and gci are all aliases for the same cmdlet: Get-ChildItem.",
      src: {
        t: "Get-ChildItem (Microsoft Learn)",
        u: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Windows, Microsoft 365, Azure and enterprise IT automation."
  },
  learnIf: "you work (or want to work) in IT support, sysadmin, cloud or Microsoft environments.",
  ecosystem: [
    {
      name: "PowerShell 7",
      what: "The modern, cross-platform version (pwsh)."
    },
    {
      name: "PowerShell Gallery",
      what: "Install modules with Install-Module."
    },
    {
      name: "Az module",
      what: "Manage Azure resources."
    },
    {
      name: "Microsoft Graph PowerShell",
      what: "Manage Microsoft 365 users, groups and Teams."
    },
    {
      name: "ActiveDirectory module",
      what: "Manage on-premises users and computers."
    },
    {
      name: "Pester",
      what: "Testing framework for PowerShell code."
    },
    {
      name: "VS Code + PowerShell extension",
      what: "Editing and debugging scripts."
    }
  ],
  pitfalls: [
    "Treating output as text and parsing strings instead of using object properties.",
    "Using > for comparisons (it redirects output to a file).",
    "Running untrusted scripts or disabling execution policy entirely.",
    "Forgetting -WhatIf before bulk changes like Remove-*.",
    "Mixing Windows PowerShell 5.1 and PowerShell 7 module differences."
  ],
  roadmap: [
    "Cmdlets, Get-Help and Get-Command.",
    "The object pipeline: Where-Object, Select-Object, Sort-Object.",
    "Variables, arrays, hashtables and loops.",
    "Functions, parameters and error handling.",
    "Modules for your platform: Active Directory, Microsoft 365, Azure.",
    "Testing with Pester and scheduling scripts."
  ],
  projects: [
    "A script that reports low disk space on your PCs.",
    "Bulk-create user accounts from a CSV file.",
    "A daily report of Microsoft 365 licence usage.",
    "Automate setting up a new Windows PC."
  ]
};

CT.langs["elixir"] = {
  id: "elixir",
  name: "Elixir",
  year: 2012,
  era: "mobile",
  level: "core",
  creator: "José Valim",
  org: "Plataformatec, now the Elixir core team",
  paradigm: "Functional, concurrent",
  typing: "Dynamic (gradual types arriving)",
  prism: "elixir",
  tags: ["web", "systems"],
  tagline: "Ruby-like syntax on Erlang’s indestructible virtual machine — built for real-time apps.",
  story: [
    "Erlang was created at Ericsson in 1986 for telephone switches that could never go down. Its virtual machine, the BEAM, runs millions of tiny isolated processes and restarts crashed parts automatically — the “let it crash” philosophy.",
    "José Valim, a member of the Ruby on Rails core team, wanted that reliability with a friendlier, more productive language. He created Elixir, released in 2012, with Ruby-inspired syntax, macros and great tooling, running on the BEAM with full access to Erlang libraries.",
    "The Phoenix web framework and Phoenix LiveView make real-time features like chat, notifications and live dashboards straightforward. Discord built core real-time systems in Elixir, and WhatsApp’s back end was famously built on Erlang."
  ],
  usedBy: [
    {
      who: "Discord",
      what: "Uses Elixir for real-time messaging across millions of concurrent users."
    },
    {
      who: "WhatsApp (Erlang)",
      what: "Built its messaging back end on Erlang and the BEAM."
    },
    {
      who: "Startups",
      what: "Phoenix LiveView apps with real-time features and small teams."
    }
  ],
  know: [
    "Data is immutable; functions transform it.",
    "The pipe operator |> passes a value into the next function.",
    "Pattern matching is everywhere — even = is a match, not just assignment.",
    "Processes are cheap: spawn them, send messages, and let supervisors restart failures.",
    "Atoms like :ok and :error are constants; functions often return {:ok, value} or {:error, reason}.",
    "Mix is the build tool; Hex is the package manager."
  ],
  examples: [
    {
      title: "Modules, pipes and anonymous functions",
      code: `defmodule Greeter do
  def hello(name), do: "Hello, #{name}!"
end

IO.puts(Greeter.hello("Ada"))

[1, 2, 3, 4]
|> Enum.map(fn x -> x * x end)
|> Enum.filter(&(rem(&1, 2) == 0))
|> IO.inspect()                 # [4, 16]`,
      note: ""
    },
    {
      title: "Processes talking with messages",
      code: `pid = spawn(fn ->
  receive do
    {:ping, from} -> send(from, :pong)
  end
end)

send(pid, {:ping, self()})

receive do
  :pong -> IO.puts("got pong")
end`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which virtual machine does Elixir run on?",
      options: ["JVM", "The BEAM (Erlang VM)", "V8", "CLR"],
      answer: 1,
      explain: "The same VM Erlang uses."
    },
    {
      type: "mc",
      q: "What does `|>` do?",
      options: [
        "Compares values",
        "Passes the result of the left side as the first argument to the next function",
        "Starts a process",
        "Ends a module"
      ],
      answer: 1,
      explain: "Pipes make data transformations read top to bottom."
    },
    {
      type: "mc",
      q: "What is the “let it crash” philosophy?",
      options: [
        "Ignore errors",
        "Let isolated processes fail and have supervisors restart them",
        "Crash the whole app on any error",
        "Never handle exceptions"
      ],
      answer: 1,
      explain: "Supervision trees keep the system running."
    },
    {
      type: "mc",
      q: "Erlang was originally built for…",
      options: ["Video games", "Telephone switches", "Spreadsheets", "Web browsers"],
      answer: 1,
      explain: "Ericsson needed systems that never went down."
    }
  ],
  sources: [
    {
      t: "Elixir — Introduction (official guide)",
      u: "https://hexdocs.pm/elixir/introduction.html"
    },
    {
      t: "Phoenix Framework",
      u: "https://www.phoenixframework.org/"
    },
    {
      t: "How Discord scaled Elixir to 5,000,000 concurrent users",
      u: "https://discord.com/blog/how-discord-scaled-elixir-to-5-000-000-concurrent-users"
    },
    {
      t: "Elixir — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Elixir_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Erlang was created at Ericsson in 1986 to run telephone switches that couldn’t afford downtime.",
      src: {
        t: "Erlang — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Erlang_(programming_language)"
      }
    },
    {
      text: "Discord scaled its Elixir systems to handle 5 million concurrent users back in 2017.",
      src: {
        t: "Discord engineering blog",
        u: "https://discord.com/blog/how-discord-scaled-elixir-to-5-000-000-concurrent-users"
      }
    },
    {
      text: "José Valim was a member of the Ruby on Rails core team before creating Elixir.",
      src: {
        t: "Elixir — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Elixir_(programming_language)"
      }
    }
  ],
  today: {
    status: "Steady",
    text: "Real-time web apps, messaging, IoT and highly reliable back ends."
  },
  learnIf: "you want to build real-time, highly reliable systems with a small team."
};

CT.langs["julia"] = {
  id: "julia",
  name: "Julia",
  year: 2012,
  era: "mobile",
  level: "core",
  creator: "Jeff Bezanson, Stefan Karpinski, Viral B. Shah and Alan Edelman",
  org: "MIT",
  paradigm: "Multiple dispatch, functional, scientific",
  typing: "Dynamic with optional type annotations",
  prism: "julia",
  tags: ["science", "data", "ai"],
  tagline: "Python-easy, C-fast — a language designed for scientific computing.",
  story: [
    "Scientists often prototyped in a slow, easy language like Python, R or MATLAB and then rewrote the hot parts in C or Fortran — the “two-language problem.” Julia’s creators announced it in 2012 with a blog post explaining they were greedy: they wanted one language that was easy to write and as fast as C.",
    "Julia compiles code just in time through LLVM, so loops run fast without vectorising tricks. Its core idea is multiple dispatch: the same function name can have many methods, and Julia picks the right one based on the types of all the arguments.",
    "Julia 1.0 shipped in 2018. It is used for climate modelling, pharmaceutical simulation, economics, optimisation and scientific machine learning."
  ],
  usedBy: [
    {
      who: "Climate science",
      what: "The CliMA project builds a new climate model in Julia."
    },
    {
      who: "Federal Reserve Bank of New York",
      what: "Ported its economic forecasting model to Julia."
    },
    {
      who: "Pharma",
      what: "Pharmacometric modelling and simulation."
    }
  ],
  know: [
    "Arrays start at 1.",
    "Functions can have many methods; Julia chooses one by the types of all arguments (multiple dispatch).",
    "Loops are fast — no need to vectorise everything.",
    "You can use Unicode: type \\alpha then Tab to get α.",
    "The package manager is built in: press ] in the REPL, then add PackageName.",
    "The first run of a function compiles it, so it’s slower; later runs are fast."
  ],
  examples: [
    {
      title: "Comprehensions and functions",
      code: `squares = [x^2 for x in 1:5]      # [1, 4, 9, 16, 25]
println(sum(squares))             # 55

function mandel(c; maxiter = 80)
    z = 0.0 + 0.0im
    for n in 1:maxiter
        abs(z) > 2 && return n - 1
        z = z^2 + c
    end
    return maxiter
end

println(mandel(0.3 + 0.5im))`,
      note: ""
    },
    {
      title: "Multiple dispatch",
      code: `area(r::Real) = π * r^2               # circle
area(w::Real, h::Real) = w * h        # rectangle

describe(x::Integer) = "an integer"
describe(x::AbstractString) = "some text"

println(area(2.0, 3.0))               # 6.0
println(describe(42), " / ", describe("hi"))`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What is the “two-language problem” Julia tries to solve?",
      options: [
        "Needing English and Chinese docs",
        "Prototyping in a slow language, then rewriting in a fast one",
        "Having two compilers",
        "Supporting two operating systems"
      ],
      answer: 1,
      explain: "Julia aims to be both easy and fast."
    },
    {
      type: "mc",
      q: "What is multiple dispatch?",
      options: [
        "Running two threads",
        "Choosing a function’s method based on the types of all its arguments",
        "Sending emails",
        "Importing two packages"
      ],
      answer: 1,
      explain: "It’s Julia’s central design idea."
    },
    {
      type: "mc",
      q: "What does `sum([x^2 for x in 1:3])` return?",
      options: ["6", "14", "9", "36"],
      answer: 1,
      explain: "1 + 4 + 9 = 14."
    },
    {
      type: "mc",
      q: "Why is the first call of a Julia function slower?",
      options: [
        "It downloads code",
        "It is compiled the first time",
        "It runs in debug mode",
        "It isn’t"
      ],
      answer: 1,
      explain: "Just-in-time compilation happens on first use."
    }
  ],
  sources: [
    {
      t: "Julia — Learning",
      u: "https://julialang.org/learning/"
    },
    {
      t: "Julia documentation",
      u: "https://docs.julialang.org/"
    },
    {
      t: "Why We Created Julia (2012)",
      u: "https://julialang.org/blog/2012/02/why-we-created-julia/"
    },
    {
      t: "Julia — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Julia_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Julia’s creators said they were “greedy”: they wanted the speed of C with the ease of dynamic languages.",
      src: {
        t: "Why We Created Julia (2012)",
        u: "https://julialang.org/blog/2012/02/why-we-created-julia/"
      }
    },
    {
      text: "In Julia you can type \\alpha and press Tab to get α — and use it as a variable name.",
      src: {
        t: "Unicode input (Julia docs)",
        u: "https://docs.julialang.org/en/v1/manual/unicode-input/"
      }
    },
    {
      text: "The Federal Reserve Bank of New York ported its economic model to Julia.",
      src: {
        t: "Julia — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Julia_(programming_language)"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Scientific computing, climate, economics, pharma and optimisation."
  },
  learnIf: "you do scientific computing and want speed without writing C."
};

CT.langs["solidity"] = {
  id: "solidity",
  name: "Solidity",
  year: 2014,
  era: "mobile",
  level: "classic",
  creator: "Proposed by Gavin Wood; developed by the Ethereum team led by Christian Reitwiessner",
  org: "Ethereum Foundation",
  paradigm: "Contract-oriented, object-oriented",
  typing: "Static",
  prism: "solidity",
  tags: ["web"],
  tagline: "Code that lives on a blockchain — smart contracts for Ethereum.",
  story: [
    "Ethereum launched in 2015 as a blockchain that can run programs, not just record payments. Solidity, proposed in 2014, became its main language: code is compiled to bytecode for the Ethereum Virtual Machine and deployed as a “smart contract” that anyone can call.",
    "Smart contracts are public and usually can’t be changed once deployed, and every operation costs “gas” paid in cryptocurrency. That makes bugs expensive and permanent, so security auditing is a huge part of Solidity work.",
    "In 2016 a bug in The DAO, a contract holding investors’ Ether, let an attacker drain about $60 million, and Ethereum controversially hard-forked to reverse it. The lessons shaped modern contract security practices."
  ],
  usedBy: [
    {
      who: "Ethereum",
      what: "The main language for contracts on Ethereum and compatible chains."
    },
    {
      who: "Decentralised finance (DeFi)",
      what: "Token, lending and exchange contracts."
    },
    {
      who: "Security auditors",
      what: "Specialists who review contracts before launch."
    }
  ],
  know: [
    "contract is like a class whose state lives on the blockchain.",
    "msg.sender is the address calling the function.",
    "require(condition, \"message\") reverts the whole transaction if the condition fails.",
    "Every operation costs gas, so efficiency literally costs money.",
    "Since Solidity 0.8, arithmetic overflow reverts automatically.",
    "Deployed code is permanent — test and audit before launch."
  ],
  examples: [
    {
      title: "A simple counter contract",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;
    address public owner;

    constructor() {
        owner = msg.sender;            // whoever deployed the contract
    }

    function increment() external {
        count += 1;
    }

    function reset() external {
        require(msg.sender == owner, "only owner");
        count = 0;
    }
}`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What is `msg.sender`?",
      options: [
        "The contract’s name",
        "The address that called the function",
        "The block number",
        "The amount of gas"
      ],
      answer: 1,
      explain: "It’s how contracts know who is calling."
    },
    {
      type: "mc",
      q: "What does `require(...)` do when its condition is false?",
      options: ["Logs a warning", "Reverts the transaction", "Skips the line", "Retries"],
      answer: 1,
      explain: "Nothing in the transaction takes effect."
    },
    {
      type: "mc",
      q: "Why are smart-contract bugs so serious?",
      options: [
        "They slow down the internet",
        "Deployed contracts are public, often unchangeable, and may hold real money",
        "They crash browsers",
        "They can’t be compiled"
      ],
      answer: 1,
      explain: "The DAO hack showed how costly they can be."
    },
    {
      type: "mc",
      q: "What is “gas”?",
      options: [
        "A database",
        "The fee paid for each operation a contract runs",
        "A testing tool",
        "A Solidity keyword for loops"
      ],
      answer: 1,
      explain: "Inefficient code costs users more."
    }
  ],
  sources: [
    {
      t: "Solidity documentation",
      u: "https://docs.soliditylang.org/"
    },
    {
      t: "ethereum.org — Smart contracts",
      u: "https://ethereum.org/en/developers/docs/smart-contracts/"
    },
    {
      t: "The DAO — Wikipedia",
      u: "https://en.wikipedia.org/wiki/The_DAO"
    },
    {
      t: "Solidity — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Solidity"
    }
  ],
  facts: [
    {
      text: "A 2016 bug in The DAO contract let an attacker drain about $60 million of Ether, leading Ethereum to hard-fork.",
      src: {
        t: "The DAO — Wikipedia",
        u: "https://en.wikipedia.org/wiki/The_DAO"
      }
    },
    {
      text: "Since Solidity 0.8, integer overflow reverts automatically instead of silently wrapping around.",
      src: {
        t: "Solidity docs — Checked or unchecked arithmetic",
        u: "https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic"
      }
    },
    {
      text: "Every Ethereum operation costs gas, so a slow algorithm literally costs users more money.",
      src: {
        t: "ethereum.org — Gas and fees",
        u: "https://ethereum.org/en/developers/docs/gas/"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "Smart contracts on Ethereum and compatible blockchains."
  },
  learnIf: "you’re interested in blockchain development or smart-contract security."
};

CT.langs["zig"] = {
  id: "zig",
  name: "Zig",
  year: 2016,
  era: "mobile",
  level: "core",
  creator: "Andrew Kelley",
  org: "Zig Software Foundation",
  paradigm: "Imperative, systems",
  typing: "Static, strong",
  prism: "zig",
  tags: ["systems"],
  tagline: "A simpler C alternative: no hidden control flow, no hidden allocations, compile-time code.",
  story: [
    "Andrew Kelley started Zig around 2015 and first released it in 2016, aiming for a language as low-level as C but easier to read and harder to misuse. A guiding rule: no hidden control flow and no hidden memory allocations — if code allocates memory, you can see it.",
    "Instead of macros and a preprocessor, Zig runs ordinary Zig code at compile time with comptime. Errors are values (error unions), cleanup uses defer, and memory allocators are passed in explicitly. The Zig toolchain can also compile C and C++ and cross-compile to other platforms easily.",
    "Zig hasn’t reached 1.0 yet, so the language still changes between versions, but serious projects already use it — including the Bun JavaScript runtime, the TigerBeetle database and the Ghostty terminal."
  ],
  usedBy: [
    {
      who: "Bun",
      what: "The fast JavaScript runtime and toolkit is written in Zig."
    },
    {
      who: "TigerBeetle",
      what: "A financial transactions database built in Zig."
    },
    {
      who: "Ghostty",
      what: "Mitchell Hashimoto’s terminal emulator."
    }
  ],
  know: [
    "const for constants, var for variables.",
    "!T is an error union: a value or an error. Use try to pass errors up.",
    "defer runs cleanup code when the current scope ends.",
    "Functions that allocate memory take an allocator parameter — nothing allocates behind your back.",
    "comptime runs Zig code during compilation (instead of macros).",
    "?T is an optional — a value or null — and the compiler makes you handle it."
  ],
  examples: [
    {
      title: "Hello and error handling",
      code: `const std = @import("std");

fn divide(a: i32, b: i32) !i32 {
    if (b == 0) return error.DivisionByZero;
    return @divTrunc(a, b);
}

pub fn main() !void {
    std.debug.print("Hello, {s}!\\n", .{"world"});
    const result = try divide(10, 2);
    std.debug.print("10 / 2 = {d}\\n", .{result});
}`,
      note: ""
    },
    {
      title: "Explicit memory with an allocator and defer",
      code: `const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;

    const buffer = try allocator.alloc(u8, 100);
    defer allocator.free(buffer);      // runs when main returns

    std.debug.print("Got {d} bytes\\n", .{buffer.len});
}`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does the return type `!i32` mean?",
      options: ["Not an integer", "An i32 or an error", "A pointer to i32", "A constant"],
      answer: 1,
      explain: "Error unions make failure part of the type."
    },
    {
      type: "mc",
      q: "What does `defer` do?",
      options: [
        "Delays the whole program",
        "Runs a statement when the current scope ends",
        "Skips a line",
        "Creates a thread"
      ],
      answer: 1,
      explain: "Perfect for freeing memory or closing files."
    },
    {
      type: "mc",
      q: "Which popular JavaScript runtime is written in Zig?",
      options: ["Node.js", "Deno", "Bun", "V8"],
      answer: 2,
      explain: "Bun is written in Zig."
    },
    {
      type: "fill",
      q: "Complete the line so the buffer is freed when the function returns.",
      code: "____ allocator.free(buffer);",
      answers: ["defer"],
      explain: "defer schedules cleanup at scope exit."
    }
  ],
  sources: [
    {
      t: "Zig — Learn",
      u: "https://ziglang.org/learn/"
    },
    {
      t: "Zig language reference",
      u: "https://ziglang.org/documentation/master/"
    },
    {
      t: "Ziglings — learn Zig by fixing small programs",
      u: "https://codeberg.org/ziglings/exercises"
    },
    {
      t: "Zig — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Zig_(programming_language)"
    }
  ],
  facts: [
    {
      text: "zig cc works as a drop-in C compiler and makes cross-compiling C code unusually easy.",
      src: {
        t: "Zig — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Zig_(programming_language)"
      }
    },
    {
      text: "Bun, a fast JavaScript runtime, is written in Zig.",
      src: {
        t: "Bun on GitHub",
        u: "https://github.com/oven-sh/bun"
      }
    },
    {
      text: "Zig has no macros or preprocessor — code that runs at compile time is just Zig, marked comptime.",
      src: {
        t: "Zig — Overview",
        u: "https://ziglang.org/learn/overview/"
      }
    }
  ],
  today: {
    status: "Growing",
    text: "Systems tools, runtimes, databases and C-replacement projects."
  },
  learnIf: "you like C’s control but want fewer foot-guns."
};

CT.langs["mojo"] = {
  id: "mojo",
  name: "Mojo",
  year: 2023,
  era: "ai",
  level: "core",
  creator: "Chris Lattner and team",
  org: "Modular",
  paradigm: "Multi-paradigm, systems, Python-family",
  typing: "Static (fn) and dynamic (def)",
  prism: "python",
  tags: ["ai", "systems"],
  tagline: "Python-style syntax with systems-level speed, built for AI hardware.",
  story: [
    "AI researchers write Python, but the code that actually runs fast on GPUs is written in C++ and CUDA. Modular, co-founded by Chris Lattner — creator of LLVM, Clang and Swift — announced Mojo in 2023 to close that gap: a language in the Python family that can also do low-level, high-performance work.",
    "Mojo is built on MLIR, a compiler framework Lattner co-created at Google, which lets it target CPUs, GPUs and other accelerators. You can write relaxed, Python-like def functions or strict, typed fn functions, use SIMD types directly, and import existing Python libraries.",
    "Mojo is young and still changing quickly, so code from one version may need updates for the next. Modular uses it to build its AI inference platform and GPU kernels."
  ],
  usedBy: [
    {
      who: "Modular",
      what: "Its AI inference platform and high-performance GPU kernels are written in Mojo."
    },
    {
      who: "Performance engineers",
      what: "Speeding up hot Python code paths without switching to C++."
    },
    {
      who: "Researchers",
      what: "Experimenting with portable GPU programming."
    }
  ],
  know: [
    "Syntax looks like Python: indentation, def, for loops.",
    "fn functions are strict and typed; def functions are more flexible, like Python.",
    "var declares a variable.",
    "Mojo can import and call Python modules such as NumPy.",
    "It targets CPUs and GPUs through MLIR.",
    "The language is evolving fast — always check the current docs."
  ],
  examples: [
    {
      title: "Typed functions and loops",
      code: `fn add(a: Int, b: Int) -> Int:
    return a + b

fn main():
    var total = 0
    for i in range(10):
        total += i
    print("total:", total)      # 45
    print(add(2, 3))            # 5`,
      note: "Mojo is still evolving quickly — if something doesn’t compile, check the latest docs."
    },
    {
      title: "Using a Python library from Mojo",
      code: `from python import Python

fn main() raises:
    var np = Python.import_module("numpy")
    var arr = np.arange(5)
    print(arr * 2)              # [0 2 4 6 8]`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Who leads Mojo’s creation?",
      options: ["Guido van Rossum", "Chris Lattner", "Andrew Kelley", "Anders Hejlsberg"],
      answer: 1,
      explain: "Lattner also created LLVM, Clang and Swift."
    },
    {
      type: "mc",
      q: "What problem is Mojo trying to solve?",
      options: [
        "Making websites",
        "Python is easy but slow; fast AI code is usually C++/CUDA",
        "Replacing SQL",
        "Running on old phones"
      ],
      answer: 1,
      explain: "One language for both ease and performance."
    },
    {
      type: "mc",
      q: "What is the difference between `fn` and `def` in Mojo?",
      options: [
        "None",
        "fn is strict and typed; def is flexible like Python",
        "def is faster",
        "fn is only for classes"
      ],
      answer: 1,
      explain: "Mojo offers both styles."
    },
    {
      type: "mc",
      q: "What compiler framework is Mojo built on?",
      options: ["GCC", "MLIR", "JVM", ".NET"],
      answer: 1,
      explain: "MLIR targets CPUs, GPUs and accelerators."
    }
  ],
  sources: [
    {
      t: "Mojo manual (Modular docs)",
      u: "https://docs.modular.com/mojo/manual/"
    },
    {
      t: "Modular",
      u: "https://www.modular.com/"
    },
    {
      t: "Mojo — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Mojo_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Mojo source files can use the 🔥 emoji as a file extension, as well as .mojo.",
      src: {
        t: "Mojo — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Mojo_(programming_language)"
      }
    },
    {
      text: "Chris Lattner created LLVM, Clang and Swift before Mojo.",
      src: {
        t: "Chris Lattner — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Chris_Lattner"
      }
    },
    {
      text: "Mojo is built on MLIR, a compiler framework Lattner co-created at Google.",
      src: {
        t: "MLIR",
        u: "https://mlir.llvm.org/"
      }
    }
  ],
  today: {
    status: "Growing",
    text: "AI kernels, high-performance Python-style code and GPU programming."
  },
  learnIf: "you know Python and want to write fast AI and GPU code."
};

CT.langs["gleam"] = {
  id: "gleam",
  name: "Gleam",
  year: 2024,
  era: "ai",
  level: "core",
  creator: "Louis Pilfold",
  org: "Gleam core team (open source)",
  paradigm: "Functional",
  typing: "Static, strong, inferred",
  prism: "rust",
  tags: ["web", "systems"],
  tagline: "A friendly, type-safe language for the Erlang VM — and JavaScript.",
  story: [
    "Louis Pilfold started Gleam in 2016 to bring a modern static type system to the Erlang virtual machine (the BEAM) that powers WhatsApp and Discord. After years of open development, Gleam 1.0 was released in March 2024.",
    "Gleam is deliberately small: no null, no exceptions, immutable data, Result types for errors, and very friendly compiler messages. The same code can compile to Erlang for servers or to JavaScript for browsers.",
    "Its community is small but fast-growing, with web frameworks like Wisp (servers) and Lustre (front ends) built around it."
  ],
  usedBy: [
    {
      who: "BEAM developers",
      what: "Erlang and Elixir teams adding type safety to their systems."
    },
    {
      who: "Web developers",
      what: "Back ends with Wisp and front ends with Lustre."
    },
    {
      who: "Hobbyists",
      what: "A popular first functional language thanks to its friendly errors."
    }
  ],
  know: [
    "pub fn defines a public function; let bindings are immutable.",
    "|> pipes a value into the next function.",
    "case does pattern matching, and the compiler checks every case is covered.",
    "No null and no exceptions — use Result(value, error) and Option.",
    "Float maths has its own operators: 1.5 *. 2.0, so mixing ints and floats by accident is a compile error.",
    "gleam new, gleam run and gleam add manage projects and packages."
  ],
  examples: [
    {
      title: "Pipes and the standard library",
      code: `import gleam/int
import gleam/io
import gleam/list

pub fn main() {
  [1, 2, 3, 4, 5, 6]
  |> list.map(fn(x) { x * x })
  |> list.filter(int.is_even)
  |> list.each(fn(x) { io.println(int.to_string(x)) })
  // prints 4, 16, 36
}`,
      note: ""
    },
    {
      title: "Custom types and pattern matching",
      code: `pub type Shape {
  Circle(radius: Float)
  Rectangle(width: Float, height: Float)
}

pub fn area(shape: Shape) -> Float {
  case shape {
    Circle(r) -> 3.14159 *. r *. r
    Rectangle(w, h) -> w *. h
  }
}`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which virtual machine does Gleam run on (besides compiling to JavaScript)?",
      options: ["JVM", "The BEAM (Erlang VM)", "CLR", "WebAssembly only"],
      answer: 1,
      explain: "The same VM as Erlang and Elixir."
    },
    {
      type: "mc",
      q: "How does Gleam handle errors?",
      options: ["Exceptions", "Result values", "null", "It ignores them"],
      answer: 1,
      explain: "No exceptions — errors are values."
    },
    {
      type: "mc",
      q: "Why does Gleam have a separate `*.` operator?",
      options: [
        "It’s faster",
        "Floats and ints use different operators, so mixing them by mistake is a compile error",
        "For string multiplication",
        "It’s a typo"
      ],
      answer: 1,
      explain: "Type safety even in arithmetic."
    },
    {
      type: "mc",
      q: "When was Gleam 1.0 released?",
      options: ["2016", "2019", "2024", "2026"],
      answer: 2,
      explain: "March 2024, after years of development."
    }
  ],
  sources: [
    {
      t: "Gleam language tour",
      u: "https://tour.gleam.run/"
    },
    {
      t: "gleam.run",
      u: "https://gleam.run/"
    },
    {
      t: "Gleam version 1 announcement",
      u: "https://gleam.run/news/gleam-version-1/"
    },
    {
      t: "Gleam — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Gleam_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Gleam’s mascot is Lucy, a pink star.",
      src: {
        t: "gleam.run",
        u: "https://gleam.run/"
      }
    },
    {
      text: "Gleam code can compile to Erlang for servers or to JavaScript for browsers.",
      src: {
        t: "Gleam language tour",
        u: "https://tour.gleam.run/"
      }
    },
    {
      text: "Gleam 1.0 arrived in March 2024, eight years after the project began.",
      src: {
        t: "Gleam version 1 announcement",
        u: "https://gleam.run/news/gleam-version-1/"
      }
    }
  ],
  today: {
    status: "Growing",
    text: "Type-safe back ends on the BEAM and front ends compiled to JavaScript."
  },
  learnIf: "you want a friendly introduction to typed functional programming."
};
