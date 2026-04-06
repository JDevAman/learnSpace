    import java.io.*;
    import java.util.*;

    public class P2 {
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

        // h rows, w cols

        static void solve(FastReader fr, PrintWriter out) {
            int h = fr.nextInt();
            int w = fr.nextInt();

            for(int row=0; row<h; row++){
                for(int col=0; col<w; col++){
                    if(row == 0 || row == h-1 || col == 0 || col == w-1){
                        out.print('#');
                    }
                    else{
                        out.print('.');
                    }
                }
                out.println();
            }

        }
    }