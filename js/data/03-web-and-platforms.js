/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
CT.langs["java"] = {
  id: "java",
  name: "Java",
  year: 1995,
  era: "web",
  level: "modern",
  creator: "James Gosling and team",
  org: "Sun Microsystems (now Oracle)",
  paradigm: "Object-oriented, with functional features",
  typing: "Static, strong",
  prism: "java",
  tags: ["mobile", "games", "business", "web"],
  tagline: "Write once, run anywhere — from flip phones and Android to the world’s banks.",
  story: [
    "James Gosling’s team at Sun started a project in 1991 for interactive TV and consumer devices. Their language, first called Oak, was renamed Java and released in 1995. Java code compiles to bytecode that runs on the Java Virtual Machine (JVM), so the same program runs on Windows, Mac, Linux or a phone — “write once, run anywhere.” It also brought automatic garbage collection to mainstream programmers.",
    "Java became the default language of enterprise software, and before smartphones, Java ME powered thousands of phone games. When Google launched Android in 2008, apps were written in Java. Oracle bought Sun in 2010 and sued Google over its use of Java APIs; in 2021 the US Supreme Court ruled Google’s use was fair use.",
    "Minecraft (Java Edition) is written in Java, which is why so many people learned Java to write mods. Modern Java ships a new version every six months, with long-term-support releases like Java 17, 21 and 25 adding records, switch expressions, pattern matching and lightweight virtual threads."
  ],
  usedBy: [
    {
      who: "Google",
      what: "Android’s original app language; one of Google’s main backend languages."
    },
    {
      who: "Mojang / Microsoft",
      what: "Minecraft: Java Edition, and the giant modding community around it."
    },
    {
      who: "Amazon, Netflix, LinkedIn",
      what: "Backend services, often with the Spring framework."
    },
    {
      who: "Banks & governments",
      what: "Payment, trading and records systems."
    },
    {
      who: "Oracle",
      what: "Owns Java and leads its development with the OpenJDK community."
    }
  ],
  know: [
    "Everything lives inside a class; programs start at public static void main(String[] args).",
    "Primitive types (int, double, boolean) vs objects (String, Integer, your classes).",
    "Compare strings with .equals(), not == (== checks whether they are the same object).",
    "Interfaces define contracts; classes implement them. A class can extend only one class.",
    "Checked exceptions must be caught or declared with throws.",
    "Collections: List, Map, Set (ArrayList, HashMap, HashSet).",
    "Streams and lambdas give a functional style: list.stream().filter(...).map(...).",
    "Build tools: Maven or Gradle (Gradle also builds Android apps).",
    "Kotlin, Scala and Clojure also run on the JVM and can use Java libraries."
  ],
  examples: [
    {
      title: "Records, streams and switch expressions (modern Java)",
      code: `import java.util.List;

public class Main {
    record Game(String title, int year, double rating) {}

    public static void main(String[] args) {
        List<Game> games = List.of(
            new Game("Minecraft", 2011, 9.5),
            new Game("Portal 2", 2011, 9.6),
            new Game("Tetris", 1984, 9.0)
        );

        games.stream()
             .filter(g -> g.year() > 2000)
             .map(Game::title)
             .forEach(System.out::println);      // Minecraft, Portal 2

        String era = switch (games.get(2).year() / 10) {
            case 198 -> "80s";
            case 199 -> "90s";
            default  -> "modern";
        };
        System.out.println("Tetris era: " + era); // Tetris era: 80s
    }
}`,
      note: ""
    },
    {
      title: "Interfaces and classes",
      code: `interface Shape {
    double area();
}

class Circle implements Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
    @Override public double area() { return Math.PI * radius * radius; }
}

class Rect implements Shape {
    private final double w, h;
    Rect(double w, double h) { this.w = w; this.h = h; }
    @Override public double area() { return w * h; }
}

// Shape s = new Rect(2, 3);  s.area() -> 6.0`,
      note: ""
    },
    {
      title: "Android (classic Java style)",
      code: `public class MainActivity extends AppCompatActivity {
    private int count = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button button = findViewById(R.id.button);
        TextView label = findViewById(R.id.label);
        button.setOnClickListener(v -> label.setText("Taps: " + (++count)));
    }
}`,
      note: ""
    }
  ],
  cheats: [
    ["Main", "public static void main(String[] args) { }"],
    ["List", "List<String> names = new ArrayList<>(); names.add(\"Ada\");"],
    ["Map", "Map<String, Integer> m = new HashMap<>(); m.put(\"hp\", 100);"],
    ["Lambda", "names.forEach(n -> System.out.println(n));"],
    ["Try", "try { ... } catch (IOException e) { ... } finally { ... }"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What does the JVM run?",
      options: [
        "Java source code directly",
        "Bytecode compiled from Java (and other JVM languages)",
        "Only Android apps",
        "Machine code for x86 only"
      ],
      answer: 1,
      explain: "javac compiles .java files to .class bytecode, which any JVM can run."
    },
    {
      type: "mc",
      q: "How should you compare the contents of two Strings?",
      options: ["a == b", "a.equals(b)", "a === b", "compare(a, b)"],
      answer: 1,
      explain: "== checks object identity; equals compares characters."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["true", "false", "Compile error", "null"],
      answer: 1,
      explain: "new String creates a distinct object, so == is false even though the text matches.",
      code: `String a = new String("hi");
String b = new String("hi");
System.out.println(a == b);`
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["2", "2.5", "3", "Error"],
      answer: 0,
      explain: "int / int is integer division in Java.",
      code: `int x = 5;
System.out.println(x / 2);`
    },
    {
      type: "mc",
      q: "Which famous game’s original edition is written in Java?",
      options: ["Fortnite", "Minecraft", "Halo", "Roblox"],
      answer: 1,
      explain: "Minecraft: Java Edition — the Bedrock edition is C++."
    },
    {
      type: "mc",
      q: "What did the US Supreme Court decide in Google v. Oracle (2021)?",
      options: [
        "Google must stop using Java",
        "Google’s use of the Java APIs was fair use",
        "Java became public domain",
        "Oracle sold Java"
      ],
      answer: 1,
      explain: "The court ruled 6–2 that Google’s copying of the API declarations was fair use."
    },
    {
      type: "fill",
      q: "Complete the program’s entry point.",
      code: `public static void ____(String[] args) {
    System.out.println("Hi");
}`,
      answers: ["main"],
      explain: "The JVM looks for public static void main(String[] args)."
    },
    {
      type: "fill",
      q: "Complete the keyword that makes a class follow an interface.",
      code: "class Circle ____ Shape { ... }",
      answers: ["implements"],
      explain: "Classes extend one class but can implement many interfaces."
    },
    {
      type: "mc",
      q: "Which feature lets you declare a compact immutable data class in one line?",
      options: ["enum", "record", "struct", "data"],
      answer: 1,
      explain: "Records (Java 16+) generate the constructor, accessors, equals, hashCode and toString."
    },
    {
      type: "mc",
      q: "What does try-with-resources do?",
      options: [
        "Retries failed code",
        "Automatically closes files and connections when the block ends",
        "Runs code in parallel",
        "Catches every exception"
      ],
      answer: 1,
      explain: "try (var in = new FileInputStream(f)) { ... } closes in automatically."
    },
    {
      type: "mc",
      q: "Which tool would you use to build and manage dependencies for a Java project?",
      options: ["npm", "pip", "Gradle", "Cargo"],
      answer: 2,
      explain: "Maven and Gradle are Java’s build tools."
    }
  ],
  sources: [
    {
      t: "dev.java — official Java learning",
      u: "https://dev.java/learn/"
    },
    {
      t: "The Java Tutorials (Oracle)",
      u: "https://docs.oracle.com/javase/tutorial/"
    },
    {
      t: "OpenJDK",
      u: "https://openjdk.org/"
    },
    {
      t: "Android Developers",
      u: "https://developer.android.com/"
    },
    {
      t: "Java — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Java_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Java was first called Oak, after a tree outside James Gosling’s office. The name was already trademarked, so it became Java.",
      src: {
        t: "Java — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Java_(programming_language)"
      }
    },
    {
      text: "Java’s mascot is a tooth-shaped character called Duke.",
      src: {
        t: "Java — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Java_(programming_language)"
      }
    },
    {
      text: "Every compiled .class file begins with the hex bytes CAFEBABE.",
      src: {
        t: "Java class file — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Java_class_file"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Enterprise back ends, Android, big-data tools, banking and Minecraft mods."
  },
  learnIf: "you want backend or enterprise jobs, Android, or Minecraft modding.",
  ecosystem: [
    {
      name: "Maven / Gradle",
      what: "Build tools that download libraries and compile, test and package your app."
    },
    {
      name: "Spring Boot",
      what: "The dominant framework for Java web services and microservices."
    },
    {
      name: "JUnit",
      what: "The standard testing framework."
    },
    {
      name: "IntelliJ IDEA",
      what: "The most popular Java IDE (made by JetBrains, who also created Kotlin)."
    },
    {
      name: "Hibernate / JPA",
      what: "Map Java objects to database tables."
    },
    {
      name: "Android SDK",
      what: "Java (and Kotlin) for Android apps."
    },
    {
      name: "Fabric / NeoForge",
      what: "Popular Minecraft modding toolchains."
    }
  ],
  pitfalls: [
    "Comparing strings with == instead of .equals().",
    "NullPointerException from objects that were never set.",
    "Forgetting to close files and connections — use try-with-resources.",
    "Integer division surprises: 5 / 2 is 2.",
    "Building deep inheritance hierarchies instead of using interfaces and composition."
  ],
  roadmap: [
    "Syntax, types, loops and methods.",
    "Classes, interfaces and inheritance.",
    "Collections and generics (List, Map, Set).",
    "Exceptions, streams and lambdas.",
    "Maven or Gradle, plus JUnit tests.",
    "Build a Spring Boot REST API — or an Android app or Minecraft mod."
  ],
  projects: [
    "A console bank-account manager with deposits, withdrawals and history.",
    "A Spring Boot REST API with a database.",
    "A simple Minecraft mod that adds an item.",
    "A JavaFX desktop app."
  ]
};

CT.langs["javascript"] = {
  id: "javascript",
  name: "JavaScript",
  year: 1995,
  era: "web",
  level: "modern",
  creator: "Brendan Eich",
  org: "Netscape",
  paradigm: "Multi-paradigm: event-driven, functional, prototype-based OOP",
  typing: "Dynamic, weak",
  prism: "javascript",
  tags: ["web", "mobile", "games"],
  tagline: "Built in 10 days, now runs in every browser on Earth — and on servers, phones and desktops.",
  story: [
    "In May 1995 Brendan Eich wrote the first version of JavaScript for Netscape Navigator in about 10 days. It was called Mocha, then LiveScript, then renamed JavaScript as a marketing tie-in with Sun’s Java — the two languages are otherwise unrelated. Microsoft reverse-engineered it as JScript for Internet Explorer, so it was standardised as ECMAScript in 1997.",
    "For years it was seen as a toy for image rollovers. Then Gmail (2004) and Google Maps (2005) showed full applications could run in the browser with background requests (AJAX). Google’s V8 engine (Chrome, 2008) made JavaScript fast, and Ryan Dahl used V8 to create Node.js (2009), bringing JavaScript to servers.",
    "ES2015 (often called ES6) modernised the language with let/const, arrow functions, classes, modules and promises. Today JavaScript, with frameworks like React (Meta), Angular (Google) and Vue, builds most web front ends; React Native builds phone apps; Electron builds desktop apps like VS Code, Discord and Slack."
  ],
  usedBy: [
    {
      who: "Every browser",
      what: "The only language every web browser runs natively (alongside WebAssembly)."
    },
    {
      who: "Google",
      what: "Gmail, Google Maps, Docs; V8 engine; the Angular framework."
    },
    {
      who: "Meta",
      what: "React and React Native, used across Facebook and Instagram."
    },
    {
      who: "Microsoft",
      what: "VS Code (built on Electron), TypeScript, and Office on the web."
    },
    {
      who: "Netflix, PayPal, Uber",
      what: "Node.js backend services."
    }
  ],
  know: [
    "Use const by default, let when you need to reassign, and avoid var.",
    "Use === (strict equality). == converts types first: 0 == \"\" is true.",
    "Functions are values: pass them around, return them, store them in arrays.",
    "Arrow functions (x => x * 2) don’t have their own this.",
    "JavaScript is single-threaded with an event loop. Promise callbacks (microtasks) run before setTimeout callbacks (macrotasks).",
    "async/await is syntax on top of promises — always handle errors with try/catch.",
    "Numbers are 64-bit floating point, so 0.1 + 0.2 is 0.30000000000000004.",
    "The DOM is the browser’s live model of the page; JavaScript reads and changes it.",
    "Template literals use backticks and ${} for interpolation."
  ],
  examples: [
    {
      title: "Arrays, destructuring and template literals",
      code: `const games = [
  { title: "Pong",    year: 1972, genre: "arcade" },
  { title: "Doom",    year: 1993, genre: "shooter" },
  { title: "Celeste", year: 2018, genre: "platformer" },
];

const modern = games
  .filter(g => g.year >= 1990)
  .map(({ title, year }) => \`\${title} (\${year})\`);

console.log(modern);  // ["Doom (1993)", "Celeste (2018)"]

const total = games.reduce((sum, g) => sum + g.year, 0);
const [first, ...rest] = games;
console.log(first.title, rest.length);   // Pong 2`,
      note: ""
    },
    {
      title: "Fetching data with async/await",
      code: `async function loadUser(id) {
  try {
    const res = await fetch(\`https://api.example.com/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("Failed to load user:", err.message);
    return null;
  }
}`,
      note: ""
    },
    {
      title: "The DOM: a click counter",
      code: `<button id="btn">Clicked 0 times</button>
<script>
  const btn = document.querySelector("#btn");
  let count = 0;
  btn.addEventListener("click", () => {
    count++;
    btn.textContent = \`Clicked \${count} times\`;
  });
</script>`,
      note: ""
    },
    {
      title: "Closures",
      code: `function makeCounter() {
  let count = 0;                 // private to this closure
  return () => ++count;
}

const next = makeCounter();
next(); next();
console.log(next());   // 3`,
      note: ""
    }
  ],
  cheats: [
    ["Variables", "const x = 1; let y = 2;"],
    ["Arrow fn", "const add = (a, b) => a + b;"],
    ["Spread", "const merged = { ...defaults, ...options };"],
    ["Optional chain", "user?.address?.city ?? \"unknown\""],
    ["Module", "import { thing } from \"./thing.js\"; export default App;"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What is the result of `0.1 + 0.2 === 0.3`?",
      options: ["true", "false", "TypeError", "undefined"],
      answer: 1,
      explain: "Floating-point rounding makes 0.1 + 0.2 equal 0.30000000000000004."
    },
    {
      type: "mc",
      q: "What does `typeof null` return?",
      options: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""],
      answer: 1,
      explain: "A famous bug from the first version of JavaScript that can never be fixed without breaking the web."
    },
    {
      type: "mc",
      q: "In what order are the letters logged?",
      options: ["A B C D", "A D B C", "A D C B", "A C D B"],
      answer: 2,
      explain: "Synchronous code runs first (A, D); then microtasks (the promise, C); then timers (B).",
      code: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`
    },
    {
      type: "mc",
      q: "What does `\"5\" == 5` return?",
      options: ["true", "false", "Error", "\"55\""],
      answer: 0,
      explain: "== converts types before comparing. Use === to avoid surprises."
    },
    {
      type: "mc",
      q: "What does `\"5\" + 1` produce?",
      options: ["6", "\"51\"", "NaN", "Error"],
      answer: 1,
      explain: "+ with a string concatenates."
    },
    {
      type: "mc",
      q: "What does this log?",
      options: ["1", "2", "3", "undefined"],
      answer: 2,
      explain: "Each call increments the same private count captured by the closure.",
      code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
next(); next();
console.log(next());`
    },
    {
      type: "mc",
      q: "What does this log?",
      options: ["[1, 2, 3]", "[2, 4, 6]", "6", "undefined"],
      answer: 1,
      explain: "map returns a new array with each element transformed.",
      code: "console.log([1, 2, 3].map(x => x * 2));"
    },
    {
      type: "fill",
      q: "Complete the declaration for a variable that will never be reassigned.",
      code: "____ apiUrl = \"https://example.com\";",
      answers: ["const"],
      explain: "Prefer const; use let only when you need to reassign."
    },
    {
      type: "fill",
      q: "Complete the keyword that waits for a promise inside an async function.",
      code: "const data = ____ fetch(url);",
      answers: ["await"],
      explain: "await pauses the async function until the promise settles."
    },
    {
      type: "mc",
      q: "Who created Node.js, bringing JavaScript to the server?",
      options: ["Brendan Eich", "Ryan Dahl", "Douglas Crockford", "Anders Hejlsberg"],
      answer: 1,
      explain: "Ryan Dahl built Node.js on Google’s V8 engine in 2009."
    },
    {
      type: "mc",
      q: "What is wrong here?",
      options: [
        "Nothing",
        "fetch returns a Promise, so data is a Promise, not the JSON",
        "fetch needs a callback",
        "url must be uppercase"
      ],
      answer: 1,
      explain: "You need await fetch(url) and then await res.json().",
      code: `function load(url) {
  const data = fetch(url);
  console.log(data.title);
}`
    },
    {
      type: "mc",
      q: "Why store prices as integer cents?",
      options: [
        "It uses less memory",
        "Floating-point maths can produce rounding errors like 0.1 + 0.2",
        "JavaScript has no decimals",
        "Browsers require it"
      ],
      answer: 1,
      explain: "Integer cents avoid floating-point surprises."
    }
  ],
  sources: [
    {
      t: "MDN Web Docs — JavaScript",
      u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },
    {
      t: "javascript.info — The Modern JavaScript Tutorial",
      u: "https://javascript.info/"
    },
    {
      t: "Eloquent JavaScript (free book)",
      u: "https://eloquentjavascript.net/"
    },
    {
      t: "Node.js — Learn",
      u: "https://nodejs.org/en/learn"
    },
    {
      t: "ECMAScript specification (TC39)",
      u: "https://tc39.es/ecma262/"
    },
    {
      t: "JavaScript — Wikipedia",
      u: "https://en.wikipedia.org/wiki/JavaScript"
    }
  ],
  facts: [
    {
      text: "Java and JavaScript are related about as much as “car” and “carpet.”",
      src: {
        t: "JavaScript — Wikipedia",
        u: "https://en.wikipedia.org/wiki/JavaScript"
      }
    },
    {
      text: "In JavaScript, [] + [] is an empty string and [] + {} is \"[object Object]\" — famous examples from Gary Bernhardt’s 2012 “Wat” talk.",
      src: {
        t: "Wat — Gary Bernhardt (2012)",
        u: "https://www.destroyallsoftware.com/talks/wat"
      }
    },
    {
      text: "npm, JavaScript’s package registry, is the largest software registry in the world with millions of packages.",
      src: {
        t: "npm — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Npm"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Every website, plus servers (Node.js), desktop apps (Electron) and mobile apps (React Native)."
  },
  learnIf: "you want to build anything for the web — it’s unavoidable.",
  ecosystem: [
    {
      name: "npm / pnpm",
      what: "Package managers for the world’s largest software registry."
    },
    {
      name: "Node.js",
      what: "Run JavaScript on servers and in command-line tools."
    },
    {
      name: "React · Vue · Svelte",
      what: "The most popular front-end frameworks."
    },
    {
      name: "Vite",
      what: "A fast dev server and build tool."
    },
    {
      name: "Express",
      what: "A minimal web server framework for Node."
    },
    {
      name: "Vitest / Jest",
      what: "Testing frameworks."
    },
    {
      name: "ESLint · Prettier",
      what: "Catch mistakes and auto-format code."
    }
  ],
  pitfalls: [
    "Using == instead of === and getting surprising type conversions.",
    "Forgetting await, then using a Promise as if it were the data.",
    "Losing this inside callbacks (arrow functions help).",
    "Storing money as floating-point numbers — use integer cents.",
    "Mutating state directly in React instead of creating new objects."
  ],
  roadmap: [
    "HTML and CSS basics.",
    "JavaScript syntax, the DOM and events.",
    "fetch, Promises and async/await.",
    "Modules and npm.",
    "A framework such as React.",
    "Node.js back ends, then TypeScript."
  ],
  projects: [
    "A to-do app that saves to localStorage.",
    "A weather app using a free public API.",
    "A canvas game like Snake or Breakout.",
    "A Discord bot with Node.js.",
    "Your own portfolio website on GitHub Pages."
  ]
};

CT.langs["php"] = {
  id: "php",
  name: "PHP",
  year: 1995,
  era: "web",
  level: "core",
  creator: "Rasmus Lerdorf",
  org: "Open source (The PHP Group)",
  paradigm: "Imperative, object-oriented",
  typing: "Dynamic, with optional strict types",
  prism: "php",
  tags: ["web"],
  tagline: "The server-side language behind WordPress, Wikipedia and early Facebook.",
  story: [
    "Rasmus Lerdorf wrote a set of C scripts in 1994 to track visits to his online résumé and released them in 1995 as “Personal Home Page Tools.” It grew into a full language, now officially named PHP: Hypertext Preprocessor (a recursive acronym). PHP code can be dropped straight into HTML and runs on the server before the page is sent to the browser.",
    "PHP made it easy and cheap to build dynamic sites, and shared web hosts everywhere supported it. Mark Zuckerberg built Facebook in PHP in 2004. To scale it, Facebook built a PHP-to-C++ compiler (HipHop), then the HHVM virtual machine, and then the Hack language (2014).",
    "WordPress, written in PHP, powers over 40% of all websites. Wikipedia runs on MediaWiki, also PHP. PHP 7 roughly doubled performance, and PHP 8 added a JIT compiler, union types, match expressions, enums and named arguments. Laravel is the most popular modern PHP framework."
  ],
  usedBy: [
    {
      who: "Meta",
      what: "Facebook started in PHP and evolved it into Hack running on HHVM."
    },
    {
      who: "WordPress",
      what: "The world’s most used CMS, powering over 40% of websites."
    },
    {
      who: "Wikimedia",
      what: "Wikipedia’s MediaWiki software."
    },
    {
      who: "Slack & Etsy",
      what: "Slack’s backend was built on PHP/Hack; Etsy is a long-time PHP shop."
    }
  ],
  know: [
    "Variables start with $.",
    ". joins strings; double-quoted strings interpolate variables (\"Hi $name\").",
    "Associative arrays work like dictionaries: ['hp' => 100].",
    "Add declare(strict_types=1); to get stricter type checks.",
    "Always use prepared statements (PDO) for database queries to prevent SQL injection.",
    "Composer is PHP’s package manager; Laravel and Symfony are the major frameworks."
  ],
  examples: [
    {
      title: "Modern PHP 8: enums, match and named arguments",
      code: `<?php
declare(strict_types=1);

enum Status: string {
    case Active = 'active';
    case Banned = 'banned';
}

function greet(string $name, Status $status = Status::Active): string {
    return match ($status) {
        Status::Active => "Welcome back, {$name}!",
        Status::Banned => "Sorry {$name}, access denied.",
    };
}

echo greet('Ada') . PHP_EOL;
echo greet(name: 'Linus', status: Status::Banned) . PHP_EOL;`,
      note: ""
    },
    {
      title: "Safe database query with PDO",
      code: `<?php
$pdo = new PDO('mysql:host=localhost;dbname=shop', $user, $pass);

$stmt = $pdo->prepare('SELECT name, price FROM products WHERE price < :max');
$stmt->execute(['max' => 20]);

foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    echo htmlspecialchars($row['name']) . " - $" . $row['price'] . "<br>";
}`,
      note: "htmlspecialchars prevents cross-site scripting (XSS) when printing user data."
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which symbol starts every PHP variable?",
      options: ["@", "$", "#", "&"],
      answer: 1,
      explain: "All PHP variables start with $."
    },
    {
      type: "mc",
      q: "Which operator joins strings in PHP?",
      options: ["+", ".", "&", ".."],
      answer: 1,
      explain: "PHP uses a dot for concatenation."
    },
    {
      type: "mc",
      q: "What did Facebook create to evolve its PHP codebase?",
      options: ["Swift", "Hack and HHVM", "Go", "Dart"],
      answer: 1,
      explain: "Hack is a gradually typed language running on the HHVM virtual machine."
    },
    {
      type: "mc",
      q: "Roughly what share of all websites run on WordPress (PHP)?",
      options: ["About 5%", "About 15%", "Over 40%", "Over 90%"],
      answer: 2,
      explain: "WordPress powers over 40% of websites according to W3Techs."
    },
    {
      type: "mc",
      q: "Why use `$pdo->prepare()` with parameters?",
      options: [
        "It is faster to type",
        "It prevents SQL injection",
        "It caches pages",
        "It is required for MySQL"
      ],
      answer: 1,
      explain: "Prepared statements keep data separate from SQL code."
    },
    {
      type: "mc",
      q: "What does Composer do?",
      options: [
        "Formats code",
        "Manages PHP packages and autoloading",
        "Compiles PHP",
        "Hosts websites"
      ],
      answer: 1,
      explain: "composer require vendor/package adds a library."
    },
    {
      type: "mc",
      q: "Why use `===` instead of `==` in PHP?",
      options: [
        "It’s faster to type",
        "=== checks type and value, avoiding surprising conversions",
        "== is deprecated",
        "=== works with arrays only"
      ],
      answer: 1,
      explain: "Strict comparison avoids type-juggling bugs."
    }
  ],
  sources: [
    {
      t: "PHP Manual",
      u: "https://www.php.net/manual/en/"
    },
    {
      t: "PHP: The Right Way",
      u: "https://phptherightway.com/"
    },
    {
      t: "Laravel documentation",
      u: "https://laravel.com/docs"
    },
    {
      t: "PHP — Wikipedia",
      u: "https://en.wikipedia.org/wiki/PHP"
    }
  ],
  facts: [
    {
      text: "PHP’s mascot is a blue elephant called the elePHPant.",
      src: {
        t: "PHP — Wikipedia",
        u: "https://en.wikipedia.org/wiki/PHP"
      }
    },
    {
      text: "There was never a PHP 6. After an abandoned Unicode rewrite, the project jumped from PHP 5 straight to PHP 7.",
      src: {
        t: "PHP — Wikipedia",
        u: "https://en.wikipedia.org/wiki/PHP"
      }
    },
    {
      text: "Rasmus Lerdorf has said he never set out to create a programming language — PHP grew out of tools for his personal home page.",
      src: {
        t: "Rasmus Lerdorf — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Rasmus_Lerdorf"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "WordPress, Laravel apps and a huge share of the web’s back ends."
  },
  learnIf: "you’ll build or customise WordPress sites, or want fast, cheap web hosting.",
  ecosystem: [
    {
      name: "Composer",
      what: "PHP’s package manager."
    },
    {
      name: "Laravel",
      what: "The most popular modern PHP framework."
    },
    {
      name: "Symfony",
      what: "Robust components and framework used by many projects."
    },
    {
      name: "WordPress",
      what: "The CMS that powers a huge share of the web."
    },
    {
      name: "PHPUnit · Pest",
      what: "Testing frameworks."
    },
    {
      name: "PHPStan · Psalm",
      what: "Static analysis that catches type bugs."
    }
  ],
  pitfalls: [
    "Putting user input straight into SQL — use PDO prepared statements.",
    "Echoing user data without htmlspecialchars (XSS).",
    "Using == and getting surprising type juggling — prefer ===.",
    "Leaving error display on in production.",
    "Not using strict_types in new code."
  ],
  roadmap: [
    "PHP syntax, arrays and functions.",
    "Forms, sessions and PDO with a database.",
    "Object-oriented PHP and Composer.",
    "A framework: Laravel or Symfony.",
    "Testing and static analysis.",
    "Deploy, or build WordPress themes and plugins."
  ],
  projects: [
    "A guestbook with a MySQL database (very 1999).",
    "A Laravel blog with authentication.",
    "A custom WordPress plugin.",
    "A REST API for a mobile app."
  ]
};

CT.langs["ruby"] = {
  id: "ruby",
  name: "Ruby",
  year: 1995,
  era: "web",
  level: "core",
  creator: "Yukihiro “Matz” Matsumoto",
  org: "Open source (Japan)",
  paradigm: "Pure object-oriented, with functional features",
  typing: "Dynamic, strong",
  prism: "ruby",
  tags: ["web"],
  tagline: "Designed for programmer happiness — and the engine of Ruby on Rails startups.",
  story: [
    "Yukihiro Matsumoto released Ruby in Japan in 1995, blending ideas from Perl, Smalltalk and Lisp. His stated goal was to make programmers happy: code should read naturally and feel pleasant to write. Like Smalltalk, everything in Ruby is an object — even numbers and nil.",
    "Ruby became world-famous in 2004 when David Heinemeier Hansson extracted Ruby on Rails from the Basecamp project management app. Rails’ “convention over configuration” let small teams build web apps incredibly fast, and it shaped almost every web framework that followed.",
    "Twitter, GitHub, Shopify and Airbnb all started on Rails. Shopify and GitHub still run some of the largest Rails apps in the world, and Shopify built YJIT, a just-in-time compiler that now ships with Ruby."
  ],
  usedBy: [
    {
      who: "GitHub",
      what: "One of the largest Rails applications in the world."
    },
    {
      who: "Shopify",
      what: "Runs on Rails and contributes heavily to Ruby itself, including the YJIT compiler."
    },
    {
      who: "37signals",
      what: "Basecamp and HEY — where Rails was born."
    },
    {
      who: "Twitter (early)",
      what: "The original Twitter was a Rails app before moving key services to the JVM."
    }
  ],
  know: [
    "Everything is an object: 5.times { puts \"hi\" } works.",
    "@name is an instance variable; attr_reader creates getter methods.",
    "Blocks (do ... end or { ... }) are passed to methods like each, map and select.",
    "Methods ending in ? return booleans; methods ending in ! usually modify in place.",
    "String interpolation: \"Hi #{name}\".",
    "Gems are packages; Bundler manages them with a Gemfile."
  ],
  examples: [
    {
      title: "Classes, blocks and endless methods",
      code: `class Track
  attr_reader :title, :bpm

  def initialize(title, bpm)
    @title = title
    @bpm = bpm
  end

  def fast? = bpm > 140

  def to_s = "#{title} @ #{bpm} BPM"
end

tracks = [Track.new("Night Drive", 120), Track.new("Jungle Run", 170)]
tracks.select(&:fast?).each { |t| puts t }   # Jungle Run @ 170 BPM`,
      note: ""
    },
    {
      title: "A Rails controller",
      code: `class PostsController < ApplicationController
  def index
    @posts = Post.where(published: true).order(created_at: :desc)
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to @post, notice: "Post created!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `3.times { print \"x\" }` print?",
      options: ["3", "xxx", "x x x", "Error"],
      answer: 1,
      explain: "Integers are objects with a times method that runs the block."
    },
    {
      type: "mc",
      q: "What does `@title` mean inside a class?",
      options: ["A global variable", "An instance variable", "A constant", "A decorator"],
      answer: 1,
      explain: "@ marks instance variables in Ruby."
    },
    {
      type: "mc",
      q: "Which framework, released in 2004, made Ruby famous?",
      options: ["Django", "Laravel", "Ruby on Rails", "Express"],
      answer: 2,
      explain: "DHH extracted Rails from Basecamp."
    },
    {
      type: "mc",
      q: "By convention, what does a method ending in `?` return?",
      options: ["Nil", "A boolean", "A string", "A block"],
      answer: 1,
      explain: "Predicate methods like empty? and fast? return true or false."
    },
    {
      type: "fill",
      q: "Complete the string so it interpolates the variable name.",
      code: "puts \"Hello, ____{name}!\"",
      answers: ["#"],
      explain: "Ruby interpolates with #{...} inside double-quoted strings."
    },
    {
      type: "mc",
      q: "In Rails, what is an “N+1 query”?",
      options: [
        "A fast query",
        "Loading a list, then one extra query per item — very slow",
        "A query with N joins",
        "A migration"
      ],
      answer: 1,
      explain: "Use includes(:association) to load everything in one go."
    },
    {
      type: "mc",
      q: "What does Bundler do?",
      options: [
        "Bundles CSS",
        "Installs and locks the gem versions your app needs",
        "Compiles Ruby",
        "Runs tests"
      ],
      answer: 1,
      explain: "Gemfile and Gemfile.lock describe dependencies."
    }
  ],
  sources: [
    {
      t: "Ruby documentation",
      u: "https://www.ruby-lang.org/en/documentation/"
    },
    {
      t: "Try Ruby in your browser",
      u: "https://try.ruby-lang.org/"
    },
    {
      t: "Ruby on Rails Guides",
      u: "https://guides.rubyonrails.org/"
    },
    {
      t: "Ruby — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Ruby_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Ruby is named after a birthstone, as a friendly nod to Perl (pearl).",
      src: {
        t: "Ruby — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Ruby_(programming_language)"
      }
    },
    {
      text: "The community motto is MINASWAN: “Matz is nice and so we are nice.”",
      src: {
        t: "Ruby — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Ruby_(programming_language)"
      }
    },
    {
      text: "Rails popularised database migrations, scaffolding and “convention over configuration,” which most later web frameworks copied.",
      src: {
        t: "Ruby on Rails — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Ruby_on_Rails"
      }
    }
  ],
  today: {
    status: "Steady",
    text: "Ruby on Rails apps at companies like Shopify and GitHub, and scripting."
  },
  learnIf: "you want to build web products quickly with a small team.",
  ecosystem: [
    {
      name: "Bundler · RubyGems",
      what: "Install and lock package (gem) versions."
    },
    {
      name: "Ruby on Rails",
      what: "The full-stack web framework."
    },
    {
      name: "Hotwire",
      what: "Rails’ approach to fast, modern UIs with little JavaScript."
    },
    {
      name: "RSpec · Minitest",
      what: "Testing frameworks."
    },
    {
      name: "Sidekiq",
      what: "Background job processing."
    },
    {
      name: "RuboCop",
      what: "Linter and style checker."
    }
  ],
  pitfalls: [
    "N+1 queries in Rails — use includes to load related records.",
    "Putting too much logic in controllers.",
    "Monkey-patching core classes and surprising everyone.",
    "Not locking gem versions in Gemfile.lock."
  ],
  roadmap: [
    "Ruby basics: objects, blocks and collections.",
    "Classes, modules and gems.",
    "Rails: models, views, controllers and migrations.",
    "Testing with RSpec or Minitest.",
    "Background jobs, caching and deployment."
  ],
  projects: [
    "A command-line to-do app.",
    "A Rails blog with comments.",
    "A small online store with Rails and Stripe test mode.",
    "A Discord or Slack bot."
  ]
};

CT.langs["csharp"] = {
  id: "csharp",
  name: "C#",
  year: 2000,
  era: "platform",
  level: "modern",
  creator: "Anders Hejlsberg",
  org: "Microsoft",
  paradigm: "Multi-paradigm: object-oriented, functional, component-oriented",
  typing: "Static, strong",
  prism: "csharp",
  tags: ["games", "business", "web", "windows"],
  tagline: "Microsoft’s flagship language — and the scripting language of Unity games.",
  story: [
    "C# (pronounced “C sharp”) was announced by Microsoft in 2000 and shipped with .NET in 2002. Its lead designer, Anders Hejlsberg, had earlier created Turbo Pascal and Delphi at Borland — and would later create TypeScript. C# was Microsoft’s answer to Java: a managed, garbage-collected, object-oriented language running on a virtual machine (the CLR).",
    "Over time C# moved faster than Java, adding LINQ (2007), async/await (2012 — which JavaScript, Python and Swift later copied), pattern matching, records and nullable reference types. In 2016 Microsoft released .NET Core as open source and cross-platform, so C# now runs on Linux, macOS, phones and the cloud.",
    "C# is also one of the most important game languages. Unity, launched in 2005, uses C# for scripting, and a huge share of mobile and indie games are built with it — Pokémon GO, Hollow Knight, Cuphead and Among Us among them. Godot also supports C#."
  ],
  usedBy: [
    {
      who: "Microsoft",
      what: "Windows apps, Azure services, Visual Studio, Bing and much of its internal software."
    },
    {
      who: "Unity",
      what: "Every Unity game’s gameplay code — from Pokémon GO to Among Us."
    },
    {
      who: "Stack Overflow",
      what: "The famous Q&A site is built on C# and .NET."
    },
    {
      who: "Businesses",
      what: "ASP.NET web apps and APIs, especially in finance, healthcare and government."
    }
  ],
  know: [
    "Classes are reference types; structs are value types (copied on assignment).",
    "Properties (public int Hp { get; set; }) replace getter and setter methods.",
    "LINQ lets you query collections: players.Where(p => p.Level > 10).Select(p => p.Name).",
    "async/await makes non-blocking code read like normal code.",
    "Nullable reference types (string?) help the compiler warn about possible nulls.",
    "In Unity, scripts inherit from MonoBehaviour and use Start() and Update() lifecycle methods.",
    "Multiply movement by Time.deltaTime so speed doesn’t depend on frame rate.",
    "dotnet new, dotnet run and dotnet test are the command-line tools; NuGet is the package manager."
  ],
  examples: [
    {
      title: "Records and LINQ",
      code: `using System;
using System.Collections.Generic;
using System.Linq;

public record Player(string Name, int Level, int Score);

public static class Program
{
    public static void Main()
    {
        var players = new List<Player>
        {
            new("Ada", 12, 4200),
            new("Linus", 30, 9100),
            new("Grace", 25, 7600),
        };

        var top = players
            .Where(p => p.Level >= 20)
            .OrderByDescending(p => p.Score)
            .Select(p => $"{p.Name}: {p.Score}");

        foreach (var line in top)
            Console.WriteLine(line);   // Linus: 9100, Grace: 7600
    }
}`,
      note: ""
    },
    {
      title: "Unity: a player controller",
      code: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float speed = 5f;

    void Update()
    {
        float x = Input.GetAxis("Horizontal");
        float z = Input.GetAxis("Vertical");
        Vector3 move = new Vector3(x, 0f, z) * speed * Time.deltaTime;
        transform.Translate(move);
    }
}`,
      note: "[SerializeField] shows a private field in the Unity Inspector."
    },
    {
      title: "async/await and pattern matching",
      code: `using System.Net.Http;
using System.Threading.Tasks;

static async Task<string> GetStatusAsync(HttpClient http, string url)
{
    HttpResponseMessage res = await http.GetAsync(url);
    return (int)res.StatusCode switch
    {
        >= 200 and < 300 => "OK",
        404               => "Not found",
        >= 500            => "Server error",
        _                 => "Other",
    };
}`,
      note: ""
    }
  ],
  cheats: [
    ["Property", "public int Hp { get; private set; } = 100;"],
    ["Interpolation", "$\"{name} has {hp} HP\""],
    ["Null-safe", "var city = user?.Address?.City ?? \"unknown\";"],
    [
      "LINQ",
      "var names = list.Where(x => x.Active).Select(x => x.Name).ToList();"
    ]
  ],
  quiz: [
    {
      type: "mc",
      q: "What is printed?",
      options: ["5", "10", "Compile error", "0"],
      answer: 0,
      explain: "Point is a struct (value type), so b is a copy; changing b doesn’t change a.",
      code: `struct Point { public int X; }

var a = new Point { X = 5 };
var b = a;
b.X = 10;
Console.WriteLine(a.X);`
    },
    {
      type: "mc",
      q: "Who designed C# (and later TypeScript)?",
      options: ["James Gosling", "Anders Hejlsberg", "Bjarne Stroustrup", "Guido van Rossum"],
      answer: 1,
      explain: "Hejlsberg also created Turbo Pascal and Delphi."
    },
    {
      type: "mc",
      q: "In Unity, why multiply movement by `Time.deltaTime`?",
      options: [
        "To make it random",
        "So speed is the same regardless of frame rate",
        "To slow everything down",
        "It is required to compile"
      ],
      answer: 1,
      explain: "deltaTime is the seconds since the last frame, turning “per frame” into “per second.”"
    },
    {
      type: "mc",
      q: "What does this LINQ query return for the example players?",
      options: ["Ada", "Linus and Grace", "Grace and Linus", "All three"],
      answer: 2,
      explain: "Only Linus (30) and Grace (25) have level ≥ 20; ordering by Score ascending puts Grace (7600) first.",
      code: `players.Where(p => p.Level >= 20)
       .OrderBy(p => p.Score)
       .Select(p => p.Name);`
    },
    {
      type: "mc",
      q: "Which Unity method runs once every frame?",
      options: ["Start()", "Awake()", "Update()", "Main()"],
      answer: 2,
      explain: "Update is called every frame; Start runs once before the first frame."
    },
    {
      type: "mc",
      q: "What does `string?` mean with nullable reference types enabled?",
      options: ["An optional parameter", "This string may be null", "A string array", "A pointer"],
      answer: 1,
      explain: "The compiler warns when you use a possibly-null value without checking."
    },
    {
      type: "fill",
      q: "Complete the keyword that marks a method as asynchronous.",
      code: "public ____ Task<int> LoadAsync() { ... }",
      answers: ["async"],
      explain: "async methods can use await and usually return Task or Task<T>."
    },
    {
      type: "fill",
      q: "Complete the operator that gives a fallback value when the left side is null.",
      code: "string name = input ____ \"Player\";",
      answers: ["??"],
      explain: "?? is the null-coalescing operator."
    },
    {
      type: "mc",
      q: "Which popular game was built with Unity and C#?",
      options: ["Fortnite", "Hollow Knight", "Doom", "Minecraft"],
      answer: 1,
      explain: "Hollow Knight, Cuphead and Among Us are Unity games."
    },
    {
      type: "mc",
      q: "Why avoid `.Result` on a Task in UI or web code?",
      options: [
        "It is slower to type",
        "It can block the thread and cause deadlocks — use await",
        "It returns null",
        "It is deprecated"
      ],
      answer: 1,
      explain: "Await async code instead of blocking on it."
    },
    {
      type: "mc",
      q: "In Unity, why cache a component in Start() instead of finding it in Update()?",
      options: [
        "Update can’t access components",
        "Update runs every frame, so repeated lookups waste performance",
        "Start runs faster",
        "It is required by C#"
      ],
      answer: 1,
      explain: "Do expensive lookups once and reuse the result."
    }
  ],
  sources: [
    {
      t: "C# documentation (Microsoft Learn)",
      u: "https://learn.microsoft.com/en-us/dotnet/csharp/"
    },
    {
      t: "C# tour",
      u: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
    },
    {
      t: "Unity Learn",
      u: "https://learn.unity.com/"
    },
    {
      t: "Godot: C# basics",
      u: "https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/c_sharp_basics.html"
    },
    {
      t: "C# — Wikipedia",
      u: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)"
    }
  ],
  facts: [
    {
      text: "The name comes from music: a sharp raises a note by a semitone. The # also looks like four plus signs — C++++.",
      src: {
        t: "C# — Wikipedia",
        u: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)"
      }
    },
    {
      text: "Before launch, C# was codenamed “Cool” (C-like Object Oriented Language).",
      src: {
        t: "C# — Wikipedia",
        u: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)"
      }
    },
    {
      text: "Microsoft open-sourced its C# compiler, Roslyn, in 2014 — a big shift for a company that once called open source a threat.",
      src: {
        t: "Roslyn on GitHub",
        u: "https://github.com/dotnet/roslyn"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Unity games, Windows apps, ASP.NET web services and Azure cloud."
  },
  learnIf: "you want to make Unity games or work in Microsoft-based companies.",
  ecosystem: [
    {
      name: ".NET SDK / dotnet CLI",
      what: "Create, build, run and test projects from the command line."
    },
    {
      name: "NuGet",
      what: "C#’s package manager."
    },
    {
      name: "ASP.NET Core",
      what: "High-performance web apps and APIs."
    },
    {
      name: "Entity Framework Core",
      what: "Work with databases using C# objects and LINQ."
    },
    {
      name: "Unity",
      what: "The game engine behind a huge share of mobile and indie games."
    },
    {
      name: ".NET MAUI",
      what: "Cross-platform desktop and mobile apps."
    },
    {
      name: "xUnit / NUnit",
      what: "Testing frameworks."
    }
  ],
  pitfalls: [
    "Using async void (except for event handlers) — exceptions get lost.",
    "Blocking on async code with .Result or .Wait(), causing deadlocks.",
    "Mixing up structs (copied) and classes (shared).",
    "In Unity, calling expensive lookups like GameObject.Find inside Update every frame.",
    "Ignoring nullable warnings."
  ],
  roadmap: [
    "Syntax, types and control flow.",
    "Classes, interfaces and properties.",
    "Collections and LINQ.",
    "async/await.",
    "Pick a track: Unity games, ASP.NET Core web APIs or desktop apps.",
    "Testing and Entity Framework Core."
  ],
  projects: [
    "A Unity 2D platformer.",
    "An ASP.NET Core minimal API for a game leaderboard.",
    "A console inventory manager using LINQ.",
    "A Windows desktop tool with WPF."
  ]
};

CT.langs["actionscript"] = {
  id: "actionscript",
  name: "ActionScript",
  year: 2000,
  era: "platform",
  level: "classic",
  creator: "Gary Grossman (original), Macromedia team",
  org: "Macromedia, then Adobe",
  paradigm: "Object-oriented (ECMAScript-based)",
  typing: "Optional static (AS3)",
  prism: "actionscript",
  tags: ["games", "web"],
  tagline: "The language of Flash — browser games, animations and early Facebook games.",
  story: [
    "Flash let designers draw animations and add interactivity with ActionScript. ActionScript 1.0 (Flash 5, 2000) was based on ECMAScript, the same standard as JavaScript. ActionScript 3.0 (2006) became a fast, class-based language with optional static types running on a new virtual machine.",
    "For a decade Flash was how you made games for the web. Sites like Newgrounds, Miniclip and Armor Games hosted millions of free games, and Zynga’s FarmVille reached tens of millions of Facebook players. Many of today’s indie developers started by making Flash games.",
    "When the iPhone shipped without Flash and HTML5 matured, Flash faded. Adobe ended support on December 31, 2020. Projects like Ruffle, an emulator written in Rust, now preserve old Flash games so they can still be played."
  ],
  usedBy: [
    {
      who: "Adobe / Macromedia",
      what: "Flash Player and Flash Professional (now Animate)."
    },
    {
      who: "Web game portals",
      what: "Newgrounds, Miniclip, Kongregate and Armor Games."
    },
    {
      who: "Zynga",
      what: "FarmVille and other early social games on Facebook."
    }
  ],
  know: [
    "AS3 uses packages, classes and typed variables: var speed:Number = 4;.",
    "The ENTER_FRAME event runs code every frame — the game loop.",
    "Its syntax is very close to JavaScript and TypeScript.",
    "Flash is dead, but Ruffle and the Flashpoint archive keep the games playable."
  ],
  examples: [
    {
      title: "A bouncing ball (ActionScript 3)",
      code: `package {
    import flash.display.Sprite;
    import flash.events.Event;

    public class Ball extends Sprite {
        private var vx:Number = 4;

        public function Ball() {
            graphics.beginFill(0xFF0000);
            graphics.drawCircle(0, 0, 20);
            graphics.endFill();
            addEventListener(Event.ENTER_FRAME, onFrame);
        }

        private function onFrame(e:Event):void {
            x += vx;
            if (x > 550 || x < 0) vx = -vx;
        }
    }
}`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which standard was ActionScript based on?",
      options: ["ECMAScript", "Java", "C++", "Lua"],
      answer: 0,
      explain: "ActionScript shares its roots with JavaScript."
    },
    {
      type: "mc",
      q: "Which event runs code every frame?",
      options: ["CLICK", "ENTER_FRAME", "LOAD", "TICK"],
      answer: 1,
      explain: "Event.ENTER_FRAME is Flash’s game-loop hook."
    },
    {
      type: "mc",
      q: "When did Adobe end Flash Player support?",
      options: ["2010", "2015", "December 31, 2020", "Never"],
      answer: 2,
      explain: "Flash reached end of life at the end of 2020."
    },
    {
      type: "mc",
      q: "Which project preserves Flash games today?",
      options: ["Ruffle", "Electron", "Docker", "Vite"],
      answer: 0,
      explain: "Ruffle is a Flash Player emulator written in Rust."
    }
  ],
  sources: [
    {
      t: "ActionScript — Wikipedia",
      u: "https://en.wikipedia.org/wiki/ActionScript"
    },
    {
      t: "Ruffle — Flash Player emulator",
      u: "https://ruffle.rs/"
    },
    {
      t: "Flashpoint Archive",
      u: "https://flashpointarchive.org/"
    }
  ],
  facts: [
    {
      text: "Many indie developers started with Flash: Meat Boy began as a free Flash game on Newgrounds before Super Meat Boy became a hit.",
      src: {
        t: "Super Meat Boy — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Super_Meat_Boy"
      }
    },
    {
      text: "Steve Jobs’s 2010 open letter “Thoughts on Flash” explained why the iPhone would never support it.",
      src: {
        t: "Thoughts on Flash — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Thoughts_on_Flash"
      }
    },
    {
      text: "The Internet Archive uses the Ruffle emulator so thousands of old Flash games and animations still play in modern browsers.",
      src: {
        t: "Ruffle",
        u: "https://ruffle.rs/"
      }
    }
  ],
  today: {
    status: "Retired",
    text: "Preserved by Ruffle and the Flashpoint archive."
  },
  learnIf: "you’re into game history and preservation."
};

CT.langs["go"] = {
  id: "go",
  name: "Go",
  year: 2009,
  era: "platform",
  level: "modern",
  creator: "Robert Griesemer, Rob Pike and Ken Thompson",
  org: "Google",
  paradigm: "Concurrent, imperative, structural interfaces",
  typing: "Static, strong",
  prism: "go",
  tags: ["cloud", "web", "systems"],
  tagline: "Simple, fast-compiling and built for concurrency — the language of the cloud.",
  story: [
    "Go was designed at Google starting in 2007 by Robert Griesemer, Rob Pike and Ken Thompson (co-creator of Unix and B). Legend has it the idea came while waiting for a giant C++ build to compile. They wanted a language that compiled in seconds, was easy to read in huge codebases, and made concurrency simple. It was announced in 2009 and reached 1.0 in 2012.",
    "Go is deliberately small: no classes or inheritance, explicit error values instead of exceptions, and one standard formatter (gofmt) so all Go code looks the same. Goroutines are lightweight threads — you can run hundreds of thousands — and channels let them communicate safely. Generics were added in Go 1.18 (2022).",
    "Go became the language of cloud infrastructure. Docker, Kubernetes, Terraform and Prometheus are all written in Go, and companies such as Google, Uber, Twitch, Cloudflare and Dropbox use it for backend services."
  ],
  usedBy: [
    {
      who: "Google",
      what: "Created Go; uses it for many internal systems and cloud services. Kubernetes started at Google."
    },
    {
      who: "Docker",
      what: "Docker and containerd are written in Go."
    },
    {
      who: "Twitch",
      what: "Video and chat backend services."
    },
    {
      who: "Uber & Cloudflare",
      what: "High-throughput microservices and networking tools."
    }
  ],
  know: [
    "Every file belongs to a package; programs start in package main at func main().",
    ":= declares and assigns with type inference (inside functions).",
    "Capitalised names are exported (public); lowercase are private to the package.",
    "There is only one loop keyword: for (it also acts as while).",
    "Functions can return multiple values — usually (result, error). Check if err != nil.",
    "defer schedules a call to run when the function returns; deferred calls run last-in, first-out.",
    "go f() starts a goroutine; channels (chan T) pass values between goroutines.",
    "Unused variables and imports are compile errors.",
    "Every type has a zero value: 0, \"\", false, nil.",
    "Interfaces are satisfied implicitly — no implements keyword."
  ],
  examples: [
    {
      title: "Structs, methods and errors",
      code: `package main

import (
	"errors"
	"fmt"
)

type Account struct {
	Owner   string
	Balance float64
}

var ErrInsufficient = errors.New("insufficient funds")

func (a *Account) Withdraw(amount float64) error {
	if amount > a.Balance {
		return fmt.Errorf("withdraw %.2f: %w", amount, ErrInsufficient)
	}
	a.Balance -= amount
	return nil
}

func main() {
	acc := &Account{Owner: "Ada", Balance: 100}
	if err := acc.Withdraw(150); err != nil {
		fmt.Println("Error:", err)   // Error: withdraw 150.00: insufficient funds
	}
	fmt.Printf("%s has $%.2f\\n", acc.Owner, acc.Balance)
}`,
      note: ""
    },
    {
      title: "Goroutines, channels and a WaitGroup",
      code: `package main

import (
	"fmt"
	"sync"
)

func worker(id int, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()
	for n := range jobs {
		results <- fmt.Sprintf("worker %d: %d squared = %d", id, n, n*n)
	}
}

func main() {
	jobs := make(chan int, 5)
	results := make(chan string, 5)
	var wg sync.WaitGroup

	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}
	for n := 1; n <= 5; n++ {
		jobs <- n
	}
	close(jobs)

	wg.Wait()
	close(results)
	for r := range results {
		fmt.Println(r)
	}
}`,
      note: ""
    },
    {
      title: "A tiny web server and interfaces",
      code: `package main

import (
	"fmt"
	"net/http"
)

type Greeter interface {
	Greet(name string) string
}

type English struct{}

func (English) Greet(name string) string { return "Hello, " + name }

func main() {
	var g Greeter = English{}   // satisfied implicitly
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, g.Greet(r.URL.Query().Get("name")))
	})
	http.ListenAndServe(":8080", nil)
}`,
      note: ""
    }
  ],
  cheats: [
    ["Declare", "x := 5      var y int      const Pi = 3.14"],
    ["Slice", "nums := []int{1, 2}; nums = append(nums, 3)"],
    ["Map", "ages := map[string]int{\"ada\": 36}; v, ok := ages[\"bob\"]"],
    ["Error check", "if err != nil { return err }"],
    ["Goroutine", "go doWork()   ch := make(chan int)   v := <-ch"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What does this print?",
      options: ["012", "210", "000", "222"],
      answer: 1,
      explain: "Deferred calls run last-in, first-out when main returns.",
      code: `func main() {
	for i := 0; i < 3; i++ {
		defer fmt.Print(i)
	}
}`
    },
    {
      type: "mc",
      q: "How do you make a function or type visible to other packages?",
      options: [
        "Use the public keyword",
        "Start its name with a capital letter",
        "Add export",
        "Put it in main"
      ],
      answer: 1,
      explain: "Capitalised identifiers are exported."
    },
    {
      type: "mc",
      q: "Which loop keyword(s) does Go have?",
      options: ["for, while, do", "for only", "loop and for", "foreach"],
      answer: 1,
      explain: "for covers classic, while-style and infinite loops."
    },
    {
      type: "mc",
      q: "What is the idiomatic way to handle an error?",
      options: ["try/catch", "if err != nil { ... }", "Ignore it", "panic every time"],
      answer: 1,
      explain: "Errors are ordinary return values that you check explicitly."
    },
    {
      type: "mc",
      q: "What happens if you import a package and never use it?",
      options: ["A warning", "Nothing", "A compile error", "It is removed at runtime"],
      answer: 2,
      explain: "Go refuses to compile unused imports or variables."
    },
    {
      type: "mc",
      q: "What is the zero value of a `string`?",
      options: ["nil", "\"\" (empty string)", "\"0\"", "undefined"],
      answer: 1,
      explain: "Strings default to the empty string."
    },
    {
      type: "fill",
      q: "Complete the statement that starts `fetch` in a new goroutine.",
      code: "____ fetch(url)",
      answers: ["go"],
      explain: "The go keyword launches a goroutine."
    },
    {
      type: "fill",
      q: "Complete the line so wg.Done() runs when the function returns.",
      code: `func worker(wg *sync.WaitGroup) {
	____ wg.Done()
	// ...
}`,
      answers: ["defer"],
      explain: "defer guarantees cleanup even if the function returns early."
    },
    {
      type: "mc",
      q: "Which of these tools is written in Go?",
      options: ["Kubernetes", "Photoshop", "WordPress", "Unreal Engine"],
      answer: 0,
      explain: "Docker, Kubernetes and Terraform are Go projects."
    },
    {
      type: "mc",
      q: "What does `<-chan int` mean as a parameter type?",
      options: [
        "A channel you can only send to",
        "A channel you can only receive from",
        "A pointer to an int",
        "A slice of ints"
      ],
      answer: 1,
      explain: "The arrow position shows direction: <-chan is receive-only, chan<- is send-only."
    },
    {
      type: "mc",
      q: "What happens here?",
      options: [
        "m becomes {\"a\": 1}",
        "It panics: assignment to entry in nil map",
        "Compile error",
        "Nothing"
      ],
      answer: 1,
      explain: "A declared but uninitialised map is nil. Use make(map[string]int).",
      code: `var m map[string]int
