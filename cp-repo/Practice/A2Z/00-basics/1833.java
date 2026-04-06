// Shape: Check all Pairs
// Brute: O(n^2)
// Optimal: O(nlogn) 
// Pattern: Length - Window
class Solution {
    public int maxFrequency(int[] nums, int k) {
        Arrays.sort(nums);
        // Brute:
        // int maxFreq = 1;
        // for(int i=0; i<n; i++){
        //     int num = nums[i];
        //     int currFreq = 0;
        //     int currK = k;
        //     for(int j=i; j>=0; j--){
        //         int diff = nums[i] - nums[j];
        //         if(diff > currK) break;
        //         else{
        //              currK = currK - diff;
        //              currFreq++;
        //         }
        //     }
        //     maxFreq = Math.max(currFreq, maxFreq);
        // }

        // Better
        int maxFreq=0;
        int left = 0; 
        long totalSum = 0;
        for(int right = 0; right<nums.length; right++){
            totalSum += nums[right];

            while((long)(right-left+1)*nums[right] - totalSum > k){
                totalSum -= nums[left];
                left++;
            }

            maxFreq = Math.max((right-left+1), maxFreq);
        }
        
        return maxFreq;
    }
}