// 引入 AWS SDK v3 的 S3 客戶端和認證提供者
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const moment = require('moment');


// 指定你的 S3 桶名和檔案名
const BUCKET_NAME = '';
const FILE_NAME = '';

exports.handler = async (event) => {
    console.log(event.body);

    try {
        await main(event.body);

        // 返回成功響應
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Data updated successfully"
            }),
        };
    } catch (error) {
        // 返回錯誤響應
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to update data",
                error: error.message,
            }),
        };
    }
};

const main = async function (order) {
    try {
        const body = JSON.parse(order);

        const s3Client = new S3Client({
            region: '',
            credentials: {
                accessKeyId: '',
                secretAccessKey: ''
            }
        });

        const data = await s3Client.send(
            new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: FILE_NAME
            })
        );

        const streamToString = (stream) => new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
            stream.on('error', reject);
        });

        const originalOrders = JSON.parse(await streamToString(data.Body));
        const originalOrderId=body.id;
        //console.log(originalOrders);
        const orderToUpdate=originalOrders.orders.find(o=>o.id===originalOrderId);
        //console.log(orderToUpdate);

        const modifyDate=moment().format('YYYY-MM-DD HH:mm:ss');

        orderToUpdate.orderName=body.orderName;
        orderToUpdate.description=body.description;
        orderToUpdate.products=body.products;
        orderToUpdate.modifyDate=modifyDate;

        // 更新 S3 文件
        const putObjectParams = {
            Bucket: BUCKET_NAME,
            Key: FILE_NAME,
            Body: JSON.stringify(originalOrders),
            ContentType: 'application/json'
        };
        const updatedData = await s3Client.send(new PutObjectCommand(putObjectParams));

        return {code:updatedData.$metadata.httpStatusCode};
    } catch (e) {
        console.log(e);
        return {code:500};
    }
}

//main(`{"id":1,"orderName":"Test2","description":"desc3","products":[{"id":"ks002","qty":99},{"id":"ks003","qty":88}]}`);