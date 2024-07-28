export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: process.env.DB_LOGGING.split(','),
    logger: process.env.DB_LOGGER || 'advanced-console',
    host: process.env.DB_HOST || '59.110.114.71',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'invoice-sync',
    password: process.env.DB_PASSWORD || 'Tempwin2010',
    database: process.env.DB_NAME || 'invoice_sync',
    poolSize: process.env.DB_POOLSIZE,
    connectTimeout: process.env.DB_CONNECTTIMEOUT,
    extra: {
      connectionLimit: process.env.DB_EXTRA_CONNECTIONLIMIT || 10,
    },
    autoLoadEntities: process.env.DB_AUTOLOADENTITIES == 'true',
  },
  rabbitmq: {
    options: {
      urls: (
        process.env.RABBITMQ_OPTIONS_URLS ||
        'amqp://LemonTax:Lemon@2015@123.56.48.180:5672/'
      ).split(','),
      queue: process.env.RABBITMQ_QUEUE || 'invoice-syn-test',
      noAck: process.env.RABBITMQ_NOACK == 'true',
      prefetchCount: process.env.RABBITMQ_PREFETCHCOUNT
        ? Number(process.env.RABBITMQ_PREFETCHCOUNT)
        : 1,
      replyQueue: process.env.RABBITMQ_REPLYQUEUE || 'invoice-syn-reply-test',
      queueOptions: {
        durable: process.env.RABBITMQ_QUEUEOPTIONS_DURABLE == 'true',
      },
      persistent: process.env.RABBITMQ_PERSISTENT == 'true',
      exchange: process.env.RABBITMQ_EXCHANGE || 'setTaskModel',
    },
  },
  redis: {
    host: process.env.REDIS_HOST || '59.110.114.71',
    port: process.env.REDIS_PORT || 6379,
    database: process.env.REDIS_DATABASE || 10,
    password: process.env.REDIS_PASSWORD || 'Tempwin2022',
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
