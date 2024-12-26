# AWS S3 Order Management

## 简介
AWS S3 Order Management 是一个基于 Node.js 的无服务器应用程序，使用 AWS SDK v3 进行 S3 存储操作。该应用程序允许用户通过更新订单信息来管理存储在 AWS S3 桶中的 JSON 格式的订单数据。

## 功能
- 从指定的 AWS S3 桶中获取订单数据。
- 更新指定订单的内容，包括订单名称、描述和产品信息。
- 将修改后的订单数据重新上传到 S3。
- 除了数据的更新，与 AWS S3 的交互均为无状态的。

## 安装与使用方式
1. **克隆或下载此项目**：
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **安装依赖模块**：
   在项目根目录下运行以下命令以安装所需的依赖项：
   ```bash
   npm install
   ```

3. **设置 AWS 凭证**：
   在代码中填写 `BUCKET_NAME`，`FILE_NAME`，`region`，`accessKeyId` 和 `secretAccessKey` 等信息。这些信息用于连接到您的 AWS S3 实例。

4. **运行程序**：
   将应用程序作为 AWS Lambda 函数部署，或在本地使用适配器已启用 AWS Lambda 的 Node.js 环境进行测试。

5. **测试更新订单**：
   发送一个包含订单信息的请求，如下所示：
   ```json
   {
       "id": 1,
       "orderName": "Updated Order Name",
       "description": "Updated Description",
       "products": [
           {"id": "ks002", "qty": 50},
           {"id": "ks003", "qty": 30}
       ]
   }
   ```

## 必要的依赖模块清单
- `@aws-sdk/client-s3`: AWS SDK v3 的 S3 客户端，用于与 S3 进行交互。
- `moment`: 用于处理和格式化时间日期。

您可以在项目中通过运行以下命令查看所有依赖项：
```bash
npm list --depth=0
```

## 授权条款
本项目采用 MIT 许可证，详情请参见 [LICENSE](LICENSE) 文件。

---

如有任何问题或建议，欢迎提交 Issues 或 Pull Requests！