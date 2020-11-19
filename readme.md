#　jupyterlab 插件开发

[Extension Developer Guide](https://jupyterlab.readthedocs.io/en/stable/developer/extension_dev.html)

##　简单示例
需要的环境：　miniconda

1. 创建conda虚拟环境 `jupyterlab-ext`, 并按装相应的包

    - `conda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c anaconda jupyterlab cookiecutter nodejs git`
    - `conda activate jupyterlab-ext`
2.  新建一个 git 仓库, 并关联
    
3. 使用`cookiecutter` 创建模板项目
    
    - `cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts`
    
4. build 并按装 自己的插件

   - `jlpm` : 安装`package.json`中的依赖， 好像会一起执行`jlpm build`, 生成
      - `lib` 文件夹
      - `node_modules` 文件夹
      - 根目录下, `yarn.lock`
      - 根目录下, `tsconfig.tsbuildinfo`
      
   - `jlpm build` : build typescript source
   - `jupyter labextension install . ` : 安装插件
  
5. 查看自己的服务
    
    - `jupyter labextension list`: 查看所有的`jupyterlab`插件 
    - `jupyter lab --watch` : 浏览器默认自动开启 `jupyterlab` 服务
    - 打开 google 浏览器的开发者工具，查看console, 会显示：`JupyterLab extension jupyterlab-extension-demo is activated!`
 
6. terminal按两次 `ctrl + c`, 关掉jupyterlab服务
 
7. 修改 ts 代码后， 从新编译
    - `jlpm build` : 重新build 前端代码
    - `jupyter lab build` ： 重新build jupyter labextension 
    - `jupyter lab`

8. ts 安装新的包：
    - `jlpm add  @jupyterlab/application`:　安装XXX依赖， 同时package.json 的dependencies中会出现相应的包和版本
    
9. 插件的卸载：
    - `jupyter labextension uninstall ext-name`


## python 包的开发








## jupyterlab 启动时发生了什么
    
    
1. 初始化notebook  

        # /home/dosea/miniconda3/envs/jupyterlab-ext/lib/python3.7/site-packages/notebook/notebookapp.py
         @catch_config_error
         def initialize(self, argv=None):
            self._init_asyncio_patch()

            super(NotebookApp, self).initialize(argv)
            self.init_logging()
            if self._dispatching:
                return
            self.init_resources()
            self.init_configurables()
            self.init_server_extension_config()
            self.init_components()
            self.init_webapp()
            self.init_terminals()
            self.init_signal()
            self.init_server_extensions()
            self.init_mime_overrides()
            self.init_shutdown_no_activity()
    1. self._init_asyncio_patch() : 设置默认的异步策略
    2. self.init_server_extension_config() : 查找 jupyter --path 下所有路径下的配置
    
            "NotebookApp": {
                "nbserver_extensions": {
                  "jupyter_project": true
                }
            }
    3. self.init_server_extension() : 加载所有配置 为true 的nbserver_extensions
    
    
