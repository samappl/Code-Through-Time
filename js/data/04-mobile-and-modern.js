/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
CT.langs["kotlin"] = {
  id: "kotlin",
  name: "Kotlin",
  year: 2011,
  era: "mobile",
  level: "modern",
  creator: "Andrey Breslav and team",
  org: "JetBrains",
  paradigm: "Multi-paradigm: object-oriented and functional",
  typing: "Static, strong, null-safe",
  prism: "kotlin",
  tags: ["mobile", "web"],
  tagline: "A modern, null-safe language for the JVM — and Google’s preferred language for Android.",
  story: [
    "JetBrains, the company behind IntelliJ IDEA, announced Kotlin in 2011 and released 1.0 in 2016. It’s named after Kotlin Island near St. Petersburg (as Java is named after an island). They wanted a language that was more concise and safer than Java but could still use every existing Java library.",
    "Its biggest feature is null safety: the type system separates String (never null) from String? (might be null), removing most of the NullPointerExceptions that plague Java apps. Data classes, extension functions, smart casts and coroutines remove large amounts of boilerplate.",
    "At Google I/O 2017 Google made Kotlin an official Android language, and in 2019 announced Android development would be “Kotlin-first.” Jetpack Compose, Android’s modern UI toolkit, is Kotlin-only. Kotlin Multiplatform now lets teams share code between Android, iOS, desktop and servers."
  ],
  usedBy: [
    {
      who: "Google",
      what: "Android’s preferred language; Jetpack Compose; many Google apps."
    },
    {
      who: "JetBrains",
      what: "Created it and builds its own IDE tooling with it."
    },
    {
      who: "Netflix, Pinterest, Uber",
      what: "Android apps, plus Kotlin on the server with Spring and Ktor."
    }
  ],
  know: [
    "val is read-only (like final); var can be reassigned. Prefer val.",
    "Type? means the value can be null. Use ?. (safe call) and ?: (Elvis) to handle it.",
    "!! forces a non-null value and throws if it’s null — avoid it.",
    "data class auto-generates equals, hashCode, toString and copy.",
    "when is a powerful replacement for switch and can return a value.",
    "Lambdas with one parameter can use it: list.map { it * 2 }.",
    "Coroutines (suspend functions, launch, async) handle background work without callback hell.",
    "Extension functions add methods to existing classes: fun String.shout() = uppercase() + \"!\".",
    "Kotlin and Java can live in the same project and call each other."
  ],
  examples: [
    {
      title: "Data classes, collections and null safety",
      code: `data class Task(val title: String, val done: Boolean = false, val priority: Int = 1)

fun main() {
    val tasks = listOf(
        Task("Write README", priority = 2),
        Task("Fix login bug", done = true, priority = 3),
        Task("Push to GitHub", priority = 3),
    )

    val todo = tasks
        .filter { !it.done }
        .sortedByDescending { it.priority }
        .map { it.title }

    println(todo)                              // [Push to GitHub, Write README]

    val nickname: String? = null
    println(nickname?.length ?: "no nickname") // no nickname

    val updated = tasks[0].copy(done = true)
    println(updated)   // Task(title=Write README, done=true, priority=2)
}`,
      note: ""
    },
    {
      title: "when, sealed classes and smart casts",
      code: `sealed interface Result
data class Success(val data: String) : Result
data class Failure(val error: Throwable) : Result
object Loading : Result

fun render(r: Result): String = when (r) {
    is Success -> "Got \${r.data}"            // r is smart-cast to Success
    is Failure -> "Error: \${r.error.message}"
    Loading    -> "Loading..."
}`,
      note: ""
    },
    {
      title: "Jetpack Compose UI",
      code: `@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("Clicked $count times", style = MaterialTheme.typography.headlineSmall)
        Button(onClick = { count++ }) {
            Text("Tap me")
        }
    }
}`,
      note: ""
    },
    {
      title: "Coroutines",
      code: `suspend fun loadProfile(id: Int): String {
    delay(500)                  // pretend network call, doesn't block the thread
    return "User #$id"
}

fun main() = runBlocking {
    val a = async { loadProfile(1) }
    val b = async { loadProfile(2) }
    println("\${a.await()} and \${b.await()}")   // both load in parallel
}`,
      note: ""
    }
  ],
  cheats: [
    ["Variables", "val name = \"Ada\"   var score = 0"],
    ["Null-safe", "user?.email ?: \"none\""],
    ["Template", "\"$name has ${items.size} items\""],
    ["Range", "for (i in 1..5) { }   for (i in 0 until n) { }"],
    ["Extension", "fun Int.isEven() = this % 2 == 0"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What is the difference between `val` and `var`?",
      options: [
        "No difference",
        "val can’t be reassigned; var can",
        "var is for numbers only",
        "val is global"
      ],
      answer: 1,
      explain: "Prefer val; it makes code easier to reason about."
    },
    {
      type: "mc",
      q: "What does `name?.length ?: 0` return when name is null?",
      options: ["null", "0", "It throws", "\"0\""],
      answer: 1,
      explain: "?. returns null for a null receiver, and ?: supplies the fallback."
    },
    {
      type: "mc",
      q: "What happens with `name!!.length` if name is null?",
      options: ["Returns 0", "Returns null", "Throws a NullPointerException", "Compile error"],
      answer: 2,
      explain: "!! asserts non-null and throws if the assertion is wrong."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["$a + $b", "2 + 3", "5", "\"5\""],
      answer: 2,
      explain: "${...} evaluates an expression inside a string template.",
      code: `val a = 2
val b = 3
println("\${a + b}")`
    },
    {
      type: "mc",
      q: "What does a `data class` generate for you?",
      options: [
        "A database table",
        "equals, hashCode, toString and copy",
        "Getters only",
        "A REST API"
      ],
      answer: 1,
      explain: "Data classes remove boilerplate for value-holding classes."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["[1, 2, 3]", "[2, 4, 6]", "[2, 4]", "6"],
      answer: 1,
      explain: "it is the implicit name of a single lambda parameter.",
      code: "println(listOf(1, 2, 3).map { it * 2 })"
    },
    {
      type: "fill",
      q: "Complete the modifier that lets this function pause without blocking a thread.",
      code: "____ fun fetchUser(): User { ... }",
      answers: ["suspend"],
      explain: "Suspend functions can only be called from coroutines or other suspend functions."
    },
    {
      type: "fill",
      q: "Complete the Kotlin expression that replaces a switch statement.",
      code: `val label = ____ (score) {
    in 90..100 -> "A"
    in 80..89  -> "B"
    else       -> "C"
}`,
      answers: ["when"],
      explain: "when is an expression, so it can return a value directly."
    },
    {
      type: "mc",
      q: "In which year did Google make Kotlin an official Android language?",
      options: ["2011", "2014", "2017", "2020"],
      answer: 2,
      explain: "Announced at Google I/O 2017; “Kotlin-first” followed in 2019."
    },
    {
      type: "mc",
      q: "What is Jetpack Compose?",
      options: [
        "A Kotlin build tool",
        "Android’s declarative UI toolkit written in Kotlin",
        "A Java music library",
        "A database"
      ],
      answer: 1,
      explain: "Compose builds UI from @Composable functions."
    },
    {
      type: "mc",
      q: "Where should a coroutine that loads data for a screen usually run?",
      options: [
        "GlobalScope",
        "viewModelScope (a lifecycle-aware scope)",
        "The main thread with Thread.sleep",
        "A new process"
      ],
      answer: 1,
      explain: "Lifecycle-aware scopes cancel work automatically when the screen goes away."
    },
    {
      type: "mc",
      q: "What does `lateinit var name: String` promise?",
      options: [
        "name can be null",
        "name will be set before it’s used",
        "name is constant",
        "name is lazy"
      ],
      answer: 1,
      explain: "Reading it before it’s set throws UninitializedPropertyAccessException."
    }
  ],
  sources: [
    {
      t: "Kotlin documentation",
      u: "https://kotlinlang.org/docs/home.html"
    },
    {
      t: "Kotlin Koans (interactive exercises)",
      u: "https://play.kotlinlang.org/koans/overview"
    },
    {
      t: "Android: Kotlin for Android",
      u: "https://developer.android.com/kotlin"
    },
    {
      t: "Jetpack Compose",
      u: "https://developer.android.com/develop/ui/compose"
    },
    {
      t: "Kotlin — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Kotlin_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Kotlin is named after Kotlin Island near St. Petersburg — a nod to Java, also named after an island.",
      src: {
        t: "Kotlin — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Kotlin_(programming_language)"
      }
    },
    {
      text: "Kotlin and Java can live in the same project, so Android teams switched file by file instead of rewriting.",
      src: {
        t: "Calling Java from Kotlin (kotlinlang.org)",
        u: "https://kotlinlang.org/docs/java-interop.html"
      }
    },
    {
      text: "Kotlin’s null safety targets what Tony Hoare, inventor of the null reference, called his “billion-dollar mistake.”",
      src: {
        t: "Tony Hoare — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Tony_Hoare"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Android apps, Jetpack Compose, server back ends and Kotlin Multiplatform."
  },
  learnIf: "you want to build Android apps.",
  ecosystem: [
    {
      name: "Gradle (Kotlin DSL)",
      what: "Builds Android and JVM projects; build files written in Kotlin."
    },
    {
      name: "Android Studio",
      what: "Google’s official Android IDE, based on IntelliJ."
    },
    {
      name: "Jetpack Compose",
      what: "Declarative Android UI."
    },
    {
      name: "Coroutines & Flow",
      what: "Background work and streams of data."
    },
    {
      name: "Ktor",
      what: "JetBrains’ framework for servers and HTTP clients."
    },
    {
      name: "Room",
      what: "A database library for Android built on SQLite."
    },
    {
      name: "Kotlin Multiplatform",
      what: "Share code across Android, iOS, desktop and web."
    }
  ],
  pitfalls: [
    "Sprinkling !! everywhere and getting crashes anyway.",
    "Doing network or disk work on the main thread and freezing the app.",
    "Using lateinit properties before they are set.",
    "Launching coroutines in GlobalScope instead of a lifecycle-aware scope.",
    "Forgetting that values from Java code may be null."
  ],
  roadmap: [
    "Kotlin basics: val/var, functions, classes.",
    "Null safety, data classes and collections.",
    "Coroutines.",
    "Android with Jetpack Compose.",
    "App architecture: ViewModel, Room, navigation.",
    "Publish to the Google Play Store."
  ],
  projects: [
    "A Compose to-do app.",
    "A weather app that calls a public API.",
    "A habit tracker that saves to Room.",
    "A Ktor backend for your app."
  ]
};

CT.langs["typescript"] = {
  id: "typescript",
  name: "TypeScript",
  year: 2012,
  era: "mobile",
  level: "modern",
  creator: "Anders Hejlsberg",
  org: "Microsoft",
  paradigm: "Multi-paradigm (a typed superset of JavaScript)",
  typing: "Static, structural, gradual",
  prism: "typescript",
  tags: ["web", "mobile"],
  tagline: "JavaScript with types — how big teams keep giant web apps from falling apart.",
  story: [
    "By 2010 companies were writing JavaScript apps with hundreds of thousands of lines, and without types, refactoring was terrifying. Microsoft released TypeScript in October 2012, led by Anders Hejlsberg (creator of C#). Every JavaScript program is already valid TypeScript; you add type annotations gradually, and the compiler (tsc) checks them and outputs plain JavaScript.",
    "The turning point came when Google chose TypeScript for Angular 2 in 2016. Since then Slack, Airbnb, Stripe and most large front-end teams have adopted it, and frameworks such as React, Vue, Svelte and Next.js have first-class TypeScript support. VS Code itself is written in TypeScript.",
    "Types exist only at compile time and are erased from the output, so TypeScript adds no runtime cost. In 2025 Microsoft announced it was porting the TypeScript compiler to Go, and TypeScript 7.0 (July 2026) shipped that native compiler, with full builds typically 8–12 times faster."
  ],
  usedBy: [
    {
      who: "Microsoft",
      what: "VS Code, Teams and the TypeScript compiler itself."
    },
    {
      who: "Google",
      what: "Angular is written in and designed for TypeScript."
    },
    {
      who: "Slack, Airbnb, Stripe",
      what: "Migrated large JavaScript codebases to TypeScript."
    },
    {
      who: "Everyone on the web",
      what: "Most popular npm libraries ship type definitions."
    }
  ],
  know: [
    "TypeScript types are erased when compiled — they don’t exist at runtime.",
    "Basic types: string, number, boolean, arrays (number[]), tuples ([string, number]).",
    "interface and type both describe object shapes; type can also describe unions.",
    "Union types (\"admin\" | \"viewer\") and narrowing with typeof, in, or a discriminant field.",
    "Optional properties use ?: email?: string.",
    "Generics make reusable typed functions: function first<T>(items: T[]): T | undefined.",
    "Prefer unknown over any: unknown forces you to check the type before using it.",
    "Utility types: Partial<T>, Required<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Readonly<T>.",
    "Turn on \"strict\": true in tsconfig.json for real safety.",
    "Structural typing: if two types have the same shape, they’re compatible — names don’t matter."
  ],
  examples: [
    {
      title: "Interfaces, unions and generics",
      code: `type Role = "admin" | "editor" | "viewer";

interface User {
  id: number;
  name: string;
  role: Role;
  email?: string;            // optional
}

function canEdit(user: User): boolean {
  return user.role === "admin" || user.role === "editor";
}

function firstOf<T>(items: T[]): T | undefined {
  return items[0];
}

const users: User[] = [
  { id: 1, name: "Ada", role: "admin" },
  { id: 2, name: "Linus", role: "viewer" },
];

const editors = users.filter(canEdit).map(u => u.name);  // string[]
const first = firstOf(users);                           // User | undefined
console.log(editors, first?.name);                      // ["Ada"] "Ada"`,
      note: ""
    },
    {
      title: "Discriminated unions and exhaustive checks",
      code: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;   // TypeScript knows s has radius here
    case "rect":
      return s.width * s.height;
    default: {
      const never: never = s;           // compile error if a case is missing
      return never;
    }
  }
}`,
      note: ""
    },
    {
      title: "Utility types and typed fetch",
      code: `interface Settings {
  theme: "light" | "dark";
  volume: number;
  username: string;
}

function updateSettings(current: Settings, changes: Partial<Settings>): Settings {
  return { ...current, ...changes };
}

type PublicSettings = Omit<Settings, "username">;

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

const s = await getJson<Settings>("/api/settings");`,
      note: ""
    }
  ],
  cheats: [
    ["Annotate", "let count: number = 0;"],
    ["Function", "function add(a: number, b: number): number { return a + b; }"],
    ["Union", "type Id = string | number;"],
    ["Generic", "const box = <T,>(value: T) => ({ value });"],
    ["Narrow", "if (typeof x === \"string\") { x.toUpperCase(); }"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What happens to TypeScript types when the code runs in the browser?",
      options: [
        "They are checked at runtime",
        "They are erased — only JavaScript runs",
        "They slow the code down",
        "The browser runs TypeScript directly"
      ],
      answer: 1,
      explain: "tsc strips types; they exist only for compile-time checking."
    },
    {
      type: "mc",
      q: "Which is safer for a value whose type you don’t know yet?",
      options: ["any", "unknown", "object", "never"],
      answer: 1,
      explain: "unknown forces you to narrow the type before using it; any turns checking off."
    },
    {
      type: "mc",
      q: "What does `email?: string` mean in an interface?",
      options: [
        "email may be missing (undefined) or a string",
        "email is required",
        "email is a regex",
        "email can be any type"
      ],
      answer: 0,
      explain: "? marks the property optional."
    },
    {
      type: "mc",
      q: "What is the type of `result`?",
      options: ["number", "string", "number | undefined", "any"],
      answer: 2,
      explain: "T is inferred as number, and the function returns T | undefined.",
      code: `function firstOf<T>(items: T[]): T | undefined {
  return items[0];
}
const result = firstOf([10, 20, 30]);`
    },
    {
      type: "mc",
      q: "Will this compile with strict mode?",
      options: [
        "Yes",
        "No — the property is missing a required field",
        "No — role must be a union member, and \"owner\" isn’t one",
        "Only at runtime"
      ],
      answer: 2,
      explain: "\"owner\" isn’t in the union \"admin\" | \"editor\" | \"viewer\".",
      code: `type Role = "admin" | "editor" | "viewer";
const r: Role = "owner";`
    },
    {
      type: "mc",
      q: "What does `Partial<User>` produce?",
      options: [
        "A User with every property optional",
        "Half of the properties",
        "A readonly User",
        "A User array"
      ],
      answer: 0,
      explain: "Partial<T> makes every property of T optional."
    },
    {
      type: "fill",
      q: "Complete the keyword that gives a union of an object type’s property names.",
      code: "type UserKeys = ____ User;   // \"id\" | \"name\" | \"role\" | \"email\"",
      answers: ["keyof"],
      explain: "keyof T produces a union of T’s keys."
    },
    {
      type: "fill",
      q: "Complete the generic function signature so it works for any element type.",
      code: `function last____(items: T[]): T | undefined {
  return items[items.length - 1];
}`,
      answers: ["<T>"],
      explain: "Declare the type parameter in angle brackets after the function name."
    },
    {
      type: "mc",
      q: "TypeScript uses structural typing. What does that mean?",
      options: [
        "Types are compatible if their shapes match, regardless of name",
        "Every type must be a class",
        "Types are based on file structure",
        "Only structs are allowed"
      ],
      answer: 0,
      explain: "Two different interfaces with identical members are interchangeable."
    },
    {
      type: "mc",
      q: "Which popular code editor is written in TypeScript?",
      options: ["Vim", "VS Code", "Sublime Text", "Notepad++"],
      answer: 1,
      explain: "VS Code is a TypeScript/Electron app."
    },
    {
      type: "mc",
      q: "Why validate API data with something like Zod even though you have types?",
      options: [
        "Types make code slower",
        "Types are erased at runtime, so they can’t check real data from the network",
        "Zod is required by TypeScript",
        "To minify code"
      ],
      answer: 1,
      explain: "TypeScript checks your code, not the data you receive."
    },
    {
      type: "mc",
      q: "What does `user!.name` tell the compiler?",
      options: [
        "user might be null",
        "Trust me, user is not null here",
        "Make name optional",
        "Copy user"
      ],
      answer: 1,
      explain: "The non-null assertion skips the check — if you’re wrong, it crashes at runtime."
    }
  ],
  sources: [
    {
      t: "TypeScript Handbook",
      u: "https://www.typescriptlang.org/docs/handbook/intro.html"
    },
    {
      t: "TypeScript Playground",
      u: "https://www.typescriptlang.org/play"
    },
    {
      t: "Total TypeScript — free tutorials",
      u: "https://www.totaltypescript.com/tutorials"
    },
    {
      t: "A 10x faster TypeScript (Microsoft blog, 2025)",
      u: "https://devblogs.microsoft.com/typescript/typescript-native-port/"
    },
    {
      t: "Announcing TypeScript 7.0 (Microsoft blog, 2026)",
      u: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/"
    },
    {
      t: "TypeScript — Wikipedia",
      u: "https://en.wikipedia.org/wiki/TypeScript"
    }
  ],
  facts: [
    {
      text: "TypeScript’s type system is Turing complete. People have built games — and even run Doom — entirely inside the type checker.",
      src: {
        t: "Running Doom in TypeScript types (Socket)",
        u: "https://socket.dev/blog/typescript-types-running-doom"
      }
    },
    {
      text: "Anders Hejlsberg created Turbo Pascal, Delphi, C# and TypeScript — four hit tools across four decades.",
      src: {
        t: "Anders Hejlsberg — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Anders_Hejlsberg"
      }
    },
    {
      text: "Most popular npm packages ship type definitions, either built in or through the community DefinitelyTyped project.",
      src: {
        t: "DefinitelyTyped on GitHub",
        u: "https://github.com/DefinitelyTyped/DefinitelyTyped"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Front-end apps, Node back ends, and most large JavaScript codebases."
  },
  learnIf: "you’re doing any serious web development.",
  ecosystem: [
    {
      name: "tsc / TypeScript 7",
      what: "The compiler and type checker — rewritten in Go for TypeScript 7.0, with much faster builds."
    },
    {
      name: "Vite",
      what: "Fast builds with TypeScript support out of the box."
    },
    {
      name: "Next.js · Angular",
      what: "Full frameworks built with TypeScript in mind."
    },
    {
      name: "Zod",
      what: "Validate data at runtime and get TypeScript types from the same schema."
    },
    {
      name: "typescript-eslint",
      what: "Linting rules that understand types."
    },
    {
      name: "Deno · Bun",
      what: "JavaScript runtimes that can run TypeScript files directly."
    }
  ],
  pitfalls: [
    "Using any to silence errors — it switches type checking off.",
    "Trusting that API responses match your types; validate them at runtime.",
    "Overusing the non-null assertion !.",
    "Writing types so clever nobody can read them.",
    "Leaving \"strict\" off in tsconfig.json."
  ],
  roadmap: [
    "Solid JavaScript first.",
    "Basic types, interfaces and functions.",
    "Unions and narrowing.",
    "Generics and utility types.",
    "Strict mode and tsconfig.",
    "A full-stack project with React or Next.js."
  ],
  projects: [
    "A typed client for a public API with Zod validation.",
    "A React + TypeScript dashboard.",
    "A Node.js command-line tool.",
    "Convert one of your JavaScript projects to TypeScript."
  ]
};

CT.langs["swift"] = {
  id: "swift",
  name: "Swift",
  year: 2014,
  era: "mobile",
  level: "modern",
  creator: "Chris Lattner and team",
  org: "Apple",
  paradigm: "Multi-paradigm: protocol-oriented, object-oriented, functional",
  typing: "Static, strong, inferred",
  prism: "swift",
  tags: ["mobile", "apple"],
  tagline: "Apple’s fast, safe, modern language for iPhone, iPad, Mac, Watch and Vision Pro apps.",
  story: [
    "Chris Lattner — who also created the LLVM compiler infrastructure — started Swift as a secret side project at Apple in 2010. Apple surprised developers by announcing it at WWDC 2014 as the successor to Objective-C. Swift was open-sourced in December 2015 and runs on Linux and Windows as well as Apple platforms.",
    "Swift was designed to remove whole categories of bugs: values can’t be nil unless they’re declared optional, variables must be initialised before use, arrays are bounds-checked and integer overflow traps instead of silently wrapping. Structs and enums are first-class, and Apple encourages “protocol-oriented programming.”",
    "SwiftUI (2019) lets you build interfaces declaratively across every Apple platform. Swift 5.5 added async/await and actors, and Swift 6 (2024) introduced strict compile-time checking for data races."
  ],
  usedBy: [
    {
      who: "Apple",
      what: "Apps and frameworks across iOS, macOS, watchOS, tvOS and visionOS; SwiftUI."
    },
    {
      who: "App developers",
      what: "Most new iPhone apps — Airbnb, Lyft, LinkedIn and countless others."
    },
    {
      who: "Server side",
      what: "Frameworks like Vapor run Swift on Linux servers."
    }
  ],
  know: [
    "let is a constant; var is a variable. Prefer let.",
    "Optionals (String?) may hold nil. Unwrap with if let, guard let or ??.",
    "Force-unwrapping with ! crashes if the value is nil.",
    "Structs are value types (copied); classes are reference types (shared).",
    "guard exits early when a condition fails, keeping the happy path unindented.",
    "String interpolation uses a backslash: \"Hello \\(name)\".",
    "Functions that can fail are marked throws and called with try inside do/catch.",
    "Protocols define capabilities; extensions add methods to existing types.",
    "In SwiftUI, @State stores view-owned data and the UI re-renders when it changes."
  ],
  examples: [
    {
      title: "Structs, optionals, errors and guard",
      code: `struct Song {
    let title: String
    let artist: String
    var plays: Int = 0
}

enum PlaybackError: Error {
    case notFound(String)
}

func find(_ title: String, in library: [Song]) throws -> Song {
    guard let song = library.first(where: { $0.title == title }) else {
        throw PlaybackError.notFound(title)
    }
    return song
}

let library = [
    Song(title: "Neon Rain", artist: "Synth Kid", plays: 42),
    Song(title: "Lo-Fi Snow", artist: "Chill Bot"),
]

do {
    let song = try find("Neon Rain", in: library)
    print("Playing \\(song.title) by \\(song.artist)")
} catch {
    print("Error: \\(error)")
}`,
      note: ""
    },
    {
      title: "SwiftUI counter",
      code: `import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 16) {
            Text("Count: \\(count)")
                .font(.largeTitle)
            Button("Tap me") { count += 1 }
                .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}`,
      note: ""
    },
    {
      title: "Protocols, extensions and async/await",
      code: `protocol Describable {
    var summary: String { get }
}

extension Song: Describable {
    var summary: String { "\\(title) – \\(artist)" }
}

func loadSongs() async throws -> [Song] {
    let url = URL(string: "https://example.com/songs.json")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([Song].self, from: data)
}`,
      note: "To decode JSON, Song would also need to conform to Decodable."
    }
  ],
  cheats: [
    ["Constants", "let max = 10   var lives = 3"],
    ["Optional", "if let name = maybeName { print(name) }"],
    ["Default", "let display = nickname ?? \"Guest\""],
    ["Closure", "let doubled = nums.map { $0 * 2 }"],
    ["Interpolation", "print(\"Score: \\(score)\")"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What does this print?",
      options: ["0", "5", "Compile error", "nil"],
      answer: 0,
      explain: "Point is a struct, so b is an independent copy.",
      code: `struct Point { var x = 0 }
var a = Point()
var b = a
b.x = 5
print(a.x)`
    },
    {
      type: "mc",
      q: "If Point were a class instead of a struct, what would `a.x` print?",
      options: ["0", "5", "nil", "Compile error"],
      answer: 1,
      explain: "Classes are reference types: a and b would point to the same object."
    },
    {
      type: "mc",
      q: "What happens when you force-unwrap (`!`) a nil optional?",
      options: [
        "It returns 0",
        "It returns an empty string",
        "The app crashes at runtime",
        "Nothing"
      ],
      answer: 2,
      explain: "Force-unwrapping nil is a fatal runtime error."
    },
    {
      type: "mc",
      q: "What does `nickname ?? \"Guest\"` evaluate to when nickname is nil?",
      options: ["nil", "\"Guest\"", "An error", "\"nickname\""],
      answer: 1,
      explain: "?? is the nil-coalescing operator."
    },
    {
      type: "mc",
      q: "What is `$0` in `nums.map { $0 * 2 }`?",
      options: [
        "The first element of nums",
        "The closure’s first argument",
        "A global variable",
        "The return value"
      ],
      answer: 1,
      explain: "$0, $1… are shorthand names for closure parameters."
    },
    {
      type: "fill",
      q: "Complete the statement that exits early when the optional is nil.",
      code: `____ let user = currentUser else { return }
print(user.name)`,
      answers: ["guard"],
      explain: "guard let unwraps and keeps the variable in scope after the statement."
    },
    {
      type: "fill",
      q: "Complete the string interpolation for the variable score.",
      code: "print(\"Score: ____(score)\")",
      answers: ["\\"],
      explain: "Swift interpolation is \\(expression)."
    },
    {
      type: "mc",
      q: "In SwiftUI, what does `@State` do?",
      options: [
        "Makes a global variable",
        "Stores view-owned data and re-renders the view when it changes",
        "Saves to disk",
        "Marks a background thread"
      ],
      answer: 1,
      explain: "Changing @State triggers SwiftUI to recompute the body."
    },
    {
      type: "mc",
      q: "Which keyword must precede a call to a throwing function?",
      options: ["catch", "try", "throw", "await"],
      answer: 1,
      explain: "Calls to throwing functions are marked with try (inside do/catch or a throwing function)."
    },
    {
      type: "mc",
      q: "Who created Swift (and the LLVM compiler infrastructure)?",
      options: ["Craig Federighi", "Chris Lattner", "Steve Wozniak", "Brendan Eich"],
      answer: 1,
      explain: "Chris Lattner led Swift’s creation at Apple."
    },
    {
      type: "mc",
      q: "Why write `[weak self]` in a closure?",
      options: [
        "To make it faster",
        "To avoid a retain cycle that keeps objects in memory forever",
        "To make self optional everywhere",
        "It is required syntax"
      ],
      answer: 1,
      explain: "Strong references in both directions stop memory from being freed."
    },
    {
      type: "mc",
      q: "Which protocol lets a struct be decoded from JSON?",
      options: ["Equatable", "Decodable (part of Codable)", "Hashable", "Identifiable"],
      answer: 1,
      explain: "Conform to Codable (Encodable & Decodable) to convert to and from JSON."
    }
  ],
  sources: [
    {
      t: "The Swift Programming Language (book)",
      u: "https://docs.swift.org/swift-book/"
    },
    {
      t: "Swift.org documentation",
      u: "https://www.swift.org/documentation/"
    },
    {
      t: "Apple: SwiftUI tutorials",
      u: "https://developer.apple.com/tutorials/swiftui"
    },
    {
      t: "Hacking with Swift — 100 Days of SwiftUI",
      u: "https://www.hackingwithswift.com/100/swiftui"
    },
    {
      t: "Swift — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Swift_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Swift lets you use emoji as names: let 🐶 = \"dog\" is valid code.",
      src: {
        t: "The Basics (The Swift Programming Language)",
        u: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/"
      }
    },
    {
      text: "Apple’s Swift Playgrounds app teaches kids to code by guiding a character named Byte through puzzles.",
      src: {
        t: "Swift Playgrounds (Apple)",
        u: "https://www.apple.com/swift/playgrounds/"
      }
    },
    {
      text: "Chris Lattner started Swift in 2010 as a nights-and-weekends project before Apple put a team on it.",
      src: {
        t: "Chris Lattner’s homepage",
        u: "https://nondot.org/sabre/"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "iPhone, iPad, Mac, Watch and Vision Pro apps, plus some server code."
  },
  learnIf: "you want to build apps for Apple devices.",
  ecosystem: [
    {
      name: "Xcode",
      what: "Apple’s IDE for every Apple platform."
    },
    {
      name: "Swift Package Manager",
      what: "Add and share libraries."
    },
    {
      name: "SwiftUI",
      what: "Declarative UI across iPhone, iPad, Mac, Watch and Vision Pro."
    },
    {
      name: "UIKit",
      what: "The older, still widely used iOS UI framework."
    },
    {
      name: "SwiftData",
      what: "Save app data with Swift classes."
    },
    {
      name: "TestFlight",
      what: "Share beta builds with testers."
    },
    {
      name: "Vapor",
      what: "Server-side Swift."
    }
  ],
  pitfalls: [
    "Force-unwrapping optionals with ! and crashing.",
    "Retain cycles in closures — use [weak self] in long-lived closures.",
    "Updating the UI from a background thread.",
    "Huge views that do everything — split them into smaller views."
  ],
  roadmap: [
    "Swift basics: let/var, optionals, structs.",
    "Protocols, closures and enums.",
    "SwiftUI views, state and navigation.",
    "Networking with async/await and Codable.",
    "Saving data with SwiftData.",
    "TestFlight and the App Store."
  ],
  projects: [
    "A tip calculator.",
    "A notes app that saves with SwiftData.",
    "An app that shows data from a public API.",
    "A home-screen widget."
  ]
};

CT.langs["rust"] = {
  id: "rust",
  name: "Rust",
  year: 2015,
  era: "mobile",
  level: "modern",
  creator: "Graydon Hoare, then Mozilla and the Rust community",
  org: "Mozilla, now the Rust Foundation",
  paradigm: "Multi-paradigm: systems, functional, concurrent",
  typing: "Static, strong, inferred",
  prism: "rust",
  tags: ["systems", "web", "games"],
  tagline: "C++-level speed with memory safety guaranteed at compile time — no garbage collector.",
  story: [
    "Graydon Hoare started Rust as a personal project in 2006, reportedly after a broken elevator’s software crashed. Mozilla began sponsoring it in 2009 to build a safer, parallel browser engine, and Rust 1.0 was released in May 2015. Parts of Firefox’s engine, such as its parallel CSS styling (Stylo), are written in Rust.",
    "Rust’s key idea is ownership: every value has exactly one owner, and the compiler’s borrow checker enforces rules about who can read or change data. This prevents use-after-free, double frees and data races at compile time, without the runtime cost of a garbage collector. Microsoft and Google have reported that around 70% of their serious security bugs are memory-safety issues — exactly what Rust prevents.",
    "Rust support was merged into the Linux kernel in version 6.1 (2022); Microsoft is rewriting parts of Windows in it; Android ships Rust code; AWS built its Firecracker virtualisation in Rust; Discord and Cloudflare use it for performance-critical services. It has topped Stack Overflow’s “most loved / most admired language” survey for many years running."
  ],
  usedBy: [
    {
      who: "Mozilla",
      what: "Sponsored Rust; Firefox’s Stylo CSS engine and other components."
    },
    {
      who: "Microsoft",
      what: "Rewriting security-critical parts of Windows and Azure in Rust."
    },
    {
      who: "Google",
      what: "Android system components and Chromium dependencies."
    },
    {
      who: "Linux",
      what: "Rust is the second language accepted into the kernel."
    },
    {
      who: "AWS, Discord, Cloudflare",
      what: "Firecracker, low-latency services and network infrastructure."
    }
  ],
  know: [
    "Variables are immutable by default; use let mut to allow changes.",
    "Ownership: assigning a String to another variable moves it; the original can no longer be used.",
    "Borrowing: &T is a shared (read-only) reference; &mut T is an exclusive mutable reference. You can have many &T or one &mut T — never both at once.",
    "There is no null. Option<T> is Some(value) or None.",
    "There are no exceptions. Functions return Result<T, E>; the ? operator passes errors up.",
    "match must handle every possible case (it’s exhaustive).",
    "Names ending in ! (println!, vec!) are macros.",
    "Cargo is the build tool and package manager; packages are called crates (crates.io).",
    "The compiler’s error messages are famously helpful — read them carefully."
  ],
  examples: [
    {
      title: "Enums and pattern matching",
      code: `#[derive(Debug)]
enum Command {
    Move { x: i32, y: i32 },
    Say(String),
    Quit,
}

fn run(cmd: &Command) -> String {
    match cmd {
        Command::Move { x, y } => format!("Moving to ({x}, {y})"),
        Command::Say(text) => format!("Saying: {text}"),
        Command::Quit => String::from("Goodbye!"),
    }
}

fn main() {
    let cmds = vec![
        Command::Move { x: 3, y: -1 },
        Command::Say("hello".to_string()),
        Command::Quit,
    ];
    for c in &cmds {
        println!("{}", run(c));
    }
}`,
      note: ""
    },
    {
      title: "Ownership and borrowing",
      code: `fn length(s: &str) -> usize {     // borrows; doesn't take ownership
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let s2 = s1;                  // ownership MOVES to s2
    // println!("{s1}");          // compile error: value used after move

    let len = length(&s2);        // lend s2 temporarily
    println!("{s2} has {len} chars");

    let mut count = 0;
    let r = &mut count;           // one exclusive mutable borrow
    *r += 1;
    println!("{count}");          // 1
}`,
      note: ""
    },
    {
      title: "Option, Result and the ? operator",
      code: `use std::fs;
use std::io;

fn read_config(path: &str) -> Result<String, io::Error> {
    let text = fs::read_to_string(path)?;   // on error, return it immediately
    Ok(text.trim().to_string())
}

fn find_player(names: &[&str], target: &str) -> Option<usize> {
    names.iter().position(|n| *n == target)
}

fn main() {
    match read_config("config.txt") {
        Ok(cfg) => println!("Config: {cfg}"),
        Err(e) => eprintln!("Could not read config: {e}"),
    }

    let names = ["Ada", "Linus", "Grace"];
    if let Some(i) = find_player(&names, "Linus") {
        println!("Found at index {i}");     // Found at index 1
    }
}`,
      note: ""
    },
    {
      title: "Structs, traits and iterators",
      code: `trait Area {
    fn area(&self) -> f64;
}

struct Rect { w: f64, h: f64 }

impl Area for Rect {
    fn area(&self) -> f64 { self.w * self.h }
}

fn main() {
    let rects = vec![Rect { w: 2.0, h: 3.0 }, Rect { w: 1.0, h: 1.0 }];
    let total: f64 = rects.iter().map(|r| r.area()).sum();
    println!("Total area: {total}");    // Total area: 7
}`,
      note: ""
    }
  ],
  cheats: [
    ["Mutable", "let mut score = 0; score += 10;"],
    ["Vector", "let mut v = vec![1, 2, 3]; v.push(4);"],
    ["Option", "if let Some(x) = maybe { ... }"],
    ["Result", "let n: i32 = \"42\".parse()?;"],
    ["Cargo", "cargo new app && cargo run && cargo test"]
  ],
  quiz: [
    {
      type: "mc",
      q: "Why does this fail to compile?",
      options: [
        "String can’t be printed",
        "s1 was moved into s2, so s1 can’t be used",
        "Missing semicolon",
        "s2 must be mutable"
      ],
      answer: 1,
      explain: "Assigning a String moves ownership; the compiler forbids using s1 afterwards.",
      code: `let s1 = String::from("hi");
let s2 = s1;
println!("{s1}");`
    },
    {
      type: "mc",
      q: "Which combination of references is allowed at the same time?",
      options: [
        "Two &mut to the same value",
        "One &mut plus one &",
        "Any number of & (shared) references",
        "Unlimited &mut"
      ],
      answer: 2,
      explain: "Many readers OR one writer — never both."
    },
    {
      type: "mc",
      q: "How does Rust represent “maybe no value” instead of null?",
      options: ["null", "undefined", "Option<T>", "nil"],
      answer: 2,
      explain: "Option<T> is Some(T) or None, and the compiler makes you handle both."
    },
    {
      type: "mc",
      q: "What does the `?` operator do on a Result?",
      options: [
        "Prints the error",
        "Returns the error from the current function early, or unwraps Ok",
        "Ignores errors",
        "Panics"
      ],
      answer: 1,
      explain: "? propagates errors up to the caller."
    },
    {
      type: "mc",
      q: "What happens if a `match` doesn’t cover every variant of an enum?",
      options: [
        "It compiles with a warning",
        "Compile error",
        "The missing case returns null",
        "It panics at runtime"
      ],
      answer: 1,
      explain: "match must be exhaustive."
    },
    {
      type: "fill",
      q: "Complete the declaration so the variable can be changed.",
      code: `let ____ lives = 3;
lives -= 1;`,
      answers: ["mut"],
      explain: "Rust variables are immutable unless declared mut."
    },
    {
      type: "fill",
      q: "Complete the type: a function that returns a number or an IO error.",
      code: "fn load() -> ____<u32, std::io::Error> { ... }",
      answers: ["Result"],
      explain: "Result<T, E> is Ok(T) or Err(E)."
    },
    {
      type: "mc",
      q: "What is the `!` in `println!`?",
      options: ["A negation", "It marks a macro", "It means unsafe", "It forces evaluation"],
      answer: 1,
      explain: "println!, vec! and format! are macros, expanded at compile time."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["0", "1", "Compile error", "Garbage value"],
      answer: 1,
      explain: "The mutable borrow r increments count; once r is no longer used, count can be read again.",
      code: `let mut count = 0;
let r = &mut count;
*r += 1;
println!("{count}");`
    },
    {
      type: "mc",
      q: "Which major operating system kernel accepted Rust as a second language in 2022?",
      options: ["macOS XNU", "Linux", "FreeDOS", "Windows 95"],
      answer: 1,
      explain: "Rust support was merged in Linux 6.1."
    },
    {
      type: "mc",
      q: "What does `cargo clippy` do?",
      options: [
        "Copies files",
        "Runs a linter that suggests more idiomatic, correct Rust",
        "Formats code",
        "Publishes a crate"
      ],
      answer: 1,
      explain: "Clippy catches common mistakes; cargo fmt formats code."
    },
    {
      type: "mc",
      q: "Instead of `.unwrap()` inside a function that returns Result, what should you usually use?",
      options: ["panic!", "The ? operator", "unsafe", "clone()"],
      answer: 1,
      explain: "? passes the error up to the caller instead of crashing."
    }
  ],
  sources: [
    {
      t: "The Rust Programming Language (“the book”)",
      u: "https://doc.rust-lang.org/book/"
    },
    {
      t: "Rust by Example",
      u: "https://doc.rust-lang.org/rust-by-example/"
    },
    {
      t: "Rustlings — small exercises",
      u: "https://github.com/rust-lang/rustlings"
    },
    {
      t: "Rust Playground",
      u: "https://play.rust-lang.org/"
    },
    {
      t: "rust-lang.org",
      u: "https://www.rust-lang.org/"
    },
    {
      t: "Rust — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Rust_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Rust programmers call themselves Rustaceans, and the unofficial mascot is Ferris the crab.",
      src: {
        t: "rustacean.net — Ferris",
        u: "https://rustacean.net/"
      }
    },
    {
      text: "Graydon Hoare named Rust after rust fungi, which he admired as being over-engineered for survival.",
      src: {
        t: "Rust — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Rust_(programming_language)"
      }
    },
    {
      text: "The compiler’s error messages are famous for explaining what went wrong and suggesting the exact fix.",
      src: {
        t: "The Rust Programming Language (book)",
        u: "https://doc.rust-lang.org/book/"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Systems programming, browsers, OS kernels, cloud infrastructure, CLI tools and WebAssembly."
  },
  learnIf: "you want C++-level performance without memory bugs, or you’re heading into security.",
  ecosystem: [
    {
      name: "Cargo · crates.io",
      what: "Build tool, package manager and the package registry."
    },
    {
      name: "Tokio",
      what: "The most widely used async runtime."
    },
    {
      name: "Serde",
      what: "Convert data to and from JSON, TOML and more."
    },
    {
      name: "Axum",
      what: "A web framework from the Tokio team."
    },
    {
      name: "Clap",
      what: "Build command-line interfaces."
    },
    {
      name: "Bevy",
      what: "A data-driven game engine."
    },
    {
      name: "rust-analyzer · Clippy",
      what: "Editor intelligence and a linter that teaches idiomatic Rust."
    }
  ],
  pitfalls: [
    "Cloning everything to escape the borrow checker instead of rethinking ownership.",
    "unwrap() everywhere — handle errors with ? and Result.",
    "Reaching for Rc<RefCell<T>> to write object-oriented code from other languages.",
    "Adding lifetime annotations before you understand why they are needed."
  ],
  roadmap: [
    "The Rust Book, chapters 1–10.",
    "Ownership and borrowing practice with Rustlings.",
    "Error handling, traits and generics.",
    "Iterators and closures.",
    "Async with Tokio.",
    "Build a CLI, a web API or a game."
  ],
  projects: [
    "minigrep — the command-line search tool from the Rust Book.",
    "A JSON converter using Serde.",
    "A web API with Axum.",
    "A small game with Bevy.",
    "A WebAssembly demo that runs Rust in the browser."
  ]
};

CT.langs["dart"] = {
  id: "dart",
  name: "Dart & Flutter",
  year: 2011,
  era: "mobile",
  level: "modern",
  creator: "Lars Bak and Kasper Lund",
  org: "Google",
  paradigm: "Object-oriented, with functional features",
  typing: "Static, sound null safety",
  prism: "dart",
  tags: ["mobile", "web"],
  tagline: "One codebase, every screen: Google’s language behind Flutter apps.",
  story: [
    "Google unveiled Dart in 2011, created by Lars Bak and Kasper Lund (Bak had led the V8 JavaScript engine). It was first pitched as a replacement for JavaScript in browsers, which never happened. Dart found its real purpose with Flutter.",
    "Flutter, Google’s UI toolkit, reached 1.0 in December 2018. It draws every pixel itself instead of using native widgets, so one Dart codebase produces apps for iOS, Android, web, Windows, macOS and Linux that look and behave the same. Dart compiles ahead-of-time to fast native code for release builds, and its just-in-time mode during development powers Flutter’s famous stateful hot reload — change code and see it instantly without losing the app’s state.",
    "Dart 3 (2023) made sound null safety mandatory and added records, patterns and sealed classes. Flutter is used by Google Pay, BMW, Alibaba, eBay Motors and thousands of startups."
  ],
  usedBy: [
    {
      who: "Google",
      what: "Google Pay, Google Ads app and many internal tools are Flutter apps."
    },
    {
      who: "BMW",
      what: "The My BMW app is built with Flutter."
    },
    {
      who: "Alibaba & eBay",
      what: "Xianyu (Alibaba) and eBay Motors apps."
    }
  ],
  know: [
    "Everything in Flutter is a widget, including layout (Row, Column, Padding).",
    "StatelessWidget has no changing data; StatefulWidget uses setState() to update the UI.",
    "final is set once at runtime; const is a compile-time constant (and makes widgets cheaper).",
    "A leading underscore (_count) makes a member private to its library (file).",
    "Null safety: String can’t be null; String? can. Use ?? and ?. like Kotlin and Swift.",
    "Asynchronous code uses Future<T>, async and await.",
    "pubspec.yaml lists dependencies; packages come from pub.dev.",
    "Hot reload (r) and hot restart (R) speed up development enormously."
  ],
  examples: [
    {
      title: "Dart basics",
      code: `class Pet {
  final String name;
  final int age;
  Pet(this.name, this.age);

  @override
  String toString() => '$name ($age)';
}

void main() {
  final pets = [Pet('Mochi', 3), Pet('Biscuit', 7), Pet('Pixel', 1)];
  final young = pets.where((p) => p.age < 5).toList();
  print(young);                       // [Mochi (3), Pixel (1)]

  String? nickname;
  print(nickname ?? 'No nickname');   // No nickname

  final (name, level) = ('Ada', 12);  // Dart 3 record + pattern
  print('$name is level $level');
}`,
      note: ""
    },
    {
      title: "A Flutter counter app",
      code: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: CounterPage()));

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(
        child: Text('Taps: $_count', style: const TextStyle(fontSize: 32)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => _count++),
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
      note: ""
    },
    {
      title: "Futures and async",
      code: `Future<String> fetchUsername(int id) async {
  await Future.delayed(const Duration(milliseconds: 300));
  return 'user_$id';
}

Future<void> main() async {
  final names = await Future.wait([fetchUsername(1), fetchUsername(2)]);
  print(names);   // [user_1, user_2]
}`,
      note: ""
    }
  ],
  cheats: [
    ["Variables", "var a = 1; final b = DateTime.now(); const c = 3.14;"],
    ["Interpolation", "'Hello $name, you have ${items.length} items'"],
    ["Null-aware", "user?.name ?? 'Guest'"],
    ["Arrow fn", "int square(int x) => x * x;"],
    ["Update UI", "setState(() => _count++);"]
  ],
  quiz: [
    {
      type: "mc",
      q: "In Flutter, what do you call to rebuild a StatefulWidget with new data?",
      options: ["refresh()", "setState()", "render()", "notify()"],
      answer: 1,
      explain: "setState tells Flutter the state changed and build should run again."
    },
    {
      type: "mc",
      q: "What does a leading underscore like `_count` mean in Dart?",
      options: [
        "It’s a constant",
        "It’s private to its library (file)",
        "It’s nullable",
        "It’s static"
      ],
      answer: 1,
      explain: "Dart has no private keyword; _ marks library-private names."
    },
    {
      type: "mc",
      q: "What’s the difference between `final` and `const`?",
      options: [
        "None",
        "final is set once at runtime; const must be known at compile time",
        "const can be reassigned",
        "final is only for classes"
      ],
      answer: 1,
      explain: "Use const for values known at compile time, like many widgets."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["[Mochi, Biscuit]", "[Mochi (3), Pixel (1)]", "[Pixel (1)]", "[]"],
      answer: 1,
      explain: "where keeps pets younger than 5, and toString formats each one.",
      code: `final pets = [Pet('Mochi', 3), Pet('Biscuit', 7), Pet('Pixel', 1)];
print(pets.where((p) => p.age < 5).toList());`
    },
    {
      type: "mc",
      q: "What is Flutter’s “stateful hot reload”?",
      options: [
        "Restarting the phone",
        "Injecting code changes into the running app without losing its state",
        "A caching server",
        "Automatic testing"
      ],
      answer: 1,
      explain: "Hot reload uses Dart’s JIT compiler during development."
    },
    {
      type: "fill",
      q: "Complete the function so it can use await.",
      code: `Future<void> loadData() ____ {
  final data = await api.fetch();
}`,
      answers: ["async"],
      explain: "Functions that use await must be marked async."
    },
    {
      type: "fill",
      q: "Complete the operator that falls back to 'Guest' when name is null.",
      code: "print(name ____ 'Guest');",
      answers: ["??"],
      explain: "?? returns the right side when the left side is null."
    },
    {
      type: "mc",
      q: "How does Flutter draw its UI?",
      options: [
        "It wraps native iOS/Android widgets",
        "It renders every pixel itself with its own engine",
        "It uses HTML only",
        "It uses Java Swing"
      ],
      answer: 1,
      explain: "That’s why Flutter apps look identical across platforms."
    },
    {
      type: "mc",
      q: "Which Google engineer co-created Dart after leading the V8 engine?",
      options: ["Lars Bak", "Rob Pike", "Guido van Rossum", "Chris Lattner"],
      answer: 0,
      explain: "Lars Bak and Kasper Lund created Dart."
    },
    {
      type: "mc",
      q: "Why mark widgets `const` when you can?",
      options: [
        "It makes them editable",
        "Flutter can reuse them instead of rebuilding them",
        "It is required for Android",
        "It adds animations"
      ],
      answer: 1,
      explain: "Const widgets are created once and skipped during rebuilds."
    },
    {
      type: "mc",
      q: "What is Flame?",
      options: [
        "A database",
        "A 2D game engine built on Flutter",
        "A Dart compiler",
        "A testing tool"
      ],
      answer: 1,
      explain: "Flame adds a game loop, sprites, collisions and more to Flutter."
    }
  ],
  sources: [
    {
      t: "Dart language tour",
      u: "https://dart.dev/language"
    },
    {
      t: "Flutter documentation",
      u: "https://docs.flutter.dev/"
    },
    {
      t: "DartPad — run Dart and Flutter in the browser",
      u: "https://dartpad.dev/"
    },
    {
      t: "pub.dev — Dart and Flutter packages",
      u: "https://pub.dev/"
    },
    {
      t: "Dart — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Dart_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Dart and Flutter’s mascot is Dash, a blue hummingbird.",
      src: {
        t: "Flutter — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Flutter_(software)"
      }
    },
    {
      text: "Dart was originally meant to run in its own VM inside Chrome. Google dropped that plan in 2015 and Dart found its calling in Flutter.",
      src: {
        t: "Dart — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Dart_(programming_language)"
      }
    },
    {
      text: "Flutter’s hot reload usually updates the running app in about a second, without losing its state.",
      src: {
        t: "Hot reload (Flutter docs)",
        u: "https://docs.flutter.dev/tools/hot-reload"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Cross-platform mobile apps with Flutter, plus web and desktop."
  },
  learnIf: "you want one codebase for iOS and Android.",
  ecosystem: [
    {
      name: "Flutter SDK",
      what: "Build apps for iOS, Android, web and desktop."
    },
    {
      name: "pub.dev",
      what: "Dart and Flutter packages."
    },
    {
      name: "Riverpod · Provider · Bloc",
      what: "Popular state-management approaches."
    },
    {
      name: "go_router",
      what: "Navigation and deep links."
    },
    {
      name: "Firebase",
      what: "Google’s backend services: auth, database, hosting."
    },
    {
      name: "Flame",
      what: "A 2D game engine built on Flutter."
    },
    {
      name: "Flutter DevTools",
      what: "Inspect widgets, performance and memory."
    }
  ],
  pitfalls: [
    "Calling setState after a widget has been disposed.",
    "Enormous build methods — split them into smaller widgets.",
    "Forgetting const constructors, causing needless rebuilds.",
    "Putting business logic directly inside widgets."
  ],
  roadmap: [
    "Dart basics and null safety.",
    "Widgets and layout (Row, Column, Stack).",
    "State with setState, then Riverpod or Bloc.",
    "Navigation and networking.",
    "Storage and Firebase.",
    "Release to the App Store and Google Play."
  ],
  projects: [
    "A flashcard study app.",
    "An expense tracker with charts.",
    "A chat app with Firebase.",
    "A 2D game with Flame."
  ]
};

CT.langs["gdscript"] = {
  id: "gdscript",
  name: "GDScript",
  year: 2014,
  era: "mobile",
  level: "core",
  creator: "Juan Linietsky, Ariel Manzur and the Godot community",
  org: "Godot Engine (open source, MIT)",
  paradigm: "Object-oriented scripting",
  typing: "Dynamic with optional static types",
  prism: "gdscript",
  tags: ["games"],
  tagline: "A Python-like language made for the free, open-source Godot game engine.",
  story: [
    "Godot started as an in-house engine by Juan Linietsky and Ariel Manzur in Argentina and was released as open source under the MIT licence in 2014. Its team designed GDScript specifically for the engine after finding that general-purpose scripting languages didn’t integrate cleanly enough with Godot’s scene and node system.",
    "GDScript looks a lot like Python: indentation-based, readable, with optional type hints that also make code faster. It’s tightly connected to the engine — signals, nodes, exported properties and the editor all work naturally with it.",
    "Godot 4 (2023) brought a new renderer and a faster GDScript. After Unity’s pricing controversy in 2023, many developers moved to Godot. Games like Brotato, Dome Keeper and Cassette Beasts were built with it."
  ],
  usedBy: [
    {
      who: "Indie studios",
      what: "Brotato, Dome Keeper, Cassette Beasts and many more."
    },
    {
      who: "Godot Foundation",
      what: "Maintains the engine and language as free, community-driven software."
    },
    {
      who: "Education",
      what: "A popular first game-dev language because the engine is free and lightweight."
    }
  ],
  know: [
    "Each script extends a node type: extends CharacterBody2D.",
    "_ready() runs once when a node enters the scene; _process(delta) runs every frame; _physics_process(delta) runs at a fixed physics rate.",
    "@export shows a variable in the editor’s Inspector.",
    "Signals are Godot’s event system: signal died, then died.emit() and died.connect(callback).",
    "Optional static types (var speed: float = 200.0) catch bugs and speed up code.",
    "$NodeName is shorthand for get_node(\"NodeName\")."
  ],
  examples: [
    {
      title: "A platformer player (Godot 4)",
      code: `extends CharacterBody2D

@export var speed: float = 200.0
@export var jump_force: float = -400.0
var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_force

    velocity.x = Input.get_axis("ui_left", "ui_right") * speed
    move_and_slide()`,
      note: ""
    },
    {
      title: "Signals",
      code: `extends Node

signal health_changed(new_value: int)
signal died

var health: int = 100

func take_damage(amount: int) -> void:
    health = max(health - amount, 0)
    health_changed.emit(health)
    if health == 0:
        died.emit()

func _ready() -> void:
    died.connect(func(): print("Game over"))`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which function runs once when a node enters the scene tree?",
      options: ["_process", "_ready", "_init_frame", "start"],
      answer: 1,
      explain: "_ready is called after the node and its children are ready."
    },
    {
      type: "mc",
      q: "What does `@export` do?",
      options: [
        "Exports the game to Android",
        "Makes the variable editable in the Inspector",
        "Makes it global",
        "Saves it to disk"
      ],
      answer: 1,
      explain: "Exported variables appear in the editor."
    },
    {
      type: "mc",
      q: "Why multiply by `delta`?",
      options: [
        "To make the game random",
        "So movement is per second, not per frame",
        "Godot requires it to compile",
        "To lower CPU usage"
      ],
      answer: 1,
      explain: "delta is the time since the last frame."
    },
    {
      type: "mc",
      q: "What is `$Sprite2D` shorthand for?",
      options: ["A variable", "get_node(\"Sprite2D\")", "A price", "A signal"],
      answer: 1,
      explain: "$ gets a child node by path."
    },
    {
      type: "fill",
      q: "Complete the line that fires the `died` signal.",
      code: "died.____()",
      answers: ["emit"],
      explain: "In Godot 4, signals are emitted with signal_name.emit()."
    }
  ],
  sources: [
    {
      t: "GDScript reference (Godot docs)",
      u: "https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html"
    },
    {
      t: "Godot: Your first 2D game",
      u: "https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html"
    },
    {
      t: "Godot Engine",
      u: "https://godotengine.org/"
    },
    {
      t: "Godot — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Godot_(game_engine)"
    }
  ],
  facts: [
    {
      text: "Godot is named after Samuel Beckett’s play Waiting for Godot — a nod to the idea that the engine will never be “finished.”",
      src: {
        t: "Godot — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Godot_(game_engine)"
      }
    },
    {
      text: "Godot is completely free with no royalties: you own everything you make with it.",
      src: {
        t: "Godot license",
        u: "https://godotengine.org/license/"
      }
    },
    {
      text: "The Godot editor is itself built with Godot.",
      src: {
        t: "Godot — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Godot_(game_engine)"
      }
    }
  ],
  today: {
    status: "Growing",
    text: "Indie 2D and 3D games, prototypes and game jams."
  },
  learnIf: "you want to make indie games with a free, open-source engine."
};
