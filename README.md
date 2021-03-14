# tylerhyndman.com

The source code for tylerhyndman.com frontend.

To deploy, it expects that there exists a `./environment.sh` (not checked in to source) file in the root of the project of the format

```
#!/bin/bash

S3_BUCKET=<AWS-S3-Bucket>
DISTRIBUTION_ID=<Distribution id>
```
