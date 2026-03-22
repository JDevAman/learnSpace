#include <bits/stdc++.h>
using namespace std;

// Type Aliases
#define int long long
#define vi vector<int>
#define si set<int>
#define mi map<int, int>
#define pi pair<int, int>

// Utility Aliases
#define pq_min priority_queue<int, vector<int>, greater<int>> 
#define pq_max priority_queue<int>

// Output Shorthand
#define yes cout << "Yes" << endl
#define no cout << "No" << endl

void haribhakt_fastio() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
}

void solve() {
    int n; cin>>n;
    vi nums(n);
    int maxEle = INT_MIN, minEle = INT_MAX;
    for(int i=0; i<n; i++){
        cin>>nums[i];
    }

    if(nums[0] == 1) nums[0]++;
    for(int i=0; i<n-1; i++){
        while(nums[i+1] % nums[i] == 0 || nums[i+1] == 1) nums[i+1]++;
    }

    for(int i=0; i<n; i++){
        cout<<nums[i]<<" ";
    }
    cout<<endl;
}

signed main() {   
    haribhakt_fastio(); 
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}