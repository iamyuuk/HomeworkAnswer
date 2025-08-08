// viewer.js

// 加载文件列表
async function loadFileList() {
  try {
    const res = await fetch('list.json');
    const files = await res.json();
    const listContainer = document.getElementById('file-list');
    listContainer.innerHTML = '';

    files.forEach(file => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = file;
      link.onclick = () => {
        loadMarkdown(file);
        highlightSelectedFile(file);
        // 移动端点击后隐藏菜单
        if (window.innerWidth <= 768) {
          listContainer.classList.remove('show');
        }
        return false;
      };
      listContainer.appendChild(link);
    });
  } catch (e) {
    console.error('加载 list.json 失败:', e);
    document.getElementById('file-list').innerHTML = '<p>加载文件列表失败</p>';
  }
}

// 加载并渲染 Markdown
async function loadMarkdown(filename) {
  try {
    const res = await fetch(filename);
    const text = await res.text();
    const html = marked.parse(text);
    document.getElementById('content').innerHTML = html;
  } catch (e) {
    document.getElementById('content').innerHTML = `<p>加载文件失败: ${filename}</p>`;
  }
}

// 主题切换
document.getElementById('theme-switcher').addEventListener('change', (e) => {
  document.body.dataset.theme = e.target.value;
});

// 菜单按钮切换
document.getElementById('menu-toggle').addEventListener('click', () => {
  const fileList = document.getElementById('file-list');
  fileList.classList.toggle('show');
});

// 图片点击放大预览功能
document.addEventListener('click', function (e) {
  if (e.target.tagName === 'IMG' && e.target.closest('#content')) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = e.target.src;
    modal.classList.remove('hidden');
  } else if (e.target.id === 'image-modal' || e.target.classList.contains('overlay')) {
    document.getElementById('image-modal').classList.add('hidden');
  }
});

function highlightSelectedFile(filename) {
  const fileLinks = document.querySelectorAll('#file-list a');
  fileLinks.forEach(link => {
    if (link.getAttribute('data-filename') === filename) {
      link.classList.add('selected');
    } else {
      link.classList.remove('selected');
    }
  });
}



// 启动加载
loadFileList();
