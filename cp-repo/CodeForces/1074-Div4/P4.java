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
        int n = fr.nextInt(), m = fr.nextInt(), h = fr.nextInt();
        ArrayList<Long> nums = new ArrayList<>();
        for(int i=0; i<n; i++){
            long x = fr.nextLong();
            nums.add(x);
        }

        TreeMap<Integer, Long> changes= new TreeMap<>();
        for(int i=0; i<m; i++){
            int idx = fr.nextInt();
            long toAdd = fr.nextLong();
            long exChgVal = changes.getOrDefault(idx - 1, 0L);
            long currVal = nums.get(idx -1) + exChgVal;
            if(currVal + toAdd > h){
                changes.clear();
            }else{
                changes.put(idx - 1, exChgVal+toAdd);
            }
        }

        for(Map.Entry<Integer,Long> record: changes.entrySet()){
            int idx = record.getKey();
            long delta = record.getValue();
            nums.set(idx, nums.get(idx)+delta);
        }

        for(int i=0; i<n; i++){
            out.print(nums.get(i)+ " ");
        }
        out.println();
    }
}