import java.io.*;
import java.util.*;

public class P1 {
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
                int n = 4;
//      Pattern 7
//      for(int i=0; i<n; i++) {
//             for(int j=0; j<n-i-1; j++) System.out.print(" ");
//             for(int j=n-i-1; j<n; j++) System.out.print("*");
//             if(i > 0){
//                 for(int j=0; j<i; j++) System.out.print("*");
//             }
//             System.out.println();
//      }

//      Pattern 8
//      for(int i=0; i<n; i++) {
//             for(int j=0; j<i; j++) System.out.print(" ");
//             for(int j=i; j<n; j++) System.out.print("*");
//             if(i < n-1){
//                 for(int j=0; j<n-i-1; j++) System.out.print("*");
//             }
//             System.out.println();
//      }

//      Pattern 9
//      for(int i=0; i<n; i++) {
//             for(int j=0; j<n-i-1; j++) System.out.print(" ");
//             for(int j=n-i-1; j<n; j++) System.out.print("*");
//             if(i > 0){
//                 for(int j=0; j<i; j++) System.out.print("*");
//             }
//             System.out.println();
//      }
//      for(int i=0; i<n; i++) {
//             for(int j=0; j<i; j++) System.out.print(" ");
//             for(int j=i; j<n; j++) System.out.print("*");
//             if(i < n-1){
//                 for(int j=0; j<n-i-1; j++) System.out.print("*");
//             }
//             System.out.println();
//      }

//      Pattern 10
//      for(int i=0; i<n; i++) {
//          for(int j=0; j<=i; j++) System.out.print("*");
//          System.out.println();
//      }

//      for(int i=n-1; i>0; i--) {
//             for(int j=0; j<i; j++) System.out.print("*");
//             System.out.println();
//      }

//      Pattern 11
//      for(int i=1; i<=n; i++){
//          for(int j=1; j<=i; j++) System.out.print(j%2);
//          System.out.println();
//      }

//      Pattern 12
//      for(int i=1; i<=n; i++) {
//          for(int j=1; j<=i; j++) {
//              System.out.print(j);
//          }
//          for(int j=i+1; j<=n; j++) {
//              System.out.print(" ");
//          }

//          for(int j=1; j<=n-i; j++) {
//              System.out.print(" ");
//          }
//          for(int j=n-i+1; j<=n; j++) {
//              System.out.print(n-j+1);
//          }
//          System.out.println();
//      }

//      Pattern 13
        // int curr = 1;
        // for(int i=1; i<=n; i++){
        //     for(int j=1; j<=i; j++){
        //         System.out.print(curr);
        //         curr += 1;
        //     }
        //     System.out.println();
        // }

//      Pattern 14
        // for(int i=0; i<n; i++){
        //     for(int j=0; j<=i; j++){
        //         char ch = (char)('A'+j);
        //         System.out.print(ch);
        //     }
        //     System.out.println();
        // }

//      Pattern 15
        // for(int i=n-1; i>=0; i--){
        //     for(int j=0; j<=i; j++){
        //         char ch = (char)('A'+j);
        //         System.out.print(ch);
        //     }
        //     System.out.println();
        // }

//      Pattern 16
        // for(int i=0; i<n; i++){
        //     for(int j=0; j<=i; j++){
        //         char ch = (char)('A'+i);
        //         System.out.print(ch);
        //     }
        //     System.out.println();
        // }

//      Pattern 17
        // for(int i=0; i<n; i++){
        //     for(int j=0; j<n-i-1; j++){
        //         System.out.print(" ");
        //     }
        //     for(int j=0; j<i+1; j++){
        //         char ch = (char)('A'+j);
        //         System.out.print(ch);
        //     }

        //     for(int j=i-1; j>=0; j--){
        //         char ch = (char)('A'+j);
        //         System.out.print(ch);
        //     }
        //     System.out.println();
        // }

//      Pattern 18
        // for(int i=0; i<n; i++){
        //     for(int j=0;j<=i; j++){
        //         char ch = (char)('A'+n-1-i+j);
        //         System.out.print(ch);
        //     }
        //     System.out.println();
        // }

//      Pattern 19
        // for(int i=0; i<n; i++){
        //     for(int j=0; j<n-i; j++) System.out.print('*');
        //     for(int j=n-i; j<n; j++) System.out.print(' ');

        //     for(int j=0; j<i; j++) System.out.print(' ');
        //     for(int j=i; j<n; j++) System.out.print('*');
        //     System.out.println();
        // }
        // for(int i=0; i<n; i++){
        //     for(int j=0; j<=i; j++) System.out.print('*');
        //     for(int j=i+1; j<n; j++) System.out.print(' ');

        //     for(int j=0; j<n-i-1; j++) System.out.print(' ');
        //     for(int j=n-i-1; j<n; j++) System.out.print('*');
        //     System.out.println();
        // }

//      Pattern 20
        // for(int i=0; i<n; i++){
        //     for(int j=0; j<=i; j++) System.out.print('*');
        //     for(int j=i+1; j<n; j++) System.out.print(' ');

        //     for(int j=0; j<n-i-1; j++) System.out.print(' ');
        //     for(int j=n-i-1; j<n; j++) System.out.print('*');
        //     System.out.println();
        // }
        // for(int i=1; i<n; i++){
        //     for(int j=0; j<n-i; j++) System.out.print('*');
        //     for(int j=n-i; j<n; j++) System.out.print(' ');

        //     for(int j=0; j<i; j++) System.out.print(' ');
        //     for(int j=i; j<n; j++) System.out.print('*');
        //     System.out.println();
        // }

//      Pattern 21
        // for(int i=0; i<n; i++){
        //     for(int j=0; j<n; j++){
        //         if(j == 0 || i == 0 || j == n-1 || i == n-1) System.out.print('*');
        //         else System.out.print(' ');
        //     }
        //     System.out.println();
        // }

//      Pattern 22
//         int end = (2*n)-1;
//      for(int i=1; i<=end; i++) {
//          for(int j=1; j<=end; j++) {
//              // Find maxVal which can be achieved
//              // i > n | j > n
//              int r = i, c = j;
//              if(r >= n) r = n - (r % n);
//              if(c >= n) c = n - (c % n);
//              int minVal = Math.min(r, c);
//              System.out.print(n-minVal+1);
//          }
//          System.out.println();
//      }
    }
}