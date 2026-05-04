import java.io.*;
import java.util.*;

public class MergeSortedArr {
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
        int m = fr.nextInt();
        int n = fr.nextInt();
        int[] nums1 = new int[m+n];
        int[] nums2 = new int[n];

        for(int i=0; i<m; i++){
            nums1[i] = fr.nextInt();
        }

        for(int i=0; i<n; i++){
            nums2[i] = fr.nextInt();
        }

         List<Integer> nums = new ArrayList<>();

        int i = 0, j = 0;
        while(i < m && j < n){
            if(nums1[i] < nums2[j]){
                nums.add(nums1[i]);
                i++;
            }
            else{
                nums.add(nums2[j]);
                j++;
            }
        }

        while(i < m){
            nums.add(nums1[i]);
            i++;
        }

        while(j < n){
            nums.add(nums2[j]);
            j++;
        }

        for(int k=0; k<m+n; k++){
            nums1[k] = nums.get(k);
        }
    }
}