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
    DataTable,
    Modal,
    TextContainer
} from "@shopify/polaris";
import { TitleBar, Toast } from "@shopify/app-bridge-react";

//react hooks
import { useTranslation, Trans } from "react-i18next";
import { useState, useEffect, useCallback } from "react";

//api hooks
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

const fileCallbacks = [];
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.onchange = () => {
    const reader = new FileReader();
    reader.onload = e => {
        while(fileCallbacks.length>0) (fileCallbacks.pop())(e.target.result);
    }

    for(let file of fileInput.files){
        reader.readAsText(file);
    }
}

const askOpenFile = () => {
    return new Promise((resolve,reject)=>{
        fileCallbacks.push(resolve);
        fileInput.click();
    });
}

// const parseCSV = csv => {
//     csv = csv.replaceAll("\r\n","\n");
//     const rows = csv.split("\n").map(row=>row.split(","));
//     const columnNames = rows.splice(0,1)[0];
//     const data = [];
//     rows.forEach((row,i)=>{
//         data[i] = {};
//         row.forEach((entry,j)=>data[i][columnNames[j]]=entry);
//     })
//     console.log(`rows:`,rows);
//     console.log(`columnNames:`,columnNames);
//     console.log("data:",data);
//     return data;
// }

const parseCSVRow = row => {
    if(row.length==0) return undefined;
    const entries = [""];
    let idx = 0;
    let inString = false;
    //for(let i=0; i<row.length; i++){
    //
    //}
    
    let prevChar = '';
    for(let char of row){
        if(char=='"'){
            inString = !inString;
            if(inString) continue;
        }
        if(char==','){
            //if(inString)
            idx++;
            entries[idx] = "";
            continue;
        }
        prevChar = char;
        entries[idx] += char;
    }
    return entries;
}

const parseCSV = csv => {
    //fix weird windows stuff
    csv = csv.replaceAll("\r\n","\n");
    const rows = csv.split("\n").map(row=>parseCSVRow(row)).filter(row=>row!=undefined);
    //console.log(`data:`,rows);
    return rows;
}

const readCSV = () => new Promise((resolve,reject)=>{
    askOpenFile().then(content=>{
        //console.log(content);
        resolve(parseCSV(content));
    })
});

const EntryDisplay = ({text="No Entry", height = 'auto'}) => {
    return (
        <div
            style={{
                //background: 'var(--p-color-text-info)',
                padding: '14px var(--p-space-1)',
                height: height,
            }}
        >
            {text}
        </div>
    );
  };

// const CSVDisplay = props => {
//     return (
//         <AlphaCard>
//             <Grid>
//                 {[...new Array(100)].map((_,i)=><Grid.Cell>{i}</Grid.Cell>)}
//             </Grid>
//             <VerticalStack gap={5}>
//                 <HorizontalStack>{props.columnNames.map(name=><EntryDisplay text={name}/>)}</HorizontalStack>
//                 {props.csv.map(row=>(
//                     <HorizontalStack>
//                         {Object.keys(row).map(key=><EntryDisplay text={row[key]}/>)}
//                     </HorizontalStack>
//                 ))}
//             </VerticalStack>
//         </AlphaCard>
//     );
// }

const generateLineItem = (headings,csvRow) => {
    const headingIndexes = {};
    headings.forEach((heading, i)=>headingIndexes[heading]=i);
    return {lineItems:[{
        title: csvRow[headingIndexes["Item"]],
        quantity: parseInt(csvRow[headingIndexes["Qty"]]),
        sku: csvRow[headingIndexes["SKU"]],
        originalUnitPrice: parseFloat(csvRow[headingIndexes["Gross Sales"]])
    }]}
}

const LineItemDisplay = props => {

    const handleChange = useCallback(() => props.setActive(!props.active), [props.active]);

    const activator = <Button onClick={handleChange}>Open</Button>;

    return (
        <Modal
            
            open={props.active}
            onClose={handleChange}
            title="Line Item JSON View"
            /*primaryAction={{
                content: 'Add Instagram',
                onAction: handleChange,
            }}
            secondaryActions={[
            {
                content: 'Learn more',
                onAction: handleChange,
            },
            ]}
            */
        >
            <Modal.Section>
                <TextContainer>
                    <p style={{"whiteSpace":"pre"}}>{props.lineItems}</p>
                </TextContainer>
            </Modal.Section>
        </Modal>
    );
}

const CSVDisplay = props => {
    const rows = [...props.csv];
    const headings = rows.splice(0,1)[0];
    const [activeLineItem, setActiveLineItem] = useState(null);
    const [modalActive, setModalActive] = useState(false);
    //console.log(headings);

    const openModal = (row) => {
        setActiveLineItem(JSON.stringify(generateLineItem(headings,row),null,4))
        setModalActive(true);
    }

    return (
        <>
            <LineItemDisplay active={modalActive} setActive={setModalActive} lineItems={activeLineItem}/>
            <Button onClick={()=>props.addOrders()}>Add Orders</Button>
            <DataTable
                stickyHeader={true}
                headings={["View Line Item",...headings]}
                rows={rows.map((row)=>[<Button onClick={()=>openModal(row)}></Button>,...row])}
                columnContentTypes={(new Array(headings.length).fill("text"))}
            />
        </>
    );
}

function UploadCSV(){
    const emptyToastProps = { content: null };
    const {t: translate} = useTranslation();
    const [csvData, setCSVData] = useState(null);
    const [toastProps, setToastProps] = useState(emptyToastProps);
    const fetch = useAuthenticatedFetch();
    const isRefetchingCount = false;

    useEffect(()=>{
        //setCSVData()
        //if(Array.isArray(csvData)) addOrders(...csvData);
    },[csvData]);

    const addOrders = async (headings, ...rows) => {
        //setIsLoading(true);
        for(let row of rows){
            //console.log(row);
            //continue;
            try {
                const response = await fetch("/api/orders/create", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(generateLineItem(headings, row))
                });
                
                if (!response.ok) {
                    response.body.getReader().read().then(res => {
                        console.error(`${"Failed To Create Order"}: ${new TextDecoder().decode(res.value)}`);
                        setToastProps({
                            content: `${"Failed To Create Order"}: ${new TextDecoder().decode(res.value)}`,
                            error: true,
                        });
                    })
                    return;   
                }
            } catch (e) {
                console.log(e)
            }
        }
        setToastProps({
            content: translate(`${"Orders Created"}`),
        });
    };

    const toastMarkup = toastProps.content && !isRefetchingCount && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

    return(
        <Page wideWidth>
            <TitleBar title={translate("UploadCSV.title")} primaryAction={null} />
            <Layout>
                <Layout.Section secondary>
                    {toastMarkup}
                    <AlphaCard sectioned>
                        <Button onClick={()=>readCSV().then(res=>setCSVData(res))}>
                            Upload
                        </Button>
                        <VerticalStack>
                            <p>Upload and parse a CSV file.</p>
                            {csvData==null?"":<CSVDisplay csv={csvData} addOrders={()=>addOrders(...csvData)}/>}
                        </VerticalStack>
                    </AlphaCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default UploadCSV;