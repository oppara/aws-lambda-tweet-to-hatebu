mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
CWD := $(patsubst %/,%,$(dir $(mkfile_path)))

all: deploy

deploy:
	@cd template && aws-vault exec opp-dev -- /bin/bash deploy.sh

try:
	@cd src && export `cat .env` && node try.js

.PHONY: deploy try
