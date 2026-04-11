    import java.io.*;
    import java.util.*;

    public class P9  {
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

            // a + b = n
            // LCM is least, means gcd is highest.
            // 77 - (11, 66)
            // 78 - 39, 39
            // 115 - (23, 92)
            int lFactor = 1;
            for(int i=2; i*i <= n; i++){
                if(n % i == 0){
                    lFactor = Math.max(i, n/i);
                    break;
                }
            }

            int remFactor = n - lFactor;
            out.println(lFactor+" "+ remFactor);
        }
    }