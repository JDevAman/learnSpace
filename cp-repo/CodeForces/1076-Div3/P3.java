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
        int q = fr.nextInt();
        ArrayList<Long> a = new ArrayList<>(n);
        ArrayList<Long> b = new ArrayList<>(n);
        ArrayList<int[]> qs = new ArrayList<>(q);

        for(int i=0; i<n; i++) a.add(fr.nextLong()); 
        for(int i=0; i<n; i++) b.add(fr.nextLong());
        for(int i=0; i<q; i++){
            qs.add(new int[]{fr.nextInt(), fr.nextInt()});
        }

        long maxEle = 0L;
        for(int i=n-1; i>=0; i--){
            maxEle = Math.max(a.get(i), Math.max(b.get(i), maxEle));
            a.set(i, maxEle);
        }

        ArrayList<Long> pre = new ArrayList<>(n+1); 
        pre.add(0L);
        for(int i=0; i<n; i++){
            pre.add(a.get(i) + pre.get(i));
        }

        // out.println("a: ");
        // for(int i=0; i<n; i++){
        //     out.print(a.get(i)+" ");
        // }

        // out.println();
        // out.println("pre: ");
        // for(int i=0; i<=n; i++){
        //     out.print(pre.get(i)+" ");
        // }

        // out.println();

        for(int i=0; i<q; i++){
            long res = 0L;

            int[] query = qs.get(i); 
            int l = query[0], r = query[1];
            res = pre.get(r) - pre.get(l-1);
            out.print(res+" ");
        }
        out.println();
    }
}