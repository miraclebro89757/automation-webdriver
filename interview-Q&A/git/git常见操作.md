你已经创建并切换到了新分支 `ljc`，但这个分支在远程（origin）还不存在，所以直接 `git pull` 会报错。  
如果你想把远程某个分支（比如 `master` 或其他分支）的最新代码拉到你当前的 `ljc` 分支进行测试，可以这样操作：

### 1. 如果你想基于远程 `master` 分支的最新代码
```bash
git pull origin master
```
这会把远程 `master` 分支的最新提交合并到你本地的 `ljc` 分支。

### 2. 如果你想基于远程的其他分支（比如 `dev`）
```bash
git pull origin dev
```

### 3. 如果你想让 `ljc` 跟踪远程的某个分支（比如 `origin/ljc`，通常用于多人协作）
如果远程已经有 `ljc` 分支：
```bash
git branch --set-upstream-to=origin/ljc ljc
git pull
```
如果远程还没有 `ljc` 分支，第一次 push 时用：
```bash
git push --set-upstream origin ljc
```

---

**总结：**
- 你现在只需要 `git pull origin master`（或你想要的分支名）即可把远程分支的代码合并到当前分支。
- 如果是新分支，第一次 push 用 `git push --set-upstream origin ljc`。

