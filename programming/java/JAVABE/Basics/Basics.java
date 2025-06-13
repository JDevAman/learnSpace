import java.util.*;

public class Basics {
    public static void main(String[] args) {
        // Static - Belongs to the class, not an instance
        // Void - No return value
        // Public - Accessible everywhere
        // Data Types:
        // 1️⃣ **Primitives** (Stored in Stack, automatic memory management)
        //    - byte, short, int, long, float, double, char, boolean
        // 2️⃣ **Wrapper Classes** (Objects stored in Heap, manual GC)
        //    - Byte, Short, Integer, Long, Float, Double, Character, Boolean
        // 3️⃣ **Reference Types** (Heap memory, manual garbage collection)
        //    - Objects, Arrays, Strings, Classes, Interfaces

        // Sample CP Task: Input, Sort, Print
        System.out.print("Enter Number:\t");
        Scanner sc = new Scanner(System.in);
        ArrayList<Integer> nums = new ArrayList<>();

        int t = sc.nextInt();
        while (t-- > 0) {
            int x = sc.nextInt();
            nums.add(x);
        }

        // Sorting
        Collections.sort(nums);
        // Printing elements
        System.out.print("Sorted Nums:\n");
        for (int num : nums) {
            System.out.print(num + " ");
        }
        // Prefix, Postfix
        int i = 69;
        System.out.println("\nSort:");
        System.out.print(i + "\t");
        System.out.print(i++ + "\t");
        System.out.print(++i + "\t");
        sc.close();
    }
}
