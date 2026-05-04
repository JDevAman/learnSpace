import java.io.*;
import java.util.*;

public class MoveZeros {
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

        // 1,2,3,4 | k = 1
        // 4,1,2,3
        // Steps: 4,3,2,1

        int lastNonZeroElement = 0;
        for(int i=0; i<n; i++){
            if(nums[i] != 0){ 
                int temp = nums[lastNonZeroElement];
                nums[lastNonZeroElement] = nums[i];
                nums[i] = temp;
                lastNonZeroElement++;
            }
        }
    }
}