import java.io.*;
import java.util.*;

public class P11  {
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
        int t = 1;
        while (t-- > 0) {
            solve(fr, out);
        }

        out.flush();
        out.close();
    }

    static void solve(FastReader fr, PrintWriter out) { 
        int n = fr.nextInt();
        int d = fr.nextInt();
        int[] nums = new int[n];
        
        for(int i=0; i<n; i++){
            nums[i] = fr.nextInt();
        }

        Arrays.sort(nums);

        int res = 0, curr = n-1, rem = n;
        while(rem > 0){
            int quo = (d/nums[curr]) + 1;
            if(quo > rem) break;
            rem -= quo;
            res++;
            curr--;
        }

        out.println(res);
    }
}