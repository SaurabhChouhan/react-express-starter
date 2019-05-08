import convict from 'convict'
// This will read .env file and set all the variables in process.env, it is important to load this 
// before executing convict code so that environment variables are avaialble to use by convict
require('dotenv').config() 

var config = convict({
    env: {
      doc: "The application environment.",
      format: ["production", "development", "test"],
      default: "development",
      env: "NODE_ENV"
    },
    port: {
      doc: "Server port",
      format:"int",
      default:8080,
      env: "PORT"
    },    
    db: {
      host: {
        doc: "Database host name/IP",
        format: '*',
        default: 'localhost'
      },
      name: {
        doc: "Database name",
        format: String,
        default: 'react-express-starter'
      },
      username: {
        doc: "User name, keep as null if access control is disabled",
        format: String,
        default: "" // Shouldn't set actual user here as this file would be committed on git, use environment specific file in config directory
      },
      password: {
        doc: "Password, keep as null if access control is disabled",
        format: String,
        default: "", // Shouldn't set actual password here as this file would be committed on git, use environment specific file in config directory
        sensitive: true
      }
    },
    auth:{
      passportSecret:{
        doc: "Secret used to create password hash",
        format: 'String',
        default: '',
        sensitive: true
      }
    }
});
// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');
config.validate({allowed: 'strict'});
export default config