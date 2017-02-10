all:
	NODE_ENV=development npm run build

start:
	export NODE_ENV=local && node ./node_modules/concurrently/src/main.js --kill-others "docker-compose up" "npm start"

seed:
	serverless dynamodb execute -n users
	serverless dynamodb execute -n queries

migrate-dev:
	serverless dynamodb executeAll

deploy:
	npm run deploy

#endpoints:
#POST - https://9276kvu81j.execute-api.ap-northeast-1.amazonaws.com/dev/graphql
#functions:
#sc-service-v2-dev-api: arn:aws:lambda:ap-northeast-1:447050364325:function:sc-service-v2-dev-api
#GRAPHQL_ENDPOINT = https://jryu0pksc4.execute-api.ap-northeast-1.amazonaws.com/dev/graphql

req:
	curl -X POST "http://localhost:3000/graphql" -H "content-type: application/json" --data-binary '{"query":"query($$var: String!) { user(id: $$var) { id }}","variables":{"var":"test"}}'

req-dev:
	curl -X POST "https://9276kvu81j.execute-api.ap-northeast-1.amazonaws.com/dev/graphql" -H "content-type: application/json" --data-binary '{"query":"query { viewer { id name email token screenName permissions }}","variables":{}}'

req-ll:
	touch ./bin/genconfig.js && \
	export NODE_ENV=local && npm run build && \
	docker run --link dynamodb --net serverless_default -v $(PWD)/build:/var/task lambci/lambda handler.graphql '{"body": "{\"query\":\"query { viewer { id email name screenName }}\",\"variables\":{}}"}'

cli:
	NODE_ENV=local ./bin/dynamo-repl

cli-dev:
	NODE_ENV=developpment ./bin/dynamo-repl

logs:
	cd build && make logs
