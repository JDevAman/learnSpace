// Shape: Try all choices at each step
// Brute: O(2^n)
// Optimal Target: O(n^4)

// Brute
class Solution {
    int minLen;
    int len;
    int tgt;

    void solve(int idx, int curr_xor, int curr_len,int[] nums){
        if(idx == len){
            if(curr_xor == tgt){
                minLen = Math.min(len - curr_len, minLen);
            }
            return;
        }

        // Choose
        solve(idx+1, curr_xor^nums[idx], curr_len + 1, nums);
        solve(idx+1, curr_xor, curr_len, nums);

    }
    public int minRemovals(int[] nums, int target) {
        int n = nums.length;
        this.len = n;
        this.minLen = n+1;
        this.tgt = target;

        solve(0, 0, 0, nums);
        
        return (minLen == n+1) ? -1 : minLen;
    }
}

// Optimised - Memo
class Solution {
    int[][] memo;
    int n;
    int tgt;

    int solve(int idx, int currXor, int[] nums){
        if(idx == n){
            return (currXor == tgt) ? 0 : -1000000;
        }

        if(memo[idx][currXor] != -1){
            return memo[idx][currXor];
        }
        

        int skip = solve(idx+1, currXor, nums);
        int take = 1 + solve(idx+1, currXor ^ nums[idx], nums);

        return memo[idx][currXor] = Math.max(skip, take);
    }
    public int minRemovals(int[] nums, int target) {
        this.n = nums.length;
        this.tgt = target;
        this.memo = new int[n][16384];

        for(int[] row: memo) Arrays.fill(row, -1);
        
        int maxKept = solve(0, 0, nums);
        return (maxKept < 0) ? -1 : n-maxKept;
    }
}