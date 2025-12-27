declare module "pg" {
  export interface PoolConfig {
    // Keep this intentionally loose: runtime config is forwarded to pg.
    // This exists to satisfy TypeScript in `moduleResolution: "bundler"`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export class Pool {
    constructor(config?: PoolConfig);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    connect: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end: any;
  }
}
