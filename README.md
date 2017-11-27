# NodeWebAPi
node js http api for X-Agora eval

To successfully test this Node.js HTTP API you should run the Dockerfile with docker and set up a node-red dashboard by importing the json file 'nodeRedFlow.json' into your dashboard

I don't have complete confidence that this dockerfile is always successful. This is a problem I have tried to fix. Please ask me questions if you are unable to at least get a running app working!

worst case, npm start after cloning this repo

to use the Node API:

localhost:3000/listtablecontent // lists current table in json format

localhost:3000/firstname=_____&lastname=________ // adds firstname and lastname to table under columns firstname and lastname respectively

to use the node-red dashboard:

http://127.0.0.1:1880/noderedlist // lists current table in json format using the Node API

http://127.0.0.1:1880/add?firstname=__________&lastname=______ // adds firstname and lastname values to table under columns firstname and lastname respectively
