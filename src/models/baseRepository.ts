export abstract class BaseRepository<T> {
    abstract getAll(): Promise<T[]>
    
    abstract getById(id:number): Promise<T>

    abstract create(data: Partial<T>): Promise<T>

    abstract update(id: number, data: Partial<T>): Promise<T>

    abstract delete(id: number): Promise<void>

    abstract findAll(data: Partial<T>): Promise<T[]>

    abstract getFirstBy(data: Partial<T>): Promise<T | undefined>
}