    import java.io.*;
    import java.util.*;

    public class P7  {
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
            int[] a = new int[n];
            int[] b = new int[n];

            Set<Integer> uniqEle = new TreeSet<>();
            for(int i=0; i<n; i++){
                int x = fr.nextInt();
                a[i] = x;
                if(!uniqEle.contains(x)) uniqEle.add(x);
            }

            for(int i=0; i<n; i++){
                int x = fr.nextInt();
                b[i] = x;
                if(!uniqEle.contains(x)) uniqEle.add(x);
            }

            // Brute - Recursion
            // Better - DP
            // Optimised - Greedy

            int len = 2*n+1;
            int[] maxA = new int[len];
            int[] maxB = new int[len];

            maxStreak(a, maxA);
            maxStreak(b, maxB);

            int res = 1;
            for(Integer num: uniqEle){
                int lenA = maxA[num];
                int lenB = maxB[num];
                res = Math.max(lenA+lenB, res);
            }

            out.println(res);
        }

        static void maxStreak(int[] arr, int[] mpp){
            int curr = 1;
            int n = arr.length;
            for(int i=0; i<n-1; i++){
                int currNum = arr[i];
                if(currNum == arr[i+1]){
                    curr++;
                }
                else{
                    int existing = mpp[currNum];
                    if(curr > existing){
                        mpp[currNum] = curr;
                    }
                    curr = 1;
                }
            }

            // Last Char.
            int currNum = arr[n-1];
            int existing = mpp[currNum];
            if(curr > existing){
                mpp[currNum] = curr;
            }
        }
    }