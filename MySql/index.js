
//const mysql2 = require('mysql2')
const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')


module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('test_node', process.env.DB_USERNAME, process.env.DB_PASSWORD,  {dialect: 'mysql'})
        const models = {}
        const modelDirectory = path.join(process.cwd(), 'MySql', 'models')

        const readAndSetModels = () => {
            fs.readdir(modelDirectory, (err, files) => {
                files.forEach((file) => {
                    const [modelName] = file.split('.')
                    //console.log(modelName)
                    const modelFile = require(path.join(modelDirectory, file))
                    models[modelName] = modelFile(client)
                    console.log(modelFile(client))
                })
            })

        }
        return {
            getModel: (modelName) => models[modelName],
            setModel: () => readAndSetModels()
        }

    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection()
            }
            return instance
        }
    }
})();