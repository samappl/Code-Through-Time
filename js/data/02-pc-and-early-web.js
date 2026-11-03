/* Code Through Time — content data. Edit freely: the app reads everything from window.CT. */
CT.langs["cpp"] = {
  id: "cpp",
  name: "C++",
  year: 1985,
  era: "pc",
  level: "core",
  creator: "Bjarne Stroustrup",
  org: "Bell Labs (AT&T)",
  paradigm: "Multi-paradigm: procedural, object-oriented, generic",
  typing: "Static, strong-ish",
  prism: "cpp",
  tags: ["systems", "games"],
  tagline: "C’s speed plus classes, templates and zero-cost abstractions — the engine of AAA games.",
  story: [
    "Bjarne Stroustrup started “C with Classes” at Bell Labs in 1979, bringing the classes of Simula (the first object-oriented language) to the speed of C. It was renamed C++ in 1983 (++ is C’s increment operator) and released commercially in 1985.",
    "C++ aims for “zero-cost abstractions”: features like classes and templates should cost nothing at runtime compared with writing the low-level code by hand. Since C++11 (2011) the language has modernised every three years — C++14, 17, 20 and 23 — adding smart pointers, lambdas, auto, ranges, modules and concepts.",
    "If software must be fast and close to the hardware, it’s probably C++: browsers, game engines, databases, trading systems, audio plugins and much of Windows and Office."
  ],
  usedBy: [
    {
      who: "Microsoft",
      what: "Large parts of Windows, Office and Visual Studio."
    },
    {
      who: "Google",
      what: "Chrome, the V8 JavaScript engine and much of Google’s search infrastructure."
    },
    {
      who: "Epic Games",
      what: "Unreal Engine — Fortnite and countless other games — is C++."
    },
    {
      who: "Adobe",
      what: "Photoshop, Premiere and most of the Creative Cloud apps."
    },
    {
      who: "Audio & finance",
      what: "JUCE audio plugins, digital audio workstations and low-latency trading systems."
    }
  ],
  know: [
    "RAII: resources (memory, files, locks) are released automatically when the object that owns them goes out of scope.",
    "Prefer std::unique_ptr / std::shared_ptr over raw new and delete.",
    "References (int& r = x) are aliases; pointers (int* p = &x) hold addresses.",
    "virtual functions enable runtime polymorphism; mark overrides with override.",
    "The Standard Library gives you containers (vector, map, unordered_map) and algorithms (sort, find_if).",
    "Templates let you write generic code that the compiler specialises for each type.",
    "Undefined behaviour (out-of-bounds access, use-after-free) is still possible, so tools like sanitizers matter."
  ],
  examples: [
    {
      title: "Classes, inheritance and smart pointers",
      code: `#include <iostream>
#include <memory>
#include <string>
#include <vector>

class Enemy {
public:
    Enemy(std::string name, int hp) : name_(std::move(name)), hp_(hp) {}
    virtual ~Enemy() = default;
    virtual void attack() const {
        std::cout << name_ << " attacks!\\n";
    }
protected:
    std::string name_;
    int hp_;
};

class Boss : public Enemy {
public:
    using Enemy::Enemy;                 // reuse Enemy's constructor
    void attack() const override {
        std::cout << name_ << " uses a SPECIAL attack!\\n";
    }
};

int main() {
    std::vector<std::unique_ptr<Enemy>> enemies;
    enemies.push_back(std::make_unique<Enemy>("Goblin", 10));
    enemies.push_back(std::make_unique<Boss>("Dragon", 500));

    for (const auto& e : enemies) e->attack();
}   // every Enemy is deleted automatically here (RAII)`,
      note: ""
    },
    {
      title: "Standard Library algorithms and lambdas",
      code: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores{42, 7, 99, 13, 58};

    std::sort(scores.begin(), scores.end(), [](int a, int b) { return a > b; });

    auto it = std::find_if(scores.begin(), scores.end(),
                           [](int s) { return s < 20; });

    std::cout << "Highest: " << scores.front() << '\\n';   // 99
    std::cout << "First under 20: " << *it << '\\n';        // 13
}`,
      note: ""
    },
    {
      title: "Templates",
      code: `template <typename T>
T clamp_value(T value, T low, T high) {
    return value < low ? low : (value > high ? high : value);
}

int    a = clamp_value(150, 0, 100);      // 100
double b = clamp_value(-0.5, 0.0, 1.0);   // 0.0`,
      note: ""
    }
  ],
  cheats: [
    ["Vector", "std::vector<int> v{1, 2, 3}; v.push_back(4);"],
    ["Map", "std::unordered_map<std::string, int> m; m[\"hp\"] = 100;"],
    ["Range for", "for (const auto& x : v) { ... }"],
    ["Smart pointer", "auto p = std::make_unique<Player>();"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What does RAII mean in practice?",
      options: [
        "Resources are freed automatically when their owning object goes out of scope",
        "All variables are global",
        "Memory is garbage-collected",
        "Classes cannot have destructors"
      ],
      answer: 0,
      explain: "Resource Acquisition Is Initialisation ties resource lifetime to object lifetime."
    },
    {
      type: "mc",
      q: "Which is the modern, safe way to own a heap object with a single owner?",
      options: ["new / delete", "malloc", "std::unique_ptr", "void*"],
      answer: 2,
      explain: "unique_ptr deletes the object automatically and can’t be accidentally copied."
    },
    {
      type: "mc",
      q: "What does the C++ example print for the Dragon?",
      options: ["Dragon attacks!", "Dragon uses a SPECIAL attack!", "Nothing", "Compile error"],
      answer: 1,
      explain: "attack() is virtual, so the Boss override runs even through an Enemy pointer."
    },
    {
      type: "mc",
      q: "What is printed?",
      options: ["5", "10", "Compile error", "Undefined"],
      answer: 1,
      explain: "r is a reference — another name for x — so changing r changes x.",
      code: `int x = 5;
int& r = x;
r = 10;
std::cout << x;`
    },
    {
      type: "mc",
      q: "Which language inspired C++’s classes?",
      options: ["Smalltalk", "Simula", "Pascal", "Lisp"],
      answer: 1,
      explain: "Stroustrup borrowed classes from Simula 67."
    },
    {
      type: "fill",
      q: "Complete the keyword that tells the compiler this method replaces a virtual one.",
      code: "void attack() const ____;",
      answers: ["override"],
      explain: "override makes the compiler check that a matching virtual function exists."
    },
    {
      type: "mc",
      q: "Which of these is mostly written in C++?",
      options: ["WordPress", "Unreal Engine", "Django", "Rails"],
      answer: 1,
      explain: "Unreal Engine is a C++ codebase."
    },
    {
      type: "mc",
      q: "Which build system do most modern C++ projects use?",
      options: ["npm", "CMake", "pip", "Gradle"],
      answer: 1,
      explain: "CMake generates builds for many platforms and IDEs."
    },
    {
      type: "mc",
      q: "How should you pass a large object you only need to read?",
      options: [
        "By value",
        "By const reference (const T&)",
        "As a raw pointer you delete",
        "As a global"
      ],
      answer: 1,
      explain: "It avoids a copy and promises not to change it."
    }
  ],
  sources: [
    {
      t: "isocpp.org — Get started",
      u: "https://isocpp.org/get-started"
    },
    {
      t: "learncpp.com (free, thorough)",
      u: "https://www.learncpp.com/"
    },
    {
      t: "cppreference — C++ reference",
      u: "https://en.cppreference.com/w/cpp"
    },
    {
      t: "C++ Core Guidelines",
      u: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines"
    },
    {
      t: "Bjarne Stroustrup’s homepage",
      u: "https://www.stroustrup.com/"
    }
  ],
  facts: [
    {
      text: "The name is a programmer joke: ++ adds one to a variable, so C++ is “one more than C.”",
      src: {
        t: "C++ — Wikipedia",
        u: "https://en.wikipedia.org/wiki/C%2B%2B"
      }
    },
    {
      text: "The C++20 standard document runs to roughly 1,800 pages.",
      src: {
        t: "The Standard (isocpp.org)",
        u: "https://isocpp.org/std/the-standard"
      }
    },
    {
      text: "World of Warcraft, Fortnite and most other big games run on engines written in C++.",
      src: {
        t: "Unreal Engine — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Unreal_Engine"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Game engines, browsers, audio software, trading systems, robotics and high-performance apps."
  },
  learnIf: "you want to make games or engines, audio plugins, or performance-critical software.",
  ecosystem: [
    {
      name: "CMake",
      what: "The most common build system for C++ projects."
    },
    {
      name: "vcpkg · Conan",
      what: "Package managers for C++ libraries."
    },
    {
      name: "Unreal Engine",
      what: "AAA game engine built on C++."
    },
    {
      name: "Qt",
      what: "Cross-platform desktop and embedded UI framework."
    },
    {
      name: "JUCE",
      what: "The standard framework for audio plugins and music apps."
    },
    {
      name: "clang-tidy · sanitizers",
      what: "Static analysis and runtime bug detection."
    }
  ],
  pitfalls: [
    "Using raw new/delete instead of smart pointers and containers.",
    "Dangling references to objects that have been destroyed.",
    "Copying large objects by accident instead of passing const references.",
    "Undefined behaviour from out-of-bounds access or uninitialised variables.",
    "Trying to learn every feature — focus on modern C++ (C++17 and later)."
  ],
  roadmap: [
    "C++ basics: types, functions, references.",
    "Classes, constructors, destructors and RAII.",
    "The Standard Library: vector, string, map, algorithms.",
    "Smart pointers, move semantics and templates.",
    "CMake, a debugger and sanitizers.",
    "Pick a track: games (Unreal), audio (JUCE), systems or finance."
  ],
  projects: [
    "A text adventure game.",
    "A 2D game with SFML or raylib.",
    "An audio effect plugin with JUCE.",
    "A small ray tracer that renders an image."
  ]
};

CT.langs["objc"] = {
  id: "objc",
  name: "Objective-C",
  year: 1984,
  era: "pc",
  level: "classic",
  creator: "Brad Cox and Tom Love",
  org: "Stepstone, then NeXT and Apple",
  paradigm: "Object-oriented (C plus Smalltalk-style messaging)",
  typing: "Static and dynamic",
  prism: "objectivec",
  tags: ["mobile", "apple"],
  tagline: "C with Smalltalk messages — the language of NeXT, Mac OS X and the first iPhone apps.",
  story: [
    "Brad Cox and Tom Love created Objective-C in the early 1980s by adding Smalltalk-style objects and message passing on top of C. Steve Jobs’s company NeXT licensed it in 1988 and built the NeXTSTEP operating system and its development tools with it.",
    "Tim Berners-Lee wrote the very first web browser on a NeXT computer in 1990. When Apple bought NeXT in 1997 and brought Jobs back, NeXTSTEP became the foundation of Mac OS X (2001), and Objective-C with the Cocoa frameworks became Apple’s main language.",
    "When the iPhone SDK opened in 2008, every App Store app was written in Objective-C. Apple added Automatic Reference Counting (ARC) in 2011 to remove most manual memory management, and in 2014 introduced Swift as its successor. Many large apps still contain Objective-C today."
  ],
  usedBy: [
    {
      who: "NeXT",
      what: "NeXTSTEP and the first World Wide Web browser."
    },
    {
      who: "Apple",
      what: "Mac OS X, iOS and Cocoa/Cocoa Touch frameworks — Apple’s main language from 2001 to 2014."
    },
    {
      who: "App developers",
      what: "Every early App Store app, including the first versions of Instagram, Angry Birds and Facebook for iPhone."
    }
  ],
  know: [
    "Square brackets send messages: [player addPoints:50].",
    "@\"text\" is an NSString literal; NS stands for NeXTSTEP.",
    "Header files declare an @interface; .m files contain the @implementation.",
    "Sending a message to nil does nothing and returns zero — no crash.",
    "Swift can call Objective-C and vice versa, so mixed codebases are common."
  ],
  examples: [
    {
      title: "A class with a property and a method",
      code: `#import <Foundation/Foundation.h>

@interface Player : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic) NSInteger score;
- (void)addPoints:(NSInteger)points;
@end

@implementation Player
- (void)addPoints:(NSInteger)points {
    self.score += points;
    NSLog(@"%@ now has %ld points", self.name, (long)self.score);
}
@end

int main(int argc, const char *argv[]) {
    @autoreleasepool {
        Player *p = [[Player alloc] init];
        p.name = @"Ada";
        [p addPoints:50];
    }
    return 0;
}`,
      note: ""
    },
    {
      title: "Collections and blocks",
      code: `NSArray *names = @[@"Grace", @"Linus", @"Ada"];
NSArray *sorted = [names sortedArrayUsingSelector:@selector(compare:)];

[sorted enumerateObjectsUsingBlock:^(NSString *name, NSUInteger i, BOOL *stop) {
    NSLog(@"%lu: %@", (unsigned long)i, name);
}];`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does `[p addPoints:50]` do?",
      options: [
        "Creates an array",
        "Sends the addPoints: message to p with argument 50",
        "Accesses index 50",
        "Imports a file"
      ],
      answer: 1,
      explain: "Square brackets are Objective-C’s message-send syntax, borrowed from Smalltalk."
    },
    {
      type: "mc",
      q: "What happens when you send a message to nil?",
      options: ["The app crashes", "Nothing — it returns zero/nil", "A compile error", "It retries"],
      answer: 1,
      explain: "Messaging nil is a no-op, which avoids many crashes but can hide bugs."
    },
    {
      type: "mc",
      q: "Which company first licensed Objective-C and built an OS with it?",
      options: ["Microsoft", "NeXT", "IBM", "Sun"],
      answer: 1,
      explain: "Steve Jobs’s NeXT built NeXTSTEP with Objective-C."
    },
    {
      type: "mc",
      q: "What was famously written on a NeXT computer with this toolset?",
      options: ["The first web browser", "Linux", "Windows 95", "Doom"],
      answer: 0,
      explain: "Tim Berners-Lee built WorldWideWeb on NeXTSTEP in 1990."
    }
  ],
  sources: [
    {
      t: "Apple: Programming with Objective-C (archive)",
      u: "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html"
    },
    {
      t: "Objective-C — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Objective-C"
    },
    {
      t: "NeXTSTEP — Wikipedia",
      u: "https://en.wikipedia.org/wiki/NeXTSTEP"
    }
  ],
  facts: [
    {
      text: "The NS prefix on NSString, NSArray and friends stands for NeXTSTEP — you can still see Steve Jobs’s NeXT in every Apple app.",
      src: {
        t: "Objective-C — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Objective-C"
      }
    },
    {
      text: "Objective-C is a strict superset of C, so any valid C program is also valid Objective-C.",
      src: {
        t: "Objective-C — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Objective-C"
      }
    },
    {
      text: "The NeXT computer that ran the first web server had a hand-written label: “This machine is a server. DO NOT POWER IT DOWN!!”",
      src: {
        t: "CERN httpd — Wikipedia",
        u: "https://en.wikipedia.org/wiki/CERN_httpd"
      }
    }
  ],
  today: {
    status: "Legacy",
    text: "Maintained inside older Apple apps and frameworks; new code is written in Swift."
  },
  learnIf: "you’ll maintain older iOS or macOS codebases."
};

CT.langs["perl"] = {
  id: "perl",
  name: "Perl",
  year: 1987,
  era: "pc",
  level: "classic",
  creator: "Larry Wall",
  org: "Unisys (released as open source)",
  paradigm: "Multi-paradigm scripting",
  typing: "Dynamic",
  prism: "perl",
  tags: ["web", "text"],
  tagline: "The “duct tape of the internet” — text processing and the early dynamic web.",
  story: [
    "Larry Wall, a linguist turned programmer, released Perl in 1987 to make report processing on Unix easier. Its motto is “There’s more than one way to do it,” and it made regular expressions a first-class part of the language.",
    "In the 1990s Perl became the main language for CGI scripts — the first way to make web pages dynamic. Forms, guestbooks, counters and shopping carts were very often Perl scripts sitting in a cgi-bin folder.",
    "PHP, Python and Ruby took over web development in the 2000s, but Perl’s regular-expression syntax lives on everywhere: the PCRE library (Perl Compatible Regular Expressions) is used by countless tools and languages."
  ],
  usedBy: [
    {
      who: "Early web giants",
      what: "IMDb, Craigslist and Booking.com built major systems in Perl; Amazon used it extensively in its early years."
    },
    {
      who: "System administrators",
      what: "Log parsing, automation and glue scripts on Unix and Linux servers."
    },
    {
      who: "Bioinformatics",
      what: "Perl was a key language of the Human Genome Project for processing DNA sequence text."
    }
  ],
  know: [
    "Sigils show the type: $scalar, @array, %hash.",
    "Regular expressions are built in: $text =~ /pattern/.",
    "Always start with use strict; and use warnings;.",
    "$_ is the default variable many functions use when you don’t name one.",
    "Perl’s regex syntax is what most other languages copied."
  ],
  examples: [
    {
      title: "Count log levels with a regex",
      code: `use strict;
use warnings;

my @lines = ("ERROR disk full", "INFO ok", "ERROR net down");
my %count;

for my $line (@lines) {
    if ($line =~ /^(\\w+)\\s+(.*)$/) {
        $count{$1}++;          # $1 is the first captured group
    }
}
print "$_: $count{$_}\\n" for sort keys %count;
# ERROR: 2
# INFO: 1`,
      note: ""
    },
    {
      title: "Search and replace in one line",
      code: `my $s = "Hello World";
(my $t = $s) =~ s/World/Perl/;
print "$t\\n";   # Hello Perl`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "What does the `@` sigil mean?",
      options: ["A scalar", "An array", "A hash", "A reference"],
      answer: 1,
      explain: "$ for scalars, @ for arrays, % for hashes."
    },
    {
      type: "mc",
      q: "In `/^(\\w+)\\s+/`, what does `$1` hold after a match?",
      options: [
        "The whole line",
        "The first captured group",
        "The number 1",
        "The rest of the line"
      ],
      answer: 1,
      explain: "Parentheses capture text; $1 is the first capture."
    },
    {
      type: "mc",
      q: "What was Perl famously used for on the 1990s web?",
      options: [
        "Browser plugins",
        "CGI scripts for dynamic pages",
        "CSS styling",
        "Video streaming"
      ],
      answer: 1,
      explain: "Many early dynamic pages were Perl CGI scripts."
    },
    {
      type: "mc",
      q: "What does PCRE stand for?",
      options: [
        "Perl Compatible Regular Expressions",
        "Portable C Runtime Engine",
        "Personal Code Review Engine",
        "Perl Core Runtime Environment"
      ],
      answer: 0,
      explain: "PCRE brought Perl-style regex to many other languages and tools."
    }
  ],
  sources: [
    {
      t: "perldoc — official Perl documentation",
      u: "https://perldoc.perl.org/"
    },
    {
      t: "Learn Perl",
      u: "https://learn.perl.org/"
    },
    {
      t: "Perl — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Perl"
    },
    {
      t: "regex101 — test regular expressions",
      u: "https://regex101.com/"
    }
  ],
  facts: [
    {
      text: "Larry Wall says the three great virtues of a programmer are laziness, impatience and hubris.",
      src: {
        t: "Larry Wall — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Larry_Wall"
      }
    },
    {
      text: "It was almost called “Pearl,” but another language called PEARL already existed, so the a was dropped.",
      src: {
        t: "Perl — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Perl"
      }
    },
    {
      text: "Perl 6 grew so different from Perl 5 that it was renamed Raku in 2019.",
      src: {
        t: "Raku — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Raku_(programming_language)"
      }
    }
  ],
  today: {
    status: "Niche",
    text: "System administration scripts, text processing and long-running legacy web systems."
  },
  learnIf: "you work with older Unix systems — otherwise its regex skills transfer everywhere."
};

CT.langs["python"] = {
  id: "python",
  name: "Python",
  year: 1991,
  era: "web",
  level: "modern",
  creator: "Guido van Rossum",
  org: "CWI (Netherlands), now the Python Software Foundation",
  paradigm: "Multi-paradigm: object-oriented, procedural, functional",
  typing: "Dynamic, strong (optional type hints)",
  prism: "python",
  tags: ["ai", "data", "web", "beginner"],
  tagline: "Readable, batteries-included — and the main language of AI and data science.",
  story: [
    "Guido van Rossum started Python over the Christmas holidays of 1989 at CWI in the Netherlands and released it in February 1991. He named it after Monty Python’s Flying Circus, not the snake. Its core idea: code is read far more often than it is written, so make it readable. Indentation isn’t just style — it defines the structure.",
    "Google adopted Python early, and Guido worked there from 2005 to 2012, then at Dropbox, and joined Microsoft in 2020. YouTube, Instagram (Django), Dropbox, Reddit, Spotify and Netflix all rely heavily on Python. The painful switch from Python 2 to Python 3 took over a decade; Python 2 reached end of life on January 1, 2020.",
    "Python became the language of data science and AI thanks to NumPy, pandas, scikit-learn, Jupyter notebooks, and the deep-learning frameworks PyTorch (Meta) and TensorFlow (Google). Most AI model training, research and tooling is driven from Python, with the heavy maths running in C, C++ and GPU code underneath."
  ],
  usedBy: [
    {
      who: "Google",
      what: "An early “official” language at Google, alongside C++ and Java; TensorFlow and JAX for machine learning."
    },
    {
      who: "Meta",
      what: "Instagram runs one of the world’s largest Django deployments; PyTorch came out of Meta AI."
    },
    {
      who: "Microsoft",
      what: "Employs Guido van Rossum; Python in Excel, VS Code’s Python tooling and Azure ML."
    },
    {
      who: "Netflix & Spotify",
      what: "Data pipelines, recommendations and backend services."
    },
    {
      who: "NASA & science",
      what: "Data analysis, astronomy and the image processing behind the first black-hole image."
    }
  ],
  know: [
    "Indentation defines blocks — there are no braces. Use 4 spaces (PEP 8).",
    "Core data structures: list [1, 2], tuple (1, 2), dict {\"a\": 1}, set {1, 2}.",
    "Slicing: items[start:stop:step] — stop is exclusive.",
    "Comprehensions build lists and dicts concisely: [x * 2 for x in nums if x > 0].",
    "/ is true division (7 / 2 == 3.5); // is floor division (7 // 2 == 3).",
    "== compares values; is compares identity (the same object). Use is only for None.",
    "Default arguments are evaluated once — never use a mutable default like [] or {}.",
    "Use virtual environments (python -m venv .venv) and pip to manage packages per project.",
    "Type hints (def f(x: int) -> str) don’t change runtime behaviour but help editors and tools like mypy catch bugs.",
    "The GIL historically let only one thread run Python bytecode at a time; use multiprocessing or async for many workloads. Python 3.13 added an experimental free-threaded build."
  ],
  examples: [
    {
      title: "Classes, dataclasses and comprehensions",
      code: `from dataclasses import dataclass

@dataclass
class Track:
    title: str
    artist: str
    plays: int = 0

library = [
    Track("Night Drive", "Synth Kid", 340),
    Track("Lo-Fi Snow", "Chill Bot", 95),
    Track("Jungle Run", "Amen Crew", 120),
]

popular = [t.title for t in library if t.plays >= 100]
by_artist = {t.artist: t.plays for t in library}

print(popular)                  # ['Night Drive', 'Jungle Run']
print(max(library, key=lambda t: t.plays).title)  # Night Drive`,
      note: ""
    },
    {
      title: "Files, JSON and error handling",
      code: `import json
from pathlib import Path

def load_scores(path: str) -> dict[str, int]:
    try:
        return json.loads(Path(path).read_text())
    except FileNotFoundError:
        print(f"{path} not found, starting fresh")
        return {}

scores = load_scores("scores.json")
scores["Ada"] = scores.get("Ada", 0) + 10

leaders = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
for rank, (name, pts) in enumerate(leaders, start=1):
    print(f"{rank}. {name} - {pts}")

Path("scores.json").write_text(json.dumps(scores, indent=2))`,
      note: ""
    },
    {
      title: "Generators and async",
      code: `import asyncio

def countdown(n):
    while n > 0:
        yield n          # produces values lazily, one at a time
        n -= 1

print(list(countdown(3)))   # [3, 2, 1]

async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"{name} done"

async def main():
    results = await asyncio.gather(fetch("a", 1), fetch("b", 1))
    print(results)          # both finish in about 1 second total

asyncio.run(main())`,
      note: ""
    },
    {
      title: "The mutable default argument trap",
      code: `def add_item(item, bucket=[]):      # BUG: the same list is reused every call
    bucket.append(item)
    return bucket

add_item("a")   # ['a']
add_item("b")   # ['a', 'b']  <- surprise!

def add_item_fixed(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket`,
      note: ""
    }
  ],
  cheats: [
    ["f-string", "f\"{name} has {score:,} points\""],
    ["Slice", "nums[1:4]   nums[::-1]   nums[-1]"],
    ["Dict get", "counts.get(key, 0)"],
    ["Unpack", "first, *rest = [1, 2, 3]"],
    ["Context manager", "with open(\"f.txt\") as f: data = f.read()"],
    ["venv", "python -m venv .venv && source .venv/bin/activate"]
  ],
  quiz: [
    {
      type: "mc",
      q: "What does this print?",
      options: ["1 1.5", "1.5 1.5", "1 1", "1.5 1"],
      answer: 0,
      explain: "// is floor division; / is true division.",
      code: "print(3 // 2, 3 / 2)"
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["[1, 2, 3]", "[2, 3, 4]", "[2, 3]", "[1, 2, 3, 4]"],
      answer: 1,
      explain: "The stop index (4) is excluded, so you get indexes 1, 2 and 3.",
      code: `nums = [1, 2, 3, 4, 5]
print(nums[1:4])`
    },
    {
      type: "mc",
      q: "What does the second call return?",
      options: ["['b']", "['a', 'b']", "['b', 'a']", "An error"],
      answer: 1,
      explain: "Default values are created once, so both calls share the same list.",
      code: `def add(item, bucket=[]):
    bucket.append(item)
    return bucket

add("a")
print(add("b"))`
    },
    {
      type: "mc",
      q: "Which is the correct way to check whether `x` is None?",
      options: ["x == None", "x is None", "x === None", "None(x)"],
      answer: 1,
      explain: "None is a singleton, so identity comparison with is is the idiom."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["{1: 1, 2: 4, 3: 9}", "[1, 4, 9]", "{1, 4, 9}", "(1, 4, 9)"],
      answer: 0,
      explain: "A dict comprehension builds key: value pairs.",
      code: "print({n: n * n for n in range(1, 4)})"
    },
    {
      type: "fill",
      q: "Complete the method that runs when a new object is created.",
      code: `class Player:
    def ____(self, name):
        self.name = name`,
      answers: ["__init__"],
      explain: "__init__ is Python’s initialiser, called after the object is created."
    },
    {
      type: "fill",
      q: "Complete the keyword that makes this function produce values lazily.",
      code: `def evens(limit):
    for n in range(0, limit, 2):
        ____ n`,
      answers: ["yield"],
      explain: "yield turns a function into a generator."
    },
    {
      type: "mc",
      q: "What does `print(\"Ada\" * 2)` print?",
      options: ["Ada2", "AdaAda", "Error", "Ada Ada"],
      answer: 1,
      explain: "Multiplying a string repeats it."
    },
    {
      type: "mc",
      q: "Which library was created at Meta and is now the most widely used for deep-learning research?",
      options: ["Django", "PyTorch", "Flask", "pandas"],
      answer: 1,
      explain: "PyTorch came out of Meta AI and is governed by the PyTorch Foundation."
    },
    {
      type: "mc",
      q: "What is the bug?",
      options: [
        "You can’t call len on a list",
        "The loop modifies the list it’s iterating over, so items get skipped",
        "range is wrong",
        "Nothing"
      ],
      answer: 1,
      explain: "Removing while iterating shifts items under the loop; build a new list instead, e.g. [n for n in nums if n % 2].",
      code: `nums = [2, 4, 5, 6]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)
print(nums)   # expected [5] but prints [4, 5]`
    },
    {
      type: "mc",
      q: "Why should every project have its own virtual environment?",
      options: [
        "It makes Python faster",
        "Each project gets its own package versions, avoiding conflicts",
        "It is required to run scripts",
        "It encrypts your code"
      ],
      answer: 1,
      explain: "python -m venv .venv (or uv) keeps dependencies per project."
    },
    {
      type: "mc",
      q: "What does this print?",
      options: ["[1, 2, 3]", "[3, 2, 1]", "[1, 3]", "Error"],
      answer: 1,
      explain: "A step of -1 reverses the list.",
      code: "print([1, 2, 3][::-1])"
    }
  ],
  sources: [
    {
      t: "The official Python tutorial",
      u: "https://docs.python.org/3/tutorial/"
    },
    {
      t: "PEP 8 — Style Guide for Python Code",
      u: "https://peps.python.org/pep-0008/"
    },
    {
      t: "Automate the Boring Stuff with Python (free)",
      u: "https://automatetheboringstuff.com/"
    },
    {
      t: "Real Python tutorials",
      u: "https://realpython.com/"
    },
    {
      t: "Python history — Guido’s foreword",
      u: "https://www.python.org/doc/essays/foreword/"
    },
    {
      t: "Python — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Python_(programming_language)"
    }
  ],
  facts: [
    {
      text: "Type import this into Python to read “The Zen of Python,” its design philosophy in 19 lines.",
      src: {
        t: "PEP 20 — The Zen of Python",
        u: "https://peps.python.org/pep-0020/"
      }
    },
    {
      text: "Type import antigravity and Python opens an xkcd comic about Python.",
      src: {
        t: "xkcd 353: Python",
        u: "https://xkcd.com/353/"
      }
    },
    {
      text: "Guido van Rossum was Python’s “Benevolent Dictator For Life” until he stepped down in 2018. An elected Steering Council now leads it.",
      src: {
        t: "Guido van Rossum — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Guido_van_Rossum"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "AI and machine learning, data science, automation, web back ends, scripting and teaching."
  },
  learnIf: "you want AI, data, automation, or the friendliest possible first language.",
  ecosystem: [
    {
      name: "pip + venv",
      what: "The built-in way to install packages into an isolated per-project environment."
    },
    {
      name: "uv",
      what: "A very fast package and project manager written in Rust, increasingly used instead of pip + venv."
    },
    {
      name: "Django / FastAPI / Flask",
      what: "Web frameworks: Django is batteries-included, FastAPI is built for typed APIs, Flask is minimal."
    },
    {
      name: "NumPy · pandas · Matplotlib",
      what: "Arrays, data tables and charts — the core of data science."
    },
    {
      name: "PyTorch · scikit-learn",
      what: "Deep learning and classic machine learning."
    },
    {
      name: "pytest",
      what: "The most popular testing framework."
    },
    {
      name: "Jupyter",
      what: "Notebooks that mix code, charts and notes — standard in data and AI work."
    }
  ],
  pitfalls: [
    "Using a mutable default argument like def f(items=[]).",
    "Installing everything globally instead of using a virtual environment, then fighting version conflicts.",
    "Shadowing built-ins: naming a variable list, dict, str or id.",
    "Catching every error with a bare except: and hiding real bugs.",
    "Mixing tabs and spaces for indentation."
  ],
  roadmap: [
    "Syntax, variables, strings, lists, dicts and loops.",
    "Functions, modules, reading and writing files, error handling.",
    "Classes, dataclasses and type hints.",
    "Virtual environments, packages and testing with pytest.",
    "Pick a track: web (Django or FastAPI), data (pandas and Jupyter), AI (NumPy then PyTorch) or automation (scripts and APIs)."
  ],
  projects: [
    "A script that renames and sorts the files in your Downloads folder.",
    "A web scraper that tracks a product’s price and emails you when it drops.",
    "A FastAPI to-do API with tests.",
    "Analyse a public CSV dataset with pandas and chart the results.",
    "A Discord bot."
  ]
};

CT.langs["vb"] = {
  id: "vb",
  name: "Visual Basic",
  year: 1991,
  era: "web",
  level: "classic",
  creator: "Microsoft (from Alan Cooper’s visual form designer)",
  org: "Microsoft",
  paradigm: "Event-driven, object-based (VB.NET is fully OOP)",
  typing: "Static or dynamic",
  prism: "visual-basic",
  tags: ["business", "windows"],
  tagline: "Drag a button onto a form, double-click, write code. Windows apps for everyone.",
  story: [
    "Visual Basic 1.0 shipped in 1991. It combined BASIC with a drag-and-drop form designer originally prototyped by Alan Cooper, often called the “father of Visual Basic.” You drew a window, dropped buttons and text boxes on it, double-clicked a button and wrote what should happen when it was clicked. This event-driven style made Windows programming accessible to millions.",
    "In 1993 Microsoft put Visual Basic for Applications (VBA) inside Excel, and it spread across Office. VBA macros still automate countless spreadsheets in offices around the world.",
    "VB.NET arrived in 2002 as a full .NET language alongside C#. Microsoft has said it will keep supporting VB.NET but not add major new features, so new projects generally choose C#."
  ],
  usedBy: [
    {
      who: "Microsoft",
      what: "Visual Basic, VBA in Office and VB.NET."
    },
    {
      who: "Businesses everywhere",
      what: "In-house Windows tools, data-entry apps and Excel/Access automation."
    }
  ],
  know: [
    "Event-driven: code lives in handlers like btnSave_Click.",
    "Dim declares a variable: Dim count As Integer = 0.",
    "& joins strings: \"Hello, \" & name.",
    "Blocks end with keywords: End If, End Sub, Next.",
    "VBA is still a valuable skill for office and data jobs that live in Excel."
  ],
  examples: [
    {
      title: "VB.NET button click",
      code: `Private Sub btnGreet_Click(sender As Object, e As EventArgs) Handles btnGreet.Click
    Dim name As String = txtName.Text.Trim()
    If name = "" Then
        MessageBox.Show("Please enter a name.")
    Else
        MessageBox.Show("Hello, " & name & "!")
    End If
End Sub`,
      note: ""
    },
    {
      title: "Excel VBA macro",
      code: `Sub HighlightBigSales()
    Dim cell As Range
    For Each cell In Range("B2:B100")
        If cell.Value > 1000 Then
            cell.Interior.Color = vbYellow
        End If
    Next cell
End Sub`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which operator joins strings in Visual Basic?",
      options: ["+", "&", ".", "||"],
      answer: 1,
      explain: "& is the string-concatenation operator."
    },
    {
      type: "mc",
      q: "What does `Dim` do?",
      options: ["Dims the screen", "Declares a variable", "Deletes a file", "Defines a module"],
      answer: 1,
      explain: "Dim declares a variable."
    },
    {
      type: "mc",
      q: "Where is VBA still used heavily today?",
      options: ["iPhone apps", "Microsoft Office macros", "Linux kernels", "Game consoles"],
      answer: 1,
      explain: "VBA automates Excel, Word, Access and Outlook."
    },
    {
      type: "mc",
      q: "What programming style did Visual Basic make popular?",
      options: ["Functional", "Event-driven", "Logic programming", "Assembly"],
      answer: 1,
      explain: "Code runs in response to events like clicks."
    }
  ],
  sources: [
    {
      t: "Visual Basic docs (Microsoft Learn)",
      u: "https://learn.microsoft.com/en-us/dotnet/visual-basic/"
    },
    {
      t: "Office VBA reference (Microsoft Learn)",
      u: "https://learn.microsoft.com/en-us/office/vba/api/overview/"
    },
    {
      t: "Visual Basic (classic) — Wikipedia",
      u: "https://en.wikipedia.org/wiki/Visual_Basic_(classic)"
    }
  ],
  facts: [
    {
      text: "Visual Basic’s form designer started as a project called Tripod by Alan Cooper, which Microsoft bought and combined with BASIC.",
      src: {
        t: "Visual Basic (classic) — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Visual_Basic_(classic)"
      }
    },
    {
      text: "On Error Resume Next tells VB to ignore errors and carry on — handy, and the cause of countless mysterious bugs.",
      src: {
        t: "On Error statement (Microsoft Learn)",
        u: "https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/on-error-statement"
      }
    },
    {
      text: "Huge numbers of people write VBA in Excel every day without ever calling themselves programmers.",
      src: {
        t: "Visual Basic for Applications — Wikipedia",
        u: "https://en.wikipedia.org/wiki/Visual_Basic_for_Applications"
      }
    }
  ],
  today: {
    status: "Legacy",
    text: "Excel and Access macros (VBA) and older internal business apps."
  },
  learnIf: "you’ll automate spreadsheets in an office or data job."
};

CT.langs["lua"] = {
  id: "lua",
  name: "Lua",
  year: 1993,
  era: "web",
  level: "core",
  creator: "Roberto Ierusalimschy, Luiz Henrique de Figueiredo and Waldemar Celes",
  org: "PUC-Rio, Brazil",
  paradigm: "Multi-paradigm scripting",
  typing: "Dynamic",
  prism: "lua",
  tags: ["games"],
  tagline: "A tiny, fast scripting language built to live inside other programs — especially games.",
  story: [
    "Lua (Portuguese for “moon”) was created in 1993 at the Pontifical Catholic University of Rio de Janeiro. Brazil had trade barriers on imported software at the time, so the team built its own small, portable scripting language.",
    "Lua is designed to be embedded: a C or C++ program includes the Lua interpreter (only a few hundred kilobytes) and lets designers and modders write logic in Lua without recompiling the engine. That made it a favourite of game studios.",
    "World of Warcraft’s user interface and add-ons are Lua. Roblox uses Luau, a faster, typed language derived from Lua that Roblox open-sourced in 2021 — which means millions of young developers are learning a Lua dialect right now."
  ],
  usedBy: [
    {
      who: "Blizzard",
      what: "World of Warcraft UI and the add-ons players write."
    },
    {
      who: "Roblox",
      what: "Luau, Roblox’s Lua-based language, powers every Roblox experience."
    },
    {
      who: "Adobe",
      what: "Large parts of Photoshop Lightroom are written in Lua."
    },
    {
      who: "Indie games",
      what: "The LÖVE framework, Defold engine, Garry’s Mod and many mod systems."
    }
  ],
  know: [
    "Tables are the only data structure: they act as arrays, dictionaries and objects.",
    "Arrays start at index 1.",
    "Variables are global unless you write local — always use local.",
    ".. joins strings; ~= means not equal; # gets the length of a table or string.",
    "The colon syntax obj:method() passes obj as self automatically.",
    "Only nil and false are falsy; 0 and \"\" are true."
  ],
  examples: [
    {
      title: "Tables, methods and loops",
      code: `local player = { name = "Hero", hp = 100, items = {"sword", "potion"} }

function player:takeDamage(amount)
  self.hp = math.max(0, self.hp - amount)
  print(self.name .. " has " .. self.hp .. " HP left")
end

player:takeDamage(30)      -- Hero has 70 HP left

for i, item in ipairs(player.items) do
  print(i, item)            -- 1 sword / 2 potion
end`,
      note: ""
    },
    {
      title: "Roblox Luau: a kill brick",
      code: `local part = script.Parent

part.Touched:Connect(function(hit)
  local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
  if humanoid then
    humanoid.Health = 0
  end
end)`,
      note: ""
    },
    {
      title: "LÖVE: a moving square",
      code: `local x = 0

function love.update(dt)
  x = x + 120 * dt            -- 120 pixels per second, frame-rate independent
end

function love.draw()
  love.graphics.rectangle("fill", x, 100, 40, 40)
end`,
      note: ""
    }
  ],
  quiz: [
    {
      type: "mc",
      q: "Which operator joins strings in Lua?",
      options: ["+", "&", "..", "++"],
      answer: 2,
      explain: "Lua uses .. for concatenation."
    },
    {
      type: "mc",
      q: "What is the first index of a Lua array?",
      options: ["0", "1", "-1", "Any"],
      answer: 1,
      explain: "Lua arrays (sequence tables) start at 1."
    },
    {
      type: "mc",
      q: "Which of these is the “not equal” operator?",
      options: ["!=", "<>", "~=", "=/="],
      answer: 2,
      explain: "Lua uses ~= for not equal."
    },
    {
      type: "mc",
      q: "Which platform uses Luau, a language derived from Lua?",
      options: ["Minecraft", "Roblox", "Unity", "Steam"],
      answer: 1,
      explain: "Roblox built and open-sourced Luau."
    },
    {
      type: "mc",
      q: "Is `0` truthy or falsy in Lua?",
      options: ["Falsy", "Truthy", "An error", "Depends on version"],
      answer: 1,
      explain: "Only nil and false are falsy in Lua."
    },
    {
      type: "mc",
      q: "What happens if you forget `local` in a Lua function?",
      options: [
        "Syntax error",
        "The variable becomes global",
        "Nothing different",
        "It becomes a constant"
      ],
      answer: 1,
      explain: "Accidental globals cause hard-to-find bugs."
    },
    {
      type: "mc",
      q: "Which popular text editor is configured in Lua?",
      options: ["Notepad", "Neovim", "Word", "Xcode"],
      answer: 1,
      explain: "Neovim uses Lua for configuration and plugins."
    }
  ],
  sources: [
    {
      t: "Lua 5.4 Reference Manual",
      u: "https://www.lua.org/manual/5.4/"
    },
    {
      t: "Programming in Lua (first edition, free)",
      u: "https://www.lua.org/pil/"
    },
    {
      t: "Roblox Creator Docs — Luau",
      u: "https://create.roblox.com/docs/luau"
    },
    {
      t: "LÖVE — 2D game framework",
      u: "https://love2d.org/"
    }
  ],
  facts: [
    {
      text: "Lua means “moon” in Portuguese. It followed an earlier language from the same group called SOL — “sun.”",
      src: {
        t: "The evolution of Lua (lua.org history)",
        u: "https://www.lua.org/history.html"
      }
    },
    {
      text: "Lua runs the LuCI web interface of OpenWrt, the open-source firmware on many home routers.",
      src: {
        t: "LuCI (OpenWrt docs)",
        u: "https://openwrt.org/docs/guide-user/luci/start"
      }
    },
    {
      text: "Through Roblox’s Luau, a Lua dialect is many young developers’ very first programming language.",
      src: {
        t: "Luau",
        u: "https://luau.org/"
      }
    }
  ],
  today: {
    status: "Thriving",
    text: "Game scripting (Roblox, WoW add-ons, LÖVE, Defold), embedded scripting and config."
  },
  learnIf: "you want to make Roblox games, mod games, or embed scripting in your own C/C++ engine.",
  ecosystem: [
    {
      name: "LÖVE (Love2D)",
      what: "A simple framework for 2D games."
    },
    {
      name: "Roblox Studio + Luau",
      what: "Build and publish Roblox experiences."
    },
    {
      name: "Defold",
      what: "A free game engine scripted in Lua."
    },
    {
      name: "LuaRocks",
      what: "Lua’s package manager."
    },
    {
      name: "Neovim",
      what: "The text editor is configured and extended with Lua."
    }
  ],
  pitfalls: [
    "Forgetting local and creating accidental global variables.",
    "Off-by-one errors from expecting arrays to start at 0.",
    "Using # on tables with gaps (nil holes) and getting odd lengths.",
    "Confusing . and : when calling methods."
  ],
  roadmap: [
    "Variables, tables and functions.",
    "Loops, ipairs/pairs and string functions.",
    "Metatables and object-style code.",
    "A framework: LÖVE, Roblox Studio or Defold.",
    "Ship a small game."
  ],
  projects: [
    "Pong or Breakout in LÖVE.",
    "An obby (obstacle course) in Roblox.",
    "A World of Warcraft–style UI add-on.",
    "Configure Neovim with Lua."
  ]
};
