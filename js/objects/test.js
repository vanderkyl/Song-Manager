var testFile = {
    name: "Test File",
    id: "1234",
    path: $sce.trustAsResourceUrl("https://drive.google.com/drive/folders/0BysYdC4iJkFUaVdCWFpvLTRmZmM"),
    previewPath: $sce.trustAsResourceUrl("https://drive.google.com/file/d/0BysYdC4iJkFUaVdCWFpvLTRmZmM/preview"),
    type: "m4a",
    size: "1 GB",
    bytes: 1024,
    likes: getLikes(fileId),
    timestamps: []
};

var testFolder = {
    name: "Test Folder",
    id: 1234
};