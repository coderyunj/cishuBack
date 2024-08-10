import * as crypto from 'crypto';
import { randomUUID } from 'crypto';

export function generateUUID(): string {
  // 生成一个标准格式的UUID v4字符串
  return randomUUID();
}
export function getMd5Str(str: string): string {
  const hash = crypto.createHash('md5'); // 使用SHA-256算法创建哈希对象
  hash.update(str);
  return hash.digest('hex'); // 获取哈希值的十六进制表示;
}
