const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

//Launch Type

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    // mission_id: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    details: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
    launch_failure_details: { type: LaunchFailureType },
    links: { type: LinksType }
  }),
});

//Rocket Type

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

// Launch Failure Type

const LaunchFailureType = new GraphQLObjectType({
  name: 'LaunchFailure',
  fields: () => ({
    time: { type: GraphQLInt },
    reason: { type: GraphQLString }
  })
})

// Links Type

const LinksType = new GraphQLObjectType({
  name: 'Links',
  fields: () => ({
    mission_patch: { type: GraphQLString },
    mission_patch_small: { type: GraphQLString },
    presskit: { type: GraphQLString },
    article_link: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    video_link: { type: GraphQLString },
    youtube_id: { type: GraphQLString }
  })
})

//Root query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v3/launches').then(res => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v3/rockets').then(res => res.data);
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
