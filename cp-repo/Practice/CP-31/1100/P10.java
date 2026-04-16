        import java.io.*;
        import java.util.*;

        public class P10  {
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
                // ryg -- string s
                String s = fr.next();
                char curr = s.charAt(0);
                char tgt = 'g';
                
                String pattern = fr.next();
                List<Integer> currPos = new ArrayList<>();
                List<Integer> tgtPos = new ArrayList<>();

                for(int i=0; i<n; i++){
                    if(pattern.charAt(i) == curr) currPos.add(i);
                    if(pattern.charAt(i) == tgt) tgtPos.add(i);
                }

                int res = 0;
                for(int pos: currPos){
                    int temp = 0;
                    int nextPos = findNextGreen(pos, tgtPos);
                    if(nextPos < pos){
                        temp = n - pos + nextPos; 
                    }
                    else temp = nextPos - pos;
                    res = Math.max(temp, res);
                }

                out.println(res);
            }

            static int findNextGreen(int pos, List<Integer> tgtPos){
                int s = 0, e = tgtPos.size() - 1;
                int ans = tgtPos.get(0);
                
                while(s <= e){
                    int mid = s+(e-s)/2;
                    if(tgtPos.get(mid) >= pos){
                        ans = tgtPos.get(mid);
                        e = mid-1;
                    }
                    else{
                        s = mid+1;
                    }
                }

                return ans;
            }
        }