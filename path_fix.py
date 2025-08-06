import os
import re

def strip_image_prefix_in_md(folder, prefix_to_remove):
    """
    遍历 folder 中的所有 .md 文件，将图片路径中以 prefix_to_remove 开头的部分删除。
    """
    md_files = [f for f in os.listdir(folder) if f.lower().endswith('.md')]
    if not md_files:
        print("❌ 没有找到 Markdown 文件。")
        return

    for md_file in md_files:
        path = os.path.join(folder, md_file)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 替换图片路径中以 prefix_to_remove 开头的部分
        new_content = re.sub(
            r'!\[(.*?)\]\((%s.*?)\)' % re.escape(prefix_to_remove.replace("\\", "/")),
            lambda m: f"![{m.group(1)}]({m.group(2)[len(prefix_to_remove):]})",
            content
        )

        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ 已修复路径: {md_file}")


# ✅ 调用方式
if __name__ == "__main__":
    # 替换为你的 Markdown 文件所在的目录
    target_folder = r"E:\codes\Homework\2025Summer\md"
    
    # 替换为你想要移除的路径前缀（注意使用正斜杠 /）
    prefix = "E:/codes/Homework/2025Summer/md/"

    print("🔧 开始修复 Markdown 图片路径前缀...")
    strip_image_prefix_in_md(target_folder, prefix)
    print("🎉 所有路径已修复完成！")
