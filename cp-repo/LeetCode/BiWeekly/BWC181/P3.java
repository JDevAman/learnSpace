// 2^n
class Solution {
    int res, n;
    
    public int evenSumSubgraphs(int[] nums, int[][] edges) {
        n = nums.length;
        boolean[][] adjMatrix = new boolean[n][n];

        res = 0;
        for(int[] edge : edges) {
            int u = edge[0], v = edge[1];
            adjMatrix[u][v] = true;
            adjMatrix[v][u] = true; 
        }

        List<Integer> bt = new ArrayList<>();
        backtrack(0, nums, bt, adjMatrix);

        return res;
    }

    boolean isConnected(List<Integer> nodes, boolean[][] adjMatrix) {
        boolean[] vis = new boolean[n];
        Queue<Integer> q = new ArrayDeque<>();
        
        int startNode = nodes.get(0);
        q.offer(startNode);
        vis[startNode] = true;
        
        int count = 0;
        while(!q.isEmpty()) {
            int node = q.poll();
            count++;
            for(int i = 0; i < n; i++) {
                if(adjMatrix[node][i] && !vis[i] && nodes.contains(i)) { 
                    vis[i] = true; 
                    q.offer(i); 
                }
            }
        }

        return count == nodes.size();
    }
    
    void backtrack(int idx, int[] nums, List<Integer> bt, boolean[][] adjMatrix) {
        if(idx == n) {
            if(bt.isEmpty()) return;
            
            int sum = 0;
            for(int nodeIdx : bt) sum += nums[nodeIdx]; 
            
            if(sum % 2 == 0 && isConnected(bt, adjMatrix)) {
                res++;
            }
            return;
        }

        // w/o
        backtrack(idx + 1, nums, bt, adjMatrix);
        
        // add index
        bt.add(idx); 
        backtrack(idx + 1, nums, bt, adjMatrix);
        bt.remove(bt.size() - 1);
    }
}