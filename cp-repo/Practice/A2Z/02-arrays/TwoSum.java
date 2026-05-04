import java.io.*;
import java.util.*;

// Problem: Find indices of array such that sum equals K. 
public class TwoSum {
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

    // Brute: O(n^2) 
    // Better: HashMap
    static void solve(FastReader fr, PrintWriter out) {
        int n = fr.nextInt();
        int k = fr.nextInt();
        int[] nums = new int[n];

        for(int i=0; i<n; i++){
            nums[i] = fr.nextInt();
        }

        Map<Long, Integer> sumFreq = new HashMap<>();
        long sum = 0, res = 0;
        sumFreq.put(sum, 1);

        for(int i=0; i<n; i++){
            sum += nums[i];

            if(sumFreq.containsKey(sum-k)){
                res += sumFreq.get(sum-k);
            }
            // Update sumFreq for current sum;
            sumFreq.put(sum, sumFreq.getOrDefault(sum, 0)+1);
        }

        out.println("Total Subarrary with Sum K: "+res);
    }
}