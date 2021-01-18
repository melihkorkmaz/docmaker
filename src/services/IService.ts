interface IService<T>{
  create(model: T): Promise<T>;
  update(model: T): Promise<T>;
  read(id?: string): Promise<T>;
  delete(id: string): Promise<void>;
}

export default IService;