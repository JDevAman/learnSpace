import java.io.*;
import java.util.*;

public class P3 {
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
        ArrayList<Long> nums = new ArrayList<>();

        // Find longest subarray having max - min as greatest.
        for(int i=0; i<n; i++){
            long x = fr.nextLong();
            nums.add(x);
        }

        Collections.sort(nums);
        long exNum = nums.get(0) + 1, maxDiff = 0;
        int start = 0;
        for(int i=1; i<n; i++){
            long curr = nums.get(i);
            if(curr == exNum) exNum++;
            else if(curr == exNum-1) continue;
            else{
                maxDiff = Math.max(exNum - nums.get(start), maxDiff);
                start = i;
                exNum = nums.get(i)+1;
            }
        }
        maxDiff = Math.max(exNum - nums.get(start), maxDiff); 
        maxDiff = maxDiff == 0 ? 1 : maxDiff;
        out.println(maxDiff);
    }
}