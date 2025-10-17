require('dotenv').config();
const Airtable = require("airtable-node");

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base('applD0T9Ov25FFbGU').table('products');

exports.handler = async (event, context) => {
    const { id } = event.queryStringParameters;
    if(id){
        try {
            const product = await airtable.retrieve(id);
            if(product.error){
                return {
                    statusCode: 404,
                    body: `No product found with id: ${id}` }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(product) }
        } catch (error) {
            return {
                statusCode: 404,
                body: `No product found with id: ${id}` }
        }
    }
    try {
        const {records} = await airtable.list();
        const products = records.map(record =>{
            const {id} = record;
            const {name, image, price} = record.fields;
            const url = image[0].url;
            return {id, name, url, price};
        });
        return {
            statusCode: 200,
            body: JSON.stringify(products) }
    } catch (error) {
        return {
            statusCode: 500,
            body: "Server Error" }
    }
}