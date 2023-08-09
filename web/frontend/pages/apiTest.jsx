//Components
import {
    AlphaCard,
    Page,
    Layout,
    VerticalStack,
    Image,
    Link,
    Text,
    Button,
    HorizontalStack,
    Grid,
    DataTable
} from "@shopify/polaris";
import { TitleBar, Toast } from "@shopify/app-bridge-react";

//react hooks
import { useTranslation, Trans } from "react-i18next";
import { useState, useEffect } from "react";

//api hooks
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

const defaultLineItems = [{
    "appliedDiscount": {
        "amount": "5.00",
        "description": "test modify lineitem price",
        "title": "modify lineitem price",
        "value": 5.00,
        "valueType": "FIXED_AMOUNT"
    },
    "title": "Test",
    "quantity": 1,
    "originalUnitPrice": 1
}]

const testLineItems = [{
    title:"BStone Necklace Silver - Jun",
    quantity:1,
    sku:"UNC00293",
    originalUnitPrice: 40.00
}]

function App() {
    const emptyToastProps = { content: null };
    const { t: translate } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [toastProps, setToastProps] = useState(emptyToastProps);
    const fetch = useAuthenticatedFetch();
    const ordersCount = 1;

    const {
        data,
        refetch: refetchProductCount,
        isLoading: isLoadingCount,
        isRefetching: isRefetchingCount,
    } = useAppQuery({
        url: "/api/draftOrders/count",
        reactQueryOptions: {
            onSuccess: () => {
                setIsLoading(false);
            },
        },
    });

    const toastMarkup = toastProps.content && !isRefetchingCount && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

    const handlePopulate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/orders/create", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({lineItems:testLineItems})
            });
            console.log(JSON.stringify({lineItems:testLineItems}));
            console.log(response);
            if (response.ok) {
                await refetchProductCount();
                setToastProps({
                    content: translate(`${"Order Created"}`, {
                        count: ordersCount,
                    }),
                });
                console.log(response)
                response.body.getReader().read().then(res => {
                    console.log(new TextDecoder().decode(res.value))
                })
            } else {
                response.body.getReader().read().then(res => {
                    console.log(`${"Failed To Create Order"}: ${new TextDecoder().decode(res.value)}`);
                    setIsLoading(false);
                    setToastProps({
                        content: `${"Failed To Create Order"}: ${new TextDecoder().decode(res.value)}`,
                        error: true,
                    });
                })

            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Page wideWidth>
            <TitleBar title={translate("apiTest.title")} primaryAction={null} />
            <Layout>
                <Layout.Section secondary>
                    {toastMarkup}
                    <AlphaCard sectioned>
                        <Button onClick={handlePopulate}>
                            Create Order
                        </Button>
                        <VerticalStack>
                            <p>Draft Orders: {isLoading ? "Loading..." : data.count}</p>

                        </VerticalStack>
                    </AlphaCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default App;