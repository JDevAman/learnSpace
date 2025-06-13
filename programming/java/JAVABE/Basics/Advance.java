import java.util.*;

public class Advance {
    public static void main(String[] args) {
        System.out.println("Advance Java");

        // Creating a List and adding elements
        List<Integer> arr = new ArrayList<>();
        arr.add(1);
        arr.add(2);
        arr.add(3);
        arr.add(4);

        // Iterating through the list using an enhanced for-loop
        for (Integer num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();

        // Creating a HashMap to store scores
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Aman", 80);
        scores.put("Simmi", 95);
        scores.put("Nitesh", 90);

        // Iterating through the HashMap using Map.Entry
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " --> " + entry.getValue());
        }

        // Using Optional to avoid NullPointerException
        Optional<Integer> marks = Optional.ofNullable(scores.get("Rohit"));
        // Use orElse() to provide a default value if marks is empty
        int value = marks.orElse(-1);
        if (value > 0) {
            System.out.println("Present");
        } else {
            System.out.println("Not Present");
        }
    }
}
