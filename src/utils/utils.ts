import * as crypto from 'crypto';

export function getMd5Str(str: string): string {
  const hash = crypto.createHash('md5'); // 使用SHA-256算法创建哈希对象
  hash.update(str);
  return hash.digest('hex'); // 获取哈希值的十六进制表示;
}
