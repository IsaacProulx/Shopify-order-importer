import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

export const DEFAULT_ORDERS_COUNT = 1;
const CREATE_ORDERS_MUTATION = `
	mutation populateOrder($input: DraftOrderInput!) {
		draftOrderCreate(input: $input) {
			draftOrder {
				id
			}
			userErrors {
				field
				message
			}
    	}
	}
`;

const GET_ORDER_BY_SKU_QUERY = `
	query getOrdersBySKU($query: String!){
		products(first:10, query:$query){
			edges{
				node{
					id
					variants(first:1) {
						edges {
							node {
								id
								sku
							}
						}
					}
				}
			}
		}
	}
`

export default async function orderCreator(
	session,
	lineItems
) {
	const client = new shopify.api.clients.Graphql({ session });
	try {
		//for (let i = 0; i < count; i++) {
		let res = await client.query({
			data: {
				query: GET_ORDER_BY_SKU_QUERY,
				variables: {
					"query": `sku:${lineItems[0].sku}`
				}
			}
		});
		console.log(`!!!!!!query res:`,JSON.stringify(res.body.data))
		await client.query({
			data: {
				query: CREATE_ORDERS_MUTATION,
				variables: {
					"input": { lineItems }
				},
			},
		});
		//}
	} catch (error) {
		if (error instanceof GraphqlQueryError) {
			throw new Error(
				`${error.message}\n${JSON.stringify(error.response, null, 2)}`
			);
		} else {
			throw error;
		}
	}
}