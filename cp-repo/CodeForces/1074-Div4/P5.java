import java.io.*;
import java.util.*;

public class P5 {
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
    int n = fr.nextInt(), m = fr.nextInt(), k = fr.nextInt();
    int[] robots = new int[n];
    ArrayList<Integer> spikes = new ArrayList<>();

    for (int i = 0; i < n; i++) robots[i] = fr.nextInt();
    for (int i = 0; i < m; i++) spikes.add(fr.nextInt());
    Collections.sort(spikes);

    String instn = fr.next();
    
    // Step 1: Pre-calculate the first time each offset is reached
    // Map: Offset -> Time Step (0 to k-1)
    HashMap<Long, Integer> firstTime = new HashMap<>();
    long curr = 0;
    for (int i = 0; i < k; i++) {
        curr += (instn.charAt(i) == 'L' ? -1 : 1);
        if (!firstTime.containsKey(curr)) {
            firstTime.put(curr, i);
        }
    }

    // Step 2: For each robot, find when it hits a spike
    int[] deathsAtTime = new int[k];
    int totalInitialDead = 0;

    for (int i = 0; i < n; i++) {
        int pos = robots[i];
        int idx = findFloorIdx(pos, spikes);

        long dL = Long.MIN_VALUE;
        if (idx != -1 && spikes.get(idx) < pos) dL = (long)spikes.get(idx) - pos;

        long dR = Long.MAX_VALUE;
        int rIdx = (idx == -1) ? 0 : idx;
        if (rIdx < m && spikes.get(rIdx) <= pos) rIdx++;
        if (rIdx < m) dR = (long)spikes.get(rIdx) - pos;

        // Find the earliest time it hits dL or dR
        int tL = firstTime.getOrDefault(dL, Integer.MAX_VALUE);
        int tR = firstTime.getOrDefault(dR, Integer.MAX_VALUE);
        int deathTime = Math.min(tL, tR);

        if (deathTime < k) {
            deathsAtTime[deathTime]++;
        }
    }

    // Step 3: Sweep through time
    int safeRobots = n;
    for (int i = 0; i < k; i++) {
        safeRobots -= deathsAtTime[i];
        out.print(safeRobots + " ");
    }
    out.println();
    }

    static int findFloorIdx(int key, ArrayList<Integer> spikes) {
    int s = 0, e = spikes.size() - 1;
    int res = -1;
    while (s <= e) {
        int mid = s + (e - s) / 2;
        if (spikes.get(mid) <= key) {
            res = mid;
            s = mid + 1;
        } else {
            e = mid - 1;
        }
    }
    return res;
    }
}
// TC: k + nlog(m)