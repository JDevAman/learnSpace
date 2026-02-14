import java.io.*;
import java.util.*;

public class P5 {
    static class Pair<T extends Comparable<T>, U extends Comparable<U>> {
        T first;
        U second;

        Pair(T first, U second) {
            this.first = first;
            this.second = second;
        }
    }

    static class PairComparator<T extends Comparable<T>, U extends Comparable<U>> 
        implements Comparator<Pair<T, U>> {
        
        @Override
        public int compare(Pair<T, U> p1, Pair<T, U> p2) {
            int firstCompare = p2.first.compareTo(p1.first); // Descending
            if (firstCompare != 0) {
                return firstCompare;
            }
            return p1.second.compareTo(p2.second); // Ascending
        }
    }

    static class FastReader {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        String next() {
            while (st == null || !st.hasMoreElements()) {
                try { st = new StringTokenizer(br.readLine()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            return st.nextToken();
        }
        int nextInt() { return Integer.parseInt(next()); }
    }

    public static void main(String[] args) {
        if (System.getProperty("ONLINE_JUDGE") == null) {
            try {
                System.setIn(new FileInputStream("inputf.in"));
                System.setOut(new PrintStream(new FileOutputStream("outputf.out")));
            } catch (Exception e) {}
        }
        FastReader fr = new FastReader();
        PrintWriter out = new PrintWriter(System.out);

        int t = fr.nextInt();
        while (t-- > 0) solve(fr, out);
        out.flush();
        out.close();
    }

    static void solve(FastReader fr, PrintWriter out) {
        int n = fr.nextInt();
        int k = fr.nextInt();

        PriorityQueue<Pair<Integer,Integer>> pq = new PriorityQueue<>(new PairComparator<Integer, Integer>());

        for (int i = 0; i < n; i++) {
            int h = fr.nextInt();
            int rem = h % k;
            if (rem == 0) rem = k;
            pq.add(new Pair<Integer,Integer>(rem, i + 1));
        }

        while (!pq.isEmpty()) {
            Pair<Integer,Integer> top = pq.poll();
            out.print(top.second + " ");
        }
        out.println();
    }
}