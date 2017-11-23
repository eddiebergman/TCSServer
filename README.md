# Permanantly on hold

# TCSNode

A repo specifically for the development of TCS API<br>
*insert link to api listing here*

## Structure And Purpose

The folder layour for the project is as such:
```
+--componenets 
   |passport.js*
   |mongodb.js
   | ...
   
+--models 
   +--user
      |schema.js
      |model.js
      |controller.js
   +--game
      |schema.js
      |model.js
      |controller.js
   +--<more models etc..>
   
+--node_modules
   +-- <A load of node modules>
   
+--public
   +--images
      |image01.jpg
      |image02.jpg
   +--<Other public resources>
      | ...
      | ...
      
+--routers
      |user-routes.js
      |auth-routes.js
     
+--config.js
+--startupFiles
+--package.json
+--README.md
+--server.js
+--todo.txt
```
#### components

A component is something that fits strongly with these categories:<br>
1. *Adds functionality to the backend* <br>
2. *Provides help for the sake of development* <br>
3. *Does not provide any content back to the user other than meta-information* <br>
4. *Does not fit directly into the other folders* <br>

Part 3 is where "fits strongly" is used. Authentication provides a cookie which is not what is directly asked, simply some meta-info which can be used for user session tracking. What it does provide is extra functionality in terms of session tracking through login and logout. Authentication fails part 4 as it does not a router for the API nor is it a resource and as we shall see, stronly disagrees with being model.

A component can either be a single .js file or if required, a sub-folder of components.

#### models

A model is something that needs the following:<br>
1. *Requires a Schema to layout its information in storage*
2. *Does not provide functionality to the backend*

A model is something that can be modeled by a schema such as a user or events. Having a User model does not provide functionality to the backend, it servers as content which the backend can then serve to clients. <br>
A typical model will have the following but may have more if needed, <br>
1. *schema.js* to layout how the model will be stored in the database
2. *model.js* an interface to this stored model, creating a defined interaction point to the schema
3. *controller.js* an endpoint for API routes, will parse and retrieve desired information from the model

#### node-modules

These are dependancies for the project retrevied by usin *npm*

#### public

This directory stores public resources that can be served statically by the server

#### routers

Here is contained all routers that can be mounted as needed. Each router should have a defining client-feature or model which they serve. Each router will be connected to one or more controllers which will handle the request that hit these routers.

#### config.js

This is where all run-time or private config options are stored. The idea is that if the config.js file was replaced and the repository made public, all sensitive information is kept safe. The config should only be accessed in server.js and any information required in other components or models should be passed along.

#### start up files

These files will be used for starting up the server on different platforms

#### package.json

Contains all info needed for npm to install all neccessary dependancies for the project as well as extra infromation about the project.

#### server.js

The initial entry point for the server. Sets up components as needed and mounts all the routes.

#### todo.txt

Lists varying todo's in the project
