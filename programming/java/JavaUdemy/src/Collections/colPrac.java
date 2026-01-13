package Collections;
import java.util.*;

public class colPrac {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);

        // First Way - Enhanced For Loop
        System.out.println("First Way");
        for (int num : nums) {
            System.out.println(num);
        }

        // Second Way - Using forEach and Lambda
        System.out.println("Second Way");
        nums.forEach((num) -> System.out.println(num));

        // Third Way - Using Iterator
        System.out.println("Third Way");
        Iterator<Integer> iterator = nums.iterator();
        while (iterator.hasNext()) {
            int num = iterator.next();
            System.out.println(num);
            // iterator.remove(); // For removing elements
        }
    }
}
