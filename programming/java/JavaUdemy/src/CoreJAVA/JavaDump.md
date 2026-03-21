# JAVA DUMP

My all-in-one java notes for quick revision file.

## Keywords:

1. **abstract**
   Used with class or method. Abstract class cannot be instantiated. Abstract method has no body and must be implemented
   by subclass.

2. **static**
   Used with property or method so that it is associated with the class and not an instance.

3. **final**
    - On a variable: value (or reference) cannot be reassigned.
    - On a method: cannot be overridden. JVM skips vTable lookup → faster dispatch.
    - On a class: cannot be subclassed (e.g. `String`).

4. **synchronized**
   Used in concurrency to ensure only one thread executes the block/method at a time. Acquires the monitor lock on the
   object (or class for static methods).

5. **volatile**
   Guarantees visibility of changes across threads. Reads/writes go directly to main memory — not cached in a thread's
   local CPU cache. Does NOT guarantee atomicity (use `AtomicInteger` etc. for that).

6. **transient**
   Marks a field to be skipped during serialization. Useful for sensitive data (passwords) or fields that can be
   recomputed.

7. **instanceof**
   Runtime type check. Returns `true` if an object is an instance of a given class or interface.
   ```java
   if (animal instanceof Dog dog) { dog.bark(); } // pattern matching (Java 16+)
   ```

8. **native**
   Declares a method implemented in native code (C/C++) via JNI (Java Native Interface). No body in Java.

---

## Variable

A variable is a container that holds a value.
DataType variableName = value;

### Java Characteristics:

- **Statically Typed**: Data types must be declared.
- **Strongly Typed**: Data types have strict rules and defined ranges.

### Naming Rules:

- Case-sensitive
- Start with a letter, `$`, or `_`
- Cannot use reserved keywords
- Use `camelCase` for variables and `UPPER_CASE` for constants

### Constant Variables:

Use `static final` to define constants.

---

### 📊 Types of Variables

#### 1. Primitive Types

