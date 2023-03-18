import { client } from "./client";

export namespace index {
  export function read() {
    // TODO Show response in #results-template and error handling
    client.contacts.read("foo").then((contact) => {
      console.info("contact", contact)
    })
  }
}
