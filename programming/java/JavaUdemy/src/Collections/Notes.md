# JAVA Collections Framework

- Added in Java version 1.2
- Collections is group of Objects.
- Present in java.util.package.
- Framework provide us architecture to manage these "group of objects" i.e. add, update, delete, search etc.

## Why JCF?

- Prior to JCF, we have Array, Vector, HashTables.
- But problem: no common interface, so difficult to remember methods for each.

# JCF Hierarchy

- Consists of Interface and Concrete Classes.

```
- Iterable (Int.)
   └─ Collection (Int.)
      ├── List (Int.)
      │    ├── ArrayList (CC.)
      │    ├── LinkedList (CC.)
      │    └── Vector (CC.)
      │         └── Stack (CC.)
      ├── Set (Int.)
      │    ├── HashSet (CC.)
      │    ├── LinkedHashSet (CC.)
      │    └── SortedSet (Int.)
      │        └── Navigable Set (Int.)
      │             └──TreeSet (CC.)
      └── Queue (Int.)
           ├── PriorityQueue (CC.)
           └── Deque (Int.)
                ├── ArrayDeque (CC.)
                └── LinkedList (CC.)
    
        Map (Int.)
        ├── HashMap (CC.)
        ├── LinkedHashMap (CC.)
        ├── TreeMap (CC.)
        └── Hashtable (CC.)

- └ means extends b/w similar and Implements b/w different.
```

1. Iterable:
    - Used to TRAVERSE the collection.
        - Methods:
            1. iterator()

                - Returns the iterator object, which provides below methods to iterate collection.
                    1. hasNext(): returns true, if more elements
                    2. next(): returns next element
                    3. remove(): removes last element returned by iterator

            2. forEach()
                - Iterate collection using **Lambda** expression. Lambda expression is called for each element in
                  collection.