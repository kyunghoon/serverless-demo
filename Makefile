BACKJSS = $(shell find $(PWD)/back -type f -name "*.js")

# hodgepodge of various commands used for development

#endpoints:
#POST - https://9276kvu81j.execute-api.ap-northeast-1.amazonaws.com/dev/graphql
#functions:
#sc-service-v2-dev-api: arn:aws:lambda:ap-northeast-1:447050364325:function:sc-service-v2-dev-api
#GRAPHQL_ENDPOINT = https://jryu0pksc4.execute-api.ap-northeast-1.amazonaws.com/dev/graphql

QUERY2 = "{\"query\":\"query($$var: String!) { user(id: $$var) { id }}\",\"variables\":{\"var\":\"test\"}}"
QUERY = '{"query":"query($$var: String!) { user(id: $$var) { id }}","variables":{"var":"test"}}'

local-lambda-test: /tmp/build-api /tmp/build-api-modules
	docker run -v $(PWD)/api:/var/task lambci/lambda handler.graphql '{"body": $(QUERY2)}'

/tmp/build-api: $(BACKJSS)
	export NODE_ENV=local && cd back && npm run build:api
	touch $@

/tmp/build-api-modules: $(PWD)/api/package.json
	export NODE_ENV=local && cd back && npm run build:api:node_modules
	touch $@

req:
	curl -X POST "http://localhost:3000/graphql" -H "content-type: application/json" --data-binary '{"query":"query($$var: String!) { user(id: $$var) { id }}","variables":{"var":"test"}}'

print-%: ; @echo $* = $($*)

clean:
	rm -rf /tmp/build-api
	rm -rf /tmp/build-api-modules

start:
	node ./node_modules/concurrently/src/main.js --kill-others "cd ./back/serverless/ && docker-compose up" "cd ./back/serverless/ && npm start" "cd ./front/twitterdemo/ && npm start"

install:
	yarn install
	cd ./back/serverless/ && yarn install
	cd ./front/twitterdemo/ && yarn install

.PHONY: clean
