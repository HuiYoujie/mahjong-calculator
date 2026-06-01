# HTML 生成规范

生成 HTML 文件时，遵循以下规范。

## 基本要求

- 使用 Tailwind CSS CDN（`<script src="https://cdn.tailwindcss.com"></script>`）
- 所有样式通过 Tailwind 工具类实现，禁止编写自定义 CSS
- 仅当 Tailwind 无法实现时（复杂动画、伪元素等），允许在 `<style>` 中使用 `@apply` 指令
- 采用移动优先的响应式设计
- 添加必要的交互状态（hover、focus 等）

## 基础模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
		<title>页面标题</title>
		<script src="https://cdn.tailwindcss.com"></script>
	</head>
	<body class="bg-gray-50 font-sans antialiased">
		<div class="min-h-screen flex flex-col">
			<header class="bg-white shadow-md sticky top-0 z-50">
				<nav class="container mx-auto px-4 py-4">
					<!-- 导航内容 -->
				</nav>
			</header>

			<main class="flex-grow container mx-auto px-4 py-8">
				<!-- 主要内容 -->
			</main>

			<footer class="bg-gray-800 text-white py-6">
				<div class="container mx-auto px-4 text-center">
					<!-- 页脚内容 -->
				</div>
			</footer>
		</div>
	</body>
</html>
```
