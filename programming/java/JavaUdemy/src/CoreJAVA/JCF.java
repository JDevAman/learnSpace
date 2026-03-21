package CoreJAVA;

import java.util.*;

public class JCF {
    public static void main(String[] args) {
        // Iterable Interface
        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

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

        // Collection Interface
        System.out.println("Size " + nums.size());
        System.out.println("Is Empty " + nums.isEmpty());
        System.out.println("Contains " + nums.contains(6));
        System.out.println("Remove by index " + nums.remove(4));
        System.out.println("Remove by Obj value " + nums.remove(Integer.valueOf(4)));
        nums.add(6);
        Stack<Integer> st = new Stack<>();
        st.add(7);
        st.add(8);
        System.out.println("Add All " + nums.addAll(st));
        System.out.println("Contains All " + nums.containsAll(st));
        // Collections - Utility Class
        Collections.sort(nums);
        nums.forEach((Integer val) -> System.out.print(val + " "));
        System.out.println("\nMin " + Collections.min(nums));

        // Queue Interface
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        System.out.println("Add " + minHeap.add(5));
        System.out.println("Offer " + minHeap.offer(2));
        minHeap.add(8);
        minHeap.add(1);
        System.out.println("Remove " + minHeap.remove());
        System.out.println("Top Element " + minHeap.peek());
        minHeap.forEach((Integer val) -> System.out.print(val + " "));
        System.out.println();

        // Comparator
        Integer[] arr = {12, 3, 9, 7, 10};
        Arrays.sort(arr, (Integer a, Integer b) -> a - b);
        for (Integer a : arr) {
            System.out.println(a + " ");
        }

        List<Student> record = new ArrayList<>();
        record.add(new Student(2, 12, "Patna"));
        record.add(new Student(1, 11, "Kolkata"));
        record.add(new Student(4, 13, "Hyderabad"));
        Collections.sort(record, (Student s1, Student s2) -> s1.getRollNumber() - s2.getRollNumber());
        for (Student s : record) {
            System.out.println(s.getRollNumber() + ".." + s.getAddress());
        }

        // Comparable
        Collections.sort(record);
        System.out.println("Comparable");
        for (Student s : record) {
            System.out.println(s.getRollNumber() + ".." + s.getAddress());
        }

        //Priority Queue

        // Deque Interface
        // Array Deque
        System.out.println("Deque Interface");
        Deque<Integer> dq = new ArrayDeque<>();
        dq.addFirst(-1);
        ;
        dq.addFirst(-2);
        dq.addLast(1);
        System.out.println("Get First " + dq.peekFirst());
        System.out.println("Remove Last " + dq.pollLast());

        // List
        // ArrayList
        System.out.println("List Interface");
        List<Integer> nums1 = new ArrayList<>();
        nums1.add(0, 100);
        nums1.add(1, 200);
        nums1.add(2, 300);

        List<Integer> nums2 = nums1.subList(0, 2);
        ListIterator<Integer> itr = nums2.listIterator();
        while (itr.hasNext()) {
            int val = itr.next();
            System.out.println("Will fail after add " + val);
            if (val == 200) {
                // Throws an error as modCount is changed.
//                nums2.add(400);
//                System.out.println("Executes, Next Iterator call will throw error");
                // Try using ListIterator
                itr.add(400);
            }
        }

        for (Integer val : nums1) {
            System.out.println("Value " + val);
        }

        //LinkedList
        LinkedList<Integer> sList = new LinkedList<>();
        sList.addLast(900);
        sList.addFirst(800);
        sList.addFirst(700);

        ListIterator<Integer> slItr = sList.listIterator();
        while(slItr.hasNext()){
            int val = slItr.next();
            System.out.println("Val "+ val);
        }

        // Vector
        System.out.println("Vector - Thread safe arraylist");
        Vector<String> vec = new Vector<>();
        vec.add("Thread");
        vec.add("Safe");
        System.out.println("Get: " +vec.elementAt(1));


        System.out.println("Stack - Thread safe LIFO Structure");
        Stack<String> stk = new Stack<>();
        stk.add("Last");
        stk.addLast("Added");
    }

    // Map
    Map<Integer, String> mpp = new HashMap<>();
}
