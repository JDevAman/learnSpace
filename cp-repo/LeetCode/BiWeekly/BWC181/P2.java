class Solution {
    public int compareBitonicSums(int[] nums) {
        int n = nums.length;
        long[] sum = new long[n+1];
        sum[0] = nums[0];
        int peakIdx = 0;
        for(int i=1; i<n; i++){
            sum[i] = nums[i] + sum[i-1];
            if(nums[i] > nums[peakIdx]) peakIdx = i;
        }

        long leftSum = sum[peakIdx];
        long rightSum = sum[n-1] - sum[peakIdx-1];
        if(rightSum > leftSum) return 1;
        else if(rightSum < leftSum) return 0;
        else return -1;
    }
}