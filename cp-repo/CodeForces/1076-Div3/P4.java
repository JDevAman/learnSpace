import java.io.*;
import java.util.*;

public class P4 {
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
        long[] strength = new long[n];
        long[] hits = new long[n];

        for(int i=0; i<n; i++) strength[i] = fr.nextLong();
        for(int i=0; i<n; i++) hits[i] = fr.nextLong();
        
        long[] pre = new long[n + 1];
        for(int i=0; i<n; i++){
            pre[i+1] = hits[i] + pre[i];
        }

        Arrays.sort(strength);

        long maxScore = 0L;
        for(int i=0; i<n; i++){
            long str = strength[i];
            long remSwords = (long)n - i;
            
            int levels = bSearch(remSwords, pre);
            
            long res = str * levels;
            maxScore = Math.max(maxScore, res);
        }
        out.println(maxScore);
    }
    static int bSearch(long key, long[] pre) {
        int s = 0, e = pre.length - 1;
        int res = 0;
        while (s <= e) {
            int mid = s + (e - s) / 2;
            if (pre[mid] <= key) {
                res = mid;
                s = mid + 1;
            } else {
                e = mid - 1;
            }
        }
        return res;
    }
}