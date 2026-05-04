import java.io.*;
import java.util.*;

// Problem: Find longest subarray in bit array with equal 0 & 1.    
public class ContiguousSubArray {
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
    // Better: HashMap / Int Array - Replace 0 with -1
    static void solve(FastReader fr, PrintWriter out) {
        int n = fr.nextInt();
        int[] nums = new int[n];

        for(int i=0; i<n; i++){
            nums[i] = fr.nextInt();
        }

        int  maxLen = 0;
        int sum = 0;
        //Range: -n, +n
        int[] sumMap = new int[2*n + 1];
        Arrays.fill(sumMap, -2);
        sumMap[n] = -1;

        for(int i=0; i<n; i++){
            if(nums[i] == 0)  sum--;
            else sum++;
            
            if(sumMap[sum+n] != -2) maxLen = Math.max(maxLen, i-sumMap[sum+n]);
            else sumMap[sum+n] = i;
        }

        out.println("Longest Subarrary with equal 0/1: "+maxLen);
    }
}