# TypeScript Complete Notes

## Introduction

TypeScript is a strongly typed programming language that builds on JavaScript by adding static type definitions. It's a syntactical superset of JavaScript developed by Microsoft and is fully backwards compatible with JavaScript.

### How TypeScript Code Runs

- TypeScript code never runs directly in browsers or Node.js
- It must be **transpiled** (compiled) to JavaScript first
- **Transpilation**: Performs compile-time type checks to catch errors before runtime
- Errors are caught during transpilation; only the resulting JavaScript code runs

### Compilers

- **tsc** (TypeScript Compiler - official)
- **esbuild** (fast bundler with TS support)
- **swc** (Speedy Web Compiler)
- **Babel** (with TypeScript preset)

---

## Getting Started

### Project Setup

```bash
# Initialize project
pnpm init

# Install TypeScript
pnpm add -D typescript
pnpm add -D @types/node  # For Node.js types

# Generate tsconfig.json
pnpm exec tsc --init

# Compile TypeScript files
pnpm exec tsc

# Build using tsconfig settings
tsc -b   # if TypeScript is installed globally
```

### Development Setup with ts-node

```bash
# Install development dependencies
pnpm add -D ts-node-dev nodemon

# Add to package.json scripts
```

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## Basic Types

### Primitive Types

```ts
// Number
let age: number = 25;
let price: number = 99.99;

// String
let name: string = "John Doe";
let message: string = `Hello, ${name}!`;

// Boolean
let isStudent: boolean = true;
let isComplete: boolean = false;

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// Any (avoid using when possible)
let anything: any = 42;
anything = "now I'm a string";
anything = true;
```

### Array Types

```ts
// Array of numbers
let numbers: number[] = [1, 2, 3, 4, 5];
let scores: Array<number> = [95, 87, 92];

// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];

// Mixed array (using union types)
let mixed: (string | number)[] = ["hello", 42, "world"];
```

### Array Methods with Type Safety

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

// Filter method maintains type safety
const evenNumbers: number[] = numbers.filter(num => num % 2 === 0);

// Map method can change types
const stringNumbers: string[] = numbers.map(num => num.toString());

// Find method returns T | undefined
const found: number | undefined = numbers.find(num => num > 3);
```

---

## Functions

### Function Type Annotations

```ts
// Basic function with parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Function with no return value
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

// Optional parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// Default parameters
function multiply(a: number, b: number = 1): number {
  return a * b;
}
```

### Function Types

```ts
// Function type definition
type MathOperation = (x: number, y: number) => number;

// Using the function type
const subtract: MathOperation = (a, b) => a - b;

// Callback function types
function processArray(arr: number[], callback: (item: number) => number): number[] {
  return arr.map(callback);
}

// Usage
const doubled = processArray([1, 2, 3], (x) => x * 2);
```

---

## Advanced Types

### Unions

Unions allow a variable to be one of several types:

```ts
type StringOrNumber = string | number;

function formatId(id: StringOrNumber): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}

// Usage
formatId("abc123");  // string
formatId(123);       // number
```

### Intersections

Intersections combine multiple types into one:

```ts
type Name = {
  firstName: string;
  lastName: string;
};

type Contact = {
  email: string;
  phone: string;
};

type Person = Name & Contact;

const person: Person = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "123-456-7890"
};
```

---

## Interfaces vs Types

### Interface

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// Extending interfaces
interface Admin extends User {
  permissions: string[];
}

// Interface merging (declaration merging)
interface User {
  createdAt: Date;  // This gets merged with the above User interface
}
```

### Type

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};

// Extending types using intersections
type DigitalProduct = Product & {
  downloadUrl: string;
};

