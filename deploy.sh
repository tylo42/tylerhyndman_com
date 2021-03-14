#!/bin/bash
set -e

ENVIRONMENT_FILE="./environment.sh"

if [ ! -f "${ENVIRONMENT_FILE}" ]; then
   echo "${ENVIRONMENT_FILE} does not exist.";
   echo 'Expect the file to contain a $FUNCTION_NAME variable initialized to the function arn to deploy to';
   exit;
fi

source $ENVIRONMENT_FILE

if [ -z "${S3_BUCKET}" ]; then
   echo 'Expected variable $S3_BUCKET is not set';
   exit;
fi

if [ -z "${DISTRIBUTION_ID}" ]; then
   echo 'Expected variable $DISTRIBUTION_ID is not set';
   exit;
fi

# Upload new content to S3 bucket
aws s3 sync --delete src ${S3_BUCKET}

# Invalidate caches so new content is observable as soon as possible
aws cloudfront create-invalidation \
   --distribution-id ${DISTRIBUTION_ID} \
   --paths "/*" | cat
