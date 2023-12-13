import { ObjectId } from "mongodb";

export default class Example {
  constructor(
    public field1: string,
    public field2: Array<string>,
    public field3: number,
    public id?: ObjectId) {}
}