// Union types (not possible with interfaces)
type Status = "pending" | "approved" | "rejected";
```

### When to Use Which

**Use `interface` when:**
- Defining object shapes or class contracts
- You need declaration merging
- Working with object-oriented patterns
- Creating extensible APIs

**Use `type` when:**
- Creating union types
- Using intersections
- Defining primitive aliases
- Working with computed or conditional types

---

## Generics

Generics provide a way to create reusable components that work with multiple types:

```ts
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage - type is inferred
const stringResult = identity("hello");     // string
const numberResult = identity(42);          // number

// Array generic function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstString = getFirstElement(["a", "b", "c"]);  // string | undefined
const firstNumber = getFirstElement([1, 2, 3]);        // number | undefined

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success"
};
```

### Generic Constraints

```ts
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know arg has a .length property
  return arg;
}

logLength("hello");        // ✅ string has length
logLength([1, 2, 3]);      // ✅ array has length
// logLength(42);          // ❌ number doesn't have length
```

---

## Enums

Enums allow you to define a set of named constants:

```ts
// Numeric enum (default)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

// String enum
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

// Mixed enum
enum Response {
  No = 0,
  Yes = 1,
  Maybe = "MAYBE"
}

// Usage
function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
  }
}

move(Direction.Up);
```

### Enum Alternatives

```ts
// Using const assertion (more tree-shakable)
const Direction = {
  Up: 'UP',
  Down: 'DOWN',
  Left: 'LEFT',
  Right: 'RIGHT'
} as const;

type Direction = typeof Direction[keyof typeof Direction];

// Or using union types
type Status = "pending" | "approved" | "rejected";
```

---

## Imports and Exports

TypeScript follows the ES6 module system:

```ts
// types.ts - Named exports
export interface User {
  id: number;
  name: string;
}

export type Status = "active" | "inactive";

export const DEFAULT_TIMEOUT = 5000;

// utils.ts - Default export
export default function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// main.ts - Importing
import formatDate from './utils';           // Default import
import { User, Status } from './types';     // Named imports
import { DEFAULT_TIMEOUT as TIMEOUT } from './types';  // Renamed import

// Type-only imports (TypeScript specific)
import type { User as UserType } from './types';

// Mixed imports
import formatDate, { User } from './utils';

// Re-exports
export { User, Status } from './types';
export { default as formatDate } from './utils';
```

---

## TypeScript Configuration (tsconfig.json)

### Essential Options

```json
{
  "compilerOptions": {
    "target": "ES2020",                    // JavaScript version to compile to
    "module": "commonjs",                  // Module system
    "lib": ["ES2020", "DOM"],             // Type definitions to include
    "outDir": "./dist",                   // Output directory
    "rootDir": "./src",                   // Input directory
    "strict": true,                       // Enable all strict type-checking options
    "noImplicitAny": true,               // Error on expressions with implied 'any'
    "strictNullChecks": true,            // Enable strict null checks
    "strictFunctionTypes": true,         // Enable strict checking of function types
    "noImplicitReturns": true,           // Error when not all code paths return a value
    "noUnusedLocals": true,              // Error on unused local variables
    "noUnusedParameters": true,          // Error on unused parameters
    "removeComments": true,              // Remove comments from output
    "sourceMap": true,                   // Generate source maps
    "declaration": true,                 // Generate .d.ts files
    "esModuleInterop": true,             // Enable interoperability between CommonJS and ES modules
    "skipLibCheck": true,                // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Best Practices

1. **Enable strict mode** in tsconfig.json
2. **Avoid `any`** - use `unknown` instead when type is truly unknown
3. **Use type assertions carefully** - prefer type guards
4. **Prefer interfaces for object shapes** and types for unions
5. **Use meaningful names** for generic type parameters
6. **Leverage type inference** - don't over-annotate
7. **Use const assertions** for immutable data
8. **Organize types** in separate files when they become complex

### Type Guards

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  }
}
```

### Utility Types

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Pick specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Omit specific properties
type UserWithoutAge = Omit<User, 'age'>;

// Create type from object keys
type UserKeys = keyof User;  // "id" | "name" | "email" | "age"
```