import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const uri = process.env.DATABASE_URL as string

async function main() {
    const client = new MongoClient(uri)

    try {
        await client.connect()

        const collections = await client.db().collections()

        for (const collection of collections) {
            await collection.drop()
        }

    console.log('All collections have been dropped.')
    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}

main()