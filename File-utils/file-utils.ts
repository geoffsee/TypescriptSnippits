import { makeTokenizer } from '@tokenizer/http';
import { expect } from 'chai';

async function getFileTypeFromStream(url: string): Promise<string> {
  const FileType = require('file-type/browser');
  return await fetch(url)
    .then(response => FileType.fromStream(response.body))
    .then(fileType => {
      return fileType.ext;
    });
}

function getFileTypeFromTokenizer(url: string): Promise<string> {
  const FileType = require('file-type/core');
  return makeTokenizer(url)
    .then((tokenizer: any) => FileType.fromTokenizer(tokenizer))
    .then((type: any) => {
      return type!.ext;
    });
}

describe('Attachments Identifier', () => {
  it('should get the filetype based on the stream', async () => {
    const url =
      'https://test-audio.netlify.com/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/01%20-%20Diablo%20Swing%20Orchestra%20-%20Heroines.mp3';
    const type = await getFileTypeFromStream(url);
    expect(type).equals('jpg');
  });

  it('use the tokenizer to figure out the filetype even faster?', () => {
    const url =
      'https://test-audio.netlify.com/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/01%20-%20Diablo%20Swing%20Orchestra%20-%20Heroines.mp3';
    const type = getFileTypeFromTokenizer(url);
    expect(type).equals('jpg');
  });
});
