import {expect} from 'chai';

async function getFileType(url: string): Promise<string> {
  const FileType = require('file-type/browser');
  return await fetch(url)
    .then(response => FileType.fromStream(response.body))
    .then(fileType => {
      return fileType.ext;
    });
}

describe('Attachments Identifier', () => {
  it('should render both newly added files and existing files appropriately', async () => {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Test.png';
    const type = await getFileType(url);
    expect(type).equals('jpg');
  });
});
