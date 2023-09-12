declare type Awaited<T> = T extends PromiseLike<infer U> ? U : T

declare type MaybeUndefined<T> = T | undefined
