// Problem: Return valid elements in array when one element is valid if it is greatest to all elements to right or left. 
class Solution {
    public List<Integer> findValidElements(int[] nums) {
        int n = nums.length;
        boolean[] valid = new boolean[n];

        Deque<Integer> q = new ArrayDeque<>();
        
        valid[0] = valid[n-1] = true;
        q.offerLast(nums[0]);
        for(int i=0; i<n; i++){
            if(nums[i] > q.getLast()){ 
                valid[i] = true;
                q.offerLast(nums[i]);
            }
        }

        q.clear();
        q.offerLast(nums[n-1]);
        for(int i=n-1; i>=0; i--){
            if(nums[i] > q.getLast()){ 
                valid[i] = true;
                q.offerLast(nums[i]);
            }
        }

        List<Integer> res = new ArrayList<>();
        for(int i=0; i<n; i++){
            if(valid[i]) res.add(nums[i]);
        }

        return res;
    }
}