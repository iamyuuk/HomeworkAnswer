import os
import json

def generate_list_json(directory='.'):
    # 收集所有 .md 文件
    md_files = [f for f in os.listdir(directory) if f.endswith('.md') and os.path.isfile(os.path.join(directory, f))]
    md_files.sort()

    # 写入 list.json
    json_path = os.path.join(directory, 'list.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(md_files, f, ensure_ascii=False, indent=2)

    print(f"✅ 生成成功，共 {len(md_files)} 个 Markdown 文件 -> {json_path}")

if __name__ == '__main__':
    target_dir = os.path.dirname(os.path.abspath(__file__))
    generate_list_json(target_dir)
