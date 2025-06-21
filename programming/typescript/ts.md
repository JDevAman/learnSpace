# TypeScript

## Introduction

- TypeScript is a strongly typed language, a syntactical superset of JavaScript developed by Microsoft.
- TS is backwards compatible.

### How TS Code Runs

- TS code never runs directly. It is **transpiled** to a JS file.
- **Transpilation**: compile-time type checks to catch errors.
- Errors are caught during transpilation; the resulting JS is what runs.

### Compiler

- `tsc` (official), `eslint`, `swc`

---

## Getting Started

### Starter Template

```bash
pnpm init
pnpm add typescript

# generate tsconfig
pnpm exec tsc --init

# compile
pnpm exec tsc

# build (using tsconfig)
tsc -b   # if installed globally
```

### ts-node-dev for Development with node-ts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
}
```

---

## Basic Types in TypeScript

1. **Number**
   ```ts
   let age: number = 5;
   ```

2. **String**
   ```ts
   let name: string = "Aman";
   ```

3. **Boolean**
   ```ts
   let isStudent: boolean = false;
   ```

4. **Null**
   ```ts
   let myVar: null = null;
   ```

5. **Undefined**
   ```ts
   let myVar: undefined = undefined;
   ```

---

## Code Implementation

### 1. Passing Arguments to Function

**Callback:**
```ts
fn: () => void
```

### 2. Defining Return Type of Function

**Callback:**
```ts
fn: () => void
```

---

## tsconfig.json

Important options:

1. `target`
2. `rootDir`
3. `outDir`
4. `noImplicitAny`
5. `removeComments`

---

## Interface

```ts
interface Person {
  name: string;
  age: number;
}
```

---

## Type

```ts
type User = {
  name: string;
  age: number;
};
```

---

## Features

1. **Unions**
   Unions allow you to define a type that can be one of several types.

2. **Intersections**
   Intersections allow you to create a type that has every property of multiple types or interfaces.

---

## Interface vs Type

### Major Differences

1. **Declaration Syntax**

   **Type**
   - Uses the `type` keyword.
   - More flexible syntax: can represent primitive types, unions, intersections, and more.

   **Interface**
   - Uses the `interface` keyword.
   - Typically used for defining the structure of objects.

2. **Extension and Merging**

   **Type**
   - Supports extending types.
   - Can't be merged — redefining a type with the same name replaces the previous one.

   **Interface**
   - Supports extending interfaces using the `extends` keyword.
   - Automatically merges with same-name interfaces by combining their declarations.

3. **Declaration vs Implementation**

   **Type**
   - Can represent any type: primitives, unions, intersections, etc.
   - Suitable for describing the shape of data.

   **Interface**
   - Mainly used for describing object shapes.
   - Can define contracts for classes.

---

### Other Differences

**Type Overriding**
- Types cannot be overridden or merged.
- Redefining a type with the same name replaces it.
- Interfaces **automatically merge** when declared with the same name.

**Object Literal Strictness**
- Types are **more lenient** when dealing with object literal assignments.
- Interfaces enforce **strict object shapes**.

**Implementation for Classes**
- Interfaces are used to define contracts for class implementations.
- Types are more versatile for complex or utility types.

---

### When to Use Which

**Use `type`**:
- For advanced scenarios with unions, intersections, or mapped types.
- When dealing with primitive types, tuples, or non-object types.
- For creating utility types using conditional types.

**Use `interface`**:
- When defining object structure or class contracts.
- When extending or merging interfaces.
- For consistent and strict object shapes.

## Arrays
Arrays in TS - filter method

## Generics

## Enums
Enumeration - set of named constants
human-readable way to represent set of constant values.
Concept used across different languages. (not keyword in js)

Alternative: 
define using type.

Example: Game - predefined inputs/operation

```ts
  enum Direction{
    Left, Right, Up, Down
  }
```

Pros: Human Readable, Suggestion

## Import


## Export