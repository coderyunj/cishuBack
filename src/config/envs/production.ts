export const config = {
  db: {
    type: process.env.DB_TYPE,
    synchronize: false,
    logging: process.env.DB_LOGGING.split(','),
    logger: process.env.DB_LOGGER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    poolSize: process.env.DB_POOLSIZE,
    connectTimeout: process.env.DB_CONNECTTIMEOUT,
    extra: {
      connectionLimit: process.env.DB_EXTRA_CONNECTIONLIMIT || 10,
    },
    autoLoadEntities: process.env.DB_AUTOLOADENTITIES == 'true',
  },
  rabbitmq: {
    options: {
      urls: process.env.RABBITMQ_OPTIONS_URLS.split(','),
      queue: process.env.RABBITMQ_QUEUE,
      noAck: process.env.RABBITMQ_NOACK == 'true',
      prefetchCount: process.env.RABBITMQ_PREFETCHCOUNT
        ? Number(process.env.RABBITMQ_PREFETCHCOUNT)
        : 1,
      replyQueue: process.env.RABBITMQ_REPLYQUEUE,
      queueOptions: {
        durable: process.env.RABBITMQ_QUEUEOPTIONS_DURABLE == 'true',
      },
      persistent: process.env.RABBITMQ_PERSISTENT == 'true',
      exchange: process.env.RABBITMQ_EXCHANGE,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    database: process.env.REDIS_DATABASE,
    password: process.env.REDIS_PASSWORD,
    ttls: {
      default: process.env.REDIS_TTLS_DEFAULT || 86400,
      loginStatus: process.env.REDIS_TTLS_LOGINSTATUS || 7200,
    },
  },
  oss: {
    domain: process.env.OSS_DOMAIN,
  },
  custom: {
    noPhoneAreas: process.env.CUSTOM_NOPHONEAREAS.split(',').map(Number),
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
