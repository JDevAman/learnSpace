# JAVA Basics

## ✅ What is a Variable?

A variable is a container that holds a value. In Java:

```java
DataType variableName = value;
```

### Java Characteristics:

* **Statically Typed**: Data types must be declared.
* **Strongly Typed**: Data types have strict rules and defined ranges.

### Naming Rules:

* Case-sensitive
* Start with a letter, `$`, or `_`
* Cannot use reserved keywords
* Use `camelCase` for variables and `UPPER_CASE` for constants

### Constant Variables:

Use `static final` to define constants.

---

## 📊 Types of Variables

### 1. Primitive Types

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

### 2. Reference Types

* Holds reference (address) of actual object in memory.
* Java is **pass-by-value** even for references (value of address is passed).

#### Example:

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

### Special Reference Types

* **String**

    * Immutable
    * Stored in **String Constant Pool** (if literal)
    * `new String()` creates new object on heap
    * Use `.equals()` to compare content, `==` compares reference

* **Interface**

    * Cannot be instantiated
    * Interface type can hold reference to child class object

* **Array**

    * Fixed-size sequence of elements
    * Example: `int[] arr = new int[5];`
    * 2D Array: `int[][] matrix = new int[5][4];`

### Wrappers

* Each primitive has a wrapper class: `int` -> `Integer`, `char` -> `Character`
* Stored in heap
* Used in collections
* **Autoboxing**: primitive to wrapper
* **Unboxing**: wrapper to primitive

### Static

* Associated with the class (shared), not object
* `static final` = Constant at class level

---

## 📊 IEEE 754 Floating-Point Representation

### Memory Layout

| Type   | Total Bits | Sign | Exponent (Bias) | Mantissa |
|--------|------------|------|-----------------|----------|
| Float  | 32         | 1    | 8 (bias 127)    | 23 bits  |
| Double | 64         | 1    | 11 (bias 1023)  | 52 bits  |

### Decimal → IEEE 754 (Float)

#### Example: Convert `4.125` to IEEE 754

1. **Binary Conversion**:

    * Integer: `4` -> `100`
    * Fraction: `0.125` -> `001` (since 0.125 \* 2 = 0.25 \* 2 = 0.5 \* 2 = 1)
    * Combined: `100.001`

2. **Normalization**:

    * Move binary point: `1.00001 x 2^2`

3. **Exponent with Bias**:

    * 2 + 127 = 129 -> `10000001`

4. **Mantissa**:

    * Drop leading 1 -> `00001`
    * Pad to 23 bits -> `00001000000000000000000`

5. **Final Float Format**:

    * Sign: `0`
    * Exponent: `10000001`
    * Mantissa: `00001000000000000000000`
    * Combined: `0 10000001 00001000000000000000000`

### IEEE 754 → Decimal

#### Example: `0 10000001 00001000000000000000000`

1. **Extract Values**:

    * Sign = 0 (positive)
    * Exponent = 129 - 127 = 2
    * Mantissa = 1.00001 (implicit 1)

2. **Calculate**:

    * `1.00001 x 2^2 = 100.001 = 4.125`

### Special Cases

* Exponent all 1s:

    * Mantissa = 0 -> Infinity
    * Mantissa != 0 -> NaN
* Exponent all 0s -> Denormals/Subnormals
* Some decimals like 0.7 can't be exactly represented

#### Example: 0.7

* Binary approx: `0.101100110011...`
* Normalized: `1.0110011... x 2^-1`
* Bias: 127 - 1 = 126 → `01111110`
* Mantissa: `01100110011001100110011`
* Final: `0 01111110 01100110011001100110011`

### Formula

```
Value = (-1)^sign x (1 + mantissa) x 2^(exponent - bias)
```

---

## 📈 Type Conversions

### 1. Widening (Automatic)

* Small type → Larger type
* No data loss
* Example: `int → long`

### 2. Narrowing (Explicit)

* Large type → Smaller type
* Possible data loss
* Needs casting: `(int) myDouble`

### 3. Promotion

* In expressions, smaller types promoted
* `byte + int → int`

### 4. Explicit Casts

* Override promotions
* Example: `int x = (int)(a + b);`

---

### 🔹 Variable Scopes Recap

| Type                  | Scope                 | Notes                         |
|-----------------------|-----------------------|-------------------------------|
| Local Variable        | Inside method/block   | Must be initialized           |
| Member Variable       | Class-level, per obj  | Has default values            |
| Static Variable       | Class-level shared    | Shared across instances       |
| Method Parameter      | Passed to method      | Like local variables          |
| Constructor Parameter | Passed to constructor | Used for initializing objects |

---

## Methods