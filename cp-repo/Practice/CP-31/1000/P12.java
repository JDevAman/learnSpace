import java.io.*;
import java.util.*;

public class P12  {
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
        long n = fr.nextLong();
        long k = fr.nextLong();
        long b = fr.nextLong();
        long s = fr.nextLong();
        
        long maxS = (b+1)*k - 1 + (n-1)*(k-1);  
        long minS = b*k;
        if(s > maxS || s < minS){
            out.println(-1);
            return;
        }

        long maxEle = Math.min((b+1)*k - 1, s);
        long rem = s - maxEle;

        out.print(maxEle+" ");
        for(int i=1; i<n; i++){
            if(rem >= k-1){
                rem -= (k-1);
                out.print(k-1+" ");
            }
            else if(rem >= 0){
                out.print(rem+" ");
                rem = 0;
            }
            else{
                out.print(rem+" ");
            }
        }
        out.println();
    }
}