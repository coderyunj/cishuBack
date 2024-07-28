export const config = {
  db: {
    type: 'mysql',
    synchronize: false,
    logging: process.env.DB_LOGGING.split(','),
    logger: process.env.DB_LOGGER || 'advanced-console',
    host: '59.110.114.71',
    port: 3306,
    username: 'invoice-sync',
    password: 'Tempwin2010',
    database: 'invoice_sync_loc',
    poolSize: process.env.DB_POOLSIZE,
    connectTimeout: process.env.DB_CONNECTTIMEOUT,
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
  },
  rabbitmq: {
    options: {
      urls: 'amqp://guest:guest@127.0.0.1:5672/'.split(','),
      queue: 'invoice-fetch-test',
      noAck: false,
      prefetchCount: 1,
      replyQueue: 'helloQueue',
      queueOptions: {
        durable: false,
      },
      persistent: false,
      exchange: 'setTaskModel',
    },
  },
  redis: {
    host: 'localhost',
    port: 6379,
    database: 11,
    password: 'ningzaichun',
    ttls: {
      default: process.env.REDIS_TTLS_DEFAULT || 86400,
      loginStatus: process.env.REDIS_TTLS_LOGINSTATUS || 7200,
    },
  },
  oss: {
    domain: process.env.OSS_DOMAIN,
  },
  custom: {
    noPhoneAreas: (process.env.CUSTOM_NOPHONEAREAS || '12, 33, 42, 44')
      .split(',')
      .map(Number),
    noSupportedAreas:
      process.env.CUSTOM_NOSUPPORTEDAREAS.split(',').map(Number),
    apiTaskAreas: {
      login: process.env.CUSTOM_API_TASK_AREAS_LOGIN.split(',').map(Number),
      invoice: process.env.CUSTOM_API_TASK_AREAS_INVOICE.split(',').map(Number),
      deduction: process.env.CUSTOM_API_TASK_AREAS_DEDUCTION.split(',').map(Number),
      fjDownLoad: process.env.CUSTOM_API_TASK_AREAS_FJDOWNLOAD.split(',').map(Number),
    },
  },
  security: {
    auth: {
      jwt: {
        secret: process.env.SECURITY_AUTH_JWT_SECRET,
        expires: process.env.SECURITY_AUTH_JWT_EXPIRES,
      },
    },
    throttler: {
      default: {
        ttl: process.env.SECURITY_THROTTLER_DEFAULT_TTL,
        limit: process.env.SECURITY_THROTTLER_DEFAULT_lIMIT,
      },
      auth: {
        ttl: process.env.SECURITY_THROTTLER_AUTH_TTL,
        limit: process.env.SECURITY_THROTTLER_AUTH_lIMIT,
      },
    },
  },
};
