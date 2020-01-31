// ts -> .d.ts 翻译文件 -> js
import fs from "fs";
import path from "path";
import superagent from "superagent";
import DellAnalyzer from "./dellAnalyzer";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json');
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    //写入文件
    this.writeFile(fileContent);
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

}
const secret = 'secretKey';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = new DellAnalyzer();

new Crowller(url,analyzer);