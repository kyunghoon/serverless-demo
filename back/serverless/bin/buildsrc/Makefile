JS = $(shell  find ../src -type f -name '*.js')

all: config.js handler.js package.json

config.js: ../src/config.js ../bin/genconfig.js

handler.js: $(JS)
	babel --ignore __test__,__mocks__ --out-dir=./ ../src

package.json: ../package.json
	cat ../package.json | sed '/"aws-sdk":/d' > ./package.json
	yarn install --production
	babel --out-dir=./node_modules/graphql-list-fields ./node_modules/graphql-list-fields

install:
	node ../bin/genconfig
	serverless deploy

logs:
	serverless logs -f api -t

.PHONY: logs install