m["a"] = 1`
    },
    {
      type: "mc",
      q: "Which flag finds data races in your tests?",
      options: ["-fast", "-race", "-safe", "-v"],
      answer: 1,
      explain: "go test -race instruments your code to detect races."
    }
  ],
  sources: [
    {
      t: "A Tour of Go",
      u: "https://go.dev/tour/"
    },
    {
      t: "Effective Go",
      u: "https://go.dev/doc/effective_go"
    },
    {
      t: "Go by Example",
      u: "https://gobyexample.com/"
    },
    {
      t: "Go Playground",
      u: "https://go.dev/play/"
    },
    {
      t: "Go — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Go_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Go’s mascot is the Gopher, drawn by illustrator Renée French.",
      src: {
        t: "The Go Gopher (go.dev blog)",
        u: "https://go.dev/blog/gopher"
      }
    },
    {
      text: "Go formats dates using one reference time: Mon Jan 2 15:04:05 MST 2006 — that is, 1 2 3 4 5 6 7.",
      src: {
        t: "time package constants (pkg.go.dev)",
        u: "https://pkg.go.dev/time#pkg-constants"
      }
    },
    {
      text: "Generics took 13 years to arrive (2009 → 2022) because the team wanted a design that kept Go simple.",
      src: {
        t: "Go 1.18 is released (go.dev blog)",
        u: "https://go.dev/blog/go1.18"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Cloud infrastructure, DevOps tools, APIs and network services."
  },
  learnIf: "you want cloud, DevOps, backend or infrastructure work.",
  ecosystem: [
    {
      name: "Go modules",
      what: "Built-in dependency management (go.mod)."
    },
    {
      name: "net/http",
      what: "The standard library’s production-ready web server."
    },
    {
      name: "chi · Gin · Echo",
      what: "Popular routers and web frameworks."
    },
    {
      name: "gRPC",
      what: "Fast service-to-service communication, widely used with Go."
    },
    {
      name: "Cobra",
      what: "Build command-line tools (used by Kubernetes’ kubectl)."
    },
    {
      name: "go test",
      what: "Testing and benchmarking built into the toolchain."
    },
    {
      name: "go vet · race detector",
      what: "Catch suspicious code and data races (go test -race)."
    }
  ],
  pitfalls: [
    "Ignoring returned errors with _.",
    "Writing to a nil map, which panics.",
    "Starting goroutines that never finish (goroutine leaks).",
    "Sharing data between goroutines without a mutex or channel — run tests with -race.",
    "Over-engineering with interfaces before you need them."
  ],
  roadmap: [
    "A Tour of Go.",
    "Structs, methods, interfaces and errors.",
    "Goroutines, channels and sync.",
    "An HTTP server with the standard library.",
    "Testing and benchmarks.",
    "Build CLIs, APIs or Kubernetes tools."
  ],
  projects: [
    "A URL shortener API.",
    "A command-line tool with Cobra.",
    "A concurrent web crawler.",
    "A real-time chat server with WebSockets."
  ]
};
