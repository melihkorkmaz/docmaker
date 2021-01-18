interface IModel {
  fetch(): Promise<void>;
  save(): Promise<void>;
}

export default IModel;