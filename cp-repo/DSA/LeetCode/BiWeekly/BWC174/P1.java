class Solution {
    public int[] bestTower(int[][] towers, int[] center, int radius) {
        int n = towers.length, cx = center[0], cy = center[1];
        int bestQ = -1;
        int bestIdx = -1;

        for (int i = 0; i < n; i++) {
            int xi = towers[i][0], yi = towers[i][1], qi = towers[i][2];
            int dist = Math.abs(xi - cx) + Math.abs(yi - cy);

            if (dist <= radius) {
                if (qi > bestQ) {
                    bestQ = qi;
                    bestIdx = i;
                } else if (qi == bestQ) {
                    // Lexicographical tie-break
                    if (xi < towers[bestIdx][0] ||
                            (xi == towers[bestIdx][0] && yi < towers[bestIdx][1])) {
                        bestIdx = i;
                    }
                }
            }
        }

        int[] res = new int[2];
        if (bestIdx == -1) {
            res[0] = -1;
            res[1] = -1;
        } else {
            res[0] = towers[bestIdx][0];
            res[1] = towers[bestIdx][1];
        }
        return res;
    }
}