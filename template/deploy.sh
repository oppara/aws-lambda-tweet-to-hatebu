#!/bin/bash
set -eu

export AWS_DEFAULT_PROFILE=oppara-dev

STACK_NAME="tweet2hatebu"
LAMBDA_BUCKET="lambda-${STACK_NAME}"
PACKAGED_FILE="template-packaged.cf.yml"
IS_UPDATE=0

aws s3 mb "s3://${LAMBDA_BUCKET}" > /dev/null

set +e
aws cloudformation describe-stacks --stack-name ${STACK_NAME}  > /dev/null 2>&1
ret=$?
if [ $ret -eq 0 ]; then
  IS_UPDATE=1
fi
set -e

aws cloudformation package \
    --template-file template.cf.yml \
    --s3-bucket ${LAMBDA_BUCKET} \
    --output-template-file ${PACKAGED_FILE}

aws cloudformation deploy \
  --stack-name ${STACK_NAME} \
  --template-file ${PACKAGED_FILE} \
  --capabilities CAPABILITY_NAMED_IAM

if [ $IS_UPDATE -eq 1 ]; then
  aws cloudformation wait stack-update-complete --stack-name ${STACK_NAME}
else
  aws cloudformation wait stack-create-complete --stack-name ${STACK_NAME}
fi

rm ${PACKAGED_FILE}
aws s3 rb s3://${LAMBDA_BUCKET} --force

echo done
