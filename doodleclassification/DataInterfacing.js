function prepData(category, label) {
  category.fixBytes();
  category.training = [];
  category.testing = [];
  let threshold = floor(0.8* category.numImages);
  for (let i = 0; i < category.numImages; i++) {
    let offset = i*LEN;
    if (i < threshold) {
    category.training[i] = category.raw.subarray(offset, offset + LEN);
    category.training[i].label = label;
    } else {
      category.testing[i - threshold] = category.raw.subarray(offset, offset + LEN); 
      category.testing[i- threshold].label = label;
    }
  }
}

function prepAllData(categories) {
  for (let i =0; i < categories.length; i++) {
    prepData(categories[i], categories[i].id);
  }
}

function loadNPYFile(path) {
  let data = loadBytes(`./bin/${path}.npy`);
  return data;
}
