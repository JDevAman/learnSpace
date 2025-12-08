# CLOUD

Provides compute, storage, and services over the internet.

## GCP

Offers Always Free usage limits.
Free tier - [details](https://cloud.google.com/free/docs/free-cloud-features)

### Initial Setup

1. Create a project.
2. Setup billing alerts.
3. Create a VM within free-tier limits (e2-micro, free-tier region, ≤30GB disk).

### Login to VM

1. Generate SSH key using PuTTYgen.
2. Add the public key to the VM (Compute Engine → VM → Edit → SSH Keys).
3. Use PuTTY with the private .ppk key to connect.
