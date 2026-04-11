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
        // Ex: 10, 10, 3
        for(int pass=1; pass<n; pass++){
            int minIdx=pass-1;
            for(int idx=pass; idx<n; idx++){
                if(nums.get(idx) < nums.get(minIdx)){
                    minIdx =  idx;
                }
            }
            int temp = nums.get(pass-1);
            nums.set(pass-1, nums.get(minIdx));
            nums.set(minIdx, temp);
        }

        out.println("\nAfter Sorting: ");
        for(Integer num: nums){
            out.print(num+" ");
        }



    }
}