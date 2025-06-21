// ========================================
// TYPESCRIPT LEARNING EXAMPLES
// ========================================

// ========================================
// 1. BASIC SETUP & TYPES
// ========================================

const num: number = 1;
console.log(num);

// ========================================
// 2. TYPE vs INTERFACE
// ========================================

// Type Definition
type User = {
    name: string;
    age: number;
}

// Interface Definition
interface Person {
    name: string;
    age: number;
}

// ========================================
// 3. FUNCTION TYPES & CALLBACKS
// ========================================

// Function with typed parameters and return type
function greet(user: User): void {
    console.log('Hi, My name is', user.name);
}

// Function accepting callback as parameter
function delayedCall(fn: () => void, delay: number): void {
    setTimeout(fn, delay);
}

// ❌ Wrong - Function is being invoked instead of passed
// delayedCall(greet({ name: "Aman", age: 23 }), 5000);

// ✅ Correct - Passing function as callback
delayedCall(() => greet({ name: "Aman", age: 23 }), 5000);

// ========================================
// 4. ADVANCED TYPES
// ========================================

// --- INTERSECTION TYPES ---
type Employee = {
    name: string;
    startDate: Date;
};

type Manager = {
    name: string;
    department: string;
};

// Combining types with intersection (&)
type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
    name: "Harkirat",
    startDate: new Date(),
    department: "Software Developer"
};

// --- UNION TYPES ---
type StringOrNumber = string | number;

function printId(id: StringOrNumber): void {
    console.log(`ID: ${id}`);
}

printId(101);       // number
printId("ABC123");  // string

// ========================================
// 5. ENUMS
// ========================================

enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}

function handleKeyPress(keyPressed: Direction): void {
    console.log(`Moving ${keyPressed}`);
}

handleKeyPress(Direction.Down);
handleKeyPress(Direction.Left);

// ========================================
// 6. GENERICS
// ========================================

// --- Problem: Type Safety with Arrays ---

// ❌ Without Generics - Loses type information
type Input = number | string;
// function firstEl(arr: Input[]) {
//     return arr[0]; // Returns Input type (not specific)
// }

// ✅ With Generics - Preserves type information
function firstEl<T>(arr: T[]): T {
    return arr[0];
}

// Type is inferred as string
const stringVal = firstEl(['harkirat', 'singh']);
console.log(stringVal.toUpperCase()); // ✅ Works - knows it's string

// Type is inferred as number
const numberVal = firstEl([1, 2, 3]);
console.log(numberVal.toFixed(2)); // ✅ Works - knows it's number

// --- Generic Function Examples ---
function identity<T>(arg: T): T {
    return arg;
}

const stringOutput = identity<string>("myString");
const numberOutput = identity<number>(42);

console.log(stringOutput.toUpperCase()); // ✅ String methods available
console.log(numberOutput.toFixed(2));    // ✅ Number methods available

// --- Multiple Type Parameters ---
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result = pair<string, number>("hello", 123);
console.log(result); // ["hello", 123]

// ========================================
// 7. GENERIC CONSTRAINTS
// ========================================

// Constraining generics to have certain properties
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // ✅ Now we know arg has length property
    return arg;
}

logLength("Hello");     // ✅ String has length
logLength([1, 2, 3]);   // ✅ Array has length
// logLength(123);      // ❌ Error: number doesn't have length

// ========================================
// 8. UTILITY TYPES (Common Examples)
// ========================================

// Partial - Makes all properties optional
type PartialUser = Partial<User>;
const updateUser: PartialUser = { name: "John" }; // age is optional

// Pick - Select specific properties
type UserName = Pick<User, 'name'>;
const userName: UserName = { name: "Alice" };

// Omit - Exclude specific properties  
type UserWithoutAge = Omit<User, 'age'>;
const userNoAge: UserWithoutAge = { name: "Bob" };

// ========================================
// 9. IMPORT/EXPORT PATTERNS
// ========================================

// ES6 Module System (TypeScript follows this)

// Named exports/imports:
// export { User, Person, greet };
// import { User, Person, greet } from './types';

// Default export/import:
// export default function main() { ... }
// import main from './main';

// Mixed:
// export { User }; export default greet;
// import greet, { User } from './utils';

// Type-only imports (TypeScript specific):
// import type { User } from './types';

// ========================================
// 10. BEST PRACTICES SUMMARY
// ========================================

/*
1. Use interfaces for object shapes and class contracts
2. Use types for unions, intersections, and complex types
3. Prefer type inference over explicit typing when possible
4. Use generics for reusable, type-safe functions
5. Use utility types to transform existing types
6. Always define function parameter and return types
7. Use enums for a fixed set of constants
8. Leverage union types for flexible but controlled inputs
*/