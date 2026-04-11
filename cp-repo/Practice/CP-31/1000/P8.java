    import java.io.*;
    import java.util.*;

    public class P8  {
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
            String s = fr.next();

            int[] a = new int[n];
            int[] b = new int[n];

            int[] freq = new int[26];

            int uniqChar = 0;
            for(int i=0; i<n; i++){
                int ind = s.charAt(i) - 'a';
                if(freq[ind] == 0){
                    uniqChar++;
                    freq[ind]++;
                }
                a[i] = uniqChar;
            }

            uniqChar = 0;
            Arrays.fill(freq, 0);
            for(int i=n-1; i>=0; i--){
                int ind = s.charAt(i) - 'a';
                if(freq[ind] == 0){
                    uniqChar++;
                    freq[ind]++;
                }
                b[i] = uniqChar;
            }

            int res = Math.max(b[0], a[n-1]);

            for(int i=0; i<n-1; i++){
                res = Math.max(res, a[i]+b[i+1]);
            }

            out.println(res);
        }
    }