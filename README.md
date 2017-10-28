# auto-deploy
## 安装
> 首先你要安装 node，git，安装方式自行百度,此应用安装在服务器端

1. `git clone git@github.com:4013465w/auto-deploy.git`
2. `cd auto-deploy && npm i`
3. `cp config/config.example.js config/config.js`,并修改配置
4. `npm run start`
5. github 或 oschina 等 git 托管服务 项目-> settings -> Webhooks -> Add webhooks ->Payload URL -> 你的ip:9988/deploy

如果你需要在服务器端运行，请安装 `forever`,`sudo npm i forever -g`, `forever start ./bin/www`