const {clients, projects}  = require('../simpleData.js');
const Client  = require("../models/Client");
const Project = require("../models/Project");

const {
  GraphQLObjectType,
  GraphQLString, 
  GraphQLID, 
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType
} = require("graphql");

const ClientType = new GraphQLObjectType({  
  name: "Client",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString}
  })
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLString},
    client: {
      type: ClientType,
      resolve(parent,args) {
        return Client.findById(parent.clientId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent,args){
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args) {
        return Project.findById(args.id);
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args){
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args) {
        return Client.findById(args.id);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    //add a client
    addClient: {
      type: ClientType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        phone: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parent,args){
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        });
        return client.save();
      }
    },
    //delete a client
    deleteClient: {
      type: ClientType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parent,args){
        return Client.findByIdAndRemove(args.id);
      }
    },
    //add project
    addProject: {
      type: ProjectType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString) },
        description: {type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              'new': {value: "Not Started"},
              'progress': {value: "In Progress"},
              'complete': {value: "Completed"}
            }
          }),
          defaultValue: "Not Started"
        },
        clientId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        });
        return project.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery, 
  mutation
});