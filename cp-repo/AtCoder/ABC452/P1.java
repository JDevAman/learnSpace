    import java.io.*;
    import java.util.*;

    public class Main {
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
            // int t = fr.nextInt();
            int t = 1;
            while (t-- > 0) {
                solve(fr, out);
            }

            out.flush();
            out.close();
        }

        static void solve(FastReader fr, PrintWriter out) {
            int m = fr.nextInt();
            int d = fr.nextInt();

            if((m == 1 && d == 7) || (m == 3 && d == 3) || (m == 5 && d == 5) || (m == 7 && d == 7) || (m == 9 && d == 9)){
                out.println("Yes");
            }
            else out.println("No");
        }
    }