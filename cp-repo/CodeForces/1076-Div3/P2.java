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
        int t = fr.nextInt();
        while (t-- > 0) {
            solve(fr, out);
        }

        out.flush();
        out.close();
    }

    static void solve(FastReader fr, PrintWriter out) {
        int n = fr.nextInt();

        HashMap<Integer, Integer> pos = new HashMap<>();
        ArrayList<Integer> nums = new ArrayList<>();

        for(int i=0; i<n; i++){
            int x = fr.nextInt();
            nums.add(x);    
            pos.put(x, i);
        }

        int revS = -1, revE = n+1;
        for(int i=0; i<n; i++){
            int curr = nums.get(i);
            int exp = n-i;
            if(curr !=  exp){
                int exPos = pos.get(exp);
                revS = i;
                revE = exPos;
                break;
            }
            out.print(curr+" ");
        }
        
        if(revS > -1){
            for(int i=revE; i>=revS; i--){
                int curr = nums.get(i);
                out.print(curr+" ");
            }
        }

        if(revE < n-1){
            for(int i=revE+1; i<n; i++){
                int curr = nums.get(i);
                out.print(curr+" ");
            }
        }

        out.println();
    }
}