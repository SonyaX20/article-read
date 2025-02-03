### 

### Dev
创建一个名为 frontend 的新目录，在该目录中初始化一个新的 React + TypeScript 项目，设置基本的项目结构和必要的依赖，这是一个现代化的前端开发环境设置，特别适合开发 React 应用，并且通过 TypeScript 提供类型安全。这个命令创建的项目会包含：
- TypeScript 配置
- React 运行环境
- Vite 构建工具
- 基本的项目结构和示例代码，相当于模板

```bash
npm create vite@latest frontend -- --template react-ts

cd backend
npm init -y
npm install express cors dotenv bcryptjs jsonwebtoken mongoose
npm install --save-dev @types/express @types/cors @types/jsonwebtoken
```
JWT_SECRET 是用于签名和验证 JWT（JSON Web Token）的密钥：
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```