| Type      | Size    | Range / Notes                                               |
|-----------|---------|-------------------------------------------------------------|
| `char`    | 2 bytes | 0 to 65535. Can use int literals like `char c = 65; // 'A'` |
| `byte`    | 1 byte  | -128 to 127 (2's complement)                                |
| `short`   | 2 bytes | -32,768 to 32,767                                           |
| `int`     | 4 bytes | -2^31 to 2^31-1                                             |
| `long`    | 8 bytes | -2^63 to 2^63-1                                             |
| `float`   | 4 bytes | IEEE 754. Not recommended for precise calcs                 |
| `double`  | 8 bytes | IEEE 754. Use `BigDecimal` for precision                    |
| `boolean` | 1 bit   | `true` or `false`                                           |

#### 2. Reference Types

- Holds reference (address) of actual object in memory.
- Java is **pass-by-value** even for references (value of address is passed).

##### Example:

```java
public static void main(String[] args) {
    Employee emp = new Employee();
    modify(emp);
    System.out.println(emp.empId); // Modified value
}

public static void modify(Employee emp) {
    emp.empId = 20;
}
```

#### Special Reference Types

- **String**
    - Immutable
    - Stored in **String Constant Pool** (if literal)
    - `new String()` creates new object on heap
    - Use `.equals()` to compare content, `==` compares reference

- **Interface**
    - Cannot be instantiated
    - Interface type can hold reference to child class object

- **Array**
    - Fixed-size sequence of elements
    - Example: `int[] arr = new int[5];`
    - 2D Array: `int[][] matrix = new int[5][4];`

#### Wrappers

- Each primitive has a wrapper class: `int` -> `Integer`, `char` -> `Character`
- Stored in heap
- Used in collections
- **Autoboxing**: primitive to wrapper
- **Unboxing**: wrapper to primitive
- ⚠️ Integer cache: `Integer` values from -128 to 127 are cached. `Integer a = 127; Integer b = 127; a == b` is `true`,
  but `a = 128; b = 128; a == b` is `false`. Always use `.equals()`.

#### Static

- Associated with the class (shared), not object
- `static final` = Constant at class level

---

### 📊 IEEE 754 Floating-Point Representation

#### Memory Layout

| Type   | Total Bits | Sign | Exponent (Bias) | Mantissa |
|--------|------------|------|-----------------|----------|
| Float  | 32         | 1    | 8 (bias 127)    | 23 bits  |
| Double | 64         | 1    | 11 (bias 1023)  | 52 bits  |

#### Decimal → IEEE 754 (Float)

##### Example: Convert `4.125` to IEEE 754

1. **Binary Conversion**:
    - Integer: `4` -> `100`
    - Fraction: `0.125` -> `001` (since 0.125 \* 2 = 0.25 \* 2 = 0.5 \* 2 = 1)
    - Combined: `100.001`

2. **Normalization**:
    - Move binary point: `1.00001 x 2^2`

3. **Exponent with Bias**:
    - 2 + 127 = 129 -> `10000001`

4. **Mantissa**:
    - Drop leading 1 -> `00001`
    - Pad to 23 bits -> `00001000000000000000000`

5. **Final Float Format**:
    - Sign: `0`
    - Exponent: `10000001`
    - Mantissa: `00001000000000000000000`
    - Combined: `0 10000001 00001000000000000000000`

#### IEEE 754 → Decimal

##### Example: `0 10000001 00001000000000000000000`

1. **Extract Values**:
    - Sign = 0 (positive)
    - Exponent = 129 - 127 = 2
    - Mantissa = 1.00001 (implicit 1)

2. **Calculate**:
    - `1.00001 x 2^2 = 100.001 = 4.125`

#### Special Cases

- Exponent all 1s:
    - Mantissa = 0 -> Infinity
    - Mantissa != 0 -> NaN

- Exponent all 0s -> Denormals/Subnormals
- Some decimals like 0.7 can't be exactly represented

##### Example: 0.7

- Binary approx: `0.101100110011...`
- Normalized: `1.0110011... x 2^-1`
- Bias: 127 - 1 = 126 → `01111110`
- Mantissa: `01100110011001100110011`
- Final: `0 01111110 01100110011001100110011`

#### Formula

```
Value = (-1)^sign x (1 + mantissa) x 2^(exponent - bias)
```

---

### 📈 Type Conversions

### 1. Widening (Automatic)

- Small type → Larger type
- No data loss
- Example: `int → long`

### 2. Narrowing (Explicit)

- Large type → Smaller type
- Possible data loss
- Needs casting: `(int) myDouble`

### 3. Promotion

- In expressions, smaller types promoted
- `byte + int → int`

### 4. Explicit Casts

- Override promotions
- Example: `int x = (int)(a + b);`

---

### 🔹 Variable Scopes Recap

| Type                  | Scope                 | Notes                         |
|-----------------------|-----------------------|-------------------------------|
| Local Variable        | Inside method/block   | Must be initialized           |
| Member Variable       | Class-level, per obj  | Has default values            |
| Static Variable       | Class-level shared    | Shared across instances       |
| Method Parameter      | Passed to method      | Like local variables          |
| Constructor Parameter | Passed to constructor | Used for initializing objects |

## Methods

- Used to perform certain task.
- Declaration:
  public int sum  (int a, int b){}
    - public: access specifier
    - int: return type
    - sum: name
    - (int a, int b) : method arguments
    - {}: method body

- Access Specifiers:
  private: class only
  <default>: package only
  protected: package + subclass
  public: world

- Return type:
  Void, Primitive/Classname

- Types:

    * System Defined
    * User Defined
    * Overloaded method: More than one method with same name in class. Diffrentiated on basis of `argument`.
    * Overridden method: Sub/child class has same method as parent.
    * Static Method: Access with class. Cant access non-static method or properties. Cant be overridden. Used in
      `Factory Design`.
    * Final Method: Cannot be overridden
    * Abstract Method: Defined only in abstract class. Only method declaration; Child class provide implementation.
    * Variable Argument: Variable number of inputs in parameters. Atleast one argument should be present.

## Constructor

- Used to create an instance/initialise instance variable.
- Similar to method except:
    * Name: Same as class.
    * Return Type: No return type
    * Cant be static, final or abstract, synchronized
- `new` keyword tell java to call constructor.

Queries:

- Same name as class? Easy to identify & no return type as java implicitly adds Class name as return type.
- No return type? - Resolve ambiguity with method having same name & class as return type.
- Not final? - Cant be inherited. No need for override ie final.
- Not abstract? - In abstract, child class must provide implementation. Constructor cant be inherited.
- Not static? - No access t instance variable and wont be able to initialize them.
- Constructor in interface: No, as object cant be created.

Types:

- Default Constructor: Java internally provides constructor when not provided by us.
- No argument constructor
- Parameterized Constructor
- Constructor Overload
- Private Constructor

Constructor Chaining:

- We can call one constructor in other constructor by using this & super().
- super: Parent constructor is always called first and any parameter is passed, if required, then child constructor is
  required.

## Memory Management

Two types of memory:

- Stack
    * Stores temporary variables & separate memory block for methods.
    * Store primitive data types.
    * Store reference of heap objects.
        * Strong Reference:
            * It is when variable in stack is referencing an object in Heap Memory. Until reference exists, we wont be
              able to delete object from Heap memory.
            * Ex: `Person pObj = new Person();`
        * Weak Reference
            * Reference exists to object in heap but as soon as G.C. runs, object is deleted even if some variable is
              referencing this object from stack.
            * Ex: `WeakReference<Person> weakPObj = new WeakReference<Person>(newPerson);`
        * Soft Reference
            * Type of weak reference - Object will be deleted only when there is storage of space in heap. GC is allowed
              to delete soft reference but it'll keep object if sufficient space is there in heap.
    * Each thread has its own stack memory.
    * Variable within SCOPE is only visible.
    * When stack memory go full, throws "java.lang.StackOverflowError"

- Heap
    * Store objects & no order of allocating memory
    * Garbage Collector is used for delete unreferenced objects from heap.
        * Mark & Sweep Algorithm
        * Types of Garbage Collector
            * Single GC
            * Parallel GC
            * G1
            * Concurrent Mark & Sweep (CMS)
    * Heap memory is shared with all threads

## Garbage Collection:

Heap Memory Division

* Young Generation
    * EDEN
    * S0
    * S1
* Old Generation
* MetaSpace (Non Heap) [Prem Gen]
    * Contains:
        * Class Variable
        * Class Metadata (Stores info about class from which objects can be created)
        * Constants

Example:
THRESHOLD AGE = 3

1. Object Creation: (o1->o5)
    * (o1,...o5) are created and moved to EDEN Stage.
    * no reference for o2 & o5.
    * GC Uses Mark & Sweep Algorithm:
        * Marks object with no more references.
        * Sweep:
            * De-referenced are garbage collected and remaining survivor objects to alternate(S0/S1) and add age.
    * Minor GC: GC has run once.Happens periodically and very fast.
2. Objects Creation: (o6, o7)
    * o6 & o7 are created and move to EDEN.
    * No reference for o4 & o7.
    * o4 & o7 are deleted.
3. Objects Creation: (o8, o9)
    * Objects with age >= 3 are moved to Old Generation.

* Major GC: GC in old generation wont run frequently, and objects are too big and references pointed to them and used
  frequently.

! Prior to Java *: Fixed Space aka perma gen which used to store data currently stored in metaspace. It was non
expandable, and gave out of memory error. Metaspace is expandable & different from Heap.

GC Algorithms:

* Mark & Sweep Algorithm
* Mark & Sweep Algorithm with compact memory
  GC runs once, remaining object are put in sequential memory block leaving another sequential block free to put objects
  together.

Versions of GC:

* Serial GC
    * Only one GC thread is working for both minor and major GC.
    * Cons: GC will be slower & expensive due to single thread. Once GC works, appl thread pauses
* Parallel GC
    * Parallel threads running based on CPU configuration.
    * GC works faster, application thread will be in pause state for lesser time.
* Concurrent Mark & Sweep
    * GC will try to run concurrently with application threads, but there is no guarantee. No memory compaction happens.
* G1 Garbage Collection
    * Better version of concurrent mark & sweep in which GC will try not to stop/pause application thread and supports
      memory compaction as well.

Java 8: Parallel GC.
New java versions: CMS & G1 GC.

## Classes

* Concrete Class
    * Class that can create an instance using new `NEW` keyword.
    * All methods in this class have implementation.
    * Can be child from interface or extend abstract class.
    * Class Access Modifier: public, package-private
* Abstract Class
    * Show only important features to users & hide its internal implementation.
    * 2 ways to achieve Abstraction:
        * Abstract Class:
            * Can have both abstract & non-abstract methods.
            * Cant create an instance of this class.
            * Constructor can be created inside them. Super key can be used to parent constructor.
* Sub Class
    * Class that is derived from another class - SubClass
* Super Class
    * Class from which subclass is derived - SuperClass
    * In absence of any explicit SuperClass, every class is implicitly subclass of `Object`.
* Nested Class

## Interfaces

TBA

## Reflections

TBA

## Annotations

Kind of adding META DATA to java code.
Usage is optional.
Can use this metadata info at runtime and can add certain logic if wanted.
How to read metadata information? Using **REFLECTION**
Can be applied anywhere.

## Exception Handling

TBA

## Operators

Operator: What action to perform.
Operand: This indicates items, on which action has to apply on.
Expression: Consist of 1 or more operand an 0 or more operators.

Categories:

- Arithmetic:
- Relational Operator:
- 

## OOPS

Abstraction:

- Hiding internal implementation and shows only essential information.
- Achieved through Abstract Class and Interface.

```Java
Interface Human{

void walk();

void speak();
}

public abstract class Human {
    public abstract void walk();

    public void speak() {
        System.out.println('Human Speaks');
    }
}
```

Encapsulation:

- Bundles data and methods in single unit .
- Data:Private,Methods:Public

```Java

public class Human {
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
```

Inheritance:

- Capability to inerit data and methods from parents.
- "Is-a" instance or relation.
    - Example: Human is mammal. (Human has all features of mammal)
- Single: class B extends A
- Multilevel: class C extends B, class B extends A
- Hierarchical: class B extends A, class C extends A
- Multiple: not supported in Java due to diamond problem. We implement using workaround - Interface

```Java
public class Mammal {
    String hasLungs;
}

public class Human extends Mammal {
    String canSpeak;
}
```

Polymorphism:

- Same method, different behavior
- Static/Compile time polymorphism/Method overloading - Parameter different.
- Dynamic/Run time polymorphism/Method Overriding - same parameter
    - Resolved at runtime by using `vTable` (Virtual Method Table). This is why `final` methods are faster as JVM does
      not look them up in vTable.

```Java
public class Human {
    int doSum(int a, int b) {
        return a + b;
    }

    int doSum(int a, int b, int c) {
        return a + b + c;
    }

    long doSum(long a, long b) {
        return a + b;
    }
}

class A {
    int getEngine() {
        return 1;
    }
}

class B extends A {
    @Override
    int getEngine() {
        return 2;
    }
}
```

### Abstraction vs Interface

A common interview "trap":

- Abstract Class: Use when you want to share state (fields) and base behavior among closely related classes (e.g.,
  BaseService).
- Interface: Use to define a contract (a "can-do" ability) for unrelated classes (e.g., Serializable, Cloneable).

### EXTRA

- Association (Weakest)
    - Technique of creating relationships between classes.
    - Peer-To-Peer. Temporary interaction
    - Ex: Customer "uses a" bank.

- Aggregation (Weak)
    - Weak form of association, where contained class can exist independently of containing class.
    - Containing class is said to have "has a" relationship with contained class.
    - Pros: High Reusability. If the `User` object is garbage collected, `Address` object stays in memory (assuming
      reference exists).
    - Cons: The `User` doesn't "own" address. If address is mutated externally, `User`'s state changes.
    - Example: User "has a" address. You want address it to be loosely coupled and reuse same address across family
      member.

```java
    public class User {
    public final string
            name;
    public final Address
            address;

    public User(string _name, Address _addr) {
        name = _name;
        this.address = _addr;
    }
}

public class Address {
    public final
    int houseNo;
    public final string
            city;
    public final string
            state;

    public Address(int _houseNo, string _city, string _state) {
        houseNo = _houseNo;
        city = _city;
        state = _state;
    }
}
```

- Composition (Strong)
    - Stronger form of association, where one class contains a reference to another class, and the contained class
      cannot exist independently of the containing class.
    - The containing class is said to have a "part-of" relationship with the contained class.
    - Ex: Eye "part of" human. You want eye to be garbage collected when human is released.

```java
    public class Human {
    public final String
            name;
    public final Eye
            eye;

    public User(String _name, int count, String color) {
        name = _name;
        eye = new Eye(count, color);
    }
}

public class Eye {
    public final
    int count;
    public final String
            color;

    public Eye(int _count, String _color) {
        count = _count;
        color = _color;
    }
}
```

- Inheritance (Strongest)
    - Inheritance establishes an "is-a" relationship between the base class and the derived class.
    - Creates tightest possible coupling. Composition favored over Inheritance.
    - Only Inheritance when special version of parent.
    - Example: Human "is a" Mammal. Human inherits mammal.

## Collections

### Introduction

- What?
  Added in Java version 1.2
  Group of Objects
  Present in java.util package.
  Framework provide us architecture to manage these "group of objects".

- Why?
  Prior to JCF, we have Array, Vector, Hash Tables.
  But problem with that is, there is no common interface, so its difficult to remember methods for each.

- Solution:
  Hierarchy of Classes and Interface.

### Hierarchy (corrected)

```
Iterable (root interface)
└── Collection
    ├── List
    │   ├── ArrayList
    │   ├── LinkedList  ← also implements Deque
    │   └── Vector
    │       └── Stack
    ├── Set
    │   ├── HashSet     ← backed by HashMap internally
    │   ├── LinkedHashSet
    │   └── SortedSet
    │       └── NavigableSet
    │           └── TreeSet
    └── Queue
        ├── PriorityQueue
        └── Deque
            └── ArrayDeque

Map (separate root — does NOT extend Collection or Iterable)
├── HashMap
│   └── Hashtable (legacy, synchronized)
├── LinkedHashMap   ← extends HashMap, maintains insertion order
└── SortedMap
    └── NavigableMap
        └── TreeMap
```

> Note: `LinkedHashMap` extends `HashMap` directly. `SortedMap` and `NavigableMap` are separate interface branches
> under `Map`, not children of `LinkedHashMap` (a common misconception).

### Detailed

1. Iterable:
   Interface. Used to TRAVERSE the collection. Added in Java 1.5

- Methods:
    1. iterator()
        - Java 1.5
        - Returns the iterator object, which provides below methods to iterate collection.
            1. hasNext(): returns true, if more elements
            2. next(): returns next element
            3. remove(): removes last element returned by iterator
        - Fail Fast Check using modCount and expectedCount for modification.

    2. forEach()
        - Java 1.8
        - Iterate collection using **Lambda** expression. Lambda expression is called for each element in
          collection.
        - It uses Consumer {Functional Interface} internally with Iterator

2. Collection:
   Interface. Added in Java 1.2

3. Queue
   Interface.

    - PriorityQueue
      Class. Elements ordered by natural ordering or a provided `Comparator`. Head is the smallest element.

        - Comparator
          Interface. External ordering. `compare(a, b)` returns negative/zero/positive.
        - Comparable
          Interface. Natural ordering. Class implements `compareTo(other)`.

    - Deque
      Interface. Double-ended queue — supports insertion/removal at both ends.
        - ArrayDeque
          Resizable array. Faster than `Stack` for stack operations; faster than `LinkedList` for queue operations.

4. List
   Interface. Ordered, allows duplicates, index-based access.

    - ArrayList
      Concrete Class. Backed by a dynamic array. O(1) random access, O(n) insert/delete in middle. Default capacity 10,
      grows by 50% on resize.
    - LinkedList
      Concrete Class. Doubly-linked list. Also implements `Deque`. O(1) insert/delete at ends, O(n) random access.
    - Vector
      Concrete Class. Like ArrayList but synchronized. Legacy — prefer `ArrayList` + external sync or
      `CopyOnWriteArrayList`.
        - Stack
          Concrete Class. Extends Vector. Legacy — prefer `ArrayDeque` as a stack.

5. Map
   Interface.
   Why not inherits from Iterable -> Collection? Because Map stores data in Entry<K,V> format.

   Important concepts:

   **Entry:**
   Nested interface (`Map.Entry<K,V>`) used to get and set key-value, hashCode etc.
   Node structure — hash, key, value, next (forms a linked list within a bucket).

   **Load factor:**
   0 < lf < 1 (default 0.75).
   Once `size >= capacity * loadFactor`, map rehashes with double capacity.
   Higher lf = less memory, more collisions. Lower lf = more memory, fewer collisions.

   **Bucket indexing:**
   `index = (n-1) & hash`

   **Treeify logic:**
   `TREEIFY_THRESHOLD = 8` — if a single bucket gets ≥ 8 entries, the linked list converts to a balanced Red-Black Tree.
   `UNTREEIFY_THRESHOLD = 6` — converts back to linked list after a resize shrinks the bucket.
   `MIN_TREEIFY_CAPACITY = 64` — treeification only happens if the total map capacity is ≥ 64; otherwise the map just
   resizes.

   **Rehashing:**
   All entries are re-inserted into a new backing array of double capacity. O(n) operation. Why it matters for
   performance: if you know the expected size, pass it to the constructor to avoid multiple rehashes.

    - HashMap
      Concrete Class. Not synchronized. Allows one null key and multiple null values. O(1) average get/put.

        - Hashtable
          Legacy synchronized version of HashMap. Does not allow null keys or values. Prefer `ConcurrentHashMap`.

        - LinkedHashMap
          Extends HashMap. Maintains insertion order (or access order if constructed with `accessOrder=true`) by
          maintaining a doubly-linked list through entries (adds `before` and `after` pointers to each node).

    - SortedMap
      Interface. Keys sorted by natural ordering or a `Comparator`. Provides `firstKey()`, `lastKey()`, `headMap()`,
      `tailMap()`.

    - NavigableMap
      Interface. Extends SortedMap. Adds navigation methods: `floorKey()`, `ceilingKey()`, `lowerKey()`, `higherKey()`,
      `descendingMap()`.

        - TreeMap
          Concrete Class. Implements NavigableMap using a Red-Black Tree. O(log n) get/put. Does not allow null keys (
          null values are fine).

6. Set:
   Interface. No duplicates.

    - HashSet
      Backed internally by a `HashMap` (elements are keys, value is a dummy constant).
    - LinkedHashSet
      Backed by `LinkedHashMap`. Maintains insertion order.
    - SortedSet
      Interface. Sorted order.
        - NavigableSet
          Interface. Adds navigation methods similar to NavigableMap.
            - TreeSet
              Backed by `TreeMap`. O(log n) operations.

Concurrent Collections:

| Collection                   | Strategy                                         | Performance                          |
|------------------------------|--------------------------------------------------|--------------------------------------|
| Collections.synchronizedList | Global lock on every method.                     | Poor (high contention)               |
| CopyOnWriteArrayList         | Creates a fresh copy on every write              | Best for high-read/low-write         |
| ConcurrentHashMap            | Uses CAS (Compare-And-Swap) and segment locking. | High performance for multi-threading |

Streams: TBA