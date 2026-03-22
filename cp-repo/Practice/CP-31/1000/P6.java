import java.io.*;
import java.util.*;

public class P6 {
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
        int k = fr.nextInt();
        int q = fr.nextInt();

        ArrayList<Long> a = new ArrayList<>();
        for(int i=0; i<n; i++){
            long x = fr.nextLong();
            a.add(x);
        }

        // Find subarray of longest len >= k multiple times and keep adding.
        long res = 0;
        long cnt = 0;
        for(int i=0; i<n; i++){
            if(a.get(i) <= q) cnt++;
            else{
                if(cnt >= k){
                    long diff = cnt - k + 1;
                    res += (diff * (diff + 1))/2;
                }
                cnt = 0;
            }
        }
        if(cnt >= k){
            long diff = cnt - k + 1;
            res += (diff * (diff + 1))/2;
        }
        out.println(res);
    }
}