// P.S. You are given an integer array nums of length n.
// Assume arrk to be an array obtained by rotating nums by k positions clock-wise. We define the rotation function F on nums as follow:
// F(k) = 0 * arrk[0] + 1 * arrk[1] + ... + (n - 1) * arrk[n - 1].
// Return the maximum value of F(0), F(1), ..., F(n-1).


// Brute Force: O(n^2)
// Optimal: O(n)
class Solution {
    public int maxRotateFunction(int[] nums) {
        int n = nums.length;
        int arrSum = 0, res = 0, prev = 0;
        
        for(int i=0; i<n; i++){
            arrSum += nums[i];
            prev = prev + (nums[i] * i);
        }

        res = prev;

        int curr = 1, cnt = 0;
        while(cnt < n-1){
            int idx = (curr + n-1)%n;
            int temp = prev - arrSum + (nums[idx]*n);
            prev = temp;
            if(temp > res) res = temp;
            curr++; cnt++;
        }
        
        return res;
    }
}