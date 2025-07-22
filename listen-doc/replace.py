with open('self-introduction-no-blank.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('self-introduction-no-blank1.md', 'w', encoding='utf-8') as f:
    for line in lines:
        if line.strip():  # 只写入非空行
            f.write(line)