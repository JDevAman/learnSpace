import java.io.*;
import java.util.*;

public class Sorting {
    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try { st = new StringTokenizer(br.readLine()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            return st.nextToken();
        }

        int nextInt() { return Integer.parseInt(next()); }
        long nextLong() { return Long.parseLong(next()); }
        double nextDouble() { return Double.parseDouble(next()); }
    }

    public static void main(String[] args) {
        // Checking if online_judge
        if (System.getProperty("ONLINE_JUDGE") == null) {
            try {
                System.setIn(new FileInputStream("inputf.in"));
                System.setOut(new PrintStream(new FileOutputStream("outputf.out")));
            } catch (Exception e) {
                // Files not found? No problem, it will use standard I/O
            }
        }

        FastReader fr = new FastReader();
        PrintWriter out = new PrintWriter(System.out);

        // Handle t test cases.
        int t = fr.nextInt();
        while (t-- > 0) {
            solve(fr, out);
        }

        out.flush();
        out.close();
    }

    static void mergeSort(int low, int high, List<Integer> nums){
        if(low >= high) return;
        int mid = low + (high-low)/2;

        mergeSort(low, mid, nums);
        mergeSort(mid+1, high, nums);
        merge(low, mid, high, nums);
    }

    static void merge(int low, int mid, int high, List<Integer> nums){
        int[] b = new int[high+1];

        int i=low, j=mid+1, curr=low;
        while(i <= mid && j <= high){
            if(nums.get(i) <= nums.get(j)){
                b[curr] = nums.get(i);
                i++;
            }
            else{ b[curr] = nums.get(j); j++; }
            curr++;
        }

        while(i <= mid){
            b[curr] = nums.get(i);
            i++;curr++;
        }

        while(j <= high){
            b[curr] = nums.get(j);
            j++;curr++;
        }

        for(int k=low; k<=high; k++){
            nums.set(k, b[k]);
        }
    }

    static void solve(FastReader fr, PrintWriter out) {
        int n = fr.nextInt();
        List<Integer> nums = new ArrayList<>();
        for(int i=0; i<n; i++){
            nums.add(fr.nextInt());
        }

        out.println("Before Sorting: ");
        for(Integer num: nums){
            out.print(num+" ");
        }

        // Bubble Sort:
        // Idea: N - 1 Rounds, Max Element at N th Place.
        // Stable | BC: O(n), WC: O(n^2)
        // Ex: 5 2 3 4
        // for(int pass=1; pass<n; pass++){
        //     int flag = 0;
        //     for(int idx=0; idx<n-pass; idx++){
        //         if(nums.get(idx) > nums.get(idx+1)){
        //             int temp = nums.get(idx);
        //             nums.set(idx, nums.get(idx+1));
        //             nums.set(idx+1, temp);
        //             flag = 1;
        //         }
        //     }
        //     if(flag == 0) break;
        // }

        // Selection Sort:
        // Idea: N-1 Rounds, Swap min element in ith pass with ith index.
        // Unstable | BC: O(n^2), WC: O(n^2)
        // Ex: 10, 10, 3
        // for(int pass=1; pass<n; pass++){
        //     int minIdx=pass-1;
        //     for(int idx=pass; idx<n; idx++){
        //         if(nums.get(idx) < nums.get(minIdx)){
        //             minIdx =  idx;
        //         }
        //     }
        //     int temp = nums.get(pass-1);
        //     nums.set(pass-1, nums.get(minIdx));
        //     nums.set(minIdx, temp);
        // }

        // Insertion Sort:
        // Sorted | Unsorted: Put unsorted element at is correct place.
        // Stable | BC: O() , WC: O()
        // for(int j=1; j<n; j++){
        //     int key = nums.get(j);
        //     int idx = j-1;

        //     while(idx >= 0 && nums.get(idx) > key){
        //         nums.set(idx + 1, nums.get(idx));
        //         idx--;
        //     }
        //     nums.set(idx + 1, key);
        // }

        // Radix Sort: 
        // Non Comparison Based, Makes use of bucket/bins, SC: O(n), TC: O(n*d)
        // Find Max: You need the maximum number to know how many digits to process.
        // Digit Extraction: To get the digit at the exp place (1s, 10s, 100s): (number / exp) % 10.
        // Stable Sub-sort: You must use a stable sorting algorithm (like Counting Sort) for each digit; otherwise, the previous digit-sorting work is ruined.
        // int max_ele = nums.get(0);
        // int digitCnt = 0;
        // for(int i=1; i<n; i++){
        //     if(nums.get(i) > max_ele) max_ele = nums.get(i);
        // }

        // int tmp = max_ele;
        // while(tmp > 0){
        //     tmp /= 10;
        //     digitCnt++;
        // }

        // int divisor = 1;
        // for(int pass = 1; pass <= digitCnt; pass++){
            
        //     List<List<Integer>> buckets = new ArrayList<>();
        //     for (int i = 0; i < 10; i++) buckets.add(new ArrayList<>());

        //     for(int i=0; i<n; i++){
        //         int num = nums.get(i);
        //         int bckt = (num/divisor) % 10;
        //         buckets.get(bckt).add(num);
        //     }

        //     int curr = 0;
        //     for(int i=0; i<=9; i++){
        //         List<Integer> lst = buckets.get(i);
        //         for(int num: lst){
        //             nums.set(curr++, num);
        //         }
        //     }
        //     divisor *= 10;
        // }


        // Merge Sort:
        mergeSort(0, n-1, nums);

        out.println("\nAfter Sorting: ");
        for(Integer num: nums){
            out.print(num+" ");
        }
    }
}   