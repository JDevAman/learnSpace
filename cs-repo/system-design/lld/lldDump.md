# LLD

Resources:

- `CodeWithAryan`
- Gaurav Sen
- DDIA

## Introduction to LLD

### 1. LLD

- LLD Is detailed phase in softwware development that focuses on designing individual components outlined in `HLD`.
  Defines hwo modules, classes, functions and data strctures interact with each other to achieve functionality.
- Example: Movie Ticket Booking System
  - LLD would detail how components like seat selection, payment processing, and ticket generation are implemented and interact with one another.
  - Class Diagram: ![Class Diagram](image.png)

## Object Oriented Programming

Abstraction:

- Hiding internal implementation and shows only essential information.
- Achieved through Abstract Class and Interface.

`Java
Interface Human{
    void walk();
    void speak();
}`

`Java
public abstract class Human{
    public abstract void walk();
    public void speak(){
        System.out.println('Human Speaks');
    }
}`

Encapsulation:

- Bundles data and methods in single unit.
- Data: Private, Methods: Public

`Java
public class Human{
    private String name;
    public void setName(String name){
        this.name = name;    
    }
    public String getName(){
        return this.name;
    }
}
`

Inheritance:

- Capability to inerit data and methods from parents.
- Single: class B extends A
- Multilevel: class C extends B, class B extends A
- Hierarchical: class B extends A, class C extends A
- Multiple: not supported in Java due to diamond problem. We implement using workaround - Interface

`Java
public class Mammal{
    String hasLungs;
}
public class Human extends Mammal{
    String canSpeak;
}
`

Polymorphism:

- Same method, different behavior
- Static/Compile time polymorphism/Method overloading - Parameter different.
- Dynamic/Run time polymorphism/Method Overriding - same parameter

`Java
public class Human{
    int doSum(int a, int b){ return a+b; }
    int doSum(int a, int b, int c){ return a+b+c; }
    long doSum(long a, long b){ return a+b; }
}
`
`Java
class A{
    int getEngine(){ return 1;}
}
class B extends A {
    @Override
    int getEngine(){
        return 2;
    }
}
`

## SOLID

## Design Pattern
