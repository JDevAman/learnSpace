import java.io.*;
import java.util.*;

public class P4 {
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
        long p = fr.nextLong();

        Long res = p;
        

        ArrayList<Long> a = new ArrayList<>();
        ArrayList<Long> b = new ArrayList<>();
        TreeMap<Long, Long> mpp = new TreeMap<>();

        for(int i=0; i<n; i++){
            long x = fr.nextLong();
            a.add(x);
        }
        for(int i=0; i<n; i++){
            long x = fr.nextLong();
            b.add(x);
        }    

        for(int i=0; i<n; i++){
            if(b.get(i) <= p){
                mpp.put(b.get(i), mpp.getOrDefault(b.get(i), 0L) + a.get(i));
            }
        }

        if(n == 1){
            out.println(res);
            return;
        }

        int currCnt = 1;
        for(Map.Entry<Long, Long> record: mpp.entrySet()){
            if(currCnt >= n) break;
            long minOccur = Math.min(n-currCnt, record.getValue());
            res += (record.getKey() *  minOccur);
            currCnt += minOccur; 
        }

        if(currCnt < n){
            res += p*(n-currCnt);
        }

        out.println(res);
    }
}