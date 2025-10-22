const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', function () {
  preview.innerHTML = ''; // clear old previews
  const files = Array.from(this.files);

  files.forEach(file => {
    const item = document.createElement('div');
    item.classList.add('preview-item');

    if (file.type.startsWith('image/')) {
      // Preview for images
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      item.appendChild(img);
    } else {
      // Icon for non-image files
      const icon = document.createElement('img');
      icon.src = 'https://img.icons8.com/fluency/48/document.png';
      item.appendChild(icon);
    }

    const name = document.createElement('span');
    name.textContent = file.name;
    item.appendChild(name);

    preview.appendChild(item);
  });
});